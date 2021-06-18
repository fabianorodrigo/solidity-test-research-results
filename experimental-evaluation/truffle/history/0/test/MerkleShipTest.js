const truffleAssert = require('truffle-assertions');
const MerkleShip = artifacts.require("MerkleShip");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("MerkleShip",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractMerkleShip = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MerkleShip.link("SafeMath",contractSafeMath.address);
    contractMerkleShip = await MerkleShip.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MerkleShip.new({from:accounts[0]}');
  });
  
  it('Should execute emergencyStop(string) WHEN msg.sender==admin,isStopped==false', async () => {
    let result = await contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(101, [67,65,104,207,247,37,28,209,248,59,170,82,209,43,5,172,113,204,184,139,122,200,58,77,164,162,113,248,96,82,158,31],{from: accounts[0],value:101});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(101, [67,65,104,207,247,37,28,209,248,59,170,82,209,43,5,172,113,204,184,139,122,200,58,77,164,162,113,248,96,82,158,31],{from: accounts[0],value:101}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(102, [67,65,104,207,247,37,28,209,248,59,170,82,209,43,5,172,113,204,184,139,122,200,58,77,164,162,113,248,96,82,158,31],{from: accounts[0],value:101}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(100, [112,9,41,182,252,19,255,93,106,153,107,220,60,57,4,130,136,237,9,155,71,68,51,213,241,204,239,207,110,53,7,4],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(100, [112,9,41,182,252,19,255,93,106,153,107,220,60,57,4,130,136,237,9,155,71,68,51,213,241,204,239,207,110,53,7,4],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(63,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("a7suu",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(40, [2,39], [[220,67,20,155,16,198,110,4,193,202,32,248,27,120,251,109,91,142,59,241,19,75,42,85,45,172,11,241,169,105,167,98],[70,148,239,22,180,234,107,179,94,79,21,0,4,2,222,230,158,250,119,199,182,111,239,27,77,142,136,65,77,194,206,235],[43,77,151,8,214,115,38,29,59,79,136,132,182,149,75,141,181,65,253,33,9,136,132,110,127,169,41,30,74,39,45,215],[153,157,225,0,25,92,148,181,130,65,174,127,86,156,155,35,143,101,98,19,141,153,224,5,246,97,201,131,228,183,134,118],[45,40,33,65,194,99,56,185,33,229,93,3,148,24,26,116,197,129,72,214,49,114,22,134,137,69,167,128,86,155,89,218],[212,118,133,75,83,144,238,188,139,217,51,144,30,130,44,220,213,129,152,185,187,153,151,58,70,23,203,98,72,31,217,73]], "verified victory by hit count", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(40, [2,39], [[220,67,20,155,16,198,110,4,193,202,32,248,27,120,251,109,91,142,59,241,19,75,42,85,45,172,11,241,169,105,167,98],[70,148,239,22,180,234,107,179,94,79,21,0,4,2,222,230,158,250,119,199,182,111,239,27,77,142,136,65,77,194,206,235],[43,77,151,8,214,115,38,29,59,79,136,132,182,149,75,141,181,65,253,33,9,136,132,110,127,169,41,30,74,39,45,215],[153,157,225,0,25,92,148,181,130,65,174,127,86,156,155,35,143,101,98,19,141,153,224,5,246,97,201,131,228,183,134,118],[45,40,33,65,194,99,56,185,33,229,93,3,148,24,26,116,197,129,72,214,49,114,22,134,137,69,167,128,86,155,89,218],[212,118,133,75,83,144,238,188,139,217,51,144,30,130,44,220,213,129,152,185,187,153,151,58,70,23,203,98,72,31,217,73]], "verified victory by hit count", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(101,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(101,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(47,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(47,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(47,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(0, ["verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","victory by concession","verified victory by hit count","a7suu","victory by unchallenged hit count","victory by unanswered challenge","verified victory by hit count","victory by abandonment","a7suu","8lhuvh","5skopr","victory by concession","victory by abandonment","oophaf","victory by abandonment","verified victory by hit count","a7suu","victory by concession","game resolved in an emergency","5skopr","victory by concession","verified victory by hit count","victory by unanswered challenge","victory by unchallenged hit count","8lhuvh","a7suu","5skopr","8lhuvh","victory by unanswered challenge","victory by unchallenged hit count","5skopr","game resolved in an emergency","5skopr","victory by unanswered challenge","verified victory by hit count","game resolved in an emergency","victory by unanswered challenge","a7suu","victory by concession","victory by unchallenged hit count","victory by abandonment","a7suu","victory by unanswered challenge","verified victory by hit count","oophaf","victory by unanswered challenge","a7suu","a7suu","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by concession","8lhuvh","verified victory by hit count","victory by unanswered challenge","oophaf","victory by concession","a7suu","a7suu","5skopr","oophaf","game resolved in an emergency"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(0, ["verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","victory by concession","verified victory by hit count","a7suu","victory by unchallenged hit count","victory by unanswered challenge","verified victory by hit count","victory by abandonment","a7suu","8lhuvh","5skopr","victory by concession","victory by abandonment","oophaf","victory by abandonment","verified victory by hit count","a7suu","victory by concession","game resolved in an emergency","5skopr","victory by concession","verified victory by hit count","victory by unanswered challenge","victory by unchallenged hit count","8lhuvh","a7suu","5skopr","8lhuvh","victory by unanswered challenge","victory by unchallenged hit count","5skopr","game resolved in an emergency","5skopr","victory by unanswered challenge","verified victory by hit count","game resolved in an emergency","victory by unanswered challenge","a7suu","victory by concession","victory by unchallenged hit count","victory by abandonment","a7suu","victory by unanswered challenge","verified victory by hit count","oophaf","victory by unanswered challenge","a7suu","a7suu","verified victory by hit count","game resolved in an emergency","game resolved in an emergency","victory by concession","8lhuvh","verified victory by hit count","victory by unanswered challenge","oophaf","victory by concession","a7suu","a7suu","5skopr","oophaf","game resolved in an emergency"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("5skopr",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("oophaf",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("5skopr",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(1,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(1,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
