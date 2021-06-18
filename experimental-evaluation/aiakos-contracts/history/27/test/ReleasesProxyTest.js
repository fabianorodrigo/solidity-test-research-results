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
    contractAiakos = await Aiakos.new(1532892064,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(1532892064,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("bouncer",[97,110,240,207,67,131,19,214,227,71,136,13,26,40,36,5,183,150,209,161,202,90,69,78,9,64,130,201,102,75,80,194],3,true,false, "UsesExample", [210,149,86,158,234,34,166,54,154,149,124,223,176,121,39,233,147,8,67,123,7,107,234,46,23,156,199,114,9,84,130,26],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("IsLibrary",[73,151,94,175,130,205,219,113,34,232,25,28,5,255,111,79,38,37,241,60,124,124,207,61,245,191,254,215,17,116,162,152],66,true,false, [73,151,94,175,130,205,219,113,34,232,25,28,5,255,111,79,38,37,241,60,124,124,207,61,245,191,254,215,17,116,162,152],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("IsLibrary",[123,140,223,93,195,60,25,129,26,208,153,82,112,224,228,33,190,232,238,52,133,231,180,44,187,238,92,213,227,192,61,130],66,true,false, [73,151,94,175,130,205,219,113,34,232,25,28,5,255,111,79,38,37,241,60,124,124,207,61,245,191,254,215,17,116,162,152],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[120,216,180,174,28,121,238,237,214,2,26,83,250,71,64,74,172,121,196,90,43,52,135,236,30,91,10,154,105,136,189,138],1337,false,false, accounts[3], 1337,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[120,216,180,174,28,121,238,237,214,2,26,83,250,71,64,74,172,121,196,90,43,52,135,236,30,91,10,154,105,136,189,138],1337,false,true, accounts[3], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("PayableExample",[81,223,194,210,25,7,253,24,48,1,248,41,100,140,225,207,88,233,17,116,45,235,31,222,152,245,71,62,243,12,31,143],26,true,false, accounts[1], 10001,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("PayableExample",[81,223,194,210,25,7,253,24,48,1,248,41,100,140,225,207,88,233,17,116,45,235,31,222,152,245,71,62,243,12,31,143],26,true,true, accounts[1], 10001,{from: accounts[0]}),'revert');
  });
});
