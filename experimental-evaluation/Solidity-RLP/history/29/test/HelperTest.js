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
    let result = await contractHelper.isList([134,155,182,31,102,193,43,191,25,49,57,71,183,189,218,221,175,252,229,31,53,164,231,153,41,159,205,193,159,125,4,54],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([213,223,112,210,117,118,173,240,102,30,34,88,130,169,13,195,73,131,21,210,21,20,177,159,37,7,77,107,197,138,28,135],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([245,125,98,87,44,11,199,153,189,122,248,210,51,13,22,235,77,51,129,98,46,198,209,26,102,56,215,228,110,179,181,205],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([115,119,20,225,255,254,227,206,43,153,64,122,200,138,47,94,54,123,108,107,137,55,75,44,129,1,115,77,221,212,116,154],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([122,141,18,35,208,16,27,75,93,32,5,107,131,86,189,171,90,53,156,125,30,53,230,125,49,17,192,62,194,44,194,142],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([24,164,214,219,168,95,84,111,64,133,182,200,140,12,196,229,52,14,138,115,249,203,197,108,169,77,129,225,194,153,174,101],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([130,160,108,115,175,49,27,235,175,128,33,144,157,29,139,148,150,62,100,241,168,226,31,148,196,172,201,41,65,145,75,249],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([233,78,183,206,59,112,245,162,27,55,128,27,63,208,70,232,96,255,135,10,233,191,146,49,163,164,217,76,249,228,130,23],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([224,158,174,49,145,232,203,198,145,89,9,13,242,80,85,229,251,51,146,228,158,91,235,147,188,3,26,0,126,166,33,75],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([100,212,10,130,105,95,63,224,3,128,134,248,158,43,228,98,221,117,250,7,66,201,35,127,109,216,215,72,246,191,42,51],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([187,105,148,151,224,201,151,101,124,65,132,39,200,58,2,222,86,200,85,122,203,231,137,251,92,32,143,29,78,94,218,49],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([226,147,120,100,238,32,208,120,35,28,109,132,74,31,179,6,237,167,109,130,48,176,232,255,83,205,156,131,29,203,101,101],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([153,187,251,60,166,59,148,210,209,3,120,138,210,13,115,98,12,9,198,89,46,125,228,205,68,2,220,89,10,70,60,66],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([169,12,80,191,200,170,70,111,177,211,120,98,164,58,57,198,236,166,245,86,127,3,101,210,193,214,118,181,156,141,44,20],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([68,62,169,191,0,254,25,43,181,57,14,87,177,117,250,249,150,253,134,206,194,132,180,89,133,161,196,156,89,189,136,6],{from: accounts[0]});
  });
});
