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
    contractAiakos = await Aiakos.new(64,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(64,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("ERC1820_ACCEPT_MAGIC",[75,6,159,152,234,252,73,189,168,72,44,10,108,142,237,182,252,206,11,59,36,19,188,114,89,141,115,252,103,209,155,249],28,false,true, "\x19Ethereum Signed Message:\n32", [63,16,44,35,80,16,141,6,142,4,140,240,83,44,11,85,138,145,11,186,128,157,159,68,240,134,187,160,23,139,204,95],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("RevertWithReason",[108,186,111,147,126,64,221,26,216,182,9,132,113,131,24,248,49,142,85,140,31,37,193,20,233,6,57,214,25,234,189,201],2014223715,true,false, [108,186,111,147,126,64,221,26,216,182,9,132,113,131,24,248,49,142,85,140,31,37,193,20,233,6,57,214,25,234,189,201],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("RevertWithReason",[131,10,107,32,29,78,80,132,191,54,149,107,47,251,164,156,144,170,117,23,91,175,12,46,1,33,180,148,66,175,32,240],2014223715,true,false, [108,186,111,147,126,64,221,26,216,182,9,132,113,131,24,248,49,142,85,140,31,37,193,20,233,6,57,214,25,234,189,201],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("UsesExample",[33,6,199,225,148,49,107,43,49,93,0,52,27,48,6,204,253,34,173,106,135,52,62,157,35,141,235,30,74,216,199,175],96,false,false, accounts[0], 96,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("UsesExample",[33,6,199,225,148,49,107,43,49,93,0,52,27,48,6,204,253,34,173,106,135,52,62,157,35,141,235,30,74,216,199,175],96,false,true, accounts[0], 96,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("UsesExample",[90,236,186,52,30,151,196,214,250,221,216,118,16,36,220,65,248,171,150,60,166,151,23,219,212,200,24,2,195,12,201,209],64,false,false, accounts[5], 4,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("UsesExample",[90,236,186,52,30,151,196,214,250,221,216,118,16,36,220,65,248,171,150,60,166,151,23,219,212,200,24,2,195,12,201,209],64,false,true, accounts[5], 4,{from: accounts[0]}),'revert');
  });
});
