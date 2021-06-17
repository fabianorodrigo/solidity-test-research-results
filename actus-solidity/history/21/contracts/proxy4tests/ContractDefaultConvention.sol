pragma experimental ABIEncoderV2;
import "../Core/Conventions/ContractDefaultConvention.sol";

contract ProxyContractDefaultConvention  is ContractDefaultConvention  {

       function testperformanceIndicator(ContractStatus  contractStatus) public pure returns (int8 ){
    return performanceIndicator(contractStatus);
   }


}