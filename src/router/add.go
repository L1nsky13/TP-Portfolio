package router

import (
	"net/http"
	"portfolio/src/temps"
)

func InitAddRoute() {
	http.HandleFunc("/todo/add", func(w http.ResponseWriter, r *http.Request) {
		temps.Tmpl.ExecuteTemplate(w, "todos.html", nil)
	})
}
