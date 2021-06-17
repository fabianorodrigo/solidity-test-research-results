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

contract("contractProxyBokkyPooBahsDateTimeLibrary",(accounts)=>{
    let contractProxyBokkyPooBahsDateTimeLibrary = null;
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
      ProxyBokkyPooBahsDateTimeLibrary.link('BokkyPooBahsDateTimeLibrary', contractBokkyPooBahsDateTimeLibrary.address);
    contractProxyBokkyPooBahsDateTimeLibrary = await ProxyBokkyPooBahsDateTimeLibrary.new({ from: accounts[0] });
});
  
  it('Should execute test_daysFromDate(uint,uint,uint) WHEN year>=1970', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(10000, 149, 1970,{from: accounts[0]});
  });
  it('Should fail test_daysFromDate(uint,uint,uint) when NOT comply with: year >= 1970', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(1969, 149, 1970,{from: accounts[0]}),'revert');
  });
  it('Should execute test_daysToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysToDate(120,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDate(uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDate(255, 25, 150,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDateTime(uint,uint,uint,uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDateTime(1461, 949, 109, 68569, 949, 1461,{from: accounts[0]});
  });
  it('Should execute testtimestampToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDate(81,{from: accounts[0]});
  });
  it('Should execute testtimestampToDateTime(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDateTime(2014223716,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day>0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(10000, 5, 51,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day<=0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(2440589, 9, 0,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN year<1970', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(101, 9, 139,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN hour<24,minute<60,second<60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(10, 10000, 4000, 9, 5, 10,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN hour>=24,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(100, 1532892063, 41, 120, 25, 69,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(1461000, 950, 120, 1337, 129, 68569,{from: accounts[0]});
  });
  it('Should execute testisLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisLeapYear(1460,{from: accounts[0]});
  });
  it('Should execute test_isLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_isLeapYear(95,{from: accounts[0]});
  });
  it('Should execute testisWeekDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekDay(13,{from: accounts[0]});
  });
  it('Should execute testisWeekEnd(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekEnd(32,{from: accounts[0]});
  });
  it('Should execute testgetDaysInMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDaysInMonth(9,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==1', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(4899, 1,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==3', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(1461000, 3,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==5', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(149, 5,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==7', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(96, 7,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==8', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(1969, 8,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==10', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(149, 10,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(71, 12,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month!=2', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(1336, 161,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==2,month!=1,month!=3,month!=5,month!=7,month!=8,month!=10,month!=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(32, 2,{from: accounts[0]});
  });
  it('Should execute testgetDayOfWeek(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDayOfWeek(150,{from: accounts[0]});
  });
  it('Should execute testgetYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetYear(14,{from: accounts[0]});
  });
  it('Should execute testgetMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMonth(146098,{from: accounts[0]});
  });
  it('Should execute testgetDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDay(7,{from: accounts[0]});
  });
  it('Should execute testgetHour(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetHour(949,{from: accounts[0]});
  });
  it('Should execute testgetMinute(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMinute(4900,{from: accounts[0]});
  });
  it('Should execute testgetSecond(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetSecond(79,{from: accounts[0]});
  });
  it('Should execute testaddYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddYears(359, 399,{from: accounts[0]});
  });
  it('Should execute testaddMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMonths(19, 2440589,{from: accounts[0]});
  });
  it('Should execute testaddDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddDays(121, 4000,{from: accounts[0]});
  });
  it('Should execute testaddHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddHours(101, 26,{from: accounts[0]});
  });
  it('Should execute testaddMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMinutes(24, 1338,{from: accounts[0]});
  });
  it('Should execute testaddSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddSeconds(130, 2,{from: accounts[0]});
  });
  it('Should execute testsubYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubYears(14, 1,{from: accounts[0]});
  });
  it('Should execute testsubMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMonths(1532892062, 4899,{from: accounts[0]});
  });
  it('Should execute testsubDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubDays(49, 2447,{from: accounts[0]});
  });
  it('Should execute testsubHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubHours(86400, 26,{from: accounts[0]});
  });
  it('Should execute testsubMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMinutes(27, 71,{from: accounts[0]});
  });
  it('Should execute testsubSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubSeconds(60, 1460,{from: accounts[0]});
  });
  it('Should execute testdiffYears(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(400, 1461000,{from: accounts[0]});
  });
  it('Should fail testdiffYears(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(1461001, 1461000,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMonths(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(96, 255,{from: accounts[0]});
  });
  it('Should fail testdiffMonths(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(256, 255,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffDays(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(951, 4001,{from: accounts[0]});
  });
  it('Should fail testdiffDays(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(4002, 4001,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffHours(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(2448, 68570,{from: accounts[0]});
  });
  it('Should fail testdiffHours(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(68571, 68570,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMinutes(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(899, 4901,{from: accounts[0]});
  });
  it('Should fail testdiffMinutes(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(4902, 4901,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffSeconds(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(3, 91,{from: accounts[0]});
  });
  it('Should fail testdiffSeconds(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(92, 91,{from: accounts[0]}),'revert');
  });
});
