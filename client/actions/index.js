import axios from 'axios';

export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';
export function sideBarToggle() {
  return {
    type: SIDEBAR_TOGGLE,
  }
}


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
  let url = `/api/openstack/createinstance/`;
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
export function isDeployed(repoID) {
  let url = `/api/database/checkdeployed`;
   let request = axios.get(url, {
    params: {
      repoid: repoID
    }
  });

  return {
    type: ISDEPLOYED,
    payload: request
  }
}

export const SSHPOSTINSTALL = 'SSHPOSTINSTALL'
export function sshPostInstall(repoID) {
  let url = `/api/ssh2/startsshpostinstall`;
  let request = axios.get(url, {
    params: {
      repoid: repoID
    }
  });


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

//
//Get SSH Login
//
export const SSH_LOGIN = 'SSH_LOGIN'
export function sshLogin() {
  let url = '/api/database/instancelogin'
  let request = axios.get(url);

  return {
    type: SSH_LOGIN,
    payload: request
  }

}

//
//REBOOT INSTANCE
//
export const REBOOT_INST = 'REBOOT_INST'
export function rebootInstance(type) {
  let url = '/api/ovh/reboot';
  let request = axios.get(url, {
    params: {
      type: type
    }
  })
  .then(function (response) {
    console.log('response: ', response);
    return response;
  })
  .catch(function (err) {
    console.error(err);
  })

  return {
    type: REBOOT_INST,
    payload: request,
  }

}

//
//REINSTALL INSTANCE
//
export const REINSTALL_INST = 'REINSTALL_INST'
export function reInstallInstance() {
  let url = '/api/ovh/reinstall'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Reinstall Errr:", err);
  })

  return {
    type: REINSTALL_INST,
    payload: request,
  }
}

//
//ENABLE INSTANCE RESCUE
//
export const RESCUE_INSTANCE = 'RESCUE_INSTANCE'
export function rescueInstance() {
  let url = '/api/ovh/rescuemode'
  let request = axios.get(url);

  return {
    type: RESCUE_INSTANCE,
    payload: request,
  }
}


//
//Instance backup Tools
//
export const CREATE_BACKUP = 'CREATE_BACKUP'
export function createBackup() {
  let url = '/api/ovh/createbackup'
  let request = axios.get(url);

  return {
    type: 'CREATE_BACKUP',
    payload: request,
  }
}

export const GETSNAPSHOT_STATUS = 'GETSNAPSHOT_STATUS'
export function getSnapshotStatus() {
  let url = '/api/ovh/getsnapshotstatus'
  let request = axios.get(url);

  return {
    type: 'GETSNAPSHOT_STATUS',
    payload: request,
  }
}

export const DELETE_BACKUP = 'DELETE_BACKUP'
export function deleteBackup() {
  let url = '/api/ovh/deletebackup'
  let request = axios.get(url);

  return {
    type: 'DELETE_BACKUP',
    payload: request,
  }
}

export const LIST_BACKUPS = 'LIST_BACKUPS'
export function listBackups() {
  let url = '/api/ovh/listbackups'
  let request = axios.get(url);

  return {
    type: 'LIST_BACKUPS',
    payload: request,
  }
}

//
// App management
//

//Get Deployed Repo Info
export const DEPLOYED_REPO = 'DEPLOYED_REPO'
export function deployedRepo() {
  let url = 'api/database/getdeployed'
  let request = axios.get(url)
  .then(function (response) {
    console.log(" deployed repo working")
    return response;
  })
  .catch(function (err) {
    console.error("Deployed Repo Error:", err);
  })

  return {
    type: DEPLOYED_REPO,
    payload: request,
  }
}

// create new subdomain
export const CREATE_SUBDOMAIN = 'CREATE_SUBDOMAIN'
export function createSubdomain(name) {
  let url = '/api/ssh2/createsubdomain/'
  let request = axios.get(url + ":" + name)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Reinstall Deployed Repo Error:", err);
  })

  return {
    type: CREATE_SUBDOMAIN,
    payload: request,
  }
}

