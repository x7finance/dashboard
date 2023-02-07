// import SyncIcon from '@mui/icons-material/Sync';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import Countdown from 'react-countdown';
import { TokenBalanceV2 } from '../../lib/InitialValues';
import SmartContractService from '../../services/SmartContractService';
import DashboardUtilityComponent from './DashboardUtilityComponent';
import TokenListComponent, { TokenData } from './TokenListComponent';
import { useEffect, useRef, useState } from 'react';

// import MigratedDataTableRow from './MigratedDataTableRowComponent';

export interface MigrationElementData {
  amount: number;
  percentage: number;
  formattedAmount: number;
}

export interface MigrationData {
  x7m105: MigrationElementData;
  x7: MigrationElementData;
  x7daoV1: MigrationElementData;
  x7001: MigrationElementData;
  x7002: MigrationElementData;
  x7003: MigrationElementData;
  x7004: MigrationElementData;
  x7005: MigrationElementData;
}

export interface UserMigrationElementData {
  amount: number;
  percentage: number;
  formattedAmount: number;
  status: boolean;
}

export interface UserMigrationData {
  x7m105: UserMigrationElementData;
  x7: UserMigrationElementData;
  x7dao: UserMigrationElementData;
  x7001: UserMigrationElementData;
  x7002: UserMigrationElementData;
  x7003: UserMigrationElementData;
  x7004: UserMigrationElementData;
  x7005: UserMigrationElementData;
}

interface DashboardComponentProps {
  tokens: TokenBalanceV2;
  x7priceData: any;
  valueCurrency: string;
  node: string;
  setNode: Function;
  ethPrice: number;
  smartContract: SmartContractService;
  updateValues: Function;
  migratedTokens: MigrationData;
  migrationStatus: boolean;
  userMigratedTokens: UserMigrationData;
  connected: boolean;
}

