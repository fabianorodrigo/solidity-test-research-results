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
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 16,"p": 0,"s": 1,"isSet": false}, 254, 68569,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.W', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 21,"p": 1,"s": 0,"isSet": false}, 32074, 1532892063,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.M', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 160,"p": 2,"s": 1,"isSet": true}, 141, 9999,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Q', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 129,"p": 3,"s": 0,"isSet": false}, 99, 949,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.H', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 2440589,"p": 4,"s": 1,"isSet": true}, 70, 8,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p==Definitions.P.Y', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 256,"p": 5,"s": 1,"isSet": false}, 86399, 4801,{from: accounts[0]});
  });
  it('Should execute testgetNextCycleDate(Definitions.IPS,uint256,uint256) WHEN cycle.p!=Definitions.P.Y,cycle.p!=Definitions.P.H,cycle.p!=Definitions.P.Q,cycle.p!=Definitions.P.M,cycle.p!=Definitions.P.W,cycle.p!=Definitions.P.D', async () => {
    let result = await contractProxySchedule.testgetNextCycleDate({"i": 14,"p": 99999,"s": 0,"isSet": true}, 32075, 59,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(1338, 99, {"i": 51,"p": 4,"s": 1,"isSet": false}, 0, true, 949, 359,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(16, 2014223715, {"i": 14,"p": 1,"s": 1,"isSet": false}, 0, true, 23, 3999,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime==true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(1970, 150, {"i": 901,"p": 3,"s": 1,"isSet": false}, 0, true, 139, 2014223715,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,FunctionCall==true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(28, 139, {"i": 91,"p": 0,"s": 1,"isSet": false}, 0, false, 60, 3999,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,cycle.isSet==false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(71, 91, {"i": 2447,"p": 4,"s": 0,"isSet": false}, 1, false, 32075, 257,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(2014223716, 4000, {"i": 80,"p": 1,"s": 0,"isSet": true}, 1, true, 401, 79,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall==true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(4900, 4901, {"i": 2446,"p": 5,"s": 1,"isSet": true}, 1, true, 364, 61,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN FunctionCall!=true,addEndTime==true', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(3999, 900, {"i": 400,"p": 2,"s": 0,"isSet": false}, 1, true, 97, 140,{from: accounts[0]});
  });
  it('Should execute testcomputeDatesFromCycleSegment(uint256,uint256,Definitions.IPS,EndOfMonthConvention,bool,uint256,uint256) WHEN addEndTime!=true,cycle.isSet!=false', async () => {
    let result = await contractProxySchedule.testcomputeDatesFromCycleSegment(364, 4899, {"i": 64,"p": 0,"s": 1,"isSet": true}, 1, false, 64, 60,{from: accounts[0]});
  });
});
