const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("MembershipVerificationToken",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([212,143,134,69,255,181,101,66,53,210,159,195,52,224,145,76,39,9,193,74,170,179,29,197,25,108,61,74,65,240,158,104],[168,116,163,23,45,220,216,151,203,196,45,48,62,210,177,119,224,239,23,38,113,90,191,119,151,243,85,10,222,29,184,141],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([212,143,134,69,255,181,101,66,53,210,159,195,52,224,145,76,39,9,193,74,170,179,29,197,25,108,61,74,65,240,158,104],[168,116,163,23,45,220,216,151,203,196,45,48,62,210,177,119,224,239,23,38,113,90,191,119,151,243,85,10,222,29,184,141],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
  });
  
  it('Should execute requestMembership(uint[]) WHEN FunctionCall!=true,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.requestMembership([],{from: accounts[0]});
  });
  it('Should fail requestMembership(uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.requestMembership([257],{from: accounts[0]}),'revert');
  });
  it('Should execute forfeitMembership() WHEN msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.forfeitMembership({from: accounts[5]});
  });
  it('Should fail forfeitMembership() when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.forfeitMembership({from: 0}),'revert');
  });
  it('Should execute approveRequest(address) WHEN msg.sender==_owner,_user!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.approveRequest(accounts[2],{from: accounts[0]});
  });
  it('Should fail approveRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail approveRequest(address) when NOT comply with: _user != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute discardRequest(address) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.discardRequest(accounts[9],{from: accounts[0]});
  });
  it('Should fail discardRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.discardRequest(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should execute assignTo(address,uint[]) WHEN msg.sender==_owner,_to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.assignTo(accounts[6], [],{from: accounts[0]});
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[6], [],{from: accounts[9]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[6], [65],{from: accounts[0]}),'revert');
  });
  it('Should execute revokeFrom(address) WHEN msg.sender==_owner,_from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.revokeFrom(accounts[5],{from: accounts[0]});
  });
  it('Should fail revokeFrom(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail revokeFrom(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute addAttributeSet(bytes32,bytes32[])', async () => {
    let result = await contractMembershipVerificationToken.addAttributeSet([77,119,76,30,100,214,170,196,176,31,237,54,30,152,132,133,176,133,37,3,109,33,104,119,215,11,21,73,118,89,133,243], [[38,174,199,222,142,106,255,65,225,76,161,162,166,198,145,171,211,49,36,4,241,59,207,78,48,212,140,36,67,233,70,156],[202,177,200,67,251,2,192,207,10,119,122,106,26,79,131,40,91,171,194,214,195,147,27,174,64,44,80,244,47,22,233,191],[71,231,53,26,237,254,165,143,33,247,79,184,141,77,23,164,150,215,96,14,110,154,240,48,143,15,100,143,223,194,108,79],[117,222,18,90,223,104,130,140,254,107,206,30,99,147,13,96,78,55,248,177,241,217,110,149,249,137,123,145,33,87,3,14],[129,105,166,63,12,117,68,79,255,167,218,68,139,34,44,92,21,165,212,129,31,163,41,108,96,216,58,87,120,175,24,230]],{from: accounts[0]});
  });
  it('Should execute modifyAttributeByIndex(address,uint,uint) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.modifyAttributeByIndex(accounts[1], 2014223716, 1338,{from: accounts[0]});
  });
  it('Should fail modifyAttributeByIndex(address,uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.modifyAttributeByIndex(accounts[1], 2014223716, 1338,{from: accounts[9]}),'revert');
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
    let result = await contractMembershipVerificationToken.getAttributes(accounts[2],{from: accounts[0]});
  });
  it('Should fail getAttributes(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.getAttributes("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute getAttributeExhaustiveCollection(uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeExhaustiveCollection(27,{from: accounts[0]});
  });
  it('Should execute getAttributeByIndex(address,uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeByIndex(accounts[6], 65,{from: accounts[0]});
  });
  it('Should execute isCurrentMember(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.isCurrentMember(accounts[5],{from: accounts[0]});
  });
  it('Should fail isCurrentMember(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.isCurrentMember("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
