const truffleAssert = require('truffle-assertions');
const Helper = artifacts.require("Helper");
const RLPReader = artifacts.require("RLPReader");
const ProxyRLPReader = artifacts.require("ProxyRLPReader");

contract("contractProxyRLPReader",(accounts)=>{
    let contractProxyRLPReader = null;
  let trace = false;
  let contractRLPReader = null;
  let contractHelper = null;
  beforeEach(async () => {
    contractRLPReader = await RLPReader.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RLPReader.new({from: accounts[0]}');
    Helper.link("RLPReader",contractRLPReader.address);
    contractHelper = await Helper.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Helper.new({from: accounts[0]}');
      ProxyRLPReader.link('RLPReader', contractRLPReader.address);
    contractProxyRLPReader = await ProxyRLPReader.new({ from: accounts[0] });
});
  
  it('Should execute testtoRlpItem(bytes)', async () => {
    let result = await contractProxyRLPReader.testtoRlpItem([117,217,36,39,233,222,105,185,6,73,177,202,211,217,186,64,5,142,169,82,41,213,48,138,149,253,148,130,249,86,191,59],{from: accounts[0]});
  });
  it('Should execute testrlpLen(RLPReader.RLPItem)', async () => {
    let result = await contractProxyRLPReader.testrlpLen({"len": 1,"memPtr": 2},{from: accounts[0]});
  });
  it('Should execute testpayloadLen(RLPReader.RLPItem)', async () => {
    let result = await contractProxyRLPReader.testpayloadLen({"len": 255,"memPtr": 34},{from: accounts[0]});
  });
  it('Should execute testtoList(RLPReader.RLPItem)', async () => {
    let result = await contractProxyRLPReader.testtoList({"len": 20,"memPtr": 255},{from: accounts[0]});
  });
  it('Should execute testisList(RLPReader.RLPItem) WHEN item.len==0', async () => {
    let result = await contractProxyRLPReader.testisList({"len": 0,"memPtr": 20},{from: accounts[0]});
  });
  it('Should execute testisList(RLPReader.RLPItem) WHEN item.len!=0', async () => {
    let result = await contractProxyRLPReader.testisList({"len": 34,"memPtr": 257},{from: accounts[0]});
  });
  it('Should execute testtoRlpBytes(RLPReader.RLPItem)', async () => {
    let result = await contractProxyRLPReader.testtoRlpBytes({"len": 2,"memPtr": 22},{from: accounts[0]});
  });
  it('Should execute testtoBoolean(RLPReader.RLPItem) WHEN item.len==1', async () => {
    let result = await contractProxyRLPReader.testtoBoolean({"len": 1,"memPtr": 32},{from: accounts[0]});
  });
  it('Should fail testtoBoolean(RLPReader.RLPItem) when NOT comply with: item.len == 1', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoBoolean({len : 2,memPtr : 32},{from: accounts[0]}),'revert');
  });
  it('Should execute testtoAddress(RLPReader.RLPItem) WHEN item.len==21', async () => {
    let result = await contractProxyRLPReader.testtoAddress({"len": 21,"memPtr": 257},{from: accounts[0]});
  });
  it('Should fail testtoAddress(RLPReader.RLPItem) when NOT comply with: item.len == 21', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoAddress({len : 22,memPtr : 257},{from: accounts[0]}),'revert');
  });
  it('Should execute testtoUint(RLPReader.RLPItem) WHEN item.len>0,item.len<=33', async () => {
    let result = await contractProxyRLPReader.testtoUint({"len": 20,"memPtr": 34},{from: accounts[0]});
  });
  it('Should fail testtoUint(RLPReader.RLPItem) when NOT comply with: item.len > 0', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoUint({len : 0,memPtr : 34},{from: accounts[0]}),'revert');
  });
  it('Should fail testtoUint(RLPReader.RLPItem) when NOT comply with: item.len <= 33', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoUint({len : 34,memPtr : 34},{from: accounts[0]}),'revert');
  });
  it('Should execute testtoUintStrict(RLPReader.RLPItem) WHEN item.len==33', async () => {
    let result = await contractProxyRLPReader.testtoUintStrict({"len": 33,"memPtr": 33},{from: accounts[0]});
  });
  it('Should fail testtoUintStrict(RLPReader.RLPItem) when NOT comply with: item.len == 33', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoUintStrict({len : 34,memPtr : 33},{from: accounts[0]}),'revert');
  });
  it('Should execute testtoBytes(RLPReader.RLPItem) WHEN item.len>0', async () => {
    let result = await contractProxyRLPReader.testtoBytes({"len": 3,"memPtr": 3},{from: accounts[0]});
  });
  it('Should fail testtoBytes(RLPReader.RLPItem) when NOT comply with: item.len > 0', async () => {
    let result = await truffleAssert.fails(contractProxyRLPReader.testtoBytes({len : 0,memPtr : 3},{from: accounts[0]}),'revert');
  });
});
