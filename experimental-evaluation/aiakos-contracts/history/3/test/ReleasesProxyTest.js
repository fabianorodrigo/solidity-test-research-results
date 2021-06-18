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
    let result = await contractProxyReleases.testinit("Example",[77,206,36,187,206,56,224,24,115,116,54,178,182,92,7,90,128,60,107,252,222,193,52,171,209,86,230,171,71,234,44,120],1336,true,false, "IsLibrary", [206,95,12,18,108,27,71,124,116,138,59,246,220,196,92,53,164,126,192,97,148,214,0,224,201,146,59,129,108,99,48,47],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[98,236,74,205,239,39,14,27,193,56,124,45,177,224,207,224,240,205,239,65,150,165,138,211,179,64,16,174,62,196,35,65],26,false,true, [98,236,74,205,239,39,14,27,193,56,124,45,177,224,207,224,240,205,239,65,150,165,138,211,179,64,16,174,62,196,35,65],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[229,132,70,155,206,121,83,19,92,9,53,223,221,82,112,201,130,129,38,235,108,248,165,118,8,101,234,96,46,72,85,147],26,false,true, [98,236,74,205,239,39,14,27,193,56,124,45,177,224,207,224,240,205,239,65,150,165,138,211,179,64,16,174,62,196,35,65],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("UsesExample",[100,233,239,203,80,109,125,228,190,110,84,82,143,232,143,133,116,141,198,194,6,214,74,45,66,65,217,91,130,241,31,65],2014223714,false,false, accounts[0], 2014223714,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("UsesExample",[100,233,239,203,80,109,125,228,190,110,84,82,143,232,143,133,116,141,198,194,6,214,74,45,66,65,217,91,130,241,31,65],2014223714,false,true, accounts[0], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("superuser",[85,27,254,162,174,236,58,150,97,13,247,182,169,73,28,167,153,72,198,75,93,253,57,56,197,67,162,2,90,132,169,187],3,false,false, accounts[2], 10001,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("superuser",[85,27,254,162,174,236,58,150,97,13,247,182,169,73,28,167,153,72,198,75,93,253,57,56,197,67,162,2,90,132,169,187],3,false,true, accounts[2], 10001,{from: accounts[0]}),'revert');
  });
});
