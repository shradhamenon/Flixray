let submit = document.querySelector("#submit");

submit.addEventListener("click", function () {

    document.querySelector("#image").innerHTML = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#cast").innerHTML = "";

    let movie = document.querySelector("#movieTitle");
    let movieTitle = movie.value;
    let year = document.querySelector("#year");
    let yearValue = year.value;

    let words = movieTitle.split(/\W+/);
    let movieURL = words.join("+");

    let searchURL = "http://www.omdbapi.com/?t=" + movieURL + "&y=" + yearValue + "&apikey=";


    let xhr = new XMLHttpRequest();

    xhr.open("GET", searchURL, true);

    xhr.onload = function () {

        let data = JSON.parse(this.responseText);

        document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Title: </strong>' + data.Title + '</li><li class="list-group-item list-group-item-dark"> <strong>Director: </strong>' + data.Director + '</li><li class="list-group-item list-group-item-dark"> <strong>Main Cast: </strong>' + data.Actors + '</li><li class="list-group-item list-group-item-dark"> <strong>Release Year: </strong>' + data.Year + '</li><li class="list-group-item list-group-item-dark"> <strong>Genre: </strong>' + data.Genre + '</li><li class="list-group-item list-group-item-dark"> <strong>Plot: </strong>' + data.Plot + '</li> <li class="list-group-item list-group-item-dark"><strong>IMDb</strong>: '+ data.imdbRating + '</li><li class="list-group-item list-group-item-dark"> <strong>Awards: </strong>' + data.Awards + '</li></ul>';
        let imdbID = data.imdbID;
        
        let posterURL = "https://api.themoviedb.org/3/movie/" + imdbID + "?api_key=&language=en-US";


        let xhr_poster = new XMLHttpRequest();

        xhr_poster.open("GET", posterURL, true);

        xhr_poster.onload = function () {
            if (this.status == 200) {

                let details = JSON.parse(this.responseText);

                document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + details.poster_path + '">';
            }
        }
        xhr_poster.send();


        let castURL = "https://api.themoviedb.org/3/movie/" + imdbID + "/credits?api_key=";


        let xhr_cast = new XMLHttpRequest();

        xhr_cast.open("GET", castURL, true);

        xhr_cast.onload = function () {
            if (this.status == 200) {

                let castCrew = JSON.parse(this.responseText);

                let output = '';
                output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Full Cast:</strong></li>';
                for (let i = 0; i < castCrew.cast.length; ++i) {
                    output += '<li class="list-group-item list-group-item-secondary"><Strong>' + castCrew.cast[i].name + ":</strong> " + castCrew.cast[i].character + "</li>";
                }

                output += '</ul>'

                document.querySelector("#cast").innerHTML = output;
            }
        }
        xhr_cast.send();
    }
    xhr.send();
});
