require('../../test-helper.js')

const expect = require('chai').expect;
const OVH = require('../../../apis/logic/ovh/logic.js');
const OVHAPI = require('../../../apis/ovh.js');
const SnapShot = require('../../../database/models/snapshots.js');
const User = '13039425';

describe('OVH Instance Rescue Mode', function() {

  it_('Should put the Instance in Rescue Mode', function * () {
    this.timeout(20000);
    
    var rescueMode = yield OVH.rescueReboot(User, 'true')

    expect( rescueMode ).to.be.a('object')
    expect( rescueMode ).to.have.property('adminPassword')
    // Could be 'null' string
    expect( rescueMode.adminPassword ).to.not.equal(null)
    expect( rescueMode.adminPassword ).to.be.a('string')

    var rescueState = yield OVH.checkReady(User)

    // Need to wait for the rescue reboot to complete before we can check the success of it.
    while(rescueState.status === 'RESCUING') {
      rescueState = yield OVH.checkReady(User)
    }

    expect( rescueState ).to.have.property('status')
    expect( rescueState.status ).to.equal('RESCUE')

  })

  it_('Should turn off Rescue Mode', function * () {
    this.timeout(10000);
    
    var rescueMode = yield OVH.rescueReboot(User, 'false')

    // Sucessfully turning off rescue mode returns back null as the password.
    expect( rescueMode ).to.be.a('object')
    expect( rescueMode ).to.have.property('adminPassword')
    expect( rescueMode.adminPassword ).to.equal(null)

    var rescueState = yield OVH.checkReady(User)

    // Need to wait for the unrescue reboot to complete before we can check the success of it.
    while(rescueState.status === 'UNRESCUING') {
      rescueState = yield OVH.checkReady(User)
    }

    expect( rescueState ).to.have.property('status')
    expect( rescueState.status ).to.equal('ACTIVE')

  })

})


