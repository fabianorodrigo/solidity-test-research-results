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
    let result = await contractHelper.isList([247,245,229,116,63,57,78,201,136,168,58,173,75,239,60,85,183,168,237,12,61,126,184,204,53,113,226,207,153,68,219,230],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([197,101,44,181,178,169,102,61,150,15,143,244,25,185,171,75,53,223,190,165,24,244,98,159,207,58,240,103,25,22,153,193],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([90,254,167,183,170,2,126,245,101,74,69,239,28,5,132,186,61,173,178,158,26,71,250,42,41,91,212,122,150,23,204,228],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([13,103,5,225,215,58,255,23,7,193,114,180,49,31,217,94,177,248,217,224,122,31,199,16,67,47,98,206,243,77,68,176],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([34,159,243,31,18,99,24,180,153,222,67,156,42,180,90,104,93,169,253,193,195,36,66,191,127,6,148,20,114,204,147,135],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([113,15,110,115,134,110,65,116,20,79,159,250,165,237,128,91,42,157,29,187,208,37,139,149,234,93,147,119,162,158,180,107],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([254,188,72,145,162,86,29,144,66,169,28,196,233,161,255,218,176,163,41,123,245,31,140,80,74,180,79,166,61,13,250,1],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([226,82,52,72,161,129,138,203,229,64,189,58,133,111,11,1,230,192,116,41,109,208,251,112,89,196,164,173,54,168,140,127],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([19,81,154,137,204,10,209,50,216,50,182,36,49,150,25,44,210,144,157,72,161,105,115,76,203,201,75,66,230,69,224,36],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([217,50,52,221,79,166,93,18,137,69,225,35,60,177,158,207,57,92,62,61,134,208,111,64,18,167,115,203,141,111,31,91],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([223,22,163,173,230,27,50,35,154,247,51,214,121,225,142,227,106,245,226,173,76,204,228,115,204,54,213,98,37,245,67,61],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([14,51,209,45,239,67,248,148,106,89,139,242,181,80,89,11,174,216,211,96,51,251,196,62,69,134,186,171,158,151,155,65],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([234,16,122,250,248,146,183,174,110,225,227,75,130,77,221,208,177,203,133,74,55,173,142,187,241,185,13,187,227,166,142,169],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([17,52,130,153,71,242,149,227,135,23,7,161,248,226,93,97,23,126,218,155,79,142,27,117,118,95,254,126,30,28,230,64],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([85,232,176,30,177,86,13,247,172,126,195,128,185,157,239,61,144,221,114,58,20,152,221,115,140,134,66,110,45,11,100,148],{from: accounts[0]});
  });
});
