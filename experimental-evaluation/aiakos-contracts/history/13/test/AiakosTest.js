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
    contractAiakos = await Aiakos.new(18,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Aiakos.new(18,{from:accounts[0]}');
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
    let result = await contractAiakos.deployRelease("whitelist", [52,28,237,74,169,36,192,7,77,17,15,5,155,188,143,209,241,155,6,12,139,6,195,91,80,102,96,39,237,64,72,46],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.deployRelease("RevertWithReason", [189,232,247,14,70,188,167,21,248,145,137,53,60,101,145,110,174,185,154,122,198,88,147,210,21,168,255,97,51,189,186,192],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted==true', async () => {
    let result = await contractAiakos.deployRelease("bouncer", [241,32,81,94,51,0,130,39,16,21,141,198,49,225,30,34,10,150,144,196,200,79,187,102,122,26,89,6,210,214,53,208],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("UsesExample", [35,214,36,59,134,60,133,152,11,5,102,115,38,3,29,170,224,234,215,128,12,41,5,176,210,38,186,119,240,169,101,113],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved==true', async () => {
    let result = await contractAiakos.deployRelease("\x19Ethereum Signed Message:\n32", [36,235,22,217,19,223,31,173,170,192,193,242,50,76,17,81,234,152,145,236,165,4,162,182,181,98,158,188,32,141,6,191],{from: accounts[0]});
  });
  it('Should execute deployRelease(string,bytes32) WHEN releaseApproved!=true,approvalGranted!=true', async () => {
    let result = await contractAiakos.deployRelease("superuser", [29,171,26,160,247,87,146,36,202,98,52,93,245,194,69,144,67,190,83,205,33,19,207,190,154,183,43,19,47,0,19,230],{from: accounts[0]});
  });
  it('Should execute checkRelease(string,bytes32) WHEN _sha256Hash!=0x0,MemberAccess.Identifier==true', async () => {
    let result = await contractAiakos.checkRelease("PayableExample", [217,75,121,57,222,147,138,2,189,55,177,75,48,190,222,134,215,205,247,41,255,152,112,224,228,60,157,74,32,200,146,189],{from: accounts[0]});
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
    let result = await contractAiakos.isMaintainer(accounts[2],{from: accounts[0]});
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
