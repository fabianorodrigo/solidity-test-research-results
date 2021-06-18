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
    let result = await contractHelper.isList([24,19,232,113,138,172,70,161,241,238,162,180,104,75,145,5,174,104,218,206,11,183,193,131,174,168,156,185,64,105,199,251],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([107,124,225,160,2,248,91,252,207,148,4,176,215,8,25,92,223,5,85,202,78,97,95,223,188,226,76,129,101,137,142,64],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([236,44,238,22,23,249,16,250,59,86,106,141,83,60,174,160,177,76,91,143,106,149,208,111,87,185,196,222,206,18,33,207],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([2,189,86,102,84,223,79,190,22,113,202,144,152,102,212,212,164,205,161,191,112,39,144,12,98,176,7,183,230,168,95,117],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([127,189,226,227,237,223,12,17,246,129,33,41,235,33,135,166,71,175,209,104,26,228,33,109,85,222,165,205,161,112,108,87],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([47,163,165,6,94,204,201,115,23,18,242,84,15,114,47,254,110,76,187,167,38,124,98,5,191,13,45,71,205,234,115,131],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([245,131,44,106,49,136,131,149,214,115,128,243,110,77,46,51,187,175,247,74,155,234,14,88,67,82,29,22,35,216,130,75],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([204,47,65,124,20,76,125,148,171,130,166,123,206,229,59,117,193,122,117,12,98,146,75,126,176,15,254,45,89,65,183,69],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([236,244,88,76,84,3,127,180,196,225,209,52,56,48,251,30,188,143,162,71,78,150,51,61,139,43,46,99,40,11,44,141],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([249,231,26,145,210,139,157,249,48,97,188,58,100,176,173,86,134,98,140,145,13,220,192,232,226,174,178,136,97,134,158,192],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([221,94,167,231,99,35,170,85,169,72,10,89,177,51,239,5,148,134,4,78,197,188,70,57,246,234,133,8,41,56,150,236],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([254,231,31,68,218,17,237,244,49,52,130,86,60,11,176,42,73,214,219,26,42,215,25,100,8,247,168,34,192,255,183,53],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([48,248,133,210,133,115,194,124,242,147,121,36,9,24,113,0,151,178,92,30,146,152,183,199,25,35,34,188,213,212,137,232],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([31,3,139,104,45,197,84,38,84,155,83,9,205,162,137,74,100,83,45,127,157,128,57,56,178,82,10,241,192,109,169,27],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([180,231,70,251,144,65,198,23,90,9,117,6,108,70,180,2,21,253,147,197,224,233,30,206,112,151,163,75,229,54,215,98],{from: accounts[0]});
  });
});
