require('../../test-helper.js')

const expect = require('chai').expect;
const OVH = require('../../../apis/logic/ovh/logic.js');
const User = '13039425';

describe('OVH Instance Output Data Tests', function() {

  it_('Should return Instance CPU Usage Information.', function * () {
    this.timeout(10000);

    var cpu = yield OVH.getInstanceUsage(User, 'today', 'cpu:used')
      expect( cpu ).to.be.a('object')
      expect( cpu ).to.have.property('values')
      expect( cpu ).to.have.property('unit')
      expect( cpu.unit ).to.equal('%')
      expect( cpu.values.length ).to.be.at.least(1)
      expect( cpu.values[0].timestamp ).to.be.a('number')

  })

  it_('Should return Instance Memory Usage Information.', function * () {
    this.timeout(10000);

    var mem = yield OVH.getInstanceUsage(User, 'today', 'mem:used')
      expect( mem ).to.be.a('object')
      expect( mem ).to.have.property('values')
      expect( mem ).to.have.property('unit')
      expect( mem.unit ).to.equal('MiB')
      expect( mem.values.length ).to.be.at.least(1)
      expect( mem.values[0].timestamp ).to.be.a('number')

  })

  it_('Should return Instance Outgoing Network Usage Information.', function * () {
    this.timeout(10000);

    var tx = yield OVH.getInstanceUsage(User, 'today', 'net:tx')
      expect( tx ).to.be.a('object')
      expect( tx ).to.have.property('values')
      expect( tx ).to.have.property('unit')
      expect( tx.unit ).to.equal('b/s')
      expect( tx.values.length ).to.be.at.least(1)
      expect( tx.values[0].timestamp ).to.be.a('number')

  })

  it_('Should return Instance Incoming Network Usage Information.', function * () {
    this.timeout(10000);

    var rx = yield OVH.getInstanceUsage(User, 'today', 'net:rx')
      expect( rx ).to.be.a('object')
      expect( rx ).to.have.property('values')
      expect( rx ).to.have.property('unit')
      expect( rx.unit ).to.equal('b/s')
      expect( rx.values.length ).to.be.at.least(1)
      expect( rx.values[0].timestamp ).to.be.a('number')

  })

  it_('Should return Instance Console Output', function * () {
    this.timeout(10000);

    var consoleOutput = yield OVH.getConsoleOutput(User)
      expect( consoleOutput ).to.be.a('object')
      expect( consoleOutput ).to.have.property('output')
      expect( consoleOutput.output ).to.be.a('string')
      expect( consoleOutput.output.length ).to.be.at.least(50)

  })

})


