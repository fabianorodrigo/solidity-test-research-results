const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("MembershipVerificationToken",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([167,38,57,192,57,149,229,45,155,102,177,179,230,240,248,127,247,219,1,90,185,181,15,44,217,10,104,124,152,110,67,175],[166,246,175,68,31,222,188,118,136,80,161,48,193,248,7,187,93,96,172,223,58,22,10,168,37,99,19,130,145,95,61,234],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([167,38,57,192,57,149,229,45,155,102,177,179,230,240,248,127,247,219,1,90,185,181,15,44,217,10,104,124,152,110,67,175],[166,246,175,68,31,222,188,118,136,80,161,48,193,248,7,187,93,96,172,223,58,22,10,168,37,99,19,130,145,95,61,234],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
  });
  
  it('Should execute requestMembership(uint[]) WHEN FunctionCall!=true,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractMembershipVerificationToken.requestMembership([],{from: accounts[0]});
  });
  it('Should fail requestMembership(uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.requestMembership([95],{from: accounts[0]}),'revert');
  });
  it('Should execute forfeitMembership() WHEN msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.forfeitMembership({from: accounts[8]});
  });
  it('Should fail forfeitMembership() when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.forfeitMembership({from: 0}),'revert');
  });
  it('Should execute approveRequest(address) WHEN msg.sender==_owner,_user!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.approveRequest(accounts[6],{from: accounts[0]});
  });
  it('Should fail approveRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail approveRequest(address) when NOT comply with: _user != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute discardRequest(address) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.discardRequest(accounts[4],{from: accounts[0]});
  });
  it('Should fail discardRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.discardRequest(accounts[4],{from: accounts[9]}),'revert');
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
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[6], [1532892062],{from: accounts[0]}),'revert');
  });
  it('Should execute revokeFrom(address) WHEN msg.sender==_owner,_from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.revokeFrom(accounts[2],{from: accounts[0]});
  });
  it('Should fail revokeFrom(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail revokeFrom(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute addAttributeSet(bytes32,bytes32[])', async () => {
    let result = await contractMembershipVerificationToken.addAttributeSet([83,250,11,189,110,233,21,128,109,220,241,168,177,40,114,12,19,60,128,84,20,186,252,103,68,157,207,141,17,5,13,230], [[248,171,3,190,205,244,6,149,193,82,76,186,2,146,115,15,184,158,46,246,3,172,151,84,247,136,22,247,85,159,11,125],[44,67,63,159,54,230,94,25,232,18,105,246,1,50,134,251,204,16,238,143,223,118,77,228,65,81,225,41,3,187,159,84],[53,247,152,95,231,232,99,143,109,56,142,50,244,14,251,189,167,58,56,236,137,163,249,66,208,64,149,151,81,2,192,171],[45,156,118,56,166,107,6,231,160,114,132,224,145,183,227,179,150,215,231,172,193,234,99,56,68,43,89,75,80,127,238,51],[187,133,104,72,138,241,21,222,93,252,101,111,53,87,152,43,87,161,42,211,182,197,178,195,228,6,29,38,6,101,51,161],[201,189,211,229,103,169,21,163,225,131,115,220,42,100,68,47,203,144,18,40,225,86,9,131,154,192,133,97,121,194,187,246],[156,155,220,83,235,231,186,157,194,162,244,42,65,165,3,91,198,19,149,4,215,176,41,177,209,27,75,91,157,10,243,249]],{from: accounts[0]});
  });
  it('Should execute modifyAttributeByIndex(address,uint,uint) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.modifyAttributeByIndex(accounts[4], 9999, 65,{from: accounts[0]});
  });
  it('Should fail modifyAttributeByIndex(address,uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.modifyAttributeByIndex(accounts[4], 9999, 65,{from: accounts[9]}),'revert');
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
    let result = await contractMembershipVerificationToken.getAttributes(accounts[1],{from: accounts[0]});
  });
  it('Should fail getAttributes(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.getAttributes("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute getAttributeExhaustiveCollection(uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeExhaustiveCollection(3,{from: accounts[0]});
  });
  it('Should execute getAttributeByIndex(address,uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeByIndex(accounts[5], 26,{from: accounts[0]});
  });
  it('Should execute isCurrentMember(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.isCurrentMember(accounts[1],{from: accounts[0]});
  });
  it('Should fail isCurrentMember(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.isCurrentMember("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
