const jsinspect = require('jsinspect')
const concat = require('concat-stream')

var results = []

/**
 * this is a proof of concept implementation of a code duplication finder
 * that will find the highest threshold and create an array of reports.
 *
 * using https://github.com/danielstjules/jsinspect to find duplicated code
 */
function inspector (file, threshold, callback) {
  var config = {
    threshold: threshold
    // identifiers:  identifiers,
    // literals:     literals,
    // minInstances: minInstances
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
        report.highestThreshold = threshold - 1
        report.result = results[results.length - 1].data
        report.data = results // add all reports to the returned data
      }
      results = [] // reset the temporary results array
      callback(report)
    } else {
      results.push({threshold: threshold, data: result})
      inspector(file, threshold + 1, callback)
    }
  }
}

module.exports = inspector
