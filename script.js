document.addEventListener("DOMContentLoaded", function() {
    fetch(`https://japceibal.github.io/japflix_api/movies-data.json`)
    .then(response => response.json())
    .then(data => {console.log(data); movies=data})
});

document.getElementById("btnBuscar").addEventListener("click", function() {
    searchText = document.getElementById('inputBuscar').value.toLowerCase();
    if(searchText !== '') {
        moviesFiltered = movies.filter(movie => {
            title = movie.title.toLowerCase();
            tagline = movie.tagline.toLowerCase();
            overview = movie.overview.toLowerCase();
            genres = movie.genres.map(genre => genre.name.toLowerCase());
            return title.includes(searchText) || tagline.includes(searchText) || overview.includes(searchText) ||
            genres.some(genre => genre.includes(searchText))
        });
        console.log(moviesFiltered);
        showMovies(moviesFiltered)
    } else {
        return
    }
});

function showMovies(array) {
    list = document.getElementById("lista");
    list.innerHTML = "";
    array.forEach((movie) => {
        list.innerHTML += `
            <li class="list-group-item bg-dark mb-1 rounded" data-bs-toggle="offcanvas"
             data-bs-target="#a${movie.id}" maria-controls="offcanvasTop">
                <h5 class="fw-bold text-white">${movie.title}<span class="float-end card-text">
                ${stars(movie.vote_average)}</span></h5>
                <p class="text-muted fst-italic">${movie.tagline}</p>
            </li>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="a${movie.id}" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body pb-0">
                    <div>${movie.overview}
                    <hr></div>
                    <div>${movie.genres.map(genre => genre.name).join(' - ')}</div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle float-end mx-4 mb-4" type="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                        More info
                    </button>
                    <ul class="dropdown-menu mt-1">
                        <li class="dropdown-item">Year: <span class="float-end">${movie.release_date.substring(0, 4)}</span></li>
                        <li class="dropdown-item">Runtime: <span class="float-end">${movie.runtime} mins.</span></li>
                        <li class="dropdown-item">Budget: <span class="float-end">$${movie.budget}</span></li>
                        <li class="dropdown-item">Revenue: <span class="float-end">$${movie.revenue}</span></li>
                    </ul>
                </div>
            </div>`
    });
}

function stars(vote) {
    v = Math.floor(vote / 2);
    return '<span class="fa fa-star checked"></span>'.repeat(v)
    + '<span class="fa fa-star not-checked"></span>'.repeat(5 - v);
}