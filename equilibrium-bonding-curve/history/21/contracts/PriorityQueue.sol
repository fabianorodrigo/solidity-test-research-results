pragma solidity ^0.4.0;

import "./zeppelin/SafeMath.sol";


/**
 * @title PriorityQueue
 * @dev A priority queue implementation.
 */
contract PriorityQueue {
    using SafeMath for uint256;

    /*
     *  Storage
     */

    struct Order {
      uint    id;
      uint    price;
      uint    amount;
      address owner;
    }
    // order ID -> Order Struct
    uint  orderIndex = 0;
    mapping (uint => Order) public mOrders;

    address owner;
    uint256[] heapList;
    uint256 public currentSize;


    /*
     *  Modifiers
     */

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    /*
     * Constructor
     */

    constructor() public {
        owner = msg.sender;
        heapList = [0];
        currentSize = 0;
    }


    /*
     * Internal functions
     */

    /**
     * @dev Inserts an element into the priority queue.
     * @param _price Priority to insert.
     * @param _amount Some additional value.
     */
    function insertOrder(uint256 _price, uint256 _amount) public {
        orderIndex = orderIndex.add(1);
        uint256 element = _price << 128 | orderIndex;
        heapList.push(element);
        currentSize = currentSize.add(1);
        _percUp(currentSize);
        // insert struct
        mOrders[orderIndex] = Order(orderIndex, _price, _amount, msg.sender);

    }

    /**
     * @dev Returns the top element of the heap.
     * @return The smallest element in the priority queue.
     */
    function getMinOrder() public view returns (uint256, uint256, uint256, address) {
        uint256 _element = heapList[1];
        uint256 _price = _element >> 128;
        uint256 _orderId = uint256(uint128(_element));
        return (_orderId, _price, mOrders[_orderId].amount, mOrders[_orderId].owner);
    }

    /**
     * @dev Returns the top element of the heap.
     * @return The smallest element in the priority queue.
     */
    function getMin() public view returns (uint256, uint256) {
        return _splitElement(heapList[1]);
    }

    /**
     * @dev Deletes the top element of the heap and shifts everything up.
     * @return The smallest element in the priorty queue.
     */
    function delMin() public onlyOwner returns (uint256, uint256) {
        uint256 retVal = heapList[1];
        heapList[1] = heapList[currentSize];
        delete heapList[currentSize];
        currentSize = currentSize.sub(1);
        _percDown(1);
        heapList.length = heapList.length.sub(1);
        return _splitElement(retVal);
    }


    /*
     * Private functions
     */

    /**
     * @dev Determines the minimum child of a given node in the tree.
     * @param _index Index of the node in the tree.
     * @return The smallest child node.
     */
    function _minChild(uint256 _index) private view returns (uint256) {
        if (_index.mul(2).add(1) > currentSize) {
            return _index.mul(2);
        } else {
            if (heapList[_index.mul(2)] < heapList[_index.mul(2).add(1)]) {
                return _index.mul(2);
            } else {
                return _index.mul(2).add(1);
            }
        }
    }

    /**
     * @dev Bubbles the element at some index up.
     */
    function _percUp(uint256 _index) private {
        uint256 index = _index;
        uint256 j = index;
        uint256 newVal = heapList[index];
        while (newVal < heapList[index.div(2)]) {
            heapList[index] = heapList[index.div(2)];
            index = index.div(2);
        }
        if (index != j) heapList[index] = newVal;
    }

    /**
     * @dev Bubbles the element at some index down.
     */
    function _percDown(uint256 _index) private {
        uint256 index = _index;
        uint256 j = index;
        uint256 newVal = heapList[index];
        uint256 mc = _minChild(index);
        while (mc <= currentSize && newVal > heapList[mc]) {
            heapList[index] = heapList[mc];
            index = mc;
            mc = _minChild(index);
        }
        if (index != j) heapList[index] = newVal;
    }

    /**
     * @dev Split an element into its priority and value.
     * @param _element Element to decode.
     * @return A tuple containing the priority and value.
     */
    function _splitElement(uint256 _element) private pure returns (uint256, uint256) {
        uint256 _price = _element >> 128;
        uint256 _id = uint256(uint128(_element));
        return (_price, _id);
    }
}
