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
    let result = await contractMerkleShip.emergencyStop("yvwkgy",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("yvwkgy",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(39, [103,245,241,20,193,206,250,53,178,147,115,75,84,85,135,0,202,234,148,171,26,37,172,254,204,227,224,67,18,160,86,24],{from: accounts[0],value:39});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(39, [103,245,241,20,193,206,250,53,178,147,115,75,84,85,135,0,202,234,148,171,26,37,172,254,204,227,224,67,18,160,86,24],{from: accounts[0],value:39}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(40, [103,245,241,20,193,206,250,53,178,147,115,75,84,85,135,0,202,234,148,171,26,37,172,254,204,227,224,67,18,160,86,24],{from: accounts[0],value:39}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(181, [31,237,225,70,108,128,73,108,195,169,88,206,244,96,22,186,201,110,133,104,167,233,246,183,35,217,41,2,213,130,195,27],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(181, [31,237,225,70,108,128,73,108,195,169,88,206,244,96,22,186,201,110,133,104,167,233,246,183,35,217,41,2,213,130,195,27],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(40,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(40,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(63, [1,11], [[210,31,219,176,79,23,133,104,72,139,244,212,96,68,224,10,40,61,16,158,11,184,15,35,5,73,237,154,4,230,240,180],[73,251,194,135,25,125,123,30,252,36,198,169,109,29,124,239,122,237,109,20,218,66,39,6,234,2,116,215,126,134,236,235],[29,167,226,124,57,16,111,140,229,166,24,209,76,55,116,41,29,44,237,153,73,169,103,160,118,76,155,81,106,15,97,146],[85,204,86,145,117,28,243,149,171,211,34,178,51,77,255,247,12,114,188,122,63,121,41,97,239,244,247,201,165,92,181,143],[34,158,212,115,122,254,15,110,82,241,41,40,240,251,65,186,238,21,244,145,187,104,218,211,101,249,13,174,178,49,84,228],[111,197,131,0,40,102,11,129,213,131,90,247,230,121,67,12,246,105,215,251,38,119,133,223,100,142,120,90,180,203,13,167]], "victory by unanswered challenge", "qxauir",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(63, [1,11], [[210,31,219,176,79,23,133,104,72,139,244,212,96,68,224,10,40,61,16,158,11,184,15,35,5,73,237,154,4,230,240,180],[73,251,194,135,25,125,123,30,252,36,198,169,109,29,124,239,122,237,109,20,218,66,39,6,234,2,116,215,126,134,236,235],[29,167,226,124,57,16,111,140,229,166,24,209,76,55,116,41,29,44,237,153,73,169,103,160,118,76,155,81,106,15,97,146],[85,204,86,145,117,28,243,149,171,211,34,178,51,77,255,247,12,114,188,122,63,121,41,97,239,244,247,201,165,92,181,143],[34,158,212,115,122,254,15,110,82,241,41,40,240,251,65,186,238,21,244,145,187,104,218,211,101,249,13,174,178,49,84,228],[111,197,131,0,40,102,11,129,213,131,90,247,230,121,67,12,246,105,215,251,38,119,133,223,100,142,120,90,180,203,13,167]], "victory by unanswered challenge", "qxauir",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(7,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(47,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(179, ["victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by concession","game resolved in an emergency","verified victory by hit count","verified victory by hit count","qxauir","verified victory by hit count","qxauir","qxauir","victory by concession","yvwkgy","victory by concession","victory by concession","victory by abandonment","0jkujx8","victory by concession","victory by concession","4tlyvo","0jkujx8","victory by concession","victory by unchallenged hit count","game resolved in an emergency","victory by abandonment","victory by unchallenged hit count","4tlyvo","qxauir","victory by unchallenged hit count","victory by abandonment","victory by unchallenged hit count","verified victory by hit count","09qnwe","yvwkgy","09qnwe","victory by unanswered challenge","qxauir","qxauir","09qnwe","victory by unchallenged hit count","0jkujx8","09qnwe","game resolved in an emergency","victory by unchallenged hit count","victory by concession","yvwkgy","victory by unchallenged hit count","game resolved in an emergency","yvwkgy","verified victory by hit count","09qnwe","09qnwe","4tlyvo","09qnwe","victory by abandonment","victory by unanswered challenge","4tlyvo","yvwkgy","victory by unchallenged hit count","verified victory by hit count","yvwkgy","09qnwe","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("7rrbge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(179, ["victory by abandonment","victory by unanswered challenge","victory by unanswered challenge","verified victory by hit count","victory by concession","game resolved in an emergency","verified victory by hit count","verified victory by hit count","qxauir","verified victory by hit count","qxauir","qxauir","victory by concession","yvwkgy","victory by concession","victory by concession","victory by abandonment","0jkujx8","victory by concession","victory by concession","4tlyvo","0jkujx8","victory by concession","victory by unchallenged hit count","game resolved in an emergency","victory by abandonment","victory by unchallenged hit count","4tlyvo","qxauir","victory by unchallenged hit count","victory by abandonment","victory by unchallenged hit count","verified victory by hit count","09qnwe","yvwkgy","09qnwe","victory by unanswered challenge","qxauir","qxauir","09qnwe","victory by unchallenged hit count","0jkujx8","09qnwe","game resolved in an emergency","victory by unchallenged hit count","victory by concession","yvwkgy","victory by unchallenged hit count","game resolved in an emergency","yvwkgy","verified victory by hit count","09qnwe","09qnwe","4tlyvo","09qnwe","victory by abandonment","victory by unanswered challenge","4tlyvo","yvwkgy","victory by unchallenged hit count","verified victory by hit count","yvwkgy","09qnwe","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(11,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("q2g3st",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(11,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(8,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(8,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
