// This script demonstrates access to the NFT API via the Alchemy SDK
import { Network, Alchemy } from "alchemy-sdk"

// Optional config object, but defaults to demo api-key and eth-mainnet
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key
  network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(settings)

// Print owner's wallet address
const ownerAddr = "0xshah.eth"
console.log("Fetching NFTs for address: ", ownerAddr)
console.log("...")

// Print total NFT count returned in the reponse
const nftsForOwner = await alchemy.nft.getNftsForOwner("0xshah.eth")
console.log("Number of NFTs found: ", nftsForOwner.totalCount)
console.log("...")

// Fetch metadata for a particular NFT
console.log("Fetching metadata for a Crypto Coven NFT...")
const response = await alchemy.nft.getNftMetadata(
  "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  "1590"
)

// Uncomment this line to see the full api response
// console.log(response)

// Print some commonly used fields
console.log("NFT name: ", response.title)
console.log("Token type: ", response.tokenType)
console.log("tokenUri: ", response.tokenUri.gateway)
console.log("image url: ", response.rawMetadata.image)
console.log("Time last updated: ", response.timeLastUpdated)
console.log("===")
