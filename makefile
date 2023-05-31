gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
install:
	install-deps
	npx simple-git-hooks