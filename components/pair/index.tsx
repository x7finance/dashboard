import AllPairs from '../../contracts/AllPairs.json';
import { ContractsEnum } from '../../lib/types';
import { chainsArray } from '../../lib/utils/chainFormatters';
import { Dropdown } from '../dropdown/contracts';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useClipboard } from 'use-clipboard-copy';
import { useContractReads } from 'wagmi';

interface PairsProps {
  id: number;
}

export function Pair({ id }: PairsProps) {
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
          Ticker
          <div className="relative top-1 ml-2 inline-block lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="flex flex-shrink-0 space-x-1">
                {chainsArray.map((c, id) => (
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
            {chainsArray.map((c, id) => (
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
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-zinc-900/7.5 dark:border-white/10',
          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
        )}
      >
        Scanner
      </td>
      <td
        className={clsx(
          id === 0 ? '' : 'border-t border-transparent',
          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
        )}
      >
        <div className="flex w-full justify-center">
          <Dropdown
            type="xchange"
            contract={`${contractData}`}
            label={'Trade this token on Xchange'}
            name={
              <span className=" whitespace-nowrap">
                <span>Trade</span>
                <span className="hidden xl:ml-2 xl:inline-block">
                  on Xchange
                </span>
              </span>
            }
          />
        </div>
        {id !== 0 ? (
          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
        ) : null}
      </td>
    </tr>
  );
}
