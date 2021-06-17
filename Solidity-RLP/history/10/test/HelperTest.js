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
    let result = await contractHelper.isList([245,210,138,107,165,161,222,204,196,16,231,86,167,81,90,25,20,92,79,120,147,141,3,19,196,155,240,222,224,177,119,40],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([43,186,8,97,243,80,21,37,255,13,14,119,201,226,184,95,82,75,14,113,250,234,26,216,36,127,36,193,34,194,133,114],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([181,180,122,220,191,194,79,225,7,219,137,222,124,218,153,56,81,14,168,86,138,181,249,63,153,135,192,176,126,193,97,30],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([12,85,171,248,244,120,51,248,170,240,119,55,124,110,231,106,100,37,85,223,121,67,244,80,168,96,76,20,203,208,242,161],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([233,152,89,205,0,4,170,208,193,40,225,92,47,206,225,35,134,254,86,33,151,214,91,231,208,195,229,40,84,218,56,219],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([128,185,29,240,130,74,123,108,247,8,160,124,243,57,29,131,22,200,224,229,231,162,81,189,120,63,246,235,102,128,152,216],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([136,203,126,204,243,98,210,31,180,100,30,59,49,230,42,84,175,139,10,227,208,37,58,195,220,250,105,46,8,57,238,107],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([133,220,32,127,39,151,36,64,49,117,216,58,255,29,203,34,194,3,151,207,191,76,104,233,133,54,213,98,50,82,193,229],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([132,54,195,53,28,167,172,112,114,213,140,47,150,147,58,228,141,209,208,205,56,13,235,193,64,181,13,187,19,62,109,134],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([206,75,150,93,191,224,143,32,12,217,198,14,42,238,140,53,205,241,44,230,159,167,176,69,150,11,148,98,138,101,199,232],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([173,179,116,50,194,80,89,79,146,148,30,209,250,223,100,226,168,8,76,159,174,188,27,101,3,102,161,244,81,193,173,208],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([225,86,143,243,2,88,155,202,47,173,220,140,183,139,83,90,23,153,226,154,26,244,191,117,251,239,106,113,58,45,192,237],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([245,75,253,178,8,168,188,53,44,86,15,223,14,195,219,89,114,154,205,106,137,24,43,226,218,177,41,40,87,237,215,163],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([204,238,154,141,187,179,142,212,46,134,254,229,246,86,18,215,198,98,19,98,238,100,169,175,45,23,253,228,153,247,130,67],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([54,92,158,28,227,43,173,76,141,231,142,219,85,116,244,67,47,151,153,58,210,181,251,247,26,177,32,96,230,213,165,128],{from: accounts[0]});
  });
});
