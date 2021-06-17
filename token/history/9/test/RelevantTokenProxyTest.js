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
const ProxyRelevantToken = artifacts.require("ProxyRelevantToken");

contract("contractProxyRelevantToken",(accounts)=>{
    let contractProxyRelevantToken = null;
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
      ProxyRelevantToken.link("ECDSA",contractECDSA.address);
    contractProxyRelevantToken = await ProxyRelevantToken.new({ from: accounts[0] });
});
  
  it('Should execute testpreMintTokens(uint256)', async () => {
    let result = await contractProxyRelevantToken.testpreMintTokens(126,{from: accounts[0]});
  });
  it('Should execute testnewTokensForConstantPhase(uint256,uint256)', async () => {
    let result = await contractProxyRelevantToken.testnewTokensForConstantPhase(32737, 75,{from: accounts[0]});
  });
  it('Should execute testnewTokensForDecayPhase(uint256) WHEN lastRound==0', async () => {
    let result = await contractProxyRelevantToken.testnewTokensForDecayPhase(92,{from: accounts[0]});
  });
  it('Should execute testnewTokensForDecayPhase(uint256) WHEN lastRound!=0', async () => {
    await contractProxyRelevantToken.releaseTokens({from:accounts[0]});
    let result = await contractProxyRelevantToken.testnewTokensForDecayPhase(62,{from: accounts[0]});
  });
  it('Should execute testnewTokensForDecayPhase(uint256) WHEN _roundsPassed<100000', async () => {
    let result = await contractProxyRelevantToken.testnewTokensForDecayPhase(129,{from: accounts[0]});
  });
  it('Should execute testnewTokensForDecayPhase(uint256) WHEN _roundsPassed>=100000,lastRound!=0', async () => {
    await contractProxyRelevantToken.releaseTokens({from:accounts[0]});
    let result = await contractProxyRelevantToken.testnewTokensForDecayPhase(2014223715,{from: accounts[0]});
  });
  it('Should execute testnewTokensForCrossingDecay()', async () => {
    let result = await contractProxyRelevantToken.testnewTokensForCrossingDecay({from: accounts[0]});
  });
  it('Should execute testnewTokensForCrossingConst(uint256)', async () => {
    let result = await contractProxyRelevantToken.testnewTokensForCrossingConst(116,{from: accounts[0]});
  });
  it('Should execute testsplitRewards(uint256)', async () => {
    let result = await contractProxyRelevantToken.testsplitRewards(93,{from: accounts[0]});
  });
  it('Should execute testtoDevFund()', async () => {
    let result = await contractProxyRelevantToken.testtoDevFund({from: accounts[0]});
  });
});
