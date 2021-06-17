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
    let result = await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary", 119, "\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32", accounts[7], 88, 129, 117, 4, 110, 32735, 113,{from: accounts[0]});
  });
  it('Should execute releaseTokens() WHEN lastRound>=targetRound,lastRound<currentRound', async () => {
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("IsLibrary",105,"dik81","sli8ir",accounts[0],0,52,113,80,1,32,28,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound<targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("Example",48,"y6bf29","\x19Ethereum Signed Message:\n32",accounts[5],52,68,999999,63,255,86,1532892062,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("y6bf29",46,"y6bf29","\x19Ethereum Signed Message:\n32",accounts[6],10001,31,70,257,109,2,67,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound>=targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("sli8ir",27,"UsesExample","\x19Ethereum Signed Message:\n32",accounts[1],1532892063,257,109,122,105,6,72,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",114,"ju20h","PayableExample",accounts[2],10000,124,39,124,1532892064,77,110,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute partialSum(uint256)', async () => {
    let result = await contractRelevantToken.partialSum(4,{from: accounts[0]});
  });
  it('Should execute allocateRewards(uint256) WHEN msg.sender==_owner,_rewards<=rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("sli8ir",107,"\x19Ethereum Signed Message:\n32","sli8ir",accounts[8],256,69,123,3,86,2014223715,93,{from:accounts[0]});
    let result = await contractRelevantToken.allocateRewards(0,{from: accounts[0]});
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("sli8ir",107,"\x19Ethereum Signed Message:\n32","sli8ir",accounts[8],256,69,123,3,86,2014223715,93,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: _rewards <= rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("sli8ir",107,"\x19Ethereum Signed Message:\n32","sli8ir",accounts[8],256,69,123,3,86,2014223715,93,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(1,{from: accounts[0]}),'revert');
  });
  it('Should execute allocateAirdrops(uint256) WHEN msg.sender==_owner,_rewards<=airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",254,"UsesExample","RevertWithReason",accounts[9],112,94,49,9,100,79,65,{from:accounts[0]});
    let result = await contractRelevantToken.allocateAirdrops(0,{from: accounts[0]});
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",254,"UsesExample","RevertWithReason",accounts[9],112,94,49,9,100,79,65,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: _rewards <= airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",254,"UsesExample","RevertWithReason",accounts[9],112,94,49,9,100,79,65,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(1,{from: accounts[0]}),'revert');
  });
  it('Should execute claimTokens(uint256,bytes) WHEN allocatedRewards>=_amount,_owner==recOwner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("ju20h",27,"UsesExample","1pl06",accounts[5],1532892064,100001,79,128,129,4,71,{from:accounts[0]});
    let result = await contractRelevantToken.claimTokens(0, [197,82,142,55,61,239,239,160,116,253,204,121,92,110,154,173,210,20,162,247,213,225,120,80,226,180,64,130,76,203,214,159],{from: accounts[0]});
  });
  it('Should fail claimTokens(uint256,bytes) when NOT comply with: allocatedRewards >= _amount', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("ju20h",27,"UsesExample","1pl06",accounts[5],1532892064,100001,79,128,129,4,71,{from:accounts[0]});
    await contractRelevantToken.allocateRewards(0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.claimTokens(0, [197,82,142,55,61,239,239,160,116,253,204,121,92,110,154,173,210,20,162,247,213,225,120,80,226,180,64,130,76,203,214,159],{from: accounts[0]}),'revert');
  });
  it('Should execute nonceOf(address)', async () => {
    let result = await contractRelevantToken.nonceOf(accounts[0],{from: accounts[0]});
  });
  it('Should execute roundNum() WHEN roundLength>0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("PayableExample",49,"0.3","1pl06",accounts[8],35,95,92,87,83,50,93,{from:accounts[0]});
    let result = await contractRelevantToken.roundNum({from: accounts[0]});
  });
  it('Should fail roundNum() when NOT comply with: roundLength > 0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("y6bf29",53,"0.3","dik81",accounts[6],113,87,2,2014223715,0,10001,10001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.roundNum({from: accounts[0]}),'revert');
  });
  it('Should execute roundsSincleLast()', async () => {
    let result = await contractRelevantToken.roundsSincleLast({from: accounts[0]});
  });
});
