require('../../test-helper.js')

const expect = require('chai').expect;
const OS = require('../../../apis/logic/openstack/logic.js');
const OVH = require('../../../apis/logic/ovh/logic.js');
const OSAPI = require('../../../apis/openstack.js');
const Instance = require('../../../database/models/instance.js');
const InstanceLogin = require('../../../database/models/instancelogin.js');
const User = '8438574';

describe('OpenStack Create Instance', function() {

  it_('Should Fail to Create a New Instance when not Authenticated', function * () {
    this.timeout(10000);
    var err
    
    try {
      yield OS.callCreateNewInstance(User)
    } catch(error) {
      err = error
    }
    
    expect( err.message ).to.equal('Authentication required')

  })

  it_('Should get a New Authentication Token from OpenStack Compute', function * () {
    this.timeout(10000);
    var err
    
    var token = yield OSAPI.getNewToken()
    
    expect( token.body ).to.be.a('object')
    expect( token.body.access.token.id ).to.be.a('string')

    process.env.OPENSTACK_X_AUTH = token.body.access.token.id

    expect( process.env.OPENSTACK_X_AUTH ).to.not.equal(undefined)

  })

  it_('Should Create a New Instance', function * () {
    this.timeout(15000);
    
    var create = yield OS.callCreateNewInstance(User)

    expect( create ).to.be.a('object')
    expect( create ).to.have.property('name')
    expect( create ).to.have.property('openstackid')
    expect( create ).to.have.property('ownergitid')

    expect( create.ownergitid ).to.equal(User)
    expect( create.image.imageid ).to.equal('0574a4cf-a3b9-40a3-8b58-abc4b1d46e4e')

  })

  it_('Should Insert New Instance Data in DB', function * () {
    
    var insert = yield Instance.find({ ownergitid: User })

    expect( insert ).to.be.a('array')
    expect( insert.length ).to.be.above(0)
    expect( insert[0] ).to.have.property('openstackid')
    expect( insert[0].publicip ).to.equal('pending')

  })

  it_('Should Insert New Instance Login Data in DB', function * () {
    
    var insert = yield InstanceLogin.find({ ownergitid: User })

    expect( insert ).to.be.a('array')
    expect( insert.length ).to.equal(1)
    expect( insert[0] ).to.have.property('password')
    expect( insert[0] ).to.have.property('sshuser')
    expect( insert[0] ).to.have.property('daemonkey')
    expect( insert[0].password ).to.be.a('string')
    expect( insert[0].sshuser ).to.be.a('string')
    expect( insert[0].daemonkey ).to.be.a('string')

  })

  it_('Should Error if User has an Instance', function * () {
    var err
    
    try {
      yield OS.callCreateNewInstance(User)
    } catch(error) {
      err = error
    }
      
    expect( err.message ).to.equal('User Already Has An Instance!')

  })

  it_('Should Find Our New Instance on the Cloud', function * () {
    this.timeout(10000)
    
    var ins = yield OVH.checkReady(User)

    expect( ins ).to.be.a('object')
    expect( ins.status ).to.equal('BUILD')

  })

})



  