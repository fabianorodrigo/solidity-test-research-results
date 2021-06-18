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
const ProxyEndOfMonthConvention = artifacts.require("ProxyEndOfMonthConvention");
const ProxyContractDefaultConvention = artifacts.require("ProxyContractDefaultConvention");
const ProxyBusinessDayConvention = artifacts.require("ProxyBusinessDayConvention");

contract("contractProxyBusinessDayConvention",(accounts)=>{
    let contractProxyBusinessDayConvention = null;
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
      ProxyBusinessDayConvention.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractProxyBusinessDayConvention = await ProxyBusinessDayConvention.new({ from: accounts[0] });
});
  
  it('Should execute testshiftCalcTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftCalcTime(400, 3, 1,{from: accounts[0]});
  });
  it('Should execute testshiftCalcTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSMF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftCalcTime(4801, 4, 0,{from: accounts[0]});
  });
  it('Should execute testshiftCalcTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftCalcTime(2, 7, 1,{from: accounts[0]});
  });
  it('Should execute testshiftCalcTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSMP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftCalcTime(141, 8, 0,{from: accounts[0]});
  });
  it('Should execute testshiftCalcTime(uint256,BusinessDayConvention,Calendar) WHEN convention!=Definitions.BusinessDayConvention.CSF,convention!=Definitions.BusinessDayConvention.CSMF,convention!=Definitions.BusinessDayConvention.CSP,convention!=Definitions.BusinessDayConvention.CSMP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftCalcTime(161, 5, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.SCF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(368, 1, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(4901, 3, 1,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.SCMF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(1462, 2, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSMF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(69, 4, 1,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.SCP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(5, 5, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(360, 7, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.SCMP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(2440587, 6, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention==Definitions.BusinessDayConvention.CSMP', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(12, 8, 0,{from: accounts[0]});
  });
  it('Should execute testshiftEventTime(uint256,BusinessDayConvention,Calendar) WHEN convention!=Definitions.BusinessDayConvention.SCMP,convention!=Definitions.BusinessDayConvention.CSMP,convention!=Definitions.BusinessDayConvention.SCP,convention!=Definitions.BusinessDayConvention.CSP,convention!=Definitions.BusinessDayConvention.SCMF,convention!=Definitions.BusinessDayConvention.CSMF,convention!=Definitions.BusinessDayConvention.SCF,convention!=Definitions.BusinessDayConvention.CSF', async () => {
    let result = await contractProxyBusinessDayConvention.testshiftEventTime(19, 0, 0,{from: accounts[0]});
  });
  it('Should execute testgetClosestBusinessDaySameDayOrFollowing(uint256,Calendar) WHEN calendar==Definitions.Calendar.MondayToFriday', async () => {
    let result = await contractProxyBusinessDayConvention.testgetClosestBusinessDaySameDayOrFollowing(68569, 1,{from: accounts[0]});
  });
  it('Should execute testgetClosestBusinessDaySameDayOrFollowing(uint256,Calendar) WHEN calendar!=Definitions.Calendar.MondayToFriday', async () => {
    let result = await contractProxyBusinessDayConvention.testgetClosestBusinessDaySameDayOrFollowing(951, 0,{from: accounts[0]});
  });
  it('Should execute testgetClosestBusinessDaySameDayOrPreceeding(uint256,Calendar) WHEN calendar==Definitions.Calendar.MondayToFriday', async () => {
    let result = await contractProxyBusinessDayConvention.testgetClosestBusinessDaySameDayOrPreceeding(2440588, 1,{from: accounts[0]});
  });
  it('Should execute testgetClosestBusinessDaySameDayOrPreceeding(uint256,Calendar) WHEN calendar!=Definitions.Calendar.MondayToFriday', async () => {
    let result = await contractProxyBusinessDayConvention.testgetClosestBusinessDaySameDayOrPreceeding(110, 0,{from: accounts[0]});
  });
});
