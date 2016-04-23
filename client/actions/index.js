import axios from 'axios';

export const apiURL = 'http://localhost:9001/api/'

//fetch reposlist from Git Hub after user signs in
export const FETCH_REPOS = 'FETCH_REPOS';
export function fetchRepos() {
  const url = `${apiURL}github/repos`;
  const request = axios.get(url);
  
  return {
    type: FETCH_REPOS,
    payload: request
  };
}