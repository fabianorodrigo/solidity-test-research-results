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
    let result = await contractProxyReleases.testinit("UsesExample",[11,235,109,195,216,99,82,209,103,62,169,2,104,112,146,159,179,207,135,107,82,33,179,17,82,116,21,1,202,226,28,7],29,false,false, "IsLibrary", [245,126,130,76,171,65,39,93,200,191,170,42,100,62,189,63,227,180,112,238,88,73,110,220,217,31,25,39,179,232,218,218],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("gtym9",[12,31,6,28,26,239,102,137,228,81,55,195,113,161,179,118,200,9,201,245,247,155,230,247,20,152,26,223,30,72,17,223],2014223716,false,false, [12,31,6,28,26,239,102,137,228,81,55,195,113,161,179,118,200,9,201,245,247,155,230,247,20,152,26,223,30,72,17,223],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("gtym9",[246,145,177,187,36,251,53,244,60,132,235,16,164,94,125,109,118,224,69,150,202,208,171,222,231,161,22,189,146,151,64,70],2014223716,false,false, [12,31,6,28,26,239,102,137,228,81,55,195,113,161,179,118,200,9,201,245,247,155,230,247,20,152,26,223,30,72,17,223],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("gtym9",[175,117,194,251,93,151,208,220,53,177,124,98,90,79,244,29,21,92,240,43,182,187,53,77,178,23,182,218,103,78,75,170],2014223715,false,false, accounts[1], 2014223715,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("gtym9",[175,117,194,251,93,151,208,220,53,177,124,98,90,79,244,29,21,92,240,43,182,187,53,77,178,23,182,218,103,78,75,170],2014223715,false,true, accounts[1], 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[185,26,96,86,235,249,146,212,157,209,35,27,32,1,47,196,240,3,5,98,27,38,149,91,196,119,24,230,154,129,126,114],19,false,false, accounts[2], 4038714811,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[185,26,96,86,235,249,146,212,157,209,35,27,32,1,47,196,240,3,5,98,27,38,149,91,196,119,24,230,154,129,126,114],19,false,true, accounts[2], 4038714811,{from: accounts[0]}),'revert');
  });
});
