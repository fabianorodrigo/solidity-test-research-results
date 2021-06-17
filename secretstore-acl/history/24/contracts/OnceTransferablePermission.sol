//! The ACL storage with once-transfered permission.
//!
//! Copyright 2017 Svyatoslav Nikolsky, Parity Technologies Ltd.
//!
//! Licensed under the Apache License, Version 2.0 (the "License");
//! you may not use this file except in compliance with the License.
//! You may obtain a copy of the License at
//!
//!     http://www.apache.org/licenses/LICENSE-2.0
//!
//! Unless required by applicable law or agreed to in writing, software
//! distributed under the License is distributed on an "AS IS" BASIS,
//! WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//! See the License for the specific language governing permissions and
//! limitations under the License.

pragma solidity ^0.4.18;

import "./AclStorage.sol";


/// ACL storage contract interface with permission, which can only be transferred once.
/// This is an artificial limitation to make sure this contract will be used for test
/// scenario only.
contract OnceTransferablePermission is ACLStorage {
	/// Single key entry.
	struct KeyEntry {
		/// Current permission 'owner'.
		address owner;
		/// Is permission transfered?
		bool isTransfered;
	}

	/// Check key permissions.
	function checkPermissions(address requester, bytes32 serverKeyId) external constant returns (bool) {
		KeyEntry storage key = keys[serverKeyId];
		return key.owner == requester;
	}

	/// Create key entry.
	function createKey(bytes32 serverKeyId) public {
		KeyEntry storage key = keys[serverKeyId];
		require(key.owner == address(0));
		key.owner = msg.sender;
	}

	/// Transfer key permission.
	function transferPermission(bytes32 serverKeyId, address newOwner) public {
		require(newOwner != address(0));

		KeyEntry storage key = keys[serverKeyId];
		require(!key.isTransfered && key.owner == msg.sender);
		key.isTransfered = true;
		key.owner = newOwner;
	}

	/// Key entries.
	mapping (bytes32 => KeyEntry) private keys;
}
