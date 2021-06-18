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
    contractAiakos = await Aiakos.new(254,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(254,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("IsLibrary",[108,143,215,179,23,97,33,176,160,214,36,241,238,246,63,182,103,8,98,133,55,246,110,19,39,96,15,127,236,61,66,81],96,true,true, "\x19Ethereum Signed Message:\n32", [106,193,227,216,248,17,94,0,82,79,41,173,244,190,194,168,196,197,133,89,93,251,64,55,12,143,165,216,155,171,41,243],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("Example",[254,128,208,156,107,164,188,49,171,25,26,38,161,210,100,193,147,33,65,244,200,242,53,115,95,73,179,36,157,80,189,83],10001,true,true, [254,128,208,156,107,164,188,49,171,25,26,38,161,210,100,193,147,33,65,244,200,242,53,115,95,73,179,36,157,80,189,83],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("Example",[196,227,209,208,76,75,25,59,238,214,71,152,224,19,255,138,209,6,126,28,220,107,161,194,35,118,38,7,101,120,51,155],10001,true,true, [254,128,208,156,107,164,188,49,171,25,26,38,161,210,100,193,147,33,65,244,200,242,53,115,95,73,179,36,157,80,189,83],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[50,185,43,138,29,222,82,42,202,104,76,248,110,10,33,133,255,126,195,48,63,62,31,202,95,64,53,155,44,97,92,60],1532892063,false,false, accounts[0], 1532892063,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[50,185,43,138,29,222,82,42,202,104,76,248,110,10,33,133,255,126,195,48,63,62,31,202,95,64,53,155,44,97,92,60],1532892063,false,true, accounts[0], 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("IsLibrary",[40,167,194,235,176,122,133,143,10,192,28,25,196,132,160,248,208,107,165,171,182,206,253,247,157,249,96,50,140,66,112,254],2014223714,false,false, accounts[3], 4038714810,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("IsLibrary",[40,167,194,235,176,122,133,143,10,192,28,25,196,132,160,248,208,107,165,171,182,206,253,247,157,249,96,50,140,66,112,254],2014223714,false,true, accounts[3], 4038714810,{from: accounts[0]}),'revert');
  });
});
