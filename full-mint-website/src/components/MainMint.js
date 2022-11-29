// Main Mint Component
import { useState } from "react";
import { ethers, BigNumber} from 'ethers';
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
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
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.002 * mintAmount).toString())
                });
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
        <Flex justify="center" algin="center" height="100hv" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow= "0 5px #000000">CyberNomads</Text>
                    <Text fontsize="40px" letterSpacing="2px" fontFamily="VT323" textShadow="0 2px 2px #000000" position={"relative"}>
                        Pre-historic life is a thing of the past. 
                        Society has been moulded and shaped by global corporations and have altered the very core of what it means to be human. 
                        However, there still remains a group of individuals, who grasp onto the remaining facets of what life use to be like. They are known as the Cyber Nomads, societies last bastions of the old world. Mint Today!
                    </Text>
                </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleDecrement}
                        >-</Button>

                        <Input 
                        readOnly
                        fontFamily="inherit"
                        width="100px"
                        height="40px"
                        textAlign="center"
                        paddingLeft="19px"
                        marginTop="10px"
                        type="number"
                        value={mintAmount}></Input>

                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleIncrement}
                        >+</Button>  
                                              
                    </Flex>
                    <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"                   
                    onClick={handleMint}
                    >Mint Now</Button>
                </div>
            ) : (
                <Text
                marginTop="70px"
                fontSize="30px"
                letterSpacing="2px"
                fontFamily="VT323"
                textShadow="0 3px #000000"
                color="#D6517D"
                >You must be connected to mint Nomads</Text>
            )}
            </Box>
        </Flex>
    )
};

export default MainMint;