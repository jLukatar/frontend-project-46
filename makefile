gendiff:
	node bin/gendiff.js
install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test:
	npm test --test-reporter=spec

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	npm test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test