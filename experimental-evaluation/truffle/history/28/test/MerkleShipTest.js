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
    let result = await contractMerkleShip.emergencyStop("verified victory by hit count",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("verified victory by hit count",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(49, [83,62,13,198,97,141,91,53,215,29,33,134,45,173,194,117,167,224,22,190,238,84,194,194,204,10,34,232,63,243,195,127],{from: accounts[0],value:49});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(49, [83,62,13,198,97,141,91,53,215,29,33,134,45,173,194,117,167,224,22,190,238,84,194,194,204,10,34,232,63,243,195,127],{from: accounts[0],value:49}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(50, [83,62,13,198,97,141,91,53,215,29,33,134,45,173,194,117,167,224,22,190,238,84,194,194,204,10,34,232,63,243,195,127],{from: accounts[0],value:49}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(47, [153,71,171,62,0,51,77,60,116,128,137,101,70,145,55,92,126,114,243,126,141,118,59,119,104,142,3,235,148,196,132,96],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(47, [153,71,171,62,0,51,77,60,116,128,137,101,70,145,55,92,126,114,243,126,141,118,59,119,104,142,3,235,148,196,132,96],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(8,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(8,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(100, [13,99], [[213,177,178,194,172,144,57,100,91,94,26,62,98,129,217,223,3,62,202,202,8,14,131,154,216,34,30,150,184,86,245,31],[105,67,48,191,77,139,238,158,172,73,145,11,238,156,146,229,162,59,5,197,210,43,212,90,229,139,157,125,138,225,99,191],[33,103,171,243,14,252,250,220,32,245,37,63,21,10,29,75,206,248,10,185,209,156,11,250,157,147,125,84,165,219,174,147],[99,113,38,161,45,202,49,240,127,17,116,16,88,109,62,211,40,53,42,220,212,71,209,126,53,95,108,190,23,86,160,193],[241,190,178,119,138,103,63,178,44,25,2,188,202,199,168,31,191,72,190,50,22,103,22,157,145,226,162,211,96,22,214,229],[106,221,98,168,83,130,221,221,124,92,230,26,118,188,93,101,124,135,186,38,118,238,24,28,150,212,106,233,118,203,92,237]], "verified victory by hit count", "c9646i",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(100, [13,99], [[213,177,178,194,172,144,57,100,91,94,26,62,98,129,217,223,3,62,202,202,8,14,131,154,216,34,30,150,184,86,245,31],[105,67,48,191,77,139,238,158,172,73,145,11,238,156,146,229,162,59,5,197,210,43,212,90,229,139,157,125,138,225,99,191],[33,103,171,243,14,252,250,220,32,245,37,63,21,10,29,75,206,248,10,185,209,156,11,250,157,147,125,84,165,219,174,147],[99,113,38,161,45,202,49,240,127,17,116,16,88,109,62,211,40,53,42,220,212,71,209,126,53,95,108,190,23,86,160,193],[241,190,178,119,138,103,63,178,44,25,2,188,202,199,168,31,191,72,190,50,22,103,22,157,145,226,162,211,96,22,214,229],[106,221,98,168,83,130,221,221,124,92,230,26,118,188,93,101,124,135,186,38,118,238,24,28,150,212,106,233,118,203,92,237]], "verified victory by hit count", "c9646i",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(1,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("i97sup",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(1,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(12,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(12,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(3, ["verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","i97sup","victory by unchallenged hit count","victory by abandonment","game resolved in an emergency","u8j52","i97sup","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","victory by abandonment","victory by abandonment","verified victory by hit count","verified victory by hit count","victory by abandonment","victory by abandonment","i97sup","i97sup","game resolved in an emergency","i97sup","c9646i","victory by unanswered challenge","c9646i","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","c9646i","victory by concession","u8j52","victory by unchallenged hit count","victory by abandonment","victory by abandonment","victory by abandonment","victory by unanswered challenge","verified victory by hit count","c9646i","victory by unanswered challenge","c9646i","victory by unchallenged hit count","victory by concession","s0x1en","i97sup","i97sup","victory by unanswered challenge","s0x1en","game resolved in an emergency","c9646i","victory by unanswered challenge","victory by abandonment","victory by abandonment","i97sup","game resolved in an emergency","i97sup","verified victory by hit count","victory by concession","i97sup","game resolved in an emergency"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("s0x1en",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(3, ["verified victory by hit count","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by unanswered challenge","victory by unanswered challenge","game resolved in an emergency","i97sup","victory by unchallenged hit count","victory by abandonment","game resolved in an emergency","u8j52","i97sup","victory by abandonment","victory by unanswered challenge","victory by unchallenged hit count","victory by unchallenged hit count","victory by abandonment","victory by abandonment","verified victory by hit count","verified victory by hit count","victory by abandonment","victory by abandonment","i97sup","i97sup","game resolved in an emergency","i97sup","c9646i","victory by unanswered challenge","c9646i","victory by unchallenged hit count","verified victory by hit count","victory by unanswered challenge","c9646i","victory by concession","u8j52","victory by unchallenged hit count","victory by abandonment","victory by abandonment","victory by abandonment","victory by unanswered challenge","verified victory by hit count","c9646i","victory by unanswered challenge","c9646i","victory by unchallenged hit count","victory by concession","s0x1en","i97sup","i97sup","victory by unanswered challenge","s0x1en","game resolved in an emergency","c9646i","victory by unanswered challenge","victory by abandonment","victory by abandonment","i97sup","game resolved in an emergency","i97sup","verified victory by hit count","victory by concession","i97sup","game resolved in an emergency"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(7,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(7,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(99,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(99,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
