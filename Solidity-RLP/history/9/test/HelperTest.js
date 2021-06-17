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
    let result = await contractHelper.isList([61,190,109,187,71,6,82,76,233,180,193,158,65,208,22,192,5,176,241,128,21,13,228,162,163,255,72,123,68,236,110,204],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([168,105,204,119,46,136,230,248,115,215,156,200,118,29,214,143,91,84,38,236,37,9,64,61,199,160,219,40,116,105,248,132],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([46,210,251,165,106,211,102,246,54,159,98,197,61,59,51,14,220,33,130,52,35,51,185,6,8,227,171,106,129,12,213,145],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([174,67,91,173,3,33,19,27,163,71,235,248,16,28,233,217,124,193,133,58,133,10,176,137,218,94,171,52,243,56,78,22],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([183,125,31,88,210,217,188,232,220,132,165,238,229,37,40,56,25,223,211,213,198,185,74,41,19,216,114,235,133,87,64,209],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([38,14,34,213,169,111,108,58,116,23,53,146,73,18,81,73,122,177,206,63,202,66,87,108,239,22,217,171,186,146,140,249],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([250,38,1,30,94,176,28,179,115,35,104,223,217,162,28,234,234,68,64,184,222,135,67,34,122,42,42,236,202,159,139,253],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([227,114,0,55,151,20,168,93,211,193,111,89,5,70,5,211,211,229,74,6,84,89,7,195,92,71,207,225,139,129,169,225],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([235,251,124,224,146,24,111,94,166,158,254,23,14,223,3,248,94,80,43,152,53,191,56,149,108,169,192,239,255,109,148,242],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([207,138,38,86,229,225,0,36,219,253,236,169,218,54,245,32,114,87,57,176,211,25,35,20,4,13,0,140,80,195,69,55],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([106,87,228,122,106,45,126,61,219,185,119,107,211,240,238,135,5,16,192,213,174,175,56,95,48,222,230,246,82,77,245,142],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([198,162,123,189,226,29,166,199,112,160,123,152,236,74,50,81,116,0,101,179,6,206,218,44,206,143,47,63,79,27,183,17],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([12,25,84,52,29,68,224,32,112,20,153,193,7,58,252,58,208,86,202,27,29,4,173,255,144,212,104,175,210,123,123,174],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([154,151,233,154,14,226,237,79,55,176,95,124,118,76,150,226,175,255,55,135,74,214,136,200,253,114,194,202,91,16,91,202],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([121,170,172,87,123,185,105,113,119,206,173,104,121,56,107,52,229,34,40,86,107,64,185,75,57,82,131,232,198,173,109,18],{from: accounts[0]});
  });
});
