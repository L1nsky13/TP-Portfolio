# Utiliser Go comme Build (compilation)
FROM golang:1.21 AS builder
WORKDIR /app

# Copier tous les fichiers Go (incluant src/)
COPY src/main.go ./
RUN go mod init portfolio || true

# Compiler l'application
RUN CGO_ENABLED=0 GOOS=linux go build -o portfolio main.go

# Etape 2: Runtime (image finale légère)
FROM alpine:latest
WORKDIR /app

# Copier l'exécutable compilé
COPY assets ./assets
COPY templates ./templates

# Exposer le port (peut être modifié par Scalingo)
EXPOSE 8080

# Commande pour lancer l'application
CMD ["./portfolio"]
