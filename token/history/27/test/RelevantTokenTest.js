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
    let result = await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason", 83, "UsesExample", "Example", accounts[5], 99, 108, 111, 67, 50, 52, 60,{from: accounts[0]});
  });
  it('Should execute releaseTokens() WHEN lastRound>=targetRound,lastRound<currentRound', async () => {
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",102,"q8ahy","kkvmdq",accounts[8],108,128,107,53,83,45,32,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound<targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",116,"kkvmdq","3dekp",accounts[9],116,72,47,108,129,57,82,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("UsesExample",96,"PayableExample","Example",accounts[0],125,46,10001,45,102,93,81,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound>=targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",98,"q8ahy","Example",accounts[5],32735,107,121,32,124,55,36,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("pzibf",113,"RevertWithReason","IsLibrary",accounts[5],54,1337,64,76,53,109,46,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute partialSum(uint256)', async () => {
    let result = await contractRelevantToken.partialSum(114,{from: accounts[0]});
  });
  it('Should execute allocateRewards(uint256) WHEN msg.sender==_owner,_rewards<=rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",93,"IsLibrary","Example",accounts[8],77,11,49,2,52,10,26,{from:accounts[0]});
    let result = await contractRelevantToken.allocateRewards(0,{from: accounts[0]});
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",93,"IsLibrary","Example",accounts[8],77,11,49,2,52,10,26,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: _rewards <= rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",93,"IsLibrary","Example",accounts[8],77,11,49,2,52,10,26,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(1,{from: accounts[0]}),'revert');
  });
  it('Should execute allocateAirdrops(uint256) WHEN msg.sender==_owner,_rewards<=airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",75,"IsLibrary","RevertWithReason",accounts[5],45,42,74,79,2014223716,2,85,{from:accounts[0]});
    let result = await contractRelevantToken.allocateAirdrops(0,{from: accounts[0]});
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",75,"IsLibrary","RevertWithReason",accounts[5],45,42,74,79,2014223716,2,85,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: _rewards <= airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",75,"IsLibrary","RevertWithReason",accounts[5],45,42,74,79,2014223716,2,85,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(1,{from: accounts[0]}),'revert');
  });
  it('Should execute claimTokens(uint256,bytes) WHEN allocatedRewards>=_amount,_owner==recOwner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",72,"UsesExample","\x19Ethereum Signed Message:\n32",accounts[4],105,87,87,9,81,69,1,{from:accounts[0]});
    let result = await contractRelevantToken.claimTokens(0, [86,74,124,132,223,200,17,77,8,107,33,82,20,60,154,77,217,157,210,193,132,255,110,1,68,72,115,109,21,115,132,73],{from: accounts[0]});
  });
  it('Should fail claimTokens(uint256,bytes) when NOT comply with: allocatedRewards >= _amount', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",72,"UsesExample","\x19Ethereum Signed Message:\n32",accounts[4],105,87,87,9,81,69,1,{from:accounts[0]});
    await contractRelevantToken.allocateRewards(0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.claimTokens(0, [86,74,124,132,223,200,17,77,8,107,33,82,20,60,154,77,217,157,210,193,132,255,110,1,68,72,115,109,21,115,132,73],{from: accounts[0]}),'revert');
  });
  it('Should execute nonceOf(address)', async () => {
    let result = await contractRelevantToken.nonceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute roundNum() WHEN roundLength>0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("kkvmdq",79,"Example","IsLibrary",accounts[3],82,33,32737,87,122,32735,5,{from:accounts[0]});
    let result = await contractRelevantToken.roundNum({from: accounts[0]});
  });
  it('Should fail roundNum() when NOT comply with: roundLength > 0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",58,"IsLibrary","PayableExample",accounts[6],95,32736,120,51,0,84,982081,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.roundNum({from: accounts[0]}),'revert');
  });
  it('Should execute roundsSincleLast()', async () => {
    let result = await contractRelevantToken.roundsSincleLast({from: accounts[0]});
  });
});
