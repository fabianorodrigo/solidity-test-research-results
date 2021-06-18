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
    contractAiakos = await Aiakos.new(1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(1337,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("ERC1820_ACCEPT_MAGIC",[223,58,100,40,191,183,137,0,79,220,4,212,217,140,156,88,120,69,172,63,227,216,34,138,105,179,31,192,178,239,151,232],65,true,false, "bouncer", [32,60,135,192,188,179,144,19,170,226,136,156,122,101,60,236,19,145,178,118,58,152,241,87,85,121,184,120,238,168,104,171],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("UsesExample",[89,70,43,39,70,119,250,155,213,90,200,194,132,167,164,113,50,73,227,85,232,71,212,178,83,191,16,87,174,45,231,249],9999,true,true, [89,70,43,39,70,119,250,155,213,90,200,194,132,167,164,113,50,73,227,85,232,71,212,178,83,191,16,87,174,45,231,249],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("UsesExample",[15,221,211,31,34,122,236,159,145,1,20,96,119,95,40,211,200,51,33,14,129,98,169,4,254,62,103,242,144,228,208,133],9999,true,true, [89,70,43,39,70,119,250,155,213,90,200,194,132,167,164,113,50,73,227,85,232,71,212,178,83,191,16,87,174,45,231,249],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[161,5,33,141,5,53,7,152,5,166,125,78,135,152,125,91,181,3,8,169,174,22,99,73,224,157,201,201,143,29,27,127],0,true,false, accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[161,5,33,141,5,53,7,152,5,166,125,78,135,152,125,91,181,3,8,169,174,22,99,73,224,157,201,201,143,29,27,127],0,true,true, accounts[6], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[1,237,67,164,41,237,60,213,180,62,61,171,14,206,134,89,237,76,11,194,13,58,57,83,24,249,34,78,184,59,22,254],4038714811,false,false, accounts[2], 1337,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[1,237,67,164,41,237,60,213,180,62,61,171,14,206,134,89,237,76,11,194,13,58,57,83,24,249,34,78,184,59,22,254],4038714811,false,true, accounts[2], 1337,{from: accounts[0]}),'revert');
  });
});
