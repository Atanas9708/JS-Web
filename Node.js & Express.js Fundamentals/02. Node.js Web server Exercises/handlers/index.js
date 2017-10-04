const homePageHandler = require('./home-page-handler');
const staticFileHandler = require('./static-file-handler');
const addMovieHandler = require('./add-movie-handler');
const viewAllMoviesHandler = require('./view-all-movies-handler');
const detailsPageHandler = require('./details-page-handler');
const headersHandler = require('./headers-handler');

module.exports = [
    homePageHandler,
    addMovieHandler,
    viewAllMoviesHandler,
    detailsPageHandler,
    headersHandler,
    staticFileHandler
]
