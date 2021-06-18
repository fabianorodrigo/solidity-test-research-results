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
    let result = await contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("victory by abandonment",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(41, [226,235,99,78,28,84,51,208,227,24,179,108,133,49,174,191,13,235,186,184,97,201,111,189,73,184,67,39,254,23,229,218],{from: accounts[0],value:41});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(41, [226,235,99,78,28,84,51,208,227,24,179,108,133,49,174,191,13,235,186,184,97,201,111,189,73,184,67,39,254,23,229,218],{from: accounts[0],value:41}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(42, [226,235,99,78,28,84,51,208,227,24,179,108,133,49,174,191,13,235,186,184,97,201,111,189,73,184,67,39,254,23,229,218],{from: accounts[0],value:41}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(65, [91,237,155,62,142,88,206,235,215,134,254,218,252,71,211,31,127,135,5,63,229,22,205,133,77,143,24,212,122,199,168,93],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(65, [91,237,155,62,142,88,206,235,215,134,254,218,252,71,211,31,127,135,5,63,229,22,205,133,77,143,24,212,122,199,168,93],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(99,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("614nab",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(99,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(48, [4,41], [[226,112,214,23,55,183,242,127,161,74,14,154,51,98,251,70,109,213,105,198,254,150,6,17,148,146,152,104,54,81,201,57],[138,170,191,94,10,161,142,157,157,6,26,233,215,64,44,7,199,14,7,31,152,24,84,17,197,153,117,9,207,10,154,193],[218,207,73,193,177,90,184,211,169,45,239,149,214,32,28,66,222,240,175,197,133,205,206,2,89,224,237,194,106,167,32,224],[245,179,92,185,169,75,120,46,149,79,87,64,119,245,102,152,6,54,69,147,168,145,217,220,75,115,124,72,52,31,82,95],[51,199,176,79,65,124,141,114,200,251,228,225,162,51,211,197,194,137,235,84,121,181,253,100,88,130,133,72,90,194,77,44],[152,50,29,162,188,186,85,110,202,213,142,99,182,35,13,247,28,215,55,243,212,169,104,104,119,215,142,127,116,189,213,178]], "victory by unchallenged hit count", "victory by concession",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(48, [4,41], [[226,112,214,23,55,183,242,127,161,74,14,154,51,98,251,70,109,213,105,198,254,150,6,17,148,146,152,104,54,81,201,57],[138,170,191,94,10,161,142,157,157,6,26,233,215,64,44,7,199,14,7,31,152,24,84,17,197,153,117,9,207,10,154,193],[218,207,73,193,177,90,184,211,169,45,239,149,214,32,28,66,222,240,175,197,133,205,206,2,89,224,237,194,106,167,32,224],[245,179,92,185,169,75,120,46,149,79,87,64,119,245,102,152,6,54,69,147,168,145,217,220,75,115,124,72,52,31,82,95],[51,199,176,79,65,124,141,114,200,251,228,225,162,51,211,197,194,137,235,84,121,181,253,100,88,130,133,72,90,194,77,44],[152,50,29,162,188,186,85,110,202,213,142,99,182,35,13,247,28,215,55,243,212,169,104,104,119,215,142,127,116,189,213,178]], "victory by unchallenged hit count", "victory by concession",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(179,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(11,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by abandonment",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(11,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(47,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("614nab",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(47,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(4, ["a0znfc","b80fpp","b80fpp","a0znfc","7i7mao","w5slk8","b80fpp","614nab","w5slk8","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","w5slk8","victory by abandonment","game resolved in an emergency","b80fpp","victory by unchallenged hit count","614nab","victory by concession","game resolved in an emergency","victory by concession","verified victory by hit count","b80fpp","victory by concession","game resolved in an emergency","w5slk8","victory by abandonment","b80fpp","7i7mao","victory by unchallenged hit count","b80fpp","a0znfc","victory by unchallenged hit count","614nab","verified victory by hit count","victory by unchallenged hit count","7i7mao","w5slk8","verified victory by hit count","victory by concession","verified victory by hit count","a0znfc","7i7mao","verified victory by hit count","victory by abandonment","7i7mao","614nab","06mwbi","victory by unchallenged hit count","victory by unanswered challenge","w5slk8","a0znfc","victory by unanswered challenge","verified victory by hit count","614nab","w5slk8","b80fpp","victory by concession","game resolved in an emergency","06mwbi","victory by abandonment","victory by unchallenged hit count"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("7i7mao",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(4, ["a0znfc","b80fpp","b80fpp","a0znfc","7i7mao","w5slk8","b80fpp","614nab","w5slk8","verified victory by hit count","victory by unchallenged hit count","victory by unanswered challenge","victory by abandonment","game resolved in an emergency","w5slk8","victory by abandonment","game resolved in an emergency","b80fpp","victory by unchallenged hit count","614nab","victory by concession","game resolved in an emergency","victory by concession","verified victory by hit count","b80fpp","victory by concession","game resolved in an emergency","w5slk8","victory by abandonment","b80fpp","7i7mao","victory by unchallenged hit count","b80fpp","a0znfc","victory by unchallenged hit count","614nab","verified victory by hit count","victory by unchallenged hit count","7i7mao","w5slk8","verified victory by hit count","victory by concession","verified victory by hit count","a0znfc","7i7mao","verified victory by hit count","victory by abandonment","7i7mao","614nab","06mwbi","victory by unchallenged hit count","victory by unanswered challenge","w5slk8","a0znfc","victory by unanswered challenge","verified victory by hit count","614nab","w5slk8","b80fpp","victory by concession","game resolved in an emergency","06mwbi","victory by abandonment","victory by unchallenged hit count"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("06mwbi",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(9,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(179,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("z4n2cg",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(179,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("06mwbi",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(2,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(2,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
