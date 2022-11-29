// NavBar Component
import React from "react";
import {Box, Button, Flex, Image, Link, Spacer} from "@chakra-ui/react";
import Email from "../assets/email_32x32.png";
import Twitter from "../assets/twitter_32x32.png";
import Facebook from "../assets/facebook_32x32.png";

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
        <Flex justify="space-between" align="center" padding="30px">
            {/* Social Links */}
            <Flex justify="space-between" width="40%" padding="0 75px">
                <Link href="https://discord.com">
                    <Image src={Facebook} boxsize="42px" margin="0 15px"/>
                </Link>
                <Link href="">
                    <Image src={Email} boxsize="42px" margin="0 15px"/>
                </Link>
                <Link href="https://twitter.com/home">
                    <Image src={Twitter} boxsize="42px" margin="0 15px"/>
                </Link>                                
            </Flex>

            {/* Menu Items*/}
            <Flex justify="space-around" algin="center" width="40%" padding="30px">
                <Box margin="0 15px">Road Map</Box>
                <Spacer/>
                <Box margin="0 15px">Mint</Box>
                <Spacer/>
                <Box margin="0 15px">The Team</Box>
                <Spacer/>
            {/* Connections - show tag when connected and button when not */}
            {isConnected ?(
                <Box margin="0 15px">Connected</Box>
            ): (
                <Button 
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 15px"
                onClick={connectAccount}>Connect</Button>
            )}                
            </Flex>
        </Flex>
    )
};

export default NavBar;