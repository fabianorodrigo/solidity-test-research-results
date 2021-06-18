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
    let result = await contractHelper.isList([217,203,134,232,147,94,119,212,94,250,181,200,163,59,64,100,214,215,236,121,13,2,64,58,122,183,154,170,136,204,197,0],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([187,137,83,49,102,62,119,250,68,214,17,34,83,110,212,247,8,97,216,192,40,181,82,85,159,9,241,254,80,74,83,140],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([162,157,155,169,36,206,160,240,6,168,151,230,140,241,228,178,109,14,211,251,85,187,70,227,223,199,169,72,244,71,133,143],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([96,40,127,105,16,174,145,238,93,28,56,167,78,2,14,73,249,107,172,222,253,136,7,26,197,133,150,8,73,172,244,199],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([38,41,16,27,10,63,196,42,168,102,183,4,124,226,104,132,205,1,228,123,65,86,142,150,72,178,41,171,177,166,205,119],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([43,236,36,9,248,87,151,180,178,82,94,3,21,69,21,216,36,176,158,139,121,227,89,113,203,242,9,198,82,124,95,128],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([180,245,54,118,143,38,101,98,205,42,213,4,45,179,197,27,27,68,169,62,107,97,168,223,198,114,174,5,130,197,89,33],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([69,14,148,136,142,219,35,39,181,82,229,40,248,94,187,40,113,18,241,67,34,165,108,107,118,90,167,168,113,58,123,76],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([180,182,77,34,50,69,118,135,53,169,58,201,65,56,238,6,84,55,29,19,17,40,111,49,235,6,177,167,239,174,108,6],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([201,190,132,249,138,7,111,179,31,225,222,60,23,30,127,139,251,139,144,143,125,115,12,164,90,221,228,109,71,68,70,66],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([57,191,231,25,71,217,156,87,143,205,100,114,21,86,86,160,124,25,16,24,100,253,94,106,117,112,41,26,103,149,59,181],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([138,209,44,222,216,195,159,159,133,70,113,203,23,180,102,159,167,134,4,112,127,126,157,111,7,179,222,207,205,94,243,130],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([215,45,101,151,205,52,83,121,143,44,123,61,88,223,138,165,75,49,71,155,153,110,102,93,214,0,117,183,37,37,156,215],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([33,95,200,139,86,194,114,137,39,218,60,218,213,68,207,148,200,191,146,138,138,152,64,78,92,161,179,161,42,200,44,182],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([54,219,94,143,93,32,92,208,226,138,230,171,251,162,115,147,136,197,22,73,212,73,30,178,198,188,159,100,104,146,252,148],{from: accounts[0]});
  });
});
