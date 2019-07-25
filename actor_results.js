let submit = document.querySelector("#submit");

submit.addEventListener("click", function () {

    document.querySelector("#image").innerHTML = "";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#cast").innerHTML = "";

    let actor = document.querySelector("#actor").value;

    let names = actor.split(/\W+/);
    let actorSearchURL = names.join("%20");
    let URL = "https://api.themoviedb.org/3/search/person?api_key=&language=en-US&query=" + actorSearchURL + "&page=1&include_adult=false";
    let xhr = new XMLHttpRequest();

    xhr.open("GET", URL, true);

    xhr.onload = function () {
        if (this.status == 200) {
            let result_page = JSON.parse(this.responseText);
            let result = result_page.results[0];
            let personID = result.id;

            let xhr_actor = new XMLHttpRequest();
            let actorURL = "https://api.themoviedb.org/3/person/" + personID + "?api_key=&language=en-US";
            xhr_actor.open("GET", actorURL, true);

            xhr_actor.onload = function () {
                if (this.status == 200) {
                    let data = JSON.parse(this.responseText);

                    let xhr_image = new XMLHttpRequest();
                    let imageURL = "https://api.themoviedb.org/3/person/" + personID + "/images?api_key=";
                    xhr_image.open("GET", imageURL, true);

                    xhr_image.onload = function () {
                        if (this.status == 200) {
                            let imageList = JSON.parse(this.responseText);
                            document.querySelector("#image").innerHTML = '<img src="http://image.tmdb.org/t/p/w300/' + imageList.profiles[0].file_path + '">';
                        }
                    }
                    xhr_image.send();

                    document.querySelector("#result").innerHTML = '<ul class="list-group"><li class="list-group-item list-group-item-dark"> <strong>Name: </strong>' + data.name + '</li><li class="list-group-item list-group-item-dark"> <strong>Birthday: </strong>' + data.birthday + '</li><li class="list-group-item list-group-item-dark"> <strong>Died: </strong>' + data.deathday + '</li><li class="list-group-item list-group-item-dark"> <strong>Biography: </strong>' + data.biography + '</li></ul>';


                    let xhr_credits = new XMLHttpRequest();
                    let creditURL = "https://api.themoviedb.org/3/person/" + personID + "/combined_credits?api_key=&language=en-US";
                    xhr_credits.open("GET", creditURL, true);

                    xhr_credits.onload = function () {
                        if (this.status == 200) {
                            let creditsList = JSON.parse(this.responseText);
                            let output = '';
                            output += '<ul class="list-group"> <li class="list-group-item list-group-item"><strong>Movie & TV Show Credits:</strong></li>';
                            for (let i = 0; i < creditsList.cast.length; ++i) {
                                if(creditsList.cast[i].title != undefined) {
                                output += '<li class="list-group-item list-group-item-secondary"><Strong>Movie/TV Show Title: </strong>' + creditsList.cast[i].title + "<br><strong>Character Name: </strong>" + creditsList.cast[i].character + "<br><strong>Media Type: </strong><span style='text-transform: capitalize'>" + creditsList.cast[i].media_type + "</span></li>";
                            } else {
                                output += '<li class="list-group-item list-group-item-secondary"><Strong>Movie/TV Show Title: </strong>' + creditsList.cast[i].name + "<br><strong>Character Name: </strong>" + creditsList.cast[i].character + "<br><strong>Media Type: </strong><span style='text-transform: capitalize'>" + creditsList.cast[i].media_type + "</span></li>";
                            }
                        }

                            output += '</ul>'

                            document.querySelector("#cast").innerHTML = output;
                        }
                    }

                    xhr_credits.send();
                }
            }

            xhr_actor.send();
        }
    };
    xhr.send();
});
