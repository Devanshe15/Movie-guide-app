// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  
  // If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  } else {
    // Use encodeURIComponent to handle movie names with spaces or special characters
    let encodedMovieName = encodeURIComponent(movieName);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=b3e9f0dacf14b8b55586fdbe0d856017&query=${encodedMovieName}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // Check if the response contains results
        if (data.results && data.results.length > 0) {
          let movie = data.results[0]; // Assuming you want details for the first result

          result.innerHTML = `
            <div class="info">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="poster">
                <div>
                    <h2>${movie.title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${movie.vote_average}</h4>
                    </div>
                    <div class="details">
                        <span>${movie.release_date}</span>
                        <span>${movie.runtime} min</span>
                    </div>
                    <div class="genre">
                        <div>${movie.genres.map(genre => genre.name).join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Overview:</h3>
            <p>${movie.overview}</p>
          `;
        } else {
          result.innerHTML = `<h3 class='msg'>Movie not found</h3>`;
        }
      })
      // If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
// Remove the window.load event listener since it's unnecessary

