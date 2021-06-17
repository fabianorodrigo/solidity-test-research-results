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
    contractAiakos = await Aiakos.new(27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(27,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("bouncer",[222,10,67,206,104,237,68,33,187,97,66,204,86,108,232,182,78,105,206,50,75,150,79,48,20,136,143,186,105,33,50,100],5,false,false, "i2v32r", [150,33,107,25,43,19,161,155,121,109,6,18,207,101,164,10,23,232,243,63,76,101,135,188,177,34,30,240,86,235,42,231],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("whitelist",[105,109,129,249,10,232,157,132,102,43,95,196,8,37,128,211,129,4,69,95,151,220,0,90,94,147,236,18,75,145,88,90],1338,false,true, [105,109,129,249,10,232,157,132,102,43,95,196,8,37,128,211,129,4,69,95,151,220,0,90,94,147,236,18,75,145,88,90],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("whitelist",[247,19,160,117,4,84,242,122,173,114,18,46,192,115,251,82,6,229,90,195,105,168,187,249,203,63,194,12,232,122,75,143],1338,false,true, [105,109,129,249,10,232,157,132,102,43,95,196,8,37,128,211,129,4,69,95,151,220,0,90,94,147,236,18,75,145,88,90],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("Example",[242,171,199,125,89,120,137,112,164,86,175,36,181,185,59,225,66,254,66,182,3,234,123,43,63,154,195,139,213,202,19,74],1337,false,false, accounts[6], 1337,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("Example",[242,171,199,125,89,120,137,112,164,86,175,36,181,185,59,225,66,254,66,182,3,234,123,43,63,154,195,139,213,202,19,74],1337,false,true, accounts[6], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("i2v32r",[171,37,53,91,145,61,23,86,125,176,113,50,87,8,39,90,4,43,139,7,86,166,127,133,232,239,70,71,229,20,121,101],1,true,false, accounts[8], 3,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("i2v32r",[171,37,53,91,145,61,23,86,125,176,113,50,87,8,39,90,4,43,139,7,86,166,127,133,232,239,70,71,229,20,121,101],1,true,true, accounts[8], 3,{from: accounts[0]}),'revert');
  });
});
