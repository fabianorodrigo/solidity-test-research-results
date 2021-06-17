import "../RelevantToken.sol";

contract ProxyRelevantToken  is RelevantToken  {

       function testpreMintTokens(uint256  _toBeMinted) public  returns (bool ){
    return preMintTokens(_toBeMinted);
   }

   function testnewTokensForConstantPhase(uint256  _totalTokens, uint256  _roundsPassed) public view returns (uint256 ){
    return newTokensForConstantPhase(_totalTokens,_roundsPassed);
   }

   function testnewTokensForDecayPhase(uint256  _roundsPassed) public  returns (uint256 ){
    return newTokensForDecayPhase(_roundsPassed);
   }

   function testnewTokensForCrossingDecay() public view returns (uint256 ){
    return newTokensForCrossingDecay();
   }

   function testnewTokensForCrossingConst(uint256  _currentRound) public view returns (uint256 ){
    return newTokensForCrossingConst(_currentRound);
   }

   function testsplitRewards(uint256  _releasableTokens) public  {
    splitRewards(_releasableTokens);
   }

   function testtoDevFund() public  returns (bool ){
    return toDevFund();
   }


}