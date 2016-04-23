import axios from 'axios';

<<<<<<< d39950a33edfa0424de0778e04a3c57c8f18c23c
export const ROOT_URL = 'http://localhost:9001/api/'
//const ROOT_URL = 'https://api.github.com/users/febtek/repos'

//fetch reposlist from Git Hub after user signs in
export const FETCH_REPOS = 'FETCH_REPOS';
export function fetchRepos() {
  const url = `${ROOT_URL}github/repos`;
=======
//fetch reposlist from Git Hub after user signs in
export const FETCH_REPOS = 'FETCH_REPOS';
export function fetchRepos() {
  const url = './api/github/repos';
>>>>>>> probably making the repolist working
  const request = axios.get(url);
  return {
    type: FETCH_REPOS,
    payload: request
  };
}