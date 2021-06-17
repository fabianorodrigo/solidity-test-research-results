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
    let result = await contractHelper.isList([38,217,3,154,147,115,139,171,43,181,95,163,209,6,7,245,196,64,89,191,249,194,31,172,127,177,0,43,220,216,81,19],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([140,219,29,31,242,244,231,251,161,52,143,87,99,88,18,30,1,174,29,123,206,224,48,86,200,204,241,52,22,195,78,190],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([210,219,217,193,53,205,151,154,13,88,51,79,29,179,176,96,242,52,15,223,46,50,111,37,188,113,73,25,228,111,22,51],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([88,209,134,25,22,212,237,165,128,148,78,183,142,117,78,138,252,229,228,45,166,98,231,167,49,206,244,183,147,242,100,193],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([113,250,94,176,120,14,40,10,190,250,179,199,27,210,223,148,71,33,62,12,201,147,43,181,242,209,11,86,73,188,175,214],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([222,29,174,10,101,24,216,51,245,98,117,149,161,208,208,189,208,178,40,58,4,153,144,25,149,216,4,216,153,41,208,60],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([28,41,116,133,143,117,209,164,26,125,241,113,155,157,173,236,102,232,174,183,186,63,83,177,141,193,14,251,150,9,95,165],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([33,143,124,171,162,108,214,88,108,139,180,98,78,252,206,40,215,47,15,214,109,74,227,67,183,233,30,107,207,199,254,84],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([182,79,101,14,136,50,250,149,107,26,166,216,115,210,225,69,1,249,226,117,102,210,187,127,92,6,18,135,240,59,179,144],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([50,117,201,162,150,111,56,118,202,255,170,133,56,88,177,7,19,215,193,4,128,21,120,36,43,90,226,250,192,13,99,214],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([196,8,32,98,179,131,204,86,208,106,30,163,201,21,157,169,121,68,223,44,82,163,183,167,3,25,168,131,211,93,66,8],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([33,17,50,84,54,21,64,165,175,20,97,186,75,15,75,84,41,41,129,89,201,210,196,252,194,73,240,143,132,105,216,82],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([184,116,65,200,155,214,243,231,123,218,104,17,33,45,98,103,63,190,55,79,6,203,125,181,77,130,108,98,237,103,128,212],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([4,231,153,191,168,22,21,86,252,89,111,201,155,215,227,116,97,179,131,68,22,45,155,104,35,176,34,255,226,58,118,186],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([140,90,94,88,236,111,140,95,94,202,150,235,82,109,164,157,109,196,92,237,219,202,25,139,75,106,186,99,169,148,175,131],{from: accounts[0]});
  });
});
