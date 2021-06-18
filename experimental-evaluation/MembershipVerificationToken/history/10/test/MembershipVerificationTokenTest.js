const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("MembershipVerificationToken",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([16,198,177,147,45,102,141,163,138,115,205,129,238,197,96,8,20,42,139,6,12,73,91,2,55,34,179,239,216,87,230,195],[248,150,28,138,74,162,92,251,238,120,87,36,7,230,77,203,180,107,248,161,65,20,195,68,187,231,62,9,191,48,63,113],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([16,198,177,147,45,102,141,163,138,115,205,129,238,197,96,8,20,42,139,6,12,73,91,2,55,34,179,239,216,87,230,195],[248,150,28,138,74,162,92,251,238,120,87,36,7,230,77,203,180,107,248,161,65,20,195,68,187,231,62,9,191,48,63,113],{from:accounts[0]}');
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
    let result = await contractMembershipVerificationToken.forfeitMembership({from: accounts[6]});
  });
  it('Should fail forfeitMembership() when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.forfeitMembership({from: 0}),'revert');
  });
  it('Should execute approveRequest(address) WHEN msg.sender==_owner,_user!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.approveRequest(accounts[8],{from: accounts[0]});
  });
  it('Should fail approveRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should fail approveRequest(address) when NOT comply with: _user != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.approveRequest("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute discardRequest(address) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.discardRequest(accounts[5],{from: accounts[0]});
  });
  it('Should fail discardRequest(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.discardRequest(accounts[5],{from: accounts[9]}),'revert');
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
    let result = await truffleAssert.fails(contractMembershipVerificationToken.assignTo(accounts[8], [5],{from: accounts[0]}),'revert');
  });
  it('Should execute revokeFrom(address) WHEN msg.sender==_owner,_from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.revokeFrom(accounts[0],{from: accounts[0]});
  });
  it('Should fail revokeFrom(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should fail revokeFrom(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.revokeFrom("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute addAttributeSet(bytes32,bytes32[])', async () => {
    let result = await contractMembershipVerificationToken.addAttributeSet([47,113,47,171,8,148,236,89,40,4,177,199,61,69,82,51,134,36,68,200,127,65,249,1,9,202,191,105,100,11,101,126], [[52,156,20,237,146,208,183,194,78,68,98,218,206,81,26,130,70,142,167,164,177,74,104,9,134,24,177,247,165,45,99,7],[178,2,181,64,111,151,70,61,46,152,56,192,145,46,130,96,247,228,183,123,191,78,214,87,131,68,0,205,232,55,56,244],[96,218,223,229,163,94,235,62,156,71,94,177,147,31,49,248,60,144,179,5,207,79,105,8,101,152,159,249,21,75,239,236],[200,149,183,50,251,120,179,80,83,125,217,92,156,57,126,105,196,155,136,9,82,238,253,120,125,152,157,26,55,240,10,209],[213,60,162,121,140,179,191,104,148,17,134,176,23,172,58,239,127,181,60,106,235,225,245,65,64,48,116,245,250,142,110,84],[124,175,128,160,152,88,116,170,46,59,243,196,34,56,96,71,59,42,176,116,169,160,168,81,27,145,198,179,0,177,212,249],[45,40,9,136,76,46,38,186,210,222,191,38,184,113,207,253,192,18,204,11,196,84,72,17,25,65,165,121,126,97,245,202],[1,62,139,205,177,178,163,135,64,192,40,229,120,15,8,11,207,190,151,108,103,95,249,110,35,227,119,26,208,1,194,41],[48,128,176,243,110,146,138,221,60,243,224,48,50,70,177,64,34,182,131,190,9,181,137,2,214,44,229,251,49,130,106,98],[133,4,191,52,48,137,28,74,243,30,68,172,51,180,210,35,31,46,77,77,213,231,203,90,30,166,99,158,156,149,27,201]],{from: accounts[0]});
  });
  it('Should execute modifyAttributeByIndex(address,uint,uint) WHEN msg.sender==_owner', async () => {
    let result = await contractMembershipVerificationToken.modifyAttributeByIndex(accounts[8], 2014223716, 96,{from: accounts[0]});
  });
  it('Should fail modifyAttributeByIndex(address,uint,uint) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.modifyAttributeByIndex(accounts[8], 2014223716, 96,{from: accounts[9]}),'revert');
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
    let result = await contractMembershipVerificationToken.getAttributes(accounts[4],{from: accounts[0]});
  });
  it('Should fail getAttributes(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.getAttributes("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute getAttributeExhaustiveCollection(uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeExhaustiveCollection(26,{from: accounts[0]});
  });
  it('Should execute getAttributeByIndex(address,uint)', async () => {
    let result = await contractMembershipVerificationToken.getAttributeByIndex(accounts[8], 2014223715,{from: accounts[0]});
  });
  it('Should execute isCurrentMember(address) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMembershipVerificationToken.isCurrentMember(accounts[7],{from: accounts[0]});
  });
  it('Should fail isCurrentMember(address) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMembershipVerificationToken.isCurrentMember("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
