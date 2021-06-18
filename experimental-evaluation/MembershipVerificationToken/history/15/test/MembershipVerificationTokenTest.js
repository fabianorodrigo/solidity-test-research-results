const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("MembershipVerificationToken",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([194,81,247,91,238,176,0,184,91,146,173,252,84,5,176,61,11,169,155,64,172,148,188,141,158,248,66,215,222,97,26,13],[99,119,15,117,161,101,255,118,153,122,179,222,239,128,115,118,184,155,247,198,102,156,0,100,173,50,115,164,232,216,167,173],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([194,81,247,91,238,176,0,184,91,146,173,252,84,5,176,61,11,169,155,64,172,148,188,141,158,248,66,215,222,97,26,13],[99,119,15,117,161,101,255,118,153,122,179,222,239,128,115,118,184,155,247,198,102,156,0,100,173,50,115,164,232,216,167,173],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
  });
  
  it('Should execute requestMembership(uint[]) WHEN FunctionCall!=true,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.requestMembership([],{from: accounts[0]});
  });
  it('Should fail requestMembership(uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.requestMembership([1],{from: accounts[0]}),'revert');
  });
  it('Should execute forfeitMembership() WHEN msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.forfeitMembership({from: accounts[9]});
  });
  it('Should fail forfeitMembership() when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.forfeitMembership({from: 0}),'revert');
  });
  it('Should execute approveRequest(address) WHEN msg.sender==_owner,_user!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.approveRequest(accounts[5],{from: accounts[0]});
  });
  it('Should fail approveRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should fail approveRequest(address) when NOT comply with: _user != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute discardRequest(address) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.discardRequest(accounts[2],{from: accounts[0]});
  });
  it('Should fail discardRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.discardRequest(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute assignTo(address,uint[]) WHEN msg.sender==_owner,_to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.assignTo(accounts[3], [],{from: accounts[0]});
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[3], [],{from: accounts[9]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail assignTo(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[3], [29],{from: accounts[0]}),'revert');
  });
  it('Should execute revokeFrom(address) WHEN msg.sender==_owner,_from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.revokeFrom(accounts[9],{from: accounts[0]});
  });
  it('Should fail revokeFrom(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should fail revokeFrom(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute addAttributeSet(bytes32,bytes32[])', async () => {
    let result = await contractMembershipVerificationToken.addAttributeSet([11,96,48,71,75,217,100,131,83,112,66,233,50,230,131,117,85,245,92,153,221,204,12,14,218,181,171,151,248,54,97,13], [[231,235,248,164,133,6,188,186,25,127,254,138,100,247,31,195,112,24,209,173,6,98,169,57,193,108,79,170,69,69,249,191],[189,88,245,144,233,1,242,233,137,33,88,201,3,235,161,212,97,69,190,253,237,210,148,218,85,86,215,2,140,5,221,64],[82,18,20,215,102,120,149,11,128,57,9,141,76,55,183,206,44,165,124,181,190,79,217,122,172,151,43,84,187,129,253,137],[142,23,137,36,60,158,195,31,105,111,144,147,138,146,48,154,101,128,118,208,170,223,19,60,54,247,1,124,49,254,106,227],[120,139,248,43,168,182,95,118,57,130,26,134,185,138,230,31,200,233,130,39,238,70,113,183,214,53,115,155,107,7,210,192],[53,157,134,181,36,173,205,63,170,231,147,231,125,19,3,60,207,147,28,252,119,251,245,122,81,21,73,114,137,173,86,191],[245,204,100,191,130,145,180,33,30,211,180,160,242,126,1,123,186,252,177,30,62,254,178,82,144,231,27,119,163,58,92,150],[221,170,186,48,150,124,15,140,122,81,42,241,152,144,67,66,73,163,15,42,55,85,78,135,114,23,201,171,247,217,27,85]],{from: accounts[0]});
  });
  it('Should execute modifyAttributeByIndex(address,uint,uint) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.modifyAttributeByIndex(accounts[5], 4, 2014223714,{from: accounts[0]});
  });
  it('Should fail modifyAttributeByIndex(address,uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.modifyAttributeByIndex(accounts[5], 4, 2014223714,{from: accounts[9]}),'revert');
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
    let result = await contractMembershipVerificationToken.getAttributeExhaustiveCollection(28,{from: accounts[0]});
  });
  it('Should execute getAttributeByIndex(address,uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeByIndex(accounts[7], 95,{from: accounts[0]});
  });
  it('Should execute isCurrentMember(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.isCurrentMember(accounts[4],{from: accounts[0]});
  });
  it('Should fail isCurrentMember(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.isCurrentMember("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
