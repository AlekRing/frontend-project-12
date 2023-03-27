install:
	npm ci

front:
	make -C frontend

back:
	npx start-server

start:
	make back & make front