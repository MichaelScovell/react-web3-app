// NavBar Component
import { Button } from "@chakra-ui/react";
import React from "react";

const NavBar = ({ accounts, setAccounts}) => {
    // Defining boolean to detect whether there is a connected account
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        // Connecting an account from metamask
        // Retrieving the accounts and setting the account
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccount",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div>
            {/* Social Links */}
            <div>Email</div>
            <div>Twitter</div>
            <div>Discord</div>

            {/* Menu Items*/}
            <div>Project Road Map</div>
            <div>Mint</div>
            <div>Meet the Team</div>

            {/* Connections */}
            {isConnected ? (
                <p>Connected</p>
            ):(
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    )
};

export default NavBar;