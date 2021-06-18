const truffleAssert = require('truffle-assertions');
const MathUtils = artifacts.require("MathUtils");
const RelevantTokenMock = artifacts.require("RelevantTokenMock");
const Power = artifacts.require("Power");
const RelevantToken = artifacts.require("RelevantToken");
const Roles = artifacts.require("openzeppelin-eth/contracts/access/Roles.sol");
const MinterRole = artifacts.require("openzeppelin-eth/contracts/access/roles/MinterRole.sol");
const ECDSA = artifacts.require("openzeppelin-eth/contracts/cryptography/ECDSA.sol");
const SafeMath = artifacts.require("openzeppelin-eth/contracts/math/SafeMath.sol");
const Ownable = artifacts.require("openzeppelin-eth/contracts/ownership/Ownable.sol");
const ERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20.sol");
const ERC20Mintable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol");
const Initializable = artifacts.require("zos-lib/contracts/Initializable.sol");
const ProxyMathUtils = artifacts.require("ProxyMathUtils");

contract("RelevantToken",(accounts)=>{
  let trace = false;
  let contractECDSA = null;
  let contractRoles = null;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractInitializable = null;
  let contractMinterRole = null;
  let contractOwnable = null;
  let contractERC20Mintable = null;
  let contractMathUtils = null;
  let contractRelevantTokenMock = null;
  let contractRelevantToken = null;
  let contractPower = null;
  beforeEach(async () => {
    contractECDSA = await ECDSA.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ECDSA.new({from: accounts[0]}');
    contractRoles = await Roles.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Roles.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractInitializable = await Initializable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Initializable.new({from: accounts[0]}');
    MinterRole.link("Roles",contractRoles.address);
    contractMinterRole = await MinterRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MinterRole.new({from: accounts[0]}');
    contractOwnable = await Ownable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from: accounts[0]}');
    contractERC20Mintable = await ERC20Mintable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mintable.new({from: accounts[0]}');
    contractMathUtils = await MathUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MathUtils.new({from: accounts[0]}');
    contractRelevantTokenMock = await RelevantTokenMock.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RelevantTokenMock.new({from: accounts[0]}');
    RelevantToken.link("ECDSA",contractECDSA.address);
    contractRelevantToken = await RelevantToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RelevantToken.new({from: accounts[0]}');
    contractPower = await Power.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Power.new({from:accounts[0]}');
  });
  
  it('Should execute initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256) WHEN initialized!=true', async () => {
    let result = await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("qevs5d", 39, "IsLibrary", "PayableExample", accounts[2], 2, 40, 64, 75, 103, 32, 45,{from: accounts[0]});
  });
  it('Should execute releaseTokens() WHEN lastRound>=targetRound,lastRound<currentRound', async () => {
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0ry7jv",43,"0ry7jv","0.3",accounts[3],63,1532892062,65,5,41,11,79,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound<targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0ry7jv",72,"fn5jo8","\x19Ethereum Signed Message:\n32",accounts[5],65,97,254,72,33,56,124,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",1,"PayableExample","RevertWithReason",accounts[5],127,76,97,84,28,76,107,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound>=targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("fn5jo8",33,"PayableExample","\x19Ethereum Signed Message:\n32",accounts[1],82,107,32735,29,254,115,11,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",6,"Example","\x19Ethereum Signed Message:\n32",accounts[2],93,44,79,74,103,96,76,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute partialSum(uint256)', async () => {
    let result = await contractRelevantToken.partialSum(58,{from: accounts[0]});
  });
  it('Should execute allocateRewards(uint256) WHEN msg.sender==_owner,_rewards<=rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0ry7jv",112,"0.3","0ry7jv",accounts[4],35,116,123,100000,100,112,109,{from:accounts[0]});
    let result = await contractRelevantToken.allocateRewards(0,{from: accounts[0]});
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0ry7jv",112,"0.3","0ry7jv",accounts[4],35,116,123,100000,100,112,109,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: _rewards <= rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0ry7jv",112,"0.3","0ry7jv",accounts[4],35,116,123,100000,100,112,109,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(1,{from: accounts[0]}),'revert');
  });
  it('Should execute allocateAirdrops(uint256) WHEN msg.sender==_owner,_rewards<=airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",44,"0.3","0ry7jv",accounts[3],92,1532892064,1532892064,103,107,82,100001,{from:accounts[0]});
    let result = await contractRelevantToken.allocateAirdrops(0,{from: accounts[0]});
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",44,"0.3","0ry7jv",accounts[3],92,1532892064,1532892064,103,107,82,100001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: _rewards <= airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",44,"0.3","0ry7jv",accounts[3],92,1532892064,1532892064,103,107,82,100001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(1,{from: accounts[0]}),'revert');
  });
  it('Should execute claimTokens(uint256,bytes) WHEN allocatedRewards>=_amount,_owner==recOwner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",79,"Example","\x19Ethereum Signed Message:\n32",accounts[9],256,84,31,126,79,6,999999,{from:accounts[0]});
    let result = await contractRelevantToken.claimTokens(0, [234,50,245,189,56,157,93,113,242,108,201,177,74,122,54,27,33,10,141,131,183,128,88,211,17,254,136,226,160,142,255,41],{from: accounts[0]});
  });
  it('Should fail claimTokens(uint256,bytes) when NOT comply with: allocatedRewards >= _amount', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",79,"Example","\x19Ethereum Signed Message:\n32",accounts[9],256,84,31,126,79,6,999999,{from:accounts[0]});
    await contractRelevantToken.allocateRewards(0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.claimTokens(0, [234,50,245,189,56,157,93,113,242,108,201,177,74,122,54,27,33,10,141,131,183,128,88,211,17,254,136,226,160,142,255,41],{from: accounts[0]}),'revert');
  });
  it('Should execute nonceOf(address)', async () => {
    let result = await contractRelevantToken.nonceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute roundNum() WHEN roundLength>0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("PayableExample",55,"RevertWithReason","0ry7jv",accounts[5],982080,80,59,36,99,79,71,{from:accounts[0]});
    let result = await contractRelevantToken.roundNum({from: accounts[0]});
  });
  it('Should fail roundNum() when NOT comply with: roundLength > 0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",85,"ghemk","ijy2b",accounts[3],36,36,56,35,0,255,52,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.roundNum({from: accounts[0]}),'revert');
  });
  it('Should execute roundsSincleLast()', async () => {
    let result = await contractRelevantToken.roundsSincleLast({from: accounts[0]});
  });
});
