// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.12;

import {Script} from "forge-std/Script.sol";
import {WalletFactory} from "../src/WalletFactory.sol";
import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";

contract WalletFactoryScript is Script {
    IEntryPoint constant ENTRYPOINT =
        IEntryPoint(0x0576a174D229E3cFA37253523E645A78A0C91B57);

    function run() external {
        uint256 deployPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployPrivateKey);
        WalletFactory walletFactory = new WalletFactory(ENTRYPOINT);
        vm.stopBroadcast();
    }
}
