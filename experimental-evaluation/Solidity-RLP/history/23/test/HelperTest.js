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
    let result = await contractHelper.isList([159,228,208,253,221,57,220,195,235,7,177,162,30,222,97,102,182,5,6,124,116,149,160,228,206,211,82,186,215,244,1,156],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([78,254,215,154,15,160,220,192,0,128,33,225,116,22,109,7,238,38,254,210,123,0,58,37,102,219,14,70,71,53,214,90],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([234,70,183,218,222,21,181,9,148,139,39,69,94,191,14,43,225,207,208,130,179,54,122,105,194,48,185,217,62,240,75,220],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([213,143,145,207,76,121,101,159,229,211,67,106,237,231,216,171,84,16,64,118,221,3,146,93,100,151,137,114,59,33,122,79],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([119,229,63,11,171,194,36,54,247,67,64,242,183,182,238,3,108,109,95,249,4,253,74,34,60,37,179,158,228,88,51,255],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([214,200,138,179,93,245,55,197,249,29,75,130,120,223,48,247,152,226,225,21,2,216,19,139,114,66,43,45,113,116,231,216],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([162,81,14,74,87,190,136,66,177,124,14,146,45,225,92,60,208,210,141,79,18,19,149,137,111,177,106,251,243,247,178,189],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([3,158,43,65,238,192,189,200,163,93,4,36,251,223,160,167,188,89,206,23,197,119,118,112,140,63,104,36,64,16,106,227],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([230,211,78,247,15,200,32,66,96,18,242,223,148,231,109,127,76,46,172,197,85,223,20,181,195,96,2,29,156,13,230,25],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([211,204,25,9,76,255,209,68,96,6,15,34,230,106,140,181,156,151,58,154,59,36,121,37,76,56,128,34,249,136,240,192],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([55,247,218,119,0,78,149,65,211,64,36,191,245,138,241,217,232,107,254,58,234,187,191,104,132,135,200,63,22,24,16,57],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([233,49,207,130,11,114,201,158,232,34,79,252,225,126,118,118,54,123,198,237,107,175,4,204,82,64,150,14,141,78,246,202],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([143,224,113,242,140,133,60,70,118,26,81,71,143,130,70,195,21,47,85,0,88,137,106,15,186,167,62,6,2,67,174,155],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([145,87,155,213,4,158,188,102,122,20,81,196,220,111,15,40,42,209,118,84,211,186,25,179,246,112,117,62,163,188,123,150],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([251,173,147,166,20,70,97,195,160,79,189,227,203,62,150,235,245,12,109,66,90,39,8,233,55,252,102,69,181,25,65,38],{from: accounts[0]});
  });
});
