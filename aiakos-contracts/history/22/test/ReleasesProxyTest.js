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
    contractAiakos = await Aiakos.new(10001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(10001,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("RevertWithReason",[77,130,208,158,107,62,89,222,243,144,174,216,103,172,36,229,237,205,164,131,249,75,3,32,67,161,251,139,222,34,255,228],256,true,false, "superuser", [24,84,103,101,203,251,100,52,24,74,200,12,161,184,165,239,56,222,62,249,126,175,12,219,116,54,36,215,240,196,170,65],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[17,51,188,200,101,78,147,167,117,236,2,237,77,101,27,162,144,164,169,91,205,244,120,207,248,144,105,119,101,44,191,72],96,true,true, [17,51,188,200,101,78,147,167,117,236,2,237,77,101,27,162,144,164,169,91,205,244,120,207,248,144,105,119,101,44,191,72],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("\\x19Ethereum Signed Message:\\n32",[63,225,243,92,196,255,168,207,68,17,111,29,168,125,61,200,248,91,85,235,23,134,236,164,130,47,190,153,231,186,203,132],96,true,true, [17,51,188,200,101,78,147,167,117,236,2,237,77,101,27,162,144,164,169,91,205,244,120,207,248,144,105,119,101,44,191,72],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[46,168,134,231,41,160,49,22,54,21,127,156,133,115,77,93,15,242,158,171,185,190,112,233,68,149,43,104,164,193,219,227],254,false,false, accounts[3], 254,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[46,168,134,231,41,160,49,22,54,21,127,156,133,115,77,93,15,242,158,171,185,190,112,233,68,149,43,104,164,193,219,227],254,false,true, accounts[3], 254,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[14,99,146,36,130,226,192,238,99,76,190,69,19,200,118,122,147,100,242,155,252,200,158,192,40,198,126,69,239,154,59,250],19,true,false, accounts[7], 3,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("ERC1820_ACCEPT_MAGIC",[14,99,146,36,130,226,192,238,99,76,190,69,19,200,118,122,147,100,242,155,252,200,158,192,40,198,126,69,239,154,59,250],19,true,true, accounts[7], 3,{from: accounts[0]}),'revert');
  });
});
