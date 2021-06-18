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
    let result = await contractHelper.isList([181,29,88,177,227,244,124,223,187,6,51,74,151,84,185,162,161,158,8,67,190,137,58,40,94,57,169,35,15,133,106,42],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([34,117,142,213,209,103,244,144,252,240,3,148,40,133,229,97,205,130,92,4,169,91,129,123,129,112,137,223,31,63,130,15],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([134,125,226,160,81,144,98,86,131,15,216,115,1,185,123,127,85,110,134,146,148,55,202,65,0,25,162,2,151,25,188,94],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([180,55,72,38,132,81,69,217,121,70,9,89,91,227,110,169,70,232,8,94,229,154,188,181,137,229,110,254,106,223,231,193],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([15,172,208,185,8,25,58,7,100,18,13,145,56,68,10,169,191,168,18,84,0,120,58,158,168,246,125,139,118,119,212,237],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([52,243,80,33,29,200,190,141,198,193,94,146,121,187,242,167,240,90,41,144,150,77,8,226,210,79,213,68,14,152,99,3],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([138,110,179,130,231,128,98,174,148,31,174,19,203,4,0,61,20,238,250,98,241,246,167,103,159,194,154,251,238,143,112,218],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([105,238,126,23,22,227,169,65,182,173,73,37,51,112,214,227,241,104,187,197,7,153,34,173,2,227,85,160,159,185,197,209],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([71,3,196,5,77,67,178,49,167,161,255,21,75,185,61,85,160,231,188,197,217,194,196,198,6,158,139,141,139,81,14,1],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([187,114,46,230,119,73,2,95,119,120,172,31,11,64,184,219,115,97,57,46,230,65,115,48,85,119,245,162,121,226,41,47],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([100,171,1,128,169,204,98,15,125,63,7,79,188,202,132,91,158,197,22,239,32,223,150,247,199,218,175,106,121,141,35,97],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([25,40,175,177,67,88,107,141,188,234,203,194,34,150,248,157,186,127,36,61,120,248,54,243,103,154,126,23,187,5,96,105],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([194,36,240,179,98,43,105,193,51,213,75,8,120,66,89,175,88,230,138,215,220,250,53,216,5,234,18,71,136,178,56,16],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([114,156,46,112,190,47,178,91,246,132,177,179,196,14,40,128,45,147,104,53,100,208,15,245,10,66,122,208,187,59,101,94],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([169,30,231,232,140,142,127,111,224,81,25,222,103,91,102,18,45,181,45,199,10,54,228,6,99,184,177,84,51,166,197,247],{from: accounts[0]});
  });
});
