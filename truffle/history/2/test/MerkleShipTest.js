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
    let result = await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(101, [212,39,184,99,38,36,12,209,144,161,238,142,93,31,49,106,139,28,152,120,186,13,85,3,91,234,254,35,204,234,212,59],{from: accounts[0],value:101});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(101, [212,39,184,99,38,36,12,209,144,161,238,142,93,31,49,106,139,28,152,120,186,13,85,3,91,234,254,35,204,234,212,59],{from: accounts[0],value:101}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(102, [212,39,184,99,38,36,12,209,144,161,238,142,93,31,49,106,139,28,152,120,186,13,85,3,91,234,254,35,204,234,212,59],{from: accounts[0],value:101}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(48, [21,40,36,135,205,216,68,48,9,167,255,253,108,118,215,143,189,107,142,33,143,60,184,132,233,85,115,60,3,86,244,69],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("uo11me",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(48, [21,40,36,135,205,216,68,48,9,167,255,253,108,118,215,143,189,107,142,33,143,60,184,132,233,85,115,60,3,86,244,69],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(39,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("7428lb",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(39,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(99, [0,3], [[58,184,25,203,175,179,55,36,139,9,23,11,163,132,104,180,1,229,123,189,197,28,81,31,37,195,59,145,239,53,37,245],[183,144,20,107,32,37,186,240,30,121,151,129,151,187,168,62,196,53,39,218,242,99,186,139,111,89,201,188,135,219,1,89],[211,158,210,203,244,201,60,155,125,239,89,209,25,84,242,184,76,43,204,99,171,134,191,121,183,38,67,31,214,214,169,121],[4,173,212,107,38,181,206,30,82,222,128,22,145,41,161,171,182,155,128,32,50,35,87,180,71,181,31,117,134,115,155,189],[222,82,52,90,255,142,94,201,214,249,157,146,177,48,28,105,176,215,78,87,55,217,39,1,194,249,185,59,74,173,160,10],[187,2,101,118,223,15,183,79,159,147,110,50,162,174,48,180,224,156,19,88,104,193,240,1,137,173,213,51,40,7,209,24]], "uo11me", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(99, [0,3], [[58,184,25,203,175,179,55,36,139,9,23,11,163,132,104,180,1,229,123,189,197,28,81,31,37,195,59,145,239,53,37,245],[183,144,20,107,32,37,186,240,30,121,151,129,151,187,168,62,196,53,39,218,242,99,186,139,111,89,201,188,135,219,1,89],[211,158,210,203,244,201,60,155,125,239,89,209,25,84,242,184,76,43,204,99,171,134,191,121,183,38,67,31,214,214,169,121],[4,173,212,107,38,181,206,30,82,222,128,22,145,41,161,171,182,155,128,32,50,35,87,180,71,181,31,117,134,115,155,189],[222,82,52,90,255,142,94,201,214,249,157,146,177,48,28,105,176,215,78,87,55,217,39,1,194,249,185,59,74,173,160,10],[187,2,101,118,223,15,183,79,159,147,110,50,162,174,48,180,224,156,19,88,104,193,240,1,137,173,213,51,40,7,209,24]], "uo11me", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(101,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("uo11me",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(101,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(2,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(2,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(179,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("uo11me",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(179,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(181, ["victory by abandonment","aj99nx","7428lb","7428lb","victory by abandonment","7428lb","game resolved in an emergency","en3vmji","victory by unanswered challenge","t0vr9","uo11me","game resolved in an emergency","en3vmji","38apo","aj99nx","victory by unchallenged hit count","7428lb","verified victory by hit count","en3vmji","en3vmji","victory by abandonment","7428lb","victory by unanswered challenge","7428lb","38apo","en3vmji","victory by unanswered challenge","victory by unanswered challenge","jaw6ni","uo11me","victory by unanswered challenge","38apo","aj99nx","aj99nx","en3vmji","en3vmji","victory by unchallenged hit count","38apo","verified victory by hit count","aj99nx","game resolved in an emergency","en3vmji","victory by unanswered challenge","en3vmji","38apo","victory by unchallenged hit count","verified victory by hit count","o5sj2p","7428lb","o5sj2p","game resolved in an emergency","jaw6ni","verified victory by hit count","verified victory by hit count","uo11me","victory by unanswered challenge","en3vmji","yghocc","jaw6ni","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","yghocc","victory by unchallenged hit count"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(181, ["victory by abandonment","aj99nx","7428lb","7428lb","victory by abandonment","7428lb","game resolved in an emergency","en3vmji","victory by unanswered challenge","t0vr9","uo11me","game resolved in an emergency","en3vmji","38apo","aj99nx","victory by unchallenged hit count","7428lb","verified victory by hit count","en3vmji","en3vmji","victory by abandonment","7428lb","victory by unanswered challenge","7428lb","38apo","en3vmji","victory by unanswered challenge","victory by unanswered challenge","jaw6ni","uo11me","victory by unanswered challenge","38apo","aj99nx","aj99nx","en3vmji","en3vmji","victory by unchallenged hit count","38apo","verified victory by hit count","aj99nx","game resolved in an emergency","en3vmji","victory by unanswered challenge","en3vmji","38apo","victory by unchallenged hit count","verified victory by hit count","o5sj2p","7428lb","o5sj2p","game resolved in an emergency","jaw6ni","verified victory by hit count","verified victory by hit count","uo11me","victory by unanswered challenge","en3vmji","yghocc","jaw6ni","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","yghocc","victory by unchallenged hit count"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("t0vr9",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(1,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("7428lb",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(1,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(65,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(65,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
