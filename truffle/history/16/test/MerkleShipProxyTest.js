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
    let result = await contractProxyMerkleShip.test_reveal(64, [[102,142,203,231,250,154,197,51,0,251,99,242,34,150,72,11,121,19,190,51,212,50,236,137,70,120,113,60,164,10,33,144],[168,213,235,130,223,117,133,68,92,192,59,175,0,167,1,250,224,23,190,181,179,165,219,118,149,84,108,164,80,111,78,70],[104,6,209,169,62,147,81,45,113,52,172,87,183,254,103,1,74,110,167,93,199,129,78,171,223,243,95,102,209,103,9,83],[153,60,178,213,208,103,75,216,143,209,89,134,102,108,79,31,67,47,44,101,125,195,67,2,234,74,83,225,107,9,218,235],[155,226,232,252,188,97,219,127,87,196,186,151,145,194,179,36,145,230,99,90,4,199,10,189,170,22,116,51,88,195,174,26],[175,68,118,178,180,204,142,201,181,209,168,179,108,163,21,11,189,60,94,231,22,59,172,115,105,57,180,195,194,197,44,82]], "verified victory by hit count",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(7,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(180,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["game resolved in an emergency","6xdvcl","90s309","gew9zi","6xdvcl","zc50lc","victory by unanswered challenge","gew9zi","zc50lc","victory by unanswered challenge","jk8jfr","mp2cu8","fbt7g","victory by unchallenged hit count","victory by concession","victory by concession","verified victory by hit count","verified victory by hit count","uh5wfm","victory by unchallenged hit count","gew9zi","jk8jfr","90s309","fbt7g","v37nks","90s309","6xdvcl","victory by concession","verified victory by hit count","victory by abandonment","mp2cu8","gew9zi","victory by unanswered challenge","pm9e89","verified victory by hit count","victory by concession","6xdvcl","gew9zi","gew9zi","hz8b88","mp2cu8","87yy8","pm9e89","87yy8","victory by concession","dafsqn","victory by concession","zc50lc","mp2cu8","hz8b88","verified victory by hit count","fbt7g","zc50lc","5ifl3b","victory by abandonment","jk8jfr","87yy8","victory by abandonment","5ifl3b","90s309","victory by concession","dafsqn","dafsqn","mp2cu8"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["v37nks","87yy8","verified victory by hit count","uh5wfm","5ifl3b","gew9zi","dafsqn","90s309","victory by unchallenged hit count","victory by concession","victory by unanswered challenge","game resolved in an emergency","87yy8","fbt7g","87yy8","6xdvcl","dafsqn","victory by unanswered challenge","6xdvcl","90s309","hz8b88","01bg7n","verified victory by hit count","victory by abandonment","game resolved in an emergency","90s309","victory by abandonment","zc50lc","zc50lc","hrn2hwm","6xdvcl","hrn2hwm","dafsqn","game resolved in an emergency","87yy8","01bg7n","victory by concession","mp2cu8","verified victory by hit count","gew9zi","fbt7g","uh5wfm","mp2cu8","fbt7g","victory by unchallenged hit count","5ifl3b","6xdvcl","hrn2hwm","zc50lc","01bg7n","dafsqn","fbt7g","sk27eh","victory by concession","hz8b88","90s309","game resolved in an emergency","fbt7g","87yy8","01bg7n","90s309","uh5wfm","victory by concession","hz8b88"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["mp2cu8","zvw8i","dafsqn","mp2cu8","mp2cu8","dafsqn","87yy8","hz8b88","verified victory by hit count","sk27eh","sk27eh","dafsqn","01bg7n","5ifl3b","victory by unanswered challenge","zvw8i","victory by unchallenged hit count","v37nks","pm9e89","6xdvcl","dafsqn","87yy8","uh5wfm","victory by unchallenged hit count","6xdvcl","fbt7g","90s309","victory by unanswered challenge","victory by abandonment","verified victory by hit count","nm5m8k","5ifl3b","87yy8","verified victory by hit count","zc50lc","mp2cu8","6xdvcl","victory by unchallenged hit count","87yy8","verified victory by hit count","verified victory by hit count","mp2cu8","victory by abandonment","mp2cu8","uh5wfm","dafsqn","mp2cu8","zvw8i","87yy8","uh5wfm","hz8b88","hrn2hwm","sk27eh","uh5wfm","zvw8i","nm5m8k","hrn2hwm","nm5m8k","hz8b88","victory by unchallenged hit count","zvw8i","87yy8","4lwqh","hz8b88"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[36,249,141,66,126,31,49,195,154,11,212,149,47,175,54,75,179,158,133,51,39,247,183,49,88,254,100,186,175,173,116,146],[161,89,37,206,45,155,47,175,86,65,109,174,153,142,54,23,208,211,156,168,72,162,140,244,88,216,231,160,24,73,106,221]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[142,43,67,181,253,106,38,18,247,234,172,85,113,229,147,92,28,219,253,166,15,219,116,2,134,219,51,204,205,15,20,249]], 47, 2,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[108,142,123,121,97,175,166,23,145,172,115,95,110,225,37,45,88,108,95,151,232,229,144,41,80,38,183,229,45,9,235,13],[224,12,166,212,224,231,58,251,68,68,63,192,16,76,128,211,53,159,181,144,67,192,191,253,222,158,138,130,22,19,103,0],[53,44,114,140,87,29,233,113,8,22,92,235,173,197,120,108,8,238,242,123,230,99,13,34,75,251,167,16,114,29,148,103],[118,153,145,38,72,195,131,79,154,222,25,204,3,206,150,124,49,110,93,185,182,50,134,252,78,79,49,8,248,162,108,8],[104,88,200,16,101,153,75,227,105,9,155,85,6,91,145,191,251,117,213,165,143,36,105,248,207,49,153,125,9,16,84,251],[206,124,10,253,167,46,213,64,143,219,94,110,13,62,161,72,44,66,17,61,11,149,248,105,55,79,250,236,154,16,77,187],[118,190,89,175,13,102,185,190,134,211,205,229,157,158,23,168,224,184,140,111,93,121,13,2,132,89,189,39,101,30,63,228],[54,58,34,59,41,30,20,120,75,65,8,186,156,105,183,226,31,153,120,146,50,5,106,134,47,148,23,126,95,161,159,239],[85,149,219,224,157,183,242,72,127,222,110,50,16,26,66,120,198,237,130,169,175,88,63,173,101,16,106,58,167,171,192,241],[7,60,95,56,49,81,218,11,196,116,14,33,201,54,98,236,198,35,110,44,124,226,146,165,31,0,25,84,127,94,154,152],[67,51,129,77,246,61,42,141,163,187,24,40,106,217,137,85,216,212,46,38,56,115,50,98,245,6,105,179,63,105,78,245],[161,30,37,208,44,34,188,82,112,214,217,9,215,230,53,106,126,85,106,5,252,88,9,112,5,239,106,111,93,177,9,202],[33,250,236,238,208,82,135,49,30,154,195,92,153,76,32,145,47,201,61,128,73,42,230,24,66,157,26,223,64,167,31,191],[69,224,28,254,63,19,2,32,9,108,100,172,70,16,4,101,21,48,145,105,161,35,95,84,40,184,163,61,128,113,97,236],[55,159,10,139,33,99,165,88,217,93,167,230,188,142,114,28,196,252,41,232,207,138,19,160,164,214,42,186,28,57,61,79],[111,189,68,160,204,114,48,43,57,97,116,213,65,192,51,51,237,112,201,120,245,108,156,248,245,21,140,86,62,20,147,129],[44,88,102,199,29,28,147,147,150,103,36,199,118,19,194,63,182,166,196,241,105,213,201,243,255,188,161,48,201,151,208,247],[6,116,65,91,1,65,87,247,36,115,73,150,230,123,192,101,163,159,26,102,66,227,55,1,33,13,41,123,26,118,106,171],[14,161,108,126,172,13,184,233,222,87,193,168,241,77,164,96,136,164,127,248,97,196,6,16,202,81,208,24,141,208,46,231],[120,175,244,98,56,26,52,255,248,219,241,61,120,95,97,93,243,54,134,69,153,54,171,243,232,138,195,207,162,156,53,136],[39,133,184,6,153,189,52,35,131,4,81,24,91,178,4,185,185,232,120,98,60,102,14,67,80,111,66,233,255,8,58,161],[158,229,85,220,128,127,29,0,87,227,28,14,95,22,107,212,61,161,252,231,116,33,193,116,241,32,33,135,87,42,145,144],[107,219,244,57,12,64,222,210,203,72,165,2,14,168,60,237,149,62,120,212,243,43,155,190,8,125,130,248,15,168,251,124],[110,215,3,165,232,249,178,66,251,184,77,41,130,152,73,81,17,239,135,198,45,41,110,187,165,1,53,214,220,196,143,29],[68,79,134,211,87,251,167,37,8,93,124,133,78,163,121,206,107,30,111,123,164,245,214,0,210,177,20,152,14,180,13,213],[223,143,124,224,122,72,1,217,28,191,108,116,229,107,219,228,137,33,39,25,105,72,46,209,175,77,225,254,99,167,108,118],[29,161,43,241,125,153,84,141,225,208,59,86,204,4,112,205,12,124,135,73,102,151,118,4,159,223,55,40,46,47,115,125],[29,110,247,210,39,83,85,232,52,238,93,184,34,104,200,101,108,137,45,218,158,233,40,30,250,134,75,183,58,214,122,37],[218,95,14,135,33,99,122,58,242,189,181,5,62,120,241,139,34,1,22,67,142,245,116,176,9,254,157,70,114,192,243,21],[91,13,218,242,56,170,96,179,166,225,132,47,118,218,114,207,188,14,84,44,8,230,176,249,150,229,99,9,209,68,157,104],[161,70,172,26,187,167,241,173,1,211,200,224,29,142,55,101,17,170,171,165,249,109,57,150,12,140,133,181,108,126,200,12],[136,21,33,18,111,3,133,0,46,193,252,51,178,163,188,14,253,236,168,180,45,84,4,216,156,139,198,140,195,250,177,118],[50,17,130,133,89,72,91,54,71,204,199,191,152,211,146,109,200,121,99,62,36,176,221,229,99,62,175,214,217,91,178,17],[246,18,15,158,236,228,186,14,104,79,55,8,76,53,204,235,70,106,79,56,80,20,25,124,224,57,215,232,85,52,195,203],[20,252,32,154,85,147,15,74,149,162,34,164,159,130,201,47,221,39,255,199,209,13,101,13,209,141,81,73,135,157,121,237],[251,78,249,188,42,178,96,162,84,234,218,69,104,113,51,162,5,12,157,41,21,251,201,7,179,133,191,93,157,155,174,240],[164,225,222,58,226,191,110,4,249,91,104,222,157,94,115,163,181,22,245,171,178,62,225,76,127,29,207,214,208,143,17,159],[164,84,225,245,229,5,114,227,218,188,227,5,191,56,215,65,150,165,156,244,194,103,185,117,22,238,75,221,220,115,71,59],[113,41,79,226,137,220,17,255,66,39,102,106,197,47,199,251,26,70,7,12,18,191,31,107,108,214,199,114,162,81,170,175],[170,16,219,158,13,159,29,163,90,91,84,30,187,231,38,104,51,71,104,225,58,50,74,151,73,135,239,124,27,115,1,111],[205,125,167,42,83,210,113,59,105,183,75,116,177,196,227,168,237,142,249,220,200,93,101,44,208,30,80,61,222,219,46,161]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[244,72,87,29,79,211,52,234,186,200,212,251,239,194,249,246,194,150,241,158,168,232,161,48,177,217,202,239,22,194,168,0],[235,159,64,101,73,134,167,55,134,131,73,49,245,112,111,184,13,194,132,117,36,201,226,183,75,152,15,227,55,75,234,153]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[144,90,122,67,63,147,233,227,217,8,187,129,76,200,133,205,251,121,112,200,204,101,67,244,219,120,189,106,248,1,50,196],[137,142,25,207,116,233,216,102,238,150,213,12,42,221,91,163,247,253,223,196,135,67,191,19,219,69,207,34,104,207,158,132],[78,31,78,210,167,153,226,199,212,162,255,98,110,49,214,217,123,76,29,164,58,231,180,162,23,29,195,159,248,200,246,45],[181,166,123,210,11,101,255,254,234,81,109,83,166,165,26,175,195,65,37,67,195,114,248,251,179,63,40,225,193,190,151,24],[62,16,102,96,215,0,168,164,195,138,113,15,119,144,44,242,77,230,185,199,196,97,248,35,123,29,210,118,106,0,197,117],[5,241,61,212,124,88,138,100,196,23,142,201,41,144,213,140,74,140,164,212,9,86,23,244,62,73,85,153,15,253,56,155],[200,157,51,165,45,241,9,26,163,218,47,9,66,129,228,68,138,111,212,36,53,16,124,49,248,113,121,213,35,17,102,3],[30,29,165,59,120,169,45,86,57,235,129,175,141,173,111,133,119,79,49,29,107,121,251,207,165,159,242,21,29,234,80,108],[193,49,185,51,139,18,99,117,200,176,124,129,55,250,90,86,229,51,231,86,149,42,123,74,241,251,105,251,70,8,71,0],[231,23,137,194,215,231,153,36,67,36,93,219,50,140,172,71,49,163,94,216,122,6,72,229,185,162,92,156,47,64,190,33],[158,255,64,195,8,233,30,210,160,159,122,39,215,145,7,192,179,158,194,35,99,213,189,39,124,15,92,140,213,51,199,48],[224,202,201,166,79,167,193,1,78,41,84,74,166,174,25,250,21,196,177,245,0,128,49,100,31,205,212,5,36,188,220,21],[49,81,110,42,79,89,150,5,236,130,82,237,134,37,75,6,196,161,188,98,116,200,147,56,163,103,16,150,95,230,137,158],[164,149,30,108,166,127,8,105,192,120,42,151,252,96,150,210,44,140,102,239,123,8,98,232,93,31,139,79,194,59,244,149],[110,61,196,161,207,113,245,251,102,54,89,55,240,4,235,140,12,172,205,239,66,224,91,16,202,208,233,56,152,211,123,20],[49,214,54,36,154,81,230,73,86,1,156,189,241,192,165,8,138,76,43,54,107,221,10,254,64,125,2,31,20,196,34,187],[129,23,115,59,5,213,119,225,118,71,71,161,220,176,130,92,191,255,213,32,231,116,208,140,41,68,33,22,222,147,82,19],[200,201,37,166,149,115,129,38,24,14,246,34,31,116,227,211,184,16,93,217,102,150,48,45,3,166,41,40,170,109,244,85],[51,195,231,126,158,18,232,114,142,227,79,120,230,184,7,130,198,157,46,167,216,129,173,80,157,133,251,187,223,115,41,217],[58,189,132,51,150,162,122,65,218,125,9,93,27,223,64,181,226,134,139,54,18,126,175,56,100,34,76,139,17,25,60,221],[140,109,17,78,169,63,0,38,176,16,190,231,3,80,39,43,206,11,178,107,74,210,241,148,172,68,181,112,175,221,52,28],[45,51,0,197,122,76,174,96,166,217,11,186,106,241,100,209,52,208,212,240,33,110,88,117,26,136,111,136,225,122,11,87],[110,40,181,253,31,234,182,198,49,173,104,129,129,76,157,209,186,126,76,151,60,238,106,187,253,23,149,81,73,173,242,141],[201,153,1,233,98,108,95,52,96,139,131,238,146,33,140,228,190,134,99,76,76,76,162,47,186,48,19,26,231,8,80,71],[184,126,200,240,105,65,175,37,216,75,172,230,229,195,227,115,39,105,3,110,130,101,149,129,52,62,53,17,36,190,166,132],[5,239,67,161,10,31,168,229,192,180,16,105,91,73,242,78,15,24,139,203,217,61,186,84,79,37,134,63,88,201,27,157],[238,162,44,26,106,120,76,138,62,142,203,188,140,197,35,48,79,222,213,221,100,232,198,146,190,115,225,138,199,189,242,214],[17,199,220,48,245,209,74,107,81,141,206,24,5,202,83,188,247,6,17,156,237,62,203,14,15,162,14,115,245,213,121,183],[39,110,150,55,178,60,13,253,228,20,188,140,239,29,96,169,35,98,207,47,137,133,164,147,231,194,82,17,219,249,53,47],[120,208,189,184,180,234,10,82,22,11,56,245,141,139,194,209,48,7,188,200,51,130,227,92,226,95,18,125,76,60,232,54],[55,157,236,130,51,58,165,206,148,164,141,250,89,131,143,186,82,215,137,151,25,129,84,252,99,32,77,77,72,198,126,12],[185,214,90,20,127,116,90,118,230,198,117,48,11,37,29,196,232,254,27,25,19,126,16,233,27,241,192,134,225,109,137,6],[20,92,185,203,221,65,28,99,246,194,177,248,41,136,163,71,184,61,150,87,157,13,62,246,125,86,120,177,182,52,92,155],[152,161,200,39,215,218,179,26,169,149,202,160,238,240,72,210,78,251,230,44,254,66,170,80,1,23,22,117,252,41,23,93],[122,202,95,136,235,186,171,242,136,17,172,138,173,34,178,78,28,220,168,24,142,195,169,79,49,160,53,42,91,141,16,199],[9,84,22,164,114,7,36,3,179,49,2,193,250,83,15,37,198,208,100,69,84,150,193,165,94,91,215,5,46,241,70,165],[224,92,102,176,19,206,175,135,163,30,129,207,100,90,128,83,61,216,73,230,52,235,191,48,157,89,145,186,88,59,109,178],[155,126,138,30,116,252,101,213,235,0,28,6,79,214,156,196,29,12,208,34,125,236,78,55,177,53,160,2,175,66,145,85],[219,62,189,199,131,59,89,7,255,16,250,77,228,188,242,64,28,67,140,51,143,114,147,115,100,249,161,145,191,50,146,149],[156,188,103,218,248,108,194,190,3,107,107,128,114,234,132,120,160,99,62,109,133,1,129,206,138,250,242,226,93,152,5,138],[92,125,126,120,8,26,204,249,177,31,136,121,244,184,67,238,159,186,254,107,56,189,218,33,120,254,42,36,234,68,251,36],[212,33,21,62,47,55,12,190,32,203,149,144,128,178,73,0,31,250,40,151,146,78,19,135,203,25,121,102,225,212,0,231],[17,244,52,152,110,159,49,139,43,159,103,100,193,32,47,167,11,80,158,95,145,2,55,43,56,44,203,157,208,67,46,90],[24,13,121,48,159,241,37,104,61,32,12,72,22,226,56,78,130,78,154,98,111,86,30,150,252,126,38,183,36,198,88,102],[193,173,253,234,254,158,28,235,88,226,255,121,133,153,105,36,33,143,163,91,51,15,32,25,23,85,127,143,56,208,4,93],[63,227,17,228,126,234,107,61,85,45,205,217,154,85,241,45,245,162,5,132,192,58,115,205,134,217,16,73,247,120,165,241],[83,64,15,145,13,10,90,237,240,24,219,15,16,110,69,15,45,98,41,23,36,221,218,174,141,95,169,85,187,5,211,110],[111,48,184,28,161,250,48,140,181,131,113,101,125,37,126,92,62,159,99,26,52,70,78,14,193,30,188,160,236,173,97,242],[167,1,74,207,233,203,144,248,251,10,238,251,208,131,137,34,198,126,33,141,134,216,27,73,46,86,152,75,26,114,195,77],[122,108,136,117,70,241,114,56,215,177,28,201,94,101,69,39,216,234,12,139,146,110,220,29,61,36,55,177,234,215,218,3],[122,242,79,22,167,250,9,27,43,78,78,106,228,78,148,163,4,152,164,109,228,110,249,253,25,61,69,95,167,183,243,161],[198,52,231,159,174,124,29,252,6,186,165,104,99,4,39,43,162,228,62,110,243,0,180,53,180,153,70,210,162,227,155,60],[51,29,226,56,185,99,74,159,191,197,55,160,108,191,28,234,5,80,255,221,186,119,11,228,31,4,65,91,56,246,159,76],[67,177,236,11,249,167,128,12,229,208,208,189,191,141,176,31,59,60,9,133,235,50,20,13,225,93,2,102,32,208,34,71],[159,111,61,113,56,162,131,136,23,50,238,116,38,38,253,253,69,253,2,83,240,109,235,12,18,129,17,82,239,247,53,97],[43,251,59,122,47,142,63,78,243,76,61,235,18,218,254,83,0,0,150,162,43,47,170,82,107,60,189,69,180,157,227,78],[177,225,127,34,116,80,203,170,217,55,58,196,112,172,23,176,138,1,2,118,86,55,153,74,152,185,42,151,157,62,29,44],[48,65,203,222,243,87,43,48,168,216,222,43,54,251,99,184,92,209,48,32,3,189,161,105,238,32,192,97,234,98,209,62],[210,77,144,7,160,139,74,179,152,174,157,77,106,11,158,201,234,138,173,79,47,10,149,144,67,242,123,30,67,103,58,32],[188,211,124,69,63,228,130,206,239,215,19,45,205,172,106,115,122,8,58,97,9,138,159,57,192,201,228,193,168,230,147,1],[142,231,119,79,247,69,236,155,2,151,222,26,61,192,217,28,142,7,238,27,201,37,93,72,84,113,108,72,88,18,99,246],[144,3,116,204,143,97,171,111,60,26,123,10,30,119,205,85,70,159,106,115,154,95,88,178,22,95,152,221,11,85,164,139],[22,203,87,84,175,246,84,81,181,201,36,228,234,237,53,241,80,6,65,182,139,130,170,221,198,167,135,14,109,5,245,242],[204,42,216,107,197,191,53,246,45,105,194,183,241,37,205,225,82,219,40,99,245,242,232,26,60,175,18,177,25,5,102,243],[11,175,129,246,81,94,195,218,200,70,173,160,168,233,233,86,187,124,240,42,208,186,163,212,150,78,108,72,112,63,218,227],[123,110,125,188,221,85,49,158,21,129,107,19,44,244,200,111,164,200,100,34,210,227,254,168,69,186,104,0,186,206,219,141],[221,103,93,30,166,15,53,170,105,62,132,111,242,253,96,34,192,158,101,34,126,135,188,182,200,1,141,128,22,223,133,239],[45,102,232,218,122,83,111,93,138,127,169,234,43,252,120,80,166,109,66,221,133,98,233,159,41,106,254,20,35,169,12,236],[86,236,231,145,34,113,222,165,107,231,10,166,73,196,140,142,143,68,142,126,248,15,83,132,156,159,186,50,165,26,84,176],[174,113,225,147,112,250,244,44,61,209,130,123,179,29,103,40,37,93,247,48,213,32,253,116,216,125,70,60,82,238,142,1],[182,137,237,203,238,110,251,208,26,144,59,121,218,63,72,33,41,163,253,65,187,227,68,250,160,251,229,192,144,83,71,199],[62,237,174,184,32,71,44,181,227,77,212,72,230,144,172,96,78,1,207,10,144,159,14,81,76,74,203,73,181,156,171,126],[179,165,190,70,115,7,129,227,148,235,58,175,161,135,7,176,231,116,106,108,130,144,43,196,90,72,184,2,248,21,98,92],[160,174,214,101,118,245,235,72,141,23,30,40,43,25,219,86,28,180,63,36,225,26,138,222,140,237,112,61,93,97,138,21],[166,219,151,136,11,15,71,2,124,20,14,59,126,184,107,186,62,145,44,27,216,187,186,78,16,201,225,227,21,5,186,126],[196,46,43,18,219,204,162,116,231,89,221,134,46,118,9,157,179,116,183,166,46,47,123,34,173,162,124,96,47,86,99,138],[144,241,221,155,106,75,31,118,161,19,222,74,242,234,39,152,234,212,246,54,176,237,153,212,69,146,194,154,160,171,231,33],[90,115,226,3,226,186,110,88,70,181,113,115,65,97,172,162,108,142,115,197,140,53,216,203,129,141,241,241,79,97,151,248],[54,113,2,129,64,52,230,182,112,52,11,33,233,51,169,95,165,94,54,252,30,55,163,133,10,140,27,91,50,208,56,127],[234,61,91,104,164,100,28,13,21,49,71,223,19,96,101,95,246,132,59,234,128,32,244,250,208,211,226,100,179,150,12,197],[23,248,122,181,79,246,183,93,23,4,170,63,168,136,152,115,169,235,254,156,228,238,123,168,170,10,53,230,151,20,50,172],[150,183,20,212,155,74,122,207,180,253,228,29,125,98,34,230,246,28,221,39,188,64,141,93,104,134,60,242,227,97,8,121],[180,70,63,134,17,210,14,189,112,105,158,178,120,65,216,192,172,123,69,218,27,16,41,23,107,0,133,115,87,75,68,134],[216,64,148,58,63,181,174,83,253,2,55,71,102,116,125,156,28,105,180,197,247,64,145,195,170,40,91,22,193,105,8,88],[155,40,188,136,221,13,156,96,37,26,114,13,117,208,18,240,63,7,5,41,160,5,148,180,144,166,253,136,92,25,235,182],[85,190,102,27,37,173,183,229,59,238,95,44,146,16,46,115,150,65,184,93,136,128,69,9,33,60,76,226,230,219,204,132],[157,13,113,51,15,226,11,78,159,238,94,25,103,229,81,207,95,70,227,246,152,135,22,112,247,131,195,27,65,9,190,38],[73,113,109,89,66,34,18,7,79,46,187,150,31,66,58,120,229,26,213,94,46,219,209,251,134,37,223,157,70,115,216,43],[9,231,155,17,113,67,213,106,79,38,233,116,236,244,174,6,56,168,65,168,23,62,148,79,170,18,107,178,212,77,113,33],[90,55,195,178,175,7,244,204,3,94,134,44,131,251,203,13,66,21,2,72,189,133,177,249,105,134,244,92,91,219,149,164],[10,111,70,160,69,147,192,2,190,243,240,181,33,164,44,103,112,222,138,61,181,247,109,140,245,132,56,75,107,47,120,48],[89,129,209,109,35,55,93,10,1,61,152,165,174,78,64,44,62,45,238,179,6,242,42,24,50,82,221,148,37,174,145,130],[189,165,153,178,165,247,185,249,160,19,249,242,211,128,226,226,83,109,105,106,195,250,57,35,211,215,13,121,192,221,154,15],[83,146,187,191,159,180,52,133,23,155,10,20,57,206,53,120,160,154,165,247,165,153,22,68,65,164,84,195,174,168,164,213],[137,238,189,174,233,113,162,31,202,136,251,140,170,197,1,197,218,74,33,255,68,83,245,2,11,209,213,137,135,19,120,198],[71,199,136,59,133,205,15,92,118,191,86,168,11,147,175,72,224,235,126,1,249,113,198,41,219,63,150,5,96,255,238,34],[196,88,97,41,125,148,116,89,231,145,132,136,48,75,71,241,238,149,248,30,110,235,74,168,52,9,74,41,8,70,233,247],[131,149,50,246,99,163,211,193,61,213,17,247,239,208,76,100,105,60,241,114,217,10,60,41,119,151,85,140,202,167,184,107],[49,88,87,220,177,191,215,164,220,103,69,246,109,93,115,179,105,232,196,14,151,236,159,157,152,46,191,33,15,30,16,97],[247,179,195,112,77,215,213,182,3,35,38,128,165,203,178,131,140,10,233,16,32,84,245,100,176,58,120,54,243,178,64,252]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[107,126,240,177,144,98,115,199,234,209,10,138,8,190,236,126,141,35,120,220,46,83,80,227,47,89,129,158,140,253,209,30],[158,206,94,179,64,9,57,185,67,203,209,23,0,144,25,70,248,238,117,49,210,90,156,148,139,251,63,197,111,104,138,204],[26,121,209,13,120,84,241,200,156,47,30,151,221,115,9,158,4,209,57,9,174,80,102,100,48,47,180,189,142,241,238,247],[180,111,215,198,127,50,140,217,141,76,255,42,65,85,6,118,253,48,254,75,249,112,181,180,107,147,239,56,199,206,9,164],[141,194,252,215,254,240,187,186,110,25,61,113,162,86,0,65,21,61,254,115,120,148,212,132,19,106,110,3,91,178,180,144],[75,29,30,177,7,248,22,7,161,191,118,254,0,176,92,223,226,204,98,151,199,136,23,220,189,44,206,55,51,52,199,175]], [172,215,179,103,120,71,106,112,39,55,12,40,218,67,193,255,249,1,46,19,205,95,57,155,238,169,56,180,116,28,127,253], "gew9zi",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(48, 181,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(181, 41,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("90s309", 64,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("uh5wfm",{from: accounts[0]});
  });
});
