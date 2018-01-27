BIN = ./node_modules/.bin

lint:
	@$(BIN)/standard bin/jsinspector src/*.js

test:
	@$(BIN)/mocha -t 20000 test

test-cli: test-format-text test-format-json test-format-html

test-format-text:
	./bin/jsinspector -f fixtures/simple.js

test-format-json:
	./bin/jsinspector -f fixtures/simple.js -o json

test-format-html:
	./bin/jsinspector -f fixtures/simple.js -o html

.PHONY: lint test test-cli test-format-text test-format-json test-format-html
