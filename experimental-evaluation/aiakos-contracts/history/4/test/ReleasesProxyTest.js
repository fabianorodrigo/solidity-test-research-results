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
    contractAiakos = await Aiakos.new(17,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(17,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("UsesExample",[58,142,176,84,11,160,164,44,128,107,188,186,203,22,192,5,21,215,211,123,149,178,116,94,44,178,228,18,141,165,98,189],29,true,true, "PayableExample", [238,125,254,100,43,69,214,232,147,178,211,52,78,255,16,9,181,13,103,201,12,221,81,160,243,58,201,76,35,47,21,80],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("minter",[219,72,88,232,17,171,132,119,85,157,101,80,240,15,115,5,185,243,244,149,227,120,55,45,159,8,82,222,128,113,2,43],3,true,false, [219,72,88,232,17,171,132,119,85,157,101,80,240,15,115,5,185,243,244,149,227,120,55,45,159,8,82,222,128,113,2,43],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("minter",[18,131,160,93,235,111,40,75,114,116,49,187,228,238,210,65,176,143,165,93,98,106,218,226,44,76,194,154,130,52,119,45],3,true,false, [219,72,88,232,17,171,132,119,85,157,101,80,240,15,115,5,185,243,244,149,227,120,55,45,159,8,82,222,128,113,2,43],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("PayableExample",[101,129,178,61,155,114,206,230,17,186,38,109,49,251,47,45,247,26,233,209,208,129,250,187,145,105,234,239,29,152,192,208],29,true,false, accounts[5], 29,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("PayableExample",[101,129,178,61,155,114,206,230,17,186,38,109,49,251,47,45,247,26,233,209,208,129,250,187,145,105,234,239,29,152,192,208],29,true,true, accounts[5], 29,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("bouncer",[251,128,187,177,53,232,46,186,124,116,80,17,141,5,8,30,51,213,217,77,107,13,108,98,236,111,209,154,56,197,249,103],254,true,false, accounts[9], 4,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("bouncer",[251,128,187,177,53,232,46,186,124,116,80,17,141,5,8,30,51,213,217,77,107,13,108,98,236,111,209,154,56,197,249,103],254,true,true, accounts[9], 4,{from: accounts[0]}),'revert');
  });
});
