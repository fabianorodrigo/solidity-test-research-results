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
    contractAiakos = await Aiakos.new(2,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(2,{from:accounts[0]}');
  });
  
  it('Should execute addMaintainer(address) WHEN msg.sender==_owner,_maintainerAddress!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractAiakos.addMaintainer(accounts[3],{from: accounts[0]});
  });
  it('Should fail addMaintainer(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should fail addMaintainer(address) when NOT comply with: _maintainerAddress != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier!=true', async () => {
    let result = await contractAiakos.deployRelease("minter", [64,41,85,133,125,85,98,77,188,135,191,167,76,115,163,49,125,123,112,158,100,247,25,148,204,219,155,44,84,79,147,254],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.deployRelease("7367e", [51,141,11,6,45,8,147,164,237,233,195,103,152,192,140,97,42,45,12,4,245,100,125,177,43,129,99,188,151,219,148,163],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted==true', async () => {
    let result = await contractAiakos.deployRelease("UsesExample", [59,10,147,19,1,135,36,123,219,162,120,211,173,212,92,190,193,235,84,182,206,58,43,186,103,130,10,203,24,108,24,92],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("initialized", [112,217,44,35,28,230,27,69,126,188,48,211,202,219,38,5,4,122,146,223,203,57,115,234,45,127,197,234,84,87,138,50],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved==true', async () => {
    let result = await contractAiakos.deployRelease("PayableExample", [209,7,11,96,19,75,33,205,150,49,57,240,211,28,44,54,250,75,161,202,45,14,170,98,88,107,229,40,197,183,10,133],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved!=true,approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("7367e", [31,161,181,134,12,166,197,210,215,93,229,227,236,58,218,2,193,187,213,135,241,242,199,37,2,38,52,51,65,141,216,175],{from: accounts[0]});
  });
  it('Should execute checkRelease(string,bytes32) WHEN _sha256Hash!=0x0,MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.checkRelease("\x19Ethereum Signed Message:\n32", [192,118,29,156,61,177,120,230,158,72,150,178,82,232,63,116,253,221,66,137,22,240,65,44,126,48,179,195,7,252,167,98],{from: accounts[0]});
  });
  it('Should fail checkRelease(string,bytes32) when NOT comply with: _sha256Hash != 0x0', async () => {
    let result = await truffleAssert.fails(contractAiakos.checkRelease("\x19Ethereum Signed Message:\n32", "0x0",{from: accounts[0]}),'revert');
  });
  it('Should execute getReleaseInfo(string)', async () => {
    let result = await contractAiakos.getReleaseInfo("PayableExample",{from: accounts[0]});
  });
  it('Should execute amIMaintainer()', async () => {
    let result = await contractAiakos.amIMaintainer({from: accounts[0]});
  });
  it('Should execute isMaintainer(address)', async () => {
    let result = await contractAiakos.isMaintainer(accounts[5],{from: accounts[0]});
  });
  it('Should execute getRequiredNumberOfMaintainers()', async () => {
    let result = await contractAiakos.getRequiredNumberOfMaintainers({from: accounts[0]});
  });
  it('Should execute transferOwnership(address) WHEN _newOwner!=0x0000000000000000000000000000000000000000,msg.sender==_owner', async () => {
    let result = await contractAiakos.methods["transferOwnership(address)"](accounts[9],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: _newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"]("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"](accounts[9],{from: accounts[9]}),'revert');
  });
});
