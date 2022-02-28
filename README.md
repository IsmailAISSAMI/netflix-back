# Netflix backend

## Graphql requests

1. queries

- get a category:
  ```
  query{
    getCategory(id: "62178a400ca95b2bf8f89955"){id,label}
  }
  ```

- get all categories:
  ```
  query{
    getCategories{id,label}
  }
  ```

- get a movie:
  ```
    query{
      getMovie(id: "6217a2dfa2ea2a4448e7b240"){id,title,image,trailer}
    }
  ```
  
- get movies:
```
  query{
    getMovies{id, title, description, image, trailer, maturityRating, language, releaseDate, duration, director, distribution, scriptwriter, categories{label}}
  }
```

2. Mutations

- Create a new category:
  ```
      mutation{
      createCategory(
          label: "TV Shows"
      ){id,label}
      }
  ```

- Creating a new movie:
  ```
    mutation {
      createMovie(
        title: "John Wick: Chapter 3 - Parabellum"
        image: "https://fr.web.img3.acsta.net/c_310_420/pictures/19/05/21/15/23/4992794.jpg",
        trailer: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
        maturityRating: 16
        language: "Eng",
        releaseDate: 2019,
        duration: "1h40",
        director: "Derek Kolstad",
        scriptwriter: "Derek Kolstad",
        description: "John Wick a transgressé une règle fondamentale : il a tué à l’intérieur même de l’Hôtel Continental. Excommunié, tous les services liés au Continental lui sont fermés et sa tete mise a prix. John se retrouve sans soutien, traque par tous les plus dangereux tueurs du monde."
        categories: ["62178a4b0ca95b2bf8f89957", "62178aae0ca95b2bf8f8996f"]
      ){id}
    }
  ```
