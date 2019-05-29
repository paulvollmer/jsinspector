# jsinspector [![Build Status](https://travis-ci.org/paulvollmer/jsinspector.svg?branch=master)](https://travis-ci.org/paulvollmer/jsinspector) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/paulvollmer/jsinspector/blob/master/LICENSE)

Detect copy-pasted and structurally similar JavaScript code based on the `jsinspect` tool but with a automated threshold parameter.
the tool will be count the threshold up to the highest number to find the biggest code duplication.

**This is experimental, do not use in production**


## installation

```
# install it as dependencies
npm install paulvollmer/jsinspector --save

# or install it globally
npm install -g paulvollmer/jsinspector
```

_nodejs v6 or above is required_


## usage as cli

```
jsinspector -f fixtures/simple.js
```


## usage as module

```
inspector('path/to/source.js', MIN_THRESHOLD, function(report) {
  console.log(report)
})
```