//Update from Github
export const GITHUB_UPDATE = 'GITHUB_UPDATE'
export function githubUpdate() {
  let url = 'api/ssh2/updatefromgithub'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Github update Error:", err);
  })

  return {
    type: GITHUB_UPDATE,
    payload: request,
  }
}

//Restart the deployed Repo
export const RESTART_REPO = 'RESTART_REPO'
export function restartRepo() {
  let url = 'api/ssh2/startforever'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Start Forever Error:", err);
  })

  return {
    type: RESTART_REPO,
    payload: request,
  }
}

//Delete the deployed Repo
export const DELETE_REPO = 'DELETE_REPO'
export function deleteRepo() {
  let url = 'api/ssh2/deletedeployedrepo'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Delete Deployed Repo Error:", err);
  })

  return {
    type: DELETE_REPO,
    payload: request,
  }
}

//Reinstall Deployed Repo
export const REINSTALL_REPO = 'REINSTALL_REPO'
export function reinstallRepo(repoID) {
  let url = 'api/ssh2/startsshpostinstall'
  let request = axios.get(url, {
    params: {
      repoid: repoID
    }
  })
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Reinstall Deployed Repo Error:", err);
  })

  return {
    type: REINSTALL_REPO,
    payload: request,
  }
}

//
//App Status Update
//

//Stats Top 
export const OUTPUT_TOP = 'OUTPUT_TOP'
export function outputTop() {
  let url = '/api/daemon/stats/top'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Output Top Error:", err);
  })

  return {
    type: OUTPUT_TOP,
    payload: request,
  }
}

//Stats Forever 
export const OUTPUT_FOREVER = 'OUTPUT_FOREVER'
export function outputForever() {
  let url = '/api/daemon/stats/forever'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Output Forever Error:", err);
  })

  return {
    type: OUTPUT_FOREVER,
    payload: request,
  }
}

//Stats Print Env 
export const OUTPUT_PRINTENV = 'OUTPUT_PRINTENV'
export function outputprintEnv() {
  let url = '/api/daemon/stats/printenv'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Output PrintEnv Error:", err);
  })

  return {
    type: OUTPUT_PRINTENV,
    payload: request,
  }
}

//Stats Uptime
export const OUTPUT_UPTIME = 'OUTPUT_UPTIME'
export function outputUptime() {
  let url = '/api/daemon/stats/uptime'
  let request = axios.get(url)
  .then(function (response) {
    return response;
  })
  .catch(function (err) {
    console.error("Output Uptime Error:", err);
  })

  return {
    type: OUTPUT_UPTIME,
    payload: request,
  }
}

//Set RepoID
export const SETREPOID = 'SETREPOID'
export function setRepoID(repoID) {
 
  return {
    type: SETREPOID,
    payload: repoID
  }
  
}

export const GET_ENV_VAR = 'GET_ENV_VAR'
export function getEnvVar(repoID) {
  let url = `/api/ssh2/getenv/${repoID}`;
  let request = axios.get(url);


  return {
    type: GET_ENV_VAR,
    payload: request
  }
}

export const SET_ENV_VAR = 'SET_ENV_VAR'
export function setEnvVar(varData, repoID) {
  let url = `/api/ssh2/setenv/${repoID}`;
  let request = axios.post(url, varData);


  return {
    type: SET_ENV_VAR,
    payload: request
  }
}

export const UPDATE_ENV_VAR = 'UPDATE_ENV_VAR'
export function updateEnvVar() {
 
  return {
    type: UPDATE_ENV_VAR
  }
}

export const UPDATE_LOG_FILE = 'UPDATE_LOG_FILE'
export function updateLogFile() {
 
  return {
    type: UPDATE_LOG_FILE
  }
}

export const REFRESH_REPO = 'REFRESH_REPO'
export function refreshRepo() {
let url = `/api/github/repos`;
let request = axios.get(url, {
    params: {
      refresh: true
    }
  });

  return {
    type: REFRESH_REPO,
    payload: request
  }
}

