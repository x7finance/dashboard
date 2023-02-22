import AllPairs from '../../contracts/AllPairs.json';
import ERC20 from '../../contracts/ERC20.json';
import PairsAbi from '../../contracts/PairsAbi.json';
import {
  ContractsEnum,
  ChainNameEnum,
  ChainScannerLinksEnum,
  TokenContractAddresses,
  ChainDenominationEnum,
} from '../../lib/types';
import { chainsArray } from '../../lib/utils/chainFormatters';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useClipboard } from 'use-clipboard-copy';
import { useContractReads, useNetwork } from 'wagmi';

interface PairsProps {
  id: number;
}

export function Pair({ id }: PairsProps) {
  const { chain } = useNetwork();
  const { data } = useContractReads({
    contracts: [
      {
        address: ContractsEnum.XchangeFactory,
        abi: AllPairs,
        functionName: 'allPairs',
        args: [id],
      },
    ],
  });

  const { data: pairTokens } = useContractReads({
    contracts: [
      {
        address: data?.[0],
        abi: PairsAbi,
        functionName: 'token0',
      },
      {
        address: data?.[0],
        abi: PairsAbi,
        functionName: 'token1',
      },
      {
        address: data?.[0],
        abi: PairsAbi,
        functionName: 'getReserves',
      },
    ],
  });

  const token: any =
    pairTokens?.[0] != TokenContractAddresses.WETH
      ? pairTokens?.[0]
      : pairTokens?.[1];

  let pairReserve: string = '0';
  const reserves = pairTokens?.[2];
  if (reserves) {
    const { _reserve0, _reserve1 }: any = pairTokens?.[2];

    const ethReserve =
      pairTokens?.[0] == TokenContractAddresses.WETH ? _reserve0 : _reserve1;

    pairReserve = (ethReserve / 10 ** 18).toFixed(2);
  }

  const { data: erc20Details } = useContractReads({
    contracts: [
      {
        address: token,
        abi: ERC20,
        functionName: 'name',
      },
      {
        address: token,
        abi: ERC20,
        functionName: 'symbol',
      },
    ],
  });

  const name: any = erc20Details?.[0];
  const symbol: any = erc20Details?.[1];

  const clipboard = useClipboard({
    onSuccess() {
      toast.success(<span>Contract Copied</span>, {
        duration: 3000,
        style: {
          border: `none`,
          background: '#000',
          color: 'white',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#000',
        },
      });
    },
  });

  const contractData = data?.[0];

  return (
    <tr key={id}>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-transparent',
          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
        )}
      >
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {symbol ? symbol : 'Awaiting Liquidity...'}
          <div className="relative top-1 ml-2 inline-block lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="flex flex-shrink-0 space-x-1">
                {chainsArray.map((c, id) => (
                  // Check if the identifier is equal to "some-value"
                  <Link
                    href={`https:www.dextools.io/app/en/${c.identifier}/pair-explorer/${contractData}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${contractData}-${id}-chart`}
                    className="opacity-80 hover:opacity-100"
                  >
                    <span>{c.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
          <span>description</span>
          <span
            onClick={() => {
              clipboard.copy(contractData);
            }}
            className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
          >
            Contract
            <span className="ml-0.5">
              <ClipboardDocumentIcon
                className="inline-block h-4 w-4 "
                aria-hidden="true"
              />
              <span className="sr-only">Copy Contract</span>
            </span>
          </span>
        </div>
        {id !== 0 ? (
          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
        ) : null}
      </td>

      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-zinc-900/7.5 dark:border-white/10',
          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
        )}
      >
        <span>{name}</span>
        <span
          onClick={() => {
            clipboard.copy(contractData);
          }}
          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
        >
          <>
            {contractData}
            <span className="ml-0.5">
              <ClipboardDocumentIcon
                className="inline-block h-4 w-4 "
                aria-hidden="true"
              />
              <span className="sr-only">Copy Contract</span>
            </span>
          </>
        </span>
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-zinc-900/7.5 dark:border-white/10',
          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="flex flex-shrink-0 space-x-1">
            {pairReserve}
            {chainsArray.map((c, id) =>
              c.name == checkChainName(chain?.id.toString()) ? (
                <span className="pl-1">
                  {getChainDenomination(chain?.id.toString())}
                </span>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-zinc-900/7.5 dark:border-white/10',
          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="flex flex-shrink-0 space-x-1">
            {chainsArray.map((c, id) =>
              c.name == checkChainName(chain?.id.toString()) ? (
                <Link
                  href={`https:www.dextools.io/app/en/${c.identifier}/pair-explorer/${contractData}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`${contractData}-${id}-chart`}
                  className="opacity-80 hover:opacity-100"
                >
                  <span>{c.icon}</span>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-zinc-900/7.5 dark:border-white/10',
          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
        )}
      >
        {chainsArray.map((c, id) =>
          c.name == checkChainName(chain?.id.toString()) ? (
            <Link
              href={`${generateScannerLinks(
                chain?.id ?? 0
              )}/address/${contractData}`}
              target="_blank"
              rel="noopener noreferrer"
              key={`${contractData}-${id}-chart`}
              className="opacity-80 hover:opacity-100"
            >
              <span>Scanner</span>
            </Link>
          ) : (
            <></>
          )
        )}
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-transparent',
          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
        )}
      >
        <div className="flex w-full justify-center">
          <Link
            href={`https://app.x7.finance/#/swap?outputCurrency=${contractData}`}
            target="_blank"
            rel="noopener noreferrer"
            key={`${contractData}-${id}-chart`}
            className="inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-sky-400/20 py-1 px-3 text-sm font-medium text-sky-600 ring-1 ring-inset ring-sky-400/80 transition hover:bg-sky-400/70 hover:text-white hover:ring-sky-700 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/20 dark:hover:bg-sky-400/10 dark:hover:text-sky-300 dark:hover:ring-sky-300"
          >
            <span>Trade on Xchange</span>
          </Link>
        </div>
        {id !== 0 ? (
          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
        ) : null}
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

  function checkChainName(chainId: any) {
    switch (chainId) {
      case '1':
        return ChainNameEnum.erc;
      case '10':
        return ChainNameEnum.optimism;
      case '56':
        return ChainNameEnum.bsc;
      case '137':
        return ChainNameEnum.polygon;
      case '42161':
        return ChainNameEnum.arbitrum;
      default:
        return ChainNameEnum.erc;
    }
  }

  function getChainDenomination(chainId: any) {
    switch (chainId) {
      case '1':
        return ChainDenominationEnum.erc;
      case '10':
        return ChainDenominationEnum.optimism;
      case '56':
        return ChainDenominationEnum.bsc;
      case '137':
        return ChainDenominationEnum.polygon;
      case '42161':
        return ChainDenominationEnum.arbitrum;
      default:
        return ChainDenominationEnum.erc;
    }
  }
}
