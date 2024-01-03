document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  const description = document.getElementById("description");
  let userInput;

  const apiKey = "86e74425"; // Replace with your actual API key

  searchButton.addEventListener("click", () => {
    userInput = search.value.trim();
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${userInput}`)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous search results
        description.innerHTML = "";
        description.style.display = "block";

        // Check if the search was successful
        if (data.Response === "True") {
          // Iterate through each movie and create a div for it
          data.Search.forEach((movie) => {
            description.style.visibility = "visible";
            const movieDiv = document.createElement("div");

            // Create a clickable link for each movie
            const link = document.createElement("a");
            link.href = `movie.html?imdbID=${movie.imdbID}`; // Update with your link structure
            link.innerText = `${movie.Title} (Year: ${movie.Year})`; // Display movie title and year
            movieDiv.appendChild(link);

            description.appendChild(movieDiv);
          });
        } else {
          // Display an error message if the search was not successful
          const errorDiv = document.createElement("div");
          errorDiv.innerHTML = `<h1>${data.Error}</h1>`;
          description.appendChild(errorDiv);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
