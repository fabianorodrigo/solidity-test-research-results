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

contract("contractProxySchedule",(accounts)=>{
    let contractProxySchedule = null;
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
      ProxySchedule.link("BokkyPooBahsDateTimeLibrary",contractBokkyPooBahsDateTimeLibrary.address);
    contractProxySchedule = await ProxySchedule.new({ from: accounts[0] });
});
  
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.D', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 1969,"p": 0,"s": 1,"isSet": true}, 2, 901,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 2014223714,"p": 1,"s": 0,"isSet": true}, 399, 0,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 59,"p": 2,"s": 1,"isSet": true}, 96, 12,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 32076,"p": 3,"s": 1,"isSet": true}, 141, 86400,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 13,"p": 4,"s": 1,"isSet": false}, 28, 1337,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 2447,"p": 5,"s": 0,"isSet": false}, 61, 96,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 50,"p": 99999,"s": 1,"isSet": true}, 10001, 1461000,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(97, 10001, {"i": 69,"p": 5,"s": 0,"isSet": false}, 1, true, 80, 1971,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(4801, 68569, {"i": 146098,"p": 1,"s": 0,"isSet": false}, 1, true, 255, 32,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime==true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(159, 91, {"i": 149,"p": 4,"s": 1,"isSet": false}, 1, true, 97, 4801,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(255, 86400, {"i": 86400,"p": 5,"s": 1,"isSet": false}, 0, false, 146097, 86400,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(1969, 7, {"i": 89,"p": 0,"s": 0,"isSet": false}, 1, false, 110, 16,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(86400, 79, {"i": 97,"p": 5,"s": 0,"isSet": true}, 0, false, 4, 950,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(360, 1971, {"i": 401,"p": 2,"s": 1,"isSet": false}, 0, true, 950, 254,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(151, 7, {"i": 1532892063,"p": 0,"s": 0,"isSet": true}, 0, true, 5, 17,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(159, 96, {"i": 48,"p": 4,"s": 1,"isSet": true}, 0, false, 0, 25,{from: accounts[0]});
  });
});
