import { ContractsEnum } from '../../lib/types';
import { Pair } from '../pair';
import { useEffect, useState } from 'react';
import { useContractReads } from 'wagmi';

const allPairsLengthAbi = [
  {
    inputs: [],
    name: 'allPairsLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const PairsGrid = () => {
  const [allPairsLength, setAllPairsLength] = useState(0);
  const X7FactoryContract = {
    address: ContractsEnum.XchangeFactory,
    abi: allPairsLengthAbi,
  };

  const { data } = useContractReads({
    contracts: [
      {
        ...X7FactoryContract,
        functionName: 'allPairsLength',
      },
    ],
  });

  const pairsCount = parseInt(data?.toString() || '0', 10);

  useEffect(() => {
    if (pairsCount > 0) {
      setAllPairsLength(pairsCount);
    }
  }, [pairsCount]);

  return (
    <>
      <div className="my-16 xl:max-w-none">
        <div className="px-4 sm:px-6 lg:px-8">
          <>
            <div className="-mx-4 mt-10 ring-1 ring-zinc-900/7.5 dark:ring-white/10 sm:-mx-6 md:mx-0 md:rounded-2xl">
              <table className="min-w-full divide-y divide-zinc-900/7.5 dark:divide-white/10">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 sm:pl-6"
                    >
                      Index
                    </th>
                    <th
                      scope="col"
                      className=" px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Pair Address
                    </th>
                    <th
                      scope="col"
                      className=" px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Chart
                    </th>
                    <th
                      scope="col"
                      className=" px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 lg:table-cell"
                    >
                      Scan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allPairsLength > 0 ? (
                    Array.from({ length: pairsCount }, (_, i) => (
                      <Pair
                        key={i}
                        index={pairsCount - i - 1}
                        pairsLength={pairsCount - 1}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center">
                        No pairs created
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default PairsGrid;
