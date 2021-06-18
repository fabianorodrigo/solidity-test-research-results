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
    contractAiakos = await Aiakos.new(65,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(65,{from:accounts[0]}');
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
    let result = await contractAiakos.deployRelease("\x19Ethereum Signed Message:\n32", [217,71,181,3,64,150,194,193,174,183,99,237,197,88,4,3,115,156,109,221,226,245,145,93,121,197,173,53,214,166,92,254],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.deployRelease("superuser", [16,201,219,163,52,173,182,92,80,230,247,86,71,142,54,142,216,45,185,234,115,32,70,61,176,178,89,240,69,55,209,167],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted==true', async () => {
    let result = await contractAiakos.deployRelease("PayableExample", [196,243,5,78,246,2,193,244,242,251,89,174,86,165,255,171,197,45,229,185,30,91,57,177,222,47,48,12,107,19,173,7],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("ERC1820_ACCEPT_MAGIC", [152,161,243,234,76,247,201,224,170,80,194,151,180,250,184,162,7,114,99,41,45,232,249,65,222,64,233,194,153,59,209,184],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved==true', async () => {
    let result = await contractAiakos.deployRelease("bouncer", [111,4,202,15,9,194,250,191,168,22,38,174,43,208,182,240,154,95,46,245,185,152,176,190,106,102,122,1,171,202,249,35],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved!=true,approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("bouncer", [218,196,237,186,191,65,68,63,93,6,226,115,107,80,63,131,249,156,117,190,212,21,134,86,105,113,110,140,118,167,55,97],{from: accounts[0]});
  });
  it('Should execute checkRelease(string,bytes32) WHEN _sha256Hash!=0x0,MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.checkRelease("ERC1820_ACCEPT_MAGIC", [73,18,147,233,168,123,203,188,150,139,35,160,206,164,72,110,2,139,240,211,188,189,225,228,239,242,5,141,209,36,51,140],{from: accounts[0]});
  });
  it('Should fail checkRelease(string,bytes32) when NOT comply with: _sha256Hash != 0x0', async () => {
    let result = await truffleAssert.fails(contractAiakos.checkRelease("ERC1820_ACCEPT_MAGIC", "0x0",{from: accounts[0]}),'revert');
  });
  it('Should execute getReleaseInfo(string)', async () => {
    let result = await contractAiakos.getReleaseInfo("minter",{from: accounts[0]});
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
    let result = await contractAiakos.methods["transferOwnership(address)"](accounts[2],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: _newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"]("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.methods["transferOwnership(address)"](accounts[2],{from: accounts[9]}),'revert');
  });
});
