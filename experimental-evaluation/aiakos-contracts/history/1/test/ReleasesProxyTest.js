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
    contractAiakos = await Aiakos.new(3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(3,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("UsesExample",[27,254,95,181,127,204,235,221,2,93,203,209,253,175,185,168,159,247,2,235,234,63,221,14,48,14,65,87,168,94,22,209],1337,true,true, "RevertWithReason", [31,63,85,19,8,123,73,17,102,207,30,123,176,100,73,75,88,88,241,205,96,120,85,7,122,217,92,166,84,54,61,187],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("minter",[227,190,134,200,251,143,107,30,20,11,199,153,162,81,13,198,211,190,200,192,40,76,160,68,147,206,132,250,95,195,191,230],65,true,true, [227,190,134,200,251,143,107,30,20,11,199,153,162,81,13,198,211,190,200,192,40,76,160,68,147,206,132,250,95,195,191,230],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("minter",[90,207,122,213,134,217,116,129,186,27,38,251,175,19,54,74,17,14,139,132,172,195,153,7,191,155,250,142,173,127,20,48],65,true,true, [227,190,134,200,251,143,107,30,20,11,199,153,162,81,13,198,211,190,200,192,40,76,160,68,147,206,132,250,95,195,191,230],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("UsesExample",[110,161,123,133,240,208,74,218,185,37,42,187,53,143,252,53,68,89,36,60,213,107,11,220,117,83,246,189,183,208,159,187],3,true,false, accounts[0], 3,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("UsesExample",[110,161,123,133,240,208,74,218,185,37,42,187,53,143,252,53,68,89,36,60,213,107,11,220,117,83,246,189,183,208,159,187],3,true,true, accounts[0], 3,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("p7i8gw",[254,183,150,127,10,243,140,109,34,76,51,88,165,193,164,129,192,214,163,94,105,241,79,186,48,176,60,147,35,152,126,158],2014223714,false,false, accounts[7], 96,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("p7i8gw",[254,183,150,127,10,243,140,109,34,76,51,88,165,193,164,129,192,214,163,94,105,241,79,186,48,176,60,147,35,152,126,158],2014223714,false,true, accounts[7], 96,{from: accounts[0]}),'revert');
  });
});
