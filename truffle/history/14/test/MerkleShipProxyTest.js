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
    let result = await contractProxyMerkleShip.test_reveal(179, [[85,119,71,78,130,129,166,27,179,107,42,189,193,6,61,114,169,106,198,71,71,152,115,235,64,188,175,140,155,61,189,38],[177,214,170,163,101,65,150,252,38,30,145,193,163,226,171,89,33,140,57,25,81,182,254,11,29,245,157,53,199,199,120,81],[44,105,5,123,95,122,125,80,76,50,120,72,66,151,98,150,168,46,209,120,57,111,37,13,180,172,131,231,123,80,69,216],[111,30,211,91,199,161,29,39,245,165,150,235,205,14,222,131,107,228,28,31,34,50,206,244,3,135,180,111,227,140,99,157],[127,35,114,168,76,72,214,30,170,51,127,39,212,22,104,232,32,240,139,14,255,25,158,88,39,45,206,57,1,118,97,162],[255,124,2,44,11,40,241,207,24,226,46,20,105,187,51,200,66,40,216,176,233,42,235,202,120,162,5,6,11,103,181,125]], "verified victory by hit count",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(3,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(49,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["0x17tq","victory by unchallenged hit count","victory by concession","victory by concession","7rrbge","game resolved in an emergency","q2g3st","0jkujx8","yvwkgy","0jkujx8","verified victory by hit count","qxauir","0jkujx8","09qnwe","0x17tq","qxauir","qxauir","verified victory by hit count","0x17tq","game resolved in an emergency","09qnwe","game resolved in an emergency","4tlyvo","4tlyvo","qxauir","victory by abandonment","7rrbge","4tlyvo","7rrbge","0x17tq","q2g3st","verified victory by hit count","victory by concession","0x17tq","0jkujx8","yvwkgy","4tlyvo","victory by concession","victory by abandonment","0x17tq","0jkujx8","zi6fr","7rrbge","victory by abandonment","victory by unchallenged hit count","victory by unanswered challenge","victory by unchallenged hit count","7rrbge","verified victory by hit count","q2g3st","4tlyvo","0jkujx8","verified victory by hit count","0x17tq","q2g3st","yvwkgy","verified victory by hit count","victory by unchallenged hit count","7rrbge","verified victory by hit count","4tlyvo","yvwkgy","0jkujx8","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["victory by unchallenged hit count","yvwkgy","q2g3st","victory by abandonment","qxbrm","victory by unchallenged hit count","q2g3st","verified victory by hit count","game resolved in an emergency","jt4p9q","game resolved in an emergency","0jkujx8","qxauir","0jkujx8","verified victory by hit count","7rrbge","7rrbge","qxbrm","victory by unchallenged hit count","victory by unchallenged hit count","09qnwe","victory by concession","yvwkgy","verified victory by hit count","victory by abandonment","q2g3st","09qnwe","victory by unanswered challenge","victory by concession","zi6fr","victory by unanswered challenge","victory by unchallenged hit count","0x17tq","4tlyvo","4tlyvo","game resolved in an emergency","victory by unchallenged hit count","0jkujx8","zi6fr","q2g3st","09qnwe","jt4p9q","dlchcs","qxauir","09qnwe","game resolved in an emergency","0jkujx8","zi6fr","zi6fr","dlchcs","0x17tq","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","tugl8p","09qnwe","victory by concession","qaexkh","jt4p9q","qxbrm","4tlyvo","game resolved in an emergency","victory by unchallenged hit count","zi6fr"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["qaexkh","fmzw6y","hru97c","dlchcs","u1j1h","yvwkgy","victory by unanswered challenge","victory by unanswered challenge","jt4p9q","jt4p9q","victory by unanswered challenge","qxauir","qaexkh","zi6fr","u1j1h","u1j1h","0jkujx8","hru97c","victory by unchallenged hit count","tyub2","jt4p9q","qxbrm","game resolved in an emergency","victory by concession","yvwkgy","victory by concession","fmzw6y","hru97c","7rrbge","hru97c","dlchcs","q2g3st","r5nd8n","tyub2","09qnwe","4tlyvo","4tlyvo","tyub2","tugl8p","victory by abandonment","qaexkh","hru97c","game resolved in an emergency","q2g3st","victory by unanswered challenge","d3zuud","09qnwe","d3zuud","yvwkgy","0jkujx8","fmzw6y","game resolved in an emergency","7rrbge","game resolved in an emergency","verified victory by hit count","victory by concession","jt4p9q","victory by concession","4tlyvo","zi6fr","verified victory by hit count","tyub2","4tlyvo","zi6fr"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[163,129,166,179,9,15,48,237,196,55,191,65,57,186,52,54,88,55,151,187,55,203,217,20,152,147,131,175,149,83,61,4],[90,181,92,121,41,216,4,30,242,197,224,128,68,16,239,8,217,194,79,98,181,154,15,7,197,13,13,40,152,183,95,109],[195,124,252,90,79,71,198,106,63,195,38,165,106,13,7,226,27,118,170,242,9,216,191,63,240,178,159,10,124,234,245,11],[109,39,117,124,107,107,23,85,18,131,70,70,101,241,178,248,159,193,232,251,190,12,79,55,236,174,232,82,131,219,63,49],[104,154,144,4,155,229,142,65,71,99,121,227,158,25,5,169,12,22,49,57,88,37,214,25,24,10,202,243,15,203,11,114],[236,44,21,146,75,89,92,99,106,101,223,154,160,157,81,141,99,100,178,61,60,88,131,40,177,167,53,46,43,174,123,243],[16,32,170,29,181,115,71,107,150,173,149,169,168,66,193,18,165,197,12,235,73,121,209,127,123,164,101,5,141,227,198,205],[47,143,149,97,115,48,4,111,53,174,188,217,194,94,141,99,111,14,231,156,212,88,6,188,9,150,241,74,107,227,237,158],[28,70,34,254,250,219,56,139,98,58,28,214,145,204,118,151,57,138,197,224,59,32,164,51,140,199,55,163,235,213,4,42],[154,61,185,231,60,243,146,34,111,93,186,233,240,106,127,64,149,130,17,54,158,30,68,144,192,227,102,91,167,180,168,197]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[68,29,165,126,28,49,115,250,70,66,162,201,111,235,222,185,127,149,112,105,25,141,36,231,198,1,50,136,166,70,121,102],[31,7,249,217,212,255,120,143,194,213,201,167,98,51,82,26,42,121,244,15,3,36,150,161,125,150,186,190,72,237,146,135],[202,59,47,157,216,252,222,245,17,200,57,170,116,49,26,144,121,33,34,210,156,77,144,175,163,23,208,138,199,129,92,168],[180,86,45,187,143,1,181,86,185,78,89,110,82,168,43,253,71,199,158,92,161,65,76,22,226,43,17,107,20,70,128,4]], 11, 180,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[151,11,68,79,143,115,118,118,173,225,171,7,202,39,234,235,50,3,247,163,123,65,96,110,141,151,196,87,140,15,201,211],[131,141,243,57,184,216,90,152,18,140,100,177,216,248,169,74,154,156,124,22,72,96,165,45,85,63,136,209,16,197,153,229],[104,200,55,144,87,193,199,166,126,178,37,169,127,84,37,105,57,187,95,161,228,131,6,73,120,36,20,206,35,204,239,35],[249,33,89,44,144,58,212,248,195,96,214,153,22,8,122,65,217,131,47,153,208,71,181,240,118,175,52,228,114,220,203,80],[136,240,58,247,154,108,86,128,161,146,158,27,221,157,252,202,24,96,161,124,218,126,24,237,230,79,170,206,85,99,52,34],[207,22,117,124,162,210,245,62,10,154,234,182,164,58,93,33,104,56,7,248,196,125,252,200,157,243,3,124,13,159,254,67],[162,201,33,88,194,21,4,192,3,86,138,86,186,6,93,16,166,205,155,114,59,176,33,236,161,107,72,128,34,164,145,147],[72,173,214,9,85,225,44,187,12,28,38,157,243,183,120,10,164,102,3,180,197,122,241,200,208,5,72,247,132,16,214,57],[95,249,236,76,71,232,84,85,219,106,141,173,248,231,192,248,98,244,103,128,69,127,77,218,138,73,112,38,87,105,94,191],[207,37,53,94,38,111,94,69,136,143,114,86,93,133,191,114,208,188,176,4,49,94,26,95,40,158,234,106,205,198,7,205],[149,185,100,44,142,176,174,239,69,174,254,20,232,91,209,137,104,98,247,99,49,154,180,35,31,87,188,250,87,242,120,242],[252,36,82,212,209,176,189,50,125,174,166,120,199,130,208,162,241,184,105,186,183,200,182,174,68,165,99,58,91,10,34,201],[65,31,41,37,80,226,175,226,102,97,60,148,78,40,57,91,92,173,136,135,50,248,26,29,114,42,201,30,77,113,75,198],[228,237,156,110,163,33,239,144,213,124,103,167,196,197,1,165,45,92,21,52,83,216,51,44,131,83,243,140,155,76,138,18],[98,74,104,73,158,185,195,3,227,247,114,165,155,138,213,173,233,33,151,76,0,121,78,199,245,131,166,140,93,118,209,228],[129,227,45,119,192,60,209,86,76,181,209,237,198,204,68,3,4,47,116,153,189,250,53,192,128,171,6,95,34,50,131,168],[246,64,235,218,68,13,203,194,142,188,182,249,73,84,227,39,137,77,22,45,134,53,84,2,142,98,55,92,66,11,109,237],[113,54,6,72,151,10,211,36,239,230,83,21,53,173,226,158,3,29,128,72,229,35,91,249,109,102,23,126,64,142,245,244],[227,211,35,33,209,43,210,138,16,198,186,188,175,152,189,112,121,80,103,5,223,255,169,2,220,136,176,202,13,4,114,177],[11,249,59,80,164,58,179,197,67,197,123,193,246,94,127,30,128,12,203,240,160,241,249,60,21,200,204,136,55,227,228,229],[113,170,37,194,46,97,50,201,27,40,165,204,225,201,30,100,232,195,49,76,215,191,115,224,145,159,72,73,72,239,6,137],[74,144,23,29,240,58,127,2,97,207,65,235,217,22,143,150,104,109,17,73,209,182,218,20,167,179,253,156,188,187,74,116],[66,245,93,91,151,103,24,132,3,84,94,254,242,239,115,165,165,23,25,92,112,80,115,26,31,31,51,151,44,158,16,70],[239,14,12,195,47,102,237,5,103,122,161,178,92,171,32,249,198,64,11,83,85,206,73,94,188,220,174,212,54,207,190,66],[133,77,26,2,197,5,14,56,53,179,144,104,145,225,115,23,12,184,157,21,220,243,142,147,143,18,168,5,48,152,15,204],[75,192,81,173,125,74,43,30,98,128,116,46,177,234,37,49,97,142,176,134,189,184,161,179,167,192,158,109,246,134,29,199],[21,184,31,8,2,149,167,137,81,3,176,224,6,63,135,176,177,168,182,4,252,245,82,69,92,112,36,99,72,53,14,211],[42,175,39,157,103,6,146,193,92,89,8,56,39,177,253,18,60,181,4,71,41,134,127,74,68,187,62,219,189,6,164,159],[127,246,2,226,42,195,41,7,125,113,191,12,161,40,175,76,178,76,230,20,30,254,80,166,51,206,179,154,254,245,73,29],[2,128,234,178,129,111,135,235,221,148,93,104,73,201,242,74,9,191,233,27,240,50,136,36,247,31,117,5,175,146,188,246],[220,234,33,146,195,238,137,5,169,239,130,211,242,178,71,129,16,18,64,0,157,190,210,247,66,19,51,183,165,195,187,137],[232,88,40,41,174,126,218,68,75,194,33,1,98,227,113,131,251,38,36,212,62,37,73,247,155,33,153,205,83,36,40,148],[193,25,231,157,9,46,72,55,43,1,93,164,207,206,238,183,71,251,168,131,149,144,136,101,156,181,217,219,157,15,78,26],[13,235,218,69,236,3,227,228,98,242,201,120,240,7,222,84,177,93,190,209,50,109,243,18,45,128,149,237,188,35,196,116],[86,186,101,227,157,219,115,25,238,8,119,181,202,2,29,110,36,5,60,190,165,23,21,230,221,96,107,239,117,3,34,205],[90,189,202,237,63,171,4,223,234,115,72,30,21,161,148,143,115,9,155,217,67,127,243,207,203,188,34,24,194,56,190,55],[102,43,43,247,240,229,178,123,170,114,185,51,106,75,199,161,2,211,167,254,52,22,6,87,176,140,132,97,105,183,85,220],[219,0,148,244,193,144,159,223,106,186,105,123,133,167,186,44,181,155,124,53,156,14,143,155,138,196,2,206,100,99,84,157],[175,1,47,34,145,212,33,95,154,208,24,250,107,98,150,66,55,206,153,124,229,14,237,217,224,173,253,29,135,160,42,3],[115,186,37,95,232,152,113,65,165,240,151,0,126,44,151,116,5,39,149,150,153,114,178,138,83,204,249,95,41,165,20,204],[143,207,214,3,102,137,197,242,197,185,169,178,19,23,85,79,151,96,75,103,28,115,137,186,59,92,104,32,28,188,42,135],[90,223,0,100,184,78,248,244,74,13,234,212,121,168,111,78,64,230,201,0,239,106,128,225,168,72,7,41,68,58,93,34],[241,188,57,101,206,5,109,49,252,242,56,159,253,148,206,170,11,13,130,60,244,85,245,180,10,156,31,79,242,193,200,249],[146,123,160,161,87,240,132,244,1,237,11,238,94,116,242,43,54,203,173,124,145,27,17,148,78,138,64,28,32,223,195,71],[153,134,11,112,100,183,50,244,126,114,128,31,162,109,151,87,154,184,162,194,16,125,87,14,88,124,118,119,30,234,45,78],[148,193,65,25,168,58,66,101,27,113,223,216,158,44,66,254,152,77,65,245,53,18,66,245,50,3,72,51,146,96,116,122],[199,163,40,46,0,4,128,117,149,138,165,0,19,188,109,174,21,115,39,11,65,88,15,96,114,181,102,107,118,221,161,128],[180,251,236,33,60,222,254,197,178,109,12,4,137,21,114,38,37,114,21,174,43,118,24,226,254,227,88,45,220,9,177,73],[237,134,48,163,32,93,213,188,135,204,30,239,0,36,198,42,243,253,156,75,12,205,252,26,97,33,36,253,115,156,137,17],[161,146,152,214,75,147,185,118,57,36,163,47,163,98,134,253,183,54,137,127,127,163,151,163,102,23,240,66,252,239,226,58],[217,140,68,19,212,108,36,240,97,38,194,153,0,24,102,63,146,215,0,223,254,230,60,205,92,246,68,252,90,91,119,91],[187,245,148,96,123,50,47,4,237,212,1,92,108,216,137,186,119,105,91,231,17,93,70,63,76,38,35,85,149,230,145,0],[13,249,55,86,155,160,103,135,208,235,171,7,207,174,188,86,7,20,213,3,105,214,76,36,0,39,198,92,106,127,3,197],[253,141,112,227,215,157,108,53,151,246,13,232,239,145,217,108,136,245,31,199,7,79,179,176,51,229,157,76,211,87,172,123],[225,116,137,248,159,236,189,173,72,149,218,235,135,103,35,21,15,248,71,221,247,62,18,229,175,31,207,107,58,4,179,199],[114,234,217,238,2,140,9,194,150,30,103,71,240,175,244,245,91,83,190,107,16,217,79,211,244,255,95,7,164,143,44,8],[92,184,37,223,212,174,42,57,154,6,49,152,173,105,98,5,188,121,44,217,117,134,181,32,216,5,105,231,63,177,240,147],[73,60,136,173,25,217,248,184,150,69,236,146,116,248,74,126,254,166,136,140,127,6,2,49,144,115,64,4,127,9,126,235],[10,116,116,194,109,202,215,44,244,72,94,223,227,68,180,29,238,248,128,7,125,180,11,190,187,168,3,177,112,38,243,194],[198,245,110,116,233,255,99,186,95,82,115,105,227,153,219,98,32,158,181,146,125,56,165,218,102,214,49,245,84,189,140,158],[255,160,155,31,144,37,125,238,51,149,21,51,133,105,15,212,197,140,78,15,71,237,21,165,233,156,249,10,231,4,181,122],[200,134,130,167,119,45,20,147,61,182,145,215,223,197,75,147,44,101,64,99,244,214,232,244,151,36,114,109,101,196,147,98],[194,133,44,246,9,19,220,209,247,191,125,135,207,143,95,143,190,148,186,42,100,127,82,72,215,115,234,36,171,146,79,96],[10,103,246,0,47,151,148,206,95,92,139,57,102,96,135,94,51,30,78,88,251,97,30,100,206,195,220,108,35,175,123,47],[70,216,139,88,254,92,100,29,148,0,193,115,97,162,108,211,213,205,24,205,7,250,197,11,93,231,233,127,177,62,169,198],[3,60,147,187,140,123,152,244,7,170,68,54,77,142,157,40,222,71,159,154,159,13,209,43,89,60,63,35,20,91,167,108],[108,204,20,53,245,208,37,51,218,130,24,228,162,88,209,72,162,11,176,115,123,219,250,231,158,173,130,98,227,119,236,161],[232,163,134,17,221,172,217,138,114,90,90,235,82,198,181,51,19,138,88,133,63,101,98,228,66,151,115,207,182,237,190,175],[101,106,203,124,77,155,119,21,119,35,183,102,18,230,213,117,81,241,53,156,233,180,79,80,23,155,85,92,72,216,144,90],[153,12,69,2,108,86,207,72,166,215,72,61,48,251,67,250,238,251,218,25,17,36,104,0,166,179,62,139,251,16,142,72],[125,84,172,103,187,68,24,49,14,249,167,69,92,245,129,25,43,112,227,139,224,119,107,137,66,226,204,92,91,203,81,64],[239,76,139,124,38,17,34,154,236,6,233,51,225,174,223,209,102,170,57,21,55,213,16,45,61,221,241,202,204,0,118,25],[45,184,44,98,40,90,34,149,111,80,217,119,90,230,72,127,178,90,243,54,250,147,212,99,195,36,218,114,238,98,228,87],[30,12,157,141,97,73,251,68,190,168,208,4,70,220,144,72,232,94,244,65,95,224,104,142,125,241,103,252,23,161,189,27],[101,193,70,70,85,154,192,121,56,145,254,45,220,45,202,224,203,124,189,231,228,143,175,147,67,81,79,37,30,138,183,18],[36,49,158,170,184,175,255,250,245,44,5,101,203,91,1,9,25,102,26,182,5,130,205,40,131,166,198,105,168,42,138,107],[20,160,219,43,172,243,154,151,122,73,171,91,103,153,42,184,206,12,106,16,181,131,128,179,92,115,203,128,210,14,180,55],[64,0,133,212,44,93,94,133,231,9,229,12,1,4,6,212,236,181,189,108,13,140,110,136,222,17,47,184,226,2,243,124],[130,167,175,194,164,89,96,20,116,70,102,67,87,79,240,231,44,112,224,249,31,24,97,46,148,229,236,181,190,206,248,37],[211,37,193,86,82,22,0,30,141,77,227,166,139,128,86,250,166,215,67,227,141,129,37,183,180,171,66,94,27,228,160,184],[35,155,200,93,39,41,46,29,32,35,207,32,141,185,212,133,51,229,128,29,96,230,44,70,109,75,40,229,67,1,104,248],[43,22,205,69,140,196,19,146,21,230,208,229,25,121,242,210,240,244,53,225,89,132,103,61,236,167,245,253,153,18,76,100],[1,195,212,200,202,210,115,197,245,89,210,52,101,150,82,165,10,57,162,97,51,206,153,234,69,217,241,124,172,190,249,254],[87,44,41,98,110,140,202,38,201,95,202,186,13,251,211,95,171,202,180,152,212,201,134,168,116,194,184,45,204,17,84,174],[85,69,53,246,117,157,36,227,33,168,137,167,163,238,4,17,124,140,239,97,40,9,92,222,47,112,192,129,211,198,61,117],[51,183,141,163,36,95,40,252,173,31,107,13,219,120,62,25,19,34,126,98,220,211,189,157,1,113,39,249,247,223,139,102],[224,253,202,215,35,23,72,78,34,131,249,190,133,150,8,210,214,154,37,159,75,30,227,155,67,213,241,37,87,188,91,100],[65,121,12,41,245,227,45,215,220,145,234,31,197,88,88,241,156,154,180,44,170,14,26,188,70,96,138,90,38,36,120,167],[172,52,71,109,77,12,224,153,52,253,66,208,48,74,190,184,189,150,201,136,43,80,109,7,207,25,22,20,170,47,114,59],[23,91,250,120,53,2,124,115,144,55,217,97,58,223,166,7,109,139,29,213,15,102,91,135,127,103,14,13,148,148,174,244],[145,196,135,10,175,198,121,38,136,233,223,186,252,82,36,255,109,78,182,86,201,67,50,200,107,157,68,200,196,151,78,155],[16,70,194,164,64,187,109,237,40,11,141,233,61,163,169,93,51,207,30,68,234,45,35,132,137,136,73,228,244,246,94,56],[187,4,38,106,219,148,159,44,36,15,77,84,0,45,147,38,39,191,164,8,99,233,2,90,129,65,144,43,179,188,177,90],[166,187,212,161,234,235,15,150,104,233,250,255,146,237,57,113,179,6,103,34,87,242,128,111,25,14,89,195,238,241,87,177],[38,148,10,179,215,19,31,231,19,151,33,136,58,64,18,236,150,97,75,65,83,213,152,120,6,74,96,139,66,222,95,127],[147,113,183,95,210,224,209,10,4,61,125,46,226,152,237,82,150,21,193,77,108,214,197,164,144,90,165,36,82,113,11,30],[165,52,53,19,50,208,189,8,246,52,163,82,77,92,33,107,86,10,94,253,103,167,206,158,200,56,148,105,252,226,133,158],[246,43,232,116,24,121,30,204,60,190,177,238,78,168,3,50,239,96,221,3,82,33,77,111,4,235,199,98,247,187,77,235],[85,246,11,160,233,165,219,196,58,248,75,112,54,177,74,82,236,80,112,152,103,34,178,170,62,240,136,174,98,29,48,103],[237,91,99,13,23,129,48,238,242,214,153,116,251,113,53,129,218,178,183,240,183,47,48,200,105,44,1,252,141,6,245,56]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[139,64,69,241,221,76,200,92,196,180,187,163,142,164,171,163,10,82,209,213,75,8,85,26,167,157,215,115,78,194,27,166],[48,32,235,234,253,199,15,146,33,139,117,200,110,230,181,156,70,178,135,228,121,206,243,73,73,228,252,54,205,177,252,217]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[220,188,86,82,108,245,99,160,222,30,113,90,243,216,65,189,26,194,9,203,43,222,161,155,126,59,144,29,226,180,38,30],[224,83,241,94,165,244,43,179,116,30,113,198,213,107,185,137,182,74,101,99,92,152,96,45,121,234,136,118,219,83,223,140],[137,194,252,19,237,195,114,192,175,8,244,32,144,202,33,58,158,158,189,18,64,112,14,118,16,98,84,34,249,191,44,212],[87,198,245,213,160,94,95,236,31,200,153,215,115,130,30,66,185,20,148,169,232,133,20,16,15,232,89,16,37,104,108,248],[201,239,51,66,118,180,46,9,77,46,40,254,187,66,218,1,99,140,69,169,221,6,215,100,253,48,58,28,35,223,42,169],[62,99,51,225,139,97,201,94,170,133,235,161,7,141,144,81,15,147,49,216,150,240,65,66,75,243,85,149,171,128,83,69],[47,144,11,5,128,88,42,102,61,117,45,4,217,114,169,202,227,18,201,23,5,112,72,177,20,66,64,126,228,237,221,185],[111,119,84,3,4,172,241,106,252,57,119,34,0,82,230,182,216,105,65,252,221,60,223,254,23,20,231,123,210,200,97,156],[221,131,198,1,64,235,79,215,202,68,243,229,99,135,114,40,120,225,50,62,0,135,250,97,150,0,101,62,224,212,150,29],[234,121,130,186,11,247,142,84,160,49,80,149,66,125,36,220,32,3,42,36,190,44,96,115,87,155,111,99,97,243,156,116],[167,198,245,129,4,57,25,99,158,160,155,117,217,147,49,112,141,85,146,62,97,80,38,87,255,12,220,115,152,190,132,130],[39,42,183,196,50,136,143,248,201,73,27,202,90,119,217,158,218,64,146,232,252,206,191,190,205,91,86,101,53,160,145,215],[4,20,115,91,80,62,22,202,126,11,193,96,232,28,219,187,152,53,242,57,91,44,238,48,250,207,140,121,221,54,0,33],[146,49,252,238,130,85,149,151,32,35,229,168,60,123,12,252,91,159,140,68,227,174,18,62,64,27,211,184,118,24,104,164],[98,190,85,159,95,23,76,219,33,42,20,157,31,184,138,83,109,31,55,121,249,228,56,241,32,20,254,38,152,191,191,254],[223,88,220,233,116,152,226,147,30,2,89,10,124,88,16,193,54,3,14,155,229,119,72,10,122,76,200,68,213,43,106,212],[33,165,107,170,208,164,4,157,2,140,139,101,56,42,18,219,45,240,22,136,140,213,179,61,171,10,162,120,252,59,13,7],[107,205,94,45,58,82,48,174,5,105,24,29,246,163,158,37,151,148,103,179,227,213,15,255,41,56,247,79,141,86,243,203],[114,23,179,107,106,184,61,236,94,252,193,206,39,58,241,137,142,176,253,159,174,88,166,114,16,4,221,1,156,151,92,163],[155,210,199,179,175,137,12,78,223,21,163,68,208,91,192,51,139,235,13,209,242,225,245,162,230,174,168,178,171,122,158,47],[168,254,38,195,20,193,5,193,243,252,18,17,155,67,224,154,150,17,238,11,216,151,105,233,186,136,100,147,85,51,184,199],[242,108,17,112,7,175,124,234,210,131,10,2,21,247,142,31,131,76,202,54,61,102,45,156,85,185,177,176,210,216,178,150],[49,230,23,29,4,29,39,74,69,221,8,82,203,130,53,164,216,206,54,83,150,87,27,22,144,30,161,141,215,50,208,191],[174,194,64,252,5,210,92,245,239,45,229,91,172,74,139,84,79,212,131,21,62,206,139,106,102,120,174,80,50,210,109,144],[106,178,213,79,61,161,9,137,173,122,117,163,75,30,168,102,127,40,164,47,40,169,73,114,147,192,178,249,41,121,218,148],[186,217,69,54,231,67,23,154,237,215,205,250,41,31,72,120,198,120,16,249,142,205,1,102,244,185,125,183,134,251,28,211],[17,4,184,64,58,20,98,92,220,200,29,164,147,244,78,147,22,26,206,229,24,122,139,175,16,228,7,234,126,37,162,80],[122,87,89,196,92,230,38,129,238,48,49,7,165,143,0,45,197,231,53,8,102,13,4,80,164,139,156,70,55,245,155,182],[154,62,236,107,204,219,45,142,1,250,211,104,161,75,61,168,161,83,17,179,26,203,81,75,157,95,32,0,73,186,32,81],[231,205,15,210,174,159,16,232,53,202,65,116,73,45,95,60,143,158,191,25,6,213,110,235,250,120,60,30,34,117,28,34],[169,164,19,74,180,84,213,30,44,206,131,193,250,3,12,169,51,231,42,231,60,183,210,131,29,44,45,1,154,112,117,23],[116,249,18,55,42,154,232,34,182,65,59,74,205,69,92,110,240,140,123,1,20,59,113,230,121,35,111,2,134,110,212,119],[139,27,80,216,137,117,250,51,115,194,120,218,219,2,165,9,137,156,132,94,75,127,255,88,39,1,135,135,248,130,211,186],[252,19,197,228,188,213,180,191,56,80,228,36,145,189,210,33,28,192,170,122,122,22,48,194,81,98,157,144,16,210,43,67],[132,130,33,56,35,178,102,190,125,44,104,153,204,4,96,82,227,247,151,112,78,37,214,203,78,115,78,99,219,122,62,79],[9,163,222,17,0,82,187,6,16,191,14,61,44,23,91,42,182,113,100,254,233,160,107,229,167,9,80,102,135,178,3,219],[234,106,213,233,41,246,91,106,54,104,229,143,151,177,132,209,146,165,26,15,87,168,243,22,54,226,83,11,221,75,78,7],[118,189,104,243,222,175,63,24,76,122,88,231,179,133,13,25,191,71,31,133,213,36,17,54,196,45,241,221,149,145,77,169],[148,29,73,62,187,193,93,73,137,75,225,36,53,146,203,123,5,97,21,92,246,34,38,88,172,134,145,228,83,228,112,247],[55,196,230,156,78,233,121,229,58,48,74,96,176,104,142,80,214,107,23,94,43,187,243,143,80,246,38,14,91,129,197,154],[239,152,24,35,92,139,181,177,52,229,100,81,244,73,81,212,141,175,91,187,252,165,131,250,168,108,187,98,172,117,72,228],[177,41,71,88,59,58,209,26,99,207,166,199,252,228,172,248,149,116,167,103,174,57,213,212,244,196,9,136,17,74,63,152],[27,213,27,167,63,28,34,152,102,78,221,197,214,139,109,102,186,237,59,153,224,225,210,91,147,185,143,174,120,238,182,52],[1,54,125,224,152,194,69,5,186,14,82,166,224,155,253,144,223,110,19,91,230,192,69,33,246,250,254,217,231,100,162,6],[125,29,66,47,65,118,10,102,245,46,21,102,39,10,241,198,11,175,25,58,240,63,180,234,74,193,194,209,107,94,85,9],[200,195,43,61,196,183,182,196,191,68,42,170,20,85,77,9,185,186,53,74,133,254,164,26,87,174,140,254,101,209,45,158],[230,213,203,177,231,111,201,196,16,188,4,92,46,100,160,222,199,187,156,126,137,113,191,41,132,98,191,255,190,70,34,152],[151,63,166,31,209,203,91,185,54,199,142,168,114,9,130,137,20,168,67,51,128,230,74,1,197,146,136,119,7,241,169,148],[143,65,62,32,10,28,129,99,178,58,200,30,190,30,128,161,54,184,180,35,151,136,144,136,126,12,118,138,168,163,168,23],[121,249,33,189,101,77,217,190,208,100,111,5,32,116,149,229,223,218,24,231,237,194,92,144,215,155,7,29,86,55,20,63],[97,9,61,12,96,118,40,22,69,167,204,142,20,70,81,219,209,28,151,169,120,125,29,217,168,178,92,63,65,164,107,43],[85,219,146,65,5,35,20,133,25,52,89,172,101,173,171,153,63,109,196,23,55,132,110,129,111,52,122,5,11,185,95,49],[186,77,70,43,248,128,136,11,89,43,236,163,104,135,210,13,47,69,104,217,209,179,250,127,106,196,141,128,96,4,105,168],[134,60,215,121,44,42,81,55,150,206,102,63,121,67,27,146,155,99,219,129,103,255,90,175,110,180,208,8,18,78,201,165],[101,121,65,93,38,154,77,102,65,31,173,197,35,238,159,133,70,230,23,165,185,129,188,206,193,87,112,69,63,211,221,25],[168,141,248,176,22,51,92,124,46,17,253,173,244,149,188,99,243,158,108,12,41,156,246,29,129,255,205,111,72,101,191,50],[181,175,86,58,231,198,166,117,80,153,119,112,72,129,242,171,5,171,15,198,241,112,202,46,30,209,213,174,228,91,194,232],[97,228,92,126,99,104,18,229,210,73,255,173,230,93,143,17,69,7,199,64,3,70,122,17,73,49,236,165,221,27,112,192],[181,177,138,253,221,180,2,174,204,184,107,114,176,77,105,177,95,98,102,202,84,51,10,30,88,203,202,19,108,104,99,168],[203,123,182,38,25,174,15,43,252,239,136,128,143,127,44,152,224,134,69,81,79,28,85,241,122,176,118,93,59,177,131,109],[19,250,64,123,168,128,170,206,161,43,192,97,149,107,176,216,57,205,155,97,166,52,109,225,143,232,192,107,190,252,53,252],[149,203,77,120,249,228,253,252,67,66,46,156,200,67,108,108,15,193,196,24,181,12,247,207,152,74,35,195,91,187,41,76],[142,89,38,133,192,17,45,37,97,105,104,224,165,218,172,121,148,19,55,135,69,250,8,84,2,159,16,141,50,78,249,58],[101,91,65,215,61,218,168,47,122,205,86,162,117,77,249,122,104,123,243,144,235,224,31,215,249,194,218,106,254,9,133,174],[194,144,73,116,205,179,96,69,131,213,46,166,180,179,64,136,6,185,179,59,29,79,166,208,147,109,25,70,77,159,165,41]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[159,20,182,112,176,21,33,86,73,32,58,14,179,238,96,159,165,87,157,168,232,106,198,181,159,94,11,192,80,128,200,83],[147,93,55,182,25,61,236,49,145,86,15,1,4,201,145,158,154,176,240,43,102,31,5,110,79,218,240,233,195,2,81,169],[234,72,124,112,4,234,98,85,247,124,235,7,20,28,37,101,82,139,122,226,9,243,247,205,182,14,142,230,156,198,213,77],[222,19,244,0,31,153,94,69,245,234,8,254,33,30,100,116,77,128,37,128,174,159,206,236,196,40,207,74,174,19,230,229],[46,156,9,213,171,54,209,218,39,42,115,80,127,206,71,127,250,196,108,64,176,62,60,63,24,60,82,197,252,131,166,55],[104,173,39,222,219,74,219,176,99,101,3,222,140,243,156,91,246,164,12,206,44,34,191,253,243,173,20,38,53,125,109,132]], [175,225,73,162,170,172,198,232,183,173,56,141,244,43,71,9,53,16,229,16,206,112,34,251,98,202,146,176,76,20,6,246], "u1j1h",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(101, 100,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(4, 41,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("qxbrm", 179,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("tyub2",{from: accounts[0]});
  });
});