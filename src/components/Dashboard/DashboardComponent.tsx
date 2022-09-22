import React from 'react'
import { Select, MenuItem, Box, Table, Paper, Typography, Container, TableRow, TableCell, TableBody, FormControl, SelectChangeEvent, InputLabel, Divider, Button, Checkbox } from '@mui/material';
import TokenListComponent, { TokenData } from './TokenListComponent';
import SmartContractService from '../../services/SmartContractService';
import DashboardUtilityComponent from './DashboardUtilityComponent';

interface DashboardComponentProps {
    tokens: object,
    x7priceData: any,
    valueCurrency: string,
    node: string,
    setNode: Function,
    ethPrice: number,
    smartContract: SmartContractService,
    updateValues: Function,
}

export default function DashboardComponent({ updateValues, setNode, tokens, x7priceData, ethPrice, valueCurrency, node, smartContract }: DashboardComponentProps) {
    const [tokenData, setTokenData] = React.useState(Array<TokenData>);
    const totalValueUSD = tokenData.reduce((total, element) => total + element.valueUSD, 0);
    const totalValueETH = tokenData.reduce((total, element) => total + element.valueETH, 0);
    const totalHoldingPercent = tokenData.reduce((total, element) => total + element.tokens, 0) / 8000000;
    var totalMajorTokensHolding = 0;
    tokenData.map(element => {
        if (element.name.toUpperCase() === "X7M105" || element.name.toUpperCase() === "X7" || element.name.toUpperCase() === "X7DAO") {
            totalMajorTokensHolding += element.tokens;
        }
    });
    totalMajorTokensHolding /= 3000000;
    return (
        <Box>
            <Box
                sx={{ pt: 2, pb: 5, display: 'inline-grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 5, rowGap: 3 }}>
                <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Typography>
                            Value in <b>{valueCurrency}</b>:
                        </Typography>
                        <Typography variant="h3">
                            {valueCurrency === 'USD' ? totalValueUSD.toFixed(2) : totalValueETH.toFixed(3)}
                        </Typography>
                    </Paper>
                </Container>
                <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3 }} elevation={8} >
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        Total holding
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        <Typography variant="h5">
                                            {totalHoldingPercent.toFixed(5)}%
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        Total X7, X7M105,<br /> X7DAO holding</TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        <Typography variant="h5">
                                            {totalMajorTokensHolding.toFixed(5)}%
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>

            </Box>
            <TokenListComponent
                tokens={tokens}
                ethPrice={ethPrice}
                x7PriceData={x7priceData}
                valueCurrency={valueCurrency}
                tokenData={tokenData}
                setTokenData={setTokenData} />

                <DashboardUtilityComponent />

            <Divider sx={{ mt: 3 }} />
            <Typography mt={3} variant='h5' width={'100%'} display="flex" flexDirection="row">Configuration</Typography>
            <Box sx={{ mt: 3, width: '100%' }} display="flex" flexDirection="row">
                <Button variant='outlined' color='inherit' sx={{ marginRight: 3 }}
                    onClick={() => { updateValues() }}>Refresh data</Button>
                <FormControl>
                    <InputLabel id="select-node-label">Node</InputLabel>
                    <Select
                        label={'Node'}
                        labelId="select-node-label"
                        id="select-node"
                        value={node}
                        onChange={(event: SelectChangeEvent<string>) => {
                            setNode(event.target.value);
                            smartContract.switchNode(event.target.value);
                        }}>
                        <MenuItem value={"https://cloudflare-eth.com"}>Cloudflare</MenuItem>
                        <MenuItem value={"https://main-rpc.linkpool.io"}>LinkPool</MenuItem>
                        <MenuItem value={"https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79"}>Pocket Network</MenuItem>
                        <MenuItem value={"https://nodes.mewapi.io/rpc/eth"}>MyEtherWallet</MenuItem>
                        <MenuItem value={"https://rpc.flashbots.net"}>Flashbots Protect</MenuItem>
                        <MenuItem value={"https://rpc.ankr.com/eth"}>Ankr</MenuItem>
                        <MenuItem value={"https://api.mycryptoapi.com/eth"}>MyCrypto</MenuItem>
                        <MenuItem value={"https://ethereumnodelight.app.runonflux.io"}>Flux</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box >
    );
}