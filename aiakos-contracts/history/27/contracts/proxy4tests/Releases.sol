pragma experimental ABIEncoderV2;
import "../Releases.sol";

contract ProxyReleases  {

      using Releases for Releases.Release;

  Releases.Release varRelease;
   function testinit(string memory releaseversion,bytes32  releasesha256Hash,uint  releaseapprovalCounter,bool  releaseinitialized,bool  releaseapproved, string memory version, bytes32  sha256Hash) public  {
    varRelease = Releases.Release(releaseversion,releasesha256Hash,releaseapprovalCounter,releaseinitialized,releaseapproved);
    varRelease.init(version,sha256Hash);
   }

   function testcheck(string memory releaseversion,bytes32  releasesha256Hash,uint  releaseapprovalCounter,bool  releaseinitialized,bool  releaseapproved, bytes32  sha256Hash) public  {
    varRelease = Releases.Release(releaseversion,releasesha256Hash,releaseapprovalCounter,releaseinitialized,releaseapproved);
    varRelease.check(sha256Hash);
   }

   function testaddApproval(string memory releaseversion,bytes32  releasesha256Hash,uint  releaseapprovalCounter,bool  releaseinitialized,bool  releaseapproved, address  maintainer, uint  requiredNumberOfMaintainers) public  returns (bool , bool ){
    varRelease = Releases.Release(releaseversion,releasesha256Hash,releaseapprovalCounter,releaseinitialized,releaseapproved);
    return varRelease.addApproval(maintainer,requiredNumberOfMaintainers);
   }


}