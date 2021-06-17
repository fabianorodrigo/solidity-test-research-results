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
    let result = await contractHelper.isList([121,139,131,119,41,162,125,17,186,179,242,133,19,213,136,166,8,188,244,85,253,6,186,126,64,48,5,141,31,144,219,237],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([55,229,3,238,100,196,91,172,100,55,0,200,41,196,108,60,147,182,106,97,131,163,116,233,238,35,253,190,47,51,251,173],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([237,118,131,50,59,101,123,189,42,246,99,202,52,218,97,233,14,158,250,178,153,84,54,25,63,113,138,244,72,144,67,119],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([88,89,59,92,35,15,69,162,255,106,124,12,237,120,176,218,80,237,55,198,218,149,30,70,133,127,22,125,245,51,119,144],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([83,42,36,196,41,8,21,18,240,98,198,144,102,75,85,89,28,164,192,16,113,254,141,15,108,162,235,233,171,212,100,55],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([83,204,118,36,152,111,33,75,30,66,94,65,123,113,166,90,27,79,54,144,102,214,235,98,222,247,140,136,71,33,5,146],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([1,172,85,167,69,78,188,223,204,54,49,91,90,174,75,109,241,196,11,151,254,240,225,241,255,83,5,45,52,171,36,145],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([220,212,243,230,134,63,164,124,154,233,216,98,42,111,38,145,159,91,112,18,153,17,226,167,54,108,11,130,108,213,98,236],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([229,14,78,91,22,60,104,237,218,30,70,92,54,26,96,130,126,18,145,170,52,254,135,88,126,136,38,196,28,254,121,105],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([155,98,92,123,191,28,103,177,61,219,117,124,187,78,18,113,163,251,215,229,96,123,69,118,34,196,181,198,1,97,136,187],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([121,211,115,36,128,105,137,208,81,102,163,87,63,233,147,62,128,43,166,134,222,150,9,174,36,171,229,203,104,203,248,165],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([119,176,147,231,236,73,54,208,254,54,146,251,81,240,195,219,68,255,11,99,82,132,170,143,154,18,70,155,46,3,75,148],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([195,80,21,131,204,13,162,126,109,15,196,19,244,248,151,34,67,142,215,244,13,229,147,61,129,175,227,36,197,229,97,105],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([164,44,26,249,236,216,5,103,159,4,154,175,198,202,165,208,120,84,4,103,247,117,186,189,145,11,244,24,94,190,243,17],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([56,204,226,250,175,150,21,185,211,189,57,50,56,204,224,244,180,55,171,106,225,19,11,166,225,27,117,92,69,25,30,217],{from: accounts[0]});
  });
});