export default function DashboardComponent({
  updateValues,
  setNode,
  tokens,
  x7priceData,
  ethPrice,
  valueCurrency,
  node,
  smartContract,
  migratedTokens,
  migrationStatus,
  userMigratedTokens,
  connected,
}: DashboardComponentProps) {
  const [tokenData, setTokenData] = useState(Array<TokenData>);
  const totalValueUSD = tokenData.reduce(
    (total, element) => total + element.valueUSD,
    0
  );
  const totalValueETH = tokenData.reduce(
    (total, element) => total + element.valueETH,
    0
  );
  const totalHoldingPercent =
    tokenData.reduce((total, element) => total + element.tokens, 0) / 7000000;
  var totalMajorTokensHolding = 0;

  tokenData.forEach((element) => {
    if (
      element.name.toLowerCase() === 'x7r' ||
      element.name.toLowerCase() === 'x7dao'
    ) {
      totalMajorTokensHolding += element.tokens;
    }
  });

  totalMajorTokensHolding /= 2000000;

  var dateNFT = new Date(0);
  dateNFT.setUTCSeconds(1664164811);

  var dateSnapshot = new Date(0);
  dateSnapshot.setUTCSeconds(1664251211);

  var dateMigration = new Date(0);
  dateMigration.setUTCSeconds(1664337611);

  // var migratedString = useMemo(parseMigratedData, [userMigratedTokens]);
  // var notMigratedString = useMemo(parseNotMigratedData, [userMigratedTokens])

  // function parseMigratedData() {
  //     const elements = new Array(0);
  //     Object.entries(userMigratedTokens).forEach(([key, value]) => {
  //         if (value.status)
  //             elements.push(<Typography variant='h6' key={key}>{key}</Typography>)
  //     });
  //     return elements;
  // }

  // function parseNotMigratedData() {
  //     const elements = new Array(0);
  //     Object.entries(userMigratedTokens).forEach(([key, value]) => {
  //         if (!value.status)
  //             elements.push(<Typography variant='h6' key={key}>{key}</Typography>);
  //     });
  //     return elements;
  // }

  const x7daoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script2 = document.createElement('script');
    script2.src =
      'https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js';
    script2.async = true;
    script2.setAttribute('coin-id', 'x7dao');
    script2.setAttribute('currency', 'usd');
    script2.setAttribute('height', '300');
    script2.setAttribute('locale', 'en');
    script2.setAttribute('background-color', '#121212');
    x7daoRef.current?.appendChild(script2);
  }, []);

  return (
    <div>
      <div>
        {/* <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Typography>
                            Migration status:
                        </Typography>
                        <Typography variant="h3" mt={1}>
                            {migrationStatus
                                ? <CheckCircleOutlineIcon sx={{ fontSize: '2em' }} color='success' />
                                : <SyncIcon sx={{ fontSize: '2em' }} color='warning' />
                            }
                        </Typography>
                    </Paper>
                </Container> */}
        <div>
          <div>
            <div>
              Value in <b>{valueCurrency}</b>:
            </div>
            <h3>
              {valueCurrency === 'USD'
                ? Number(totalValueUSD.toFixed(2)).toLocaleString()
                : Number(totalValueETH.toFixed(3)).toLocaleString()}
            </h3>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>Total holding</div>
                  <div>
                    <h5>{totalHoldingPercent.toFixed(5)}%</h5>
                  </div>
                </div>
                <div>
                  <div>
                    Total X7R,
                    <br /> X7DAO holding
                  </div>
                  <div>
                    <h5>{totalMajorTokensHolding.toFixed(5)}%</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Typography variant={'h3'}>Migrated tokens</Typography>

            <Box sx={{ pt: 2, pb: 5, display: 'inline-grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 5, rowGap: 3 }}>
                <Container maxWidth={'md'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Table>
                            <TableBody>
                                <MigratedDataTableRow tokenName={"X7DAO"} percentage={migratedTokens.x7daoV1.percentage} formattedAmount={migratedTokens.x7daoV1.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7M105"} percentage={migratedTokens.x7m105.percentage} formattedAmount={migratedTokens.x7m105.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7"} percentage={migratedTokens.x7.percentage} formattedAmount={migratedTokens.x7.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7001"} percentage={migratedTokens.x7001.percentage} formattedAmount={migratedTokens.x7001.formattedAmount} />
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
                <Container maxWidth={'md'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Table>
                            <TableBody>
                                <MigratedDataTableRow tokenName={"X7002"} percentage={migratedTokens.x7002.percentage} formattedAmount={migratedTokens.x7002.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7003"} percentage={migratedTokens.x7003.percentage} formattedAmount={migratedTokens.x7003.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7004"} percentage={migratedTokens.x7004.percentage} formattedAmount={migratedTokens.x7004.formattedAmount} />
                                <MigratedDataTableRow tokenName={"X7005"} percentage={migratedTokens.x7005.percentage} formattedAmount={migratedTokens.x7005.formattedAmount} />
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </Box> */}
      {/* 
            {connected ? <>
                <Typography variant={'h3'}>Snapshot of your wallet</Typography>

                <Box sx={{ pt: 2, pb: 5 }}>
                    <Container maxWidth={'md'}>
                        <Paper sx={{ p: 3, height: '100%', display: 'inline-flex' }} elevation={8}  >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            <Typography color='green' variant='h4' >Snapshot</Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography color='red' variant='h4'>Not snapshot</Typography>
                                            (tokens that you didn't own<br /> shows here too)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'>
                                            {migratedString}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {notMigratedString}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Container>
                </Box>
            </>
                : <></>} */}

      {/* <Typography variant={'h3'}>Timers</Typography>
            <Box
                sx={{ pt: 2, pb: 5, display: 'inline-grid', gridTemplateColumns: { md: '1fr 1fr 1fr' }, gap: 5, rowGap: 3 }}>
                <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Typography>
                            NFT sale:
                        </Typography>
                        <Typography variant="h3" mt={1}>
                            <Countdown date={dateNFT} />
                        </Typography>
                    </Paper>
                </Container>
                <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Typography>
                            Snapshot:
                        </Typography>
                        <Typography variant="h3" mt={1}>
                            <Countdown date={dateSnapshot} />
                        </Typography>
                    </Paper>
                </Container>
                <Container maxWidth={'sm'}>
                    <Paper sx={{ p: 3, height: '100%' }} elevation={8} >
                        <Typography>
                            Migration starts:
                        </Typography>
                        <Typography variant="h3" mt={1}>
                            <Countdown date={dateMigration} />
                        </Typography>
                    </Paper>
                </Container>
            </Box> */}
      <TokenListComponent
        tokens={tokens}
        ethPrice={ethPrice}
        x7PriceData={x7priceData}
        valueCurrency={valueCurrency}
        tokenData={tokenData}
        setTokenData={setTokenData}
      />

      <div>CoinGecko</div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></script>
    <coingecko-coin-price-chart-widget  coin-id="x7r" currency="usd" height="300" locale="en" background-color="#252525"></coingecko-coin-price-chart-widget>`,
          }}
        ></div>
        <div
          id="cg-x7dao"
          ref={x7daoRef}
          dangerouslySetInnerHTML={{
            __html: `<script src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"></script>
    <coingecko-coin-price-chart-widget coin-id="x7dao" currency="usd" height="300" locale="en" background-color="#252525"></coingecko-coin-price-chart-widget>`,
          }}
        ></div>
      </div>

      <DashboardUtilityComponent />

      <div className="flex w-full">Configuration</div>
    </div>
  );
}
