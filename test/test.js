var assert = require('assert');
var inspector = require('../src/index.js')

describe('inspector', function() {
  it('simple.js', function(done) {

    var config = {
      threshold: 10
    }

    inspector('./fixtures/simple.js', config, (report) => {
      assert.equal(report.highestThreshold, 17)

      assert.equal(report.result.length, 1)
      assert.equal(report.result[0].instances.length, 2)

      assert.equal(report.result[0].instances[0].path, './fixtures/simple.js')
      assert.equal(report.result[0].instances[0].lines[0], 3)
      assert.equal(report.result[0].instances[0].lines[1], 7)
      assert.equal(report.result[0].instances[0].code, 'function foo() {\n  console.log(\'hello\')\n  console.log(\'world\')\n  x = 5\n}')

      assert.equal(report.result[0].instances[1].path, './fixtures/simple.js')
      assert.equal(report.result[0].instances[1].lines[0], 9)
      assert.equal(report.result[0].instances[1].lines[1], 13)
      assert.equal(report.result[0].instances[1].code, 'function bar() {\n  console.log(\'hello\')\n  console.log(\'world\')\n  x = 5\n}')
      done()
    })

  })
})
