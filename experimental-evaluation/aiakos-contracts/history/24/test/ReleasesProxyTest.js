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
    contractAiakos = await Aiakos.new(5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(5,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("ERC1820_ACCEPT_MAGIC",[38,5,144,223,1,11,76,23,225,185,237,222,73,187,209,109,184,117,255,36,5,23,148,113,70,9,9,167,67,115,167,27],4038714811,false,true, "\x19Ethereum Signed Message:\n32", [236,189,73,218,101,4,26,2,237,241,187,44,183,194,173,161,156,222,140,251,155,84,249,170,45,121,212,80,230,178,204,175],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("4dxg2j",[197,194,173,23,88,199,195,208,150,217,238,69,196,216,77,37,136,166,190,25,230,79,210,118,234,25,40,91,208,73,134,206],27,true,true, [197,194,173,23,88,199,195,208,150,217,238,69,196,216,77,37,136,166,190,25,230,79,210,118,234,25,40,91,208,73,134,206],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("4dxg2j",[108,86,174,183,199,181,12,220,202,71,65,219,54,254,225,129,165,118,194,248,246,96,241,125,74,254,235,32,139,63,97,226],27,true,true, [197,194,173,23,88,199,195,208,150,217,238,69,196,216,77,37,136,166,190,25,230,79,210,118,234,25,40,91,208,73,134,206],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[175,4,105,209,21,184,12,43,117,197,226,181,166,119,72,51,119,98,33,143,20,25,254,21,54,219,56,164,180,96,39,135],255,false,false, accounts[3], 255,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[175,4,105,209,21,184,12,43,117,197,226,181,166,119,72,51,119,98,33,143,20,25,254,21,54,219,56,164,180,96,39,135],255,false,true, accounts[3], 255,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[146,39,199,86,183,135,106,11,162,232,76,245,98,46,39,120,121,124,215,30,80,199,134,112,130,42,204,99,10,145,59,88],1532892062,true,false, accounts[7], 2,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[146,39,199,86,183,135,106,11,162,232,76,245,98,46,39,120,121,124,215,30,80,199,134,112,130,42,204,99,10,145,59,88],1532892062,true,true, accounts[7], 2,{from: accounts[0]}),'revert');
  });
});
