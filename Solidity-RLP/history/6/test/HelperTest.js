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
    let result = await contractHelper.isList([123,117,68,0,56,96,160,207,90,37,51,187,139,84,11,86,105,188,254,11,31,203,106,152,73,88,135,174,15,80,248,214],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([37,62,188,70,11,193,34,93,58,115,239,207,2,54,123,132,8,162,6,226,87,197,96,231,18,27,229,80,197,92,50,2],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([142,224,43,255,192,255,117,152,181,241,252,101,50,54,205,42,32,196,158,9,189,137,234,184,73,31,29,101,60,161,121,129],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([186,105,14,239,29,218,153,149,193,173,134,105,119,224,27,185,246,226,93,28,87,55,128,81,187,127,181,117,125,252,83,168],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([143,33,232,230,241,178,186,120,240,69,104,15,114,121,188,134,121,245,117,27,56,244,18,240,92,44,204,76,244,105,53,36],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([210,38,163,252,77,58,163,106,35,82,181,120,124,159,105,167,210,106,64,113,198,50,84,64,168,233,85,222,14,181,136,98],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([93,127,237,244,146,22,192,32,233,243,84,247,80,35,111,32,216,75,41,60,182,170,103,96,96,237,64,140,115,178,44,181],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([51,113,142,146,122,71,42,75,116,57,79,65,174,29,150,143,157,23,191,39,23,41,186,194,5,203,57,111,5,141,199,113],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([228,7,176,197,68,143,46,140,141,148,56,146,129,167,23,192,109,216,180,30,187,85,241,128,248,40,76,97,247,58,195,226],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([170,41,135,151,102,126,244,220,125,66,141,135,105,62,23,188,185,192,15,135,1,19,176,137,158,227,187,250,45,25,7,148],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([158,247,174,179,127,186,82,123,190,180,70,210,243,228,218,168,251,224,60,209,145,22,122,64,214,3,62,199,83,235,178,77],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([181,63,17,0,185,56,33,206,115,212,224,71,168,156,180,252,26,179,146,86,95,26,209,134,145,33,226,188,153,57,198,114],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([122,78,242,100,31,92,48,239,235,33,245,208,241,185,15,136,154,247,253,128,42,6,108,205,18,23,41,136,101,43,167,135],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([122,126,49,249,44,157,86,240,176,129,240,23,17,76,143,74,112,180,92,171,203,7,239,56,2,83,109,124,75,53,52,176],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([69,128,77,75,31,133,54,138,138,236,25,179,104,129,129,19,122,37,167,40,244,249,57,27,213,93,15,161,253,244,95,177],{from: accounts[0]});
  });
});
