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
const ProxyCore = artifacts.require("ProxyCore");

contract("contractProxyCore",(accounts)=>{
    let contractProxyCore = null;
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
      contractProxyCore = await ProxyCore.new({ from: accounts[0] });
});
  
  it('Should execute testsignum(int) WHEN value>0', async () => {
    let result = await contractProxyCore.testsignum(32076,{from: accounts[0]});
  });
  it('Should execute testsignum(int) WHEN value<0', async () => {
    let result = await contractProxyCore.testsignum(-1,{from: accounts[0]});
  });
  it('Should execute testsignum(int) WHEN value>=0', async () => {
    let result = await contractProxyCore.testsignum(10001,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.IED', async () => {
    let result = await contractProxyCore.testgetEpochOffset(3,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.IED', async () => {
    let result = await contractProxyCore.testgetEpochOffset(15,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.IP', async () => {
    let result = await contractProxyCore.testgetEpochOffset(4,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IED', async () => {
    let result = await contractProxyCore.testgetEpochOffset(8,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.IPCI', async () => {
    let result = await contractProxyCore.testgetEpochOffset(11,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP', async () => {
    let result = await contractProxyCore.testgetEpochOffset(9,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.FP', async () => {
    let result = await contractProxyCore.testgetEpochOffset(8,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI', async () => {
    let result = await contractProxyCore.testgetEpochOffset(1,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.DV', async () => {
    let result = await contractProxyCore.testgetEpochOffset(16,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP', async () => {
    let result = await contractProxyCore.testgetEpochOffset(6,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.PR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(5,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV', async () => {
    let result = await contractProxyCore.testgetEpochOffset(9,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.MR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(17,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(13,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.RRY', async () => {
    let result = await contractProxyCore.testgetEpochOffset(13,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(10,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.RR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(12,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY', async () => {
    let result = await contractProxyCore.testgetEpochOffset(9,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.SC', async () => {
    let result = await contractProxyCore.testgetEpochOffset(14,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR', async () => {
    let result = await contractProxyCore.testgetEpochOffset(1,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.IPCB', async () => {
    let result = await contractProxyCore.testgetEpochOffset(18,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC', async () => {
    let result = await contractProxyCore.testgetEpochOffset(9,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.PRD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(9,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB', async () => {
    let result = await contractProxyCore.testgetEpochOffset(7,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.TD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(10,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.TD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(2,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.STD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(19,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.STD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.TD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(1,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.MD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(1,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.MD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.TD,eventType!=Definitions.EventType.STD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(6,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.SD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(0,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.SD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.TD,eventType!=Definitions.EventType.STD,eventType!=Definitions.EventType.MD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(2,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.AD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(2,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.AD,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.TD,eventType!=Definitions.EventType.STD,eventType!=Definitions.EventType.MD,eventType!=Definitions.EventType.SD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(15,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType==Definitions.EventType.Child', async () => {
    let result = await contractProxyCore.testgetEpochOffset(20,{from: accounts[0]});
  });
  it('Should execute testgetEpochOffset(EventType) WHEN eventType!=Definitions.EventType.Child,eventType!=Definitions.EventType.IED,eventType!=Definitions.EventType.IP,eventType!=Definitions.EventType.IPCI,eventType!=Definitions.EventType.FP,eventType!=Definitions.EventType.DV,eventType!=Definitions.EventType.PR,eventType!=Definitions.EventType.MR,eventType!=Definitions.EventType.RRY,eventType!=Definitions.EventType.RR,eventType!=Definitions.EventType.SC,eventType!=Definitions.EventType.IPCB,eventType!=Definitions.EventType.PRD,eventType!=Definitions.EventType.TD,eventType!=Definitions.EventType.STD,eventType!=Definitions.EventType.MD,eventType!=Definitions.EventType.SD,eventType!=Definitions.EventType.AD', async () => {
    let result = await contractProxyCore.testgetEpochOffset(7,{from: accounts[0]});
  });
});
