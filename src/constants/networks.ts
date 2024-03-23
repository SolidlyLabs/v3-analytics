import OPTIMISM_LOGO_URL from '../assets/images/optimism.svg'
import ARBITRUM_LOGO_URL from '../assets/images/arbitrum.svg'
import ETHEREUM_LOGO_URL from '../assets/images/ethereum-logo.png'
import FANTOM_LOGO_URL from '../assets/images/fantom-logo.png'
import POLYGON_LOGO_URL from '../assets/images/polygon-logo.png'
import CELO_LOGO_URL from '../assets/images/celo-logo.svg'
import BNB_LOGO_URL from '../assets/images/bnb-logo.svg'
import BASE_LOGO_URL from '../assets/images/base-logo.svg'
import AVALANCHE_LOGO_URL from '../assets/images/avalanche-logo.png'

export enum ChainId {
  OMNICHAIN = 0,
  MAINNET = 1,
  FANTOM = 250,
  GOERLI = 5,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,
  OPTIMISM_SEPOLIA = 11155420,
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
  ARBITRUM_SEPOLIA = 421614,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  CELO = 42220,
  CELO_ALFAJORES = 44787,
  GNOSIS = 100,
  MOONBEAM = 1284,
  BNB = 56,
  AVALANCHE = 43114,
  BASE_GOERLI = 84531,
  BASE = 8453,
}

export enum SupportedNetwork {
  ETHEREUM,
  FANTOM,
  ARBITRUM,
  OPTIMISM,
  //POLYGON,
  //CELO,
  //BNB,
  BASE,
  //AVALANCHE,
  OMNICHAIN,
}

export type NetworkInfo = {
  chainId: ChainId
  id: SupportedNetwork
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
}

export const OmnichainNetworkInfo: NetworkInfo = {
  chainId: ChainId.OMNICHAIN,
  id: SupportedNetwork.OMNICHAIN,
  route: 'omnichain',
  name: 'Omnichain',
  bgColor: '#2dcb4b',
  primaryColor: '#2dcb4b',
  secondaryColor: '#ffffff',
  imageURL: ETHEREUM_LOGO_URL,
}

export const EthereumNetworkInfo: NetworkInfo = {
  chainId: ChainId.MAINNET,
  id: SupportedNetwork.ETHEREUM,
  route: '',
  name: 'Ethereum',
  bgColor: '#cacbcf',
  primaryColor: '#cacbcf',
  secondaryColor: '#ffffff',
  imageURL: ETHEREUM_LOGO_URL,
}

export const FantomNetworkInfo: NetworkInfo = {
  chainId: ChainId.FANTOM,
  id: SupportedNetwork.FANTOM,
  route: 'fantom',
  name: 'Fantom',
  bgColor: '#2d7aff',
  primaryColor: '#2d7aff',
  secondaryColor: '#ffffff',
  imageURL: FANTOM_LOGO_URL,
}

export const ArbitrumNetworkInfo: NetworkInfo = {
  chainId: ChainId.ARBITRUM_ONE,
  id: SupportedNetwork.ARBITRUM,
  route: 'arbitrum',
  name: 'Arbitrum',
  imageURL: ARBITRUM_LOGO_URL,
  bgColor: '#0A294B',
  primaryColor: '#0490ED',
  secondaryColor: '#96BEDC',
}

export const OptimismNetworkInfo: NetworkInfo = {
  chainId: ChainId.OPTIMISM,
  id: SupportedNetwork.OPTIMISM,
  route: 'optimism',
  name: 'Optimism',
  bgColor: '#F01B36',
  primaryColor: '#F01B36',
  secondaryColor: '#FB7876',
  imageURL: OPTIMISM_LOGO_URL,
}
//
//export const PolygonNetworkInfo: NetworkInfo = {
//  chainId: ChainId.POLYGON,
//  id: SupportedNetwork.POLYGON,
//  route: 'polygon',
//  name: 'Polygon',
//  bgColor: '#8247e5',
//  primaryColor: '#8247e5',
//  secondaryColor: '#FB7876',
//  imageURL: POLYGON_LOGO_URL,
//}
//export const CeloNetworkInfo: NetworkInfo = {
//  chainId: ChainId.CELO,
//  id: SupportedNetwork.CELO,
//  route: 'celo',
//  name: 'Celo',
//  bgColor: '#02502F',
//  primaryColor: '#35D07F',
//  secondaryColor: '#9ACDB2',
//  imageURL: CELO_LOGO_URL,
//}
//
//export const BNBNetworkInfo: NetworkInfo = {
//  chainId: ChainId.BNB,
//  id: SupportedNetwork.BNB,
//  route: 'bnb',
//  name: 'BNB Chain',
//  bgColor: '#F0B90B',
//  primaryColor: '#F0B90B',
//  secondaryColor: '#F0B90B',
//  imageURL: BNB_LOGO_URL,
//}
//
export const BaseNetworkInfo: NetworkInfo = {
  chainId: ChainId.BASE,
  id: SupportedNetwork.BASE,
  route: 'base',
  name: 'Base',
  bgColor: '#0052ff',
  primaryColor: '#0052ff',
  secondaryColor: '#0052ff',
  imageURL: BASE_LOGO_URL,
}
//
//export const AvalancheNetworkInfo: NetworkInfo = {
//  chainId: 43114,
//  id: SupportedNetwork.AVALANCHE,
//  route: 'avax',
//  name: 'Avalanche',
//  bgColor: '#e84142',
//  primaryColor: '#e84142',
//  secondaryColor: '#e84142',
//  imageURL: AVALANCHE_LOGO_URL,
//}
//
export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
  OmnichainNetworkInfo,
  EthereumNetworkInfo,
  FantomNetworkInfo,
  ArbitrumNetworkInfo,
  OptimismNetworkInfo,
  BaseNetworkInfo,
]
