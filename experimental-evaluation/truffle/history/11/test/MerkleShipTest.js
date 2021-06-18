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
    let result = await contractMerkleShip.proposeGame(3, [139,25,103,213,199,247,218,234,184,230,228,14,77,1,227,110,48,34,8,251,85,217,151,246,136,184,33,9,203,60,249,114],{from: accounts[0],value:3});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(3, [139,25,103,213,199,247,218,234,184,230,228,14,77,1,227,110,48,34,8,251,85,217,151,246,136,184,33,9,203,60,249,114],{from: accounts[0],value:3}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(4, [139,25,103,213,199,247,218,234,184,230,228,14,77,1,227,110,48,34,8,251,85,217,151,246,136,184,33,9,203,60,249,114],{from: accounts[0],value:3}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(8, [174,112,144,199,81,49,76,103,11,132,90,191,159,139,32,152,238,165,203,3,2,197,21,81,43,3,52,252,220,214,44,71],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(8, [174,112,144,199,81,49,76,103,11,132,90,191,159,139,32,152,238,165,203,3,2,197,21,81,43,3,52,252,220,214,44,71],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(9,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(9,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(49, [181,2], [[211,186,244,36,16,47,152,2,213,79,75,222,88,24,131,16,13,160,187,144,174,23,40,40,26,244,181,21,90,222,191,17],[118,57,192,193,213,116,60,186,235,255,112,196,2,116,12,233,206,236,127,164,96,145,54,1,134,90,158,176,167,106,241,216],[66,245,79,239,247,158,127,216,230,187,84,240,141,7,126,120,82,126,37,154,173,29,1,181,26,160,163,174,42,236,53,122],[66,179,170,117,167,45,247,166,205,170,214,69,14,244,231,253,131,91,227,167,254,171,130,38,32,13,26,214,144,160,229,40],[4,159,151,121,182,178,47,165,163,139,105,135,207,59,223,75,77,235,229,57,206,130,211,141,118,83,236,61,112,104,48,126],[89,6,105,224,220,22,139,125,214,181,83,121,143,244,19,198,52,99,130,62,176,230,96,133,235,101,34,55,245,205,22,105]], "victory by unanswered challenge", "victory by unchallenged hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(49, [181,2], [[211,186,244,36,16,47,152,2,213,79,75,222,88,24,131,16,13,160,187,144,174,23,40,40,26,244,181,21,90,222,191,17],[118,57,192,193,213,116,60,186,235,255,112,196,2,116,12,233,206,236,127,164,96,145,54,1,134,90,158,176,167,106,241,216],[66,245,79,239,247,158,127,216,230,187,84,240,141,7,126,120,82,126,37,154,173,29,1,181,26,160,163,174,42,236,53,122],[66,179,170,117,167,45,247,166,205,170,214,69,14,244,231,253,131,91,227,167,254,171,130,38,32,13,26,214,144,160,229,40],[4,159,151,121,182,178,47,165,163,139,105,135,207,59,223,75,77,235,229,57,206,130,211,141,118,83,236,61,112,104,48,126],[89,6,105,224,220,22,139,125,214,181,83,121,143,244,19,198,52,99,130,62,176,230,96,133,235,101,34,55,245,205,22,105]], "victory by unanswered challenge", "victory by unchallenged hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(64,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(64,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(0,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("z7k7g",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(0,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(2,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("qsc6g2",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(2,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(13, ["z7k7g","victory by concession","game resolved in an emergency","victory by concession","victory by abandonment","victory by concession","qsc6g2","qsc6g2","verified victory by hit count","z7k7g","qsc6g2","game resolved in an emergency","verified victory by hit count","verified victory by hit count","victory by concession","victory by abandonment","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","z7k7g","z7k7g","victory by unchallenged hit count","lci5ft","wdczwg","qsc6g2","victory by unchallenged hit count","victory by concession","m5oiz","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","r7lwi","victory by abandonment","victory by unchallenged hit count","victory by unchallenged hit count","z7k7g","victory by abandonment","verified victory by hit count","victory by unanswered challenge","victory by unanswered challenge","lci5ft","game resolved in an emergency","k14io","victory by concession","victory by concession","z7k7g","m5oiz","qnqjc","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","qnqjc","victory by unanswered challenge","game resolved in an emergency","victory by abandonment","nw4umg","verified victory by hit count","verified victory by hit count","r7lwi","victory by unchallenged hit count"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("lci5ft",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(13, ["z7k7g","victory by concession","game resolved in an emergency","victory by concession","victory by abandonment","victory by concession","qsc6g2","qsc6g2","verified victory by hit count","z7k7g","qsc6g2","game resolved in an emergency","verified victory by hit count","verified victory by hit count","victory by concession","victory by abandonment","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by unanswered challenge","verified victory by hit count","z7k7g","z7k7g","victory by unchallenged hit count","lci5ft","wdczwg","qsc6g2","victory by unchallenged hit count","victory by concession","m5oiz","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","victory by unanswered challenge","r7lwi","victory by abandonment","victory by unchallenged hit count","victory by unchallenged hit count","z7k7g","victory by abandonment","verified victory by hit count","victory by unanswered challenge","victory by unanswered challenge","lci5ft","game resolved in an emergency","k14io","victory by concession","victory by concession","z7k7g","m5oiz","qnqjc","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","qnqjc","victory by unanswered challenge","game resolved in an emergency","victory by abandonment","nw4umg","verified victory by hit count","verified victory by hit count","r7lwi","victory by unchallenged hit count"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("m5oiz",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(63,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(63,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("qsc6g2",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(13,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(13,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
