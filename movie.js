document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const imdbID = urlParams.get("imdbID");
  const apiKey = "86e74425"; // Replace with your actual API key
  const movieDetailsDiv = document.getElementById("movie-details");
  const favButton = document.getElementById("fav-btn");

  // Display loading message while the page is loading
  movieDetailsDiv.innerHTML = `<h1>Loading...</h1>`;

  if (imdbID) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          const movieDetailsHTML = `
            <h2>${data.Title} (${data.Year})</h2>
            <img src="${data.Poster}" alt="${data.Title} Poster">
            <p><strong>Type:</strong> ${data.Type}</p>
            <p><strong>Cast:</strong> ${data.Actors}</p>
            <p><strong>Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
          `;
          movieDetailsDiv.innerHTML = movieDetailsHTML;

          // Display the "Add to Favorites" button
          favButton.style.display = "block";
          favButton.innerText = "Add to Favorites";

          // Add event listener to the favorite button
          favButton.addEventListener("click", () => {
            addToFavorites(imdbID, data.Title);
            favButton.style.display = "none"; // Hide the button after adding to favorites
          });
        } else {
          movieDetailsDiv.innerHTML = `<h1>${data.Error}</h1>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        movieDetailsDiv.innerHTML = "Error loading data.";
      });
  }
});

// Function to add a movie to favorites
function addToFavorites(imdbID, title) {
  const favorites = getFavorites();

  if (!isInFavorites(imdbID)) {
    // Add to favorites
    favorites.push(imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(`${title} added to favorites.`);
  }
}

// Function to check if a movie is in favorites
function isInFavorites(imdbID) {
  const favorites = getFavorites();
  return favorites.includes(imdbID);
}

// Function to get the current favorites list
function getFavorites() {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}
