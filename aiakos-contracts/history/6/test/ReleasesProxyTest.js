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
    let result = await contractProxyReleases.testinit("Example",[190,146,226,222,89,243,246,11,38,225,214,88,147,185,150,99,7,41,93,99,247,173,219,93,71,208,123,18,158,254,216,193],10001,false,true, "IsLibrary", [189,167,28,122,125,241,134,76,166,120,105,74,48,219,30,167,200,76,33,221,81,139,50,171,7,90,131,90,156,252,31,228],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("3w10nf",[7,105,107,44,37,106,253,41,255,129,67,16,51,247,19,117,158,222,34,231,112,162,38,154,58,148,153,159,19,232,25,199],18,true,true, [7,105,107,44,37,106,253,41,255,129,67,16,51,247,19,117,158,222,34,231,112,162,38,154,58,148,153,159,19,232,25,199],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("3w10nf",[99,59,49,35,211,61,34,159,101,71,41,41,255,159,105,68,178,131,225,31,163,190,104,222,190,102,229,116,138,60,215,166],18,true,true, [7,105,107,44,37,106,253,41,255,129,67,16,51,247,19,117,158,222,34,231,112,162,38,154,58,148,153,159,19,232,25,199],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("superuser",[113,166,136,32,155,203,146,5,114,188,163,216,251,171,247,161,57,97,81,159,61,112,52,164,211,41,252,0,136,115,225,22],255,true,false, accounts[6], 255,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("superuser",[113,166,136,32,155,203,146,5,114,188,163,216,251,171,247,161,57,97,81,159,61,112,52,164,211,41,252,0,136,115,225,22],255,true,true, accounts[6], 255,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[171,102,50,241,171,8,216,179,133,26,156,234,164,206,173,254,137,123,186,76,44,150,77,182,113,149,224,205,165,156,226,70],256,false,false, accounts[3], 0,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[171,102,50,241,171,8,216,179,133,26,156,234,164,206,173,254,137,123,186,76,44,150,77,182,113,149,224,205,165,156,226,70],256,false,true, accounts[3], 0,{from: accounts[0]}),'revert');
  });
});
