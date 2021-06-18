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
    let result = await contractHelper.isList([186,176,119,100,156,172,212,179,182,169,39,31,38,213,113,224,2,232,120,130,102,183,210,40,5,129,189,166,118,53,131,151],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([225,213,155,58,179,217,152,152,237,224,129,216,149,75,234,243,88,33,65,157,6,54,239,141,205,180,46,193,171,48,28,119],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([227,18,222,188,222,201,125,139,19,87,160,115,49,40,74,163,129,118,251,114,56,203,252,133,96,22,139,148,226,162,30,177],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([211,116,91,120,120,212,84,163,75,226,70,164,205,3,249,86,210,241,127,28,250,187,243,32,71,140,253,166,14,28,91,5],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([97,145,173,161,203,196,96,135,8,171,123,117,107,213,35,222,4,242,34,255,76,215,81,168,126,19,216,45,161,63,205,209],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([111,171,207,5,114,129,12,54,39,230,14,81,230,35,77,187,113,176,56,108,5,242,188,55,37,108,110,252,249,76,224,155],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([84,171,233,248,245,223,33,48,62,168,83,217,21,75,32,240,2,134,79,232,28,29,112,30,202,48,170,251,221,242,175,98],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([165,237,182,106,247,4,23,156,1,106,244,49,172,217,194,211,140,190,86,189,187,29,170,72,171,83,83,123,23,184,204,6],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([153,23,132,77,101,135,8,42,49,184,141,185,80,45,70,13,7,217,143,62,4,69,169,47,164,119,32,29,22,203,9,152],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([141,145,93,60,145,213,187,204,44,162,165,181,181,169,26,18,26,37,47,78,85,99,16,80,220,84,237,104,203,59,14,67],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([223,193,12,56,133,44,17,12,194,93,89,246,215,54,127,228,86,108,215,116,22,104,231,1,252,60,143,29,68,21,150,186],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([209,254,37,113,6,113,118,49,162,63,171,244,116,246,72,211,89,106,199,79,169,127,168,77,192,142,56,44,178,60,231,173],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([9,70,103,193,58,83,181,225,135,119,99,70,23,0,132,127,69,220,195,17,114,83,194,60,136,92,60,131,244,152,169,236],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([156,125,118,94,18,41,106,161,206,157,52,76,116,134,90,157,26,208,155,178,24,227,42,24,20,1,183,47,218,216,69,25],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([17,131,188,246,144,2,37,105,112,139,187,235,50,82,212,196,80,146,76,126,124,159,61,93,189,191,186,34,243,52,65,206],{from: accounts[0]});
  });
});
