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
    let result = await contractHelper.isList([165,145,226,77,69,36,175,56,171,158,236,77,27,82,58,23,50,158,240,25,79,41,140,158,209,227,81,197,45,0,211,129],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([35,188,116,139,250,240,24,168,246,135,91,127,139,114,201,189,192,149,44,223,134,211,32,79,224,103,9,94,114,112,163,186],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([99,179,233,249,92,134,170,218,236,192,245,225,106,1,213,156,233,213,88,222,180,156,180,95,121,127,104,105,164,88,244,88],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([243,255,252,109,187,97,172,162,178,105,204,154,125,234,133,117,195,164,165,104,2,140,121,154,236,241,224,251,207,189,131,150],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([157,49,90,178,156,244,56,51,51,204,237,173,106,40,103,76,4,165,171,182,152,195,189,80,17,41,162,120,156,221,189,25],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([80,106,1,125,88,21,48,110,21,194,149,201,62,124,50,196,166,169,161,241,109,71,235,137,79,41,170,61,69,67,125,108],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([140,230,86,82,101,220,121,35,5,139,222,74,15,18,8,218,53,196,204,26,0,178,59,59,110,29,149,22,160,110,231,214],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([153,34,70,237,227,92,81,100,166,213,98,104,63,238,83,99,224,121,47,36,120,222,164,146,16,90,96,211,134,229,116,139],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([252,230,207,189,180,247,29,40,83,53,236,251,106,147,26,40,96,194,209,24,251,51,115,82,131,128,103,95,80,222,56,125],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([113,51,197,61,219,111,75,185,173,201,147,101,239,55,138,210,240,84,196,165,19,232,102,163,211,206,220,182,166,70,187,58],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([71,125,200,50,172,89,73,226,16,238,238,13,43,221,209,45,46,57,190,136,28,20,248,243,106,83,145,94,199,181,216,230],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([23,185,8,178,103,135,226,196,154,210,152,66,191,115,117,2,189,118,126,192,119,153,29,25,35,77,60,84,237,22,159,131],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([156,47,127,90,199,140,3,24,243,119,154,248,2,189,86,195,126,200,35,104,196,138,141,155,96,106,58,82,249,11,220,14],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([217,135,135,245,210,40,210,63,223,186,86,161,145,40,100,148,205,245,226,181,80,207,56,21,185,117,178,149,96,74,122,35],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([226,57,210,243,71,182,226,32,74,243,141,221,201,102,250,221,186,192,23,74,217,221,91,124,190,212,174,24,207,169,211,36],{from: accounts[0]});
  });
});
