import { ChainIdentifierEnum, PairsProps } from '../../lib/types';
import { ContractsEnum, ChainScannerLinksEnum } from '../../lib/types';
import { useContractReads, useNetwork } from 'wagmi';

const allPairsAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allPairs',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const X7PairsContract = {
  address: ContractsEnum.XchangeFactory,
  abi: allPairsAbi,
};

export function Pair({ index, pairsLength }: PairsProps) {
  const { chain } = useNetwork();
  const { data } = useContractReads({
    contracts: [
      {
        ...X7PairsContract,
        functionName: 'allPairs',
        args: [index],
      },
    ],
  });

  return (
    <tr key={index}>
      <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {index}
        </div>
      </td>
      <td className="px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell">
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {data?.toString()}
        </div>
      </td>
      <td className="px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell">
        <div className="flex items-center space-x-2">
          <div className="flex flex-shrink-0 space-x-1">
            <a
              href={`https://www.dextools.io/app/en/${generateChainIdentifierLinks(
                chain?.id ?? 0
              )}/pair-explorer/${data?.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100"
            >
              <span>View Chart</span>
            </a>
          </div>
        </div>
      </td>
      <td className="relative py-3.5 pl-3 pr-4 text-right text-xs  font-medium text-slate-500  dark:text-slate-400 sm:pr-6">
        <div className="flex items-center space-x-2">
          <div className="flex flex-shrink-0 space-x-1">
            <a
              href={`${generateScannerLinks(
                chain?.id ?? 0
              )}/address/${data?.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100"
            >
              <span>View Chart</span>
            </a>
          </div>
        </div>
      </td>
    </tr>
  );

  function generateScannerLinks(chainId: any) {
    switch (chainId.toString()) {
      case '1':
        return ChainScannerLinksEnum.erc;
      case '10':
        return ChainScannerLinksEnum.optimism;
      case '56':
        return ChainScannerLinksEnum.bsc;
      case '137':
        return ChainScannerLinksEnum.polygon;
      case '42161':
        return ChainScannerLinksEnum.arbitrum;
      default:
        return ChainScannerLinksEnum.erc;
    }
  }

  function generateChainIdentifierLinks(chainId: any) {
    switch (chainId.toString()) {
      case '1':
        return ChainIdentifierEnum.erc;
      case '10':
        return ChainIdentifierEnum.optimism;
      case '56':
        return ChainIdentifierEnum.bsc;
      case '137':
        return ChainIdentifierEnum.polygon;
      case '42161':
        return ChainIdentifierEnum.arbitrum;
      default:
        return ChainIdentifierEnum.erc;
    }
  }
}
