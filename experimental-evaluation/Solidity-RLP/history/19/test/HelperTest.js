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
    let result = await contractHelper.isList([120,152,139,230,210,34,59,19,94,25,173,235,113,17,15,236,239,29,3,44,161,172,178,171,84,133,202,34,36,189,233,103],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([211,107,197,138,51,105,236,204,232,28,228,134,254,113,227,79,22,148,10,109,166,202,201,60,61,86,217,198,118,38,251,121],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([22,196,98,53,96,128,65,176,57,103,228,147,225,158,108,91,203,166,197,21,111,16,237,85,184,218,36,43,44,162,23,127],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([236,234,16,205,94,143,100,58,161,95,59,246,29,229,75,70,86,148,154,1,151,56,51,135,78,65,159,211,241,24,242,6],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([253,219,51,177,218,156,127,76,165,94,218,71,150,222,201,90,197,99,85,4,149,223,208,215,157,172,8,80,142,39,243,255],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([191,201,21,212,85,214,254,33,53,239,250,55,128,246,232,123,173,11,230,243,143,31,252,125,209,182,110,169,203,131,32,124],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([136,81,40,51,11,84,127,154,62,176,224,187,210,64,234,163,183,137,35,35,176,233,170,111,223,18,182,40,26,195,166,149],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([205,87,17,89,140,110,4,39,245,252,5,110,162,187,147,119,31,219,152,251,44,191,31,77,191,63,59,137,63,213,197,94],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([202,218,240,40,173,125,30,167,125,36,227,106,128,178,130,227,128,46,150,216,246,225,185,241,237,183,30,129,255,0,107,15],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([198,170,106,204,205,122,210,49,22,52,82,19,178,34,53,179,23,100,114,119,169,165,70,74,125,232,81,60,33,213,97,146],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([197,23,28,118,187,63,141,80,229,184,168,70,255,120,7,136,142,127,45,227,123,5,200,83,48,150,133,170,126,157,74,248],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([16,224,97,242,177,234,206,19,242,46,75,184,129,118,38,207,62,129,239,13,208,200,25,63,170,6,125,127,139,169,194,31],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([49,207,223,227,204,27,63,59,88,30,41,201,133,143,255,171,88,80,144,193,196,160,134,115,255,52,97,139,64,16,200,20],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([246,46,10,237,235,172,65,97,138,91,166,153,146,53,172,29,171,39,156,53,189,218,70,93,12,181,189,187,171,69,154,210],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([211,155,212,248,19,135,95,117,124,182,152,209,82,164,241,123,180,91,144,141,152,151,215,26,39,223,37,205,234,233,51,80],{from: accounts[0]});
  });
});
