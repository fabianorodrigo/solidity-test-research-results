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
const ProxySchedule = artifacts.require("ProxySchedule");
const ProxyUtils = artifacts.require("ProxyUtils");

contract("contractProxyUtils",(accounts)=>{
    let contractProxyUtils = null;
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
      ProxyUtils.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractProxyUtils = await ProxyUtils.new({ from: accounts[0] });
});
  
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.D', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 901,"p": 0,"s": 0,"isSet": true}, 1970,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 4801,"p": 1,"s": 1,"isSet": true}, 2440587,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 4900,"p": 2,"s": 1,"isSet": true}, 400,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 86399,"p": 3,"s": 1,"isSet": true}, 49,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 401,"p": 4,"s": 1,"isSet": false}, 5,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 32075,"p": 5,"s": 0,"isSet": false}, 131,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 86400,"p": 99999,"s": 0,"isSet": false}, 86399,{from: accounts[0]});
  });
  it('Should execute testsortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE],uint256)', async () => {
    let result = await contractProxyUtils.testsortProtoEventSchedule([{"eventTime": 97,"eventTimeWithEpochOffset": 27,"scheduleTime": 2447,"eventType": 17,"currency": accounts[5],"pofType": 12,"stfType": 14},{"eventTime": 140,"eventTimeWithEpochOffset": 1462,"scheduleTime": 2448,"eventType": 2,"currency": accounts[6],"pofType": 11,"stfType": 12},{"eventTime": 26,"eventTimeWithEpochOffset": 4801,"scheduleTime": 41,"eventType": 15,"currency": accounts[5],"pofType": 5,"stfType": 19},{"eventTime": 86401,"eventTimeWithEpochOffset": 368,"scheduleTime": 2440588,"eventType": 10,"currency": accounts[8],"pofType": 13,"stfType": 6},{"eventTime": 400,"eventTimeWithEpochOffset": 146096,"scheduleTime": 1462,"eventType": 6,"currency": accounts[1],"pofType": 18,"stfType": 6},{"eventTime": 13,"eventTimeWithEpochOffset": 90,"scheduleTime": 1461001,"eventType": 6,"currency": accounts[5],"pofType": 9,"stfType": 19},{"eventTime": 99,"eventTimeWithEpochOffset": 90,"scheduleTime": 361,"eventType": 13,"currency": accounts[4],"pofType": 2,"stfType": 9},{"eventTime": 4001,"eventTimeWithEpochOffset": 129,"scheduleTime": 4001,"eventType": 14,"currency": accounts[4],"pofType": 6,"stfType": 0},{"eventTime": 899,"eventTimeWithEpochOffset": 255,"scheduleTime": 121,"eventType": 2,"currency": accounts[6],"pofType": 3,"stfType": 10},{"eventTime": 130,"eventTimeWithEpochOffset": 1461000,"scheduleTime": 2440587,"eventType": 16,"currency": accounts[6],"pofType": 10,"stfType": 10},{"eventTime": 61,"eventTimeWithEpochOffset": 29,"scheduleTime": 1462,"eventType": 7,"currency": accounts[5],"pofType": 11,"stfType": 9},{"eventTime": 359,"eventTimeWithEpochOffset": 131,"scheduleTime": 25,"eventType": 18,"currency": accounts[1],"pofType": 15,"stfType": 13},{"eventTime": 28,"eventTimeWithEpochOffset": 360,"scheduleTime": 140,"eventType": 2,"currency": accounts[6],"pofType": 4,"stfType": 17},{"eventTime": 61,"eventTimeWithEpochOffset": 51,"scheduleTime": 26,"eventType": 12,"currency": accounts[2],"pofType": 1,"stfType": 13},{"eventTime": 3999,"eventTimeWithEpochOffset": 96,"scheduleTime": 2448,"eventType": 14,"currency": accounts[4],"pofType": 15,"stfType": 13},{"eventTime": 1532892064,"eventTimeWithEpochOffset": 1337,"scheduleTime": 399,"eventType": 12,"currency": accounts[8],"pofType": 13,"stfType": 5},{"eventTime": 1969,"eventTimeWithEpochOffset": 1338,"scheduleTime": 51,"eventType": 17,"currency": accounts[8],"pofType": 3,"stfType": 2},{"eventTime": 401,"eventTimeWithEpochOffset": 14,"scheduleTime": 1461002,"eventType": 10,"currency": accounts[8],"pofType": 6,"stfType": 3},{"eventTime": 951,"eventTimeWithEpochOffset": 4799,"scheduleTime": 99,"eventType": 16,"currency": accounts[5],"pofType": 8,"stfType": 11},{"eventTime": 4900,"eventTimeWithEpochOffset": 2440587,"scheduleTime": 360,"eventType": 18,"currency": accounts[9],"pofType": 16,"stfType": 4},{"eventTime": 1338,"eventTimeWithEpochOffset": 1460,"scheduleTime": 256,"eventType": 10,"currency": accounts[4],"pofType": 1,"stfType": 19},{"eventTime": 95,"eventTimeWithEpochOffset": 900,"scheduleTime": 1,"eventType": 5,"currency": accounts[3],"pofType": 2,"stfType": 3},{"eventTime": 12,"eventTimeWithEpochOffset": 2440588,"scheduleTime": 2440589,"eventType": 8,"currency": accounts[1],"pofType": 0,"stfType": 0},{"eventTime": 13,"eventTimeWithEpochOffset": 256,"scheduleTime": 119,"eventType": 2,"currency": accounts[6],"pofType": 5,"stfType": 16},{"eventTime": 146098,"eventTimeWithEpochOffset": 119,"scheduleTime": 401,"eventType": 19,"currency": accounts[9],"pofType": 9,"stfType": 20},{"eventTime": 13,"eventTimeWithEpochOffset": 86401,"scheduleTime": 65,"eventType": 13,"currency": accounts[3],"pofType": 2,"stfType": 13},{"eventTime": 900,"eventTimeWithEpochOffset": 149,"scheduleTime": 70,"eventType": 13,"currency": accounts[1],"pofType": 16,"stfType": 19},{"eventTime": 60,"eventTimeWithEpochOffset": 1971,"scheduleTime": 10001,"eventType": 9,"currency": accounts[2],"pofType": 18,"stfType": 15},{"eventTime": 71,"eventTimeWithEpochOffset": 29,"scheduleTime": 1462,"eventType": 12,"currency": accounts[3],"pofType": 16,"stfType": 3},{"eventTime": 0,"eventTimeWithEpochOffset": 89,"scheduleTime": 0,"eventType": 18,"currency": accounts[7],"pofType": 2,"stfType": 14},{"eventTime": 51,"eventTimeWithEpochOffset": 4801,"scheduleTime": 119,"eventType": 15,"currency": accounts[8],"pofType": 14,"stfType": 13},{"eventTime": 12,"eventTimeWithEpochOffset": 359,"scheduleTime": 32074,"eventType": 5,"currency": accounts[9],"pofType": 9,"stfType": 20},{"eventTime": 3999,"eventTimeWithEpochOffset": 59,"scheduleTime": 29,"eventType": 12,"currency": accounts[7],"pofType": 3,"stfType": 16},{"eventTime": 68570,"eventTimeWithEpochOffset": 79,"scheduleTime": 257,"eventType": 11,"currency": accounts[0],"pofType": 19,"stfType": 2},{"eventTime": 364,"eventTimeWithEpochOffset": 27,"scheduleTime": 26,"eventType": 7,"currency": accounts[0],"pofType": 12,"stfType": 4},{"eventTime": 59,"eventTimeWithEpochOffset": 2014223716,"scheduleTime": 10,"eventType": 20,"currency": accounts[5],"pofType": 8,"stfType": 4},{"eventTime": 1,"eventTimeWithEpochOffset": 4901,"scheduleTime": 139,"eventType": 0,"currency": accounts[6],"pofType": 10,"stfType": 12},{"eventTime": 68568,"eventTimeWithEpochOffset": 1461002,"scheduleTime": 32075,"eventType": 8,"currency": accounts[8],"pofType": 14,"stfType": 20},{"eventTime": 49,"eventTimeWithEpochOffset": 40,"scheduleTime": 129,"eventType": 6,"currency": accounts[0],"pofType": 3,"stfType": 6},{"eventTime": 366,"eventTimeWithEpochOffset": 151,"scheduleTime": 26,"eventType": 11,"currency": accounts[8],"pofType": 7,"stfType": 14},{"eventTime": 61,"eventTimeWithEpochOffset": 120,"scheduleTime": 2447,"eventType": 20,"currency": accounts[6],"pofType": 10,"stfType": 5},{"eventTime": 0,"eventTimeWithEpochOffset": 1337,"scheduleTime": 4799,"eventType": 7,"currency": accounts[9],"pofType": 3,"stfType": 7},{"eventTime": 129,"eventTimeWithEpochOffset": 7,"scheduleTime": 361,"eventType": 10,"currency": accounts[9],"pofType": 11,"stfType": 16},{"eventTime": 5,"eventTimeWithEpochOffset": 17,"scheduleTime": 1460,"eventType": 20,"currency": accounts[5],"pofType": 18,"stfType": 18},{"eventTime": 23,"eventTimeWithEpochOffset": 257,"scheduleTime": 120,"eventType": 20,"currency": accounts[2],"pofType": 10,"stfType": 5},{"eventTime": 91,"eventTimeWithEpochOffset": 86400,"scheduleTime": 1461000,"eventType": 0,"currency": accounts[4],"pofType": 14,"stfType": 7},{"eventTime": 1971,"eventTimeWithEpochOffset": 367,"scheduleTime": 14,"eventType": 17,"currency": accounts[5],"pofType": 10,"stfType": 5},{"eventTime": 4900,"eventTimeWithEpochOffset": 2,"scheduleTime": 1461002,"eventType": 18,"currency": accounts[9],"pofType": 7,"stfType": 14},{"eventTime": 131,"eventTimeWithEpochOffset": 111,"scheduleTime": 161,"eventType": 18,"currency": accounts[7],"pofType": 16,"stfType": 5},{"eventTime": 99,"eventTimeWithEpochOffset": 950,"scheduleTime": 949,"eventType": 14,"currency": accounts[8],"pofType": 17,"stfType": 11},{"eventTime": 1462,"eventTimeWithEpochOffset": 1,"scheduleTime": 28,"eventType": 16,"currency": accounts[9],"pofType": 9,"stfType": 10},{"eventTime": 21,"eventTimeWithEpochOffset": 25,"scheduleTime": 899,"eventType": 0,"currency": accounts[6],"pofType": 8,"stfType": 1},{"eventTime": 1532892064,"eventTimeWithEpochOffset": 1338,"scheduleTime": 159,"eventType": 17,"currency": accounts[0],"pofType": 16,"stfType": 18},{"eventTime": 140,"eventTimeWithEpochOffset": 160,"scheduleTime": 1969,"eventType": 2,"currency": accounts[7],"pofType": 20,"stfType": 6},{"eventTime": 149,"eventTimeWithEpochOffset": 64,"scheduleTime": 4799,"eventType": 13,"currency": accounts[7],"pofType": 8,"stfType": 7},{"eventTime": 66,"eventTimeWithEpochOffset": 68568,"scheduleTime": 4900,"eventType": 0,"currency": accounts[7],"pofType": 17,"stfType": 15},{"eventTime": 2014223714,"eventTimeWithEpochOffset": 89,"scheduleTime": 100,"eventType": 8,"currency": accounts[6],"pofType": 0,"stfType": 9},{"eventTime": 1461001,"eventTimeWithEpochOffset": 400,"scheduleTime": 129,"eventType": 11,"currency": accounts[6],"pofType": 0,"stfType": 20},{"eventTime": 41,"eventTimeWithEpochOffset": 60,"scheduleTime": 366,"eventType": 14,"currency": accounts[9],"pofType": 16,"stfType": 2},{"eventTime": 59,"eventTimeWithEpochOffset": 109,"scheduleTime": 2,"eventType": 2,"currency": accounts[9],"pofType": 16,"stfType": 14},{"eventTime": 40,"eventTimeWithEpochOffset": 71,"scheduleTime": 6,"eventType": 7,"currency": accounts[4],"pofType": 16,"stfType": 18},{"eventTime": 146097,"eventTimeWithEpochOffset": 26,"scheduleTime": 139,"eventType": 10,"currency": accounts[8],"pofType": 5,"stfType": 5},{"eventTime": 32074,"eventTimeWithEpochOffset": 51,"scheduleTime": 368,"eventType": 7,"currency": accounts[6],"pofType": 9,"stfType": 13},{"eventTime": 1460,"eventTimeWithEpochOffset": 49,"scheduleTime": 68569,"eventType": 7,"currency": accounts[6],"pofType": 4,"stfType": 17}], 12,{from: accounts[0]});
  });
  it('Should execute testquickSortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE],uint,uint)', async () => {
    let result = await contractProxyUtils.testquickSortProtoEventSchedule([{"eventTime": 900,"eventTimeWithEpochOffset": 367,"scheduleTime": 96,"eventType": 9,"currency": accounts[8],"pofType": 5,"stfType": 16},{"eventTime": 400,"eventTimeWithEpochOffset": 4801,"scheduleTime": 4000,"eventType": 0,"currency": accounts[4],"pofType": 20,"stfType": 16},{"eventTime": 256,"eventTimeWithEpochOffset": 61,"scheduleTime": 141,"eventType": 11,"currency": accounts[5],"pofType": 13,"stfType": 8},{"eventTime": 39,"eventTimeWithEpochOffset": 24,"scheduleTime": 1462,"eventType": 10,"currency": accounts[4],"pofType": 17,"stfType": 3},{"eventTime": 1461001,"eventTimeWithEpochOffset": 71,"scheduleTime": 1969,"eventType": 15,"currency": accounts[7],"pofType": 19,"stfType": 11},{"eventTime": 70,"eventTimeWithEpochOffset": 13,"scheduleTime": 131,"eventType": 10,"currency": accounts[1],"pofType": 7,"stfType": 8},{"eventTime": 2447,"eventTimeWithEpochOffset": 29,"scheduleTime": 41,"eventType": 7,"currency": accounts[8],"pofType": 3,"stfType": 20},{"eventTime": 4799,"eventTimeWithEpochOffset": 1337,"scheduleTime": 71,"eventType": 1,"currency": accounts[7],"pofType": 15,"stfType": 15},{"eventTime": 96,"eventTimeWithEpochOffset": 60,"scheduleTime": 399,"eventType": 18,"currency": accounts[6],"pofType": 4,"stfType": 13},{"eventTime": 160,"eventTimeWithEpochOffset": 257,"scheduleTime": 25,"eventType": 13,"currency": accounts[0],"pofType": 12,"stfType": 3},{"eventTime": 66,"eventTimeWithEpochOffset": 12,"scheduleTime": 950,"eventType": 6,"currency": accounts[8],"pofType": 12,"stfType": 15},{"eventTime": 1461,"eventTimeWithEpochOffset": 366,"scheduleTime": 31,"eventType": 13,"currency": accounts[9],"pofType": 13,"stfType": 11},{"eventTime": 119,"eventTimeWithEpochOffset": 2447,"scheduleTime": 86399,"eventType": 11,"currency": accounts[5],"pofType": 11,"stfType": 3},{"eventTime": 65,"eventTimeWithEpochOffset": 901,"scheduleTime": 14,"eventType": 15,"currency": accounts[4],"pofType": 1,"stfType": 3},{"eventTime": 111,"eventTimeWithEpochOffset": 1532892062,"scheduleTime": 71,"eventType": 9,"currency": accounts[6],"pofType": 3,"stfType": 10},{"eventTime": 365,"eventTimeWithEpochOffset": 71,"scheduleTime": 1969,"eventType": 3,"currency": accounts[2],"pofType": 12,"stfType": 7},{"eventTime": 150,"eventTimeWithEpochOffset": 86400,"scheduleTime": 4,"eventType": 11,"currency": accounts[0],"pofType": 18,"stfType": 16},{"eventTime": 25,"eventTimeWithEpochOffset": 63,"scheduleTime": 13,"eventType": 2,"currency": accounts[5],"pofType": 3,"stfType": 7},{"eventTime": 1532892062,"eventTimeWithEpochOffset": 28,"scheduleTime": 368,"eventType": 10,"currency": accounts[9],"pofType": 14,"stfType": 1},{"eventTime": 2014223716,"eventTimeWithEpochOffset": 146098,"scheduleTime": 29,"eventType": 15,"currency": accounts[8],"pofType": 8,"stfType": 1},{"eventTime": 257,"eventTimeWithEpochOffset": 80,"scheduleTime": 86401,"eventType": 2,"currency": accounts[8],"pofType": 5,"stfType": 8},{"eventTime": 1,"eventTimeWithEpochOffset": 28,"scheduleTime": 2440589,"eventType": 0,"currency": accounts[2],"pofType": 19,"stfType": 17},{"eventTime": 2,"eventTimeWithEpochOffset": 1338,"scheduleTime": 63,"eventType": 0,"currency": accounts[2],"pofType": 12,"stfType": 15},{"eventTime": 1338,"eventTimeWithEpochOffset": 1461001,"scheduleTime": 1532892063,"eventType": 9,"currency": accounts[2],"pofType": 9,"stfType": 6},{"eventTime": 1337,"eventTimeWithEpochOffset": 1970,"scheduleTime": 2447,"eventType": 0,"currency": accounts[9],"pofType": 6,"stfType": 12},{"eventTime": 2014223714,"eventTimeWithEpochOffset": 2014223714,"scheduleTime": 32074,"eventType": 7,"currency": accounts[9],"pofType": 5,"stfType": 17},{"eventTime": 12,"eventTimeWithEpochOffset": 1338,"scheduleTime": 2446,"eventType": 3,"currency": accounts[0],"pofType": 18,"stfType": 15},{"eventTime": 4800,"eventTimeWithEpochOffset": 149,"scheduleTime": 41,"eventType": 1,"currency": accounts[9],"pofType": 2,"stfType": 11},{"eventTime": 2446,"eventTimeWithEpochOffset": 401,"scheduleTime": 3,"eventType": 18,"currency": accounts[1],"pofType": 2,"stfType": 6},{"eventTime": 2440589,"eventTimeWithEpochOffset": 12,"scheduleTime": 1,"eventType": 16,"currency": accounts[7],"pofType": 13,"stfType": 12},{"eventTime": 10,"eventTimeWithEpochOffset": 151,"scheduleTime": 21,"eventType": 5,"currency": accounts[1],"pofType": 2,"stfType": 4},{"eventTime": 361,"eventTimeWithEpochOffset": 89,"scheduleTime": 49,"eventType": 12,"currency": accounts[0],"pofType": 10,"stfType": 8},{"eventTime": 400,"eventTimeWithEpochOffset": 1336,"scheduleTime": 2440588,"eventType": 4,"currency": accounts[0],"pofType": 4,"stfType": 20},{"eventTime": 31,"eventTimeWithEpochOffset": 26,"scheduleTime": 121,"eventType": 9,"currency": accounts[9],"pofType": 4,"stfType": 10},{"eventTime": 364,"eventTimeWithEpochOffset": 149,"scheduleTime": 361,"eventType": 7,"currency": accounts[0],"pofType": 0,"stfType": 19},{"eventTime": 4001,"eventTimeWithEpochOffset": 14,"scheduleTime": 65,"eventType": 5,"currency": accounts[8],"pofType": 8,"stfType": 13},{"eventTime": 1461000,"eventTimeWithEpochOffset": 257,"scheduleTime": 18,"eventType": 11,"currency": accounts[1],"pofType": 13,"stfType": 5},{"eventTime": 65,"eventTimeWithEpochOffset": 151,"scheduleTime": 151,"eventType": 5,"currency": accounts[2],"pofType": 6,"stfType": 13},{"eventTime": 151,"eventTimeWithEpochOffset": 149,"scheduleTime": 1532892063,"eventType": 3,"currency": accounts[8],"pofType": 19,"stfType": 20},{"eventTime": 2440589,"eventTimeWithEpochOffset": 66,"scheduleTime": 0,"eventType": 19,"currency": accounts[3],"pofType": 9,"stfType": 16},{"eventTime": 7,"eventTimeWithEpochOffset": 400,"scheduleTime": 1337,"eventType": 13,"currency": accounts[3],"pofType": 0,"stfType": 20},{"eventTime": 161,"eventTimeWithEpochOffset": 1,"scheduleTime": 86401,"eventType": 2,"currency": accounts[1],"pofType": 20,"stfType": 11},{"eventTime": 365,"eventTimeWithEpochOffset": 366,"scheduleTime": 9999,"eventType": 8,"currency": accounts[6],"pofType": 15,"stfType": 9},{"eventTime": 368,"eventTimeWithEpochOffset": 359,"scheduleTime": 255,"eventType": 9,"currency": accounts[8],"pofType": 8,"stfType": 8},{"eventTime": 161,"eventTimeWithEpochOffset": 4800,"scheduleTime": 4901,"eventType": 20,"currency": accounts[0],"pofType": 19,"stfType": 17},{"eventTime": 141,"eventTimeWithEpochOffset": 96,"scheduleTime": 17,"eventType": 13,"currency": accounts[0],"pofType": 12,"stfType": 5},{"eventTime": 17,"eventTimeWithEpochOffset": 64,"scheduleTime": 10,"eventType": 9,"currency": accounts[1],"pofType": 5,"stfType": 12},{"eventTime": 48,"eventTimeWithEpochOffset": 100,"scheduleTime": 5,"eventType": 16,"currency": accounts[9],"pofType": 18,"stfType": 8},{"eventTime": 2440589,"eventTimeWithEpochOffset": 25,"scheduleTime": 255,"eventType": 8,"currency": accounts[8],"pofType": 9,"stfType": 4},{"eventTime": 68569,"eventTimeWithEpochOffset": 48,"scheduleTime": 7,"eventType": 5,"currency": accounts[0],"pofType": 19,"stfType": 1},{"eventTime": 4801,"eventTimeWithEpochOffset": 160,"scheduleTime": 21,"eventType": 9,"currency": accounts[9],"pofType": 14,"stfType": 12},{"eventTime": 68569,"eventTimeWithEpochOffset": 9999,"scheduleTime": 129,"eventType": 15,"currency": accounts[6],"pofType": 5,"stfType": 0},{"eventTime": 159,"eventTimeWithEpochOffset": 364,"scheduleTime": 1969,"eventType": 8,"currency": accounts[0],"pofType": 2,"stfType": 17},{"eventTime": 119,"eventTimeWithEpochOffset": 20,"scheduleTime": 86400,"eventType": 13,"currency": accounts[2],"pofType": 19,"stfType": 16},{"eventTime": 9,"eventTimeWithEpochOffset": 95,"scheduleTime": 149,"eventType": 5,"currency": accounts[2],"pofType": 7,"stfType": 15},{"eventTime": 950,"eventTimeWithEpochOffset": 2446,"scheduleTime": 1,"eventType": 11,"currency": accounts[4],"pofType": 16,"stfType": 3},{"eventTime": 359,"eventTimeWithEpochOffset": 49,"scheduleTime": 29,"eventType": 1,"currency": accounts[5],"pofType": 5,"stfType": 17},{"eventTime": 64,"eventTimeWithEpochOffset": 0,"scheduleTime": 51,"eventType": 9,"currency": accounts[5],"pofType": 8,"stfType": 3},{"eventTime": 26,"eventTimeWithEpochOffset": 68570,"scheduleTime": 2440589,"eventType": 1,"currency": accounts[2],"pofType": 12,"stfType": 15},{"eventTime": 4801,"eventTimeWithEpochOffset": 366,"scheduleTime": 96,"eventType": 15,"currency": accounts[3],"pofType": 1,"stfType": 10},{"eventTime": 11,"eventTimeWithEpochOffset": 119,"scheduleTime": 146098,"eventType": 2,"currency": accounts[8],"pofType": 5,"stfType": 1},{"eventTime": 129,"eventTimeWithEpochOffset": 12,"scheduleTime": 360,"eventType": 9,"currency": accounts[9],"pofType": 7,"stfType": 9},{"eventTime": 401,"eventTimeWithEpochOffset": 26,"scheduleTime": 1338,"eventType": 12,"currency": accounts[9],"pofType": 12,"stfType": 9},{"eventTime": 4799,"eventTimeWithEpochOffset": 4901,"scheduleTime": 40,"eventType": 0,"currency": accounts[0],"pofType": 15,"stfType": 20}], 400, 80,{from: accounts[0]});
  });
  it('Should execute testisInPeriod(uint256,uint256,uint256) WHEN startTimestamp<timestamp,endTimestamp>=timestamp', async () => {
    let result = await contractProxyUtils.testisInPeriod(1461002, 61, 1461003,{from: accounts[0]});
  });
  it('Should execute testisInPeriod(uint256,uint256,uint256) WHEN startTimestamp>=timestamp', async () => {
    let result = await contractProxyUtils.testisInPeriod(68570, 2440588, 70,{from: accounts[0]});
  });
});
