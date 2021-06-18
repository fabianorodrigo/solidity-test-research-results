const truffleAssert = require('truffle-assertions');
const Aiakos = artifacts.require("Aiakos");
const Releases = artifacts.require("Releases");
const Roles = artifacts.require("openzeppelin-solidity/contracts/access/Roles.sol");
const ProxyReleases = artifacts.require("ProxyReleases");

contract("contractProxyReleases",(accounts)=>{
    let contractProxyReleases = null;
  let trace = false;
  let contractRoles = null;
  let contractReleases = null;
  let contractAiakos = null;
  beforeEach(async () => {
    contractRoles = await Roles.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Roles.new({from: accounts[0]}');
    contractReleases = await Releases.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Releases.new({from: accounts[0]}');
    Aiakos.link("Roles",contractRoles.address);
     Aiakos.link("Releases",contractReleases.address);
    contractAiakos = await Aiakos.new(4038714809,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(4038714809,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("superuser",[12,46,229,129,223,61,75,244,17,188,29,5,1,150,214,186,115,46,4,173,135,37,99,5,56,125,68,45,175,218,238,128],1,false,true, "Example", [201,142,203,25,87,133,230,8,96,117,22,77,240,197,185,73,62,20,237,128,234,11,22,66,52,43,230,163,246,23,193,218],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("superuser",[72,194,47,232,140,73,249,87,144,241,181,230,62,252,66,35,172,52,137,59,38,108,141,235,5,57,215,191,49,19,189,246],1532892062,true,false, [72,194,47,232,140,73,249,87,144,241,181,230,62,252,66,35,172,52,137,59,38,108,141,235,5,57,215,191,49,19,189,246],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("superuser",[102,228,177,89,188,4,81,205,241,34,19,73,127,228,187,188,178,12,48,238,209,89,35,208,241,80,125,221,98,12,182,70],1532892062,true,false, [72,194,47,232,140,73,249,87,144,241,181,230,62,252,66,35,172,52,137,59,38,108,141,235,5,57,215,191,49,19,189,246],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[228,70,117,235,191,53,51,98,71,7,78,144,6,229,189,168,96,218,13,46,142,47,166,130,61,232,169,253,148,82,249,171],65,false,false, accounts[5], 65,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[228,70,117,235,191,53,51,98,71,7,78,144,6,229,189,168,96,218,13,46,142,47,166,130,61,232,169,253,148,82,249,171],65,false,true, accounts[5], 65,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("whitelist",[221,78,130,28,134,75,18,15,125,30,186,104,48,113,82,40,4,163,34,247,57,132,102,109,183,30,144,189,223,27,28,112],1338,false,false, accounts[0], 4038714809,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("whitelist",[221,78,130,28,134,75,18,15,125,30,186,104,48,113,82,40,4,163,34,247,57,132,102,109,183,30,144,189,223,27,28,112],1338,false,true, accounts[0], 4038714809,{from: accounts[0]}),'revert');
  });
});
