const truffleAssert = require('truffle-assertions');
const Helper = artifacts.require("Helper");
const RLPReader = artifacts.require("RLPReader");
const ProxyRLPReader = artifacts.require("ProxyRLPReader");

contract("Helper",(accounts)=>{
  let trace = false;
  let contractRLPReader = null;
  let contractHelper = null;
  beforeEach(async () => {
    contractRLPReader = await RLPReader.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RLPReader.new({from: accounts[0]}');
    Helper.link("RLPReader",contractRLPReader.address);
    contractHelper = await Helper.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Helper.new({from: accounts[0]}');
  });
  
  it('Should execute isList(bytes)', async () => {
    let result = await contractHelper.isList([240,234,147,90,189,154,47,253,26,181,13,135,213,44,11,195,49,250,76,37,48,178,108,133,169,229,152,45,179,77,175,164],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([28,218,10,79,172,18,224,108,8,101,255,150,40,2,229,126,243,215,91,241,146,233,171,228,140,174,99,245,67,120,1,60],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([243,159,136,38,68,181,166,69,74,246,164,82,14,52,186,33,178,146,220,164,50,207,26,252,203,209,95,213,157,195,86,228],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([19,87,55,18,183,194,198,252,244,163,204,68,233,106,144,193,52,18,160,88,82,110,59,232,99,159,78,220,110,168,111,32],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([44,15,16,188,104,171,247,48,145,238,154,92,92,244,77,82,122,103,148,152,22,28,96,98,33,11,254,191,126,83,182,84],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([247,159,193,90,68,151,250,84,76,12,43,223,107,30,221,85,150,6,183,255,125,182,88,177,3,1,177,9,45,60,218,141],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([33,176,37,57,203,120,231,202,82,155,232,35,150,8,107,127,42,213,110,105,7,193,233,60,61,185,149,142,66,249,95,45],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([190,50,170,173,229,253,193,71,247,149,102,79,149,158,83,242,75,121,162,51,235,40,249,1,227,71,139,189,189,49,172,26],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([48,158,226,190,7,3,148,78,109,153,59,224,71,113,60,244,73,233,240,114,222,193,200,112,10,100,206,183,64,128,228,198],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([233,35,194,165,116,156,200,168,4,95,172,214,83,51,152,122,245,244,49,28,192,241,35,161,123,134,109,200,67,158,175,21],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([149,138,51,252,122,199,216,228,58,164,148,5,244,29,165,32,23,124,157,119,105,5,120,71,28,127,10,255,85,130,99,119],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([115,148,35,118,109,252,202,150,76,239,134,243,172,213,131,207,21,95,222,60,163,243,120,234,49,39,0,73,59,4,159,122],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([138,251,65,0,93,214,154,159,129,150,228,201,7,81,153,79,131,21,30,16,243,205,25,88,89,43,2,219,20,37,72,164],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([104,87,142,91,75,99,159,95,48,211,140,15,13,139,124,154,86,143,183,7,36,51,120,170,144,49,180,29,149,249,109,131],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([140,210,161,234,56,174,209,144,241,42,183,125,143,182,6,124,207,160,17,57,171,103,3,158,225,232,14,97,59,106,54,216],{from: accounts[0]});
  });
});
