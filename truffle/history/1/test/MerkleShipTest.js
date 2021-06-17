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
    let result = await contractMerkleShip.emergencyStop("9batp",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("9batp",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(8, [188,30,210,244,21,164,96,178,78,106,207,42,22,123,9,158,11,73,247,13,127,185,229,139,183,124,70,131,175,226,4,108],{from: accounts[0],value:8});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(8, [188,30,210,244,21,164,96,178,78,106,207,42,22,123,9,158,11,73,247,13,127,185,229,139,183,124,70,131,175,226,4,108],{from: accounts[0],value:8}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(9, [188,30,210,244,21,164,96,178,78,106,207,42,22,123,9,158,11,73,247,13,127,185,229,139,183,124,70,131,175,226,4,108],{from: accounts[0],value:8}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(65, [78,132,192,71,11,128,0,12,111,35,216,16,176,132,204,217,55,22,108,107,15,76,2,248,122,121,216,107,6,246,185,19],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(65, [78,132,192,71,11,128,0,12,111,35,216,16,176,132,204,217,55,22,108,107,15,76,2,248,122,121,216,107,6,246,185,19],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(65,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("9batp",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(65,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(49, [12,13], [[175,199,46,10,196,80,106,226,7,2,39,186,124,218,70,112,106,46,252,81,174,5,66,212,94,33,167,64,25,28,2,229],[70,208,59,200,111,68,157,169,85,104,29,176,37,196,84,190,138,255,5,109,6,177,120,49,14,224,214,195,24,189,187,25],[200,10,223,214,51,0,54,26,161,119,86,217,246,41,216,152,1,141,75,48,181,73,138,22,254,132,27,71,72,102,225,216],[85,0,8,251,7,74,32,217,61,74,105,3,228,105,69,106,168,145,223,56,65,94,29,200,238,57,76,128,154,227,31,154],[109,18,154,27,141,229,25,93,75,102,175,240,98,15,18,180,1,97,65,179,246,86,22,184,105,151,97,252,84,61,16,38],[0,135,21,127,71,170,39,84,147,4,41,107,52,121,49,14,227,181,70,126,114,144,190,165,48,176,231,106,139,167,47,83]], "verified victory by hit count", "verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(49, [12,13], [[175,199,46,10,196,80,106,226,7,2,39,186,124,218,70,112,106,46,252,81,174,5,66,212,94,33,167,64,25,28,2,229],[70,208,59,200,111,68,157,169,85,104,29,176,37,196,84,190,138,255,5,109,6,177,120,49,14,224,214,195,24,189,187,25],[200,10,223,214,51,0,54,26,161,119,86,217,246,41,216,152,1,141,75,48,181,73,138,22,254,132,27,71,72,102,225,216],[85,0,8,251,7,74,32,217,61,74,105,3,228,105,69,106,168,145,223,56,65,94,29,200,238,57,76,128,154,227,31,154],[109,18,154,27,141,229,25,93,75,102,175,240,98,15,18,180,1,97,65,179,246,86,22,184,105,151,97,252,84,61,16,38],[0,135,21,127,71,170,39,84,147,4,41,107,52,121,49,14,227,181,70,126,114,144,190,165,48,176,231,106,139,167,47,83]], "verified victory by hit count", "verified victory by hit count",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(7,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(7,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(180,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(180,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(49,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(49,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(4, ["9batp","9batp","victory by unanswered challenge","victory by unanswered challenge","9batp","q6tntp","victory by unchallenged hit count","victory by concession","victory by concession","victory by concession","victory by unchallenged hit count","victory by unchallenged hit count","nbl4k","q6tntp","q6tntp","nbl4k","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","wljqnm","kvznd6","q6tntp","verified victory by hit count","victory by unanswered challenge","game resolved in an emergency","victory by unchallenged hit count","victory by concession","nbl4k","wljqnm","game resolved in an emergency","0pjuml","wljqnm","0pjuml","wjyore","9batp","verified victory by hit count","kvznd6","wjyore","f55f8m","0pjuml","q6tntp","kvznd6","victory by abandonment","9batp","victory by concession","verified victory by hit count","game resolved in an emergency","kvznd6","victory by concession","victory by unchallenged hit count","wjyore","q6tntp","victory by abandonment","q6tntp","q6tntp","victory by abandonment","q6tntp","wjyore","0pjuml","wjyore","q6tntp","wjyore","victory by abandonment","nbl4k"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("nbl4k",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(4, ["9batp","9batp","victory by unanswered challenge","victory by unanswered challenge","9batp","q6tntp","victory by unchallenged hit count","victory by concession","victory by concession","victory by concession","victory by unchallenged hit count","victory by unchallenged hit count","nbl4k","q6tntp","q6tntp","nbl4k","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","wljqnm","kvznd6","q6tntp","verified victory by hit count","victory by unanswered challenge","game resolved in an emergency","victory by unchallenged hit count","victory by concession","nbl4k","wljqnm","game resolved in an emergency","0pjuml","wljqnm","0pjuml","wjyore","9batp","verified victory by hit count","kvznd6","wjyore","f55f8m","0pjuml","q6tntp","kvznd6","victory by abandonment","9batp","victory by concession","verified victory by hit count","game resolved in an emergency","kvznd6","victory by concession","victory by unchallenged hit count","wjyore","q6tntp","victory by abandonment","q6tntp","q6tntp","victory by abandonment","q6tntp","wjyore","0pjuml","wjyore","q6tntp","wjyore","victory by abandonment","nbl4k"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(100,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(100,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(11,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("9batp",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(11,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(9,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(9,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
