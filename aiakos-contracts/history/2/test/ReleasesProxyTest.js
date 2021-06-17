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
    contractAiakos = await Aiakos.new(2014223714,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(2014223714,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("initialized",[209,133,53,99,43,209,230,92,97,189,245,83,143,148,215,78,252,160,47,103,81,192,135,100,235,67,21,245,54,34,236,255],2014223716,true,true, "y8ctzq", [69,150,173,134,126,187,160,243,148,5,169,199,142,29,153,194,98,124,118,165,4,225,243,68,63,203,232,92,90,254,185,85],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[62,166,110,65,114,37,236,242,2,0,191,30,181,191,127,204,1,151,230,171,154,9,233,236,208,37,110,15,130,126,91,188],18,true,true, [62,166,110,65,114,37,236,242,2,0,191,30,181,191,127,204,1,151,230,171,154,9,233,236,208,37,110,15,130,126,91,188],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[195,116,206,152,61,77,120,189,122,73,39,202,247,94,219,221,22,236,237,255,47,191,104,56,66,154,43,83,62,179,45,153],18,true,true, [62,166,110,65,114,37,236,242,2,0,191,30,181,191,127,204,1,151,230,171,154,9,233,236,208,37,110,15,130,126,91,188],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("y8ctzq",[237,92,200,150,157,237,34,185,166,108,242,97,203,208,209,197,44,199,25,229,193,53,1,221,243,70,86,69,79,40,27,107],1336,true,false, accounts[9], 1336,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("y8ctzq",[237,92,200,150,157,237,34,185,166,108,242,97,203,208,209,197,44,199,25,229,193,53,1,221,243,70,86,69,79,40,27,107],1336,true,true, accounts[9], 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("hh8oql",[147,225,252,220,18,81,175,255,109,63,82,245,214,166,73,154,127,129,37,86,246,110,15,112,250,229,223,90,23,155,152,42],2,true,false, accounts[3], 6,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("hh8oql",[147,225,252,220,18,81,175,255,109,63,82,245,214,166,73,154,127,129,37,86,246,110,15,112,250,229,223,90,23,155,152,42],2,true,true, accounts[3], 6,{from: accounts[0]}),'revert');
  });
});
