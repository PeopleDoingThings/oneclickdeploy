require('../../test-helper.js')

const expect = require('chai').expect;
const OVH = require('../../../apis/logic/ovh/logic.js');
const OVHAPI = require('../../../apis/ovh.js');
const SnapShot = require('../../../database/models/snapshots.js');
const User = '13039425';

describe('OVH Instance Commands', function() {

  it_('Should Soft Reboot the Instance', function * () {
    this.timeout(20000);
    
    var softReboot = yield OVH.rebootInstance(User, 'soft')

    expect( softReboot ).to.be.a('string')
    expect( softReboot ).to.equal('soft reboot successful!')

    var rebootState = yield OVH.checkReady(User)

    expect( rebootState ).to.have.property('status')
    expect( rebootState.status ).to.equal('REBOOT')

  })

  it_('Should Hard Reboot the Instance', function * () {
    this.timeout(20000);

    var state = yield OVH.checkReady(User)

    // Need to wait for the soft reboot to complete before we can try a hard reboot.
    while(state.status === 'REBOOT') {
      state = yield OVH.checkReady(User)
    }
    
    var hardReboot = yield OVH.rebootInstance(User, 'hard')

    expect( hardReboot ).to.be.a('string')
    expect( hardReboot ).to.equal('hard reboot successful!')

    var rebootState = yield OVH.checkReady(User)

    expect( rebootState ).to.have.property('status')
    expect( rebootState.status ).to.equal('HARD_REBOOT')

  })

  it_('Should Error if No Reboot Type Specified', function * () {
    this.timeout(10000);
    var err

    try {
      yield OVH.rebootInstance(User)
    } catch(error) {
      err = error;
    }
    
    expect( err.message ).to.equal('Please Specify a Valid Reboot Type!')

    try {
      yield OVH.rebootInstance(User, 'invalidtype')
    } catch(error) {
      err = error;
    }
    
    expect( err.message ).to.equal('Please Specify a Valid Reboot Type!')

  })

})


