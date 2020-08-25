import { beginRequest, endRequest } from './controllers/notification.js';
import API from './api.js';

const endpoints = {
    MOVIES: "data/movies",
    MOVIE_BY_ID: "data/movies/"
};

const api = new API(
    'DEE68EDA-DDF8-E6E9-FF2F-D339A76F6800',
    '8565F8D7-26EB-4BD0-8CEA-BFB8B03265EB',
    endpoints,
    beginRequest,
    endRequest);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

/* 
    този bind го правим, понеже като изнесем функцията 
    от обекта, като референция само чрез e.g api.login,
    губим връзката с this.
*/

// get all movies
export async function getMovies(search) {

    // PAGIN WITH pagesize  - `?pageSize=10offset=20`
    if (!search) {
        return api.get(endpoints.MOVIES);
    } else {
        return api.get(endpoints.MOVIES + `?where=${escape(`genres LIKE '%${search}%'`)}`);
    }
}

// get movie by ID
export async function getMovieById(id) {
    return api.get(endpoints.MOVIE_BY_ID + id);
}

// create movie
export async function createMovie(movie) {
    return api.post(endpoints.MOVIES, movie);
}

// edit movie
export async function updateMovie(id, updateProps) {
    return api.put(endpoints.MOVIE_BY_ID + id, updateProps);
}

// delete movie
export async function deleteMovie(id) {
    return api.delete(endpoints.MOVIE_BY_ID + id);
}

// get movies by userID
export async function getMovieByOwner() {
    const ownerId = localStorage.getItem('userId');

    return api.get(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`);
}

// buy ticket
export async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });

    // obtain userId
    // make request
}