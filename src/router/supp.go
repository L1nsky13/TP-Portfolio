package router

import (
	"net/http"
	"portfolio/src/temps"
)

func InitSuppRoute() {
	http.HandleFunc("/todo/supp", func(w http.ResponseWriter, r *http.Request) {
		temps.Tmpl.ExecuteTemplate(w, "todos.html", nil)
	})
}
