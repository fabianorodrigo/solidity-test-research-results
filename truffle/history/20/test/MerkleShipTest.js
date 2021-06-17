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
    let result = await contractMerkleShip.emergencyStop("dvi2jo",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("dvi2jo",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(9, [90,243,137,193,41,239,220,109,123,171,248,195,134,135,238,20,232,108,13,164,182,53,29,198,114,74,239,141,137,195,171,254],{from: accounts[0],value:9});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(9, [90,243,137,193,41,239,220,109,123,171,248,195,134,135,238,20,232,108,13,164,182,53,29,198,114,74,239,141,137,195,171,254],{from: accounts[0],value:9}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(10, [90,243,137,193,41,239,220,109,123,171,248,195,134,135,238,20,232,108,13,164,182,53,29,198,114,74,239,141,137,195,171,254],{from: accounts[0],value:9}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(181, [4,62,191,175,211,226,185,186,115,114,49,110,63,54,153,38,188,110,145,86,70,202,203,78,152,173,41,103,250,215,121,109],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(181, [4,62,191,175,211,226,185,186,115,114,49,110,63,54,153,38,188,110,145,86,70,202,203,78,152,173,41,103,250,215,121,109],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(64,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("dvi2jo",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(64,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(63, [9,181], [[254,35,165,127,84,6,114,16,79,35,16,245,101,149,24,155,79,91,54,78,56,173,13,236,6,178,62,93,224,250,202,124],[244,14,245,159,74,18,220,107,161,253,160,233,147,33,202,122,230,93,201,234,5,39,130,154,220,181,221,250,248,207,120,46],[108,43,31,115,41,203,114,184,105,118,239,105,143,219,105,19,106,242,62,240,15,80,38,24,227,50,73,37,98,148,117,170],[200,54,169,201,176,128,210,74,125,40,253,45,25,0,196,170,40,109,169,0,114,146,200,107,242,40,147,251,86,240,224,180],[93,109,22,53,178,37,242,96,13,251,212,95,231,100,220,204,13,97,86,90,141,54,68,0,61,90,15,162,54,206,67,138],[1,188,24,105,124,252,43,241,16,2,145,148,20,73,85,197,36,9,238,171,191,243,99,72,222,49,246,240,22,164,106,55]], "verified victory by hit count", "game resolved in an emergency",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(63, [9,181], [[254,35,165,127,84,6,114,16,79,35,16,245,101,149,24,155,79,91,54,78,56,173,13,236,6,178,62,93,224,250,202,124],[244,14,245,159,74,18,220,107,161,253,160,233,147,33,202,122,230,93,201,234,5,39,130,154,220,181,221,250,248,207,120,46],[108,43,31,115,41,203,114,184,105,118,239,105,143,219,105,19,106,242,62,240,15,80,38,24,227,50,73,37,98,148,117,170],[200,54,169,201,176,128,210,74,125,40,253,45,25,0,196,170,40,109,169,0,114,146,200,107,242,40,147,251,86,240,224,180],[93,109,22,53,178,37,242,96,13,251,212,95,231,100,220,204,13,97,86,90,141,54,68,0,61,90,15,162,54,206,67,138],[1,188,24,105,124,252,43,241,16,2,145,148,20,73,85,197,36,9,238,171,191,243,99,72,222,49,246,240,22,164,106,55]], "verified victory by hit count", "game resolved in an emergency",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(63,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("11op9w",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(179,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(179,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(47,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("uviwgx",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(9, ["game resolved in an emergency","uviwgx","11op9w","uviwgx","victory by unanswered challenge","verified victory by hit count","uviwgx","j4ehmr","victory by unchallenged hit count","victory by unchallenged hit count","11op9w","verified victory by hit count","victory by abandonment","victory by unanswered challenge","j4ehmr","victory by concession","uviwgx","dvi2jo","victory by unanswered challenge","victory by concession","game resolved in an emergency","dvi2jo","verified victory by hit count","victory by unchallenged hit count","uviwgx","victory by concession","victory by unchallenged hit count","uviwgx","victory by concession","verified victory by hit count","victory by unchallenged hit count","dx9lqq","victory by concession","msvhjd","msvhjd","victory by abandonment","uviwgx","msvhjd","victory by unanswered challenge","game resolved in an emergency","11op9w","dvi2jo","msvhjd","uviwgx","msvhjd","victory by unanswered challenge","11op9w","msvhjd","j4ehmr","victory by concession","victory by unchallenged hit count","uviwgx","dx9lqq","verified victory by hit count","d6bakg","game resolved in an emergency","verified victory by hit count","game resolved in an emergency","dvi2jo","uviwgx","d6bakg","victory by unanswered challenge","victory by unchallenged hit count","11op9w"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("msvhjd",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(9, ["game resolved in an emergency","uviwgx","11op9w","uviwgx","victory by unanswered challenge","verified victory by hit count","uviwgx","j4ehmr","victory by unchallenged hit count","victory by unchallenged hit count","11op9w","verified victory by hit count","victory by abandonment","victory by unanswered challenge","j4ehmr","victory by concession","uviwgx","dvi2jo","victory by unanswered challenge","victory by concession","game resolved in an emergency","dvi2jo","verified victory by hit count","victory by unchallenged hit count","uviwgx","victory by concession","victory by unchallenged hit count","uviwgx","victory by concession","verified victory by hit count","victory by unchallenged hit count","dx9lqq","victory by concession","msvhjd","msvhjd","victory by abandonment","uviwgx","msvhjd","victory by unanswered challenge","game resolved in an emergency","11op9w","dvi2jo","msvhjd","uviwgx","msvhjd","victory by unanswered challenge","11op9w","msvhjd","j4ehmr","victory by concession","victory by unchallenged hit count","uviwgx","dx9lqq","verified victory by hit count","d6bakg","game resolved in an emergency","verified victory by hit count","game resolved in an emergency","dvi2jo","uviwgx","d6bakg","victory by unanswered challenge","victory by unchallenged hit count","11op9w"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(39,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("j4ehmr",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(39,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(181,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(181,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(4,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(4,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
