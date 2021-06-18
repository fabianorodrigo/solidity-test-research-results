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
    contractAiakos = await Aiakos.new(4038714809,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(4038714809,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("z8iv1o",[103,158,4,187,108,165,160,180,101,247,45,158,174,217,52,123,143,45,91,209,59,140,178,23,15,38,199,219,185,1,123,164],29,false,false, "h3118i", [157,186,189,226,242,213,112,23,32,145,255,78,101,49,85,10,202,188,205,97,117,249,127,144,180,219,197,47,51,66,177,199],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("h3118i",[251,49,59,200,236,71,173,131,200,12,126,44,136,152,55,93,49,43,154,157,117,46,45,60,207,16,204,193,198,18,132,108],0,false,true, [251,49,59,200,236,71,173,131,200,12,126,44,136,152,55,93,49,43,154,157,117,46,45,60,207,16,204,193,198,18,132,108],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("h3118i",[116,178,119,243,229,70,102,186,10,6,245,186,22,227,76,128,32,199,107,76,43,174,210,100,27,229,115,226,1,179,26,49],0,false,true, [251,49,59,200,236,71,173,131,200,12,126,44,136,152,55,93,49,43,154,157,117,46,45,60,207,16,204,193,198,18,132,108],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[53,115,238,55,166,160,97,2,63,152,10,165,62,199,58,32,61,214,29,154,149,188,48,188,24,131,219,80,49,137,244,55],257,false,false, accounts[6], 257,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[53,115,238,55,166,160,97,2,63,152,10,165,62,199,58,32,61,214,29,154,149,188,48,188,24,131,219,80,49,137,244,55],257,false,true, accounts[6], 257,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[147,183,88,2,70,116,141,82,155,202,150,88,245,254,76,88,153,228,88,81,141,169,87,216,227,36,176,208,146,212,186,149],254,false,false, accounts[0], 3,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[147,183,88,2,70,116,141,82,155,202,150,88,245,254,76,88,153,228,88,81,141,169,87,216,227,36,176,208,146,212,186,149],254,false,true, accounts[0], 3,{from: accounts[0]}),'revert');
  });
});
