// NavBar Component
import React from "react";

const NavBar = ({ accounts, setAccounts}) => {
    // Defining boolean to detect whether there is a connected account
    const isConnected = Boolean(accounts[0]);


    async function connectAccount() {
        // Connecting an account from metamask
        // Retrieving the accounts and setting the account
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts)
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

            {/* Connections - show tag when connected and button when not */}
            {isConnected ?(
                <p>Connected</p>
            ): (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    )
};

export default NavBar;