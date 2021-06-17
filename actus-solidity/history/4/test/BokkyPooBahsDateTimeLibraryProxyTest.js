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
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(9999, 111, 2448,{from: accounts[0]});
  });
  it('Should fail test_daysFromDate(uint,uint,uint) when NOT comply with: year >= 1970', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(1969, 111, 2448,{from: accounts[0]}),'revert');
  });
  it('Should execute test_daysToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysToDate(49,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDate(uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDate(86399, 31, 5,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDateTime(uint,uint,uint,uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDateTime(95, 1338, 119, 27, 1460, 4799,{from: accounts[0]});
  });
  it('Should execute testtimestampToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDate(129,{from: accounts[0]});
  });
  it('Should execute testtimestampToDateTime(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDateTime(70,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day>0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(2446, 11, 2440587,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day<=0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(2448, 2, 0,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN month>12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(1461002, 130, 24,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN hour<24,minute<60,second<60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(130, 27, 86399, 10, 6, 49,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN minute>=60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(2014223714, 12, 367, 21, 61, 48,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(96, 256, 19, 4900, 100, 130,{from: accounts[0]});
  });
  it('Should execute testisLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisLeapYear(51,{from: accounts[0]});
  });
  it('Should execute test_isLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_isLeapYear(5,{from: accounts[0]});
  });
  it('Should execute testisWeekDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekDay(10000,{from: accounts[0]});
  });
  it('Should execute testisWeekEnd(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekEnd(149,{from: accounts[0]});
  });
  it('Should execute testgetDaysInMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDaysInMonth(16,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==1', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(18, 1,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==3', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(2, 3,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==5', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(60, 5,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==7', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(360, 7,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==8', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(17, 8,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==10', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(66, 10,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(2447, 12,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month!=2', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(86399, 368,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==2,month!=1,month!=3,month!=5,month!=7,month!=8,month!=10,month!=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(255, 2,{from: accounts[0]});
  });
  it('Should execute testgetDayOfWeek(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDayOfWeek(63,{from: accounts[0]});
  });
  it('Should execute testgetYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetYear(161,{from: accounts[0]});
  });
  it('Should execute testgetMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMonth(2440589,{from: accounts[0]});
  });
  it('Should execute testgetDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDay(49,{from: accounts[0]});
  });
  it('Should execute testgetHour(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetHour(91,{from: accounts[0]});
  });
  it('Should execute testgetMinute(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMinute(111,{from: accounts[0]});
  });
  it('Should execute testgetSecond(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetSecond(2014223715,{from: accounts[0]});
  });
  it('Should execute testaddYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddYears(4800, 65,{from: accounts[0]});
  });
  it('Should execute testaddMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMonths(109, 365,{from: accounts[0]});
  });
  it('Should execute testaddDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddDays(10, 71,{from: accounts[0]});
  });
  it('Should execute testaddHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddHours(255, 95,{from: accounts[0]});
  });
  it('Should execute testaddMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMinutes(7, 401,{from: accounts[0]});
  });
  it('Should execute testaddSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddSeconds(1461, 1462,{from: accounts[0]});
  });
  it('Should execute testsubYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubYears(16, 4900,{from: accounts[0]});
  });
  it('Should execute testsubMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMonths(4801, 19,{from: accounts[0]});
  });
  it('Should execute testsubDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubDays(161, 109,{from: accounts[0]});
  });
  it('Should execute testsubHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubHours(86399, 257,{from: accounts[0]});
  });
  it('Should execute testsubMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMinutes(66, 111,{from: accounts[0]});
  });
  it('Should execute testsubSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubSeconds(109, 367,{from: accounts[0]});
  });
  it('Should execute testdiffYears(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(3999, 10000,{from: accounts[0]});
  });
  it('Should fail testdiffYears(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(10001, 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMonths(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(65, 81,{from: accounts[0]});
  });
  it('Should fail testdiffMonths(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(82, 81,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffDays(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(71, 951,{from: accounts[0]});
  });
  it('Should fail testdiffDays(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(952, 951,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffHours(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(140, 401,{from: accounts[0]});
  });
  it('Should fail testdiffHours(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(402, 401,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMinutes(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(4, 89,{from: accounts[0]});
  });
  it('Should fail testdiffMinutes(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(90, 89,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffSeconds(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(4901, 32076,{from: accounts[0]});
  });
  it('Should fail testdiffSeconds(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(32077, 32076,{from: accounts[0]}),'revert');
  });
});
