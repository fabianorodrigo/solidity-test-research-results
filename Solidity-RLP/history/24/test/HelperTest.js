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
    let result = await contractHelper.isList([178,98,17,241,4,214,49,229,177,203,241,4,123,229,162,89,41,143,26,32,182,227,231,148,237,80,4,12,65,91,38,158],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([131,11,252,190,109,52,179,30,255,224,47,109,140,250,101,11,45,130,214,82,178,30,37,174,109,248,62,156,193,34,113,148],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([22,198,35,219,41,192,73,146,205,40,113,112,5,187,202,60,241,133,255,142,166,152,191,66,151,55,147,83,78,190,11,14],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([230,241,109,132,122,133,79,118,35,241,124,216,48,219,141,199,103,67,147,138,111,85,95,128,87,193,20,9,143,215,50,47],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([186,149,115,34,90,136,230,70,211,65,43,194,58,90,76,196,18,41,120,101,12,196,166,141,89,33,141,54,214,243,35,221],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([122,204,0,123,133,62,44,242,156,248,15,50,95,60,129,57,248,12,45,231,6,162,178,167,66,182,40,182,97,197,68,250],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([95,27,229,147,37,13,55,166,203,213,187,169,228,208,175,226,2,62,63,12,142,24,171,169,221,192,26,117,228,157,44,218],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([184,69,225,244,225,124,169,61,208,221,138,130,9,156,121,224,196,30,51,12,180,81,47,155,33,55,102,16,221,82,29,36],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([215,48,42,150,102,153,77,229,143,215,52,62,192,159,95,167,126,10,86,205,180,226,232,194,218,251,111,44,82,29,32,19],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([53,15,44,141,53,100,14,92,74,199,176,35,171,125,34,14,34,41,46,18,66,155,7,250,196,229,3,168,166,65,27,3],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([115,193,84,29,174,154,28,53,236,163,55,128,143,35,251,236,186,97,16,114,147,91,218,116,225,16,39,20,218,252,20,35],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([21,213,152,214,240,188,156,147,195,143,167,13,180,240,130,99,213,37,223,225,173,91,214,199,128,71,29,239,247,245,219,127],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([5,191,108,164,208,234,115,109,192,127,219,156,116,195,133,81,196,6,252,95,163,87,84,33,179,81,78,8,51,170,237,163],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([90,184,110,216,172,238,134,80,218,186,64,252,97,202,250,23,157,31,149,148,134,158,134,246,7,163,160,121,50,90,222,121],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([57,139,120,188,85,178,32,234,216,246,208,178,102,114,88,209,243,143,45,9,220,34,188,33,135,194,188,226,192,123,103,204],{from: accounts[0]});
  });
});
