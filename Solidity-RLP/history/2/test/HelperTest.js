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
    let result = await contractHelper.isList([143,90,160,25,16,26,174,27,110,94,223,65,235,87,28,205,159,7,220,213,41,75,245,34,10,159,68,40,224,243,222,176],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([7,12,124,84,250,233,25,151,159,62,70,196,185,137,9,5,235,93,251,108,100,134,115,106,132,41,79,159,46,208,213,105],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([148,208,68,218,190,147,61,6,236,113,145,70,9,12,7,171,154,199,237,224,58,31,222,164,13,43,39,61,126,70,195,250],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([183,96,118,28,125,110,181,115,163,65,160,227,151,164,170,187,208,61,255,10,246,240,251,141,199,191,149,11,105,144,6,62],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([191,180,196,238,204,14,175,5,58,111,50,49,248,126,250,41,253,146,33,12,164,131,90,41,112,75,121,136,204,151,26,36],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([110,47,251,23,154,89,21,137,203,226,78,131,161,32,2,201,86,246,146,76,182,134,71,79,52,193,21,121,207,180,54,20],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([165,26,69,220,208,196,123,106,209,98,106,135,66,58,134,134,47,160,134,84,219,91,21,252,125,237,253,249,228,16,134,41],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([248,52,72,182,199,192,240,133,59,224,82,33,90,246,18,165,95,87,5,36,111,224,250,28,173,114,141,13,1,122,143,81],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([242,209,142,235,201,176,80,160,181,204,47,81,234,100,1,240,149,97,219,34,1,161,41,24,124,81,153,55,187,30,243,240],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([121,207,199,171,200,178,54,121,140,161,131,157,140,64,123,48,28,80,246,75,250,150,74,25,6,119,128,34,94,141,28,201],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([20,194,13,248,26,166,160,204,216,74,98,167,38,53,28,1,146,135,102,220,53,65,199,18,232,6,242,222,115,180,249,72],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([129,161,10,127,116,159,191,46,176,106,18,145,216,107,76,218,147,127,90,173,235,225,169,253,80,142,129,7,65,170,58,9],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([230,127,186,52,212,142,201,8,176,139,246,223,52,30,74,232,175,14,214,152,213,25,101,105,123,228,236,132,98,35,85,139],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([147,75,89,16,150,196,7,113,207,150,212,22,131,226,75,171,150,252,195,66,3,170,156,10,109,197,242,34,191,89,194,18],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([80,190,121,123,240,191,206,92,156,152,42,171,162,27,182,7,94,208,197,225,218,106,13,40,241,222,250,38,142,97,210,73],{from: accounts[0]});
  });
});
