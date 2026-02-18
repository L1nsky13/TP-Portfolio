package router

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"portfolio/src/temps"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Task struct {
	ID        int64  `json:"id"`
	Text      string `json:"text"`
	Priority  string `json:"priority"`
	Completed bool   `json:"completed"`
	CreatedAt string `json:"createdAt"`
}

var dbTodo *sql.DB

func InitTodoRoute() {
	connectDBTodo()
	if dbTodo != nil {
		createTableTodo()
	}

	http.HandleFunc("/todo", func(w http.ResponseWriter, r *http.Request) {
		temps.Tmpl.ExecuteTemplate(w, "todos.html", nil)
	})

	http.HandleFunc("/api/tasks", tasksHandler)
	http.HandleFunc("/api/tasks/", taskActionHandler)
	http.HandleFunc("/api/tasks/clear", clearHandler)
}

func connectDBTodo() {
	SCALINGO_MYSQL_USER := os.Getenv("SCALINGO_MYSQL_USER")

	SCALINGO_MYSQL_PASSWORD := os.Getenv("SCALINGO_MYSQL_PASSWORD")

	SCALINGO_MYSQL_HOST := os.Getenv("SCALINGO_MYSQL_HOST")

	SCALINGO_MYSQL_PORT := os.Getenv("SCALINGO_MYSQL_PORT")

	SCALINGO_MYSQL_DB := os.Getenv("SCALINGO_MYSQL_DB")

	// Si l'une des variables d'environnement est manquante, on saute la connexion DB
	if SCALINGO_MYSQL_USER == "" || SCALINGO_MYSQL_PASSWORD == "" || SCALINGO_MYSQL_HOST == "" || SCALINGO_MYSQL_PORT == "" || SCALINGO_MYSQL_DB == "" {
		log.Println("Variables d'environnement Scalingo manquantes - Base de données désactivée")
		return
	}

	dsn := SCALINGO_MYSQL_USER + ":" + SCALINGO_MYSQL_PASSWORD + "@tcp(" + SCALINGO_MYSQL_HOST + ":" + SCALINGO_MYSQL_PORT + ")/" + SCALINGO_MYSQL_DB

	var err error
	if dbTodo, err = sql.Open("mysql", dsn); err != nil {
		log.Println("Erreur ouverture DB:", err)
		return
	}

	if err = dbTodo.Ping(); err != nil {
		log.Println("Erreur connexion DB:", err)
		dbTodo = nil
		return
	}
	log.Println("Connecte a la base de donnees avec succes")
}

func createTableTodo() {
	query := `CREATE TABLE IF NOT EXISTS tasks (
		id INT AUTO_INCREMENT PRIMARY KEY,
		text TEXT NOT NULL,
		priority VARCHAR(20),
		completed BOOLEAN DEFAULT FALSE,
		created_at VARCHAR(50)
	)`
	if _, err := dbTodo.Exec(query); err != nil {
		log.Fatal("Erreur creation table:", err)
	}
}

func jsonResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}

func tasksHandler(w http.ResponseWriter, r *http.Request) {
	if dbTodo == nil {
		http.Error(w, "Base de données non disponible", 503)
		return
	}

	if r.Method == "GET" {
		rows, err := dbTodo.Query("SELECT id, text, priority, completed, created_at FROM tasks ORDER BY id DESC")
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		defer rows.Close()

		var tasks []Task
		for rows.Next() {
			var t Task
			if err := rows.Scan(&t.ID, &t.Text, &t.Priority, &t.Completed, &t.CreatedAt); err == nil {
				tasks = append(tasks, t)
			}
		}
		if tasks == nil {
			tasks = []Task{}
		}
		jsonResponse(w, 200, tasks)
		return
	}

	if r.Method == "POST" {
		var t Task
		if json.NewDecoder(r.Body).Decode(&t) != nil {
			http.Error(w, "Bad Request", 400)
			return
		}
		if t.CreatedAt == "" {
			t.CreatedAt = time.Now().Format(time.RFC3339)
		}

		res, err := dbTodo.Exec("INSERT INTO tasks(text, priority, completed, created_at) VALUES(?, ?, ?, ?)",
			t.Text, t.Priority, t.Completed, t.CreatedAt)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		t.ID, _ = res.LastInsertId()
		jsonResponse(w, 201, t)
		return
	}
	http.Error(w, "Method not allowed", 405)
}

func taskActionHandler(w http.ResponseWriter, r *http.Request) {
	if dbTodo == nil {
		http.Error(w, "Base de données non disponible", 503)
		return
	}

	var t Task
	if json.NewDecoder(r.Body).Decode(&t) != nil {
		http.Error(w, "Bad Request", 400)
		return
	}

	if r.Method == "PUT" {
		if _, err := dbTodo.Exec("UPDATE tasks SET text=?, priority=?, completed=? WHERE id=?",
			t.Text, t.Priority, t.Completed, t.ID); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, t)
		return
	}

	if r.Method == "DELETE" {
		if _, err := dbTodo.Exec("DELETE FROM tasks WHERE id=?", t.ID); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, map[string]string{"result": "deleted"})
		return
	}
	http.Error(w, "Method not allowed", 405)
}

func clearHandler(w http.ResponseWriter, r *http.Request) {
	if dbTodo == nil {
		http.Error(w, "Base de données non disponible", 503)
		return
	}

	if r.Method == "DELETE" {
		if _, err := dbTodo.Exec("TRUNCATE TABLE tasks"); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		jsonResponse(w, 200, map[string]string{"result": "cleared"})
		return
	}
	http.Error(w, "Method not allowed", 405)
}
