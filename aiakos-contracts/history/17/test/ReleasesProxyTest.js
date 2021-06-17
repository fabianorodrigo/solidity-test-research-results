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
    contractAiakos = await Aiakos.new(27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(27,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("bouncer",[235,153,170,38,176,90,94,152,214,244,103,71,111,120,88,99,82,153,163,178,226,130,137,139,230,163,90,58,53,126,26,226],4038714809,true,false, "UsesExample", [88,233,170,215,91,119,121,29,45,87,33,145,33,55,93,231,228,0,135,254,6,88,199,185,198,209,135,123,44,204,172,85],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("minter",[81,4,32,56,81,146,66,115,114,172,165,110,174,174,83,221,163,183,173,203,205,109,110,79,46,200,80,11,153,192,59,161],10000,true,true, [81,4,32,56,81,146,66,115,114,172,165,110,174,174,83,221,163,183,173,203,205,109,110,79,46,200,80,11,153,192,59,161],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("minter",[95,65,185,247,33,12,169,134,126,113,85,173,34,119,35,157,35,42,193,243,67,52,175,164,252,34,95,54,31,203,113,51],10000,true,true, [81,4,32,56,81,146,66,115,114,172,165,110,174,174,83,221,163,183,173,203,205,109,110,79,46,200,80,11,153,192,59,161],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("IsLibrary",[23,1,93,44,141,19,170,66,57,172,36,173,92,106,186,131,89,92,142,62,74,131,217,29,151,91,183,250,135,7,154,64],4038714811,false,false, accounts[8], 4038714811,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("IsLibrary",[23,1,93,44,141,19,170,66,57,172,36,173,92,106,186,131,89,92,142,62,74,131,217,29,151,91,183,250,135,7,154,64],4038714811,false,true, accounts[8], 4038714811,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[3,168,255,27,81,7,91,168,88,236,226,164,160,56,240,176,22,249,229,114,92,20,11,193,44,161,26,36,205,6,173,106],26,false,false, accounts[4], 97,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[3,168,255,27,81,7,91,168,88,236,226,164,160,56,240,176,22,249,229,114,92,20,11,193,44,161,26,36,205,6,173,106],26,false,true, accounts[4], 97,{from: accounts[0]}),'revert');
  });
});
