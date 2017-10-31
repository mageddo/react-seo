package main

import (
	"encoding/json"
	"net/http"
	"log"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"io/ioutil"
)

func main(){

	http.HandleFunc("/", func(res http.ResponseWriter, req *http.Request){
		log.Printf("m=/, path=%s", req.URL.Path)
		http.FileServer(http.Dir("./public")).ServeHTTP(res, req)
	})

	http.HandleFunc("/page/", func(res http.ResponseWriter, req *http.Request){
		log.Printf("m=/, path=%s", req.URL.Path)
		http.StripPrefix(req.URL.Path, http.FileServer(http.Dir("./public"))).ServeHTTP(res, req)
	})

	http.HandleFunc("/api/errors", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":
			msg, err := ioutil.ReadAll(r.Body)
			if err != nil {
				log.Printf("path=/api/errors, err=%v\n", err)
			}else{
				fmt.Printf("body=%s\n", string(msg))
			}
		}
	})


	http.HandleFunc("/api/students", func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		
		students := []map[string]interface{}{}

		genre := r.URL.Query().Get("genre")
		log.Printf("m=/students, genre=%s", genre)
		if(genre == ""){
			students = append(students, map[string]interface{}{
				"name": "Elvis",
				"age": 22,
			},
			map[string]interface{}{
				"name": "Bruna",
				"age": 21,
			})
		} else if (genre == "m") {
			students = append(students, map[string]interface{}{
				"name": "Elvis",
				"age": 22,
			})
		} else if (genre == "f") {
			students = append(students, map[string]interface{}{
				"name": "Bruna",
				"age": 21,
			})
		}
		if err := json.NewEncoder(w).Encode(students); err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}
	})

	http.HandleFunc("/api/schools", func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		
		students := []map[string]interface{}{
			map[string]interface{}{
				"name": "Autauga Academy",
				"state": "Alabama",
			},
			map[string]interface{}{
				"name": "Altha Public",
				"state": "Florida",
			}}

		if err := json.NewEncoder(w).Encode(students); err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}
	})

	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT)
	go func() {
		log.Printf("m=exit, before")
		s := <-sigc
		log.Printf("m=exit, msg=%v", s)
		os.Exit(1)
	}()

	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Panicf("Failed to setup the server at port %s", err.Error())
	}


}