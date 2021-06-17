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
    let result = await contractHelper.isList([88,240,229,195,208,16,84,156,121,163,134,153,79,154,196,51,241,202,172,110,26,170,91,175,165,54,50,193,62,161,12,222],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([207,83,251,200,165,151,232,187,203,120,215,126,98,193,155,42,125,95,118,242,34,150,161,231,89,30,234,132,15,80,143,189],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([197,33,150,239,141,246,175,76,56,7,146,46,186,253,52,71,52,204,36,90,220,255,3,170,174,212,84,54,240,7,152,43],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([35,128,254,147,93,33,22,188,89,62,206,93,156,238,189,23,98,21,142,117,52,60,42,136,201,89,7,219,150,232,114,84],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([45,248,1,98,239,163,239,197,54,66,227,235,197,255,203,105,98,50,143,4,225,115,204,213,143,31,229,187,70,136,41,219],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([157,253,125,11,51,37,148,62,226,5,0,68,65,31,85,58,242,200,72,253,126,39,158,197,99,56,210,59,196,165,228,223],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([248,20,226,116,48,178,131,124,153,98,49,77,196,237,234,119,85,213,28,42,93,183,166,181,208,167,213,210,101,10,39,97],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([39,72,15,47,121,7,175,121,114,198,88,157,29,237,163,172,7,191,118,230,133,45,105,94,226,213,199,59,11,82,13,115],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([75,196,64,102,136,212,242,37,107,14,191,162,241,47,0,66,33,9,118,247,54,144,185,104,127,53,194,240,17,37,99,68],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([166,139,18,180,160,2,132,224,76,135,147,222,180,153,86,251,46,40,60,26,216,150,72,141,54,112,206,20,226,226,166,183],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([81,190,127,155,239,206,127,171,0,195,241,36,67,98,174,161,163,106,177,63,237,211,109,191,8,149,211,73,127,78,167,85],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([99,228,14,31,66,135,134,212,203,123,52,192,113,206,37,203,93,129,196,175,95,87,212,63,69,126,109,213,84,77,120,190],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([199,5,123,3,100,93,236,24,222,115,255,104,194,172,221,231,128,16,221,115,101,31,218,24,117,110,136,209,15,249,158,8],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([38,190,45,13,6,185,225,205,55,131,135,48,63,56,105,255,246,66,87,249,129,135,54,181,191,215,66,165,190,82,210,110],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([189,192,173,189,66,67,171,85,155,44,246,26,225,248,93,191,69,222,249,79,42,164,240,34,33,187,27,90,213,24,229,156],{from: accounts[0]});
  });
});
