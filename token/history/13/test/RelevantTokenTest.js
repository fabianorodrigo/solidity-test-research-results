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
    let result = await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3", 129, "UsesExample", "IsLibrary", accounts[5], 2, 100, 999999, 99, 78, 2, 32,{from: accounts[0]});
  });
  it('Should execute releaseTokens() WHEN lastRound>=targetRound,lastRound<currentRound', async () => {
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",79,"UsesExample","PayableExample",accounts[4],1337,66,93,84,70,107,128,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound<targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("\x19Ethereum Signed Message:\n32",100,"PayableExample","RevertWithReason",accounts[9],127,86,34,48,10,122,67,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("0.3",102,"UsesExample","gqewvd",accounts[4],3,100000,119,61,26,103,1000001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute releaseTokens() WHEN currentRound>=targetRound,lastRound<targetRound,lastRound<currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("sdk3tj",43,"\x19Ethereum Signed Message:\n32","IsLibrary",accounts[1],81,64,1000001,51,96,100000,72,{from:accounts[0]});
    let result = await contractRelevantToken.releaseTokens({from: accounts[0]});
  });
  it('Should fail releaseTokens() when NOT comply with: lastRound < currentRound', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("tjfqm",106,"IsLibrary","UsesExample",accounts[2],65,103,68,115,96,66,2014223716,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.releaseTokens({from: accounts[0]}),'revert');
  });
  it('Should execute partialSum(uint256)', async () => {
    let result = await contractRelevantToken.partialSum(97,{from: accounts[0]});
  });
  it('Should execute allocateRewards(uint256) WHEN msg.sender==_owner,_rewards<=rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("gqewvd",68,"sdk3tj","tjfqm",accounts[0],31,34,11,122,81,74,2,{from:accounts[0]});
    let result = await contractRelevantToken.allocateRewards(0,{from: accounts[0]});
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("gqewvd",68,"sdk3tj","tjfqm",accounts[0],31,34,11,122,81,74,2,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateRewards(uint256) when NOT comply with: _rewards <= rewardFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("gqewvd",68,"sdk3tj","tjfqm",accounts[0],31,34,11,122,81,74,2,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateRewards(1,{from: accounts[0]}),'revert');
  });
  it('Should execute allocateAirdrops(uint256) WHEN msg.sender==_owner,_rewards<=airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("g390np",86,"RevertWithReason","RevertWithReason",accounts[7],31,128,109,32735,62,26,2,{from:accounts[0]});
    let result = await contractRelevantToken.allocateAirdrops(0,{from: accounts[0]});
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("g390np",86,"RevertWithReason","RevertWithReason",accounts[7],31,128,109,32735,62,26,2,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(0,{from: accounts[9]}),'revert');
  });
  it('Should fail allocateAirdrops(uint256) when NOT comply with: _rewards <= airdropFund', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("g390np",86,"RevertWithReason","RevertWithReason",accounts[7],31,128,109,32735,62,26,2,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.allocateAirdrops(1,{from: accounts[0]}),'revert');
  });
  it('Should execute claimTokens(uint256,bytes) WHEN allocatedRewards>=_amount,_owner==recOwner', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("tjfqm",121,"Example","UsesExample",accounts[9],99999,2014223715,45,83,40,78,44,{from:accounts[0]});
    let result = await contractRelevantToken.claimTokens(0, [181,148,76,68,190,156,210,59,44,139,70,49,226,128,45,25,247,209,254,71,38,76,111,111,230,200,18,147,182,133,123,119],{from: accounts[0]});
  });
  it('Should fail claimTokens(uint256,bytes) when NOT comply with: allocatedRewards >= _amount', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("tjfqm",121,"Example","UsesExample",accounts[9],99999,2014223715,45,83,40,78,44,{from:accounts[0]});
    await contractRelevantToken.allocateRewards(0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.claimTokens(0, [181,148,76,68,190,156,210,59,44,139,70,49,226,128,45,25,247,209,254,71,38,76,111,111,230,200,18,147,182,133,123,119],{from: accounts[0]}),'revert');
  });
  it('Should execute nonceOf(address)', async () => {
    let result = await contractRelevantToken.nonceOf(accounts[5],{from: accounts[0]});
  });
  it('Should execute roundNum() WHEN roundLength>0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("RevertWithReason",125,"i2n6ej","0.3",accounts[8],1337,1337,47,2,70,80,90,{from:accounts[0]});
    let result = await contractRelevantToken.roundNum({from: accounts[0]});
  });
  it('Should fail roundNum() when NOT comply with: roundLength > 0', async () => {
    await contractRelevantToken.methods["initialize(string,uint8,string,string,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"]("gqewvd",125,"\x19Ethereum Signed Message:\n32","g390np",accounts[6],101,56,70,47,0,68,29,{from:accounts[0]});
    let result = await truffleAssert.fails(contractRelevantToken.roundNum({from: accounts[0]}),'revert');
  });
  it('Should execute roundsSincleLast()', async () => {
    let result = await contractRelevantToken.roundsSincleLast({from: accounts[0]});
  });
});
