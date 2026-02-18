package main

import (
	"portfolio/src/router"
	"portfolio/src/temps"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		// Le fichier .env est optionnel, on continue sans lui
		// mais on prévient l'utilisateur
		// log.Println("Aucun fichier .env trouvé")
	}

	temps.InitTemps()

	router.InitRoutes()

	router.StartServer()
}
