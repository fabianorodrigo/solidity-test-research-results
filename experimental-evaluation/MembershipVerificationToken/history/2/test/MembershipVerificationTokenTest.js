const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("MembershipVerificationToken",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([61,196,235,224,81,30,21,90,51,50,232,88,250,29,153,128,120,62,189,32,107,234,168,33,45,136,227,80,119,151,84,14],[223,4,180,69,210,219,4,178,138,108,134,84,97,71,90,142,143,110,53,66,125,103,106,185,104,214,249,89,7,71,147,173],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([61,196,235,224,81,30,21,90,51,50,232,88,250,29,153,128,120,62,189,32,107,234,168,33,45,136,227,80,119,151,84,14],[223,4,180,69,210,219,4,178,138,108,134,84,97,71,90,142,143,110,53,66,125,103,106,185,104,214,249,89,7,71,147,173],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
  });
  
  it('Should execute requestMembership(uint[]) WHEN FunctionCall!=true,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.requestMembership([],{from: accounts[0]});
  });
  it('Should fail requestMembership(uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.requestMembership([256],{from: accounts[0]}),'revert');
  });
  it('Should execute forfeitMembership() WHEN msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.forfeitMembership({from: accounts[8]});
  });
  it('Should fail forfeitMembership() when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.forfeitMembership({from: 0}),'revert');
  });
  it('Should execute approveRequest(address) WHEN msg.sender==_owner,_user!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.approveRequest(accounts[7],{from: accounts[0]});
  });
  it('Should fail approveRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail approveRequest(address) when NOT comply with: _user != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute discardRequest(address) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.discardRequest(accounts[1],{from: accounts[0]});
  });
  it('Should fail discardRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.discardRequest(accounts[1],{from: accounts[9]}),'revert');
  });
  it('Should execute assignTo(address,uint[]) WHEN msg.sender==_owner,_to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.assignTo(accounts[8], [],{from: accounts[0]});
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[8], [],{from: accounts[9]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[8], [1],{from: accounts[0]}),'revert');
  });
  it('Should execute revokeFrom(address) WHEN msg.sender==_owner,_from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.revokeFrom(accounts[8],{from: accounts[0]});
  });
  it('Should fail revokeFrom(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail revokeFrom(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute addAttributeSet(bytes32,bytes32[])', async () => {
    let result = await contractMembershipVerificationToken.addAttributeSet([181,120,94,92,173,61,41,223,184,129,85,33,29,69,112,149,181,255,192,208,159,169,191,99,122,4,87,85,169,156,139,154], [[184,144,10,49,123,116,35,50,133,126,8,78,8,48,177,0,98,33,110,231,131,148,18,132,244,144,169,134,12,116,132,160],[133,85,198,147,110,196,22,33,135,98,181,23,249,155,231,50,232,206,7,231,98,155,118,69,60,197,125,170,37,194,34,158],[177,59,157,164,132,220,63,100,179,107,123,137,140,140,97,118,179,26,196,5,132,247,31,78,147,157,74,18,15,91,239,190],[2,116,113,107,87,240,48,191,204,235,79,103,137,252,81,238,174,100,243,65,64,86,150,148,102,38,203,56,20,114,69,14],[199,129,32,27,109,76,58,95,175,68,188,233,177,205,156,120,222,123,179,149,86,48,25,223,50,200,187,28,161,135,80,255],[80,246,124,76,222,245,22,198,19,15,193,129,97,230,94,225,254,234,191,244,144,142,128,20,6,213,198,45,52,110,226,103],[46,83,69,60,89,141,119,80,30,71,29,160,133,238,110,231,231,14,107,51,11,67,19,255,129,213,202,203,19,226,82,93],[213,213,59,128,67,62,241,182,86,157,6,239,49,91,183,213,240,167,35,253,75,54,116,220,235,197,160,21,150,199,46,239],[28,167,24,82,185,253,168,153,25,37,142,253,217,74,126,238,120,96,151,33,56,51,168,168,99,222,137,241,169,239,137,236],[46,67,220,65,195,49,212,217,4,102,209,47,5,216,239,115,20,120,121,235,69,243,161,176,43,105,52,67,96,208,221,197]],{from: accounts[0]});
  });
  it('Should execute modifyAttributeByIndex(address,uint,uint) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.modifyAttributeByIndex(accounts[9], 256, 10000,{from: accounts[0]});
  });
  it('Should fail modifyAttributeByIndex(address,uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.modifyAttributeByIndex(accounts[9], 256, 10000,{from: accounts[9]}),'revert');
  });
  it('Should execute getAllMembers()', async () => {
    let result = await contractMembershipVerificationToken.getAllMembers({from: accounts[0]});
  });
  it('Should execute getCurrentMemberCount()', async () => {
    let result = await contractMembershipVerificationToken.getCurrentMemberCount({from: accounts[0]});
  });
  it('Should execute getAttributeNames()', async () => {
    let result = await contractMembershipVerificationToken.getAttributeNames({from: accounts[0]});
  });
  it('Should execute getAttributes(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.getAttributes(accounts[6],{from: accounts[0]});
  });
  it('Should fail getAttributes(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.getAttributes("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute getAttributeExhaustiveCollection(uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeExhaustiveCollection(6,{from: accounts[0]});
  });
  it('Should execute getAttributeByIndex(address,uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeByIndex(accounts[6], 64,{from: accounts[0]});
  });
  it('Should execute isCurrentMember(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.isCurrentMember(accounts[6],{from: accounts[0]});
  });
  it('Should fail isCurrentMember(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.isCurrentMember("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
