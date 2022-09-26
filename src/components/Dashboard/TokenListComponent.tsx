import React, { useMemo } from 'react'
import { Paper, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { TokenBalance } from '../../InitialValues'


interface Props {
    tokens: TokenBalance;
    ethPrice: number,
    x7PriceData: object,
    valueCurrency: string,
    tokenData: Array<TokenData>,
    setTokenData: Function
}

export interface TokenData {
    contractAddress: string,
    name: string,
    tokens: number,
    derivedETH: number,
    percentOfSupply: number,
    valueUSD: number,
    valueETH: number,
}

export default function TokenListComponent({ tokens, ethPrice, x7PriceData, valueCurrency, tokenData, setTokenData }: Props) {
    const data = useMemo(parseData, [tokens, x7PriceData, ethPrice, parseData]);

    function parseData() {
        const dataObject = new Array<TokenData>();
        Object.entries(tokens).forEach(([key, value]) => {
            var derivedETH = 0;
            var address = "";
            if (x7PriceData) {
                Object.entries(x7PriceData).forEach(([_, valueX7]) => {
                    if (valueX7.symbol.toUpperCase() === key.toUpperCase()) {
                        derivedETH = valueX7.derivedETH;
                        address = valueX7.id;
                    }
                });
            }
            var numberOfTokens = (value.balance / Math.pow(10, 18));
            var valueInETH = derivedETH * numberOfTokens;
            var valueInUSD = ethPrice * valueInETH;

            dataObject.push({ contractAddress: address, name: key, tokens: numberOfTokens, derivedETH: derivedETH, percentOfSupply: (value.balance / (1000000 * Math.pow(10, 18))), valueUSD: valueInUSD, valueETH: valueInETH })
        });
        return dataObject;
    }

    React.useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(tokenData)) {
            setTokenData(data);
        }
    }, [setTokenData, tokenData, data])

    const openInNewTab = (tokenAddress: string) => {
        window.open("https://etherscan.io/token/" + tokenAddress, '_blank', 'noopener,noreferrer');
    };

    return (
        <Container maxWidth={'md'}>
            <TableContainer component={Paper} >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Tokens</TableCell>
                            <TableCell>% of supply</TableCell>
                            <TableCell>Value ({valueCurrency})</TableCell>
                            <TableCell sx={{ maxWidth: 2 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((token) => {
                            return (
                                <TableRow key={token.name} sx={{ width: '100%' }}>
                                    <TableCell>
                                        <b>{(token.name.toUpperCase())}</b>
                                    </TableCell>
                                    <TableCell>
                                        {Number(token.tokens).toFixed(3)}
                                    </TableCell>
                                    <TableCell>
                                        {Number(token.percentOfSupply).toFixed(3)}
                                    </TableCell>
                                    <TableCell>
                                        {Number(valueCurrency === 'USD' ? token.valueUSD : token.valueETH).toFixed(3)}
                                    </TableCell>
                                    <TableCell width={2} align="right">
                                        <IconButton onClick={() => openInNewTab(token.contractAddress)}>
                                            <OpenInNewIcon style={{ color: "inherit" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>)
}