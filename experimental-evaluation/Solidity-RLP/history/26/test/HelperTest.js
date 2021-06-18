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
    let result = await contractHelper.isList([77,64,111,79,65,70,218,13,25,151,198,206,245,183,97,189,113,95,155,234,189,47,108,93,191,70,179,115,82,178,156,255],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([39,104,213,250,68,138,94,96,168,79,32,92,32,7,218,176,20,208,138,214,163,130,5,161,11,104,118,249,164,160,30,76],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([124,42,189,149,135,46,109,48,194,37,186,229,130,113,136,168,81,80,154,127,187,164,150,219,71,37,226,200,71,67,96,73],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([148,248,66,111,55,121,189,164,227,46,248,4,208,178,115,166,211,102,201,18,70,3,0,226,95,206,103,0,15,36,197,170],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([156,91,92,127,26,189,205,71,161,253,214,192,244,115,248,195,37,57,66,191,36,94,197,73,2,78,50,229,15,220,88,77],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([179,228,59,132,15,26,11,42,226,246,52,193,241,68,61,153,156,152,226,247,199,204,82,226,233,242,124,168,172,64,158,255],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([157,239,72,108,182,227,150,195,32,100,220,3,182,161,161,14,128,221,19,243,145,251,125,215,203,71,235,39,95,160,111,189],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([140,183,37,142,159,241,141,237,227,111,175,182,61,125,244,3,227,10,39,217,180,125,227,229,37,192,207,171,92,137,118,70],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([52,63,57,255,190,77,68,246,51,174,214,116,218,106,209,26,197,204,186,36,6,53,29,201,181,196,205,203,172,41,12,9],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([177,100,157,0,6,172,219,62,237,130,99,184,137,62,231,55,202,231,212,243,153,232,144,172,254,132,234,91,64,81,240,219],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([209,108,63,210,188,48,153,126,215,228,163,207,128,67,73,60,85,161,168,225,244,155,97,204,114,37,44,61,187,91,88,116],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([122,181,109,74,237,75,223,9,213,39,26,239,229,12,117,248,211,152,199,86,194,252,108,67,15,224,113,140,75,182,126,184],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([223,216,209,12,95,164,54,189,44,91,236,180,23,163,58,48,5,225,161,89,30,31,209,253,123,138,111,64,21,14,64,64],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([44,4,88,245,66,71,47,52,131,144,179,245,175,85,158,14,70,80,178,144,40,159,215,146,32,216,102,87,127,9,112,147],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([198,0,155,117,216,127,86,70,195,201,30,155,120,233,198,156,186,195,157,176,147,149,192,204,146,94,234,109,35,90,3,228],{from: accounts[0]});
  });
});
