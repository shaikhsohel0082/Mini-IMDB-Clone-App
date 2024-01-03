document.addEventListener("DOMContentLoaded", () => {
  const favorites = getFavorites();
  const favListContainer = document.getElementById("fav-list");

  if (favorites.length === 0) {
    const noFavoritesMessage = document.createElement("p");
    noFavoritesMessage.innerText = "No favorite movies yet!";
    favListContainer.appendChild(noFavoritesMessage);
  } else {
    favorites.forEach((imdbID) => {
      displayMovieDetails(imdbID, favListContainer);
    });
  }
});

function displayMovieDetails(imdbID, container) {
  const apiKey = "86e74425"; // Replace with your actual API key

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Response === "True") {
        const movieDiv = document.createElement("div");
        movieDiv.innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <img src="${data.Poster}" alt="${data.Title} Poster">
          <p><strong>Cast:</strong> ${data.Actors}</p>
          <p><strong>Rating:</strong> ${data.imdbRating}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <button onclick="removeFromFavorites('${imdbID}')">Remove from Favorites</button>
        `;
        container.appendChild(movieDiv);
      } else {
        console.error("Error fetching movie details:", data.Error);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function removeFromFavorites(imdbID) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== imdbID);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

  // Refresh the displayed favorites list
  const favListContainer = document.getElementById("fav-list");
  favListContainer.innerHTML = ""; // Clear the existing content
  updatedFavorites.forEach((id) => {
    displayMovieDetails(id, favListContainer);
  });
}

function getFavorites() {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}
