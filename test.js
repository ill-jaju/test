$(document).ready(function() {
    $('#addShow').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing

        var show = $('#titleSearch').val().trim(); //takes user input from search
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=50c9867e013d532a54d305162ee29e35&query=" + show;
        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            $('#moviesHere').empty();

            var results = response.results; //ajax results into variable

            for (var i = 0; i < results.length; i++) {

                var str = results[i].title; //lower case search term, replace spaces with dashes
                str = str.replace(/\s+/g, '-').toLowerCase();

                var yearFull = results[i].release_date; //takes release date from themoviedb 
                var year = yearFull.substring(0, 4); //extracts the year
                console.log(year);

                var movieBox = $('<div>'); //creates div for poster + info
                movieBox.addClass('col-xs-12 col-md-6 movieBox');
                movieBox.attr('data-name', str);

                var posterBox = $('<div>'); //creates div for poster
                posterBox.addClass('col-xs-12 col-md-4');

                var img = $('<img>');
                img.addClass('img-responsive');
                img.attr("src", "http://image.tmdb.org/t/p/w185//" + results[i].poster_path);
                posterBox.append(img);

                var infoBox = $('<div>'); //creates div for information
                infoBox.addClass('col-xs-12 col-md-8');

                var information = $('<h5>').html( results[i].title + "<br><br>" + results[i].overview);
                infoBox.append(information);

                var imdbRatings, rottenRatings, metaRatings;
                var queryURL = "http://www.omdbapi.com/?t=" + str + "&y=" + year + "&apikey=40e9cece"; //movie + year query
                
                $.ajax({ //ajax call to omdb for reviews 
                    url: queryURL,
                    method: "GET"
                }).done(function(response) {

                    imdbHundred = response.Ratings[0].Value;
                    imdbNums = imdbHundred.split('/');
                    imdbRatings = parseFloat(imdbNums[0]);

                    rottenRatings = (parseFloat(response.Ratings[1].Value) / 10);

                    metaHundred = (response.Ratings[2].Value);
                    metaNums = metaHundred.split('/');
                    metaRatings = parseFloat(metaNums[0] / 10);

                    //rating results
                    console.log(imdbRatings);
                    console.log(rottenRatings);
                    console.log(metaRatings);

                    var reelRatingAdd = (imdbRatings + rottenRatings + metaRatings);
                    var reelRating = (reelRatingAdd / 3);
                    console.log("Reel Rating is " + Math.round(reelRating * 10) / 10);

                    // var totalRatings = $('<h5>').html( imdbRatings );
                    // infoBox.append(totalRatings);

                });

                movieBox.append(posterBox, infoBox);

                $('#moviesHere').append(movieBox);

            }
        });
    });
});
