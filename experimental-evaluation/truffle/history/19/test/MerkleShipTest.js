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
    let result = await contractMerkleShip.proposeGame(0, [61,142,106,37,198,155,252,48,114,227,72,42,68,78,123,17,23,36,209,192,93,178,67,11,131,43,130,208,20,75,189,14],{from: accounts[0]});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(0, [61,142,106,37,198,155,252,48,114,227,72,42,68,78,123,17,23,36,209,192,93,178,67,11,131,43,130,208,20,75,189,14],{from: accounts[0]}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(1, [61,142,106,37,198,155,252,48,114,227,72,42,68,78,123,17,23,36,209,192,93,178,67,11,131,43,130,208,20,75,189,14],{from: accounts[0]}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(65, [166,45,74,177,45,142,186,247,214,247,179,25,208,5,221,187,107,45,140,220,70,86,157,240,111,116,62,149,135,19,231,178],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(65, [166,45,74,177,45,142,186,247,214,247,179,25,208,5,221,187,107,45,140,220,70,86,157,240,111,116,62,149,135,19,231,178],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(64,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(64,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(100, [179,179], [[148,58,187,13,156,68,110,212,237,65,36,241,101,194,70,229,2,193,2,65,57,227,39,137,252,88,8,169,206,112,240,240],[242,98,209,10,46,51,100,163,40,133,18,214,213,171,240,190,69,58,135,197,131,41,182,186,139,120,166,150,69,153,163,197],[233,251,51,78,137,77,149,247,254,33,175,165,68,104,102,145,169,84,99,36,86,209,252,97,74,228,205,106,32,173,5,23],[204,126,102,201,43,243,90,177,195,139,88,182,198,158,69,254,216,77,189,17,33,190,132,234,48,146,178,139,179,51,112,170],[244,138,154,145,83,194,34,79,89,207,18,31,227,181,101,249,247,12,48,101,72,65,239,61,227,225,228,52,181,108,192,217],[237,12,33,6,134,115,136,61,82,120,29,128,72,80,159,96,81,146,214,39,55,89,44,182,201,217,207,86,233,77,23,67]], "victory by concession", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(100, [179,179], [[148,58,187,13,156,68,110,212,237,65,36,241,101,194,70,229,2,193,2,65,57,227,39,137,252,88,8,169,206,112,240,240],[242,98,209,10,46,51,100,163,40,133,18,214,213,171,240,190,69,58,135,197,131,41,182,186,139,120,166,150,69,153,163,197],[233,251,51,78,137,77,149,247,254,33,175,165,68,104,102,145,169,84,99,36,86,209,252,97,74,228,205,106,32,173,5,23],[204,126,102,201,43,243,90,177,195,139,88,182,198,158,69,254,216,77,189,17,33,190,132,234,48,146,178,139,179,51,112,170],[244,138,154,145,83,194,34,79,89,207,18,31,227,181,101,249,247,12,48,101,72,65,239,61,227,225,228,52,181,108,192,217],[237,12,33,6,134,115,136,61,82,120,29,128,72,80,159,96,81,146,214,39,55,89,44,182,201,217,207,86,233,77,23,67]], "victory by concession", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(48,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(48,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(179,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(179,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(49, ["verified victory by hit count","victory by concession","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","verified victory by hit count","victory by abandonment","victory by unchallenged hit count","victory by abandonment","awgun","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","awgun","awgun","victory by abandonment","game resolved in an emergency","game resolved in an emergency","victory by concession","game resolved in an emergency","victory by abandonment","awgun","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","awgun","awgun","victory by unanswered challenge","d0p3zm","awgun","victory by unanswered challenge","awgun","game resolved in an emergency","awgun","d0p3zm","game resolved in an emergency","d0p3zm","6qnxgi","victory by unchallenged hit count","awgun","game resolved in an emergency","victory by abandonment","victory by abandonment","awgun","victory by concession","6qnxgi","verified victory by hit count","victory by concession","6qnxgi","victory by unchallenged hit count","victory by concession","awgun","awgun","victory by abandonment","victory by concession","victory by concession","victory by concession","awgun","verified victory by hit count","d0p3zm","wbfgp"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("wbfgp",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(49, ["verified victory by hit count","victory by concession","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","verified victory by hit count","victory by abandonment","victory by unchallenged hit count","victory by abandonment","awgun","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","awgun","awgun","victory by abandonment","game resolved in an emergency","game resolved in an emergency","victory by concession","game resolved in an emergency","victory by abandonment","awgun","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","awgun","awgun","victory by unanswered challenge","d0p3zm","awgun","victory by unanswered challenge","awgun","game resolved in an emergency","awgun","d0p3zm","game resolved in an emergency","d0p3zm","6qnxgi","victory by unchallenged hit count","awgun","game resolved in an emergency","victory by abandonment","victory by abandonment","awgun","victory by concession","6qnxgi","verified victory by hit count","victory by concession","6qnxgi","victory by unchallenged hit count","victory by concession","awgun","awgun","victory by abandonment","victory by concession","victory by concession","victory by concession","awgun","verified victory by hit count","d0p3zm","wbfgp"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("d0p3zm",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(40,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(180,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("kaoryt",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(180,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(12,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(12,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
