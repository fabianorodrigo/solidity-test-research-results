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
    contractAiakos = await Aiakos.new(1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(1,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("Example",[95,218,92,125,37,229,96,191,44,232,142,111,179,198,23,180,5,159,133,54,192,81,69,47,206,20,69,83,19,58,169,64],1336,true,false, "whitelist", [24,124,93,242,217,200,211,9,125,65,226,164,2,87,38,160,169,203,253,71,32,97,123,188,105,197,246,211,212,71,166,217],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("UsesExample",[127,82,230,117,52,243,33,145,92,153,55,166,141,201,141,130,30,72,61,13,61,0,190,212,113,137,68,63,22,27,187,76],257,true,true, [127,82,230,117,52,243,33,145,92,153,55,166,141,201,141,130,30,72,61,13,61,0,190,212,113,137,68,63,22,27,187,76],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("UsesExample",[198,113,168,237,48,158,145,112,33,169,24,136,28,201,250,113,119,20,232,66,182,172,134,102,253,89,202,11,247,51,57,31],257,true,true, [127,82,230,117,52,243,33,145,92,153,55,166,141,201,141,130,30,72,61,13,61,0,190,212,113,137,68,63,22,27,187,76],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("kns5uq",[164,85,133,47,67,82,225,16,247,205,162,138,216,29,219,66,103,61,120,91,99,228,171,63,87,128,71,3,133,117,113,68],1337,false,false, accounts[0], 1337,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("kns5uq",[164,85,133,47,67,82,225,16,247,205,162,138,216,29,219,66,103,61,120,91,99,228,171,63,87,128,71,3,133,117,113,68],1337,false,true, accounts[0], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("minter",[224,133,65,165,227,179,15,39,40,244,56,185,218,227,55,186,33,50,87,43,207,251,2,127,128,28,253,120,225,107,100,119],256,false,false, accounts[6], 1338,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("minter",[224,133,65,165,227,179,15,39,40,244,56,185,218,227,55,186,33,50,87,43,207,251,2,127,128,28,253,120,225,107,100,119],256,false,true, accounts[6], 1338,{from: accounts[0]}),'revert');
  });
});
