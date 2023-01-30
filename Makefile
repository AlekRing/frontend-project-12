install:
	npm ci

front:
	make -C frontend & npm start

back:
	npx start-server

start:
	make back & make front