import { Button } from '../components/button';
import { XCHANGE } from '../lib/constants';
import { ContractsEnum } from '../lib/types';
import { chainsArray } from '../lib/utils/chainFormatters';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import toast from 'react-hot-toast';
import { useClipboard } from 'use-clipboard-copy';

const tokens = [
  {
    name: 'X7R',
    contract: ContractsEnum.X7R,
    description: 'A deflationary reward token',
  },
  {
    name: 'X7DAO',
    contract: ContractsEnum.X7DAO,
    description: 'Governance token utilized to govern the X7 ecosystem',
  },
  {
    name: 'X7101',
    contract: ContractsEnum.X7101,
    description: 'First of the price consistent constellation tokens',
  },
  {
    name: 'X7102',
    contract: ContractsEnum.X7102,
    description: 'Second of the price consistent constellation tokens',
  },
  {
    name: 'X7103',
    contract: ContractsEnum.X7103,
    description: 'Third of the price consistent constellation tokens',
  },
  {
    name: 'X7104',
    contract: ContractsEnum.X7104,
    description: 'Fourth of the price consistent constellation tokens',
  },
  {
    name: 'X7105',
    contract: ContractsEnum.X7105,
    description: 'Fifth of the price consistent constellation tokens',
  },
];

const utilityTokens = [
  {
    name: 'X7D',
    contract: ContractsEnum.X7D,
    description: `When adding funds to the lending pool, X7D is minted - it's value is pegged 1:1 to the native chain currency`,
  },
];

const liquidityHubs = [
  {
    name: 'X7R Liquidity Hub',
    contract: ContractsEnum.X7R_LiquidityHub,
    description: 'Liquidity hub for X7R - reward token',
  },
  {
    name: 'X7DAO Liquidity Hub',
    contract: ContractsEnum.X7DAO_LiquidityHub,
    description: 'Liquidity hub for X7DAO - governance token',
  },
  {
    name: 'X7100 Liquidity Hub',
    contract: ContractsEnum.X7100_LiquidityHub,
    description: 'Liquidity hub for X7100 - constellation tokens',
  },
];

const discountAuthorities = [
  {
    name: 'X7R Discount Authority',
    contract: ContractsEnum.X7R_DiscountAuthority,
    description: `Smart contract for X7R fee discounts - granted via X7 utility NFT's`,
  },
  {
    name: 'X7DAO Discount Authority',
    contract: ContractsEnum.X7DAO_DiscountAuthority,
    description: 'Smart contract for X7DAO fee discounts',
  },
  {
    name: 'X7100 Discount Authority',
    contract: ContractsEnum.X7100_DiscountAuthority,
    description: 'Smart contract for X7100 series token fee discounts',
  },
];

const splitters = [
  {
    name: 'Ecosystem Splitter',
    contract: ContractsEnum.EcosystemSplitter,
    description:
      'Smart contract for balancing revenue across all revenue streams in the X7 ecosystem',
  },
  {
    name: 'Treasury Splitter',
    contract: ContractsEnum.TreasurySplitter,
    description: 'Smart contract responsible for managing the treasury',
  },
];

const misc = [
  {
    name: 'Lending Pool',
    contract: ContractsEnum.X7_LendingPool,
    description:
      'The lending pool where Initial Liquidity Loans funds are provided from',
  },
  {
    name: 'Token Burner',
    contract: ContractsEnum.X7100_TokenBurner,
    description: 'Smart contract for burning tokens',
  },
  {
    name: 'Token Time Lock',
    contract: ContractsEnum.TokenTimeLock,
    description: 'ERC-20 Token Time Lock',
  },
];

