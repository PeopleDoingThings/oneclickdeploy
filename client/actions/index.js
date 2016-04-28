import axios from 'axios';

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

  return {
    type: IS_AUTH,
    payload: request
  }
}

export const INSTANCE_READY = 'INSTANCE_READY'
export function instanceReady() {
  let url = `/api/ovh/checkinstanceready`;
  let request = axios.get(url);


  return {
    type: INSTANCE_READY,
    payload: request
  }
}

export const LOGOUT = 'LOGOUT'
export function logout() {
  let url = `/logout`;
  let request = axios.get(url);


  return {
    type: LOGOUT,
    payload: request
  }
}

export const CREATEINST = 'CREATEINST'
export function createInst() {
  let url = `/api/openstack/createinstance`;
  let request = axios.get(url);


  return {
    type: CREATEINST,
    payload: request
  }
}

export const GETLOG = 'GETLOG'
export function getLog() {
  let url = `/api/ovh/getconsoleoutput`;
  let request = axios.get(url);


  return {
    type: GETLOG,
    payload: request
  }
}

export const ISDEPLOYED = 'ISDEPLOYED'
export function isDeployed() {
  let url = `/api/database/checkdeployed`;
  let request = axios.get(url);


  return {
    type: ISDEPLOYED,
    payload: request
  }
}

export const SSHPOSTINSTALL = 'SSHPOSTINSTALL'
export function sshPostInstall() {
  let url = `/api/ssh2/startsshpostinstall`;
  let request = axios.get(url);


  return {
    type: SSHPOSTINSTALL,
    payload: request
  }
}

//
//Dashboard widgets
//
export const USAGE_MEM = 'USAGE_MEM'
export function usageMemory() {
  let url = '/api/ovh/usagestatistics/?time=lastday&type=mem:used'
  let request = axios.get(url);

  return {
    type: USAGE_MEM,
    payload: request
  }

}

export const USAGE_CPU = 'USAGE_CPU'
export function usageCPU() {
  let url = '/api/ovh/usagestatistics?time=lastday&type=cpu:used'
  let request = axios.get(url);

  return {
    type: USAGE_CPU,
    payload: request
  }

}

export const USAGE_TX = 'USAGE_TX'
export function usageTX() {
  let url = '/api/ovh/usagestatistics/?time=lastday&type=net:tx'
  let request = axios.get(url);

  return {
    type: USAGE_TX,
    payload: request
  }

}

export const USAGE_RX = 'USAGE_RX'
export function usageRX() {
  let url = '/api/ovh/usagestatistics/?time=lastday&type=net:rx'
  let request = axios.get(url);

  return {
    type: USAGE_RX,
    payload: request
  }

}