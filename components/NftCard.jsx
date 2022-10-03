import { shortenString } from "../utils/shortenString"

export const NftCard = ({ nft }) => {
  return (
    <div className="w-1/4 flex flex-col">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
          alt="An NFT image"
        />
      </div>
      <div className="flex flex-col gap-y-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div>
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {shortenString(nft.id.tokenId)}</p>
          <p className="text-gray-600">{shortenString(nft.contract.address)}</p>
        </div>
        <div className="text-gray-600">
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  )
}
