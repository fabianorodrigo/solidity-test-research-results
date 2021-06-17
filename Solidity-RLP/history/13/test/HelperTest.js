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
    let result = await contractHelper.isList([213,71,39,247,0,26,122,69,89,55,220,61,203,86,29,114,36,210,221,12,196,8,180,101,91,157,144,220,140,239,70,241],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([245,170,50,147,83,127,210,5,153,232,105,186,47,90,114,22,52,252,82,173,33,108,162,60,164,252,106,15,234,125,150,147],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([205,162,173,196,0,92,239,202,212,7,189,147,242,103,187,30,227,84,164,240,44,97,149,150,219,54,255,148,141,207,132,59],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([24,157,137,136,77,12,178,21,228,45,94,201,130,68,75,246,129,92,181,178,155,237,239,235,177,224,245,34,206,237,142,228],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([70,167,232,38,63,87,203,236,230,31,0,109,202,229,76,167,186,73,111,75,180,14,195,250,2,194,74,138,74,130,249,48],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([199,60,250,107,79,66,42,94,71,169,199,252,82,254,76,129,183,182,161,27,82,123,168,207,9,223,200,129,21,219,34,152],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([61,119,206,148,108,189,55,200,37,81,3,91,117,237,166,161,245,128,16,129,99,141,69,137,129,142,56,142,225,200,215,196],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([205,236,241,147,218,81,72,21,28,205,61,155,45,217,166,113,53,41,189,249,8,112,90,222,28,189,25,22,117,151,12,145],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([49,134,90,149,110,190,178,150,107,116,249,25,161,153,202,2,168,103,22,137,130,122,189,19,215,130,236,252,149,25,96,190],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([253,27,126,155,26,237,243,176,92,56,48,112,150,176,183,196,178,153,37,120,59,11,202,113,213,202,62,49,243,174,178,95],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([61,163,88,25,44,21,46,75,51,140,113,226,225,110,6,155,6,118,137,16,218,15,125,56,61,196,169,57,36,243,18,81],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([210,133,204,165,30,61,190,59,22,211,223,248,12,222,185,122,156,75,96,11,101,230,196,121,39,214,48,211,76,243,160,33],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([71,238,148,145,104,147,213,229,142,176,127,222,15,218,84,3,181,127,189,110,133,112,113,134,54,205,36,61,250,105,181,148],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([121,16,75,145,160,218,123,194,146,107,237,175,207,68,49,69,40,146,70,172,154,35,117,132,128,208,205,56,240,250,162,190],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([69,172,35,23,108,199,176,187,142,10,8,109,240,112,142,50,97,87,77,192,101,81,148,206,239,174,220,185,95,155,57,170],{from: accounts[0]});
  });
});
