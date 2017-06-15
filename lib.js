// this is a proof of concept implementation of a code duplication finder
// that will find the highest threshold and create an array of reports.
//
// using https://github.com/danielstjules/jsinspect to find duplicated code

const child_process = require("child_process")

var results = []

function inspector(file, threshold, callback) {
  // TODO: switch from exec to code use of the jsinspect package.
  // this was the fastest way to build this proof of concept demo
  var command = `./node_modules/.bin/jsinspect -t ${threshold} -r json ${file}`
  child_process.exec(command, (err, stdout, stderr) => {
    var result = JSON.parse(stdout)

    if (result.length === 0) {
      var report = {
        highestThreshold: 0,
        result: null
      }
      if (results.length !== 0) {
        report.highestThreshold = threshold-1
        report.result = results[results.length-1].data
        // report.data = resultsm // add all reports to the returned data
      }
      callback(report)

    } else {
      results.push({threshold: threshold, data: result})
      inspector(file, threshold+1, callback)
    }
  })
}

module.exports = inspector
