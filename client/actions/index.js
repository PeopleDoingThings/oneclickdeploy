import axios from 'axios';

// export const ROOT_URL = 'http://localhost:9001/api/'
//const ROOT_URL = 'https://api.github.com/users/febtek/repos'

//fetch reposlist from Git Hub after user signs in
export const FETCH_REPOS = 'FETCH_REPOS';
export function fetchRepos() {
  let url = `/api/github/repos`;
  let request = axios.get(url);
  return {
    type: FETCH_REPOS,
    payload: request
  };
}

export const IS_AUTH = 'IS_AUTH'
export function isAuth() {
  let url = `login/isauthenticated`;
  let request = axios.get(url);
  console.log('request', request)

  return {
    type: IS_AUTH,
    payload: request
  }
}

export const INSTANCE_READY = 'INSTANCE_READY'
export function instanceReady() {
  let url = `http://localhost:9001/api/ovh/checkinstanceready/${process.env.TEST_INSTANCE_ID}`;
  let request = axios.get(url);


  return {
    type: INSTANCE_READY,
    payload: request
  }
}