// Main Mint Component
import { useState } from "react";
import { ethers, BigNumber} from 'ethers';
import cyberNomadNFT from '../CyberNomadNFT.json';
//const dotenv = require("dotenv");
//dotenv.config();

const cyberNomadNFTAddress = '0x8a6e34eaA3E13c5E4D871e81545837063E21a246';
const MainMint = ({ accounts, setAccounts}) => {
    // Updating the min amounts and setting via state
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            // Connecting to the blockchain via ethers lib
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // Get signer to make transaction
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                // Contract details to access contract functions
                cyberNomadNFTAddress,
                cyberNomadNFT.abi,
                signer
            );

            // Try Catch Blocks
            try{
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response: ', response);
            } 
            catch(err){
                console.log('error: ', err);
            }
        }
    }

    // Function for handling decrements
    const handleDecrement = () => {
        // If less than one simply return
        if (mintAmount <= 1) return;
        // Set mintAmount
        setMintAmount(mintAmount - 1);
    };

    // Function for handling increments
    const handleIncrement = () => {
        // If greater than 3 (maxWalletAmount) return
        if (mintAmount >= 3) return;
        // Set mintAmount
        setMintAmount(mintAmount + 1);
    };

    // Elements
    return (
        <div>
            <h1>CyberNomads</h1>
            <p>Wth the days of pre-historic life and liberties a thing of past, society has been moulded and shaped by global entities and corporations. Who despite provide major improvements to life overall, have altered the the very core of what it meant to be human. However, there still remains a group of individuals, who grasp onto the remaining facets of what life use to be like. They are known as the Cyber Nomads, societies last bastions of the old world. Mint Today</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}></input>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>

            ) : (
                <p>You must be connected to mint Nomads</p>
            )}
        </div>
    )
};

export default MainMint;