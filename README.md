This is a POC to test if react apps based in rest services are indexing at google as well, the objective is to understand if you can safely create client-side rendering applications without hurts you SEO, anyway this project is focused in react.js

#### Building the docker image

	docker-compose up --abort-on-container-exit compiler-app compiler-api && docker-compose --abort-on-container-exit build build

#### Developing

Run the api 

	$ docker-compose up -d react-seo-api && docker exec -it react-seo-api bash
	go run cmd/main.go

Run the app

	$ docker-compose up -d react-seo-app && docker exec -it bash
	npm install && npm start