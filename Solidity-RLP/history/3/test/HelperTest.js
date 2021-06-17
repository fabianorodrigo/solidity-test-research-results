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
    let result = await contractHelper.isList([136,8,35,98,14,100,129,78,255,206,132,215,84,76,46,58,247,87,9,59,164,119,218,155,7,244,219,23,115,52,103,99],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([142,131,62,133,69,138,82,7,41,214,34,254,178,253,43,138,55,57,21,52,5,153,88,72,56,2,210,251,70,94,133,22],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([111,43,53,40,57,76,147,44,188,149,219,44,88,254,7,167,250,189,159,141,59,130,185,115,166,16,3,192,20,255,209,80],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([87,18,46,28,2,189,181,51,78,44,172,187,237,252,49,211,111,29,26,246,46,150,117,166,201,160,220,122,80,135,249,150],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([110,46,239,206,108,134,89,107,195,253,92,39,238,206,156,208,176,59,146,35,57,162,216,191,14,73,43,196,88,187,57,226],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([99,173,59,79,149,56,169,227,249,191,153,168,209,45,17,56,238,41,77,15,180,209,81,218,226,79,26,142,71,235,224,118],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([219,96,194,145,190,198,99,13,244,71,70,18,57,108,136,127,150,207,125,235,223,188,126,211,251,111,8,94,163,113,255,240],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([97,154,38,169,224,121,250,12,18,241,137,48,243,80,114,222,58,180,120,13,85,88,107,240,220,62,152,93,116,89,55,155],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([74,35,201,29,91,75,39,116,57,204,196,214,242,141,176,236,190,61,126,242,15,105,130,133,148,35,3,70,112,100,252,214],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([170,223,122,167,1,116,216,94,139,188,220,177,136,5,151,118,182,169,246,122,133,146,105,167,2,54,100,123,144,176,80,118],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([245,183,46,33,163,127,226,187,184,222,41,182,192,96,179,44,66,150,252,77,98,117,140,167,110,172,221,168,116,188,40,95],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([243,112,247,187,70,153,7,134,246,224,0,251,104,168,151,220,171,135,187,182,17,176,238,75,162,198,147,34,255,173,181,82],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([121,119,251,219,114,250,16,64,235,223,46,235,138,137,106,160,131,94,139,216,82,71,103,59,153,35,18,155,37,177,194,18],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([39,44,31,72,93,239,94,47,230,17,42,241,141,170,154,60,33,251,23,147,86,166,224,236,143,192,21,29,205,34,81,18],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([136,85,250,55,115,246,140,51,72,236,30,219,165,103,69,225,226,105,14,85,49,219,112,9,0,107,170,239,98,168,48,103],{from: accounts[0]});
  });
});
