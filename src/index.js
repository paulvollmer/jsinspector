const jsinspect = require('jsinspect')
const concat = require('concat-stream')

var results = []

/**
 * this is a proof of concept implementation of a code duplication finder
 * that will find the highest threshold and create an array of reports.
 *
 * using https://github.com/danielstjules/jsinspect to find duplicated code
 */
function inspector (file, cfg, callback) {
  var config = {
    threshold:    cfg.threshold || 10,
    identifiers:  cfg.identifiers || true,
    literals:     cfg.literals || true,
    minInstances: cfg.minInstances || 2
  }
  var inspect = new jsinspect.Inspector([file], config)
  var reporterConfig = {
    // truncate: program.truncate,
    writableStream: concat(onFinish)
  }
  var reporter = new jsinspect.reporters.json(inspect, reporterConfig)
  inspect.run()

  function onFinish (data) {
    var result = JSON.parse(data)

    if (result.length === 0) {
      var report = {
        highestThreshold: 0,
        result: null
      }
      if (results.length !== 0) {
        report.highestThreshold = config.threshold - 1
        report.result = results[results.length - 1].data
        report.data = results // add all reports to the returned data
      }
      results = [] // reset the temporary results array
      callback(report)
    } else {
      results.push({config: config, data: result})

      config.threshold = config.threshold+1
      inspector(file, config, callback)
    }
  }
}

module.exports = inspector
