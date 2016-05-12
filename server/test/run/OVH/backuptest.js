require('../../test-helper.js')

const expect = require('chai').expect;
const OVH = require('../../../apis/logic/ovh/logic.js');
const OVHAPI = require('../../../apis/ovh.js');
const SnapShot = require('../../../database/models/snapshots.js');
const User = '13039425';

describe('OVH Instance SnapShot Functionality', function() {

  it_('Should Create a New SnapShot', function * () {
    this.timeout(15000);

    // Wipe out any backups to start test.
    try {
      yield OVH.deleteBackup(User)
    } catch (error) {
      console.log(error)
    }

    
    var createBackup = yield OVH.createBackup(User)
    var dbBackup = yield SnapShot.find({ ownerid: User })
    dbBackup = dbBackup[0];

    expect( dbBackup ).to.be.a('object')
    expect( dbBackup ).to.have.property('name')
    expect( dbBackup ).to.have.property('id')
    expect( dbBackup.status ).to.equal('queued')
    expect( dbBackup.ownerid ).to.equal(User)

    expect( createBackup ).to.be.a('object')
    expect( createBackup ).to.have.property('name')
    expect( createBackup ).to.have.property('id')
    expect( createBackup.status ).to.equal('queued')
    expect( createBackup.ownerid ).to.equal(User)

    // Lets make sure the backup created & called from the db match.
    expect( createBackup.ownerid ).to.equal(dbBackup.ownerid)
    expect( createBackup.id ).to.equal(dbBackup.id)

  })

  it_('Get SnapShot Status Should return only our Backup', function * () {
    this.timeout(10000);

    var snapStatus = yield OVH.getSnapShotStatus(User)

    expect( snapStatus ).to.be.a('object')
    expect( snapStatus ).to.have.property('status')
    expect( snapStatus.status ).to.equal('queued')
    expect( snapStatus.region ).to.equal('BHS1')
    expect( snapStatus.ownerid ).to.equal(User)

  })

  it_('Get Backups Should return only our Backup', function * () {
    this.timeout(10000);

    var backup = yield OVH.getBackups(User)

    expect( backup ).to.be.a('object')
    expect( backup ).to.have.property('ownerid')
    expect( backup.ownerid ).to.equal(User)

  })

  it_('Should Delete Our Backup', function * () {
    this.timeout(10000);

    // Make sure we have a backup to delete
    var backup = yield SnapShot.find({ ownerid: User })
    var backupId = backup[0].id

    expect( backup.length ).to.be.at.least(1)

    yield OVH.deleteBackup(User)

    // Check our backup is gone from the cloud
    var snap = yield OVHAPI.getSnapshots()
    snap = snap.filter( val => val.id === backupId )

    expect( snap.length ).to.equal(0)

    // Check our backup is gone from the db
    var db = yield SnapShot.find({ ownerid: User })
    expect( db.length ).to.equal(0)

  })

  it_('Delete Backup Should return an Error if no Backup', function * () {
    var err;

    try {
      yield OVH.deleteBackup(User)
    } catch (error) {
      err = error;
    }

    expect( err ).to.equal('No SnapShot Found for Delete!')

  })

  it_('Get Backups Should return an Error if no Backup', function * () {
    var err;

    try {
      yield OVH.getBackups(User)
    } catch (error) {
      err = error;
    }

    expect( err.message ).to.equal('No SnapShot in DB!')

  })

  it_('Get SnapShot Status Should return an Error if no Backup', function * () {
    var err;

    try {
      yield OVH.getSnapShotStatus(User)
    } catch (error) {
      err = error;
    }

    expect( err.message ).to.equal('No SnapShot Found for User!')

  })  

})


