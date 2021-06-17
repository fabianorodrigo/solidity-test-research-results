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
    contractAiakos = await Aiakos.new(65,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(65,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("ERC1820_ACCEPT_MAGIC",[24,87,32,54,69,18,172,237,213,190,97,86,119,96,90,112,249,117,144,234,230,81,227,133,148,190,96,23,212,103,135,54],4038714810,true,true, "initialized", [65,80,215,159,163,71,169,182,92,142,9,253,75,172,146,212,224,176,222,221,8,145,93,172,32,154,179,106,185,189,20,28],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("PayableExample",[145,167,50,213,120,194,159,118,140,54,35,141,133,170,230,10,60,96,83,44,71,59,13,227,58,230,181,161,122,18,82,146],1532892062,true,false, [145,167,50,213,120,194,159,118,140,54,35,141,133,170,230,10,60,96,83,44,71,59,13,227,58,230,181,161,122,18,82,146],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("PayableExample",[218,144,134,98,189,250,191,130,222,225,100,155,195,147,33,174,73,63,3,82,83,120,224,0,82,159,218,148,42,205,129,6],1532892062,true,false, [145,167,50,213,120,194,159,118,140,54,35,141,133,170,230,10,60,96,83,44,71,59,13,227,58,230,181,161,122,18,82,146],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[169,29,234,72,201,106,29,146,76,205,26,202,251,146,207,208,194,201,214,140,254,217,26,163,239,30,22,181,17,220,52,77],28,true,false, accounts[2], 28,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[169,29,234,72,201,106,29,146,76,205,26,202,251,146,207,208,194,201,214,140,254,217,26,163,239,30,22,181,17,220,52,77],28,true,true, accounts[2], 28,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[172,75,35,138,13,43,105,181,84,166,159,166,119,156,56,156,191,87,16,238,44,219,76,63,0,23,95,85,40,147,212,14],1336,false,false, accounts[2], 19,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[172,75,35,138,13,43,105,181,84,166,159,166,119,156,56,156,191,87,16,238,44,219,76,63,0,23,95,85,40,147,212,14],1336,false,true, accounts[2], 19,{from: accounts[0]}),'revert');
  });
});
