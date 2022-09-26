import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, CssBaseline, Toolbar, AppBar, Typography, IconButton, Button, Box, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useQuery } from '@apollo/client'
import * as Addresses from './EthereumAddresses'
import MetaMaskService from './services/MetaMaskService'
import SmartContractService from './services/SmartContractService';
import { getEthPrice } from './services/UniswapService'
import V2ResourcesComponent from './components/Resources/V2/V2ResourcesComponent';
import ResponsiveDrawer from './components/ResponsiveDrawerComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import UniswapTradeComponent from './components/Trading/UniswapTradeComponent';
import V1ResourcesComponent from './components/Resources/V1/V1ResourcesComponent';
import EcosystemComponent from './components/Ecosystem/EcosystemComponent';
import CommunityComponent from './components/Community/CommunityComponent';
import WalletConnectionDialog from './components/WalletConnectionDialog'
import { initialStatus, initialMigratedTokens, initialAlreadyMigratedTokens } from './InitialValues';
import { X7_ECOSYSTEM_PRICE_QUERY } from './services/UniswapService'

const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [connected, setConnected] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [syncing, setSyncing] = useState(new Array(0));
  const [balance, setBalance] = useState(initialStatus);
  const [ethPrice, setEthPrice] = useState(0);
  const [x7PriceData, setX7PriceData] = useState(null);
  const [valueCurrency, setValueCurrency] = useState('ETH');
  const [node, setNode] = useState(readSelectedNode);
  const SmartContract = new SmartContractService(node);
  const [SnackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState('error');
  const [openWalletConnectionDialog, setOpenWalletConnectionDialog] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState(readMigrationStatus);
  const [migrationSyncing, setMigrationSyncing] = useState(new Array(0));
  const [migratedTokens, setMigratedTokens] = useState(initialMigratedTokens);
  const [tokensToDeduct, setTokensToDeduct] = useState(initialAlreadyMigratedTokens);

  function readMigrationStatus(): boolean {
    SmartContract.getMigrationStatus((status: boolean) => {
      return status;
    }, () => {
      handleUserActionFailed("Could not read the state of the contract.");
      return false;
    });
    return false;
  }



  function readSelectedNode(): string {
    const selectedNode = localStorage.getItem("selectedNode");

    if (selectedNode) {
      return selectedNode;
    }
    return "https://cloudflare-eth.com";
  }

  function readMigratedTokens() {
    const migratedTok = { ...migratedTokens }
    setMigrationSyncing(["x7dao", "x7m105", "x7001", "x7002", "x7003", "x7004", "x7005"]);
    Object.entries(migratedTok).forEach(([key, value]) => {
      SmartContract.getBalance2(key,
        Addresses.MigrationContract, (tokenBalance: number) => {
          value.amount = tokenBalance;
          setMigrationSyncing(migrationSyncing.filter((el) => {
            return el !== key;
          }));
        }, (err: any) => {
          handleUserActionFailed("Error reading amount of X7 migration tokens")
          console.error(err);
        });
    });
    setMigratedTokens(migratedTok);
  }

  function getAllTokensToDeduct() {
    const tokens = { ...tokensToDeduct };

    Object.entries(tokens).forEach(([key, value]) => {
      value.alreadyMigrated.forEach(element => {
        SmartContract.getBalance2(key, element.address, (value: number) => {
          element.value = value;
          setTokensToDeduct(tokens);
        }, (err: any) => {
          console.error(err);
        });
      });
    });
  }

  function switchNode(nodeURL: string) {
    localStorage.setItem('selectedNode', nodeURL);
    setNode(nodeURL);
    if (connected) {
      applyAddress(address);
    }
  }

  const { loading: loadingX7, error: errorX7, data: x7EcosystemData, startPolling: startPollingX7 } = useQuery(X7_ECOSYSTEM_PRICE_QUERY)
  if (!loadingX7) {
    if (!errorX7) {
      if (x7PriceData === null)
        setX7PriceData(x7EcosystemData.tokens);
    }
    else
      console.error("Error reading x7 price data");
  }

  useEffect(() => {
    MetaMaskService.setActionRejectedErrorNotification(handleUserActionFailed, handleUserActionSuccessfulNotification);
    readMigratedTokens();
    getAllTokensToDeduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (migrationSyncing.length !== 0)
      return;
    const migratedTok = { ...migratedTokens };
    Object.entries(migratedTok).forEach(([key, value]) => {
      var totalToAdd = 0;
      Object.entries(tokensToDeduct).forEach(([key2, value2]) => {
        if (key2 === key) {
          value2.alreadyMigrated.forEach(element => {
            totalToAdd += Number(element.value);
          });
        }
      });

      var tokensDec = totalToAdd / (10 ** 18) + value.amount / (10 ** 18);
      value.formattedAmount = Number(tokensDec.toFixed(4));
      value.percentage = Number((tokensDec / 1000000).toFixed(2));
    });
  }, [migratedTokens, tokensToDeduct, migrationSyncing])

  useEffect(() => {
    var status = localStorage.getItem("stayConnected");
    if (status) {
      setConnected(status === "true" ? true : false);
    }
  }, [setConnected])

  useEffect(() => {
    getEthPrice((data: string) => { setEthPrice(Number(data)) });
    const interval = setInterval(() => {
      getEthPrice((data: string) => { setEthPrice(Number(data)) });
    }, 10000);
    startPollingX7(10000);

    return () => clearInterval(interval);
  }, [startPollingX7]);

  const switchValueCurrency = () => {
    if (valueCurrency === 'ETH') {
      setValueCurrency('USD')
    } else {
      setValueCurrency('ETH');
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function isSyncing() {
    if (syncing.length === 0)
      return "";
    return (<Box sx={{ pl: "10px" }}><CircularProgress size={25} /></Box>);
  }

  const checkConnection = () => {
    MetaMaskService.getAlreadyConnectedAccounts((data: string) => {
      if (data === "" || !data)
        return;
      applyAddress(data);
    });
  }

  function saveConnectionStatus(status: boolean) {
    localStorage.setItem("stayConnected", JSON.stringify(status))
    setConnected(status);
  }

  const connectMetamask = () => {
    saveConnectionStatus(true);
    MetaMaskService.connectToMetaMask(applyAddress);
  }

  const disconnect = () => {
    saveConnectionStatus(false);
    setBalance(initialStatus);
    setAddress('');
  }

  const applyAddress = (wallet: string) => {
    if (wallet === "")
      return;
    setAddress(wallet);
    setConnected(true);
    setSyncing(["x7dao", "x7m105", "x7001", "x7002", "x7003", "x7004", "x7005"])
    getAllBalances(wallet);
  }

  const handleGetDataError = (tokenName: string) => {
    handleUserActionFailed('Error while gathering data, please try with another node')
    setBalance(initialStatus);
    setSyncing(syncing.filter((el) => {
      return el !== tokenName;
    }));
  }

  const wrongWalletAddress = () => {
    handleUserActionFailed('Wallet you entered is not valid, please make sure wallet address is correct.');
  }

  const handleNotConnected = () => {
    handleUserActionFailed('Please connect a wallet first.');
  }

  const handleUserActionFailed = (message: string) => {
    setSnackBarSeverity('error');
    setSnackBarText(message);
    setSnackBarOpen(true);
  }

  const handleUserActionSuccessfulNotification = (notification: string) => {
    setSnackBarSeverity('success');
    setSnackBarText(notification);
    setSnackBarOpen(true);
  }

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  }

  const toggleWalletConnectionDialog = (status: boolean) => {
    setOpenWalletConnectionDialog(status);
  }

  function getAllBalances(wallet: string) {
    const balances = { ...balance };
    Object.entries(balances).forEach(([key, value]) => {
      SmartContract.getBalance2(key, wallet, (tokenBalance: number) => {
        value.balance = tokenBalance;
        setSyncing(syncing.filter((el) => {
          return el !== key;
        }));
      }, () => handleGetDataError(key));
    });
    setBalance(balances);
  }

  if (connected && address === "") {
    checkConnection();
  }

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <WalletConnectionDialog open={openWalletConnectionDialog} toggleDialog={toggleWalletConnectionDialog} connectMetamask={connectMetamask} setAddress={setAddress} openSnackbar={wrongWalletAddress} address={address} applyAddress={applyAddress} setConnected={setConnected} />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
              <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" align='left' sx={{ flexGrow: 1 }} component="div">
                  X7 Dashboard
                </Typography>
                <Button color='inherit' onClick={switchValueCurrency} sx={{ mr: '10px' }}>{valueCurrency}</Button>
                {!connected
                  ? <Button color='success' variant='outlined' onClick={() => toggleWalletConnectionDialog(true)}>Connect</Button>
                  : <Button color='error' variant='outlined' onClick={disconnect}>Disconnect</Button>
                }
                {isSyncing()}
              </Toolbar>
            </AppBar>
          </Box>
          <ResponsiveDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <Box component="main" sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<DashboardComponent updateValues={() => {
                if (connected) {
                  applyAddress(address);
                  readMigratedTokens();
                  setMigrationStatus(readMigrationStatus);
                } else {
                  handleNotConnected();
                }
              }} setNode={switchNode} tokens={balance} ethPrice={ethPrice} x7priceData={x7PriceData} valueCurrency={valueCurrency} node={node} smartContract={SmartContract} migratedTokens={migratedTokens} migrationStatus={migrationStatus} />} />
              <Route path="/trade" element={<UniswapTradeComponent />} />
              <Route path="/v1" element={<V1ResourcesComponent />} />
              <Route path="/v2" element={<V2ResourcesComponent />} />
              <Route path="/ecosystem" element={<EcosystemComponent />} />
              <Route path="/community" element={<CommunityComponent />} />
            </Routes>
          </Box>
          <Snackbar sx={{ mt: 10 }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} open={SnackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackBarSeverity === 'error' ? 'error' : 'success'} sx={{ width: '100%' }}>
              {snackBarText}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Router>
    </div>

  );
}

export default App;