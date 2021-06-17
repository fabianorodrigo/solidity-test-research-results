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
    let result = await contractHelper.isList([137,142,78,92,149,177,144,231,126,9,21,76,85,69,24,107,127,81,42,215,63,124,10,12,69,80,191,176,93,137,127,148],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([214,233,155,158,48,116,92,39,234,204,243,88,23,9,130,181,113,153,79,145,180,1,226,75,254,64,218,20,2,214,165,36],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([54,145,170,159,114,160,47,1,175,113,237,48,151,234,53,218,157,174,122,233,25,119,137,134,219,0,226,111,55,66,87,117],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([176,24,42,129,230,104,221,14,188,177,124,95,100,179,28,79,42,76,192,64,239,45,143,61,118,25,129,254,246,239,144,34],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([2,209,212,176,79,132,58,97,103,125,35,118,48,248,87,207,211,41,137,103,61,155,212,127,0,190,251,239,227,72,205,17],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([106,37,61,216,151,0,59,154,172,81,196,236,163,124,232,120,83,102,193,24,85,141,188,114,20,74,230,197,210,111,181,176],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([197,43,137,189,65,219,228,91,214,67,21,32,21,62,152,252,147,79,198,170,177,107,152,214,13,116,177,243,212,94,216,254],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([99,72,32,254,188,49,22,11,153,165,80,46,166,243,198,71,138,56,157,58,97,63,159,27,173,99,36,203,141,217,211,168],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([169,255,65,67,175,153,88,23,84,217,53,181,74,222,239,224,138,5,20,41,226,79,4,65,64,167,25,64,54,201,55,190],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([181,47,27,132,244,102,24,139,85,20,68,105,23,166,167,158,23,172,55,28,48,184,42,223,190,227,12,38,255,29,245,77],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([137,120,31,237,230,11,156,14,178,95,177,77,34,177,239,0,188,5,243,11,229,251,41,7,125,133,118,163,85,161,22,39],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([245,36,113,143,75,120,91,179,141,155,252,15,33,235,233,127,150,121,57,163,150,122,113,232,99,139,100,229,190,244,53,245],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([126,179,187,168,21,9,162,222,232,175,87,203,126,132,128,17,101,85,14,159,163,180,75,78,145,95,67,64,9,209,133,81],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([212,27,73,5,166,254,17,7,134,29,55,245,11,101,139,244,61,255,57,177,233,110,255,24,197,120,225,117,246,230,23,159],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([215,31,71,92,14,5,221,240,155,91,161,183,106,248,51,226,242,217,126,51,173,148,233,64,0,213,197,154,36,151,10,83],{from: accounts[0]});
  });
});
