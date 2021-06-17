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
    let result = await contractMerkleShip.emergencyStop("game resolved in an emergency",{from: accounts[0]});
  });
  it('Should fail emergencyStop(string) when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyStop("game resolved in an emergency",{from: accounts[9]}),'revert');
  });
  it('Should execute proposeGame(uint96,bytes32) WHEN isStopped==false,msg.value==_wager', async () => {
    let result = await contractMerkleShip.proposeGame(99, [4,39,75,216,227,80,218,250,41,42,119,219,62,96,43,119,22,75,25,192,207,234,222,7,123,103,76,47,78,190,10,248],{from: accounts[0],value:99});
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by concession",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(99, [4,39,75,216,227,80,218,250,41,42,119,219,62,96,43,119,22,75,25,192,207,234,222,7,123,103,76,47,78,190,10,248],{from: accounts[0],value:99}),'revert');
  });
  it('Should fail proposeGame(uint96,bytes32) when NOT comply with: msg.value == _wager', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.proposeGame(100, [4,39,75,216,227,80,218,250,41,42,119,219,62,96,43,119,22,75,25,192,207,234,222,7,123,103,76,47,78,190,10,248],{from: accounts[0],value:99}),'revert');
  });
  it('Should execute acceptGame(uint32,bytes32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.acceptGame(49, [190,96,210,55,85,123,203,185,87,108,233,85,89,26,37,118,189,222,42,247,108,55,216,18,205,159,45,8,119,239,157,143],{from: accounts[0]});
  });
  it('Should fail acceptGame(uint32,bytes32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("ly75b",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.acceptGame(49, [190,96,210,55,85,123,203,185,87,108,233,85,89,26,37,118,189,222,42,247,108,55,216,18,205,159,45,8,119,239,157,143],{from: accounts[0]}),'revert');
  });
  it('Should execute cancelProposedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.cancelProposedGame(47,{from: accounts[0]});
  });
  it('Should fail cancelProposedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.cancelProposedGame(47,{from: accounts[0]}),'revert');
  });
  it('Should execute guessAndReveal(uint32,uint8[2],bytes32[6],string,string) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.guessAndReveal(49, [47,11], [[199,119,3,178,20,180,193,167,115,222,247,199,251,39,126,83,255,63,113,120,23,129,169,202,207,95,244,55,112,102,51,236],[178,111,75,48,210,199,168,171,83,228,32,138,90,48,171,138,165,181,212,19,108,138,207,194,96,27,68,16,157,50,32,127],[252,22,202,90,237,189,184,175,117,242,129,90,250,157,131,145,61,4,56,69,125,250,100,137,142,200,159,188,11,121,196,119],[117,86,14,237,73,4,199,142,2,204,122,189,83,214,86,80,102,41,143,89,90,52,120,15,246,89,54,40,101,55,73,46],[170,13,77,69,178,218,76,130,9,226,160,145,108,100,89,169,14,10,154,210,57,242,30,229,187,207,129,59,42,191,237,45],[23,86,100,119,127,222,41,46,52,240,41,252,185,188,238,103,77,202,247,242,9,78,196,10,238,85,13,204,196,137,153,67]], "victory by unanswered challenge", "victory by abandonment",{from: accounts[0]});
  });
  it('Should fail guessAndReveal(uint32,uint8[2],bytes32[6],string,string) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.guessAndReveal(49, [47,11], [[199,119,3,178,20,180,193,167,115,222,247,199,251,39,126,83,255,63,113,120,23,129,169,202,207,95,244,55,112,102,51,236],[178,111,75,48,210,199,168,171,83,228,32,138,90,48,171,138,165,181,212,19,108,138,207,194,96,27,68,16,157,50,32,127],[252,22,202,90,237,189,184,175,117,242,129,90,250,157,131,145,61,4,56,69,125,250,100,137,142,200,159,188,11,121,196,119],[117,86,14,237,73,4,199,142,2,204,122,189,83,214,86,80,102,41,143,89,90,52,120,15,246,89,54,40,101,55,73,46],[170,13,77,69,178,218,76,130,9,226,160,145,108,100,89,169,14,10,154,210,57,242,30,229,187,207,129,59,42,191,237,45],[23,86,100,119,127,222,41,46,52,240,41,252,185,188,238,103,77,202,247,242,9,78,196,10,238,85,13,204,196,137,153,67]], "victory by unanswered challenge", "victory by abandonment",{from: accounts[0]}),'revert');
  });
  it('Should execute resolveAbandonedGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]});
  });
  it('Should fail resolveAbandonedGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("quvkgk",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveAbandonedGame(4,{from: accounts[0]}),'revert');
  });
  it('Should execute concedeGame(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.concedeGame(63,{from: accounts[0]});
  });
  it('Should fail concedeGame(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("ly75b",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.concedeGame(63,{from: accounts[0]}),'revert');
  });
  it('Should execute challengeVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.challengeVictory(64,{from: accounts[0]});
  });
  it('Should fail challengeVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("verified victory by hit count",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.challengeVictory(64,{from: accounts[0]}),'revert');
  });
  it('Should execute answerChallenge(uint32,string[64]) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.answerChallenge(13, ["victory by concession","victory by concession","37wjnm","victory by unanswered challenge","verified victory by hit count","ly75b","game resolved in an emergency","quvkgk","victory by abandonment","quvkgk","game resolved in an emergency","victory by abandonment","victory by concession","37wjnm","37wjnm","victory by unanswered challenge","victory by unanswered challenge","ly75b","37wjnm","game resolved in an emergency","victory by unchallenged hit count","verified victory by hit count","victory by abandonment","game resolved in an emergency","sl4g6m","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","6jco9q","victory by concession","victory by unchallenged hit count","victory by concession","quvkgk","sl4g6m","victory by unchallenged hit count","q1phck","ghndt","victory by abandonment","37wjnm","game resolved in an emergency","victory by unchallenged hit count","q1phck","sl4g6m","itlkxr","victory by concession","victory by concession","verified victory by hit count","37wjnm","victory by concession","sl4g6m","victory by concession","victory by concession","game resolved in an emergency","verified victory by hit count","ghndt","6jco9q","victory by abandonment","sl4g6m","verified victory by hit count","0wfhk","victory by unchallenged hit count","victory by unanswered challenge","0wfhk","itlkxr"],{from: accounts[0]});
  });
  it('Should fail answerChallenge(uint32,string[64]) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("victory by unanswered challenge",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.answerChallenge(13, ["victory by concession","victory by concession","37wjnm","victory by unanswered challenge","verified victory by hit count","ly75b","game resolved in an emergency","quvkgk","victory by abandonment","quvkgk","game resolved in an emergency","victory by abandonment","victory by concession","37wjnm","37wjnm","victory by unanswered challenge","victory by unanswered challenge","ly75b","37wjnm","game resolved in an emergency","victory by unchallenged hit count","verified victory by hit count","victory by abandonment","game resolved in an emergency","sl4g6m","game resolved in an emergency","victory by unchallenged hit count","victory by unchallenged hit count","6jco9q","victory by concession","victory by unchallenged hit count","victory by concession","quvkgk","sl4g6m","victory by unchallenged hit count","q1phck","ghndt","victory by abandonment","37wjnm","game resolved in an emergency","victory by unchallenged hit count","q1phck","sl4g6m","itlkxr","victory by concession","victory by concession","verified victory by hit count","37wjnm","victory by concession","sl4g6m","victory by concession","victory by concession","game resolved in an emergency","verified victory by hit count","ghndt","6jco9q","victory by abandonment","sl4g6m","verified victory by hit count","0wfhk","victory by unchallenged hit count","victory by unanswered challenge","0wfhk","itlkxr"],{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnclaimedVictory(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnclaimedVictory(2,{from: accounts[0]});
  });
  it('Should fail resolveUnclaimedVictory(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("ghndt",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnclaimedVictory(2,{from: accounts[0]}),'revert');
  });
  it('Should execute resolveUnansweredChallenge(uint32) WHEN isStopped==false', async () => {
    let result = await contractMerkleShip.resolveUnansweredChallenge(180,{from: accounts[0]});
  });
  it('Should fail resolveUnansweredChallenge(uint32) when NOT comply with: isStopped == false', async () => {
    await contractMerkleShip.emergencyStop("6jco9q",{from:accounts[0]});
    let result = await truffleAssert.fails(contractMerkleShip.resolveUnansweredChallenge(180,{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN userBalance>0', async () => {
    let result = await contractMerkleShip.withdraw({from: accounts[0]});
  });
  it('Should execute emergencyResolve(uint32) WHEN isStopped==true', async () => {
    await contractMerkleShip.emergencyStop("itlkxr",{from:accounts[0]});
    let result = await contractMerkleShip.emergencyResolve(179,{from: accounts[0]});
  });
  it('Should fail emergencyResolve(uint32) when NOT comply with: isStopped == true', async () => {
    let result = await truffleAssert.fails(contractMerkleShip.emergencyResolve(179,{from: accounts[0]}),'revert');
  });
  it('Should execute getBalance()', async () => {
    let result = await contractMerkleShip.getBalance({from: accounts[0]});
  });
});
