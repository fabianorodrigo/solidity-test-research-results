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
    contractAiakos = await Aiakos.new(2,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(2,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("ERC1820_ACCEPT_MAGIC",[46,78,212,216,128,144,238,209,78,218,54,187,169,56,52,205,207,186,112,201,150,5,43,57,55,200,80,134,82,123,158,34],18,true,true, "PayableExample", [219,168,88,125,162,172,134,48,207,92,70,39,98,100,36,176,49,111,1,80,215,94,135,217,65,80,210,203,250,25,92,88],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("7367e",[136,2,120,121,63,117,231,78,106,99,181,208,243,5,60,50,29,126,65,227,159,192,148,53,162,195,101,101,142,50,183,188],28,false,true, [136,2,120,121,63,117,231,78,106,99,181,208,243,5,60,50,29,126,65,227,159,192,148,53,162,195,101,101,142,50,183,188],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("7367e",[240,232,141,244,51,24,44,230,36,227,94,250,237,159,148,186,102,243,183,21,35,216,238,30,179,110,105,33,62,172,163,170],28,false,true, [136,2,120,121,63,117,231,78,106,99,181,208,243,5,60,50,29,126,65,227,159,192,148,53,162,195,101,101,142,50,183,188],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[168,175,31,244,195,109,140,25,33,185,141,213,178,16,222,35,16,100,50,82,236,25,158,57,46,58,218,234,88,2,27,182],27,true,false, accounts[2], 27,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[168,175,31,244,195,109,140,25,33,185,141,213,178,16,222,35,16,100,50,82,236,25,158,57,46,58,218,234,88,2,27,182],27,true,true, accounts[2], 27,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[229,240,68,73,239,62,159,167,23,117,226,49,167,108,29,84,43,114,224,205,7,22,70,145,185,84,35,135,58,170,62,29],2014223715,true,false, accounts[6], 256,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[229,240,68,73,239,62,159,167,23,117,226,49,167,108,29,84,43,114,224,205,7,22,70,145,185,84,35,135,58,170,62,29],2014223715,true,true, accounts[6], 256,{from: accounts[0]}),'revert');
  });
});
