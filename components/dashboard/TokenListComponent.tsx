import { TokenBalanceV2 } from '../../lib/InitialValues';
import React, { useMemo } from 'react';

interface Props {
  tokens: TokenBalanceV2;
  ethPrice: number;
  x7PriceData: object;
  valueCurrency: string;
  tokenData: Array<TokenData>;
  setTokenData: Function;
}

export interface TokenData {
  contractAddress: string;
  name: string;
  tokens: number;
  derivedETH: number;
  percentOfSupply: number;
  valueUSD: number;
  valueETH: number;
}

export default function TokenListComponent({
  tokens,
  ethPrice,
  x7PriceData,
  valueCurrency,
  tokenData,
  setTokenData,
}: Props) {
  const data = useMemo(parseData, [tokens, x7PriceData, ethPrice, parseData]);

  function parseData() {
    const dataObject = new Array<TokenData>();
    Object.entries(tokens).forEach(([key, value]) => {
      var derivedETH = 0;
      var address = '';
      if (x7PriceData) {
        Object.entries(x7PriceData).forEach(([_, valueX7]) => {
          if (valueX7.symbol.toUpperCase() === key.toUpperCase()) {
            derivedETH = valueX7.derivedETH;
            address = valueX7.id;
          }
        });
      }
      var numberOfTokens = value.balance / Math.pow(10, 18);
      var valueInETH = derivedETH * numberOfTokens;
      var valueInUSD = ethPrice * valueInETH;

      dataObject.push({
        contractAddress: address,
        name: key,
        tokens: numberOfTokens,
        derivedETH: derivedETH,
        percentOfSupply: value.balance / (1000000 * Math.pow(10, 18)),
        valueUSD: valueInUSD,
        valueETH: valueInETH,
      });
    });
    return dataObject;
  }

  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(tokenData)) {
      setTokenData(data);
    }
  }, [setTokenData, tokenData, data]);

  const openInNewTab = (tokenAddress: string) => {
    window.open(
      'https://etherscan.io/token/' + tokenAddress,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div>
      <div>
        <table>
          <div>
            <tr>
              <td>Name</td>
              <td>Tokens</td>
              <td>% of supply</td>
              <td>Value ({valueCurrency})</td>
              <td></td>
            </tr>
          </div>
          <div>
            {data.map((token) => {
              return (
                <tr key={token.name}>
                  <td>
                    <b>{token.name.toUpperCase()}</b>
                  </td>
                  <td>{Number(token.tokens).toFixed(3)}</td>
                  <td>{Number(token.percentOfSupply).toFixed(3)}</td>
                  <td>
                    {Number(
                      valueCurrency === 'USD' ? token.valueUSD : token.valueETH
                    ).toFixed(3)}
                  </td>
                  <td width={2} align="right">
                    <button onClick={() => openInNewTab(token.contractAddress)}>
                      open
                    </button>
                  </td>
                </tr>
              );
            })}
          </div>
        </table>
      </div>
    </div>
  );
}
