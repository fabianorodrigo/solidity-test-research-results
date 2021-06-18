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
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(2014223715, 368, 20,{from: accounts[0]});
  });
  it('Should fail test_daysFromDate(uint,uint,uint) when NOT comply with: year >= 1970', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.test_daysFromDate(1969, 368, 20,{from: accounts[0]}),'revert');
  });
  it('Should execute test_daysToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_daysToDate(4800,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDate(uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDate(359, 18, 30,{from: accounts[0]});
  });
  it('Should execute testtimestampFromDateTime(uint,uint,uint,uint,uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampFromDateTime(86400, 1532892062, 400, 159, 1970, 111,{from: accounts[0]});
  });
  it('Should execute testtimestampToDate(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDate(4901,{from: accounts[0]});
  });
  it('Should execute testtimestampToDateTime(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testtimestampToDateTime(90,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day>0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(1532892063, 8, 146098,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN day<=0,year>=1970,month>0,month<=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(1461002, 6, 0,{from: accounts[0]});
  });
  it('Should execute testisValidDate(uint,uint,uint) WHEN month>12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDate(50, 1532892062, 100,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN hour<24,minute<60,second<60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(121, 2014223714, 32, 23, 15, 31,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN minute>=60,FunctionCall==true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(96, 86401, 68569, 1461001, 86400, 21,{from: accounts[0]});
  });
  it('Should execute testisValidDateTime(uint,uint,uint,uint,uint,uint) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisValidDateTime(4799, 361, 70, 50, 400, 68568,{from: accounts[0]});
  });
  it('Should execute testisLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisLeapYear(50,{from: accounts[0]});
  });
  it('Should execute test_isLeapYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_isLeapYear(150,{from: accounts[0]});
  });
  it('Should execute testisWeekDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekDay(26,{from: accounts[0]});
  });
  it('Should execute testisWeekEnd(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testisWeekEnd(21,{from: accounts[0]});
  });
  it('Should execute testgetDaysInMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDaysInMonth(86399,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==1', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(2448, 1,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==3', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(60, 3,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==5', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(28, 5,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==7', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(9, 7,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==8', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(2440588, 8,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==10', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(69, 10,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(3, 12,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month!=2', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(68568, 121,{from: accounts[0]});
  });
  it('Should execute test_getDaysInMonth(uint,uint) WHEN month==2,month!=1,month!=3,month!=5,month!=7,month!=8,month!=10,month!=12', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.test_getDaysInMonth(32076, 2,{from: accounts[0]});
  });
  it('Should execute testgetDayOfWeek(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDayOfWeek(20,{from: accounts[0]});
  });
  it('Should execute testgetYear(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetYear(255,{from: accounts[0]});
  });
  it('Should execute testgetMonth(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMonth(91,{from: accounts[0]});
  });
  it('Should execute testgetDay(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetDay(119,{from: accounts[0]});
  });
  it('Should execute testgetHour(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetHour(10,{from: accounts[0]});
  });
  it('Should execute testgetMinute(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetMinute(150,{from: accounts[0]});
  });
  it('Should execute testgetSecond(uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testgetSecond(10000,{from: accounts[0]});
  });
  it('Should execute testaddYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddYears(361, 149,{from: accounts[0]});
  });
  it('Should execute testaddMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMonths(367, 949,{from: accounts[0]});
  });
  it('Should execute testaddDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddDays(86400, 255,{from: accounts[0]});
  });
  it('Should execute testaddHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddHours(401, 1,{from: accounts[0]});
  });
  it('Should execute testaddMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddMinutes(256, 28,{from: accounts[0]});
  });
  it('Should execute testaddSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testaddSeconds(4000, 12,{from: accounts[0]});
  });
  it('Should execute testsubYears(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubYears(32074, 1969,{from: accounts[0]});
  });
  it('Should execute testsubMonths(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMonths(59, 95,{from: accounts[0]});
  });
  it('Should execute testsubDays(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubDays(121, 12,{from: accounts[0]});
  });
  it('Should execute testsubHours(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubHours(8, 96,{from: accounts[0]});
  });
  it('Should execute testsubMinutes(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubMinutes(10000, 66,{from: accounts[0]});
  });
  it('Should execute testsubSeconds(uint,uint)', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testsubSeconds(68568, 2440588,{from: accounts[0]});
  });
  it('Should execute testdiffYears(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(99, 2448,{from: accounts[0]});
  });
  it('Should fail testdiffYears(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffYears(2449, 2448,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMonths(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(4900, 68570,{from: accounts[0]});
  });
  it('Should fail testdiffMonths(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMonths(68571, 68570,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffDays(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(13, 949,{from: accounts[0]});
  });
  it('Should fail testdiffDays(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffDays(950, 949,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffHours(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(49, 140,{from: accounts[0]});
  });
  it('Should fail testdiffHours(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffHours(141, 140,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffMinutes(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(86401, 2014223716,{from: accounts[0]});
  });
  it('Should fail testdiffMinutes(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffMinutes(2014223717, 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute testdiffSeconds(uint,uint) WHEN fromTimestamp<=toTimestamp', async () => {
    let result = await contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(359, 899,{from: accounts[0]});
  });
  it('Should fail testdiffSeconds(uint,uint) when NOT comply with: fromTimestamp <= toTimestamp', async () => {
    let result = await truffleAssert.fails(contractProxyBokkyPooBahsDateTimeLibrary.testdiffSeconds(900, 899,{from: accounts[0]}),'revert');
  });
});
