package router

import (
	"fmt"
	"net/http"
	"os"
	"portfolio/src/temps"
)

func InitRoutes() {
	// 1. Servir les fichiers statiques (CSS, JS, Images)
	// Cela permet d'accéder à http://localhost:8080/static/css/style.css par exemple
	fileServer := http.FileServer(http.Dir("./src/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fileServer))

	// 2. Routes pour la page d'accueil et pages principales
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Si l'URL n'est pas exactement "/", on renvoie une 404
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "index.html", nil)
	})

	// Pages du portfolio
	http.HandleFunc("/apropos", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/apropos" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "apropos.html", nil)
	})

	http.HandleFunc("/competences", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/competences" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "competences.html", nil)
	})

	http.HandleFunc("/projets", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/projets" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "projets.html", nil)
	})

	http.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/contact" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "contact.html", nil)
	})

	http.HandleFunc("/todos", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/todos" {
			http.NotFound(w, r)
			return
		}
		temps.Tmpl.ExecuteTemplate(w, "todos.html", nil)
	})

	// 3. Initialisation des routes spécifiques
	InitTodoRoute()
	InitAddRoute()
	InitSuppRoute()
}

func StartServer() {
	// Récupération du port défini par Scalingo (variable d'environnement "PORT")
	port := os.Getenv("PORT")

	// Si aucun port n'est défini (ex: en local), on utilise 8080 par défaut
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Le serveur est démarré ! Rendez-vous sur http://localhost:%s\n", port)

	// Démarrage du serveur sur le port spécifié
	// ":" + port donne par exemple ":8080"
	// Cela écoute sur toutes les interfaces réseau (0.0.0.0), ce qui est requis pour Scalingo/Docker
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Printf("Erreur fatale : %v\n", err)
		os.Exit(1)
	}
}
