import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { arbitrumClient, baseClient, client, fantomClient, optimismClient } from 'apollo/client'

export enum SupportedChainId {
  OMNICHAIN = 0,
  MAINNET = 1,
  FANTOM = 250,
  //RINKEBY = 4,
  //GOERLI = 5,
  //KOVAN = 42,

  ARBITRUM_ONE = 42161,
  //ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  BASE = 8453,
  //OPTIMISTIC_KOVAN = 69,

  //CELO = 42220,
}

export const startTimestampChainId: Record<SupportedChainId, number> = {
  [SupportedChainId.OMNICHAIN]: 1703396228,
  [SupportedChainId.MAINNET]: 1682396228,
  [SupportedChainId.FANTOM]: 1703396228,
  //[SupportedChainId.RINKEBY]: 1598918400,
  //[SupportedChainId.GOERLI]: 1598918400,
  //[SupportedChainId.KOVAN]: 1598918400,
  [SupportedChainId.ARBITRUM_ONE]: 1705575608,
  //[SupportedChainId.ARBITRUM_RINKEBY]: 1630000000,
  [SupportedChainId.OPTIMISM]: 1705575608,
  [SupportedChainId.BASE]: 1703396228,
  //[SupportedChainId.OPTIMISTIC_KOVAN]: 1630000000,
  //[SupportedChainId.CELO]: 1598918400,
}

export const clientToChainId = new Map<ApolloClient<NormalizedCacheObject>, SupportedChainId>([
  [client, SupportedChainId.OMNICHAIN],
  [client, SupportedChainId.MAINNET],
  [fantomClient, SupportedChainId.FANTOM],
  // [rinkebyClient, SupportedChainId.RINKEBY],
  // [goerliClient, SupportedChainId.GOERLI],
  // [kovanClient, SupportedChainId.KOVAN],
  [arbitrumClient, SupportedChainId.ARBITRUM_ONE],
  // [arbitrumRinkebyClient, SupportedChainId.ARBITRUM_RINKEBY],
  [optimismClient, SupportedChainId.OPTIMISM],
  [baseClient, SupportedChainId.BASE],
  // [optimisticKovanClient, SupportedChainId.OPTIMISTIC_KOVAN],
  // [celoClient, SupportedChainId.CELO],
])
