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
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 6,"p": 0,"s": 0,"isSet": false}, 100, 255,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 161,"p": 1,"s": 0,"isSet": false}, 28, 10,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 2440588,"p": 2,"s": 1,"isSet": true}, 1971, 51,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 69,"p": 3,"s": 1,"isSet": true}, 901, 1461002,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 8,"p": 4,"s": 1,"isSet": true}, 1, 1532892063,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 68569,"p": 5,"s": 0,"isSet": false}, 359, 366,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 4900,"p": 99999,"s": 1,"isSet": false}, 255, 9999,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(254, 28, {"i": 49,"p": 3,"s": 0,"isSet": false}, 1, false, 400, 16,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(365, 1461002, {"i": 40,"p": 3,"s": 0,"isSet": false}, 0, false, 20, 18,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime==true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(1971, 1969, {"i": 2440587,"p": 0,"s": 0,"isSet": false}, 1, true, 950, 12,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(27, 23, {"i": 32076,"p": 4,"s": 1,"isSet": false}, 0, false, 256, 254,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(368, 401, {"i": 257,"p": 2,"s": 1,"isSet": false}, 1, false, 120, 68568,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(2447, 5, {"i": 70,"p": 0,"s": 1,"isSet": true}, 0, false, 59, 900,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(950, 86400, {"i": 60,"p": 5,"s": 1,"isSet": true}, 1, true, 399, 2440588,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(119, 86401, {"i": 129,"p": 3,"s": 1,"isSet": false}, 1, true, 23, 40,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(12, 95, {"i": 1336,"p": 4,"s": 1,"isSet": true}, 0, false, 5, 361,{from: accounts[0]});
  });
});
