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
    let result = await contractMerkleShip.proposeGame(11, [42,221,226,189,126,100,186,24,203,185,110,155,191,104,248,222,104,2,31,73,220,190,20,96,197,28,212,65,233,233,179,176],{from: accounts[0],value:11});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("3gxus9",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(11, [42,221,226,189,126,100,186,24,203,185,110,155,191,104,248,222,104,2,31,73,220,190,20,96,197,28,212,65,233,233,179,176],{from: accounts[0],value:11}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(12, [42,221,226,189,126,100,186,24,203,185,110,155,191,104,248,222,104,2,31,73,220,190,20,96,197,28,212,65,233,233,179,176],{from: accounts[0],value:11}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(179, [185,116,1,27,55,115,12,55,242,202,165,205,33,189,162,162,191,79,224,64,124,182,207,67,103,57,138,98,0,219,136,25],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(179, [185,116,1,27,55,115,12,55,242,202,165,205,33,189,162,162,191,79,224,64,124,182,207,67,103,57,138,98,0,219,136,25],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(1,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unchallenged hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(1,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(11, [4,3], [[216,131,56,96,167,123,75,137,175,56,26,140,162,253,65,141,223,70,145,223,228,165,255,189,6,73,214,88,136,120,64,135],[32,35,88,104,239,239,101,76,202,140,192,96,47,78,67,200,255,68,195,94,234,106,206,118,166,54,108,191,199,4,163,81],[198,126,231,83,217,33,128,231,15,118,56,131,100,89,178,116,224,165,183,85,27,18,173,136,177,169,35,10,0,134,2,146],[195,219,191,155,235,103,224,35,13,15,44,245,192,163,89,119,1,240,79,30,67,82,230,131,83,241,201,209,220,95,139,30],[191,186,115,227,124,213,169,115,104,103,94,171,33,190,187,28,140,122,151,180,81,82,119,62,58,183,254,199,47,37,183,102],[88,14,166,229,173,71,94,39,133,151,112,94,184,55,62,65,140,19,253,87,215,194,198,130,214,105,124,126,39,220,96,221]], "khx3pi", "victory by unanswered challenge",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(11, [4,3], [[216,131,56,96,167,123,75,137,175,56,26,140,162,253,65,141,223,70,145,223,228,165,255,189,6,73,214,88,136,120,64,135],[32,35,88,104,239,239,101,76,202,140,192,96,47,78,67,200,255,68,195,94,234,106,206,118,166,54,108,191,199,4,163,81],[198,126,231,83,217,33,128,231,15,118,56,131,100,89,178,116,224,165,183,85,27,18,173,136,177,169,35,10,0,134,2,146],[195,219,191,155,235,103,224,35,13,15,44,245,192,163,89,119,1,240,79,30,67,82,230,131,83,241,201,209,220,95,139,30],[191,186,115,227,124,213,169,115,104,103,94,171,33,190,187,28,140,122,151,180,81,82,119,62,58,183,254,199,47,37,183,102],[88,14,166,229,173,71,94,39,133,151,112,94,184,55,62,65,140,19,253,87,215,194,198,130,214,105,124,126,39,220,96,221]], "khx3pi", "victory by unanswered challenge",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(39,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(39,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(63,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("game resolved in an emergency",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(63,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(12, ["game resolved in an emergency","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","3gxus9","game resolved in an emergency","verified victory by hit count","victory by concession","khx3pi","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","verified victory by hit count","verified victory by hit count","victory by concession","rry5wn","2iw1c8","2iw1c8","game resolved in an emergency","victory by abandonment","victory by concession","khx3pi","victory by unanswered challenge","2iw1c8","2iw1c8","victory by concession","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","g7fui","khx3pi","3gxus9","verified victory by hit count","verified victory by hit count","khx3pi","victory by unanswered challenge","g7fui","24dru","3eyi3","3eyi3","24dru","3eyi3","verified victory by hit count","victory by abandonment","3gxus9","game resolved in an emergency","khx3pi","victory by concession","victory by concession","24dru","3gxus9","3eyi3","victory by unanswered challenge","verified victory by hit count","2iw1c8","victory by concession","3eyi3","3gxus9","24dru","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by concession","victory by unanswered challenge"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("rry5wn",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(12, ["game resolved in an emergency","verified victory by hit count","game resolved in an emergency","victory by unchallenged hit count","3gxus9","game resolved in an emergency","verified victory by hit count","victory by concession","khx3pi","verified victory by hit count","victory by unchallenged hit count","game resolved in an emergency","verified victory by hit count","verified victory by hit count","victory by concession","rry5wn","2iw1c8","2iw1c8","game resolved in an emergency","victory by abandonment","victory by concession","khx3pi","victory by unanswered challenge","2iw1c8","2iw1c8","victory by concession","victory by unchallenged hit count","game resolved in an emergency","game resolved in an emergency","g7fui","khx3pi","3gxus9","verified victory by hit count","verified victory by hit count","khx3pi","victory by unanswered challenge","g7fui","24dru","3eyi3","3eyi3","24dru","3eyi3","verified victory by hit count","victory by abandonment","3gxus9","game resolved in an emergency","khx3pi","victory by concession","victory by concession","24dru","3gxus9","3eyi3","victory by unanswered challenge","verified victory by hit count","2iw1c8","victory by concession","3eyi3","3gxus9","24dru","victory by unanswered challenge","victory by unchallenged hit count","game resolved in an emergency","victory by concession","victory by unanswered challenge"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(181,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(181,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("g7fui",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(47,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(3,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(3,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
