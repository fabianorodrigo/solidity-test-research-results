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
    contractAiakos = await Aiakos.new(5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(5,{from:accounts[0]}');
  });
  
  it('Should execute addMaintainer(address) WHEN msg.sender==_owner,_maintainerAddress!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractAiakos.addMaintainer(accounts[8],{from: accounts[0]});
  });
  it('Should fail addMaintainer(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail addMaintainer(address) when NOT comply with: _maintainerAddress != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractAiakos.addMaintainer("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier!=true', async () => {
    let result = await contractAiakos.deployRelease("4lvaff", [44,58,36,248,102,254,15,178,18,210,178,17,226,186,235,94,32,8,180,45,46,243,70,32,253,46,218,252,105,57,32,185],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.deployRelease("ag7lrd", [154,109,172,7,26,139,239,22,47,205,56,179,196,13,230,168,102,3,81,4,121,122,94,65,145,27,38,91,6,51,49,104],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted==true', async () => {
    let result = await contractAiakos.deployRelease("superuser", [249,253,89,61,196,17,216,60,102,65,137,62,219,62,145,57,217,4,8,229,64,65,21,91,229,15,70,250,175,121,184,35],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("PayableExample", [209,195,83,185,131,172,21,82,122,204,220,64,201,143,157,154,200,129,197,24,108,221,23,88,179,52,89,146,226,122,229,64],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved==true', async () => {
    let result = await contractAiakos.deployRelease("bouncer", [145,59,161,62,23,128,40,217,155,210,211,120,233,11,35,253,175,253,51,183,76,2,11,71,62,112,171,5,253,122,16,39],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved!=true,approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("Example", [8,147,169,67,100,122,199,76,130,3,206,233,191,163,57,215,56,117,222,202,211,187,196,91,43,178,34,190,216,62,157,169],{from: accounts[0]});
  });
  it('Should execute checkRelease(string,bytes32) WHEN _sha256Hash!=0x0,MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.checkRelease("PayableExample", [3,234,125,20,68,100,252,179,154,49,164,174,79,97,126,171,117,211,199,108,167,48,255,3,208,78,36,17,166,54,204,21],{from: accounts[0]});
  });
  it('Should fail checkRelease(string,bytes32) when NOT comply with: _sha256Hash != 0x0', async () => {
    let result = await truffleAssert.fails(contractAiakos.checkRelease("PayableExample", "0x0",{from: accounts[0]}),'revert');
  });
  it('Should execute getReleaseInfo(string)', async () => {
    let result = await contractAiakos.getReleaseInfo("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute amIMaintainer()', async () => {
    let result = await contractAiakos.amIMaintainer({from: accounts[0]});
  });
  it('Should execute isMaintainer(address)', async () => {
    let result = await contractAiakos.isMaintainer(accounts[9],{from: accounts[0]});
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
