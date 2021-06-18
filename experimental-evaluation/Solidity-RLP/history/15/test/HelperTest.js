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
    let result = await contractHelper.isList([137,123,137,182,239,234,161,146,62,149,248,97,4,92,201,66,54,177,230,157,175,0,127,106,62,5,155,246,144,0,171,205],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([104,81,60,189,177,53,26,128,159,56,118,205,185,73,81,35,88,155,45,236,149,210,28,239,99,130,122,136,212,78,21,215],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([180,52,61,166,14,225,46,173,39,155,17,97,189,252,47,4,58,246,51,185,157,233,98,87,205,5,183,193,117,3,146,167],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([61,171,22,222,213,234,70,51,201,119,164,36,158,83,183,6,124,204,186,137,201,18,141,95,237,217,205,66,42,248,162,135],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([203,119,189,13,76,222,80,220,99,41,231,26,252,136,204,100,109,142,25,8,49,146,234,74,29,74,48,209,243,150,167,27],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([114,162,211,23,232,224,197,179,185,140,131,157,53,110,195,49,211,15,75,113,117,68,55,62,78,61,211,115,236,118,165,219],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([242,214,7,11,135,84,134,133,141,136,201,103,109,66,246,169,95,13,193,222,142,134,224,210,143,240,209,92,226,52,87,127],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([250,187,12,103,211,9,73,133,55,169,137,126,71,68,8,218,32,111,68,187,180,91,227,64,7,174,106,246,70,42,29,123],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([185,68,68,120,140,224,105,162,247,42,71,127,170,131,86,20,105,105,83,165,84,88,199,155,73,253,41,242,160,80,171,206],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([30,69,125,93,106,174,89,219,119,49,168,134,169,232,88,126,14,70,98,248,208,255,159,65,65,46,247,61,5,35,33,22],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([36,222,197,106,144,191,68,130,186,182,176,63,199,14,255,209,138,9,213,203,181,253,133,199,109,110,156,203,93,1,144,134],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([241,206,152,200,196,85,102,126,238,133,61,95,250,11,112,49,213,230,138,52,134,216,97,17,135,0,237,52,38,130,104,80],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([223,203,75,84,128,254,163,255,200,153,27,9,76,141,158,28,233,3,24,147,240,159,96,181,38,139,243,178,217,61,246,59],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([231,86,126,16,46,91,86,64,252,173,232,81,17,145,106,97,235,186,8,73,56,99,72,165,28,53,166,209,252,137,194,101],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([75,178,208,221,0,177,129,72,196,27,78,99,113,182,59,85,63,117,130,138,252,182,8,53,187,243,248,151,232,160,236,80],{from: accounts[0]});
  });
});
