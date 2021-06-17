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
    let result = await contractHelper.isList([8,115,104,6,210,210,121,89,3,218,209,49,191,176,89,124,207,142,127,116,205,204,138,255,242,127,204,253,101,69,106,33],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([104,193,252,97,123,185,31,215,57,116,40,19,191,53,141,240,112,154,154,104,210,129,71,121,176,246,148,140,212,205,178,131],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([191,127,222,48,222,234,209,232,185,254,10,226,35,62,172,211,176,154,231,119,29,191,66,200,125,89,189,18,145,12,123,34],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([158,6,55,234,16,9,245,206,33,134,123,228,192,71,148,2,143,200,47,210,46,58,76,214,73,196,91,134,17,187,177,180],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([86,33,188,230,74,91,153,10,159,158,35,142,70,76,109,47,74,148,194,67,138,40,4,51,163,232,58,22,89,120,182,42],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([113,204,71,216,61,100,12,190,174,67,149,123,213,128,110,0,10,8,131,215,76,254,42,235,166,241,83,75,175,42,102,97],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([211,230,107,194,38,215,150,13,150,179,165,212,154,71,224,235,219,158,216,69,31,159,85,231,214,22,246,98,137,86,181,143],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([85,131,64,79,9,171,192,43,155,143,1,246,62,149,199,43,49,143,193,167,45,93,213,71,71,143,100,79,58,190,171,135],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([144,191,51,165,32,1,160,198,210,156,147,83,155,238,217,142,73,230,208,81,206,152,91,177,117,184,174,150,213,206,45,151],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([65,95,251,129,130,145,217,209,117,63,36,185,117,55,104,230,101,235,181,236,195,161,214,12,206,233,130,76,102,146,232,116],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([142,60,226,239,198,245,225,63,233,13,128,144,42,204,64,148,195,232,70,240,59,214,133,210,91,188,45,253,243,199,179,139],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([24,243,69,240,163,28,98,246,186,8,174,114,76,255,4,88,158,9,134,208,27,241,167,45,171,244,120,80,238,13,183,233],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([217,191,125,192,162,105,130,162,47,26,85,52,225,174,202,192,85,83,182,67,248,246,41,237,43,47,26,219,87,100,46,53],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([54,252,108,66,77,24,28,217,45,176,67,142,234,154,33,203,105,246,166,195,156,163,195,216,133,117,242,218,197,50,102,228],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([105,233,122,143,201,193,141,83,207,9,113,221,123,206,195,140,42,227,151,41,60,86,99,162,220,118,105,199,208,252,59,167],{from: accounts[0]});
  });
});
