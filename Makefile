BIN = ./node_modules/.bin
LINT_FILES = bin/jsinspector src/*.js webpack.config.js

lint:
	@$(BIN)/standard $(LINT_FILES)
	@$(BIN)/standard $(LINT_FILES) --fix
lint-fix:
.PHONY: lint lint-fix

test:
	@$(BIN)/mocha -t 20000 test
test-cli: test-format-text test-format-json test-format-html
test-format-text:
	./bin/jsinspector -f fixtures/simple.js
test-format-json:
	./bin/jsinspector -f fixtures/simple.js -o json
test-format-html:
	./bin/jsinspector -f fixtures/simple.js -o html
.PHONY: test test-cli test-format-text test-format-json test-format-html

clean:
	@rm -rf web/build
build:
	@$(BIN)/webpack --progress -p
.PHONY: clean build
