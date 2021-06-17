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
    let result = await contractHelper.isList([82,31,72,63,196,171,191,49,131,216,213,188,183,85,126,196,21,28,51,138,32,134,138,27,122,130,225,133,176,202,67,178],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([50,249,191,197,87,140,170,27,27,145,171,192,248,108,234,158,225,76,7,152,175,105,109,161,158,205,96,125,29,57,181,118],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([238,136,81,135,163,117,207,163,194,78,180,72,233,5,153,27,99,109,223,69,177,2,34,4,245,175,151,129,253,72,245,22],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([171,79,254,61,43,227,155,135,76,88,249,60,23,226,147,187,238,57,53,152,205,161,18,193,19,178,215,95,31,188,91,57],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([166,47,1,58,194,81,66,36,1,239,198,48,238,251,67,248,7,99,251,185,145,7,101,247,156,148,43,85,27,112,119,22],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([73,57,229,239,113,234,67,71,212,34,255,127,92,27,101,224,75,94,2,211,81,9,247,116,134,84,220,5,112,251,143,120],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([103,254,12,55,21,63,220,82,63,29,165,139,253,217,68,74,57,214,231,67,168,70,20,182,17,83,154,188,199,122,206,245],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([190,90,168,238,247,53,205,165,147,87,13,235,196,151,205,234,108,188,118,61,86,18,72,245,108,141,89,220,0,84,125,38],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([30,198,139,62,21,12,198,235,78,104,71,58,48,231,112,160,242,225,105,145,239,242,56,120,111,64,49,245,153,166,250,96],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([192,211,240,201,58,211,252,165,213,41,142,249,129,134,201,219,16,229,59,156,241,251,168,3,195,127,135,33,178,176,115,171],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([170,85,168,243,113,136,12,139,236,57,74,198,237,220,164,228,182,48,94,148,248,207,141,172,10,34,119,59,210,185,217,141],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([134,213,144,56,94,175,223,247,254,188,225,233,93,2,172,82,236,60,2,251,112,118,97,114,72,52,164,59,115,84,156,73],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([0,251,194,60,5,52,167,101,82,39,153,35,224,139,202,99,27,194,133,64,55,204,215,139,186,160,116,14,215,243,158,157],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([21,86,231,166,233,231,241,214,43,251,93,129,26,135,132,238,195,244,101,21,215,249,18,58,122,101,177,64,161,152,201,253],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([82,136,101,140,126,90,68,107,154,137,190,91,106,94,147,186,239,202,21,16,161,45,197,38,184,22,31,75,233,186,100,103],{from: accounts[0]});
  });
});
