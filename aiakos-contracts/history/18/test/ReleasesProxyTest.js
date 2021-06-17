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
    contractAiakos = await Aiakos.new(28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(28,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("bouncer",[231,61,177,154,28,119,109,93,130,253,226,153,2,107,179,234,24,72,217,128,114,152,89,239,135,122,180,181,92,166,163,186],2014223716,false,false, "bouncer", [73,30,101,250,177,218,165,10,141,69,201,224,93,239,102,45,216,173,60,108,6,221,10,176,147,49,136,177,41,20,209,182],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[15,209,40,130,74,210,65,249,128,102,1,94,227,66,227,123,228,100,160,167,155,239,172,221,189,180,220,229,54,214,179,118],4,false,true, [15,209,40,130,74,210,65,249,128,102,1,94,227,66,227,123,228,100,160,167,155,239,172,221,189,180,220,229,54,214,179,118],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[229,241,94,147,76,178,69,155,69,114,48,75,79,9,156,193,20,216,243,210,174,234,6,73,189,198,67,207,69,124,221,249],4,false,true, [15,209,40,130,74,210,65,249,128,102,1,94,227,66,227,123,228,100,160,167,155,239,172,221,189,180,220,229,54,214,179,118],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("whitelist",[146,243,91,183,83,112,230,43,68,78,31,177,194,87,180,3,131,213,38,122,124,212,194,62,101,6,252,191,215,138,205,124],2,false,false, accounts[6], 2,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("whitelist",[146,243,91,183,83,112,230,43,68,78,31,177,194,87,180,3,131,213,38,122,124,212,194,62,101,6,252,191,215,138,205,124],2,false,true, accounts[6], 2,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("whitelist",[126,27,77,22,221,106,174,145,204,224,147,98,5,194,232,154,12,139,119,147,220,220,206,2,247,207,66,197,36,66,67,224],3,false,false, accounts[9], 1336,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("whitelist",[126,27,77,22,221,106,174,145,204,224,147,98,5,194,232,154,12,139,119,147,220,220,206,2,247,207,66,197,36,66,67,224],3,false,true, accounts[9], 1336,{from: accounts[0]}),'revert');
  });
});