export default function ContractsPage() {
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

  return (
    <>
      <div className="my-16 xl:max-w-none">
        <div className="px-4 sm:px-6 lg:px-8">
          <>
            <div className="sm:flex sm:items-center" id="tokens">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  X7 Finance Tokens
                </h1>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  These are the main tokens powering the X7 Finance ecosystem.
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Token
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Chart
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Scan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                          <div className="relative top-1 ml-2 inline-block lg:hidden">
                            <div className="flex items-center space-x-2">
                              <div className="flex flex-shrink-0 space-x-1">
                                {chainsArray.map((c, id) => (
                                  <Link
                                    href={`https://www.dextools.io/app/en/${c.identifier}/pair-explorer/${t.contract}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={`${t.contract}-${id}-chart`}
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
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-shrink-0 space-x-1">
                            {chainsArray.map((c, id) => (
                              <Link
                                href={`https://www.dextools.io/app/en/${c.identifier}/pair-explorer/${t.contract}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={`${t.contract}-${id}-chart`}
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
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-sm text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <Dropdown
                          type="scan"
                          contract={t.contract}
                          label={'Scan this contract on the blockchain scanner'}
                          name={'Scan'}
                        />
                      </td>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="xchange"
                            contract={t.contract}
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
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="utility">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Utility Tokens
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Tokens which are utilized to fund and borrow liquidity within
                  the X7 ecosystem.
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Hub
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {utilityTokens.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="liquidity">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Liquidity Hubs
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Manages liquidity for a token within the X7 Finance ecosystem
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Hub
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {liquidityHubs.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="discount">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Discount Authorities
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Ensures discounts provided by X7 Utility NFT's are valid and
                  applied appropriately.
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Authority
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {discountAuthorities.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="splitter">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Ecosystem Splitters
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Moves a portion of the fees to different smart contracts
                  within the X7 Ecosystem
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Splitter
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {splitters.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="xchange">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Xchange Smart Contracts
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Key contracts that allow tokens to be traded on Xchange
                </p>
              </div>
            </div>

            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Contract
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {splitters.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

          <>
            <div className="mt-24 sm:flex sm:items-center" id="misc">
              <div className="sm:flex-auto">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Miscellaneous Smart Contracts
                </h3>
              </div>
            </div>

            <div className="-mx-4 mt-10 mb-60 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Contract
                    </th>

                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="relative py-3.5 pr-4 sm:pr-6">
                      Scan
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {misc.map((t, idx) => (
                    <tr key={t.contract}>
                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                        )}
                      >
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {t.name}
                        </div>
                        <div className="mt-1 flex flex-col text-sm text-slate-500 dark:text-slate-400 sm:block lg:hidden">
                          <span>{t.description}</span>
                          <span
                            onClick={() => {
                              clipboard.copy(t.contract);
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
                        {idx !== 0 ? (
                          <div className="absolute right-0 left-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                      <td
                        className={clsx(
                          idx === 0
                            ? ''
                            : 'border-t border-zinc-900/7.5 dark:border-white/10',
                          'hidden px-3 py-3.5 text-xs text-slate-500 dark:text-slate-400 lg:table-cell'
                        )}
                      >
                        <span>{t.description}</span>
                        <span
                          onClick={() => {
                            clipboard.copy(t.contract);
                          }}
                          className="flex cursor-pointer items-center opacity-70 hover:underline dark:opacity-50"
                        >
                          Contract: {t.contract}{' '}
                          <span className="ml-0.5">
                            <ClipboardDocumentIcon
                              className="inline-block h-4 w-4 "
                              aria-hidden="true"
                            />
                            <span className="sr-only">Copy Contract</span>
                          </span>
                        </span>
                      </td>

                      <td
                        className={clsx(
                          idx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                        )}
                      >
                        <div className="flex w-full justify-center">
                          <Dropdown
                            type="scan"
                            contract={t.contract}
                            label={
                              'Scan this contract on the blockchain scanner'
                            }
                            name={'Scan'}
                          />
                        </div>
                        {idx !== 0 ? (
                          <div className="absolute left-0 right-6 -top-px h-px bg-zinc-900/7.5 dark:bg-white/10" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

function Dropdown({
  name,
  label,
  type,
  contract,
}: {
  name: JSX.Element | string;
  label: string;
  type: string;
  contract: string;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as="div" className="inline-flex w-full justify-center ">
          <Button
            href={''}
            variant={type === 'scan' ? 'secondary' : 'primary'}
            aria-label={label}
          >
            {name}
            <ChevronDownIcon
              className="relative top-0.5 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </Button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-slate-100 shadow-lg ring-1 ring-black focus:outline-none dark:bg-slate-800 dark:ring-zinc-50/7.5">
          <div className="py-1">
            {chainsArray.map((c, id) => {
              return (
                <Menu.Item key={`${id}-${type}-${c?.identifier}`}>
                  {({ active }) => (
                    <a
                      href={generateLink(c, type, contract)}
                      rel="noopener noreferrer"
                      target="_blank"
                      className={clsx(
                        active
                          ? 'bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-100'
                          : 'text-slate-700 dark:text-slate-300',
                        'group flex items-center px-4 py-2 text-sm'
                      )}
                    >
                      {c.icon}
                      <span className="ml-2">{c.name}</span>
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function generateLink(c: any, type: string, contract: string) {
  switch (type) {
    case 'xchange':
      // TODO: figure out if I can the chain query param will trigger a network change
      return `${XCHANGE}/#/swap?outputCurrency=${contract}`;
    case 'scan':
      return `${c?.scannerLink}/token/${contract}`;
    default:
      return '';
  }
}
