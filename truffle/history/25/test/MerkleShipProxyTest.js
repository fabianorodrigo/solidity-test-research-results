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
    let result = await contractProxyMerkleShip.test_reveal(13, [[91,116,208,166,75,59,60,188,193,118,99,254,89,196,10,253,41,118,129,244,171,60,64,128,99,82,247,240,247,182,147,127],[203,29,169,229,191,144,19,139,151,122,101,25,31,104,35,49,50,175,26,225,242,65,246,147,150,52,150,89,166,111,52,129],[79,55,158,118,184,194,247,110,45,13,80,203,11,217,221,55,74,133,56,105,52,60,239,247,173,243,36,208,113,213,55,255],[118,27,154,67,15,130,110,241,149,164,176,40,111,60,21,22,38,46,224,55,178,147,159,17,176,40,63,1,170,151,72,121],[85,50,121,108,113,104,20,46,105,53,159,209,148,6,170,155,230,149,53,125,0,56,95,184,211,54,5,107,141,165,66,238],[236,118,36,207,87,4,93,0,85,191,159,123,63,88,240,229,66,232,78,37,56,129,66,38,106,93,22,186,147,194,106,83]], "verified victory by hit count",{from: accounts[0]});
  });
  it('Should execute test_checkForVictoryByHit(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_checkForVictoryByHit(101,{from: accounts[0]});
  });
  it('Should execute test_zeroOutStorage(uint32)', async () => {
    let result = await contractProxyMerkleShip.test_zeroOutStorage(179,{from: accounts[0]});
  });
  it('Should execute test_checkShipCount(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipCount(["of2uhg","victory by concession","6ng76s","6ng76s","victory by abandonment","game resolved in an emergency","victory by concession","victory by unchallenged hit count","v8jl6","victory by unchallenged hit count","l6vrt","tg55r5","6i3avn","l6vrt","csjt1","victory by unanswered challenge","6ng76s","victory by unchallenged hit count","victory by abandonment","victory by abandonment","v8jl6","26dzg","947j8m","nwljt","26dzg","victory by unchallenged hit count","6ng76s","victory by unchallenged hit count","victory by unchallenged hit count","of2uhg","csjt1","victory by concession","csjt1","v8jl6","tg55r5","game resolved in an emergency","tg55r5","l6vrt","26dzg","947j8m","l6vrt","6ng76s","6i3avn","victory by unanswered challenge","verified victory by hit count","l6vrt","victory by unanswered challenge","q5en6","l6vrt","victory by unchallenged hit count","tg55r5","victory by unchallenged hit count","q5en6","6ng76s","3frz8","q5en6","v8jl6","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","victory by concession","l6vrt","9a50d8q","947j8m"],{from: accounts[0]});
  });
  it('Should execute test_checkShipLength(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_checkShipLength(["csjt1","6i3avn","v8jl6","6i3avn","victory by unanswered challenge","victory by unchallenged hit count","947j8m","q5en6","26dzg","game resolved in an emergency","victory by unanswered challenge","j8h86","victory by abandonment","947j8m","tg55r5","victory by concession","q5en6","victory by unanswered challenge","nwljt","3frz8","26dzg","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","game resolved in an emergency","l6vrt","3frz8","verified victory by hit count","nwljt","of2uhg","9a50d8q","of2uhg","v8jl6","3frz8","3frz8","9a50d8q","26dzg","q5en6","26dzg","csjt1","q5en6","6i3avn","csjt1","victory by abandonment","game resolved in an emergency","6i3avn","of2uhg","3frz8","victory by concession","victory by unanswered challenge","3frz8","verified victory by hit count","victory by abandonment","j8h86","9a50d8q","nwljt","26dzg","6ng76s","70te4m","victory by unchallenged hit count","game resolved in an emergency","v8jl6","victory by unanswered challenge","tg55r5"],{from: accounts[0]});
  });
  it('Should execute test_hashEach(string[64])', async () => {
    let result = await contractProxyMerkleShip.test_hashEach(["victory by unanswered challenge","victory by unchallenged hit count","9a50d8q","victory by abandonment","26dzg","of2uhg","6i3avn","70te4m","g6aozi","6i3avn","70te4m","verified victory by hit count","v8jl6","q5en6","3frz8","6ng76s","q5en6","3frz8","victory by concession","of2uhg","3frz8","9a50d8q","victory by unchallenged hit count","947j8m","csjt1","tg55r5","csjt1","6i3avn","9a50d8q","q5en6","l6vrt","of2uhg","game resolved in an emergency","csjt1","6i3avn","of2uhg","947j8m","victory by unanswered challenge","game resolved in an emergency","j8h86","v8jl6","6ng76s","tg55r5","v8jl6","tg55r5","3frz8","victory by concession","6ng76s","v8jl6","tg55r5","6i3avn","l6vrt","v8jl6","26dzg","947j8m","q5en6","csjt1","6ng76s","q5en6","26dzg","l6vrt","63j1op","63j1op","q5en6"],{from: accounts[0]});
  });
  it('Should execute test_sortArray(bytes32[])', async () => {
    let result = await contractProxyMerkleShip.test_sortArray([[61,210,68,130,85,28,175,155,45,251,187,32,98,51,89,168,58,51,78,57,34,161,70,91,167,168,129,253,100,214,113,90],[44,245,31,149,80,206,11,37,245,244,46,222,146,149,94,84,167,175,239,238,202,226,197,164,202,167,9,16,242,46,209,164],[67,11,239,125,34,2,12,216,152,194,90,243,206,47,104,197,125,21,170,188,117,131,167,77,142,63,81,249,214,20,91,39],[12,91,209,94,41,58,183,65,121,0,71,118,106,135,178,180,105,115,163,251,23,243,107,148,253,91,196,132,221,174,91,9],[249,18,157,173,88,52,190,17,31,237,201,145,189,122,59,128,224,201,192,244,85,118,41,222,168,96,148,254,64,198,82,232]],{from: accounts[0]});
  });
  it('Should execute test_quickSort(bytes32[],int,int)', async () => {
    let result = await contractProxyMerkleShip.test_quickSort([[45,76,97,151,94,45,88,108,224,133,199,139,28,179,158,95,189,109,78,207,37,63,206,195,234,5,26,241,158,119,71,145],[226,179,242,216,126,6,14,67,110,140,140,39,5,236,183,213,200,104,135,115,154,16,14,151,152,137,140,215,6,209,154,175],[94,175,252,50,126,25,106,50,88,113,168,175,73,176,192,245,15,200,250,206,221,93,120,102,69,87,147,76,220,224,50,124]], 65, 9,{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length>=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[92,128,250,89,100,222,184,145,147,116,7,128,220,129,29,63,201,133,180,67,108,24,92,89,212,98,161,42,253,238,47,200],[231,86,84,50,167,184,157,130,34,78,27,194,110,5,71,162,222,65,245,188,183,126,87,173,99,198,146,177,20,32,131,70],[9,38,21,222,179,2,107,63,136,143,109,70,83,216,140,166,223,80,237,3,133,85,60,118,50,3,169,173,27,16,222,211],[181,228,221,17,180,144,49,213,178,191,146,168,185,139,144,248,119,146,206,18,74,70,157,163,239,203,15,6,74,212,212,87],[227,108,60,227,199,51,65,244,6,100,87,6,16,203,8,11,82,43,250,137,72,231,35,12,156,217,105,223,235,157,101,146],[28,62,253,254,218,240,144,81,68,15,154,180,156,214,122,181,13,95,4,117,95,82,22,176,45,97,145,5,102,15,44,12],[14,68,32,72,20,79,248,157,240,100,221,25,35,236,12,179,160,63,80,196,60,35,212,129,78,33,9,161,6,179,99,194],[105,250,255,236,144,166,165,145,135,82,174,7,252,152,221,144,217,24,78,31,79,143,150,78,120,93,140,126,218,86,155,184],[202,23,24,106,79,248,211,79,110,135,111,118,100,120,14,177,188,85,60,8,39,143,85,92,136,205,141,158,251,62,2,62],[114,189,162,216,99,152,96,181,182,142,180,104,224,65,206,147,167,225,214,93,23,138,188,169,125,5,198,5,225,1,155,24],[87,13,157,232,43,126,177,93,223,93,65,210,206,150,246,48,44,140,116,169,197,42,202,146,38,185,189,121,35,218,73,141],[117,12,58,59,31,99,122,255,236,38,150,104,184,58,107,231,106,41,140,182,149,196,78,83,154,230,29,180,236,160,90,193],[169,238,135,205,214,109,102,60,97,4,97,5,95,47,251,232,31,138,235,87,103,101,182,239,205,49,180,243,65,28,28,163],[95,85,102,231,208,37,83,250,39,218,105,45,17,144,217,29,200,232,240,117,199,247,207,148,9,139,93,171,10,150,71,233],[128,125,242,42,150,152,75,17,52,105,149,53,118,95,182,2,83,202,118,171,44,85,42,59,11,3,173,182,188,123,127,94],[59,195,57,0,102,248,183,105,143,28,184,78,86,68,162,99,100,175,106,165,28,202,112,172,183,65,245,12,107,232,219,251],[169,218,203,240,24,248,111,214,74,60,125,135,115,76,7,84,184,127,137,197,110,227,30,179,7,139,74,45,133,186,203,101],[219,46,110,164,26,125,146,189,71,247,160,58,139,106,128,235,196,236,179,156,219,86,174,56,235,154,44,134,200,155,64,218],[91,7,161,28,33,175,149,238,51,127,53,218,178,166,24,85,50,176,10,185,185,135,85,105,136,135,205,177,65,21,232,213],[252,0,58,217,76,230,212,104,82,215,3,139,192,52,200,96,37,103,103,232,161,224,176,30,138,137,120,63,250,168,173,50],[196,245,181,21,13,110,199,209,25,228,166,215,195,18,92,187,60,133,228,162,76,246,156,241,95,20,135,189,66,72,34,211],[252,178,206,30,235,199,56,148,27,94,69,40,199,29,80,220,203,0,168,146,142,235,48,33,105,145,101,103,232,112,179,177],[146,24,139,188,141,224,42,54,67,152,143,209,121,112,222,200,227,64,144,69,94,9,108,129,129,3,198,215,238,232,100,216],[200,155,164,172,199,223,183,157,180,9,21,229,168,241,166,254,162,189,61,238,55,84,215,229,239,88,21,201,213,204,194,214],[231,240,136,245,73,69,102,253,224,29,56,18,175,101,57,58,183,5,40,195,161,212,70,253,119,129,234,25,146,114,64,170],[250,185,252,141,170,203,94,227,212,212,77,224,27,181,94,239,24,249,212,242,0,253,207,33,33,153,221,56,74,195,56,138],[20,204,54,37,55,181,217,226,104,18,58,118,204,240,83,46,46,100,41,12,119,94,172,160,137,7,95,212,249,13,221,35],[26,70,190,171,79,104,229,142,81,229,8,72,56,109,204,210,26,67,35,23,10,39,78,245,122,107,70,65,103,176,139,195],[236,225,144,212,206,102,175,240,179,236,57,68,57,248,79,6,238,26,175,39,130,96,88,185,177,218,223,133,1,47,127,62],[143,179,58,31,113,142,207,6,234,143,151,165,90,118,91,192,37,70,42,84,24,171,178,16,192,163,79,101,144,16,180,247],[246,195,181,83,193,45,114,212,56,34,210,83,121,52,21,42,43,241,205,59,12,99,200,73,228,195,189,225,89,183,223,219],[67,106,192,172,253,59,31,53,231,81,255,6,78,198,166,203,206,149,34,194,77,127,164,217,123,173,123,168,67,87,4,80],[111,152,216,188,190,140,136,52,36,90,162,170,186,103,222,21,120,210,119,101,150,231,7,71,218,45,162,36,52,225,212,67],[173,246,124,47,85,70,183,58,162,224,33,215,174,166,78,144,37,92,48,20,247,61,180,82,113,83,204,243,194,44,13,29],[89,228,215,25,53,179,225,249,47,189,41,220,81,87,80,23,115,59,81,66,170,182,182,98,7,94,35,103,225,69,162,234],[51,213,254,33,42,155,61,237,184,238,124,232,169,121,103,218,150,101,107,204,48,190,160,120,201,52,195,205,63,110,231,122],[109,64,219,138,208,229,204,248,16,138,200,36,120,75,97,239,248,152,162,171,90,213,55,16,97,43,3,131,167,131,16,143],[22,226,229,59,99,132,105,7,104,48,102,198,69,255,5,124,145,65,216,44,40,166,229,180,79,15,218,81,211,41,102,47],[207,73,94,226,217,43,20,18,106,183,133,61,173,62,57,2,149,56,22,78,178,246,233,216,25,190,164,171,32,149,180,212],[116,190,139,219,100,231,215,188,96,196,233,25,31,141,136,56,220,176,96,123,111,116,52,167,241,25,118,228,113,49,254,111],[184,124,31,49,153,41,129,214,163,166,234,53,196,78,224,195,133,91,139,14,220,175,128,52,103,41,171,196,30,195,32,215],[100,96,94,41,181,81,205,124,104,196,81,19,214,132,37,5,40,223,78,103,190,31,55,94,136,39,40,13,22,169,21,138],[243,121,71,223,132,108,253,23,137,150,167,137,163,62,28,27,156,113,129,226,113,242,161,133,154,120,161,106,96,229,245,36],[11,90,190,44,235,127,204,205,131,19,9,228,129,90,46,40,80,99,11,129,92,26,140,99,210,27,198,6,42,216,135,26],[160,94,37,60,195,235,129,72,124,218,139,194,22,78,255,90,169,158,238,110,186,172,139,35,194,50,103,159,212,234,157,81],[121,33,106,213,183,21,152,13,6,245,59,167,181,27,65,84,8,190,106,192,146,241,1,55,113,155,172,126,182,55,10,142],[81,214,118,128,232,240,151,246,115,242,81,97,179,194,46,77,215,103,56,96,228,102,135,114,6,24,181,40,128,127,230,61],[110,155,247,54,144,156,127,96,113,126,31,245,61,142,26,254,233,131,225,246,85,172,244,147,85,71,163,245,140,192,55,197],[140,215,174,57,144,68,207,227,209,139,13,246,152,37,73,231,48,85,219,114,186,242,193,108,96,44,195,225,214,190,79,182],[167,239,110,7,43,189,204,255,118,154,200,15,52,146,186,19,126,115,136,132,255,187,100,109,26,80,176,163,77,163,115,109],[45,195,254,107,141,13,155,250,222,80,21,165,183,72,233,126,210,194,6,82,27,14,78,163,10,188,235,81,5,70,60,140],[30,248,129,220,49,146,252,54,11,69,104,94,249,225,44,111,202,14,144,1,20,91,128,63,241,190,88,221,98,119,214,210],[32,18,121,83,97,129,67,231,78,35,251,129,67,201,6,16,170,20,245,172,0,50,220,237,158,5,243,10,26,238,158,53],[171,161,67,129,24,98,161,163,135,208,13,166,66,109,80,118,64,218,36,191,102,124,130,186,16,71,41,245,250,175,31,186],[85,202,138,149,95,249,47,66,225,138,212,173,255,105,55,74,71,54,171,249,70,254,48,137,25,166,235,90,46,166,225,242],[193,67,220,71,230,162,40,193,144,150,70,17,75,125,107,56,155,132,38,125,95,85,144,17,29,32,3,134,238,183,178,157],[236,190,76,227,143,42,141,243,128,19,13,27,239,139,9,109,75,250,233,145,103,128,145,100,182,50,23,232,130,173,153,225],[204,16,148,213,1,54,72,131,26,225,205,123,196,124,166,160,131,237,113,208,128,254,62,183,68,169,113,126,88,91,50,28],[130,14,114,180,247,154,4,205,131,218,25,100,134,234,11,82,194,146,72,220,234,173,25,213,238,38,199,186,81,225,212,30],[133,133,210,10,255,162,24,76,162,242,26,222,116,108,169,195,204,111,169,121,153,41,216,13,79,107,70,76,69,127,223,238],[25,53,127,19,166,82,71,70,223,177,21,225,24,238,153,203,171,116,142,99,135,132,49,30,49,46,166,95,216,64,206,118],[198,172,126,188,190,64,7,141,142,181,39,1,48,128,209,234,34,84,76,163,103,225,121,140,128,195,222,56,123,221,34,200],[138,59,194,117,238,71,37,206,127,15,240,176,76,206,96,246,118,234,219,54,23,218,105,157,144,69,86,191,29,13,121,18],[192,96,247,181,90,1,76,155,209,9,84,38,210,51,141,163,27,142,180,175,104,252,194,54,156,168,106,159,105,101,159,218],[84,56,196,190,249,157,149,194,88,188,173,186,173,139,2,69,215,158,231,99,207,132,131,14,170,108,239,186,37,182,197,0],[0,247,202,158,112,181,17,19,165,148,152,177,217,198,130,133,247,76,241,177,71,63,131,210,236,129,251,139,134,31,50,37],[241,243,217,151,239,243,250,75,194,60,190,226,10,250,129,223,40,226,76,231,57,214,109,56,87,35,41,158,196,50,113,249],[134,255,153,155,72,167,152,43,200,231,248,167,205,9,158,40,120,51,104,146,26,33,0,104,204,37,124,165,191,107,55,157],[165,246,114,210,110,96,163,48,215,137,48,73,218,93,41,61,73,209,209,35,187,37,105,74,128,228,11,5,188,51,154,59],[224,178,163,252,56,21,246,41,177,203,131,223,6,142,138,126,139,112,20,161,28,250,93,237,196,91,52,89,4,77,194,13],[156,31,28,207,223,224,176,78,100,242,248,223,74,31,216,32,66,106,157,89,57,128,21,111,141,81,121,10,11,131,136,77],[158,249,248,113,36,27,198,27,75,47,177,83,12,177,123,200,137,243,114,175,209,233,79,30,79,41,65,143,200,165,65,162],[212,233,197,6,129,160,75,23,139,28,188,248,72,59,156,77,76,169,132,149,195,12,70,210,140,1,197,208,134,226,211,160],[155,191,103,178,100,145,185,220,192,35,93,207,215,147,123,113,12,143,157,202,1,251,85,53,230,124,158,118,63,224,216,36],[90,23,40,55,22,25,34,8,223,102,134,178,244,245,90,135,189,103,4,26,206,238,184,21,164,115,212,154,181,6,112,244],[99,44,54,21,132,100,225,72,124,220,26,110,76,22,178,165,199,5,189,82,153,130,228,99,115,244,238,248,236,116,173,22],[247,117,19,118,79,217,149,44,59,159,168,187,155,179,22,123,18,93,29,149,79,208,149,31,60,183,88,214,217,212,112,219],[120,12,113,5,169,104,29,87,92,4,0,44,210,194,186,22,182,112,216,31,249,26,34,71,96,40,50,155,164,26,11,47],[82,245,136,121,196,30,251,240,15,209,104,98,197,38,83,47,84,92,73,230,200,88,47,198,215,72,203,22,159,111,70,108],[131,187,120,64,166,56,55,40,59,187,21,200,122,52,76,123,106,25,209,237,78,247,207,80,166,134,71,2,149,181,62,111],[247,135,117,180,214,62,201,104,151,58,175,97,214,105,118,28,8,168,102,241,123,215,106,217,54,23,111,21,242,98,149,0],[26,152,68,68,163,118,251,66,89,16,207,185,52,66,205,19,155,35,79,42,40,128,68,26,176,204,207,61,183,66,205,143],[57,58,158,19,216,249,39,60,196,108,181,158,181,243,189,88,104,164,238,252,161,17,32,97,85,100,71,193,170,170,16,96],[24,205,222,90,62,100,125,84,152,187,221,239,84,138,51,189,166,100,28,199,77,15,150,246,164,172,119,131,205,98,146,96],[134,98,30,136,96,118,241,60,62,187,201,6,218,165,82,43,114,44,95,201,160,114,111,147,24,149,12,133,246,183,26,255],[199,32,179,75,198,34,92,44,227,10,47,245,64,246,234,58,63,108,129,175,56,27,50,2,180,2,49,251,169,41,8,182],[1,35,212,98,203,161,212,247,174,186,250,163,111,14,61,196,242,159,16,139,208,94,161,193,34,249,98,242,39,230,194,115],[63,135,20,75,36,29,109,173,88,210,55,44,115,48,204,47,158,0,153,114,211,101,167,121,181,219,70,105,240,113,211,147],[38,60,129,45,118,72,4,74,63,186,203,6,35,172,6,214,62,198,225,114,213,172,230,251,14,24,40,108,96,178,86,75],[67,170,153,239,2,136,28,37,224,184,52,34,124,210,47,11,5,214,66,163,221,34,40,192,209,160,90,197,24,133,184,239],[103,50,125,239,77,129,99,137,166,23,145,82,61,102,127,82,192,133,1,35,159,193,191,203,148,117,237,66,231,84,245,125],[71,209,163,29,74,86,190,73,140,195,76,52,49,236,103,166,191,27,210,70,204,245,122,1,242,13,235,160,54,76,101,167],[95,51,75,179,32,6,55,102,43,75,210,60,95,87,233,229,54,69,237,108,30,75,54,20,174,165,85,158,64,49,92,59],[82,10,248,154,17,214,9,100,254,36,84,133,84,131,134,182,143,26,169,80,246,245,192,154,41,164,241,253,15,203,58,244],[195,231,35,17,210,60,36,211,48,78,202,96,227,245,28,13,76,166,45,241,62,245,242,208,146,232,63,58,113,88,107,253],[144,23,168,39,192,25,141,6,112,129,89,201,85,167,136,159,118,96,134,248,57,232,107,164,183,60,88,173,202,69,63,126],[23,153,157,38,94,7,243,232,206,2,126,32,140,61,33,175,241,117,198,32,242,38,98,166,56,190,237,73,38,50,73,160],[224,141,135,208,194,143,191,44,12,248,92,86,83,116,202,2,43,88,97,12,22,7,251,161,181,190,217,111,61,5,201,163],[102,208,16,197,57,204,55,77,84,136,105,107,224,32,57,152,130,174,226,34,46,228,18,185,44,109,24,126,64,176,49,51],[106,137,205,61,204,32,110,139,95,131,97,185,196,89,38,135,86,131,88,206,170,202,0,233,135,16,27,236,231,252,60,94],[132,236,61,171,219,235,55,99,215,39,116,108,171,43,203,198,27,194,92,131,113,247,169,48,69,160,108,158,110,23,176,195],[22,169,30,202,147,197,151,7,105,29,184,54,230,90,71,243,234,247,254,117,189,190,211,165,118,155,242,201,32,182,143,175],[125,142,83,198,39,141,171,124,176,177,145,177,20,211,157,210,69,95,56,26,13,2,242,192,132,89,108,224,224,183,31,14],[189,14,49,136,210,4,10,71,73,166,40,132,235,64,249,127,198,21,230,149,67,125,8,131,79,137,138,102,16,100,77,245],[108,167,17,53,85,218,225,99,118,226,128,109,49,139,32,17,101,42,6,81,25,217,228,53,240,140,105,108,0,227,16,132],[44,107,114,122,5,195,10,248,37,216,13,226,183,98,5,92,8,155,253,15,240,67,100,172,164,171,111,190,184,69,28,97],[188,222,40,72,60,66,183,105,17,250,216,140,96,18,249,163,10,64,76,194,192,181,117,134,62,224,251,193,255,236,157,164],[168,89,50,205,137,97,130,187,226,73,0,203,241,84,174,41,167,130,165,55,131,80,205,253,194,149,124,110,12,56,97,229],[195,31,223,125,63,189,80,195,101,166,28,181,132,122,139,241,156,69,171,207,143,140,244,27,225,245,172,108,200,14,205,252],[52,207,175,155,188,172,147,95,124,31,23,188,3,118,249,31,48,118,133,21,9,92,100,50,235,37,166,224,40,203,96,107],[151,150,64,126,135,101,56,127,127,128,215,199,243,60,5,125,176,89,215,131,108,32,74,200,174,246,153,179,153,32,191,70],[16,93,51,99,222,210,180,113,137,183,83,205,129,127,152,252,45,97,4,11,197,197,161,24,2,67,156,227,95,37,217,188],[211,47,231,5,8,51,189,85,225,55,101,205,99,83,48,215,170,175,11,180,109,6,232,52,10,161,160,22,175,27,87,28],[146,2,154,154,197,35,93,177,114,160,210,80,167,191,17,215,11,1,130,89,51,168,213,107,170,232,138,25,104,174,8,63],[90,186,247,186,220,135,67,41,190,87,5,206,204,61,110,125,244,112,238,156,138,119,155,34,142,119,153,215,1,249,214,129],[55,71,94,155,121,65,197,204,107,205,196,72,119,212,180,38,255,130,203,179,105,253,27,236,109,102,191,210,45,165,80,245],[81,229,152,28,141,133,214,182,216,198,34,142,226,245,130,192,47,42,200,34,166,97,154,237,182,162,55,17,231,84,121,58],[89,146,31,94,138,41,212,123,146,68,6,17,138,98,13,0,193,206,124,5,167,63,8,198,53,20,73,149,144,255,57,134],[210,201,190,195,6,86,221,238,200,138,134,48,164,74,12,130,181,132,165,181,197,245,10,26,156,127,3,194,223,13,24,1],[235,237,134,71,30,1,224,99,114,192,166,47,63,155,78,109,51,241,201,123,253,86,185,247,182,23,59,214,195,47,12,184],[124,73,123,4,149,6,78,25,253,226,29,15,85,72,151,119,101,182,155,92,80,129,238,176,47,79,228,39,77,61,164,178],[158,20,207,161,103,65,200,114,238,51,165,221,156,221,254,57,157,6,151,176,9,68,165,87,181,178,119,122,35,148,98,117],[90,3,255,86,7,233,96,163,13,193,21,86,195,60,22,63,57,214,108,25,230,209,191,124,18,108,77,151,5,157,182,137],[103,173,25,93,163,236,64,146,202,53,34,171,243,101,144,186,156,82,208,191,127,231,201,27,138,187,227,210,123,88,53,186],[8,3,71,85,136,227,254,16,104,245,224,67,218,188,143,244,24,88,148,123,252,161,238,78,139,77,75,45,225,189,226,16],[22,24,4,170,113,123,182,226,191,101,200,8,67,84,89,191,153,163,234,142,21,144,13,130,42,191,39,96,196,206,206,54],[206,211,20,210,167,16,109,196,135,209,62,144,194,29,124,30,153,14,20,233,70,76,72,117,137,80,241,179,212,157,131,200],[131,214,226,188,73,64,102,205,233,238,243,120,233,100,49,186,193,114,168,99,38,152,135,233,91,140,12,188,206,218,89,40],[214,7,102,127,204,68,143,170,95,31,61,51,170,133,136,202,25,105,137,169,74,180,129,174,172,30,166,152,155,144,192,194],[18,229,116,216,188,59,80,215,188,128,135,175,32,231,195,116,235,87,183,57,118,160,24,87,37,172,161,233,115,247,71,70],[55,18,238,62,52,127,5,213,245,144,160,42,192,194,14,76,115,190,113,14,20,184,189,30,221,236,38,189,238,13,189,214],[232,132,36,188,167,165,235,143,70,172,105,122,240,70,134,201,249,195,130,217,160,206,245,4,139,219,60,10,112,213,27,244],[160,189,57,225,177,213,97,130,159,145,93,90,80,224,152,180,125,136,95,97,90,37,48,63,127,144,185,106,230,14,155,174],[37,30,10,5,91,127,67,10,226,205,36,235,238,36,143,21,167,191,19,223,11,87,66,18,211,59,226,73,30,135,182,125],[138,233,40,143,67,153,107,204,109,51,3,184,7,62,164,29,89,189,206,227,246,117,43,22,200,69,151,108,146,142,247,217],[164,65,224,199,187,221,56,241,122,45,25,219,102,5,63,58,221,146,236,34,247,226,118,210,89,194,200,193,140,150,194,161],[5,188,114,203,86,200,36,31,14,103,195,239,170,162,105,167,186,136,128,238,185,175,96,116,141,159,247,23,92,167,143,22],[75,197,95,243,106,110,244,236,171,27,32,2,143,196,190,48,135,136,211,27,177,78,239,150,136,149,236,224,209,201,120,124],[136,157,168,241,187,157,61,246,21,90,138,40,60,247,111,219,163,110,0,249,58,22,28,213,185,56,43,254,112,136,55,163],[212,11,33,204,127,159,225,110,62,119,49,160,96,164,29,207,85,228,113,126,24,18,146,33,61,187,212,51,19,190,90,26],[34,79,147,181,32,210,232,182,175,234,211,139,99,42,36,46,252,198,109,3,145,185,72,77,86,54,186,3,179,192,228,255],[66,116,34,75,56,0,245,228,4,19,178,66,72,60,18,173,172,97,152,140,166,232,65,245,2,100,216,251,210,200,176,189],[198,188,110,66,106,248,53,135,149,171,138,48,218,18,246,221,212,220,119,97,141,240,196,98,123,40,75,137,185,18,127,249],[46,247,114,101,19,7,213,247,101,198,183,142,22,193,145,190,78,182,140,156,23,78,67,118,41,218,173,61,228,96,78,205],[177,173,169,31,180,58,181,215,70,181,68,242,214,33,92,213,248,209,201,86,118,116,152,107,10,218,69,120,226,51,102,38],[189,195,16,2,95,11,30,94,141,165,179,28,46,160,189,149,31,221,192,77,43,73,136,35,30,161,140,115,240,74,221,103],[52,65,194,16,86,218,64,71,111,204,210,105,164,74,44,103,208,80,251,23,36,39,33,189,250,107,235,203,131,212,240,219],[165,247,183,250,223,119,131,7,70,140,252,98,154,105,128,10,72,24,31,159,30,56,112,6,215,194,153,201,0,177,48,91],[242,195,56,76,85,27,46,213,61,192,56,21,120,98,39,204,255,149,199,242,175,188,189,109,20,254,118,4,115,31,57,255],[4,165,122,212,93,64,32,229,131,62,201,244,114,240,194,91,232,179,83,59,234,123,31,31,250,49,43,238,57,67,90,48],[193,190,114,165,234,254,245,117,243,107,63,181,200,68,235,163,77,3,254,108,43,218,118,0,92,70,79,45,42,216,204,172],[130,51,62,105,93,137,20,92,190,61,153,199,255,148,4,49,45,177,151,161,197,177,55,171,241,147,235,157,62,126,107,164],[161,168,62,134,157,88,2,150,82,210,254,159,123,30,198,153,115,76,2,28,48,15,122,208,53,208,93,178,189,179,153,64],[206,115,225,115,148,86,194,246,164,248,11,229,71,102,117,93,98,189,172,176,110,64,140,165,220,14,45,102,167,251,169,202],[113,163,81,49,248,164,12,152,213,102,50,241,154,118,192,55,81,171,181,184,119,154,64,124,61,114,94,250,163,42,45,199],[179,88,131,163,5,193,16,253,242,156,65,190,54,9,243,169,163,108,116,61,118,203,76,117,75,2,254,243,125,38,223,243],[220,152,26,14,209,219,53,16,204,60,245,74,222,232,80,24,52,158,36,26,105,29,44,231,139,137,126,198,26,174,108,155],[136,217,193,211,117,135,118,113,158,34,127,61,190,204,232,19,99,173,28,143,0,3,133,24,245,64,205,159,148,189,6,205],[145,218,0,118,42,42,40,166,23,141,7,31,201,131,210,252,183,134,61,75,161,48,150,230,109,43,210,68,9,78,228,102],[61,133,171,203,197,131,147,229,200,242,26,184,54,168,51,137,235,52,117,133,42,116,32,116,23,218,133,75,139,182,104,84],[123,228,131,98,91,169,169,159,70,110,26,176,97,255,193,202,35,3,254,17,162,255,167,10,129,96,2,141,170,157,172,215],[17,185,140,27,28,62,75,163,111,40,124,17,237,54,26,73,71,126,206,79,98,140,114,231,5,133,78,26,107,43,254,32],[247,185,156,160,13,213,213,154,102,37,249,27,153,161,205,118,226,86,111,180,226,55,117,122,204,131,106,133,117,58,112,130],[205,171,25,113,56,197,48,210,91,97,73,175,239,18,45,137,109,106,235,255,37,99,250,94,102,152,92,73,189,54,13,45],[225,47,5,118,2,252,53,139,77,130,119,149,128,115,67,59,79,231,153,181,132,161,71,31,158,105,27,133,163,227,114,216],[161,147,21,172,35,183,9,92,134,32,173,38,46,121,135,63,16,205,32,98,110,64,13,6,134,145,68,206,182,83,167,79],[134,165,178,61,187,66,243,134,153,115,240,69,42,209,49,137,23,2,114,32,65,59,144,212,12,4,195,176,17,156,174,77],[76,243,64,14,123,96,93,217,100,37,89,91,168,146,23,206,28,224,154,213,10,109,79,234,236,217,174,122,159,103,118,57],[56,38,61,168,239,122,99,162,153,100,31,228,67,102,10,1,62,229,168,35,93,112,71,105,223,128,98,100,173,146,23,222],[238,174,122,119,226,137,145,54,181,121,61,132,180,154,160,31,199,25,23,3,22,10,148,86,155,12,171,243,246,8,221,28],[109,12,102,247,33,25,191,127,44,226,204,125,147,31,154,129,247,209,245,97,45,72,206,97,21,218,19,24,151,14,70,75],[31,10,99,118,72,244,38,220,80,111,144,3,138,124,89,101,193,114,174,199,33,107,117,118,213,131,187,108,32,209,234,72],[79,222,228,153,128,214,171,57,219,101,23,6,51,228,149,243,178,66,77,34,76,67,139,65,122,2,188,129,134,72,146,122],[230,147,29,220,53,215,63,202,153,201,43,146,26,186,196,194,137,151,147,241,12,234,65,175,237,128,210,92,183,208,12,4],[29,240,65,43,89,196,96,183,151,203,158,66,175,45,26,32,96,66,253,133,58,201,20,47,135,222,44,239,126,214,182,77],[20,248,27,48,152,115,68,112,46,62,160,208,97,152,115,139,254,22,52,144,87,197,41,179,10,108,206,225,205,194,215,15],[234,133,142,36,32,114,107,13,144,195,243,187,58,101,89,162,223,83,224,29,117,189,1,172,157,153,138,69,110,160,114,151],[160,77,14,221,229,112,175,207,66,160,242,88,11,235,205,30,167,207,16,12,158,171,174,23,53,118,96,44,148,240,212,236],[232,9,162,192,127,84,244,11,81,63,152,79,143,186,203,148,254,216,32,219,47,98,136,70,142,189,243,7,212,121,238,60],[217,67,87,190,201,152,46,118,204,7,236,103,185,174,107,122,99,146,95,74,8,108,35,113,147,163,100,194,22,213,5,233],[235,77,27,40,7,120,73,228,187,59,62,149,168,198,83,199,212,119,110,117,196,190,230,149,24,43,68,243,165,53,240,182]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length==2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[178,160,62,69,12,161,4,198,234,181,57,183,120,216,221,3,125,155,129,69,67,102,40,173,161,151,23,62,138,153,189,68],[217,180,23,177,18,187,202,33,127,72,43,44,81,217,231,250,64,107,253,54,236,85,126,88,40,4,145,71,147,20,255,194]],{from: accounts[0]});
  });
  it('Should execute test_computeMerkleTree(bytes32[]) WHEN _data.length!=2', async () => {
    let result = await contractProxyMerkleShip.test_computeMerkleTree([[242,142,105,109,210,119,84,228,47,37,152,101,218,139,73,81,34,95,91,185,135,206,90,172,110,235,2,231,252,155,218,49],[90,196,182,255,105,230,98,31,124,192,226,24,53,61,50,143,209,108,253,62,126,146,222,146,15,48,221,143,224,72,52,71],[115,179,24,201,67,233,181,234,19,202,77,123,8,121,242,160,62,31,204,4,97,179,162,169,156,65,246,40,12,210,141,91],[221,70,4,211,25,163,123,2,156,182,245,197,198,92,254,66,159,202,204,206,149,27,141,147,145,229,216,170,165,158,203,227],[136,67,113,187,163,163,122,33,150,223,119,80,121,156,5,222,126,119,73,123,219,170,127,72,9,61,181,206,238,16,195,45],[236,96,230,211,17,148,230,106,7,169,121,185,3,12,180,60,42,39,116,108,25,235,143,164,79,174,184,116,30,62,60,130],[72,166,221,112,60,142,101,125,199,232,252,113,111,5,102,216,253,165,178,103,245,97,54,180,22,116,163,213,124,212,75,17],[223,207,47,94,236,221,39,228,187,173,199,23,90,13,168,13,84,216,61,248,42,110,186,152,233,126,92,143,180,93,100,57],[196,74,183,243,68,70,192,97,111,109,136,89,231,206,167,32,114,99,107,71,204,30,169,80,95,132,180,223,251,156,50,152],[71,121,38,105,53,135,227,206,71,104,169,108,205,29,238,41,109,109,171,99,246,0,69,13,77,143,247,197,210,237,115,26],[217,196,124,238,224,173,188,93,97,224,73,40,20,61,25,118,34,194,185,171,154,133,87,92,223,47,47,70,87,74,167,31],[122,176,250,17,254,197,226,44,102,139,189,168,84,81,97,212,156,178,246,136,116,249,9,30,248,173,16,34,242,237,146,173],[38,153,94,51,244,131,254,228,92,80,232,149,189,190,243,233,24,57,232,141,188,102,233,255,225,230,94,73,200,84,58,198],[23,131,210,153,187,52,176,55,41,169,34,167,38,57,125,7,171,221,190,211,115,222,193,19,47,193,99,95,214,130,192,226],[155,46,167,17,234,62,167,89,245,3,195,245,119,222,67,205,135,95,203,47,78,72,112,83,171,184,111,171,207,0,246,236],[176,85,117,61,242,134,226,165,15,64,163,71,200,40,163,29,102,90,132,69,144,39,39,76,157,106,209,49,134,213,175,117],[25,40,6,229,7,230,201,49,70,157,89,74,44,82,242,226,48,23,115,56,65,178,206,96,13,170,224,35,213,25,119,99],[41,234,5,91,222,209,214,19,173,71,230,109,33,97,34,36,184,70,55,138,74,57,93,97,40,208,171,39,46,49,75,18],[22,157,1,4,178,246,14,5,151,220,5,222,226,148,211,81,248,68,30,41,36,169,40,192,30,13,191,211,113,229,191,218],[136,117,40,69,139,66,181,190,241,126,16,162,44,131,217,250,168,159,137,30,90,101,96,203,38,119,9,122,136,15,2,26],[75,139,39,220,195,84,27,0,172,84,141,167,223,71,83,176,172,6,42,220,247,42,127,70,89,219,190,182,90,20,169,186],[8,5,19,142,186,18,120,104,132,249,69,166,247,208,147,91,9,73,22,131,182,46,69,238,186,196,113,76,9,177,47,7],[60,149,213,41,185,4,13,243,171,58,61,138,6,144,102,58,137,29,150,232,141,210,142,32,96,237,22,159,182,181,195,25],[13,112,158,32,145,97,117,130,169,136,56,163,66,109,207,29,69,110,30,64,48,124,127,75,79,2,193,156,8,81,92,224],[171,191,190,241,52,33,246,228,182,70,187,129,40,98,6,93,74,137,239,96,175,149,123,204,42,163,103,129,172,129,98,138],[168,38,174,241,71,81,217,200,153,155,76,37,45,196,3,236,235,192,100,44,218,36,5,207,74,210,48,146,242,179,110,0],[122,153,23,8,30,249,242,111,144,169,15,218,88,213,248,8,164,138,220,244,2,112,163,255,7,23,78,116,111,243,211,184],[22,72,199,172,58,21,25,146,186,86,57,111,231,178,74,223,20,37,3,106,170,202,185,27,219,171,48,132,182,14,164,44],[240,143,39,207,5,217,31,65,76,129,201,253,212,238,51,100,107,59,0,163,241,192,134,174,76,157,198,233,166,3,45,101],[81,195,65,185,230,90,120,165,156,39,16,205,209,254,31,176,70,135,230,5,24,126,30,163,76,35,166,169,148,247,24,82],[233,148,87,206,236,49,190,197,211,18,138,157,184,214,79,22,121,100,217,239,209,249,191,72,204,253,192,136,131,159,100,52],[134,142,215,26,137,104,219,161,153,82,172,234,133,57,115,139,194,131,3,111,75,66,124,100,47,62,223,212,184,120,217,215],[173,38,243,188,191,37,2,44,232,144,109,148,10,140,1,195,198,203,161,45,167,19,83,231,65,184,205,120,45,79,203,109],[127,5,231,41,123,13,245,145,244,95,163,174,206,65,242,96,25,246,4,192,0,54,57,88,7,130,167,90,150,150,238,193],[53,147,106,168,113,139,112,92,58,32,142,77,5,102,115,206,173,76,39,136,163,249,120,168,52,197,191,47,245,113,150,58],[195,239,21,67,213,125,43,122,214,28,1,252,209,84,2,66,97,25,170,203,50,199,41,86,47,117,105,57,82,155,120,40],[106,148,24,63,78,220,189,165,94,250,52,202,49,60,141,46,28,74,18,124,105,57,177,24,188,168,144,51,122,108,239,28],[21,80,226,8,244,255,30,203,46,161,5,132,196,114,242,64,197,157,29,77,105,69,194,24,96,118,235,73,83,155,183,182],[103,210,197,51,9,92,81,26,8,205,227,89,59,146,5,96,6,100,57,26,170,20,160,30,121,129,120,69,87,87,86,246],[235,137,66,205,107,54,138,219,142,58,32,36,181,1,99,99,227,152,83,223,147,139,250,15,62,214,185,238,12,3,151,5],[136,129,34,90,24,89,184,200,181,19,191,29,194,179,243,117,59,75,27,99,174,97,246,13,43,54,205,161,144,23,245,91]],{from: accounts[0]});
  });
  it('Should execute test_verifyMerkleProof(bytes32[6],bytes32,string)', async () => {
    let result = await contractProxyMerkleShip.test_verifyMerkleProof([[17,18,112,76,167,187,169,255,174,91,213,34,70,210,174,64,80,189,216,39,246,216,42,30,6,249,25,175,44,103,215,204],[89,35,182,54,129,28,150,109,203,215,190,19,53,43,74,133,137,166,192,125,59,62,27,154,89,135,41,159,63,70,171,76],[111,203,121,197,229,87,75,97,229,152,228,24,45,200,155,216,140,220,71,245,145,203,163,100,50,247,191,64,78,57,35,207],[236,71,55,84,104,25,166,162,172,199,217,51,198,253,25,222,225,130,171,249,81,51,82,180,113,140,116,233,112,212,30,239],[81,58,23,50,99,154,142,190,171,138,169,191,184,48,201,26,241,27,190,213,209,77,43,105,17,133,148,92,252,157,21,24],[194,139,165,63,71,40,106,7,214,197,225,224,170,255,212,240,36,134,147,144,250,61,173,246,135,19,153,39,123,194,80,212]], [99,98,63,84,177,67,157,205,138,161,25,122,20,215,156,81,180,147,200,181,208,254,201,174,35,249,234,129,183,76,50,124], "6i3avn",{from: accounts[0]});
  });
  it('Should execute test_isCoordinateValid(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_isCoordinateValid(63, 9,{from: accounts[0]});
  });
  it('Should execute test_coordinateToIndex(uint8,uint8)', async () => {
    let result = await contractProxyMerkleShip.test_coordinateToIndex(3, 8,{from: accounts[0]});
  });
  it('Should execute test_subString(string,uint256)', async () => {
    let result = await contractProxyMerkleShip.test_subString("game resolved in an emergency", 179,{from: accounts[0]});
  });
  it('Should execute test_isStringValid(string)', async () => {
    let result = await contractProxyMerkleShip.test_isStringValid("csjt1",{from: accounts[0]});
  });
});