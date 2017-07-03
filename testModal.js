 $(document).ready(function() {

     $('body').on("click", "img", function() {
         var dataId = $(this).attr("data-id");
         var queryURL = "https://api.themoviedb.org/3/movie/" + dataId + "?api_key=50c9867e013d532a54d305162ee29e35";

         $.ajax({ //AJAX call for specific show being clicked
             url: queryURL,
             method: "GET"
         }).done(function(response) {
             $("#modalTitleH4").html(response.original_title);

             $("#modalBodyDiv").empty();

             var tagline = $('<h5>').html('"' + response.tagline + '"');

             $("#modalBodyDiv").append(tagline);

             $("#myModal").modal("show");


         });

         var dataRatings = $(this).attr("data-ratings");
         var queryURLrating = "https://www.omdbapi.com/?t=" + dataRatings + "&apikey=40e9cece";

         console.log(queryURLrating);

         $.ajax({ //AJAX call for specific show being clicked
             url: queryURLrating,
             method: "GET"
         }).done(function(response) {

             $("#modalBodyRatings").empty();

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

             $("#modalBodyRatings").empty();

             var ratings = $('<h5>').html("IMDb = " + imdbRatings + " Rotten Tomatoes = " + rottenRatings + " Metacritic = " + rottenRatings + "<br><br>" + "Reel Rating = " + Math.round(reelRating * 10) / 10);

             $("#modalBodyRatings").append(ratings);

         });
     });

 });