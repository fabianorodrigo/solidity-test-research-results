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
    contractAiakos = await Aiakos.new(18,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(18,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("fhne0n",[230,215,48,94,21,111,101,28,55,137,35,125,111,175,95,62,207,84,227,157,113,90,12,180,151,112,96,86,166,241,224,179],17,true,false, "PayableExample", [14,209,173,193,193,112,90,174,171,98,15,93,24,214,52,246,56,24,109,229,210,251,159,8,230,217,117,133,33,164,231,61],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("superuser",[219,232,23,249,7,147,88,99,221,89,212,126,46,173,173,17,56,107,103,155,254,64,99,14,51,50,252,140,200,60,249,239],1532892063,true,false, [219,232,23,249,7,147,88,99,221,89,212,126,46,173,173,17,56,107,103,155,254,64,99,14,51,50,252,140,200,60,249,239],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("superuser",[4,114,80,100,18,39,174,160,252,90,18,50,67,50,54,239,5,197,67,211,172,11,30,165,223,249,65,45,252,50,242,226],1532892063,true,false, [219,232,23,249,7,147,88,99,221,89,212,126,46,173,173,17,56,107,103,155,254,64,99,14,51,50,252,140,200,60,249,239],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[82,64,240,146,184,108,161,67,99,4,247,43,251,92,109,49,91,12,134,136,7,98,40,50,153,171,38,30,180,156,25,243],28,false,false, accounts[5], 28,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[82,64,240,146,184,108,161,67,99,4,247,43,251,92,109,49,91,12,134,136,7,98,40,50,153,171,38,30,180,156,25,243],28,false,true, accounts[5], 28,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[10,186,148,106,209,58,11,178,126,192,145,229,100,140,179,42,203,102,106,208,49,105,176,126,235,134,195,141,32,18,112,122],96,false,false, accounts[9], 1336,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[10,186,148,106,209,58,11,178,126,192,145,229,100,140,179,42,203,102,106,208,49,105,176,126,235,134,195,141,32,18,112,122],96,false,true, accounts[9], 1336,{from: accounts[0]}),'revert');
  });
});
