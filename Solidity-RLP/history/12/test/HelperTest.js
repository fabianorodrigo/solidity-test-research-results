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
    let result = await contractHelper.isList([156,82,195,206,96,82,92,142,175,105,86,156,215,95,7,91,251,230,133,253,160,82,132,57,232,81,39,230,43,5,209,162],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([128,102,37,47,25,102,251,255,167,244,67,224,125,93,253,196,211,135,253,177,194,95,135,221,10,68,66,129,104,85,177,230],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([22,79,11,145,121,41,153,134,237,43,111,191,14,111,122,76,207,189,32,101,94,116,58,73,137,117,228,249,53,39,125,10],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([199,63,69,12,92,245,92,192,244,25,203,74,165,221,254,37,141,43,220,37,212,82,185,68,254,121,242,163,112,230,220,42],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([39,250,205,196,67,222,102,4,64,133,22,225,83,39,204,242,208,61,236,127,214,126,209,215,30,114,25,52,145,97,215,197],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([63,212,227,114,75,203,160,134,121,61,44,123,141,182,227,25,111,141,213,208,15,13,152,204,51,251,83,58,135,114,249,65],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([242,95,156,32,182,136,219,189,72,145,157,119,150,193,216,92,22,155,242,106,173,214,215,19,98,61,239,157,140,155,106,181],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([7,214,83,107,7,94,146,85,107,27,72,121,135,165,155,150,25,186,139,40,154,105,59,231,166,222,92,246,28,97,203,3],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([72,36,43,218,236,117,93,236,181,18,170,109,245,225,244,136,83,206,177,60,188,242,151,58,139,1,60,19,209,251,18,97],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([118,38,46,253,142,181,30,215,36,246,206,141,229,4,105,232,236,17,223,85,97,21,226,164,2,47,209,83,14,62,239,219],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([223,164,238,44,71,34,148,213,159,62,190,85,122,216,53,237,90,65,157,144,220,72,8,117,216,130,118,65,203,108,28,152],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([136,187,150,176,226,97,168,234,68,31,190,217,226,168,174,73,34,253,12,232,15,134,231,8,242,100,255,146,210,23,16,185],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([13,158,121,187,241,223,67,70,235,192,35,80,137,68,90,7,153,100,98,106,39,122,193,134,3,36,17,134,47,183,177,159],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([37,29,246,39,32,202,49,50,132,237,199,150,85,86,181,16,89,9,65,182,84,220,218,51,75,17,192,60,175,148,42,4],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([8,84,70,252,118,144,223,161,232,145,115,71,207,11,147,71,208,35,35,233,168,46,25,155,27,108,12,254,181,255,16,132],{from: accounts[0]});
  });
});
