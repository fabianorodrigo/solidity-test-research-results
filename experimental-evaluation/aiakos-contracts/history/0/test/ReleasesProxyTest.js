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
    contractAiakos = await Aiakos.new(28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(28,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("minter",[253,143,170,83,206,38,170,231,119,54,234,9,134,119,127,151,119,241,89,192,244,47,62,159,178,245,204,150,74,79,213,13],0,false,true, "UsesExample", [246,228,62,105,6,155,122,100,77,47,130,43,161,194,175,218,137,157,99,197,117,168,134,125,202,3,17,249,74,110,202,162],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("ERC1820_ACCEPT_MAGIC",[148,97,126,134,141,181,0,61,26,199,209,227,40,0,192,34,217,85,47,148,27,156,209,111,79,129,134,53,187,191,184,2],257,false,true, [148,97,126,134,141,181,0,61,26,199,209,227,40,0,192,34,217,85,47,148,27,156,209,111,79,129,134,53,187,191,184,2],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("ERC1820_ACCEPT_MAGIC",[26,30,200,78,93,244,236,240,112,32,217,205,231,170,119,90,92,215,161,143,87,217,12,198,247,193,182,81,188,26,36,2],257,false,true, [148,97,126,134,141,181,0,61,26,199,209,227,40,0,192,34,217,85,47,148,27,156,209,111,79,129,134,53,187,191,184,2],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("initialized",[191,43,96,203,196,122,252,95,214,42,137,145,17,88,61,227,201,254,210,191,92,184,40,138,159,147,77,42,226,81,232,111],65,false,false, accounts[4], 65,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("initialized",[191,43,96,203,196,122,252,95,214,42,137,145,17,88,61,227,201,254,210,191,92,184,40,138,159,147,77,42,226,81,232,111],65,false,true, accounts[4], 65,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("PayableExample",[130,62,166,18,118,117,30,147,220,31,8,20,159,188,201,158,185,38,115,255,53,48,164,219,230,27,56,48,235,218,84,54],29,true,false, accounts[0], 4038714810,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("PayableExample",[130,62,166,18,118,117,30,147,220,31,8,20,159,188,201,158,185,38,115,255,53,48,164,219,230,27,56,48,235,218,84,54],29,true,true, accounts[0], 4038714810,{from: accounts[0]}),'revert');
  });
});
