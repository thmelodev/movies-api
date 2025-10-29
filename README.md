# Como iniciar aplicação de forma mais simples

## Rode:
  - Renomeie o arquivo ".env.example" para ".env"
  - docker-compose up --build -d
  - yarn install (ou npm install)
  - yarn migrate:dev (ou npm run migrate:dev)
  - yarn dev (ou npm run dev)

## Rotas

### Buscar Categorias

```
curl --location 'localhost:3001/categories'
```

### Buscar Idiomas

```
curl --location 'localhost:3001/languages'
```

### Criar Filme

```
curl --location 'localhost:3001/movies' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Avatar: Fogo e Cinzas",
  "originalTitle": "Avatar: Fire and Cinzas",
  "synopsis": "Com \"Avatar: Fogo e Cinzas\", James Cameron leva o público de volta a Pandora em uma nova aventura imersiva com o fuzileiro naval que se tornou líder Na'\''vi, Jake Sully (Sam Worthington), a guerreira Na'\''vi Neytiri (Zoe Saldaña) e a família Sully.",
  "ageRating": "16",
  "releaseDate": "2021/08/10",
  "durationMinutes": "87",
  "status": "UPCOMING",
  "language": ID_IDIOMA,
  "budget": 500,
  "revenue": 1300,
  "imageUrl": "http://teste",
  "negativeVoteCount": 20,
  "positiveVoteCount": 2000,
  "categories": [ID_CATEGORIA]
}'

```

### Atualizar Filme

```
curl --location --request PUT 'localhost:3001/movies/ID_FILME' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Avatar: Fogo e Cinzas",
  "originalTitle": "Avatar: Fire and Cinzas",
  "synopsis": "Com \"Avatar: Fogo e Cinzas\", James Cameron leva o público de volta a Pandora em uma nova aventura imersiva com o fuzileiro naval que se tornou líder Na'\''vi, Jake Sully (Sam Worthington), a guerreira Na'\''vi Neytiri (Zoe Saldaña) e a família Sully.",
  "ageRating": "16",
  "releaseDate": "2021/08/10",
  "durationMinutes": "87",
  "status": "UPCOMING",
  "language": ID_IDIOMA,
  "budget": 500,
  "revenue": 1300,
  "imageUrl": "http://teste",
  "negativeVoteCount": 1000,
  "positiveVoteCount": 2000,
  "categories": [ID_CATEGORIA]
}'
```

## Buscar Filmes

```
curl --location 'localhost:3001/movies'
```

## Buscar Filmes by ID

```
curl --location 'localhost:3001/movies/ID_FILME'
```

## Deletar Filme

```
curl --location --request DELETE 'localhost:3001/movies/ID_FILME'
```

