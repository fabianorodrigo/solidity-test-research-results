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
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 1461,"p": 0,"s": 1,"isSet": true}, 16,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 68570,"p": 1,"s": 1,"isSet": false}, 139,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 950,"p": 2,"s": 1,"isSet": false}, 6,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 3,"p": 3,"s": 1,"isSet": false}, 86401,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 119,"p": 4,"s": 1,"isSet": true}, 146098,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 79,"p": 5,"s": 0,"isSet": false}, 4001,{from: accounts[0]});
  });
  it('Should execute testgetTimestampPlusPeriod(Definitions.IPS,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxyUtils.testgetTimestampPlusPeriod({"i": 41,"p": 99999,"s": 0,"isSet": false}, 96,{from: accounts[0]});
  });
  it('Should execute testsortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE],uint256)', async () => {
    let result = await contractProxyUtils.testsortProtoEventSchedule([{"eventTime": 89,"eventTimeWithEpochOffset": 1532892062,"scheduleTime": 901,"eventType": 4,"currency": accounts[1],"pofType": 0,"stfType": 11},{"eventTime": 131,"eventTimeWithEpochOffset": 2446,"scheduleTime": 90,"eventType": 10,"currency": accounts[5],"pofType": 7,"stfType": 12},{"eventTime": 2440589,"eventTimeWithEpochOffset": 3999,"scheduleTime": 146097,"eventType": 10,"currency": accounts[7],"pofType": 5,"stfType": 4},{"eventTime": 2440587,"eventTimeWithEpochOffset": 4799,"scheduleTime": 120,"eventType": 8,"currency": accounts[4],"pofType": 0,"stfType": 16},{"eventTime": 1461000,"eventTimeWithEpochOffset": 119,"scheduleTime": 2448,"eventType": 19,"currency": accounts[6],"pofType": 6,"stfType": 3},{"eventTime": 160,"eventTimeWithEpochOffset": 367,"scheduleTime": 10001,"eventType": 7,"currency": accounts[4],"pofType": 15,"stfType": 6},{"eventTime": 2447,"eventTimeWithEpochOffset": 100,"scheduleTime": 95,"eventType": 17,"currency": accounts[7],"pofType": 4,"stfType": 15},{"eventTime": 2014223714,"eventTimeWithEpochOffset": 257,"scheduleTime": 120,"eventType": 10,"currency": accounts[7],"pofType": 16,"stfType": 3},{"eventTime": 10001,"eventTimeWithEpochOffset": 360,"scheduleTime": 901,"eventType": 8,"currency": accounts[0],"pofType": 13,"stfType": 1},{"eventTime": 86399,"eventTimeWithEpochOffset": 131,"scheduleTime": 19,"eventType": 9,"currency": accounts[7],"pofType": 17,"stfType": 7},{"eventTime": 1,"eventTimeWithEpochOffset": 50,"scheduleTime": 49,"eventType": 1,"currency": accounts[1],"pofType": 2,"stfType": 11},{"eventTime": 255,"eventTimeWithEpochOffset": 6,"scheduleTime": 1336,"eventType": 15,"currency": accounts[7],"pofType": 1,"stfType": 0},{"eventTime": 41,"eventTimeWithEpochOffset": 4900,"scheduleTime": 400,"eventType": 10,"currency": accounts[8],"pofType": 10,"stfType": 18},{"eventTime": 90,"eventTimeWithEpochOffset": 50,"scheduleTime": 360,"eventType": 20,"currency": accounts[9],"pofType": 0,"stfType": 14},{"eventTime": 1532892062,"eventTimeWithEpochOffset": 130,"scheduleTime": 32074,"eventType": 20,"currency": accounts[0],"pofType": 19,"stfType": 9},{"eventTime": 161,"eventTimeWithEpochOffset": 901,"scheduleTime": 2446,"eventType": 16,"currency": accounts[3],"pofType": 8,"stfType": 7},{"eventTime": 61,"eventTimeWithEpochOffset": 89,"scheduleTime": 1461000,"eventType": 10,"currency": accounts[3],"pofType": 5,"stfType": 2},{"eventTime": 1336,"eventTimeWithEpochOffset": 146096,"scheduleTime": 7,"eventType": 16,"currency": accounts[2],"pofType": 7,"stfType": 13},{"eventTime": 97,"eventTimeWithEpochOffset": 368,"scheduleTime": 111,"eventType": 9,"currency": accounts[9],"pofType": 4,"stfType": 4},{"eventTime": 119,"eventTimeWithEpochOffset": 86400,"scheduleTime": 101,"eventType": 18,"currency": accounts[5],"pofType": 20,"stfType": 4},{"eventTime": 4000,"eventTimeWithEpochOffset": 146096,"scheduleTime": 25,"eventType": 8,"currency": accounts[6],"pofType": 9,"stfType": 7},{"eventTime": 255,"eventTimeWithEpochOffset": 68570,"scheduleTime": 12,"eventType": 13,"currency": accounts[0],"pofType": 2,"stfType": 8},{"eventTime": 50,"eventTimeWithEpochOffset": 2440587,"scheduleTime": 161,"eventType": 8,"currency": accounts[9],"pofType": 17,"stfType": 14},{"eventTime": 68570,"eventTimeWithEpochOffset": 361,"scheduleTime": 32,"eventType": 3,"currency": accounts[1],"pofType": 10,"stfType": 18},{"eventTime": 2014223714,"eventTimeWithEpochOffset": 68570,"scheduleTime": 159,"eventType": 8,"currency": accounts[3],"pofType": 5,"stfType": 9},{"eventTime": 90,"eventTimeWithEpochOffset": 120,"scheduleTime": 256,"eventType": 9,"currency": accounts[8],"pofType": 17,"stfType": 16},{"eventTime": 2014223716,"eventTimeWithEpochOffset": 65,"scheduleTime": 2448,"eventType": 17,"currency": accounts[2],"pofType": 5,"stfType": 8},{"eventTime": 1,"eventTimeWithEpochOffset": 1969,"scheduleTime": 146097,"eventType": 19,"currency": accounts[7],"pofType": 16,"stfType": 17},{"eventTime": 141,"eventTimeWithEpochOffset": 368,"scheduleTime": 161,"eventType": 19,"currency": accounts[9],"pofType": 16,"stfType": 15},{"eventTime": 68570,"eventTimeWithEpochOffset": 149,"scheduleTime": 50,"eventType": 13,"currency": accounts[2],"pofType": 0,"stfType": 20},{"eventTime": 9999,"eventTimeWithEpochOffset": 32074,"scheduleTime": 4,"eventType": 14,"currency": accounts[0],"pofType": 11,"stfType": 11},{"eventTime": 100,"eventTimeWithEpochOffset": 361,"scheduleTime": 90,"eventType": 0,"currency": accounts[9],"pofType": 14,"stfType": 7},{"eventTime": 49,"eventTimeWithEpochOffset": 26,"scheduleTime": 109,"eventType": 8,"currency": accounts[0],"pofType": 5,"stfType": 16},{"eventTime": 7,"eventTimeWithEpochOffset": 48,"scheduleTime": 91,"eventType": 16,"currency": accounts[0],"pofType": 5,"stfType": 17},{"eventTime": 97,"eventTimeWithEpochOffset": 32075,"scheduleTime": 2440589,"eventType": 12,"currency": accounts[8],"pofType": 6,"stfType": 13},{"eventTime": 14,"eventTimeWithEpochOffset": 146098,"scheduleTime": 951,"eventType": 19,"currency": accounts[7],"pofType": 0,"stfType": 18},{"eventTime": 60,"eventTimeWithEpochOffset": 131,"scheduleTime": 101,"eventType": 1,"currency": accounts[2],"pofType": 1,"stfType": 15},{"eventTime": 86399,"eventTimeWithEpochOffset": 30,"scheduleTime": 68570,"eventType": 1,"currency": accounts[8],"pofType": 14,"stfType": 15},{"eventTime": 68570,"eventTimeWithEpochOffset": 4900,"scheduleTime": 368,"eventType": 4,"currency": accounts[0],"pofType": 4,"stfType": 13},{"eventTime": 949,"eventTimeWithEpochOffset": 32,"scheduleTime": 3999,"eventType": 2,"currency": accounts[2],"pofType": 4,"stfType": 2},{"eventTime": 4801,"eventTimeWithEpochOffset": 96,"scheduleTime": 16,"eventType": 12,"currency": accounts[6],"pofType": 14,"stfType": 1},{"eventTime": 32,"eventTimeWithEpochOffset": 951,"scheduleTime": 121,"eventType": 18,"currency": accounts[7],"pofType": 11,"stfType": 1},{"eventTime": 11,"eventTimeWithEpochOffset": 86399,"scheduleTime": 366,"eventType": 11,"currency": accounts[7],"pofType": 3,"stfType": 4},{"eventTime": 100,"eventTimeWithEpochOffset": 1461000,"scheduleTime": 2014223715,"eventType": 10,"currency": accounts[7],"pofType": 14,"stfType": 14},{"eventTime": 359,"eventTimeWithEpochOffset": 4001,"scheduleTime": 4901,"eventType": 3,"currency": accounts[6],"pofType": 11,"stfType": 7},{"eventTime": 130,"eventTimeWithEpochOffset": 0,"scheduleTime": 96,"eventType": 18,"currency": accounts[6],"pofType": 3,"stfType": 16},{"eventTime": 255,"eventTimeWithEpochOffset": 15,"scheduleTime": 32,"eventType": 18,"currency": accounts[5],"pofType": 12,"stfType": 1},{"eventTime": 255,"eventTimeWithEpochOffset": 4799,"scheduleTime": 366,"eventType": 3,"currency": accounts[5],"pofType": 1,"stfType": 16},{"eventTime": 149,"eventTimeWithEpochOffset": 26,"scheduleTime": 1532892062,"eventType": 12,"currency": accounts[0],"pofType": 8,"stfType": 18},{"eventTime": 15,"eventTimeWithEpochOffset": 951,"scheduleTime": 1461,"eventType": 12,"currency": accounts[5],"pofType": 12,"stfType": 9},{"eventTime": 161,"eventTimeWithEpochOffset": 901,"scheduleTime": 257,"eventType": 6,"currency": accounts[2],"pofType": 20,"stfType": 7},{"eventTime": 79,"eventTimeWithEpochOffset": 359,"scheduleTime": 149,"eventType": 10,"currency": accounts[3],"pofType": 2,"stfType": 12},{"eventTime": 1,"eventTimeWithEpochOffset": 1532892064,"scheduleTime": 129,"eventType": 0,"currency": accounts[7],"pofType": 4,"stfType": 12},{"eventTime": 146096,"eventTimeWithEpochOffset": 60,"scheduleTime": 951,"eventType": 15,"currency": accounts[9],"pofType": 10,"stfType": 19},{"eventTime": 3999,"eventTimeWithEpochOffset": 159,"scheduleTime": 20,"eventType": 5,"currency": accounts[7],"pofType": 17,"stfType": 14},{"eventTime": 360,"eventTimeWithEpochOffset": 28,"scheduleTime": 71,"eventType": 0,"currency": accounts[0],"pofType": 17,"stfType": 11},{"eventTime": 79,"eventTimeWithEpochOffset": 365,"scheduleTime": 4900,"eventType": 17,"currency": accounts[8],"pofType": 16,"stfType": 11},{"eventTime": 4,"eventTimeWithEpochOffset": 4899,"scheduleTime": 364,"eventType": 12,"currency": accounts[1],"pofType": 14,"stfType": 9},{"eventTime": 159,"eventTimeWithEpochOffset": 81,"scheduleTime": 1532892064,"eventType": 9,"currency": accounts[9],"pofType": 6,"stfType": 13},{"eventTime": 23,"eventTimeWithEpochOffset": 4,"scheduleTime": 366,"eventType": 20,"currency": accounts[4],"pofType": 5,"stfType": 15},{"eventTime": 161,"eventTimeWithEpochOffset": 96,"scheduleTime": 4801,"eventType": 19,"currency": accounts[6],"pofType": 8,"stfType": 13},{"eventTime": 65,"eventTimeWithEpochOffset": 1461002,"scheduleTime": 399,"eventType": 4,"currency": accounts[7],"pofType": 15,"stfType": 11},{"eventTime": 4001,"eventTimeWithEpochOffset": 1970,"scheduleTime": 96,"eventType": 10,"currency": accounts[9],"pofType": 9,"stfType": 2},{"eventTime": 91,"eventTimeWithEpochOffset": 1462,"scheduleTime": 150,"eventType": 13,"currency": accounts[6],"pofType": 16,"stfType": 19}], 89,{from: accounts[0]});
  });
  it('Should execute testquickSortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE],uint,uint)', async () => {
    let result = await contractProxyUtils.testquickSortProtoEventSchedule([{"eventTime": 9999,"eventTimeWithEpochOffset": 41,"scheduleTime": 146098,"eventType": 9,"currency": accounts[8],"pofType": 9,"stfType": 6},{"eventTime": 40,"eventTimeWithEpochOffset": 32074,"scheduleTime": 949,"eventType": 13,"currency": accounts[8],"pofType": 5,"stfType": 5},{"eventTime": 366,"eventTimeWithEpochOffset": 4001,"scheduleTime": 4001,"eventType": 18,"currency": accounts[4],"pofType": 18,"stfType": 8},{"eventTime": 139,"eventTimeWithEpochOffset": 366,"scheduleTime": 60,"eventType": 12,"currency": accounts[8],"pofType": 9,"stfType": 5},{"eventTime": 32076,"eventTimeWithEpochOffset": 79,"scheduleTime": 48,"eventType": 5,"currency": accounts[6],"pofType": 1,"stfType": 18},{"eventTime": 65,"eventTimeWithEpochOffset": 79,"scheduleTime": 367,"eventType": 18,"currency": accounts[8],"pofType": 1,"stfType": 17},{"eventTime": 1,"eventTimeWithEpochOffset": 95,"scheduleTime": 139,"eventType": 20,"currency": accounts[3],"pofType": 18,"stfType": 1},{"eventTime": 1461000,"eventTimeWithEpochOffset": 140,"scheduleTime": 90,"eventType": 12,"currency": accounts[3],"pofType": 9,"stfType": 8},{"eventTime": 1461002,"eventTimeWithEpochOffset": 17,"scheduleTime": 26,"eventType": 6,"currency": accounts[1],"pofType": 15,"stfType": 14},{"eventTime": 1,"eventTimeWithEpochOffset": 70,"scheduleTime": 2448,"eventType": 0,"currency": accounts[3],"pofType": 0,"stfType": 9},{"eventTime": 97,"eventTimeWithEpochOffset": 2014223714,"scheduleTime": 4901,"eventType": 5,"currency": accounts[9],"pofType": 5,"stfType": 7},{"eventTime": 65,"eventTimeWithEpochOffset": 96,"scheduleTime": 7,"eventType": 5,"currency": accounts[8],"pofType": 19,"stfType": 18},{"eventTime": 1532892064,"eventTimeWithEpochOffset": 366,"scheduleTime": 4801,"eventType": 14,"currency": accounts[5],"pofType": 1,"stfType": 11},{"eventTime": 86399,"eventTimeWithEpochOffset": 1337,"scheduleTime": 359,"eventType": 6,"currency": accounts[8],"pofType": 14,"stfType": 20},{"eventTime": 110,"eventTimeWithEpochOffset": 257,"scheduleTime": 1532892063,"eventType": 19,"currency": accounts[3],"pofType": 17,"stfType": 2},{"eventTime": 81,"eventTimeWithEpochOffset": 51,"scheduleTime": 2440588,"eventType": 8,"currency": accounts[9],"pofType": 4,"stfType": 1},{"eventTime": 368,"eventTimeWithEpochOffset": 901,"scheduleTime": 368,"eventType": 13,"currency": accounts[2],"pofType": 4,"stfType": 4},{"eventTime": 60,"eventTimeWithEpochOffset": 32075,"scheduleTime": 1532892062,"eventType": 12,"currency": accounts[0],"pofType": 7,"stfType": 6},{"eventTime": 60,"eventTimeWithEpochOffset": 399,"scheduleTime": 61,"eventType": 12,"currency": accounts[4],"pofType": 8,"stfType": 16},{"eventTime": 99,"eventTimeWithEpochOffset": 149,"scheduleTime": 59,"eventType": 19,"currency": accounts[7],"pofType": 19,"stfType": 5},{"eventTime": 32,"eventTimeWithEpochOffset": 15,"scheduleTime": 63,"eventType": 3,"currency": accounts[0],"pofType": 10,"stfType": 4},{"eventTime": 100,"eventTimeWithEpochOffset": 86399,"scheduleTime": 1461002,"eventType": 18,"currency": accounts[6],"pofType": 3,"stfType": 9},{"eventTime": 28,"eventTimeWithEpochOffset": 256,"scheduleTime": 12,"eventType": 20,"currency": accounts[6],"pofType": 7,"stfType": 17},{"eventTime": 4000,"eventTimeWithEpochOffset": 89,"scheduleTime": 2440588,"eventType": 8,"currency": accounts[9],"pofType": 0,"stfType": 16},{"eventTime": 364,"eventTimeWithEpochOffset": 2440587,"scheduleTime": 65,"eventType": 8,"currency": accounts[3],"pofType": 14,"stfType": 7},{"eventTime": 15,"eventTimeWithEpochOffset": 4001,"scheduleTime": 361,"eventType": 17,"currency": accounts[0],"pofType": 18,"stfType": 13},{"eventTime": 25,"eventTimeWithEpochOffset": 950,"scheduleTime": 25,"eventType": 4,"currency": accounts[1],"pofType": 9,"stfType": 4},{"eventTime": 4799,"eventTimeWithEpochOffset": 69,"scheduleTime": 2014223715,"eventType": 13,"currency": accounts[5],"pofType": 15,"stfType": 0},{"eventTime": 951,"eventTimeWithEpochOffset": 0,"scheduleTime": 1969,"eventType": 7,"currency": accounts[6],"pofType": 1,"stfType": 9},{"eventTime": 29,"eventTimeWithEpochOffset": 20,"scheduleTime": 17,"eventType": 5,"currency": accounts[9],"pofType": 1,"stfType": 19},{"eventTime": 7,"eventTimeWithEpochOffset": 366,"scheduleTime": 400,"eventType": 1,"currency": accounts[7],"pofType": 9,"stfType": 8},{"eventTime": 119,"eventTimeWithEpochOffset": 1461000,"scheduleTime": 1,"eventType": 16,"currency": accounts[8],"pofType": 2,"stfType": 11},{"eventTime": 51,"eventTimeWithEpochOffset": 49,"scheduleTime": 12,"eventType": 8,"currency": accounts[0],"pofType": 15,"stfType": 5},{"eventTime": 18,"eventTimeWithEpochOffset": 149,"scheduleTime": 12,"eventType": 18,"currency": accounts[9],"pofType": 0,"stfType": 15},{"eventTime": 50,"eventTimeWithEpochOffset": 2,"scheduleTime": 49,"eventType": 3,"currency": accounts[0],"pofType": 13,"stfType": 18},{"eventTime": 151,"eventTimeWithEpochOffset": 399,"scheduleTime": 79,"eventType": 3,"currency": accounts[2],"pofType": 16,"stfType": 2},{"eventTime": 4800,"eventTimeWithEpochOffset": 63,"scheduleTime": 24,"eventType": 0,"currency": accounts[7],"pofType": 5,"stfType": 9},{"eventTime": 254,"eventTimeWithEpochOffset": 4,"scheduleTime": 360,"eventType": 2,"currency": accounts[3],"pofType": 15,"stfType": 19},{"eventTime": 140,"eventTimeWithEpochOffset": 1461002,"scheduleTime": 91,"eventType": 7,"currency": accounts[1],"pofType": 6,"stfType": 20},{"eventTime": 146096,"eventTimeWithEpochOffset": 359,"scheduleTime": 63,"eventType": 0,"currency": accounts[0],"pofType": 9,"stfType": 9},{"eventTime": 367,"eventTimeWithEpochOffset": 4799,"scheduleTime": 366,"eventType": 6,"currency": accounts[0],"pofType": 3,"stfType": 17},{"eventTime": 28,"eventTimeWithEpochOffset": 360,"scheduleTime": 14,"eventType": 3,"currency": accounts[7],"pofType": 7,"stfType": 4},{"eventTime": 25,"eventTimeWithEpochOffset": 130,"scheduleTime": 3999,"eventType": 1,"currency": accounts[7],"pofType": 6,"stfType": 11},{"eventTime": 1,"eventTimeWithEpochOffset": 899,"scheduleTime": 86401,"eventType": 6,"currency": accounts[6],"pofType": 3,"stfType": 4},{"eventTime": 141,"eventTimeWithEpochOffset": 1462,"scheduleTime": 255,"eventType": 14,"currency": accounts[5],"pofType": 6,"stfType": 0},{"eventTime": 10001,"eventTimeWithEpochOffset": 1337,"scheduleTime": 1461000,"eventType": 15,"currency": accounts[8],"pofType": 0,"stfType": 19},{"eventTime": 149,"eventTimeWithEpochOffset": 1532892064,"scheduleTime": 49,"eventType": 15,"currency": accounts[2],"pofType": 0,"stfType": 15},{"eventTime": 2448,"eventTimeWithEpochOffset": 68569,"scheduleTime": 32076,"eventType": 17,"currency": accounts[9],"pofType": 3,"stfType": 17},{"eventTime": 5,"eventTimeWithEpochOffset": 0,"scheduleTime": 400,"eventType": 16,"currency": accounts[5],"pofType": 3,"stfType": 10},{"eventTime": 146096,"eventTimeWithEpochOffset": 130,"scheduleTime": 368,"eventType": 17,"currency": accounts[4],"pofType": 20,"stfType": 9},{"eventTime": 1460,"eventTimeWithEpochOffset": 59,"scheduleTime": 2446,"eventType": 8,"currency": accounts[2],"pofType": 10,"stfType": 12},{"eventTime": 2448,"eventTimeWithEpochOffset": 1336,"scheduleTime": 79,"eventType": 15,"currency": accounts[0],"pofType": 1,"stfType": 16},{"eventTime": 110,"eventTimeWithEpochOffset": 150,"scheduleTime": 4799,"eventType": 0,"currency": accounts[6],"pofType": 11,"stfType": 0},{"eventTime": 1,"eventTimeWithEpochOffset": 257,"scheduleTime": 1970,"eventType": 9,"currency": accounts[1],"pofType": 4,"stfType": 0},{"eventTime": 2440587,"eventTimeWithEpochOffset": 899,"scheduleTime": 65,"eventType": 10,"currency": accounts[5],"pofType": 20,"stfType": 17},{"eventTime": 70,"eventTimeWithEpochOffset": 60,"scheduleTime": 366,"eventType": 11,"currency": accounts[4],"pofType": 16,"stfType": 15},{"eventTime": 50,"eventTimeWithEpochOffset": 96,"scheduleTime": 400,"eventType": 18,"currency": accounts[3],"pofType": 16,"stfType": 7},{"eventTime": 101,"eventTimeWithEpochOffset": 40,"scheduleTime": 1461002,"eventType": 7,"currency": accounts[2],"pofType": 18,"stfType": 4},{"eventTime": 60,"eventTimeWithEpochOffset": 367,"scheduleTime": 1338,"eventType": 14,"currency": accounts[9],"pofType": 0,"stfType": 10},{"eventTime": 26,"eventTimeWithEpochOffset": 2,"scheduleTime": 5,"eventType": 1,"currency": accounts[4],"pofType": 4,"stfType": 2},{"eventTime": 401,"eventTimeWithEpochOffset": 51,"scheduleTime": 1,"eventType": 20,"currency": accounts[4],"pofType": 8,"stfType": 5},{"eventTime": 3,"eventTimeWithEpochOffset": 63,"scheduleTime": 100,"eventType": 12,"currency": accounts[5],"pofType": 7,"stfType": 8},{"eventTime": 146098,"eventTimeWithEpochOffset": 110,"scheduleTime": 96,"eventType": 7,"currency": accounts[9],"pofType": 18,"stfType": 13},{"eventTime": 4899,"eventTimeWithEpochOffset": 1461000,"scheduleTime": 1338,"eventType": 5,"currency": accounts[4],"pofType": 2,"stfType": 2}], 119, 1461002,{from: accounts[0]});
  });
  it('Should execute testisInPeriod(uint256,uint256,uint256) WHEN startTimestamp<timestamp,endTimestamp>=timestamp', async () => {
    let result = await contractProxyUtils.testisInPeriod(70, 16, 364,{from: accounts[0]});
  });
  it('Should execute testisInPeriod(uint256,uint256,uint256) WHEN startTimestamp>=timestamp', async () => {
    let result = await contractProxyUtils.testisInPeriod(32, 360, 80,{from: accounts[0]});
  });
});
