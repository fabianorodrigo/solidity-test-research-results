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
    contractAiakos = await Aiakos.new(9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(9999,{from:accounts[0]}');
      ProxyReleases.link('Releases', contractReleases.address);
    contractProxyReleases = await ProxyReleases.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Releases.Release,string,bytes32)', async () => {
    let result = await contractProxyReleases.testinit("UsesExample",[74,247,185,52,58,66,194,24,71,180,44,103,232,129,6,168,170,0,43,233,165,189,15,39,124,213,208,243,126,51,180,20],29,false,true, "PayableExample", [60,241,121,157,167,51,8,36,158,172,158,3,77,226,122,36,196,14,91,88,146,100,237,27,79,227,189,179,113,144,12,140],{from: accounts[0]});
  });
  it('Should execute testcheck(Releases.Release,bytes32) WHEN release.sha256Hash==sha256Hash', async () => {
    let result = await contractProxyReleases.testcheck("s3og7a",[146,36,251,62,107,181,87,132,235,43,162,214,175,97,5,78,74,211,29,26,156,35,124,33,94,237,125,224,17,146,222,87],1,false,false, [146,36,251,62,107,181,87,132,235,43,162,214,175,97,5,78,74,211,29,26,156,35,124,33,94,237,125,224,17,146,222,87],{from: accounts[0]});
  });
  it('Should fail testcheck(Releases.Release,bytes32) when NOT comply with: release.sha256Hash == sha256Hash', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testcheck("s3og7a",[210,141,76,42,8,230,57,58,98,105,218,170,81,49,63,137,169,240,41,55,114,70,239,217,127,94,232,177,206,95,72,218],1,false,false, [146,36,251,62,107,181,87,132,235,43,162,214,175,97,5,78,74,211,29,26,156,35,124,33,94,237,125,224,17,146,222,87],{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter==requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("RevertWithReason",[94,10,130,108,14,84,31,72,16,43,0,230,206,130,83,118,236,10,37,144,165,229,158,236,174,227,136,117,180,252,99,157],9999,true,false, accounts[8], 9999,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("RevertWithReason",[94,10,130,108,14,84,31,72,16,43,0,230,206,130,83,118,236,10,37,144,165,229,158,236,174,227,136,117,180,252,99,157],9999,true,true, accounts[8], 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute testaddApproval(Releases.Release,address,uint) WHEN release.approvalCounter!=requiredNumberOfMaintainers,release.approved!=true', async () => {
    let result = await contractProxyReleases.testaddApproval("4jfu9",[203,86,133,149,194,251,47,127,241,145,146,76,240,164,56,1,11,194,74,23,58,14,209,100,99,28,226,195,123,150,227,180],257,true,false, accounts[7], 29,{from: accounts[0]});
  });
  it('Should fail testaddApproval(Releases.Release,address,uint) when NOT comply with: release.approved != true', async () => {
    let result = await truffleAssert.fails(contractProxyReleases.testaddApproval("4jfu9",[203,86,133,149,194,251,47,127,241,145,146,76,240,164,56,1,11,194,74,23,58,14,209,100,99,28,226,195,123,150,227,180],257,true,true, accounts[7], 29,{from: accounts[0]}),'revert');
  });
});
