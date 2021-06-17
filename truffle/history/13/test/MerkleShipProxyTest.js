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
    let result = await contractProxyMerkleShip.test_reveal(13, [[127,227,252,141,124,165,14,100,90,114,35,155,180,217,158,118,103,0,132,109,68,38,229,171,252,208,187,56,152,150,141,82],[93,162,5,12,42,155,178,196,118,84,166,199,138,192,64,21,208,156,114,252,193,146,205,56,210,61,180,104,159,186,250,110],[85,127,86,3,86,39,128,240,178,33,161,72,2,3,8,76,40,87,50,88,12,211,215,179,93,174,211,101,21,204,128,57],[102,205,220,106,194,30,97,161,180,33,65,186,83,117,240,44,175,100,32,57,88,75,18,185,68,34,143,7,57,84,90,25],[58,21,100,185,226,17,63,205,42,68,37,178,180,138,226,186,182,221,161,8,42,35,238,142,62,73,247,91,72,189,51,196],[30,83,189,12,202,55,102,46,72,48,219,94,24,66,253,46,121,19,55,4,180,162,170,40,71,69,148,54,136,251,25,17]], "zjux0q",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(3,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(179,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["victory by concession","victory by unanswered challenge","gzsqlk","zjux0q","gzsqlk","e5iudc","gdumbz","e5iudc","victory by unchallenged hit count","victory by unanswered challenge","y0work","gdumbz","game resolved in an emergency","gdumbz","game resolved in an emergency","victory by concession","4vhvs","e5iudc","victory by concession","g32jsn","verified victory by hit count","y0work","game resolved in an emergency","victory by abandonment","victory by unchallenged hit count","victory by concession","victory by unanswered challenge","vcvyzx","victory by concession","victory by unanswered challenge","victory by unanswered challenge","4vhvs","y0work","victory by concession","verified victory by hit count","gzsqlk","gzsqlk","vcvyzx","e5iudc","m00bhi","e5iudc","zjux0q","gdumbz","m00bhi","e5iudc","g32jsn","y0work","vcvyzx","victory by abandonment","y0work","g32jsn","zjux0q","victory by unchallenged hit count","cha8e","victory by abandonment","victory by unchallenged hit count","vcvyzx","gdumbz","e5iudc","y0work","g32jsn","4gz8ag","g32jsn","victory by unchallenged hit count"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["4vhvs","g32jsn","e5iudc","4vhvs","zjux0q","4gz8ag","game resolved in an emergency","y0work","omvate","zjux0q","vcvyzx","victory by unanswered challenge","game resolved in an emergency","verified victory by hit count","4vhvs","game resolved in an emergency","verified victory by hit count","m00bhi","4vhvs","verified victory by hit count","omvate","y0work","omvate","4vhvs","victory by unchallenged hit count","game resolved in an emergency","victory by unchallenged hit count","4gz8ag","m00bhi","gzsqlk","e5iudc","gzsqlk","y0work","y0work","zjux0q","victory by unanswered challenge","omvate","zjux0q","g32jsn","ux17o0d","vcvyzx","m00bhi","ux17o0d","g32jsn","4vhvs","y0work","victory by unchallenged hit count","victory by unchallenged hit count","y0work","gzsqlk","vcvyzx","victory by concession","m00bhi","ux17o0d","verified victory by hit count","ux17o0d","4gz8ag","zjux0q","victory by unchallenged hit count","g32jsn","cha8e","m00bhi","omvate","game resolved in an emergency"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["gzsqlk","e5iudc","victory by concession","4gz8ag","4gz8ag","4gz8ag","g32jsn","victory by unanswered challenge","omvate","omvate","4gz8ag","zjux0q","m00bhi","victory by abandonment","4gz8ag","victory by unchallenged hit count","gzsqlk","e5iudc","g32jsn","y0work","m00bhi","cha8e","zjux0q","victory by unanswered challenge","omvate","gdumbz","mvp13k","4vhvs","vcvyzx","cha8e","gdumbz","mvp13k","gzsqlk","tn3q7","zjux0q","gdumbz","vcvyzx","cha8e","victory by concession","g32jsn","mvp13k","4vhvs","m00bhi","4vhvs","ux17o0d","verified victory by hit count","e5iudc","gzsqlk","cha8e","ux17o0d","zjux0q","victory by unanswered challenge","zjux0q","ux17o0d","game resolved in an emergency","ux17o0d","verified victory by hit count","zjux0q","omvate","cha8e","y0work","zjux0q","y0work","game resolved in an emergency"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[35,187,188,253,178,4,230,36,206,249,166,6,117,104,180,101,181,221,198,8,206,227,115,196,135,125,31,224,242,140,188,0],[4,193,73,237,115,137,69,63,53,164,146,185,143,182,216,75,170,168,117,119,37,165,86,29,192,127,97,212,27,68,32,19],[214,223,218,249,49,67,240,240,1,101,22,158,170,225,125,217,60,62,22,110,239,62,204,48,214,154,2,114,33,240,55,234],[252,252,59,204,117,98,11,121,164,210,49,205,45,110,49,102,160,187,181,86,81,237,94,17,14,106,204,99,165,26,8,247],[88,77,8,5,61,206,29,205,213,73,236,146,200,184,11,236,179,82,222,17,234,105,89,146,68,82,99,102,209,166,45,90]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[160,16,132,79,62,156,99,243,128,254,58,200,210,254,84,121,166,213,101,189,126,52,187,213,35,190,59,243,25,32,71,5],[243,42,26,109,137,245,83,71,197,66,121,17,17,240,84,153,253,61,241,115,11,245,241,251,43,36,120,50,215,93,157,24],[140,117,93,15,96,204,179,176,95,56,107,231,121,48,141,19,20,30,244,89,131,190,94,71,75,84,210,17,156,9,196,99]], 4, 101,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[211,243,87,51,30,125,185,34,125,24,44,195,4,99,43,26,23,51,197,106,95,217,219,160,248,42,40,12,215,68,140,20],[219,214,5,109,163,128,16,124,145,213,181,232,213,134,80,144,155,169,156,184,45,4,13,218,3,34,117,213,233,6,72,162],[162,53,254,167,181,11,39,208,144,133,238,225,180,255,85,154,164,21,59,246,79,36,49,70,246,75,48,104,228,178,229,124],[192,38,158,211,121,59,214,126,237,111,187,211,40,210,119,17,28,146,170,232,175,6,83,85,152,119,251,68,113,47,166,68],[72,21,158,255,79,254,53,173,136,63,229,244,105,99,35,63,158,243,140,203,54,37,226,217,110,156,68,20,39,15,1,96],[65,245,74,132,174,84,130,44,55,244,108,60,36,53,62,106,121,198,213,222,199,157,104,202,252,95,133,59,193,7,47,93],[127,85,88,47,181,200,142,238,231,59,77,209,23,226,42,232,185,252,118,50,240,161,255,181,132,93,90,175,164,133,44,154],[52,190,46,116,58,59,1,241,174,219,180,165,143,90,191,128,210,72,165,122,207,89,5,139,79,63,56,71,166,181,97,196],[19,101,196,93,174,115,29,73,244,76,183,57,145,203,3,200,218,214,243,165,177,244,238,45,124,212,36,211,7,73,223,113],[46,248,116,104,128,35,20,230,172,131,248,38,206,108,2,252,160,244,221,184,41,72,12,142,56,52,197,117,252,155,180,121],[31,25,23,206,138,89,112,122,33,213,79,178,86,53,177,53,177,205,149,186,67,229,227,215,158,28,188,130,125,10,236,223],[175,165,21,5,148,137,69,128,165,93,161,77,194,188,242,159,105,39,202,11,128,137,64,187,28,164,107,70,197,3,213,189],[157,52,88,69,196,86,233,114,143,35,241,167,20,201,61,127,170,207,246,134,200,22,81,35,205,92,103,185,41,154,253,231],[228,233,128,55,250,87,126,136,34,210,121,55,66,242,236,11,241,59,129,212,25,71,109,13,230,37,196,47,60,104,238,10],[146,6,113,184,193,75,8,147,67,6,249,2,138,204,17,41,178,96,76,224,65,181,207,156,15,214,14,49,245,220,163,109],[111,250,70,146,115,205,188,163,119,218,227,88,12,130,96,57,209,200,146,227,220,185,61,105,35,105,157,182,203,188,205,207],[182,245,224,116,40,53,119,206,89,246,25,254,130,98,201,166,144,251,0,131,241,42,178,182,161,197,178,242,99,227,45,14],[116,239,210,206,84,83,60,129,169,48,215,199,225,15,249,89,75,244,232,240,109,112,192,250,216,168,220,144,78,204,102,58],[48,110,90,144,35,155,38,173,33,49,6,139,69,53,17,124,228,57,32,119,135,26,122,193,242,122,252,105,22,202,100,157],[115,80,100,122,85,86,216,247,177,80,201,198,173,111,211,64,217,30,143,132,112,77,210,218,26,21,26,33,136,105,47,191],[37,167,85,25,53,132,99,205,228,188,133,51,39,17,211,175,95,232,81,181,216,83,70,103,140,185,163,255,149,148,60,234],[219,74,56,3,136,136,242,186,84,135,70,32,250,236,236,218,162,212,172,223,162,157,178,191,212,16,214,139,18,178,57,253],[175,38,194,179,176,103,53,181,104,167,93,246,0,131,3,30,34,12,168,65,253,104,147,11,86,176,203,196,71,120,159,143],[79,240,223,91,74,189,61,78,163,59,201,17,210,100,195,224,147,241,177,189,4,148,205,16,103,151,189,149,132,90,140,1],[52,21,243,75,41,12,204,29,180,107,33,255,170,115,246,51,13,84,82,201,39,115,159,94,215,87,64,137,179,112,233,38],[85,170,77,98,40,82,140,153,211,182,51,148,104,26,181,247,37,180,36,49,194,25,148,242,192,174,111,78,240,98,247,10],[145,82,43,239,120,91,30,27,234,220,102,235,174,147,110,28,241,26,249,174,154,153,79,242,90,220,241,18,23,89,137,88],[206,162,51,82,113,13,104,94,58,19,194,45,94,71,30,212,177,223,183,232,121,217,43,254,225,231,185,220,42,111,42,162],[177,186,218,84,129,51,255,51,239,18,118,207,215,120,240,253,24,79,213,27,118,160,149,34,172,95,36,101,25,147,84,5],[129,115,94,220,158,220,101,249,81,115,108,40,200,27,230,16,44,231,46,223,155,141,150,15,181,19,60,216,56,253,183,144],[84,44,143,104,171,169,220,53,253,134,11,103,232,244,241,45,182,141,47,75,162,95,215,126,229,5,168,1,250,176,147,238],[147,19,169,194,106,25,179,225,163,251,184,19,96,202,131,37,34,116,246,166,55,0,101,139,17,101,113,61,158,128,206,106],[254,213,40,220,213,14,106,221,116,182,48,145,63,207,60,236,116,185,89,21,21,252,157,88,231,248,44,183,149,29,50,107],[208,253,82,111,222,4,192,0,42,107,60,156,96,111,141,145,58,213,253,139,171,227,123,210,66,127,181,223,50,98,164,1],[114,88,28,55,233,155,178,227,146,58,46,180,210,172,119,68,84,51,86,22,123,217,195,238,12,173,14,254,42,65,32,66],[31,192,194,101,93,4,247,186,81,243,238,182,224,252,192,64,192,253,105,192,184,140,160,231,81,67,161,44,112,186,83,125],[151,132,177,1,213,189,190,172,165,254,243,204,83,182,117,174,162,90,139,70,127,186,91,249,211,153,75,153,243,136,99,142],[215,77,99,6,115,248,93,201,181,121,0,46,189,246,22,11,218,44,155,16,197,168,91,54,94,153,175,214,105,168,39,57],[45,75,68,167,115,40,104,85,127,28,16,89,131,245,166,37,10,110,82,248,210,149,69,8,153,228,0,139,218,175,118,241],[171,80,164,165,121,115,150,21,65,50,51,60,62,105,85,246,204,111,20,118,83,146,191,70,193,229,73,54,29,102,110,119],[136,49,63,240,61,74,105,228,182,71,88,209,208,59,28,184,143,182,90,186,89,63,30,75,168,75,212,225,76,42,206,180],[157,237,242,158,26,141,42,231,144,3,194,56,63,39,38,244,82,106,162,0,238,67,253,101,167,207,129,66,77,198,166,137],[130,119,56,221,165,138,74,184,160,16,53,230,37,235,50,223,218,108,99,216,209,41,144,10,26,250,13,39,159,195,179,163],[194,92,63,141,208,203,134,167,116,57,162,216,175,214,111,21,45,62,123,125,170,93,154,63,22,218,253,75,249,42,140,69],[102,92,201,94,125,69,139,142,46,181,158,43,45,101,248,24,48,16,53,165,244,38,91,181,26,222,166,132,198,203,189,107],[175,230,35,30,148,152,50,245,67,61,212,179,212,60,91,231,120,211,57,89,15,156,221,254,84,245,192,127,48,235,156,218],[80,187,122,181,7,249,58,45,140,118,218,148,214,250,212,144,252,255,206,157,140,87,32,232,73,89,9,11,137,111,191,23],[195,52,94,128,230,79,96,183,224,131,65,194,63,223,18,231,59,54,73,192,32,220,81,183,17,211,231,240,142,236,254,87],[188,60,55,84,168,197,67,141,224,222,241,86,228,50,188,42,197,154,220,101,226,131,104,82,165,48,224,94,162,186,197,203],[192,225,220,3,162,98,178,34,196,19,198,222,247,116,113,241,26,241,218,207,68,209,79,59,26,64,72,91,214,82,169,219],[28,144,212,118,254,184,207,109,174,223,12,49,69,155,51,44,204,143,17,223,166,32,211,127,32,86,45,251,105,96,82,169],[20,79,39,154,237,195,66,32,205,84,37,155,140,89,19,26,229,82,190,159,146,204,146,176,8,248,138,36,194,83,118,68],[71,127,139,97,49,72,93,62,2,12,111,184,205,195,210,203,67,79,120,37,218,110,54,131,38,68,31,84,52,6,51,11],[159,0,146,11,41,115,19,48,184,182,64,29,202,134,24,183,133,130,178,192,192,54,144,255,154,156,75,15,219,63,109,167],[126,221,150,141,162,212,16,76,61,182,241,53,207,105,50,28,137,113,213,56,235,57,99,77,192,8,190,193,222,29,187,10],[31,197,84,179,3,212,186,94,20,177,228,222,17,209,217,78,87,212,92,101,75,65,63,92,200,156,232,77,222,96,68,62],[22,76,200,61,255,132,68,127,62,190,93,18,194,89,49,108,248,136,146,170,97,66,198,23,110,195,212,7,20,76,191,108],[162,140,161,130,181,250,91,7,137,196,248,185,179,161,221,219,236,94,26,121,209,24,212,126,3,176,230,125,84,12,239,39],[209,218,53,121,209,16,242,203,146,47,188,110,147,15,250,212,247,91,64,187,70,187,27,183,73,187,43,88,95,137,41,169],[232,204,12,57,40,24,77,56,240,230,42,173,166,17,188,70,79,161,202,210,166,226,111,198,200,193,210,47,11,51,92,76],[102,137,63,37,73,193,118,211,98,46,101,60,9,42,178,245,235,20,214,191,251,231,39,23,11,115,89,165,245,14,200,133],[175,176,9,161,154,49,184,200,118,252,230,136,154,244,186,155,42,70,250,70,155,115,197,39,41,194,175,39,240,218,229,167],[89,89,162,34,7,62,248,184,144,45,82,245,86,43,155,188,2,5,114,245,37,141,89,112,131,170,106,176,116,57,246,130],[50,17,111,252,37,228,95,247,118,197,198,182,79,242,253,77,242,18,43,163,162,50,249,237,161,47,115,113,200,87,196,231],[153,255,218,94,27,229,100,153,59,247,52,234,216,244,29,103,107,27,163,90,19,202,6,69,210,144,109,255,148,203,156,89],[14,241,179,202,35,73,122,84,208,252,158,163,77,231,205,134,127,110,131,52,130,91,153,87,229,225,23,64,56,72,129,203],[110,128,110,58,8,153,149,137,39,36,212,230,18,238,228,137,34,82,198,27,221,87,125,162,20,150,69,79,155,146,168,153],[158,100,193,158,220,49,10,63,222,211,22,210,62,163,156,97,58,203,93,21,229,199,139,194,32,195,77,164,85,222,143,27],[95,187,248,44,221,84,230,171,64,48,18,134,1,231,47,175,213,210,161,213,239,160,140,1,25,0,148,104,167,198,56,228],[210,77,81,19,165,130,59,242,235,236,61,88,60,223,213,165,92,101,79,87,215,245,63,87,126,177,197,167,74,0,151,32],[254,2,8,253,130,226,121,182,215,132,160,140,59,133,118,208,250,231,90,183,234,32,148,202,161,185,13,59,83,67,53,113],[213,26,69,184,15,16,224,199,35,96,197,136,195,149,255,19,102,113,224,61,109,213,164,104,221,120,188,233,90,105,115,216],[83,154,142,31,6,43,114,59,20,70,198,34,178,191,5,128,225,44,30,192,229,34,192,6,68,9,31,194,42,164,84,74],[67,37,166,2,1,41,32,172,186,122,21,113,214,16,43,149,99,22,183,241,226,125,18,151,205,243,121,245,17,15,221,123],[221,226,253,224,17,75,224,189,163,232,140,7,239,58,214,104,251,238,92,213,6,162,8,134,208,82,17,105,246,21,170,79],[11,114,101,87,203,165,215,231,115,157,202,202,22,230,4,203,120,66,144,50,225,128,34,7,4,238,183,148,3,54,117,183],[116,145,196,127,222,153,101,105,237,236,178,252,19,45,78,147,165,133,107,229,30,121,49,22,44,64,157,5,175,1,76,188],[198,29,213,169,156,186,143,177,132,66,186,52,101,81,246,17,19,207,249,197,221,149,89,103,5,146,173,161,202,89,132,78],[228,191,14,217,23,143,196,171,198,48,62,6,112,54,6,252,92,210,233,214,158,8,133,138,77,129,153,53,186,42,138,67],[156,209,136,169,52,135,166,145,12,26,108,217,187,40,212,142,237,250,98,205,161,100,183,193,190,104,162,11,26,240,27,211],[197,44,189,234,240,188,121,102,215,144,131,61,89,1,232,187,219,204,202,9,35,47,73,98,105,72,218,66,51,173,234,199],[95,127,1,104,93,38,159,86,229,41,19,76,25,105,216,19,169,58,76,18,211,22,8,255,40,59,19,10,234,40,3,88],[191,145,228,47,165,67,34,63,222,208,77,92,142,113,29,255,126,232,219,254,166,133,79,131,221,104,29,67,248,70,42,149],[123,174,233,250,45,242,153,89,48,89,26,197,35,58,215,48,81,95,183,152,150,129,128,76,104,59,71,139,42,52,115,125],[3,94,231,42,174,138,11,108,229,178,252,145,185,163,142,50,202,25,118,243,252,75,193,235,121,153,126,52,167,121,213,205],[4,166,138,141,7,25,96,245,133,231,119,121,201,121,80,4,132,220,69,80,2,41,90,127,6,144,227,126,168,135,15,83],[118,7,228,50,46,151,241,107,24,235,35,177,168,166,81,223,110,128,49,242,159,242,47,118,227,136,2,62,135,17,128,147],[200,126,6,176,144,49,127,205,247,54,149,76,225,232,181,56,63,198,10,68,200,21,18,182,186,154,41,200,139,141,163,139],[249,238,207,159,126,12,108,158,35,40,101,167,84,125,17,233,86,87,81,91,104,178,226,12,45,255,239,116,122,43,215,239],[77,179,239,186,112,57,35,201,61,248,197,187,15,190,116,149,224,38,34,148,19,79,34,202,52,20,228,118,60,51,29,50],[124,100,224,18,250,49,89,142,178,207,247,111,72,127,123,204,63,161,150,22,51,98,59,236,160,88,121,206,2,223,52,43],[202,197,163,206,130,92,138,107,64,79,179,46,198,7,62,106,116,30,218,230,217,37,115,126,53,181,160,152,181,2,228,45],[178,107,40,119,153,232,95,24,26,92,95,31,238,195,32,61,50,8,138,26,243,172,192,108,51,11,177,38,174,212,251,102],[161,157,169,254,48,83,187,143,33,218,53,225,64,88,105,63,72,90,45,254,218,135,36,73,61,90,178,47,173,251,122,202],[81,90,53,78,232,13,69,131,185,152,55,157,29,236,229,10,97,76,214,34,51,213,245,226,172,91,75,57,107,204,129,153],[235,121,87,40,176,95,52,250,103,145,10,144,89,90,233,149,206,114,10,143,255,173,105,91,253,65,176,214,26,13,240,173],[253,43,190,184,50,211,187,207,214,172,222,138,222,28,39,195,219,191,214,12,156,28,186,11,252,99,211,78,189,58,154,231],[223,13,205,20,143,160,95,185,149,146,6,4,250,151,92,43,98,19,6,140,161,177,107,184,81,210,122,4,243,86,65,32],[100,112,37,224,5,195,172,58,104,232,84,194,252,39,5,23,111,82,146,136,28,206,50,199,92,75,14,193,161,70,143,181],[242,164,218,14,151,66,0,138,187,169,49,103,100,116,234,189,20,230,43,148,114,238,233,97,79,130,117,228,39,167,214,205],[164,195,31,8,98,216,58,217,63,19,43,79,117,240,179,49,194,191,211,119,224,161,177,56,197,198,174,48,255,19,202,228],[158,200,100,228,52,136,15,127,54,59,155,41,202,88,195,149,109,244,70,247,248,99,98,128,203,251,30,104,210,194,180,110],[28,171,175,135,74,123,129,95,186,60,27,179,68,151,64,246,99,103,166,20,193,21,176,194,173,246,179,65,137,94,20,164],[130,75,235,50,218,226,220,229,167,18,88,225,1,18,83,55,55,54,142,128,104,211,245,138,238,210,36,14,57,45,69,58],[168,207,75,53,65,23,53,210,9,183,48,118,80,141,190,139,40,82,205,136,234,145,235,128,203,195,213,145,187,91,27,35],[153,197,154,129,214,233,136,125,142,79,140,17,14,243,10,123,36,76,39,81,131,200,125,184,95,252,197,21,232,19,6,175],[106,227,42,78,2,97,107,161,191,199,85,26,244,27,150,54,126,163,51,136,249,144,160,7,4,230,105,232,21,46,28,98],[56,217,9,185,182,183,241,157,229,21,62,87,116,239,121,48,172,36,115,165,30,165,121,61,77,116,168,253,201,152,249,104],[94,94,48,237,161,80,199,82,228,226,49,176,234,189,232,30,122,158,161,241,51,136,114,92,232,255,30,230,203,186,133,164],[26,245,41,14,108,170,10,91,120,161,223,90,241,79,161,227,134,90,70,53,103,223,244,60,247,137,235,68,146,64,14,212],[190,88,123,101,246,66,188,249,140,17,197,210,73,215,85,243,186,120,39,206,90,164,189,204,111,236,94,48,210,56,226,168],[90,236,126,113,24,199,148,66,136,217,13,126,108,83,45,231,125,156,6,96,5,112,62,43,0,155,46,70,254,201,43,56],[139,213,217,110,229,140,119,90,111,214,239,38,181,57,116,41,49,97,164,96,93,118,63,137,93,29,3,151,211,63,13,230],[15,37,182,228,180,173,215,194,133,58,66,179,145,195,201,41,138,8,216,155,73,30,10,81,184,173,2,202,95,10,47,182],[251,67,236,106,24,89,216,28,108,116,180,167,193,46,8,130,107,161,24,104,89,50,79,152,87,130,190,31,106,107,221,110],[112,112,150,207,70,72,110,29,55,223,94,31,249,91,36,30,199,7,1,67,174,75,217,10,113,139,78,149,93,81,131,160],[193,147,61,108,48,245,87,193,40,13,35,237,145,205,0,80,230,221,19,53,208,193,10,204,32,171,135,134,91,231,77,156],[62,93,126,181,207,248,208,137,134,174,111,171,92,128,160,43,66,23,1,79,36,243,102,254,141,14,4,186,213,203,141,248],[39,115,14,236,252,204,19,206,241,48,146,42,107,206,230,58,189,10,3,246,96,18,17,46,244,230,231,159,182,34,239,156],[225,13,173,176,176,245,55,198,180,250,125,109,184,149,193,101,180,72,7,41,151,244,67,1,107,144,207,108,38,36,210,192],[38,120,240,226,98,203,26,164,105,189,97,137,25,188,155,180,79,204,136,200,181,67,14,119,213,70,69,178,37,226,247,169],[178,174,19,79,2,176,34,189,72,84,220,82,4,68,247,3,100,247,194,83,168,251,191,61,153,219,132,191,114,223,207,14],[219,159,237,58,252,85,105,241,208,209,141,105,237,29,149,70,14,72,166,219,200,154,43,106,220,71,223,111,145,229,72,212],[237,11,75,101,98,184,33,250,234,244,74,76,178,144,152,25,139,135,210,106,105,248,131,98,123,78,129,85,153,30,48,160],[178,60,59,211,10,102,90,168,10,235,234,86,153,70,36,76,90,48,60,107,95,103,72,219,18,90,17,227,152,159,142,89],[59,118,162,148,91,52,107,101,96,27,127,23,183,143,184,188,137,85,222,32,22,163,37,89,123,247,116,150,61,83,28,182],[129,202,134,228,246,23,3,245,204,195,30,31,61,86,31,181,163,159,4,215,113,91,106,76,78,117,255,146,214,54,248,158],[226,91,255,89,81,153,160,43,35,252,26,165,106,134,250,210,191,167,103,203,152,81,85,53,176,7,250,173,131,91,197,10],[5,81,29,218,9,116,102,23,240,183,236,190,210,81,171,202,107,86,29,63,197,241,172,134,155,123,37,142,61,227,20,16],[116,120,89,166,161,168,89,180,137,86,140,43,188,237,35,45,146,220,91,82,125,22,112,160,162,143,35,70,99,196,115,40],[29,224,202,125,134,79,236,197,251,133,121,184,121,81,70,33,194,150,7,40,178,114,136,188,102,49,225,22,74,121,184,12],[22,168,201,153,140,69,113,75,151,159,79,199,88,204,67,104,116,241,124,54,85,145,86,179,238,58,142,163,52,243,211,56],[44,98,95,128,25,118,123,130,254,191,131,153,24,138,91,189,29,245,53,175,175,199,128,148,132,62,179,186,239,110,147,199],[176,59,75,208,173,13,208,93,54,195,154,224,130,0,4,118,243,183,215,71,189,116,62,158,97,40,217,63,183,21,229,197],[56,243,166,64,250,195,170,147,196,218,142,110,181,187,114,86,5,139,249,71,134,71,15,71,241,150,109,223,88,57,160,238],[213,46,11,195,54,151,49,60,208,129,204,251,97,243,237,109,246,159,117,152,147,182,45,202,190,65,176,173,39,10,148,22],[10,197,135,218,83,204,179,170,147,6,158,70,19,247,154,126,199,4,205,30,243,240,246,11,100,144,4,219,183,137,83,204],[137,65,242,221,36,230,133,135,78,117,222,40,140,162,193,148,196,16,149,31,135,173,96,88,242,217,230,208,53,141,105,10],[130,60,90,147,187,152,135,247,27,84,227,114,200,170,29,180,233,68,3,73,212,253,17,24,52,159,134,118,126,148,100,155],[1,242,179,151,88,203,215,49,219,86,43,251,19,112,146,41,91,23,98,235,78,22,120,143,194,187,128,14,40,130,83,55],[85,217,160,20,120,7,51,255,130,107,248,255,102,136,183,198,129,223,177,134,68,150,87,127,60,161,120,211,224,238,29,136],[181,212,39,91,41,251,233,253,93,248,117,180,164,86,3,115,247,167,240,232,71,231,179,143,47,165,18,88,159,230,50,122],[76,47,241,115,145,79,117,238,143,126,66,211,166,238,120,7,6,47,88,92,251,138,160,16,25,64,59,102,69,22,161,32],[57,13,22,241,201,108,41,254,37,167,232,217,198,233,213,32,50,8,94,156,198,109,225,226,98,225,65,89,234,73,69,25],[188,160,11,222,175,175,48,57,120,173,121,39,236,141,120,97,4,17,166,186,177,173,27,107,120,2,184,82,64,162,210,109],[104,232,14,165,9,32,18,112,6,145,20,193,128,176,147,75,18,201,128,154,8,26,106,48,107,183,153,209,93,185,33,73],[156,95,235,166,141,20,96,77,235,162,208,48,120,185,58,60,244,244,35,49,19,72,172,102,104,55,252,243,249,43,254,225],[43,249,225,109,151,100,21,65,244,117,83,114,37,231,14,23,254,9,206,93,157,144,144,227,117,183,246,187,31,83,109,246],[108,45,102,17,238,25,237,168,230,222,31,99,37,198,109,109,237,29,216,95,231,125,28,113,56,249,5,50,8,66,129,29],[23,181,171,123,209,41,90,144,111,129,102,245,124,93,207,144,175,72,175,227,87,78,51,135,31,109,74,121,166,175,102,61],[249,105,129,246,64,142,60,61,139,78,65,49,136,248,20,55,11,38,48,191,228,122,108,254,165,167,190,187,57,48,207,145],[236,243,47,4,60,76,179,3,246,237,255,41,97,91,155,233,166,40,200,207,95,53,194,32,102,152,92,111,142,215,238,5],[78,237,53,137,235,20,43,24,193,129,8,164,33,11,22,227,107,118,43,63,93,135,233,180,35,241,62,150,45,239,52,254],[188,51,175,217,3,183,11,39,255,122,172,127,123,20,136,36,164,14,132,163,133,190,233,110,228,170,18,114,107,166,9,195],[222,28,106,203,232,2,185,228,251,1,158,27,107,117,43,108,167,173,234,195,187,121,54,64,12,117,13,237,213,205,189,227],[113,149,12,247,149,112,120,249,166,216,248,30,74,248,154,157,38,160,49,9,180,209,186,62,175,23,14,54,40,88,82,227],[18,45,161,51,151,161,190,243,104,206,97,200,117,1,92,168,92,66,113,174,11,221,57,65,143,143,69,104,198,60,90,165],[69,185,227,145,1,178,134,234,64,90,103,226,173,238,146,18,163,208,103,65,24,26,233,38,28,112,30,5,59,92,91,69],[78,87,122,50,236,245,42,238,157,2,172,102,17,136,238,229,238,108,160,212,17,203,212,195,11,124,62,133,47,159,228,152],[211,235,61,244,251,47,188,95,156,5,11,201,233,206,180,116,127,249,245,246,43,186,48,35,24,144,178,250,169,91,77,190],[45,148,46,130,115,229,222,132,11,59,232,102,233,156,140,120,89,159,29,64,141,79,92,181,170,47,111,65,217,103,238,69],[238,245,113,89,2,242,19,73,80,68,61,119,148,185,215,48,183,163,190,147,181,208,54,20,30,201,158,189,76,198,233,123],[65,150,206,8,241,35,129,13,99,35,0,149,224,230,159,143,184,88,158,243,94,176,76,165,45,191,17,184,23,238,18,123],[245,103,179,182,172,167,72,237,232,44,100,154,231,139,141,216,193,163,30,73,137,74,237,251,151,231,56,248,21,102,166,190],[84,200,115,135,214,15,145,141,211,16,163,36,131,234,176,82,41,218,168,23,194,204,44,41,84,237,176,160,58,112,108,21],[223,5,67,23,205,132,59,221,182,24,124,161,252,100,42,150,215,6,91,232,14,126,25,246,121,35,111,141,106,87,62,49],[3,52,100,208,12,120,211,204,191,208,180,3,145,108,208,103,68,170,196,197,143,95,243,190,230,197,219,44,185,221,186,250],[237,182,99,172,106,195,129,197,30,241,133,21,84,14,145,189,65,231,104,152,177,116,117,135,34,227,72,103,142,180,108,5],[4,88,236,105,125,148,132,84,208,225,192,168,100,75,184,83,124,69,242,102,239,100,82,26,73,89,170,76,177,61,235,113],[105,155,105,9,28,158,4,119,231,73,91,85,196,5,168,1,48,94,68,103,137,194,92,152,186,239,241,29,136,78,5,15],[179,195,121,147,181,196,14,97,91,155,167,213,205,140,95,94,223,172,187,79,11,229,177,240,134,201,51,193,171,120,155,99],[29,12,131,43,180,225,249,173,106,50,200,189,187,89,13,239,219,213,187,150,56,59,175,79,6,109,77,102,18,81,190,220],[52,16,84,138,234,149,69,81,228,204,177,120,47,169,56,178,194,117,234,124,223,197,63,107,226,56,126,110,106,154,49,172],[112,242,78,126,174,113,110,120,141,28,136,42,191,23,120,119,30,60,90,184,46,215,8,161,88,106,15,34,187,220,45,185],[210,229,250,5,74,169,228,112,240,236,156,156,102,240,160,115,31,233,46,140,156,26,184,215,89,34,37,202,124,4,177,192],[232,189,166,236,11,211,250,183,209,210,87,46,187,115,102,244,44,47,116,197,12,138,3,52,243,128,149,232,100,107,242,124],[80,69,78,142,59,135,176,137,201,98,115,219,144,31,194,166,148,95,215,229,37,37,134,171,72,90,219,41,110,169,47,110],[105,10,232,206,153,110,211,134,235,160,129,147,72,254,101,74,121,154,137,144,208,136,61,82,24,64,208,246,190,255,125,129],[164,53,135,67,0,103,221,95,187,202,77,191,254,29,167,230,120,24,64,209,16,72,241,251,242,148,33,59,184,178,0,122],[169,49,78,84,143,75,105,207,205,50,69,203,203,176,247,13,119,108,119,141,100,111,232,173,103,88,5,33,172,169,115,243]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[217,224,103,90,44,82,180,44,58,190,52,229,161,133,131,182,112,157,69,45,66,150,186,14,234,255,68,16,255,169,18,208],[7,69,0,211,189,94,146,121,178,201,220,35,20,198,24,109,138,41,15,11,236,83,68,111,233,210,92,93,225,164,118,78]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[251,142,158,1,106,112,142,224,1,201,128,83,39,28,238,50,73,101,43,146,125,209,219,194,151,148,59,154,242,241,52,127],[53,78,171,54,25,112,189,219,170,218,18,116,57,226,9,11,81,62,82,78,104,228,1,9,157,116,201,58,130,155,229,108],[65,197,44,41,154,29,170,81,83,205,125,117,222,22,221,133,149,115,159,151,37,3,5,105,101,150,160,37,74,99,67,8],[98,60,61,18,115,164,201,253,10,43,30,175,24,17,228,231,160,12,81,233,6,101,147,231,51,97,63,24,26,30,11,101]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[149,56,39,216,66,167,30,62,170,255,90,122,199,216,148,32,254,7,155,65,48,84,114,181,169,115,159,155,115,62,173,222],[176,4,50,38,226,167,172,35,207,124,149,163,53,222,207,47,40,181,15,185,253,158,126,89,176,195,136,93,18,147,243,202],[47,183,201,94,131,102,207,97,32,59,16,233,117,132,76,15,202,68,143,233,65,116,199,237,183,161,191,196,82,91,180,227],[81,92,231,201,34,68,249,140,136,169,136,198,39,254,128,79,221,249,69,223,241,245,62,225,113,183,77,6,127,120,253,155],[15,77,238,12,111,155,193,156,113,60,168,182,222,76,133,220,94,146,69,213,238,93,152,192,12,54,200,25,118,108,134,174],[8,50,20,63,91,83,179,178,36,247,198,157,70,204,86,138,225,153,132,242,207,105,133,8,148,44,81,1,177,239,123,232]], [252,47,178,21,6,78,187,137,123,79,44,52,222,175,87,77,129,237,203,173,86,19,213,101,74,32,252,66,232,79,249,78], "game resolved in an emergency",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(100, 8,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(100, 9,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("g32jsn", 40,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("vcvyzx",{from: accounts[0]});
  });
});
