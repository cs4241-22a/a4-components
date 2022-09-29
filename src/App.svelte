<script>
	// export let name;
  /**
 * Fetch current list of movies
 */
  const getResults = function() {
    const results = fetch('/appdata',
        {
          method: 'GET'
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          json.sort((movie1, movie2) => compareAlphabetical(movie1.title, movie2.title));
          for (let movie of json) {
            if (movie.rank === 1) {
              movie.rankColor = "red"
            }
            else if (movie.rank === 2) {
              movie.rankColor = "orange"
            }
            else if (movie.rank === 3) {
              movie.rankColor = "#ffe100"
            }
            else if (movie.rank === 4) {
              movie.rankColor = "blue"
            }
            else if (movie.rank === 5) {
              movie.rankColor = "green"
            }
          }
          
          return json;
        })

    return results;
  }
  /**
   * Compare method to sort strings alphabetically 
   */
  function compareAlphabetical(str1, str2) {
    return str1.toLowerCase() > str2.toLowerCase() ? 1 : -1;
  }

  /**
  * Send json string to server with info of movie to add
  */
  const addMovie = () => {
    const inputTitle = document.getElementById('movietitletoadd'),
        inputYear = document.getElementById('movieyear'),
        inputRank = document.getElementById('movierank'),
        json = { title: inputTitle.value, year: inputYear.value, rank: inputRank.value },
        body = JSON.stringify(json)

    fetch('/addmovie', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    })
  }

  const deleteMovie = () => {
    const json = { title: document.getElementById('movietitletodelete').value },
    body = JSON.stringify(json);

    fetch('/deletemovie', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    })
  }

  const getMovieDeleteState = function() {
    const state = fetch('/moviedeletestate',
        {
          method: 'GET'
        })
        .then(function (response) {
          return response.text()
        })
        .then(function (text) {
          return text;
        });

    return state;
  }

  let getResultsPromise = getResults();
  let getDeleteStatePromise = getMovieDeleteState();
</script>

	<h1>Movie Ranker</h1>
    <div id="formsection">
      <form id="addform" class="movieform">
        <header id="addmovieheader">Add Movie</header>
        <div class="moviefield">
          <label for="movietitletoadd">Title:</label>
          <input type='text' id='movietitletoadd' placeholder="Enter Movie Title">
        </div>
        <div class="moviefield">
          <label for="movieyear">Year:</label>
          <input type='text' id='movieyear' placeholder="Enter Movie Year">
        </div>
        <div class="moviefield">
          <label for="movierank">Rank(1-5):</label>
          <input type='text' id='movierank' placeholder="Enter Movie Rank">
        </div>
        <button id="additionbutton" on:click={addMovie}>submit</button>
      </form>
      <form id="deleteform" class="movieform" on:submit={deleteMovie}>
        <header id="deletemovieheader">Delete Movie</header>
        <div class="moviefield">
          <label for="movietitletodelete">Title:</label>
          <input type='text' id='movietitletodelete' placeholder="Enter Movie Title">
        </div>
        <button type="submit" id="deletionbutton">delete</button>
        {#await getDeleteStatePromise then text}
          <p id="moviedne" style="color: red;">{text}</p>
        {/await}
      </form>
    </div>
    <h2>Movies:</h2>
      <h3>Rank Key</h3>
      <div id="rankkey">
        <p class="colorbox red">&nbsp;&nbsp;&nbsp;&nbsp;1</p> 
        <p class="colorbox orange">&nbsp;&nbsp;&nbsp;2</p>      
        <p class="colorbox yellow">&nbsp;&nbsp;&nbsp;3</p>      
        <p class="colorbox blue">&nbsp;&nbsp;&nbsp;4</p>      
        <p class="colorbox green">&nbsp;&nbsp;&nbsp;5</p>      
      </div>
      {#await getResultsPromise then results}
        <div id="results">

          {#each results as movie}
            <div class="resultscell" style="border-color: {movie.rankColor}">
              <p id="movietitledisplay">{movie.title}</p>
              <p>{movie.year}</p>
              <br>
              <p>Rank: {movie.rank}</p>
              <p>Date Watched: {movie.date_watched}</p>
              <p>Release vs Watch date: {movie.years_between} years</p>
            </div>
          {/each}

        </div>
      {/await}  