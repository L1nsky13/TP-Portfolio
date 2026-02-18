package temps

import (
	"html/template"
	"log"
	"os"
	"path/filepath"
)

var Tmpl *template.Template

// PageData structure pour passer des données au template
type PageData struct {
	Title       string
	CurrentPage string
}

// InitTemps initialise les templates HTML
func InitTemps() error {
	var err error

	// Obtenir le répertoire courant
	wd, err := os.Getwd()
	if err != nil {
		return err
	}

	// Chemin absolu pour les templates (dans src/static/templates/)
	templatesPath := filepath.Join(wd, "src", "static", "templates", "*.html")

	log.Printf("Chargement des templates depuis: %s", templatesPath)

	// Charge tous les fichiers .html du dossier templates
	Tmpl, err = template.ParseGlob(templatesPath)
	if err != nil {
		return err
	}
	return nil
}
