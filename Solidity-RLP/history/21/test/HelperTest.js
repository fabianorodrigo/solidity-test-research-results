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
    let result = await contractHelper.isList([231,121,149,197,50,232,35,163,146,63,120,30,10,197,240,2,154,194,89,109,186,213,146,203,150,205,4,183,212,36,113,172],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([87,36,123,249,204,134,149,169,37,62,32,131,9,235,41,31,16,179,70,190,136,53,17,243,56,246,201,129,222,119,5,209],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([214,126,7,102,139,55,127,198,77,46,207,15,77,250,193,205,23,172,18,41,235,113,182,222,245,184,128,108,68,88,198,173],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([215,102,9,182,110,143,36,95,146,142,192,236,78,148,245,162,43,62,205,219,215,196,158,204,166,191,83,83,225,108,249,164],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([244,82,92,192,185,3,245,7,14,23,216,196,207,175,139,88,3,140,212,119,85,217,231,80,150,181,105,13,203,114,177,174],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([145,213,138,9,202,185,108,0,123,246,232,38,75,231,45,73,132,188,40,215,0,179,30,216,217,210,48,160,194,182,251,97],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([29,40,112,252,49,55,208,19,81,91,24,2,164,208,110,75,228,143,62,186,95,42,228,14,242,83,93,6,12,62,16,145],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([231,100,171,77,206,232,255,236,204,146,83,163,97,132,116,196,130,94,132,216,118,7,140,205,110,25,101,112,47,3,14,155],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([156,213,229,177,91,138,37,147,231,187,220,239,183,182,176,125,84,129,18,246,28,128,46,30,103,125,49,22,146,38,146,191],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([138,103,68,27,185,172,10,33,209,187,131,86,228,246,165,121,107,11,2,112,191,162,234,15,143,118,129,243,167,203,237,76],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([172,163,167,46,103,87,230,198,2,12,104,181,191,138,228,44,129,181,190,100,190,215,83,120,145,6,24,11,33,164,0,32],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([111,126,241,36,78,93,90,145,48,21,76,166,157,195,151,100,28,231,77,121,152,105,76,41,164,240,57,238,213,167,124,112],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([30,30,233,159,203,15,18,43,31,194,223,180,128,83,247,190,189,114,38,224,125,0,31,217,66,105,51,34,89,225,93,113],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([252,143,212,49,117,188,46,103,254,153,173,238,126,75,60,252,210,219,213,123,220,16,136,161,201,88,225,119,231,109,187,156],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([160,189,60,143,199,253,112,222,241,47,44,104,52,235,239,193,40,252,36,131,78,251,252,174,56,110,150,248,42,133,40,212],{from: accounts[0]});
  });
});
