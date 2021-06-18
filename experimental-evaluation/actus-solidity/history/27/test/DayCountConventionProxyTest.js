const truffleAssert = require('truffle-assertions');
const BusinessDayConvention = artifacts.require("BusinessDayConvention");
const ContractDefaultConvention = artifacts.require("ContractDefaultConvention");
const ContractRoleConvention = artifacts.require("ContractRoleConvention");
const DayCountConvention = artifacts.require("DayCountConvention");
const EndOfMonthConvention = artifacts.require("EndOfMonthConvention");
const Core = artifacts.require("Core");
const FloatMath = artifacts.require("FloatMath");
const Schedule = artifacts.require("Schedule");
const Utils = artifacts.require("Utils");
const PAMEngine = artifacts.require("PAMEngine");
const BokkyPooBahsDateTimeLibrary = artifacts.require("BokkyPooBahsDateTimeLibrary");
const SignedSafeMath = artifacts.require("openzeppelin-solidity/contracts/drafts/SignedSafeMath.sol");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ProxyBokkyPooBahsDateTimeLibrary = artifacts.require("ProxyBokkyPooBahsDateTimeLibrary");
const ProxyFloatMath = artifacts.require("ProxyFloatMath");
const ProxyContractRoleConvention = artifacts.require("ProxyContractRoleConvention");
const ProxyDayCountConvention = artifacts.require("ProxyDayCountConvention");

