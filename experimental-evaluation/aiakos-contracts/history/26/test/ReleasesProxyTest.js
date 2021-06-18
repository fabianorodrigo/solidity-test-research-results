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
    contractAiakos = await Aiakos.new(29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(29,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("whitelist",[69,42,85,95,80,190,51,152,27,111,165,128,132,107,63,229,90,214,51,189,69,178,42,99,109,45,84,82,17,195,98,81],19,false,false, "bouncer", [209,42,181,205,174,47,191,205,44,16,159,108,71,75,111,112,26,8,116,126,162,153,177,34,201,224,205,101,253,197,166,51],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("minter",[231,165,192,173,126,232,133,122,51,194,38,84,74,117,177,73,164,60,50,1,117,54,154,247,146,236,54,45,140,226,240,233],1336,false,true, [231,165,192,173,126,232,133,122,51,194,38,84,74,117,177,73,164,60,50,1,117,54,154,247,146,236,54,45,140,226,240,233],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("minter",[77,27,31,201,46,41,235,238,117,3,41,183,226,54,139,7,202,53,135,234,3,245,185,114,217,126,171,190,194,83,95,110],1336,false,true, [231,165,192,173,126,232,133,122,51,194,38,84,74,117,177,73,164,60,50,1,117,54,154,247,146,236,54,45,140,226,240,233],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("initialized",[31,68,140,130,255,86,62,23,31,153,254,234,69,217,120,69,245,113,148,40,115,236,47,181,29,246,121,158,8,77,78,22],10000,false,false, accounts[5], 10000,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("initialized",[31,68,140,130,255,86,62,23,31,153,254,234,69,217,120,69,245,113,148,40,115,236,47,181,29,246,121,158,8,77,78,22],10000,false,true, accounts[5], 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("whitelist",[246,120,119,35,144,93,73,134,212,55,124,145,125,32,164,46,132,96,24,157,114,51,251,180,193,221,173,170,122,175,84,214],1336,false,false, accounts[9], 1337,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("whitelist",[246,120,119,35,144,93,73,134,212,55,124,145,125,32,164,46,132,96,24,157,114,51,251,180,193,221,173,170,122,175,84,214],1336,false,true, accounts[9], 1337,{from: accounts[0]}),'revert');
  });
});
