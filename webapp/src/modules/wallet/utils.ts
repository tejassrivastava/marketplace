import { Eth } from 'web3x/eth'
import { Provider } from 'decentraland-dapps/dist/modules/wallet/types'
import {
  getConnectedProvider,
  getNetworkProvider
} from 'decentraland-dapps/dist/lib/eth'
import { LegacyProviderAdapter } from 'web3x/providers'
import { ethers } from 'ethers'

export const TRANSACTIONS_API_URL = process.env.REACT_APP_TRANSACTIONS_API_URL

export const isENSAddress = (address: string) => {
  return address.includes('.eth')
}

export const resolveENSname = async (name: string) => {
  const connectedProvider = await getNetworkProvider(
    Number(process.env.REACT_APP_CHAIN_ID)
  )
  const ethersProvider = new ethers.providers.Web3Provider(connectedProvider)
  return await ethersProvider.resolveName(name)
}

export function shortenAddress(address: string) {
  if (address) {
    return address.slice(0, 6) + '...' + address.slice(42 - 5)
  }
}

export function addressEquals(address1?: string, address2?: string) {
  return (
    address1 !== undefined &&
    address2 !== undefined &&
    address1.toLowerCase() === address2.toLowerCase()
  )
}

export async function getEth(): Promise<Eth> {
  const provider: Provider | null = await getConnectedProvider()

  if (!provider) {
    throw new Error('Could not get a valid connected Wallet')
  }

  return new Eth(new LegacyProviderAdapter(provider as any))
}
