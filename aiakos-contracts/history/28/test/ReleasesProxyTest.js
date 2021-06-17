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
    contractAiakos = await Aiakos.new(1532892062,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(1532892062,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("IsLibrary",[188,182,191,64,32,253,99,36,89,105,67,127,123,44,123,255,210,7,113,114,15,88,208,102,22,35,220,185,175,71,213,96],10000,false,true, "minter", [6,107,250,195,168,137,148,248,216,106,28,143,55,169,199,21,197,109,205,63,38,25,132,15,212,249,175,7,186,231,59,181],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("RevertWithReason",[137,91,179,159,82,143,173,26,85,4,245,105,51,162,66,240,196,104,147,61,116,132,242,37,112,114,191,157,39,253,144,130],255,true,false, [137,91,179,159,82,143,173,26,85,4,245,105,51,162,66,240,196,104,147,61,116,132,242,37,112,114,191,157,39,253,144,130],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("RevertWithReason",[96,14,64,158,102,211,161,107,194,246,145,230,85,48,152,140,226,137,77,111,116,249,0,230,73,228,2,48,28,193,192,8],255,true,false, [137,91,179,159,82,143,173,26,85,4,245,105,51,162,66,240,196,104,147,61,116,132,242,37,112,114,191,157,39,253,144,130],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[166,127,97,154,249,199,177,223,177,133,140,82,251,7,112,31,243,171,123,109,183,19,198,89,101,18,128,37,1,248,237,41],26,false,false, accounts[2], 26,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[166,127,97,154,249,199,177,223,177,133,140,82,251,7,112,31,243,171,123,109,183,19,198,89,101,18,128,37,1,248,237,41],26,false,true, accounts[2], 26,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[84,85,5,84,105,177,26,170,23,126,192,214,11,66,135,118,251,160,146,151,162,172,244,215,0,47,65,109,166,236,102,91],96,false,false, accounts[8], 2,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[84,85,5,84,105,177,26,170,23,126,192,214,11,66,135,118,251,160,146,151,162,172,244,215,0,47,65,109,166,236,102,91],96,false,true, accounts[8], 2,{from: accounts[0]}),'revert');
  });
});
