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
    contractAiakos = await Aiakos.new(66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(66,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("superuser",[200,52,252,187,173,49,231,136,13,146,23,240,52,226,44,165,43,153,215,42,113,78,186,52,180,217,240,178,119,111,23,194],2014223716,false,false, "Example", [195,172,168,86,49,110,123,32,214,3,39,46,168,20,182,51,255,17,184,14,26,96,68,143,187,135,76,22,207,139,84,31],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("Example",[172,74,59,244,205,155,83,27,179,246,162,238,193,149,64,205,17,55,85,231,142,107,156,89,201,121,107,229,234,134,47,237],64,true,false, [172,74,59,244,205,155,83,27,179,246,162,238,193,149,64,205,17,55,85,231,142,107,156,89,201,121,107,229,234,134,47,237],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("Example",[146,10,151,118,65,254,87,134,140,120,22,51,250,251,207,31,142,122,79,93,220,143,72,220,215,190,255,244,146,48,124,233],64,true,false, [172,74,59,244,205,155,83,27,179,246,162,238,193,149,64,205,17,55,85,231,142,107,156,89,201,121,107,229,234,134,47,237],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[39,157,180,236,64,112,102,17,100,140,185,54,225,138,153,117,213,58,182,165,131,198,37,75,87,31,243,90,183,0,237,132],10001,false,false, accounts[3], 10001,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[39,157,180,236,64,112,102,17,100,140,185,54,225,138,153,117,213,58,182,165,131,198,37,75,87,31,243,90,183,0,237,132],10001,false,true, accounts[3], 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("minter",[100,180,191,249,237,182,98,111,19,233,182,220,116,207,184,224,46,29,198,249,37,179,3,155,224,214,117,252,85,5,186,37],2,false,false, accounts[4], 1336,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("minter",[100,180,191,249,237,182,98,111,19,233,182,220,116,207,184,224,46,29,198,249,37,179,3,155,224,214,117,252,85,5,186,37],2,false,true, accounts[4], 1336,{from: accounts[0]}),'revert');
  });
});
