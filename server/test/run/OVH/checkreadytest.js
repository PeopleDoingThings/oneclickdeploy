require('../../test-helper.js')

const expect = require('chai').expect;
const OVH = require('../../../apis/logic/ovh/logic.js');
const OVHAPI = require('../../../apis/ovh.js');
const Repo = require('../../../database/models/deployablerepos.js');
const User = '13039425';

describe('OVH Instance Commands', function() {

  it_('Should Check The Instance is Ready', function * () {
    this.timeout(10000);
    
    var ready = yield OVH.checkReady(User)

    expect( ready ).to.be.a('object')
    expect( ready ).to.have.property('isReady')
    expect( ready.isReady ).to.equal(true)
    expect( ready.ip.ip ).to.not.equal(undefined)

  })

  it_('Should Error if User has no Instance for Ready Check', function * () {

    var err
    
    try {
      yield OVH.checkReady('2457894')
    } catch(error) {
      err = error;
    }
    
    expect( err.message ).to.equal('User has No Instance to Check!')

  })

  it_('Should Reinstall the Operating System', function * () {
    this.timeout(20000);
    
    var reInstall = yield OVH.reinstallInstance(User)

    expect( reInstall ).to.be.a('object')
    expect( reInstall ).to.have.property('publicip')
    expect( reInstall.ownergitid ).to.equal(User)

    var ready = yield  OVH.checkReady(User)

    expect( ready ).to.be.a('object')
    expect( ready ).to.have.property('isReady')
    expect( ready.status ).to.equal('REBUILD')
    expect( ready.isReady ).to.equal(false)
    expect( ready.ip.ip ).to.not.equal(undefined)

  })

  it_('Should have Removed our Deployed Repo After Reinstall', function * () {

    var repo = yield Repo.find({ ownerid: User, deployed: true })

    expect( repo.length ).to.equal(0)

  })

  it_('Should Not be Ready During Reinstall', function * () {
    this.timeout(10000);
    
    var ready = yield OVH.checkReady(User)

    expect( ready ).to.be.a('object')
    expect( ready ).to.have.property('isReady')
    expect( ready.isReady ).to.equal(false)
    expect( ready.ip.ip ).to.not.equal(undefined)

  })

  it_('Should Reinstall the Correct Image', function * () {
    this.timeout(10000);
    
    var ready = yield OVH.checkReady(User)

    while(ready.isReady === false) {
      ready = yield OVH.checkReady(User)
    }

    expect( ready ).to.be.a('object')
    expect( ready ).to.have.property('isReady')
    expect( ready.isReady ).to.equal(true)
    expect( ready.status ).to.equal('ACTIVE')
    expect( ready.imageid ).to.equal('0574a4cf-a3b9-40a3-8b58-abc4b1d46e4e')
    expect( ready.imagename ).to.equal('Nginx / NodeJS Image 1.0.0')

  })
  

})





  