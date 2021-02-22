$(document).ready(() => {
    $('#searchForm').submit((e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        getMovies(searchText);


    });
});

function getMovies(searchText) {
    $.ajax({
        type: "GET",
        url: `http://www.omdbapi.com/?s=${searchText}&i=tt3896198&apikey=c8fa2a97`,
        dataType: "json",
        success: function (res) {
            console.log(res);
            let movies = res.Search;
            console.log(movies);
            let output = '';

            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                  <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div>
              `;
            });
            $('#movies').html(output);
        },
        error: function (err) {
            console.log(err);
        }
    })
};