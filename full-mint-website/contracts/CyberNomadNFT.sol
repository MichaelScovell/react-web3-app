// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Import OpenZeppelin Contracts
// Grants access to functions that owners can only use (ownable)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Create Contract
// Below contract will inherit the two imports
contract CyberNomadNFT is ERC721, Ownable {
    // Storage Varaibles
    uint256 public mintPrice; // Price of Min
    uint256 public totalSupply; // Current number of NFT minted
    uint256 public maxSupply; // Max num in collection
    uint256 public maxPerWallet; // Max num of NFT per wallet - distrubution help
    bool public isPublicMintEnabled; // Determines if NFT's can be minted
    string internal baseTokenUri; // Determines the URL in which NFT platforms can access the images
    address payable public withdrawWallet; // Withdraw funds from wallet
    mapping(address => uint256) public walletMints; // Determine and track all mints

    // Constructor
    // Two args (Name and Symbol)
    constructor() payable ERC721("CyberNomadNFT", "CN") {
        // Intialize the Varaibles
        mintPrice = 0.002 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // OPTIONAL Set Withdraw Wallet Address
    }

    // Contract Functions
    // Create function for toggling public min (Only owner can call it - hence ownable import)
    // with function isPublicMintEnabled has underscore to indicate argument

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        // Toggling PublicMint based on value of isPublicMintEnabled
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    // Create function for setting basetoken
    // calldata allows us to know it was read
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        // URL where images will be hosted
        baseTokenUri = baseTokenUri_;
    }

    // Create function for obtaining tokenURI
    function tokenURI(uint256 tokenId_)public view override returns (string memory)
    {
        // TokenURI is the function which platforms such as OpenSea use to obtain the images
        // Function is defined in ERC721, but we need to override to our use
        require(_exists(tokenId_), 'Token does not exist!');
        // Getting tokenID and URL and attaching it as json (enables platform to get URL of images - for display)
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenId_),
                    ".json"
                )
            );
    }

    // Create function for withdrawing funds from wallet
    function withdraw() external onlyOwner {
        // Withdrawing funds based on specified address
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        // Fail check for the above call
        require(success, 'withdraw failed');
    }

    // Mint Function
    function mint(uint256 quantity_) public payable {
        // Fail Checks that are performed before minting
        // Checks done to ensure that mintining has been enabled, price is correct, supply is present and user's wallet doesnt exceed specified walletMax

        // Check that public mint is enabled
        require(isPublicMintEnabled, 'minting not enabled');

        // Check that the user is inputting correct value
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');

        // Check that the maxSupply has not been exceeded
        require(totalSupply + quantity_ <= maxSupply, 'sorry, we are sold out');

        // Check that the wallet has not exceeded the number of mints allowed per wallet [stops whalling]
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet,'sorry, that has exceeded the max number allowed per wallet');

        // Loop for performing minting (Check - Effect Interaction Pattern)
        for (uint256 i = 0; i < quantity_; i++) {
            // Below is an example of an (Check - Effect Interaction Pattern)

            // Tracking TokenID
            uint256 newTokenId = totalSupply + 1;

            //Update total supply for tracking
            totalSupply++;

            // Inherited function from ERC721
            // Function will pass address (person that recives NFT, and the tokenID)
            _safeMint(msg.sender, newTokenId);
        }
    }
}
