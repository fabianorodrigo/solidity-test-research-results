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
    contractAiakos = await Aiakos.new(257,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(257,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("\\x19Ethereum Signed Message:\\n32",[29,71,121,102,202,225,104,168,181,47,88,245,164,215,227,42,172,69,196,36,209,49,194,26,22,164,125,19,42,129,212,142],17,false,true, "IsLibrary", [161,121,48,60,129,211,48,161,98,108,219,114,185,81,29,26,208,90,98,3,99,185,13,216,107,12,16,139,107,2,224,12],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("IsLibrary",[214,56,123,177,36,220,163,42,202,168,80,224,3,76,149,123,170,53,153,196,99,15,250,232,232,115,138,87,55,241,231,144],255,true,false, [214,56,123,177,36,220,163,42,202,168,80,224,3,76,149,123,170,53,153,196,99,15,250,232,232,115,138,87,55,241,231,144],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("IsLibrary",[83,197,94,185,228,118,63,39,21,43,57,169,128,160,37,245,80,29,155,45,38,239,56,172,179,41,33,241,225,25,222,11],255,true,false, [214,56,123,177,36,220,163,42,202,168,80,224,3,76,149,123,170,53,153,196,99,15,250,232,232,115,138,87,55,241,231,144],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("2rs6p4",[175,244,6,26,219,96,226,180,122,68,52,206,209,173,185,14,94,117,166,241,76,7,50,203,54,120,178,1,107,167,29,244],3,false,false, accounts[4], 3,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("2rs6p4",[175,244,6,26,219,96,226,180,122,68,52,206,209,173,185,14,94,117,166,241,76,7,50,203,54,120,178,1,107,167,29,244],3,false,true, accounts[4], 3,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("superuser",[200,68,241,21,65,222,150,208,46,31,227,132,234,62,193,15,173,222,138,55,185,31,177,145,245,85,141,184,13,220,24,234],1337,false,false, accounts[2], 2014223715,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("superuser",[200,68,241,21,65,222,150,208,46,31,227,132,234,62,193,15,173,222,138,55,185,31,177,145,245,85,141,184,13,220,24,234],1337,false,true, accounts[2], 2014223715,{from: accounts[0]}),'revert');
  });
});
