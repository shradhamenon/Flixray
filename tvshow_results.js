let submit = document.querySelector("#submit");

submit.addEventListener("click", function () {

    document.querySelector("#image").innerHTML = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#tmdbresult").innerHTML = "";
    document.querySelector("#still").innerHTML = "";
    document.querySelector("#maincast").innerHTML = "";
    document.querySelector("#guestcast").innerHTML = "";

    let tvshow = document.querySelector("#tvshow").value;
    let season = document.querySelector("#season").value;
    let episode = document.querySelector("#episode").value;
    let year = document.querySelector("#year").value;

    if (tvshow != "" && season == "" && episode == "") {

        let words = tvshow.split(/\W+/);
        let tvURL = words.join("%20");

        let searchURL = "https://api.themoviedb.org/3/search/tv?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US&query=" + tvURL + "&page=1&first_air_date_year=" + year;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", searchURL, true);

        xhr.onload = function () {
            if (this.status == 200) {

                let tmdbdata = JSON.parse(this.responseText).results[0];
                let id = tmdbdata.id;
                let poster_path = tmdbdata.poster_path;

                document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + poster_path + '">';

                let tmdbURL = "https://api.themoviedb.org/3/tv/" + id + "?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US"
                console.log(tmdbURL);

                let xhrtmdb = new XMLHttpRequest();

                xhrtmdb.open("GET", tmdbURL, true);

                xhrtmdb.onload = function () {
                    if (this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        if (data.next_episode_to_air != null) {
                            document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Title: </strong>' + data.name + '</li><li class="list-group-item list-group-item-dark"> <strong>First Air Date: </strong>' + data.first_air_date + '</li><li class="list-group-item list-group-item-dark"> <strong>Genre: </strong>' + data.genres[0].name + '</li><li class="list-group-item list-group-item-dark"> <strong>Plot: </strong>' + data.overview + '</li><li class="list-group-item list-group-item-dark"> <strong>Number Of Seasons: </strong>' + data.number_of_seasons + '</li><li class="list-group-item list-group-item-dark"> <strong>Number Of Episodes: </strong>' + data.number_of_episodes + '</li><li class="list-group-item list-group-item-dark"><strong>Next Episode: <br>Date: </strong>' + data.next_episode_to_air.air_date + '<br><strong>Episode Name: </strong>' + data.next_episode_to_air.name + '<br><strong>Season: </strong>' + data.next_episode_to_air.season_number + '<br><strong>Episode: </strong>' + data.next_episode_to_air.episode_number + '</li><li class="list-group-item list-group-item-dark"><strong>Last Episode: <br>Date: </strong>' + data.last_episode_to_air.air_date + '<br><strong>Episode Name: </strong>' + data.last_episode_to_air.name + '<br><strong>Season: </strong>' + data.last_episode_to_air.season_number + '<br><strong>Episode: </strong>' + data.last_episode_to_air.episode_number + '</li><li class="list-group-item list-group-item-dark"><strong>Network</strong>: ' + data.networks[0].name + '</li><li class="list-group-item list-group-item-dark"> <strong>Type: </strong>' + data.type + '</li><li class="list-group-item list-group-item-dark"> <strong>Status: </strong>' + data.status + '</li></ul>';
                        } else {
                            document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Title: </strong>' + data.name + '</li><li class="list-group-item list-group-item-dark"> <strong>First Air Date: </strong>' + data.first_air_date + '</li><li class="list-group-item list-group-item-dark"> <strong>Genre: </strong>' + data.genres[0].name + '</li><li class="list-group-item list-group-item-dark"> <strong>Plot: </strong>' + data.overview + '</li><li class="list-group-item list-group-item-dark"> <strong>Number Of Seasons: </strong>' + data.number_of_seasons + '</li><li class="list-group-item list-group-item-dark"> <strong>Number Of Episodes: </strong>' + data.number_of_episodes + '</li><li class="list-group-item list-group-item-dark"><strong>Last Episode: <br>Date: </strong>' + data.last_episode_to_air.air_date + '<br><strong>Episode Name: </strong>' + data.last_episode_to_air.name + '<br><strong>Season: </strong>' + data.last_episode_to_air.season_number + '<br><strong>Episode: </strong>' + data.last_episode_to_air.episode_number + '</li><li class="list-group-item list-group-item-dark"><strong>Network</strong>: ' + data.networks[0].name + '</li><li class="list-group-item list-group-item-dark"> <strong>Type: </strong>' + data.type + '</li><li class="list-group-item list-group-item-dark"> <strong>Status: </strong>' + data.status + '</li></ul>';
                        }
                    }
                }
                xhrtmdb.send();

                let castURL = "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US";


                let xhr_cast = new XMLHttpRequest();

                xhr_cast.open("GET", castURL, true);

                xhr_cast.onload = function () {
                    if (this.status == 200) {

                        let castCrew = JSON.parse(this.responseText);

                        let output = '';
                        output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Cast:</strong></li>';
                        for (let i = 0; i < castCrew.cast.length; ++i) {
                            output += '<li class="list-group-item list-group-item-secondary"><Strong>' + castCrew.cast[i].name + ":</strong> " + castCrew.cast[i].character + "</li>";
                        }

                        output += '</ul>'

                        document.querySelector("#maincast").innerHTML = output;
                    }
                }
                xhr_cast.send();
            }
        }
        xhr.send();

    } else if (tvshow != "" && season != "" && episode == "") {
        let words = tvshow.split(/\W+/);
        let tvURL = words.join("%20");

        let searchURL = "https://api.themoviedb.org/3/search/tv?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US&query=" + tvURL + "&page=1&first_air_date_year=" + year;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", searchURL, true);

        xhr.onload = function () {
            if (this.status == 200) {

                let tmdbdata = JSON.parse(this.responseText).results[0];
                let id = tmdbdata.id;

                let tmdbURL = "https://api.themoviedb.org/3/tv/" + id + "/season/" + season + "?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US"

                let xhrtmdb = new XMLHttpRequest();

                xhrtmdb.open("GET", tmdbURL, true);

                xhrtmdb.onload = function () {
                    if (this.status == 200) {
                        let data = JSON.parse(this.responseText);
                        if (data.poster_path != null) {
                            document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + data.poster_path + '">';
                        } else {
                            document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + tmdbdata.poster_path + '">';
                        }
                        document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Title: </strong>' + tmdbdata.name + '</li><li class="list-group-item list-group-item-dark"> <strong>Season: </strong>' + data.season_number + '</li><li class="list-group-item list-group-item-dark"> <strong>Air Date: </strong>' + data.air_date + '</li><li class="list-group-item list-group-item-dark"> <strong>Number Of Episodes: </strong>' + data.episodes.length + '</li></ul>';

                        let castURL = "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US";


                        let xhr_cast = new XMLHttpRequest();

                        xhr_cast.open("GET", castURL, true);

                        xhr_cast.onload = function () {
                            if (this.status == 200) {

                                let castCrew = JSON.parse(this.responseText);

                                let output = '';
                                output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Cast:</strong></li>';
                                for (let i = 0; i < castCrew.cast.length; ++i) {
                                    output += '<li class="list-group-item list-group-item-secondary"><Strong>' + castCrew.cast[i].name + ":</strong> " + castCrew.cast[i].character + "</li>";
                                }

                                output += '</ul>'

                                document.querySelector("#maincast").innerHTML = output;
                            }
                        }
                        xhr_cast.send();
                    }
                }
                xhrtmdb.send();
            }
        }
        xhr.send();

    } else if (tvshow != "" && season != "" && episode != "") {
        let words = tvshow.split(/\W+/);
        let tvURL = words.join("%20");

        let searchURL = "https://api.themoviedb.org/3/search/tv?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US&query=" + tvURL + "&page=1&first_air_date_year=" + year;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", searchURL, true);

        xhr.onload = function () {
            if (this.status == 200) {

                let tmdbdata = JSON.parse(this.responseText).results[0];
                let id = tmdbdata.id;

                let tmdbURL = "https://api.themoviedb.org/3/tv/" + id + "/season/" + season + "?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US"

                let xhrtmdb = new XMLHttpRequest();

                xhrtmdb.open("GET", tmdbURL, true);

                xhrtmdb.onload = function () {
                    if (this.status == 200) {
                        let seasondata = JSON.parse(this.responseText);

                        if (seasondata.poster_path != null) {
                            document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + seasondata.poster_path + '">';
                        } else {
                            document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + tmdbdata.poster_path + '">';
                        }
                        let episodeURL = "https://api.themoviedb.org/3/tv/" + id + "/season/" + season + "/episode/" + episode + "?api_key=8a80aa54812dcf19c30c6f1942c5684c&language=en-US";

                        let xhrepisode = new XMLHttpRequest();

                        xhrepisode.open("GET", episodeURL, true);

                        xhrepisode.onload = function () {
                            if (this.status == 200) {
                                let data = JSON.parse(this.responseText);
                                document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Title: </strong>' + tmdbdata.name + '</li><li class="list-group-item list-group-item-dark"> <strong>Season: </strong>' + season + '</li><li class="list-group-item list-group-item-dark"> <strong>Episode: </strong>' + episode + '</li><li class="list-group-item list-group-item-dark"> <strong>Air Date: </strong>' + data.air_date + '</li><li class="list-group-item list-group-item-dark"> <strong>Episode Name: </strong>' + data.name + '</li><li class="list-group-item list-group-item-dark"> <strong>Plot: </strong>' + data.overview + '</li></ul>';
                                document.querySelector("#still").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + data.still_path + '">';


                                let castURL = "https://api.themoviedb.org/3/tv/" + id + "/season/" + season + "/episode/" + episode + "/credits?api_key=8a80aa54812dcf19c30c6f1942c5684c"

                                let xhr_cast = new XMLHttpRequest();

                                xhr_cast.open("GET", castURL, true);

                                xhr_cast.onload = function () {
                                    if (this.status == 200) {

                                        let castCrew = JSON.parse(this.responseText);

                                        let output = '';
                                        output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Main Cast:</strong></li>';
                                        for (let i = 0; i < castCrew.cast.length; ++i) {
                                            output += '<li class="list-group-item list-group-item-secondary"><Strong>' + castCrew.cast[i].name + ":</strong> " + castCrew.cast[i].character + "</li>";
                                        }

                                        output += '</ul>'

                                        document.querySelector("#maincast").innerHTML = output;

                                        let guest_output = '';
                                        guest_output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Guest Cast:</strong></li>';
                                        for (let i = 0; i < castCrew.guest_stars.length; ++i) {
                                            guest_output += '<li class="list-group-item list-group-item-secondary"><Strong>' + castCrew.guest_stars[i].name + ":</strong> " + castCrew.guest_stars[i].character + "</li>";
                                        }

                                        guest_output += '</ul>'

                                        document.querySelector("#guestcast").innerHTML = guest_output;
                                    }
                                }
                                xhr_cast.send();


                            }
                        }
                        xhrepisode.send();
                    }
                }
                xhrtmdb.send();
            }
        }
        xhr.send();
    }
});
