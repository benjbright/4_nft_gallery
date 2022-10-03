// import Head from "next/head"
// import Image from "next/image"
import { useState } from "react"
import { api_key } from "../secrets.json"
import { NftCard } from "../components/NftCard"

const Home = () => {
  // Create two state variables to store the wallet address and collection address from the input fields
  const [walletAddress, setWalletAddress] = useState("")
  const [collectionAddress, setCollectionAddress] = useState("")

  // Create state variable to store NFTs fetched from the Alchemy NFT API
  const [NFTs, setNFTs] = useState([])

  // Check if user wants to search by collection or wallet address
  const [fetchForCollection, setFetchForCollection] = useState(false)

  // Add the fetchNFTs function
  const fetchNFTs = async () => {
    let nfts
    console.log("Fetching NFTs")
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`
    var requestOptions = {
      method: "GET",
    }

    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${walletAddress}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log("Fetching NFTs for collection owned by address")
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log("NFTs:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collectionAddress.length) {
      var requestOptions = {
        method: "GET",
      }
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          onChange={(e) => setWalletAddress(e.target.value)}
          value={walletAddress}
          type={"text"}
          placeholder="Add the wallet address"
          disabled={fetchForCollection}
        ></input>
        <input
          onChange={(e) => setCollectionAddress(e.target.value)}
          value={collectionAddress}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label className="text-gray-400">
          <input
            onChange={(e) => setFetchForCollection(e.target.checked)}
            type={"checkbox"}
            className="mr-2"
          />
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }}
        >
          Let's Go!
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft, i) => {
            return <NftCard nft={nft} key={i}></NftCard>
          })}
      </div>
    </div>
  )
}

export default Home
