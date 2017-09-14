# jsinspector [![Build Status](https://travis-ci.org/paulvollmer/jsinspector.svg?branch=master)](https://travis-ci.org/paulvollmer/jsinspector)

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


## Usage

```
jsinspector -f fixtures/simple.js
```
