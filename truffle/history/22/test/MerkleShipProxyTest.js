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
    let result = await contractProxyMerkleShip.test_reveal(63, [[15,229,7,202,115,153,34,192,12,45,171,254,167,185,209,22,6,89,61,138,191,83,219,103,21,67,4,181,179,161,102,13],[245,50,183,243,141,230,171,118,224,123,188,17,102,101,92,49,46,231,82,96,125,102,33,209,203,235,204,36,239,230,139,48],[138,116,210,86,169,91,237,26,198,114,107,16,53,65,35,40,231,165,239,161,33,64,229,63,154,130,13,139,151,122,41,96],[103,134,68,164,127,48,236,39,121,176,91,49,184,106,85,13,28,70,162,245,134,6,236,17,117,96,121,20,85,176,174,91],[220,252,31,216,112,107,28,237,32,108,58,220,95,4,120,40,160,185,24,249,22,102,35,113,218,227,187,104,244,132,37,134],[50,143,35,105,38,213,14,57,52,139,83,236,156,79,88,203,42,158,107,129,191,70,89,106,51,116,76,174,11,136,252,82]], "khx3pi",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(181,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(179,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["khx3pi","g7fui","khx3pi","2iw1c8","victory by abandonment","24dru","3eyi3","g7fui","verified victory by hit count","4ui3wr","3gxus9","victory by concession","verified victory by hit count","victory by unchallenged hit count","khx3pi","3gxus9","game resolved in an emergency","victory by concession","verified victory by hit count","verified victory by hit count","game resolved in an emergency","victory by abandonment","khx3pi","victory by unchallenged hit count","4ui3wr","victory by unanswered challenge","victory by unchallenged hit count","victory by abandonment","g7fui","3eyi3","victory by unchallenged hit count","jia4nr","uhxi7","rjeuhyf","2iw1c8","game resolved in an emergency","2iw1c8","khx3pi","rjeuhyf","jia4nr","uhxi7","victory by unchallenged hit count","khx3pi","game resolved in an emergency","g7fui","jia4nr","2iw1c8","g7fui","khx3pi","game resolved in an emergency","24dru","4ui3wr","g7fui","game resolved in an emergency","jia4nr","3gxus9","24dru","rry5wn","victory by unanswered challenge","game resolved in an emergency","khx3pi","jia4nr","3eyi3","verified victory by hit count"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["uhxi7","khx3pi","khx3pi","g7fui","3eyi3","4ui3wr","verified victory by hit count","2iw1c8","4ui3wr","wgclnw","victory by unchallenged hit count","khx3pi","4ui3wr","3gxus9","game resolved in an emergency","24dru","khx3pi","victory by unanswered challenge","rry5wn","24dru","victory by concession","verified victory by hit count","3gxus9","rjeuhyf","victory by unanswered challenge","g7fui","4ui3wr","3eyi3","2iw1c8","victory by unanswered challenge","victory by unanswered challenge","2iw1c8","2iw1c8","wgclnw","victory by concession","khx3pi","g7fui","3eyi3","2iw1c8","rry5wn","victory by concession","wgclnw","victory by abandonment","wgclnw","3gxus9","victory by abandonment","2iw1c8","3gxus9","uhxi7","khx3pi","uhxi7","3eyi3","3eyi3","rjeuhyf","vg8jz","4ui3wr","24dru","4ui3wr","victory by unchallenged hit count","game resolved in an emergency","r9dw5q","victory by abandonment","khx3pi","rry5wn"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["wgclnw","jia4nr","rry5wn","rry5wn","victory by unchallenged hit count","victory by unanswered challenge","jia4nr","2iw1c8","verified victory by hit count","vg8jz","r9dw5q","victory by abandonment","3gxus9","verified victory by hit count","3eyi3","2iw1c8","24dru","victory by abandonment","rjeuhyf","khx3pi","wgclnw","khx3pi","victory by concession","game resolved in an emergency","l563bl","r9dw5q","khx3pi","3eyi3","24dru","khx3pi","r9dw5q","vg8jz","g7fui","l563bl","victory by concession","game resolved in an emergency","qkq2k","3gxus9","vg8jz","rjeuhyf","victory by concession","victory by unanswered challenge","khx3pi","l563bl","2iw1c8","uhxi7","victory by abandonment","h0ogfi","victory by unchallenged hit count","rry5wn","rjeuhyf","qkq2k","wgclnw","3eyi3","rry5wn","victory by unchallenged hit count","uhxi7","2iw1c8","h0ogfi","victory by concession","game resolved in an emergency","victory by unanswered challenge","qkq2k","3eyi3"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[36,218,0,238,141,168,155,76,148,64,4,222,91,144,188,161,149,104,223,99,127,150,221,53,80,174,30,212,129,1,254,244],[146,117,101,38,200,107,220,241,234,229,214,147,251,96,101,195,33,134,133,123,4,97,187,94,180,251,153,173,63,131,149,203],[221,163,225,1,231,73,9,222,9,98,240,18,244,253,148,24,122,35,91,111,6,55,151,85,29,176,75,180,108,151,129,134],[55,102,94,123,74,27,89,5,54,123,4,244,87,88,169,199,34,241,80,161,144,188,185,121,40,159,225,167,133,2,203,151],[126,171,165,179,21,255,107,218,105,184,15,207,13,189,163,214,219,75,131,186,81,24,222,72,76,137,193,27,28,39,38,247],[180,253,92,93,213,113,203,232,215,29,222,246,15,163,131,195,70,219,155,192,192,212,127,211,18,32,20,45,45,239,75,140],[119,202,61,44,55,26,26,94,82,115,32,88,10,2,44,169,143,213,48,127,172,226,100,8,148,237,131,56,110,136,64,205]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[113,96,36,112,137,61,244,156,25,8,252,89,246,123,158,245,175,145,57,14,130,101,80,206,61,34,229,176,180,98,2,117],[228,176,143,241,131,94,209,87,252,27,225,111,135,66,252,169,80,232,231,29,232,250,50,84,96,48,52,134,228,19,186,233],[96,97,164,35,127,90,95,195,71,99,90,211,148,149,9,32,45,180,58,119,92,47,90,171,69,119,33,63,38,154,17,0],[58,186,196,91,68,195,168,172,53,102,131,201,178,244,30,103,37,169,2,13,127,16,199,1,247,160,90,119,124,160,206,101],[182,49,84,178,207,145,42,52,67,63,213,219,113,233,103,251,228,232,102,178,5,220,5,126,247,58,201,15,193,178,210,226],[167,52,216,34,231,11,235,170,150,119,191,9,65,93,206,7,33,145,120,15,230,20,147,213,232,150,165,109,245,115,167,71],[143,89,98,124,152,193,129,8,143,155,250,205,120,248,23,68,33,220,128,95,199,93,26,54,2,180,107,59,89,83,199,172]], 49, 39,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[99,6,53,208,152,102,214,54,225,61,177,238,40,127,100,44,48,219,136,99,106,243,27,137,191,243,31,158,159,68,92,135],[111,24,81,4,241,242,51,58,65,27,234,236,98,87,233,133,73,221,140,219,76,106,84,87,155,244,192,170,161,215,205,207],[210,5,134,186,43,140,59,100,138,191,238,56,219,44,158,70,253,90,112,152,213,52,49,48,4,130,69,6,255,207,84,106],[68,44,3,61,145,84,249,40,149,27,203,39,16,18,216,92,132,215,75,170,243,95,182,46,54,69,217,107,50,132,65,11],[176,125,160,75,198,191,232,117,249,244,97,86,92,250,60,210,79,62,254,103,164,68,170,106,102,57,46,84,115,54,221,180],[237,227,237,217,6,183,227,5,83,21,103,247,41,229,109,138,103,180,181,58,187,44,107,61,203,106,105,200,186,182,2,131],[152,106,31,6,58,127,120,150,98,224,172,12,78,137,30,39,152,175,194,41,253,34,140,107,22,120,101,34,176,145,201,6],[106,38,176,183,175,141,114,129,73,39,2,7,122,236,24,45,196,228,91,138,93,20,35,202,226,105,175,251,175,167,128,23],[25,139,86,189,6,30,85,98,203,190,238,185,39,226,190,37,17,89,15,114,13,223,77,174,227,123,58,108,249,240,5,252],[165,144,112,37,164,215,43,138,117,75,175,19,127,77,127,56,65,170,60,57,46,247,65,108,122,142,111,45,219,102,156,215],[100,171,223,92,211,37,164,94,173,144,70,34,25,27,85,185,185,20,196,228,67,217,138,45,67,205,215,120,203,69,48,178],[231,113,169,35,227,198,146,159,210,149,124,217,246,175,187,139,140,35,127,166,159,157,81,60,72,7,2,223,27,135,74,149],[196,155,205,112,11,156,121,182,121,85,124,211,189,158,34,191,250,137,129,165,213,36,210,62,239,142,144,242,218,29,210,187]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[19,160,51,156,165,227,83,218,157,237,128,181,114,199,9,215,184,136,58,189,58,74,159,117,13,202,246,253,105,2,4,26],[221,104,4,194,71,133,117,215,90,99,225,8,104,169,173,113,141,182,83,210,46,210,64,19,54,165,114,47,255,242,236,144]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[91,148,129,32,88,81,209,185,62,29,222,63,96,1,38,0,191,157,211,106,143,193,13,100,125,8,195,13,74,182,236,109],[210,184,50,63,149,148,216,119,80,6,80,157,70,63,75,65,131,198,5,250,154,142,19,249,143,95,211,99,0,144,232,117],[81,222,236,72,171,199,77,114,174,35,57,14,120,54,98,103,14,35,26,72,27,216,6,6,79,82,249,106,206,185,133,179],[182,127,105,113,115,206,40,80,215,179,61,210,15,205,137,57,203,141,89,224,250,122,120,207,205,50,177,17,233,10,172,231],[131,165,40,165,249,132,102,253,115,82,203,176,58,35,8,232,59,133,179,156,249,34,7,112,207,177,255,135,175,101,96,195],[196,94,41,163,15,219,159,143,106,245,79,180,242,61,144,103,93,11,174,142,233,97,235,111,88,119,98,249,12,117,222,123],[140,217,52,146,26,161,138,141,42,139,13,188,136,168,98,65,213,205,106,151,216,135,28,93,233,90,87,185,45,34,83,207]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[148,45,71,72,148,43,8,145,101,49,186,113,104,46,240,207,201,208,222,215,0,54,129,251,147,205,123,170,141,124,194,161],[64,178,48,58,206,254,164,143,138,11,211,167,234,207,197,186,247,94,217,218,162,6,186,164,18,225,150,88,230,185,127,8],[147,138,35,143,249,149,107,42,28,145,98,82,49,48,194,224,205,236,231,250,119,27,205,27,226,81,199,150,132,41,155,200],[236,194,225,50,167,208,182,234,111,230,118,183,4,83,192,177,190,190,34,225,168,250,28,106,123,1,178,207,107,162,219,89],[100,97,244,222,180,147,161,65,71,18,50,36,87,93,175,49,176,218,25,60,236,252,48,120,246,242,134,9,189,211,100,139],[136,163,214,180,123,4,23,210,18,64,114,21,138,86,175,35,60,145,31,62,225,8,179,115,11,77,14,145,236,166,71,101]], [74,19,103,216,149,82,217,35,175,221,242,165,8,199,107,3,178,175,103,127,117,162,157,49,15,68,128,133,54,189,210,176], "victory by abandonment",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(40, 48,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(41, 39,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("uhxi7", 180,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("4ui3wr",{from: accounts[0]});
  });
});
