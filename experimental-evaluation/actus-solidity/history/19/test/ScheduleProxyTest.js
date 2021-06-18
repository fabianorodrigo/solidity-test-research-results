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
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 110,"p": 0,"s": 1,"isSet": false}, 27, 368,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 79,"p": 1,"s": 1,"isSet": true}, 146096, 150,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 15,"p": 2,"s": 1,"isSet": false}, 14, 140,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 59,"p": 3,"s": 1,"isSet": false}, 949, 161,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 31,"p": 4,"s": 1,"isSet": true}, 6, 121,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 39,"p": 5,"s": 1,"isSet": true}, 10000, 86399,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 32074,"p": 99999,"s": 0,"isSet": false}, 361, 130,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(25, 4799, {"i": 2014223715,"p": 0,"s": 1,"isSet": false}, 1, false, 146098, 101,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(119, 900, {"i": 255,"p": 0,"s": 1,"isSet": false}, 1, true, 13, 900,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime==true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(101, 29, {"i": 1336,"p": 5,"s": 0,"isSet": false}, 0, true, 29, 48,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(80, 141, {"i": 32,"p": 4,"s": 1,"isSet": false}, 0, false, 39, 146096,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(51, 399, {"i": 32076,"p": 5,"s": 1,"isSet": false}, 0, false, 65, 68,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(68570, 66, {"i": 64,"p": 4,"s": 1,"isSet": true}, 1, true, 26, 4000,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(24, 14, {"i": 5,"p": 2,"s": 0,"isSet": true}, 1, true, 71, 159,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(149, 4001, {"i": 951,"p": 3,"s": 0,"isSet": true}, 0, true, 32075, 950,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(146098, 120, {"i": 60,"p": 5,"s": 0,"isSet": true}, 1, false, 59, 364,{from: accounts[0]});
  });
});
