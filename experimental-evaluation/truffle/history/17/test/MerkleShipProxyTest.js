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
    let result = await contractProxyMerkleShip.test_reveal(48, [[189,222,147,125,188,180,92,190,105,149,109,56,55,222,171,59,54,242,237,135,98,168,91,90,223,140,81,72,73,249,43,140],[45,253,37,173,179,250,199,219,201,250,242,115,110,73,100,164,204,24,138,85,156,190,193,75,64,20,231,111,3,175,139,129],[39,91,138,223,85,113,63,237,197,211,104,154,216,208,93,244,214,0,34,145,31,176,91,89,6,59,150,83,171,153,204,176],[229,243,78,240,221,237,236,29,246,5,117,149,44,55,187,105,149,9,235,98,234,60,235,194,161,161,40,149,94,193,12,169],[231,15,104,216,84,173,122,68,138,181,17,186,20,151,84,247,239,184,7,8,13,0,229,136,231,216,92,137,111,234,205,78],[143,26,37,173,59,208,78,11,178,246,173,30,105,92,194,170,127,51,189,145,167,200,166,150,208,222,170,228,92,125,164,88]], "7enj66",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(13,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(8,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["verified victory by hit count","7f378g","igfsmj","game resolved in an emergency","cmr3k5","v4rutr","jfpjun","igfsmj","bwsew","igfsmj","victory by unchallenged hit count","7enj66","f89nqk","verified victory by hit count","victory by abandonment","victory by unchallenged hit count","1c01l7","1c01l7","igfsmj","game resolved in an emergency","victory by abandonment","igfsmj","victory by unanswered challenge","game resolved in an emergency","dg4ehk","2err9d","7enj66","victory by unchallenged hit count","f89nqk","2err9d","cwtpvn","dg4ehk","v4rutr","dg4ehk","f89nqk","victory by unchallenged hit count","cmr3k5","cwtpvn","jfpjun","jfpjun","sk6lar","7f378g","dg4ehk","1c01l7","game resolved in an emergency","victory by unanswered challenge","victory by abandonment","7f378g","victory by abandonment","victory by concession","sk6lar","verified victory by hit count","2err9d","victory by unchallenged hit count","victory by abandonment","game resolved in an emergency","jfpjun","sk6lar","game resolved in an emergency","victory by unanswered challenge","igfsmj","bwsew","verified victory by hit count","igfsmj"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["7enj66","victory by abandonment","game resolved in an emergency","sk6lar","verified victory by hit count","f89nqk","bwsew","igfsmj","igfsmj","igfsmj","7f378g","7f378g","zohm0d","sk6lar","verified victory by hit count","victory by unanswered challenge","1c01l7","jfpjun","dg4ehk","sk6lar","f89nqk","jfpjun","7enj66","bwsew","victory by concession","bwsew","cmr3k5","v4rutr","1c01l7","game resolved in an emergency","jfpjun","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","victory by concession","sicis9","7enj66","f89nqk","7enj66","v4rutr","bwsew","victory by unchallenged hit count","cmr3k5","victory by concession","victory by unanswered challenge","sicis9","7f378g","v4rutr","victory by abandonment","f89nqk","v4rutr","zohm0d","dg4ehk","jfpjun","cwtpvn","victory by abandonment","bwsew","cmr3k5","2err9d","victory by unchallenged hit count","dg4ehk","game resolved in an emergency","gun3wf","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["victory by concession","1c01l7","bwsew","gun3wf","victory by abandonment","game resolved in an emergency","sk6lar","victory by unchallenged hit count","gun3wf","jfpjun","sicis9","bwsew","jfpjun","jfpjun","zohm0d","victory by concession","zohm0d","sicis9","jfpjun","1c01l7","cwtpvn","jfpjun","victory by abandonment","sk6lar","victory by unchallenged hit count","7enj66","victory by abandonment","game resolved in an emergency","1c01l7","cwtpvn","zohm0d","victory by abandonment","verified victory by hit count","victory by unchallenged hit count","7enj66","victory by abandonment","v4rutr","7enj66","igfsmj","1c01l7","cwtpvn","2err9d","victory by concession","sicis9","v4rutr","victory by concession","fpsfur","sk6lar","igfsmj","7enj66","gun3wf","gun3wf","verified victory by hit count","victory by unchallenged hit count","2err9d","2err9d","victory by concession","2err9d","dg4ehk","jfpjun","1c01l7","victory by abandonment","v4rutr","2err9d"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[115,242,177,247,88,248,142,24,190,199,53,27,74,250,100,102,34,198,203,17,12,172,117,170,168,255,205,34,88,1,19,42],[160,37,228,186,55,146,133,121,46,0,197,141,246,34,33,176,34,146,222,224,227,61,254,126,17,63,118,6,240,19,68,250],[50,37,254,143,92,181,179,138,76,107,88,184,98,159,243,185,117,48,129,153,231,143,153,113,206,255,21,120,4,37,70,156],[103,64,111,121,159,101,10,52,116,141,250,59,254,38,76,9,55,31,137,250,255,84,109,2,154,183,205,99,99,55,121,3],[219,177,175,247,100,124,61,76,60,120,67,248,40,6,85,243,207,62,102,229,166,30,173,29,195,247,31,27,58,95,136,162],[126,97,73,88,106,249,17,92,11,252,5,39,156,97,141,8,230,144,238,248,125,159,32,101,233,135,10,162,53,209,206,209],[99,171,154,144,168,175,156,177,110,180,242,8,103,225,214,58,142,220,154,98,183,235,235,170,20,170,38,239,60,249,185,218]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[233,247,100,199,228,163,212,194,80,135,12,138,138,38,44,199,89,173,57,76,164,135,28,215,16,82,80,197,95,138,117,86],[34,149,9,137,21,30,234,232,217,122,230,13,190,119,166,29,91,28,168,13,121,8,207,236,249,53,154,238,44,10,194,172],[161,115,203,140,110,72,117,171,243,169,234,198,99,44,13,51,48,90,4,225,150,104,204,11,149,50,209,223,15,118,207,240]], 47, 100,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[33,66,142,50,199,220,78,190,246,58,81,176,60,71,200,7,83,119,72,63,62,11,241,40,131,182,194,254,173,77,225,42],[65,202,211,104,153,125,249,201,110,67,206,158,68,244,203,1,35,1,40,39,51,246,215,204,255,225,124,190,61,5,216,91],[0,99,158,86,108,33,221,235,206,49,9,0,7,34,26,26,200,173,206,83,191,118,216,80,107,161,79,33,34,192,73,192],[119,19,182,104,35,84,84,28,60,8,61,111,190,85,179,128,78,1,141,61,66,141,104,93,112,78,46,134,248,237,122,45],[65,94,201,24,55,83,9,125,222,107,40,140,189,57,241,17,5,160,181,223,202,178,0,139,246,171,144,16,123,49,83,149],[238,72,92,175,140,28,180,109,150,213,122,218,62,250,0,195,73,224,254,94,248,126,236,227,236,170,203,50,163,95,62,84],[93,210,143,154,142,218,222,145,222,159,168,61,182,110,197,40,154,76,28,55,171,142,201,197,254,241,13,76,188,53,221,123],[54,13,130,81,233,152,221,171,229,93,184,75,131,18,74,74,117,213,25,61,189,190,54,63,68,52,213,243,78,252,143,116],[29,204,67,175,51,23,253,120,217,196,92,183,96,37,251,147,218,133,251,59,228,81,29,113,200,156,143,108,160,163,138,105]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[140,229,2,232,40,120,106,251,216,40,236,239,48,216,195,203,191,231,71,180,60,100,255,36,103,71,187,217,54,100,123,221],[112,76,242,237,78,130,221,228,95,132,90,57,40,219,117,100,11,34,19,62,191,250,214,210,250,166,210,23,6,122,205,248]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[134,18,99,174,35,85,239,214,189,3,197,120,10,246,248,98,224,0,99,193,207,228,235,129,82,73,194,209,50,94,142,232]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[132,70,154,139,180,80,149,35,38,234,62,22,237,14,12,64,127,210,191,203,5,6,185,208,46,215,38,191,227,88,222,110],[100,22,199,217,183,84,72,199,23,220,111,245,195,191,163,150,64,164,238,149,121,100,232,46,245,217,244,123,119,9,83,18],[161,97,171,195,173,3,122,198,41,200,105,199,130,18,42,14,172,48,255,121,128,177,177,77,242,4,88,230,149,236,78,71],[24,73,228,56,44,220,173,252,59,227,60,217,231,30,199,198,0,125,65,235,211,246,239,238,233,131,124,218,115,224,79,104],[134,158,34,153,151,33,49,106,186,126,32,183,251,147,248,149,126,45,68,49,46,86,149,108,74,10,72,138,100,150,57,198],[103,197,142,45,59,211,130,13,228,171,216,232,93,103,231,133,13,48,183,105,243,165,92,118,210,227,4,93,148,67,244,63]], [235,119,169,8,101,154,36,147,77,108,165,18,8,65,150,236,105,19,148,207,144,134,10,11,117,89,149,219,238,152,43,254], "cmr3k5",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(100, 101,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(99, 64,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("7enj66", 40,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("sicis9",{from: accounts[0]});
  });
});
