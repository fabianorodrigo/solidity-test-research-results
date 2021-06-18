pragma experimental ABIEncoderV2;
import "../MiniMeToken.sol";

contract ProxyMiniMeToken  is MiniMeToken  {

      MiniMeToken.Checkpoint[] varArrayCheckpoint;
   function testdoTransfer(address  _from, address  _to, uint  _amount) public  {
    doTransfer(_from,_to,_amount);
   }

   function testgetValueAt(MiniMeToken.Checkpoint[] memory checkpoints, uint  _block) public  returns (uint ){
    //Since we receive a parameter with storage location 'memory', we have to pass the values to the instance variable in 'storage'
    varArrayCheckpoint = new MiniMeToken.Checkpoint[](checkpoints.length);
    for(uint it__ = 0; it__ < checkpoints.length; it__++){
        varArrayCheckpoint.push(checkpoints[it__]);
    }
    return getValueAt(varArrayCheckpoint,_block);
   }

   function testupdateValueAtNow(MiniMeToken.Checkpoint[] memory checkpoints, uint  _value) public  {
    //Since we receive a parameter with storage location 'memory', we have to pass the values to the instance variable in 'storage'
    varArrayCheckpoint = new MiniMeToken.Checkpoint[](checkpoints.length);
    for(uint it__ = 0; it__ < checkpoints.length; it__++){
        varArrayCheckpoint.push(checkpoints[it__]);
    }
    updateValueAtNow(varArrayCheckpoint,_value);
   }

   function testisContract(address  _addr) public view returns (bool ){
    return isContract(_addr);
   }

   function testmin(uint  a, uint  b) public pure returns (uint ){
    return min(a,b);
   }


}