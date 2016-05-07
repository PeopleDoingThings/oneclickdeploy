var OVH = require('../../ovh.js');
var Helper = require('./helpers.js');
var InstanceDB = require('../../../database/instances.js');
var InstanceLogin = require('../../../database/instancelogin.js');
var SnapShot = require('../../../database/models/snapshots.js');
var OpenStack = require('../../openstack.js');
var Repo = require('../../../database/models/deployablerepos.js');
var Hat = require('hat');


// This maps each service to a list of its information
exports.instanceList = function(user) {
  if(user !== '13039425') return Promise.reject('Unauthorized')

  return OVH.listServices()
  .then( data => data )
  .then( data => Promise.all( resp.map( val => OVH.getServiceInformation(val)) ))
}

exports.imageData = function(version) {
var obj = {
  imageid: undefined,
  flavorid: undefined
}

  return OVH.getImageIDs(version)
  .then(function(data) {
    console.log(data);
    return Helper.checkListImage(data, version);
  })
  .then(function(data) {
    obj.imageid = data;
    return OVH.getFlavorIDs();
  })
  .then(function(data) {
    obj.flavorid = Helper.checkFlavorData(data);
    return obj;
  })
}

// Hard coded our custom snapshot id.
exports.reinstallInstance = function(id) {
  var imgObj = { imageId: process.env.OVH_CUSTOMSNAPSHOT };
  var mongoInstanceId = '';

  return InstanceDB.getUserInstances(id)
    .then(function(data) {
      mongoInstanceId = data[0]._id;
      console.log('found instance for reinstall! = ', data, 'ins id = ', data[0].openstackid);
      return OVH.reinstallInstance(data[0].openstackid, imgObj);
    })
    .then(function(data) {
      console.log('reinstalled instance = ', data, mongoInstanceId)
      return InstanceDB.updateInstanceFromReinstall(data, mongoInstanceId);
    })
    .then(function(data) {          
      Repo.remove({ ownerid: id, deployed: true })
        .then(function(data) {
          console.log('Deployed Repo Removed after Reinstall!');
        })

      return data;
    })
}

exports.checkReady = function(userid) {
  console.log('searching with userid = ', userid)
  var mongoInstanceId = '';
  return InstanceDB.getUserInstances(userid) // Making sure there is an instance connected with this user.
    .then(function(data) {
      console.log('instace data from db = ', data)
      if(!data || data.length === 0) return Promise.reject( new Error('User has No Instance to Check!') )
      mongoInstanceId = data[0]._id;
      console.log('mongoInstanceId = ', mongoInstanceId)
      return OVH.getInstance(data[0].openstackid); // finding from internet here in case state changed.
    })
    .then(function(data) {
      console.log('got ovh ins data on check ready! = ', data)
      if(!data) {
        return Promise.reject( new Error('Instance Still Provisioning, Please Try Again!') )
      }

      return Helper.checkInstanceState(data);
    })
    .then(function(data) {
      console.log('DATA IP IS THIS UNDEFINED???? ==== ', data)
      InstanceDB.updateInstanceState(data, mongoInstanceId) // We update instancelogin data with the ip to complete this dataset.
        .then( obj => InstanceLogin.findAndUpdateIP(userid, data.ip.ip) )

      return data;
    })
}

// Can Refactor these four when time permits.
exports.rebootInstance = function(userid, type) {
  if(!type) return Promise.reject( new Error('Please Specify a Reboot Type!') )

  return InstanceDB.getUserInstances(userid)
    .then( data => OVH.rebootInstance(data[0].openstackid, type) )
}

exports.getInstanceUsage = function(userid, time, type) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OVH.getInstanceUsage(data[0].openstackid, time, type) )
}

exports.getConsoleOutput = function(userid) {
  return InstanceDB.getUserInstances(userid)
    .then( data => OpenStack.getConsoleOutput(data[0].openstackid) )
}

exports.getBackups = function(gitid) {
  return SnapShot.find({ ownerid: gitid })
    .then(function(data) {
      if(data.length === 0) {
        return Promise.reject( new Error('No SnapShot in DB!') )
      }

      return data[0];
    })
}

exports.createBackup = function(gitid) {

  var snapName;
  return SnapShot.find({ ownerid: gitid })
    .then(function(data) {
      if(data.length > 0) {
        return Promise.reject( new Error('User Already Has Snapshot!') )
      }

      return InstanceDB.getUserInstances(gitid);
    })
    .then(function(data) {
      console.log('user instances = ', data);
      return OVH.createSnapShot(data[0].openstackid);
    })
    .then(function(data) {
      console.log('snapshot created name = ', data)
      snapName = data;

      return OVH.getSnapShots();
    })
    .then(function(data) {
      console.log('ovh SnapShots = ', data)
      return Helper.saveSnapShot(data.filter( val => val.name === snapName )[0], gitid);
    })
}

exports.deleteBackup = function(gitid) {
  var snapshotId;

  return SnapShot.find({ ownerid: gitid })
    .then(function(data) {
      console.log('snapshot = ', data)
      if(data.length === 0) {
        return Promise.reject( new Error('No SnapShot Found for Delete!') )
      }

      return data[0];
    })
    .then(function(data) {
      console.log('DB SNapshot = ', data)
      snapshotId = data.id;
      return OVH.getSnapShots();
    })
    .then(function(resp) {
      console.log('response from ovh get snapshots = ', resp)
      var toDelete = resp.filter( val => val.id === snapshotId);
      console.log('toDelete === ', toDelete)
      if(toDelete.length === 0) return Promise.reject( new Error('No SnapShot in DB Matches SnapShot in OpenStack Storage Cloud.') )

      console.log('deleting snapshot = ', toDelete)
      return OVH.deleteSnapShot(toDelete[0].id);
    })
    .then(function(data) {
      console.log('ovh snapshot resp = ')
      if(data !== null) Promise.reject( new Error('Unable to Delete SnapShot!', data) )
      return Snapshot.remove({
        ownerid: snapshotId
      })
    })
}

exports.rescueReboot = function(gitid, state) {
  console.log('starting rescuemode = ', gitid, state)
  return InstanceDB.getUserInstances(gitid)
    .then(function(data) {
      console.log('rescuemode instances = ', data)
      if(data.length === 0) return Promise.reject( new Error( 'No User Instance Found' ) );

      return OVH.rescueReboot(data[0].openstackid, state);
    })
}

exports.getSnapShotStatus = function(gitid) {
  var snapShotDbId;

  return SnapShot.find({ ownerid: gitid })
    .then(function(data) {
      if(data.length === 0) return Promise.reject( new Error('No SnapShot Found for User!') )

      return data[0];
    })
    .then(function(data) {
      snapShotDbId = data._id;
      console.log('snapshot stats from db = ', data)
      return OVH.getSnapShotStatus(data.id);
    })
    .then(function(data) {
      return SnapShot.findByIdAndUpdate(snapShotDbId, {
        status: data.status
      })
    })
}






