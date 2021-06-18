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
    let result = await contractHelper.isList([4,201,83,174,185,255,202,62,135,98,33,211,165,59,100,145,230,112,177,153,109,220,167,169,235,30,53,50,99,201,15,213],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([92,210,72,143,69,61,72,81,111,130,154,40,249,221,175,176,43,142,121,112,245,1,151,186,48,21,133,255,103,194,193,42],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([16,142,93,40,38,235,25,139,202,133,49,245,105,224,153,180,114,255,198,172,159,196,249,127,176,127,112,12,5,34,95,184],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([112,123,135,22,95,192,165,172,251,91,251,245,12,171,61,83,111,237,103,218,33,199,54,8,94,219,198,165,101,121,177,123],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([202,91,251,45,109,242,139,196,76,88,228,15,162,169,91,191,61,232,124,124,119,136,21,88,167,243,166,207,254,0,175,140],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([91,109,72,42,166,192,224,43,118,185,75,30,133,159,10,235,129,69,25,14,118,78,34,146,136,124,198,168,0,222,64,42],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([28,143,104,107,96,1,26,66,216,170,217,72,11,114,162,123,187,111,67,182,235,198,246,126,43,66,172,215,34,128,241,46],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([113,154,129,127,98,236,163,180,9,104,250,247,187,211,251,25,82,213,99,125,34,220,124,155,30,21,180,40,51,152,111,154],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([25,32,189,186,228,25,123,4,122,133,204,206,88,210,68,125,142,99,179,111,189,232,60,215,100,226,19,76,3,237,221,23],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([159,38,46,82,201,115,188,255,58,183,37,13,115,60,81,116,244,230,5,212,13,37,209,177,174,115,54,41,240,117,150,190],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([89,202,72,24,46,152,244,161,80,2,188,229,163,48,130,43,255,243,211,40,153,52,72,244,125,233,91,188,162,6,36,130],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([44,140,101,167,189,179,177,233,211,192,126,16,116,128,15,250,215,198,166,27,80,118,53,229,112,162,45,41,236,27,204,125],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([246,22,224,166,204,207,70,25,228,39,66,111,241,4,243,18,194,151,10,42,157,13,150,190,59,6,140,65,60,151,87,174],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([51,43,167,115,205,224,118,189,2,107,215,225,107,33,122,253,226,73,207,168,226,59,133,116,41,71,128,163,96,199,121,216],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([113,147,216,70,47,9,122,102,67,170,183,219,224,249,202,54,26,128,103,42,17,156,235,229,118,99,234,162,88,84,184,78],{from: accounts[0]});
  });
});
