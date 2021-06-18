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
    let result = await contractMerkleShip.emergencyStop("victory by concession",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by concession",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(1, [28,223,76,31,162,178,199,142,88,225,150,97,174,224,137,145,243,45,83,145,12,245,236,37,15,4,79,17,56,26,38,66],{from: accounts[0],value:1});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(1, [28,223,76,31,162,178,199,142,88,225,150,97,174,224,137,145,243,45,83,145,12,245,236,37,15,4,79,17,56,26,38,66],{from: accounts[0],value:1}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(2, [28,223,76,31,162,178,199,142,88,225,150,97,174,224,137,145,243,45,83,145,12,245,236,37,15,4,79,17,56,26,38,66],{from: accounts[0],value:1}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(7, [28,76,152,6,91,78,99,230,116,246,32,196,54,205,118,101,183,140,96,15,174,167,41,53,70,123,29,103,245,212,222,221],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(7, [28,76,152,6,91,78,99,230,116,246,32,196,54,205,118,101,183,140,96,15,174,167,41,53,70,123,29,103,245,212,222,221],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(7,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(11, [41,13], [[219,123,111,41,5,201,47,48,122,5,218,211,39,144,54,39,98,133,69,24,82,211,124,191,40,151,114,173,247,255,161,86],[179,231,249,244,206,45,65,87,68,36,223,186,184,83,180,205,32,138,239,27,21,142,75,71,132,24,29,175,161,213,244,83],[44,200,239,54,28,23,209,162,237,247,147,112,29,149,40,116,26,13,247,33,5,12,136,109,15,223,113,246,231,8,128,67],[33,163,173,164,199,43,173,74,147,213,136,34,22,123,193,14,59,106,83,216,108,218,254,23,208,141,232,97,217,159,85,239],[90,200,215,134,85,220,127,167,115,71,224,237,125,96,18,224,34,148,142,3,107,215,109,187,210,222,246,58,198,16,71,48],[207,96,168,163,186,63,253,124,178,8,2,96,89,117,25,164,250,231,176,27,174,217,23,98,203,55,190,25,5,97,160,139]], "victory by unanswered challenge", "z0a4s",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(11, [41,13], [[219,123,111,41,5,201,47,48,122,5,218,211,39,144,54,39,98,133,69,24,82,211,124,191,40,151,114,173,247,255,161,86],[179,231,249,244,206,45,65,87,68,36,223,186,184,83,180,205,32,138,239,27,21,142,75,71,132,24,29,175,161,213,244,83],[44,200,239,54,28,23,209,162,237,247,147,112,29,149,40,116,26,13,247,33,5,12,136,109,15,223,113,246,231,8,128,67],[33,163,173,164,199,43,173,74,147,213,136,34,22,123,193,14,59,106,83,216,108,218,254,23,208,141,232,97,217,159,85,239],[90,200,215,134,85,220,127,167,115,71,224,237,125,96,18,224,34,148,142,3,107,215,109,187,210,222,246,58,198,16,71,48],[207,96,168,163,186,63,253,124,178,8,2,96,89,117,25,164,250,231,176,27,174,217,23,98,203,55,190,25,5,97,160,139]], "victory by unanswered challenge", "z0a4s",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(181,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(181,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(99,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("6j9nw3",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(99,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(0,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("6j9nw3",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(0,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(0, ["victory by unchallenged hit count","victory by concession","victory by unchallenged hit count","victory by concession","6j9nw3","victory by concession","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","victory by abandonment","verified victory by hit count","verified victory by hit count","6j9nw3","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","enf60y","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by unchallenged hit count","victory by concession","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by abandonment","6j9nw3","zuwew","victory by concession","z0a4s","enf60y","game resolved in an emergency","6j9nw3","victory by unchallenged hit count","victory by abandonment","victory by concession","victory by unchallenged hit count","game resolved in an emergency","9vglj","enf60y","z0a4s","6j9nw3","6j9nw3","6j9nw3","victory by unchallenged hit count","260yr","victory by abandonment","enf60y","z0a4s","9vglj","6j9nw3","6j9nw3","z0a4s","verified victory by hit count","verified victory by hit count","game resolved in an emergency","z0a4s","victory by concession","z0a4s","9vglj","victory by concession","9vglj","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("6j9nw3",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(0, ["victory by unchallenged hit count","victory by concession","victory by unchallenged hit count","victory by concession","6j9nw3","victory by concession","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","victory by abandonment","verified victory by hit count","verified victory by hit count","6j9nw3","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","enf60y","victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by unchallenged hit count","victory by concession","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by abandonment","6j9nw3","zuwew","victory by concession","z0a4s","enf60y","game resolved in an emergency","6j9nw3","victory by unchallenged hit count","victory by abandonment","victory by concession","victory by unchallenged hit count","game resolved in an emergency","9vglj","enf60y","z0a4s","6j9nw3","6j9nw3","6j9nw3","victory by unchallenged hit count","260yr","victory by abandonment","enf60y","z0a4s","9vglj","6j9nw3","6j9nw3","z0a4s","verified victory by hit count","verified victory by hit count","game resolved in an emergency","z0a4s","victory by concession","z0a4s","9vglj","victory by concession","9vglj","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("260yr",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(49,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("z0a4s",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(49,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("zuwew",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(13,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(13,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
