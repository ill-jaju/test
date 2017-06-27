$('#addShow').on("click", function() { //event handler for submit button
        event.preventDefault(); //prevents refreshing
        var show = $('#gifSearch').val().trim(); //takes user input from from
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=50c9867e013d532a54d305162ee29e35&query=" + show;

        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            var results = response.results;
            for (var i = 0; i < results.length; i++) {
                var movieBox = $('<div>');
                movieBox.addClass('col-xs-12');

                var posterBox = $('<div>');
                posterBox.addClass('col-xs-12 col-md-3');

                var img = $('<img>');
                img.attr("src", "http://image.tmdb.org/t/p/w185//" + results[i].poster_path);
                posterBox.append(img);

                var infoBox = $('<div>');
                infoBox.addClass('col-xs-12 col-md-9');                

                var plot = $('<h5>').html(results[i].overview);
                infoBox.append(plot);

                movieBox.append(posterBox);
                movieBox.append(infoBox);

                $('#gifsHere').append(movieBox);
           }
        });

    });