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
    let result = await contractMerkleShip.proposeGame(39, [4,142,153,58,172,184,242,137,26,179,92,162,177,215,69,194,255,13,62,88,171,12,68,156,160,241,99,213,90,98,198,45],{from: accounts[0],value:39});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(39, [4,142,153,58,172,184,242,137,26,179,92,162,177,215,69,194,255,13,62,88,171,12,68,156,160,241,99,213,90,98,198,45],{from: accounts[0],value:39}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(40, [4,142,153,58,172,184,242,137,26,179,92,162,177,215,69,194,255,13,62,88,171,12,68,156,160,241,99,213,90,98,198,45],{from: accounts[0],value:39}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(9, [111,202,233,31,255,58,207,250,39,113,69,117,235,167,135,239,40,23,143,11,76,49,33,196,166,199,172,174,217,89,17,162],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(9, [111,202,233,31,255,58,207,250,39,113,69,117,235,167,135,239,40,23,143,11,76,49,33,196,166,199,172,174,217,89,17,162],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(1,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(1,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(39, [4,47], [[117,191,138,37,187,48,139,156,229,176,180,89,45,178,35,165,144,5,185,139,155,94,44,137,222,196,121,159,61,184,108,5],[116,205,36,193,56,42,177,34,187,89,196,9,41,115,32,120,23,50,22,2,57,165,140,238,102,164,239,155,66,37,195,141],[9,46,235,143,167,8,102,81,137,85,161,106,30,6,108,233,1,147,97,65,80,248,243,11,241,151,126,240,105,31,193,22],[255,223,36,95,115,180,20,195,94,207,222,175,86,28,50,202,194,2,188,231,141,195,161,191,7,63,202,42,238,82,219,180],[136,39,61,120,243,189,68,69,147,76,193,201,93,249,193,116,161,18,187,242,98,170,114,14,212,166,148,224,217,29,112,179],[123,209,156,58,233,73,142,213,167,41,174,165,122,124,112,214,76,147,119,100,0,37,173,172,26,37,154,249,137,4,138,151]], "victory by unchallenged hit count", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(39, [4,47], [[117,191,138,37,187,48,139,156,229,176,180,89,45,178,35,165,144,5,185,139,155,94,44,137,222,196,121,159,61,184,108,5],[116,205,36,193,56,42,177,34,187,89,196,9,41,115,32,120,23,50,22,2,57,165,140,238,102,164,239,155,66,37,195,141],[9,46,235,143,167,8,102,81,137,85,161,106,30,6,108,233,1,147,97,65,80,248,243,11,241,151,126,240,105,31,193,22],[255,223,36,95,115,180,20,195,94,207,222,175,86,28,50,202,194,2,188,231,141,195,161,191,7,63,202,42,238,82,219,180],[136,39,61,120,243,189,68,69,147,76,193,201,93,249,193,116,161,18,187,242,98,170,114,14,212,166,148,224,217,29,112,179],[123,209,156,58,233,73,142,213,167,41,174,165,122,124,112,214,76,147,119,100,0,37,173,172,26,37,154,249,137,4,138,151]], "victory by unchallenged hit count", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(0,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(0,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(7,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(8,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(8,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(2, ["verified victory by hit count","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","nn6n8g","victory by abandonment","victory by unanswered challenge","verified victory by hit count","verified victory by hit count","victory by concession","victory by concession","victory by concession","victory by unchallenged hit count","victory by abandonment","nn6n8g","verified victory by hit count","game resolved in an emergency","w57tn","verified victory by hit count","victory by concession","victory by unanswered challenge","verified victory by hit count","w57tn","game resolved in an emergency","w57tn","lrfk99","nn6n8g","victory by abandonment","w57tn","nn6n8g","nn6n8g","w57tn","w57tn","nn6n8g","95iyi","w57tn","victory by concession","verified victory by hit count","victory by abandonment","victory by abandonment","lrfk99","verified victory by hit count","victory by abandonment","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","verified victory by hit count","victory by abandonment","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","95iyi","victory by abandonment","victory by unchallenged hit count","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","victory by unchallenged hit count","46d9dq","victory by concession","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("lrfk99",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(2, ["verified victory by hit count","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","nn6n8g","victory by abandonment","victory by unanswered challenge","verified victory by hit count","verified victory by hit count","victory by concession","victory by concession","victory by concession","victory by unchallenged hit count","victory by abandonment","nn6n8g","verified victory by hit count","game resolved in an emergency","w57tn","verified victory by hit count","victory by concession","victory by unanswered challenge","verified victory by hit count","w57tn","game resolved in an emergency","w57tn","lrfk99","nn6n8g","victory by abandonment","w57tn","nn6n8g","nn6n8g","w57tn","w57tn","nn6n8g","95iyi","w57tn","victory by concession","verified victory by hit count","victory by abandonment","victory by abandonment","lrfk99","verified victory by hit count","victory by abandonment","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","verified victory by hit count","victory by abandonment","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","95iyi","victory by abandonment","victory by unchallenged hit count","victory by unchallenged hit count","victory by unchallenged hit count","victory by concession","victory by unchallenged hit count","46d9dq","victory by concession","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(64,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(64,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(48,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(48,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(181,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(181,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