contract("contractProxyDayCountConvention",(accounts)=>{
    let contractProxyDayCountConvention = null;
  let trace = false;
  let contractSafeMath = null;
  let contractSignedSafeMath = null;
  let contractFloatMath = null;
  let contractBokkyPooBahsDateTimeLibrary = null;
  let contractEndOfMonthConvention = null;
  let contractCore = null;
  let contractContractDefaultConvention = null;
  let contractSchedule = null;
  let contractUtils = null;
  let contractPAMEngine = null;
  let contractDayCountConvention = null;
  let contractContractRoleConvention = null;
  let contractBusinessDayConvention = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractSignedSafeMath = await SignedSafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SignedSafeMath.new({from: accounts[0]}');
    contractFloatMath = await FloatMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: FloatMath.new({from: accounts[0]}');
    contractBokkyPooBahsDateTimeLibrary = await BokkyPooBahsDateTimeLibrary.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BokkyPooBahsDateTimeLibrary.new({from: accounts[0]}');
    EndOfMonthConvention.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractEndOfMonthConvention = await EndOfMonthConvention.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EndOfMonthConvention.new({from: accounts[0]}');
    contractCore = await Core.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Core.new({from: accounts[0]}');
    contractContractDefaultConvention = await ContractDefaultConvention.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ContractDefaultConvention.new({from: accounts[0]}');
    Schedule.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractSchedule = await Schedule.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Schedule.new({from: accounts[0]}');
    Utils.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractUtils = await Utils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Utils.new({from: accounts[0]}');
    PAMEngine.link("SafeMath",contractSafeMath.address);
     PAMEngine.link("SignedSafeMath",contractSignedSafeMath.address);
     PAMEngine.link("FloatMath",contractFloatMath.address);
    contractPAMEngine = await PAMEngine.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: PAMEngine.new({from: accounts[0]}');
    DayCountConvention.link("SafeMath",contractSafeMath.address);
     DayCountConvention.link("SignedSafeMath",contractSignedSafeMath.address);
     DayCountConvention.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
     DayCountConvention.link("FloatMath",contractFloatMath.address);
    contractDayCountConvention = await DayCountConvention.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: DayCountConvention.new({from: accounts[0]}');
    contractContractRoleConvention = await ContractRoleConvention.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ContractRoleConvention.new({from: accounts[0]}');
    BusinessDayConvention.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractBusinessDayConvention = await BusinessDayConvention.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BusinessDayConvention.new({from: accounts[0]}');
      ProxyDayCountConvention.link("SafeMath",contractSafeMath.address);
    ProxyDayCountConvention.link("SignedSafeMath",contractSignedSafeMath.address);
    ProxyDayCountConvention.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    ProxyDayCountConvention.link("FloatMath",contractFloatMath.address);
    contractProxyDayCountConvention = await ProxyDayCountConvention.new({ from: accounts[0] });
});
  
  it('Should execute testyearFraction(uint256,uint256,DayCountConvention) WHEN ipdc==Definitions.DayCountConvention.A_AISDA,endTimestamp>=startTimestamp', async () => {
    let result = await contractProxyDayCountConvention.testyearFraction(39, 159, 0,{from: accounts[0]});
  });
  it('Should fail testyearFraction(uint256,uint256,DayCountConvention) when NOT comply with: endTimestamp >= startTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyDayCountConvention.testyearFraction(39, 38, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testyearFraction(uint256,uint256,DayCountConvention) WHEN ipdc==Definitions.DayCountConvention.A_360,endTimestamp>=startTimestamp', async () => {
    let result = await contractProxyDayCountConvention.testyearFraction(19, 79, 1,{from: accounts[0]});
  });
  it('Should fail testyearFraction(uint256,uint256,DayCountConvention) when NOT comply with: endTimestamp >= startTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyDayCountConvention.testyearFraction(19, 18, 1,{from: accounts[0]}),'revert');
  });
  it('Should execute testyearFraction(uint256,uint256,DayCountConvention) WHEN ipdc==Definitions.DayCountConvention.A_365,endTimestamp>=startTimestamp', async () => {
    let result = await contractProxyDayCountConvention.testyearFraction(68569, 86400, 2,{from: accounts[0]});
  });
  it('Should fail testyearFraction(uint256,uint256,DayCountConvention) when NOT comply with: endTimestamp >= startTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyDayCountConvention.testyearFraction(68569, 68568, 2,{from: accounts[0]}),'revert');
  });
  it('Should execute testyearFraction(uint256,uint256,DayCountConvention) WHEN ipdc==Definitions.DayCountConvention._30E_360,endTimestamp>=startTimestamp', async () => {
    let result = await contractProxyDayCountConvention.testyearFraction(2440589, 1532892062, 4,{from: accounts[0]});
  });
  it('Should fail testyearFraction(uint256,uint256,DayCountConvention) when NOT comply with: endTimestamp >= startTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyDayCountConvention.testyearFraction(2440589, 2440588, 4,{from: accounts[0]}),'revert');
  });
  it('Should execute testyearFraction(uint256,uint256,DayCountConvention) WHEN ipdc!=Definitions.DayCountConvention._30E_360,ipdc!=Definitions.DayCountConvention.A_365,ipdc!=Definitions.DayCountConvention.A_360,ipdc!=Definitions.DayCountConvention.A_AISDA,endTimestamp>=startTimestamp', async () => {
    let result = await contractProxyDayCountConvention.testyearFraction(71, 1532892062, 5,{from: accounts[0]});
  });
  it('Should fail testyearFraction(uint256,uint256,DayCountConvention) when NOT comply with: endTimestamp >= startTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyDayCountConvention.testyearFraction(71, 70, 5,{from: accounts[0]}),'revert');
  });
  it('Should execute testactualActualISDA(uint256,uint256)', async () => {
    let result = await contractProxyDayCountConvention.testactualActualISDA(50, 64,{from: accounts[0]});
  });
  it('Should execute testactualThreeSixty(uint256,uint256)', async () => {
    let result = await contractProxyDayCountConvention.testactualThreeSixty(86401, 71,{from: accounts[0]});
  });
  it('Should execute testactualThreeSixtyFive(uint256,uint256)', async () => {
    let result = await contractProxyDayCountConvention.testactualThreeSixtyFive(2446, 28,{from: accounts[0]});
  });
  it('Should execute testthirtyEThreeSixty(uint256,uint256)', async () => {
    let result = await contractProxyDayCountConvention.testthirtyEThreeSixty(1, 96,{from: accounts[0]});
  });
});
