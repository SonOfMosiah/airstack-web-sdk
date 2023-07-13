import { useLazyQueryWithPagination } from "../useQueryWithPagination";

const query = `query GetNFTs($address: Address!, $blockchain: TokenBlockchain!, $limit: Int) {
  TokenNfts(
    input: {blockchain: $blockchain, limit: $limit, filter: {address: {_eq: $address}}}
  ) {
    TokenNft {
      address
      blockchain
      contentType
      contentValue {
        audio
        animation_url {
          original
        }
        image {
          extraSmall
          medium
          large
          original
          small
        }
        video
      }
      metaData {
        animationUrl
        backgroundColor
        attributes {
          displayType
          maxValue
          value
          trait_type
        }
        description
        externalUrl
        image
        imageData
        youtubeUrl
        name
      }
      tokenURI
      type
      tokenId
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}`;

export type GetNFTsVariables = {
  blockchain: string;
  limit: number;
  address: string;
};

export function useGetNFTs(variables: GetNFTsVariables) {
  return useLazyQueryWithPagination(query, variables);
}