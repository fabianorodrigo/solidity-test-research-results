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
    contractAiakos = await Aiakos.new(2014223715,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(2014223715,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("Example",[105,121,101,3,191,227,126,87,39,68,11,133,136,84,162,153,38,172,109,6,181,155,183,189,41,88,226,206,212,97,212,201],95,false,true, "bouncer", [229,60,45,50,87,30,141,188,97,223,99,87,155,189,53,90,236,136,238,51,70,216,162,63,95,142,251,158,207,20,45,242],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[87,226,6,82,16,0,65,135,193,146,142,193,229,110,117,162,115,51,179,87,192,114,231,141,43,136,10,52,201,179,70,237],18,true,false, [87,226,6,82,16,0,65,135,193,146,142,193,229,110,117,162,115,51,179,87,192,114,231,141,43,136,10,52,201,179,70,237],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[223,81,190,149,176,96,27,46,115,202,189,119,142,0,171,243,208,68,196,246,12,128,212,173,152,131,222,58,68,193,21,67],18,true,false, [87,226,6,82,16,0,65,135,193,146,142,193,229,110,117,162,115,51,179,87,192,114,231,141,43,136,10,52,201,179,70,237],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("whitelist",[21,23,11,58,59,143,74,161,237,149,185,152,124,158,239,35,150,70,83,85,108,197,182,75,165,97,116,139,52,117,26,67],65,true,false, accounts[9], 65,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("whitelist",[21,23,11,58,59,143,74,161,237,149,185,152,124,158,239,35,150,70,83,85,108,197,182,75,165,97,116,139,52,117,26,67],65,true,true, accounts[9], 65,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[196,200,247,240,211,159,140,170,163,81,52,99,11,135,87,202,139,111,56,93,212,45,193,48,186,100,156,236,139,26,246,202],95,true,false, accounts[0], 2014223716,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("\\x19Ethereum Signed Message:\\n32",[196,200,247,240,211,159,140,170,163,81,52,99,11,135,87,202,139,111,56,93,212,45,193,48,186,100,156,236,139,26,246,202],95,true,true, accounts[0], 2014223716,{from: accounts[0]}),'revert');
  });
});
