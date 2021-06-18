pragma experimental ABIEncoderV2;
import "../Core/Conventions/ContractRoleConvention.sol";

contract ProxyContractRoleConvention  is ContractRoleConvention  {

       function testroleSign(ContractRole  contractRole) public pure returns (int8 ){
    return roleSign(contractRole);
   }


}