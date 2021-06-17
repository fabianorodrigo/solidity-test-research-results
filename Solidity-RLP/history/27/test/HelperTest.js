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
    let result = await contractHelper.isList([253,7,45,128,240,188,249,181,235,178,250,8,137,224,165,44,210,85,159,147,239,163,123,38,186,52,166,175,70,90,83,168],{from: accounts[0]});
  });
  it('Should execute itemLength(bytes)', async () => {
    let result = await contractHelper.itemLength([134,85,130,69,216,102,174,41,152,219,32,196,71,180,35,56,233,255,10,204,88,34,228,41,84,15,144,7,240,121,189,183],{from: accounts[0]});
  });
  it('Should execute rlpLen(bytes)', async () => {
    let result = await contractHelper.rlpLen([60,214,225,71,212,33,134,145,181,35,68,59,105,13,77,67,14,212,70,182,213,213,105,55,178,221,205,235,216,43,55,81],{from: accounts[0]});
  });
  it('Should execute payloadLen(bytes)', async () => {
    let result = await contractHelper.payloadLen([129,81,25,73,96,34,215,63,192,34,207,134,214,103,191,46,183,223,170,61,82,180,86,29,58,198,209,199,1,22,78,189],{from: accounts[0]});
  });
  it('Should execute numItems(bytes)', async () => {
    let result = await contractHelper.numItems([93,192,136,24,79,161,168,167,73,12,221,104,224,157,162,28,180,148,180,127,37,231,110,132,29,196,155,194,20,154,114,63],{from: accounts[0]});
  });
  it('Should execute toRlpBytes(bytes)', async () => {
    let result = await contractHelper.toRlpBytes([16,81,157,227,134,20,57,213,2,122,241,164,13,90,81,133,54,183,21,224,101,35,119,126,108,98,64,61,136,233,184,246],{from: accounts[0]});
  });
  it('Should execute toBytes(bytes)', async () => {
    let result = await contractHelper.toBytes([254,81,113,39,7,114,210,200,65,215,64,122,26,180,244,198,249,231,145,154,190,24,245,7,117,2,13,234,93,149,245,40],{from: accounts[0]});
  });
  it('Should execute toUint(bytes)', async () => {
    let result = await contractHelper.toUint([164,187,71,33,40,188,248,75,113,39,118,93,98,254,46,20,214,160,0,199,8,205,17,163,68,51,34,147,183,98,54,58],{from: accounts[0]});
  });
  it('Should execute toUintStrict(bytes)', async () => {
    let result = await contractHelper.toUintStrict([46,1,206,217,26,178,168,204,22,10,24,74,251,157,225,199,144,127,244,142,132,75,115,89,70,201,83,74,107,61,169,10],{from: accounts[0]});
  });
  it('Should execute toAddress(bytes)', async () => {
    let result = await contractHelper.toAddress([25,199,244,28,162,213,52,247,182,149,101,144,216,52,61,208,77,38,206,28,206,229,93,230,155,7,173,160,218,180,168,9],{from: accounts[0]});
  });
  it('Should execute toBoolean(bytes)', async () => {
    let result = await contractHelper.toBoolean([103,240,189,161,49,194,248,159,213,35,204,69,179,48,27,105,225,133,90,247,184,175,117,195,83,1,126,16,31,227,16,71],{from: accounts[0]});
  });
  it('Should execute bytesToString(bytes)', async () => {
    let result = await contractHelper.bytesToString([101,166,144,128,123,47,155,243,201,153,197,140,142,112,124,213,51,187,180,238,94,117,91,236,91,243,91,24,11,96,169,129],{from: accounts[0]});
  });
  it('Should execute customDestructure(bytes)', async () => {
    let result = await contractHelper.customDestructure([238,221,126,131,8,204,250,164,164,57,54,169,163,43,171,65,50,209,21,197,119,148,205,9,162,201,127,1,144,253,231,54],{from: accounts[0]});
  });
  it('Should execute customNestedDestructure(bytes)', async () => {
    let result = await contractHelper.customNestedDestructure([20,196,37,51,216,62,33,47,156,198,87,237,64,72,71,247,179,117,186,194,135,100,212,124,235,19,12,254,213,37,16,142],{from: accounts[0]});
  });
  it('Should execute customNestedToRlpBytes(bytes)', async () => {
    let result = await contractHelper.customNestedToRlpBytes([200,241,103,121,44,184,140,237,10,218,50,248,247,49,224,107,174,36,65,213,139,113,9,101,236,224,16,153,254,151,204,137],{from: accounts[0]});
  });
});
