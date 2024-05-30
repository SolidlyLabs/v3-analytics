import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Currency, CurrencyAmount, Fraction, Percent, Token } from '@uniswap/sdk-core'
import { SupportedChainId } from 'constants/chains'
import {
  //ArbitrumNetworkInfo,
  //AvalancheNetworkInfo,
  //BaseNetworkInfo,
  //BNBNetworkInfo,
  //CeloNetworkInfo,
  NetworkInfo,
  FantomNetworkInfo,
  ChainId,
} from 'constants/networks'
import JSBI from 'jsbi'
import { TokenAddressMap } from '../state/lists/hooks'
import { TokenData } from 'state/tokens/reducer'
import { PoolData } from 'state/pools/reducer'
//import { OptimismNetworkInfo } from '../constants/networks'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const BLOCK_EXPLORER_PREFIXES: { [chainId: number]: string } = {
  [ChainId.MAINNET]: 'https://etherscan.io',
  [ChainId.FANTOM]: 'https://ftmscan.com',
  [ChainId.ARBITRUM_ONE]: 'https://arbiscan.io',
  //[SupportedChainId.RINKEBY]: 'rinkeby.',
  //[SupportedChainId.GOERLI]: 'goerli.',
  //[SupportedChainId.KOVAN]: 'kovan.',
  [SupportedChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
  [SupportedChainId.BASE]: 'https://basescan.org',
  //[SupportedChainId.OPTIMISTIC_KOVAN]: 'kovan-optimistic.',
}

export function getEtherscanLink(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
  networkVersion: NetworkInfo
): string {
  const prefix = BLOCK_EXPLORER_PREFIXES[networkVersion.chainId] ?? 'https://etherscan.io'

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export const currentTimestamp = () => new Date().getTime()

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

const ONE = new Fraction(1, 1)
export function calculateSlippageAmount(value: CurrencyAmount<Currency>, slippage: Percent): [JSBI, JSBI] {
  if (slippage.lessThan(0) || slippage.greaterThan(ONE)) throw new Error('Unexpected slippage')
  return [value.multiply(ONE.subtract(slippage)).quotient, value.multiply(ONE.add(slippage)).quotient]
}
// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export function feeTierPercent(fee: number): string {
  return (fee / 10000).toPrecision(1) + '%'
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function hideTrollToken(value: TokenData): value is TokenData {
  return !/SERAPH|KENNETH|CUNT|EVAWAT|JITKILL|BATMAN\/SPIDER|ANON|ONL2S|REWARDER|unknown|HARDERTHANUNIV4|RDSOON@ND|LOL*|UNGRATEFUL|MOVEFORBESTAPRSONARBITRUM/.test(
    value.symbol
  )
}

export function hideTrollPool(value: PoolData): value is PoolData {
  return hideTrollToken(value.token0 as unknown as TokenData) && hideTrollToken(value.token1 as unknown as TokenData)
}
