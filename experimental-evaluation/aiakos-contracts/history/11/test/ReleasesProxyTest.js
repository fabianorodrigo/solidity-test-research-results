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
    contractAiakos = await Aiakos.new(65,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(65,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("IsLibrary",[45,184,204,174,127,19,164,163,246,243,9,56,144,253,112,120,46,229,98,116,92,91,136,25,183,62,112,90,37,55,224,166],1,false,true, "Example", [104,251,219,1,225,83,177,58,192,175,3,174,2,91,40,46,246,207,248,56,51,244,209,117,163,198,243,123,253,240,96,238],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("Example",[168,67,158,254,175,233,41,112,169,104,29,48,125,140,206,70,165,51,220,122,254,24,36,142,245,159,109,243,8,48,138,225],27,false,false, [168,67,158,254,175,233,41,112,169,104,29,48,125,140,206,70,165,51,220,122,254,24,36,142,245,159,109,243,8,48,138,225],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("Example",[8,192,232,5,239,2,22,209,34,80,51,148,14,86,84,162,85,90,122,15,95,243,185,155,177,41,4,127,190,24,182,67],27,false,false, [168,67,158,254,175,233,41,112,169,104,29,48,125,140,206,70,165,51,220,122,254,24,36,142,245,159,109,243,8,48,138,225],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[103,188,125,35,175,165,27,29,100,66,248,150,32,253,15,181,102,82,52,142,5,209,13,190,227,92,44,180,56,205,100,254],1532892063,false,false, accounts[1], 1532892063,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[103,188,125,35,175,165,27,29,100,66,248,150,32,253,15,181,102,82,52,142,5,209,13,190,227,92,44,180,56,205,100,254],1532892063,false,true, accounts[1], 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("UsesExample",[34,209,196,180,133,202,101,245,239,210,242,164,160,42,10,87,238,248,32,43,209,84,64,24,60,100,45,123,234,18,214,175],26,false,false, accounts[3], 2,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("UsesExample",[34,209,196,180,133,202,101,245,239,210,242,164,160,42,10,87,238,248,32,43,209,84,64,24,60,100,45,123,234,18,214,175],26,false,true, accounts[3], 2,{from: accounts[0]}),'revert');
  });
});
