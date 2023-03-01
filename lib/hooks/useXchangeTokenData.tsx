import AllPairs from '../../contracts/AllPairs.json';
import ERC20 from '../../contracts/ERC20.json';
import PairsAbi from '../../contracts/PairsAbi.json';
import { ContractsEnum, TokenContractAddresses } from '../../lib/types';
import { generateChainTokenOracleEnum } from '../utils/chainFormatters';
import { Address, useContractReads, useNetwork } from 'wagmi';

export function useXchangeTokenData(id: number) {
  const { chain } = useNetwork();
  const { data, isLoading: isInitialPairLoading } = useContractReads({
    contracts: [
      {
        address: ContractsEnum.XchangeFactory,
        abi: AllPairs,
        functionName: 'allPairs',
        args: [id],
      },
    ],
  });

  const { data: pairTokens, isLoading: isTokenPairLoading } = useContractReads({
    contracts: [
      {
        address: data?.[0] as Address,
        abi: PairsAbi,
        functionName: 'token0',
      },
      {
        address: data?.[0] as Address,
        abi: PairsAbi,
        functionName: 'token1',
      },
      {
        address: data?.[0] as Address,
        abi: PairsAbi,
        functionName: 'getReserves',
      },
    ],
  });

  const { data: usdPrice } = useContractReads({
    contracts: [
      {
        address: generateChainTokenOracleEnum(chain?.id), // Chainlink's Price Feed contract address
        abi: [
          {
            inputs: [],
            name: 'latestAnswer',
            outputs: [
              {
                internalType: 'int256',
                name: '',
                type: 'int256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'latestAnswer',
      },
    ],
  });

  // @ts-expect-error
  const token: Address =
    pairTokens?.[0] !== TokenContractAddresses.WETH
      ? pairTokens?.[0]
      : pairTokens?.[1];

  const { data: erc20Details, isLoading } = useContractReads({
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

  const name: string = !!erc20Details?.[0] ? `${erc20Details?.[0]}` : ``;
  const symbol = erc20Details?.[1];
  const contractData = data?.[0];

  let ethInUSD = 0;
  if (usdPrice) {
    ethInUSD = parseInt(usdPrice.toString()) / 10 ** 8;
  }

  return {
    isLoading: isLoading || isTokenPairLoading || isInitialPairLoading,
    tokenName: name,
    tokenSymbol: symbol,
    tokenContract: contractData,
    tokenReserve: generatePairReserve(pairTokens),
    tokenPrice: generatePairUSDPrice(pairTokens, ethInUSD),
  };
}

function generatePairReserve(pairTokens: any) {
  const reserves = pairTokens?.[2];
  if (reserves) {
    const { _reserve0, _reserve1 } = reserves;

    const ethReserve =
      pairTokens?.[0] === TokenContractAddresses.WETH ? _reserve0 : _reserve1;

    return (ethReserve / 10 ** 18).toFixed(2);
  }

  return '0';
}

function generatePairUSDPrice(pairTokens: any, ethInUSD: number) {
  const reserves = pairTokens?.[2];

  if (reserves) {
    const { _reserve0, _reserve1 } = reserves;

    const ethReserve =
      pairTokens?.[0] === TokenContractAddresses.WETH ? _reserve0 : _reserve1;

    const tokenReserve =
      pairTokens?.[0] === TokenContractAddresses.WETH ? _reserve1 : _reserve0;

    const unitPriceEth = ethReserve / tokenReserve;

    return (ethInUSD * (unitPriceEth / 10 ** 18)).toFixed(4);
  }

  return 0;
}
