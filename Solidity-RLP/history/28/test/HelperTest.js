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
    let result = await contractHelper.isList([243,15,223,164,49,52,230,69,238,96,226,97,103,97,70,175,35,142,211,173,149,230,102,95,159,26,108,65,245,49,179,84],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([102,49,12,248,20,225,246,41,127,92,63,0,201,56,176,199,239,200,100,69,173,158,93,124,199,228,101,255,178,30,61,2],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([209,98,94,216,209,217,119,20,252,26,128,151,51,248,174,114,30,234,50,218,113,128,206,92,27,182,30,175,200,77,6,37],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([137,121,194,106,200,154,53,175,237,67,98,34,161,86,113,169,213,63,196,33,236,148,122,128,169,216,2,107,35,223,134,254],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([197,15,148,95,100,219,237,177,86,148,212,42,89,40,29,125,45,144,85,160,70,192,3,203,238,184,167,213,59,75,141,196],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([51,163,232,142,124,221,232,117,71,110,49,139,82,250,71,21,117,157,7,150,251,118,4,55,6,231,210,23,5,124,239,211],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([118,58,65,26,244,161,67,61,133,13,70,216,190,36,187,251,203,156,201,127,81,38,101,199,41,18,10,161,211,110,146,194],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([244,11,248,114,63,247,98,148,126,67,82,29,183,117,208,129,40,200,7,237,47,20,88,40,31,146,161,217,47,214,161,115],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([12,116,29,182,7,235,23,118,243,151,204,188,167,12,123,28,132,81,138,12,172,14,209,65,235,163,22,37,229,13,28,82],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([138,87,229,21,183,7,234,233,17,122,171,93,14,204,94,19,140,240,17,204,125,225,210,239,9,24,154,239,79,21,184,74],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([31,54,183,239,75,35,137,173,153,132,196,171,182,153,68,218,63,232,141,196,213,36,85,186,170,227,3,128,193,11,188,246],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([59,181,66,141,142,31,14,180,51,225,10,62,200,74,173,226,215,3,103,234,13,157,116,115,158,183,242,89,242,102,134,238],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([190,185,75,245,76,1,59,160,101,240,170,232,28,131,140,232,160,229,244,70,86,166,242,183,158,84,136,176,242,37,93,23],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([250,218,154,70,173,144,101,189,46,204,51,116,143,193,15,217,157,6,6,87,174,1,62,56,80,174,7,156,71,25,180,129],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([96,238,126,220,83,38,108,48,43,252,63,158,112,125,215,181,91,90,150,37,39,49,16,74,161,191,233,149,240,10,191,19],{from: accounts[0]});
  });
});
