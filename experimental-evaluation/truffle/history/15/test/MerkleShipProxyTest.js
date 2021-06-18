const truffleAssert = require('truffle-assertions');
const MerkleShip = artifacts.require("MerkleShip");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxyMerkleShip = artifacts.require("ProxyMerkleShip");

contract("contractProxyMerkleShip",(accounts)=>{
    let contractProxyMerkleShip = null;
  let trace = false;
  let contractSafeMath = null;
  let contractMerkleShip = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MerkleShip.link("SafeMath",contractSafeMath.address);
    contractMerkleShip = await MerkleShip.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MerkleShip.new({from:accounts[0]}');
      ProxyMerkleShip.link("SafeMath",contractSafeMath.address);
    contractProxyMerkleShip = await ProxyMerkleShip.new({ from: accounts[0] });
});
  
  it('Should execute test_reveal(uint32,bytes32[6],string)', async () => {
    let result = await contractProxyMerkleShip.test_reveal(11, [[140,241,187,129,192,21,253,120,103,220,71,218,226,67,237,104,154,46,237,17,108,184,86,189,198,6,125,172,197,250,16,66],[66,82,56,105,153,119,158,203,61,98,157,201,54,160,190,69,108,117,208,67,38,235,194,115,142,141,42,121,190,170,203,33],[245,107,55,134,208,51,153,19,184,179,16,30,125,30,241,78,178,210,202,166,131,154,87,117,90,91,39,101,51,120,26,12],[41,78,176,51,129,20,168,112,48,185,45,151,150,199,27,25,133,177,146,241,151,92,74,16,171,52,13,57,142,97,149,236],[62,156,173,202,20,85,49,220,56,158,128,244,254,51,248,189,57,28,42,237,198,29,136,139,185,108,198,175,210,120,236,136],[227,113,8,148,238,201,129,225,222,15,113,130,38,42,242,240,123,238,84,85,83,47,62,99,168,97,17,246,23,168,18,22]], "8h4356",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(12,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(9,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["xy9m5","v4842x","hk99wm","xy9m5","victory by unanswered challenge","i5tn1b","qyl6cs","verified victory by hit count","xy9m5","b66dnv","victory by unanswered challenge","victory by unanswered challenge","qyl6cs","qyl6cs","victory by concession","b66dnv","victory by concession","fhmwe9","game resolved in an emergency","victory by unanswered challenge","victory by abandonment","victory by concession","b66dnv","i5tn1b","victory by concession","fhmwe9","victory by concession","b66dnv","v4842x","q9sgdk","b66dnv","7rzrb","8k3cj8","victory by concession","8k3cj8","victory by unanswered challenge","verified victory by hit count","b66dnv","i5tn1b","7cl7ic","qyl6cs","7rzrb","hk99wm","game resolved in an emergency","victory by unchallenged hit count","8qe5te","kn8qjl","victory by concession","7cl7ic","b66dnv","v4842x","fhmwe9","victory by concession","qyl6cs","victory by unchallenged hit count","b66dnv","q9sgdk","victory by abandonment","kn8qjl","7rzrb","victory by unanswered challenge","7rzrb","xy9m5","v4842x"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["b66dnv","8k3cj8","b66dnv","8h4356","fhmwe9","qyl6cs","b66dnv","victory by unchallenged hit count","8k3cj8","verified victory by hit count","b66dnv","kn8qjl","8qe5te","7cl7ic","victory by unchallenged hit count","game resolved in an emergency","1untld","verified victory by hit count","7rzrb","7rzrb","hk99wm","qyl6cs","xy9m5","xy9m5","victory by abandonment","8qe5te","hk99wm","1untld","8h4356","hk99wm","i5tn1b","7cl7ic","00anco","game resolved in an emergency","verified victory by hit count","b66dnv","1untld","b66dnv","victory by concession","v4842x","hk99wm","victory by abandonment","q9sgdk","ksqvgp","8k3cj8","hk99wm","00anco","xy9m5","i5tn1b","7rzrb","7cl7ic","7rzrb","8k3cj8","7cl7ic","i5tn1b","i5tn1b","victory by unanswered challenge","8k3cj8","1untld","7cl7ic","qyl6cs","ksqvgp","8w5zbn","8w5zbn"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["8k3cj8","kn8qjl","victory by abandonment","7rzrb","ksqvgp","fhmwe9","victory by concession","qyl6cs","1untld","fhmwe9","victory by unchallenged hit count","8w5zbn","victory by concession","7cl7ic","victory by concession","victory by concession","8w5zbn","00anco","victory by unanswered challenge","b66dnv","qyl6cs","8qe5te","victory by concession","v4842x","v4842x","1untld","8w5zbn","i5tn1b","verified victory by hit count","1untld","b66dnv","i5tn1b","ksqvgp","victory by abandonment","hk99wm","qyl6cs","victory by abandonment","hk99wm","victory by abandonment","8h4356","game resolved in an emergency","verified victory by hit count","victory by concession","00anco","game resolved in an emergency","8k3cj8","verified victory by hit count","game resolved in an emergency","victory by abandonment","victory by abandonment","tbc7t","q9sgdk","1untld","8k3cj8","i5tn1b","victory by unanswered challenge","00anco","1untld","1untld","ksqvgp","hk99wm","8qe5te","v4842x","1untld"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[103,141,137,136,217,104,20,73,145,232,209,20,235,43,133,175,107,144,225,107,108,191,30,27,185,47,71,155,6,97,184,97],[47,69,122,0,124,127,3,198,171,146,127,58,164,155,200,198,110,88,208,56,235,40,134,121,214,48,249,132,241,71,39,0],[225,103,63,130,176,225,121,214,154,35,146,244,155,79,94,80,129,29,183,170,142,114,118,2,164,192,114,250,68,249,97,64],[189,225,130,44,213,2,153,115,124,79,36,93,129,98,36,133,178,137,131,6,228,242,172,140,209,42,170,225,202,124,85,224],[199,47,128,75,11,63,18,216,227,163,104,87,199,164,177,34,145,47,148,52,220,47,220,192,119,31,84,65,73,166,62,178],[41,117,102,79,233,105,206,109,155,46,93,116,42,167,161,153,124,92,130,157,143,252,142,251,44,210,197,210,128,242,98,49],[184,228,166,116,97,80,74,1,198,193,178,128,127,254,67,133,111,122,245,211,76,30,216,105,229,9,140,204,212,168,34,34],[2,134,11,18,204,234,213,177,13,116,186,253,203,100,24,171,141,248,248,153,100,105,70,132,82,227,193,103,225,136,97,146],[187,221,116,220,158,3,13,248,104,30,79,127,74,107,221,11,79,76,234,18,175,101,84,245,235,228,87,219,72,186,169,94],[95,120,121,161,138,33,4,131,58,117,89,69,238,207,165,119,197,1,55,223,152,232,148,176,13,253,220,73,140,214,108,148]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[86,59,184,32,127,24,167,196,149,165,110,103,65,227,250,250,216,69,46,74,174,21,237,231,225,222,37,158,111,113,135,21],[97,120,139,240,204,232,55,244,199,135,73,227,169,237,163,166,143,157,29,143,251,126,198,51,246,99,152,212,5,189,214,139]], 65, 180,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[209,183,84,241,114,239,89,1,99,247,2,189,228,192,61,150,254,46,137,109,12,90,141,206,52,96,255,67,219,181,192,129],[160,108,117,36,153,71,65,204,140,219,89,49,192,45,125,39,237,21,106,152,103,17,73,41,219,59,15,75,48,25,156,240],[245,43,182,50,143,127,49,136,90,79,164,186,39,100,48,212,93,167,254,90,89,52,236,202,200,192,149,254,110,54,185,162],[208,206,251,183,56,21,128,127,196,30,239,206,114,97,39,79,23,153,131,235,129,255,15,203,208,44,160,209,156,254,48,241]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[174,213,8,145,207,17,13,10,235,253,218,243,4,180,24,181,203,221,255,152,10,13,148,68,134,141,111,117,161,104,234,55],[49,42,119,165,160,94,35,19,102,54,250,23,16,240,131,144,136,97,115,127,147,123,91,198,181,134,64,165,159,10,156,8]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[225,210,27,62,72,96,71,229,127,103,80,87,224,112,145,25,174,151,134,208,1,38,7,6,60,38,249,10,116,222,123,251],[236,109,147,232,137,185,183,232,131,19,67,30,193,119,98,179,20,200,88,254,217,105,40,44,224,220,46,164,130,79,177,113],[231,210,119,3,75,149,132,169,114,243,90,96,221,23,33,101,55,246,49,227,90,159,124,243,126,188,216,108,45,113,102,49],[7,127,195,73,35,78,81,5,12,207,21,228,42,60,233,45,55,240,127,147,248,172,109,206,221,79,245,156,176,233,243,144],[203,161,24,29,214,42,104,105,222,6,32,240,24,237,189,255,77,112,63,149,123,5,118,180,202,163,253,192,170,211,226,167],[197,107,80,63,14,170,102,151,81,206,188,190,185,206,3,144,103,165,17,181,4,221,18,120,37,181,228,77,138,217,221,86],[21,70,121,189,49,51,126,28,204,217,211,145,203,24,90,247,2,223,218,40,105,113,124,183,116,196,97,114,25,176,170,128],[13,156,27,165,179,98,40,69,110,216,41,176,171,133,124,15,54,158,164,85,55,105,17,229,222,3,41,4,186,68,103,23],[149,121,199,247,202,86,44,34,83,106,188,90,166,251,117,192,89,212,18,144,34,126,95,116,72,190,205,45,33,164,28,234]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[253,222,210,119,174,70,186,18,195,152,65,50,29,6,167,187,138,51,177,201,222,211,16,211,246,175,201,219,40,33,142,86],[181,170,144,121,112,78,243,173,68,81,231,171,180,241,114,120,97,206,28,243,244,134,162,150,131,210,183,52,252,207,42,6],[168,200,224,92,145,247,90,151,150,208,24,14,174,192,126,77,134,37,133,89,61,10,167,216,2,139,35,176,252,249,54,142],[44,161,238,129,245,173,66,186,215,130,227,183,67,114,211,41,100,70,254,87,125,183,248,71,238,147,104,217,253,6,70,235],[185,60,228,3,30,40,151,178,54,148,210,140,39,245,162,4,187,55,153,131,216,248,116,22,88,142,17,150,235,207,25,236],[80,68,8,186,110,248,40,96,29,180,86,253,28,200,120,62,47,94,12,47,28,77,94,176,124,255,238,196,4,102,45,77]], [4,6,218,214,42,163,65,244,241,40,142,116,198,238,243,126,129,58,201,110,50,24,97,213,197,158,249,132,67,171,234,235], "7cl7ic",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(48, 64,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(48, 9,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("8qe5te", 1,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("game resolved in an emergency",{from: accounts[0]});
  });
});
