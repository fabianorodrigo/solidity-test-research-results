const truffleAssert = require('truffle-assertions');
const Aiakos = artifacts.require("Aiakos");
const Releases = artifacts.require("Releases");
const Roles = artifacts.require("openzeppelin-solidity/contracts/access/Roles.sol");
const ProxyReleases = artifacts.require("ProxyReleases");

contract("Aiakos",(accounts)=>{
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
    contractAiakos = await Aiakos.new(1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(1,{from:accounts[0]}');
  });
  
  it('Should execute addMaintainer(address) WHEN msg.sender==_owner,_maintainerAddress!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractAiakos.addMaintainer(accounts[9],{from: accounts[0]});
  });
  it('Should fail addMaintainer(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should fail addMaintainer(address) when NOT comply with: _maintainerAddress != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier!=true', async () => {
    let result = await contractAiakos.deployRelease("whitelist", [208,112,133,121,213,74,83,159,171,21,252,198,22,160,252,92,44,2,165,234,13,7,205,32,120,83,9,65,70,139,14,106],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.deployRelease("\x19Ethereum Signed Message:\n32", [196,250,39,238,173,15,102,152,35,65,45,105,205,123,169,25,37,159,36,138,244,179,166,0,209,8,187,214,75,20,18,126],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted==true', async () => {
    let result = await contractAiakos.deployRelease("p3qc87", [216,16,97,11,222,96,70,4,254,63,229,85,250,83,81,220,150,192,108,213,167,231,55,238,224,226,174,236,166,1,78,141],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("p4pf1o", [110,162,203,205,193,209,191,93,27,126,95,149,177,166,242,242,7,71,151,20,75,232,211,231,161,182,59,146,21,239,67,93],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved==true', async () => {
    let result = await contractAiakos.deployRelease("whitelist", [47,23,171,34,124,239,127,118,59,195,210,138,11,10,152,184,136,63,162,214,187,28,77,3,178,18,249,168,34,63,243,231],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved!=true,approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("p75hhs", [157,69,121,202,232,51,115,200,9,194,223,47,113,60,158,254,246,89,100,108,142,95,207,172,240,69,3,152,33,37,2,85],{from: accounts[0]});
  });
  it('Should execute checkRelease(string,bytes32) WHEN _sha256Hash!=0x0,MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.checkRelease("RevertWithReason", [57,13,32,6,161,215,14,8,163,225,152,158,155,228,149,116,57,48,220,206,127,17,211,165,179,214,48,243,140,255,159,214],{from: accounts[0]});
  });
  it('Should fail checkRelease(string,bytes32) when NOT comply with: _sha256Hash != 0x0', async () => {
    let result = await truffleAssert.fails(contractAiakos.checkRelease("RevertWithReason", "0x0",{from: accounts[0]}),'revert');
  });
  it('Should execute getReleaseInfo(string)', async () => {
    let result = await contractAiakos.getReleaseInfo("Example",{from: accounts[0]});
  });
  it('Should execute amIMaintainer()', async () => {
    let result = await contractAiakos.amIMaintainer({from: accounts[0]});
  });
  it('Should execute isMaintainer(address)', async () => {
    let result = await contractAiakos.isMaintainer(accounts[1],{from: accounts[0]});
  });
  it('Should execute getRequiredNumberOfMaintainers()', async () => {
    let result = await contractAiakos.getRequiredNumberOfMaintainers({from: accounts[0]});
  });
  it('Should execute transferOwnership(address) WHEN _newOwner!=0x0000000000000000000000000000000000000000,msg.sender==_owner', async () => {
    let result = await contractAiakos.methods["transferOwnership(address)"](accounts[7],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: _newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"]("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"](accounts[7],{from: accounts[9]}),'revert');
  });
});
