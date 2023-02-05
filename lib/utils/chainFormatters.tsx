import { BSCIcon } from '../../components/svgs/bsc';
import { ErcIcon } from '../../components/svgs/erc';
import { PolygonIcon } from '../../components/svgs/polygon';
import {
  ARBISCAN_URL,
  BSCSCAN_URL,
  ETHERSCAN_URL,
  OPTIMISTIC_URL,
  POLYSCAN_URL,
} from '../constants';
import { BlockchainType, ChainEnum } from '../types';
import { SignalSlashIcon } from '@heroicons/react/20/solid';

export function generateChainBase(chain?: BlockchainType) {
  switch (chain) {
    case ChainEnum.erc:
      return ETHERSCAN_URL;
    case ChainEnum.bsc:
      return BSCSCAN_URL;
    case ChainEnum.polygon:
      return POLYSCAN_URL;
    case ChainEnum.arbitrum:
      return ARBISCAN_URL;
    case ChainEnum.optimism:
      return OPTIMISTIC_URL;
    default:
      ``;
  }
}

export function generateChainAbbreviation(chain?: BlockchainType) {
  switch (chain) {
    case ChainEnum.erc:
      return 'Ξ';
    case ChainEnum.bsc:
      return 'BNB ';
    case ChainEnum.arbitrum:
      return 'Ξ';
    case ChainEnum.optimism:
      return 'Ξ';
    case ChainEnum.polygon:
      return 'MATIC ';
    default:
      return 'Ξ';
  }
}

export function generateNativeQueryCommands(chainId?: BlockchainType) {
  switch (chainId) {
    case ChainEnum.erc:
      return { nativeCurrency: 'ethereum' };
    case ChainEnum.bsc:
      return { nativeCurrency: 'binancecoin' };
    case ChainEnum.polygon:
      return { nativeCurrency: 'matic' };
    case ChainEnum.optimism:
      return { nativeCurrency: 'ethereum' };
    case ChainEnum.arbitrum:
      return { nativeCurrency: 'ethereum' };
    default:
      return { nativeCurrency: 'ethereum' };
  }
}

export function renderConnectedChain(chain?: BlockchainType) {
  switch (chain) {
    case ChainEnum.erc:
      return <ErcIcon />;
    case ChainEnum.bsc:
      return <BSCIcon />;
    case ChainEnum.polygon:
      return <PolygonIcon />;
    case ChainEnum.offline:
      return (
        <SignalSlashIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
      );
    default:
      return (
        <SignalSlashIcon className="h-5 w-5 text-black" aria-hidden="true" />
      );
  }
}
