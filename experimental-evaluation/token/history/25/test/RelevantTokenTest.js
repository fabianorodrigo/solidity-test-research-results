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
    let result = await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("UsesExample", 65, "UsesExample", "UsesExample", accounts[0], 36, 2, 124, 2014223716, 58, 97, 97,{from: accounts[0]});
  });
  it('Should execute releaseTokens() WHEN lastRound>=targetRound,lastRound<currentRound', async () => {
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",62,"0.3","\x19Ethereum Signed Message:\n32",accounts[1],1532892063,50,49,66,116,3,73,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound<targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("UsesExample",110,"PayableExample","UsesExample",accounts[4],32737,99999,78,9999,256,105,116,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",121,"RevertWithReason","IsLibrary",accounts[0],32736,32737,32737,97,113,32737,1000001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound>=targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",78,"0.3","0.3",accounts[1],2,54,97,39,61,78,61,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",40,"PayableExample","UsesExample",accounts[4],111,120,982080,79,982080,982080,6,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute partialSum(uint256)', async () => {
    let result = await contractRelevantToken.partialSum(106,{from: accounts[0]});
  });
  it('Should execute allocateRewards(uint256) WHEN msg.sender==_owner,_rewards<=rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",62,"IsLibrary","PayableExample",accounts[2],74,1532892064,120,73,35,124,82,{from:accounts[0]});
    let result = await contractRelevantToken.allocateRewards(0,{from: accounts[0]});
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",62,"IsLibrary","PayableExample",accounts[2],74,1532892064,120,73,35,124,82,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: _rewards <= rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",62,"IsLibrary","PayableExample",accounts[2],74,1532892064,120,73,35,124,82,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(1,{from: accounts[0]}),'revert');
  });
  it('Should execute allocateAirdrops(uint256) WHEN msg.sender==_owner,_rewards<=airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",46,"IsLibrary","UsesExample",accounts[1],100,1,10001,116,6,64,44,{from:accounts[0]});
    let result = await contractRelevantToken.allocateAirdrops(0,{from: accounts[0]});
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",46,"IsLibrary","UsesExample",accounts[1],100,1,10001,116,6,64,44,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: _rewards <= airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",46,"IsLibrary","UsesExample",accounts[1],100,1,10001,116,6,64,44,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(1,{from: accounts[0]}),'revert');
  });
  it('Should execute claimTokens(uint256,bytes) WHEN allocatedRewards>=_amount,_owner==recOwner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",104,"IsLibrary","kt9n7",accounts[1],75,113,66,81,88,982079,117,{from:accounts[0]});
    let result = await contractRelevantToken.claimTokens(0, [227,144,94,62,237,210,221,45,140,59,195,211,31,1,240,237,95,153,164,136,23,112,132,136,155,54,131,51,239,23,164,157],{from: accounts[0]});
  });
  it('Should fail claimTokens(uint256,bytes) when NOT comply with: allocatedRewards >= _amount', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",104,"IsLibrary","kt9n7",accounts[1],75,113,66,81,88,982079,117,{from:accounts[0]});
    await contractRelevantToken.allocateRewards(0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.claimTokens(0, [227,144,94,62,237,210,221,45,140,59,195,211,31,1,240,237,95,153,164,136,23,112,132,136,155,54,131,51,239,23,164,157],{from: accounts[0]}),'revert');
  });
  it('Should execute nonceOf(address)', async () => {
    let result = await contractRelevantToken.nonceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute roundNum() WHEN roundLength>0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",48,"\x19Ethereum Signed Message:\n32","PayableExample",accounts[1],118,97,40,83,32735,99,1000000,{from:accounts[0]});
    let result = await contractRelevantToken.roundNum({from: accounts[0]});
  });
  it('Should fail roundNum() when NOT comply with: roundLength > 0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",4,"87cnzn","n62oo",accounts[5],39,9999,32735,76,0,29,81,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.roundNum({from: accounts[0]}),'revert');
  });
  it('Should execute roundsSincleLast()', async () => {
    let result = await contractRelevantToken.roundsSincleLast({from: accounts[0]});
  });
});
