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
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(4001, 97, 68570,{from: accounts[0]});
  });
  it('Should fail test_daysFromDate(uint,uint,uint) when NOT comply with: year >= 1970', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(1969, 97, 68570,{from: accounts[0]}),'revert');
  });
  it('Should execute test_daysToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysToDate(18,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDate(uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDate(4900, 39, 70,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDateTime(uint,uint,uint,uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDateTime(32075, 120, 63, 256, 32075, 3,{from: accounts[0]});
  });
  it('Should execute testtimestampToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDate(3,{from: accounts[0]});
  });
  it('Should execute testtimestampToDateTime(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDateTime(161,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day>0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(68569, 1, 2,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day<=0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(2440588, 5, 0,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN month>12,year<1970', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(81, 256, 89,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN hour<24,minute<60,second<60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(32074, 401, 9, 3, 25, 13,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN minute>=60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(95, 16, 79, 1970, 4000, 59,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(359, 4799, 30, 32075, 25, 130,{from: accounts[0]});
  });
  it('Should execute testisLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisLeapYear(68570,{from: accounts[0]});
  });
  it('Should execute test_isLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_isLeapYear(4899,{from: accounts[0]});
  });
  it('Should execute testisWeekDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekDay(129,{from: accounts[0]});
  });
  it('Should execute testisWeekEnd(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekEnd(32076,{from: accounts[0]});
  });
  it('Should execute testgetDaysInMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDaysInMonth(12,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==1', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(97, 1,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==3', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(899, 3,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==5', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(4801, 5,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==7', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(97, 7,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==8', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(79, 8,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==10', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(59, 10,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(20, 12,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month!=2', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(14, 24,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==2,month!=1,month!=3,month!=5,month!=7,month!=8,month!=10,month!=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(96, 2,{from: accounts[0]});
  });
  it('Should execute testgetDayOfWeek(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDayOfWeek(7,{from: accounts[0]});
  });
  it('Should execute testgetYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetYear(71,{from: accounts[0]});
  });
  it('Should execute testgetMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMonth(121,{from: accounts[0]});
  });
  it('Should execute testgetDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDay(80,{from: accounts[0]});
  });
  it('Should execute testgetHour(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetHour(1532892063,{from: accounts[0]});
  });
  it('Should execute testgetMinute(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMinute(23,{from: accounts[0]});
  });
  it('Should execute testgetSecond(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetSecond(2,{from: accounts[0]});
  });
  it('Should execute testaddYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddYears(26, 23,{from: accounts[0]});
  });
  it('Should execute testaddMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMonths(8, 2448,{from: accounts[0]});
  });
  it('Should execute testaddDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddDays(60, 255,{from: accounts[0]});
  });
  it('Should execute testaddHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddHours(901, 49,{from: accounts[0]});
  });
  it('Should execute testaddMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMinutes(90, 10001,{from: accounts[0]});
  });
  it('Should execute testaddSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddSeconds(68569, 68570,{from: accounts[0]});
  });
  it('Should execute testsubYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubYears(2447, 31,{from: accounts[0]});
  });
  it('Should execute testsubMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMonths(949, 90,{from: accounts[0]});
  });
  it('Should execute testsubDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubDays(1, 60,{from: accounts[0]});
  });
  it('Should execute testsubHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubHours(70, 90,{from: accounts[0]});
  });
  it('Should execute testsubMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMinutes(1461000, 8,{from: accounts[0]});
  });
  it('Should execute testsubSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubSeconds(60, 140,{from: accounts[0]});
  });
  it('Should execute testdiffYears(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(365, 949,{from: accounts[0]});
  });
  it('Should fail testdiffYears(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(950, 949,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMonths(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(21, 109,{from: accounts[0]});
  });
  it('Should fail testdiffMonths(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(110, 109,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffDays(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(254, 3999,{from: accounts[0]});
  });
  it('Should fail testdiffDays(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(4000, 3999,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffHours(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(18, 28,{from: accounts[0]});
  });
  it('Should fail testdiffHours(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(29, 28,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMinutes(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(360, 68569,{from: accounts[0]});
  });
  it('Should fail testdiffMinutes(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(68570, 68569,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffSeconds(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(899, 900,{from: accounts[0]});
  });
  it('Should fail testdiffSeconds(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(901, 900,{from: accounts[0]}),'revert');
  });
});
