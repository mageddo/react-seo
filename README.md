This is a POC to test if react apps based in rest services are indexing at google as well, the objective is to understand if you can safely create client-side rendering applications without hurts you SEO, anyway this project is focused in react.js

#### Building the docker image

	docker-compose up compiler-app && docker-compose up compiler-api && docker-compose build build

Running the builded image

	docker run --hostname react-seo.herokuapp.com -e HOSTNAMES=us-east-1-a.route.herokuapp.com --rm defreitas/react-seo:1.0


#### Developing

Running containers

	docker-compose up -d react-seo-api react-seo-app react-seo-reverse-proxy

Attaching in containers to manage servers

API

	$ docker exec -it react-seo-api bash
	go run api/cmd/main.go

APP

	$ docker exec -it react-seo-app bash
	cd app && npm install && npm start

#### Running it in heroku

Generating binaries

	docker-compose build compiler-api compiler-app

Uploading

	heroku git:remote -a react-seo
	heroku login
	heroku container:login
	heroku container:push web
