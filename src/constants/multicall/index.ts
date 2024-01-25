import MULTICALL_ABI from './abi.json'

enum ChainId {
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
  BASE = 8453
}

const MULTICALL_NETWORKS: { [chainId: number]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.FANTOM]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.ARBITRUM_ONE]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.AVALANCHE]: '0x0139141Cd4Ee88dF3Cdb65881D411bAE271Ef0C2',
  [ChainId.CELO]: '0x9e824152ADA7574b659585f51e7Da9BeC9F4aC74',
  [ChainId.BASE]: '0x091e99cb1C49331a94dD62755D168E941AbD0693',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
