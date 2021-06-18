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
    contractAiakos = await Aiakos.new(2014223715,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(2014223715,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("superuser",[239,172,162,179,175,23,87,141,86,155,198,30,34,255,205,7,217,52,5,239,76,214,32,47,214,121,188,54,10,53,67,182],2,false,false, "initialized", [31,88,16,28,108,240,11,165,77,46,106,133,107,45,110,144,237,149,223,240,112,185,103,165,113,205,114,250,0,120,124,233],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("UsesExample",[139,170,102,107,227,95,77,205,19,126,201,177,149,220,95,51,120,22,116,189,108,58,8,139,29,3,144,12,88,72,72,22],1338,true,false, [139,170,102,107,227,95,77,205,19,126,201,177,149,220,95,51,120,22,116,189,108,58,8,139,29,3,144,12,88,72,72,22],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("UsesExample",[221,238,10,7,154,175,174,253,80,141,62,81,135,85,21,105,72,249,210,177,237,241,207,131,47,251,143,242,179,104,4,29],1338,true,false, [139,170,102,107,227,95,77,205,19,126,201,177,149,220,95,51,120,22,116,189,108,58,8,139,29,3,144,12,88,72,72,22],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[131,98,168,39,143,24,105,155,169,129,153,220,137,89,249,41,55,180,120,13,83,221,192,92,76,211,217,30,253,72,170,174],6,true,false, accounts[6], 6,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[131,98,168,39,143,24,105,155,169,129,153,220,137,89,249,41,55,180,120,13,83,221,192,92,76,211,217,30,253,72,170,174],6,true,true, accounts[6], 6,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[147,18,9,105,147,124,4,68,178,46,75,39,218,228,183,10,6,141,55,242,249,110,28,168,58,17,70,81,158,65,109,9],256,false,false, accounts[2], 28,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[147,18,9,105,147,124,4,68,178,46,75,39,218,228,183,10,6,141,55,242,249,110,28,168,58,17,70,81,158,65,109,9],256,false,true, accounts[2], 28,{from: accounts[0]}),'revert');
  });
});
