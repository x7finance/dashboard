import Icon from '../../components/icons';
import { BlockchainType, ChainEnum, ChainScannerLinksEnum } from '../types';
import { SignalSlashIcon } from '@heroicons/react/20/solid';
import { Chain } from 'wagmi';

export function generateChainBase(chain?: BlockchainType) {
  switch (chain) {
    case ChainEnum.erc:
      return ChainScannerLinksEnum.erc;
    case ChainEnum.bsc:
      return ChainScannerLinksEnum.bsc;
    case ChainEnum.polygon:
      return ChainScannerLinksEnum.polygon;
    case ChainEnum.arbitrum:
      return ChainScannerLinksEnum.arbitrum;
    case ChainEnum.optimism:
      return ChainScannerLinksEnum.optimism;
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
      return <Icon glyph={Icon.glyph.ethereum} size={5} />;
    case ChainEnum.bsc:
      return <Icon glyph={Icon.glyph.bsc} size={5} />;
    case ChainEnum.polygon:
      return <Icon glyph={Icon.glyph.polygon} size={5} />;
    case ChainEnum.optimism:
      return <Icon glyph={Icon.glyph.optimism} size={5} />;
    case ChainEnum.arbitrum:
      return <Icon glyph={Icon.glyph.arbitrum} size={5} />;
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

export function providerLinkGenerator(chain: Chain) {
  switch (chain?.id) {
    case ChainEnum.erc: {
      return {
        blast: 'eth-mainnet',
        blockpi: 'ethereum',
        getblock: 'eth',
        pocket: 'eth-mainnet',
      };
    }
    case ChainEnum.bsc: {
      return {
        blast: 'bsc-mainnet',
        blockpi: 'bsc',
        getblock: 'bsc',
        pocket: 'bsc-mainnet',
      };
    }
    case ChainEnum.polygon: {
      return {
        blast: 'polygon-mainnet',
        blockpi: 'polygon',
        getblock: 'matic',
        pocket: 'poly-mainnet',
      };
    }
    case ChainEnum.optimism: {
      return {
        blast: 'optimism-mainnet',
        blockpi: 'optimism',
        getblock: 'op',
        pocket: 'optimism-mainnet',
      };
    }
    case ChainEnum.arbitrum: {
      return {
        blast: 'eth-mainnet',
        blockpi: 'arbitrum',
        getblock: 'arbitrum',
        pocket: 'arbitrum-one',
      };
    }
  }
}
