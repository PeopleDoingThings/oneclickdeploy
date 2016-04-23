import axios from 'axios';

export const ROOT_URL = 'http://localhost:9001/api/'
//const ROOT_URL = 'https://api.github.com/users/febtek/repos'

//fetch reposlist from Git Hub after user signs in
export const FETCH_REPOS = 'FETCH_REPOS';
export function fetchRepos() {
  const url = `${ROOT_URL}github/repos`;
  const request = axios.get(url);
  
  return {
    type: FETCH_REPOS,
    payload: request
  };
}