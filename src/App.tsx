import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, CssBaseline, Toolbar, AppBar, Typography, IconButton, Button, Box, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import * as Addresses from './SmartContractAddresses'

import MetaMaskService from './services/MetaMaskService'
import SmartContractService from './services/SmartContractService';
import { getEthPrice } from './services/UniswapService'
// import V2ResourcesComponent from './components/Resources/V2/V2ResourcesComponent';
import ResponsiveDrawer from './components/ResponsiveDrawerComponent';
import DashboardComponent from './components/Dashboard/DashboardComponent';
import UniswapTradeComponent from './components/Trading/UniswapTradeComponent';
import V1ResourcesComponent from './components/Resources/V1/V1ResourcesComponent';
import EcosystemComponent from './components/Ecosystem/EcosystemComponent';
import CommunityComponent from './components/Community/CommunityComponent';
import WalletConnectionDialog from './components/WalletConnectionDialog'

const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const initialStatus = { "x7dao": 0, "x7m105": 0, "x7": 0, "x7001": 0, "x7002": 0, "x7003": 0, "x7004": 0, "x7005": 0 };

  const [connected, setConnected] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [syncing, setSyncing] = useState(new Array(0));
  const [balance, setBalance] = useState(initialStatus);
  const [ethPrice, setEthPrice] = useState(0);
  const [x7PriceData, setX7PriceData] = useState(null);
  const [valueCurrency, setValueCurrency] = useState('ETH');
  const [node, setNode] = useState(readSelectedNode);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [openWalletConnectionDialog, setOpenWalletConnectionDialog] = useState(false);

  const SmartContract = new SmartContractService(node);

  function readSelectedNode(): string {
    const selectedNode = localStorage.getItem("selectedNode");

    if (selectedNode) {
      return selectedNode;
    }
    return "https://cloudflare-eth.com";
  }

  function switchNode(nodeURL: string) {
    localStorage.setItem('selectedNode', nodeURL);
    setNode(nodeURL);
    if (connected) {
      applyAddress(address);
    }
  }

  useEffect(() => {
    var status = localStorage.getItem("stayConnected");
    if (status) {
      setConnected(status === "true" ? true : false);
    }
  }, [setConnected])

  const X7_ECOSYSTEM_PRICE_QUERY = gql`
  {
    tokens(
      where:{
        id_in:[
          "${Addresses.X7DAO}",
          "${Addresses.X7}",
          "${Addresses.X7m105}",
          "${Addresses.X7001}",
          "${Addresses.X7002}",
          "${Addresses.X7003}",
          "${Addresses.X7004}",
          "${Addresses.X7005}",
        ]
      }
    )
    {
      id, 
      symbol, 
      name, 
      decimals, 
      txCount, 
      derivedETH
    }
  }`;

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
    getEthPrice((data: string) => { setEthPrice(Number(data)) });
    const interval = setInterval(() => {
      getEthPrice((data: string) => { setEthPrice(Number(data)) });
    }, 10000);
    startPollingX7(10000);
    return () => clearInterval(interval);

  }, [])

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
    setSnackBarText("Error while gathering data, please try with another node")
    setErrorSnackBarOpen(true);
    setBalance(initialStatus);
    setSyncing(syncing.filter((el) => {
      return el !== tokenName;
    }));
  }

  const wrongWalletAddress = () => {
    setSnackBarText("Wallet you entered is not valid, please make sure wallet address is correct.")
    setErrorSnackBarOpen(true);
  }

  const handleNotConnected = () => {
    setSnackBarText("Please connect a wallet first")
    setErrorSnackBarOpen(true);
  }

  const handleCloseErrorSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackBarOpen(false);
  }

  const toggleWalletConnectionDialog = (status: boolean) => {
    setOpenWalletConnectionDialog(status);
  }

  function getAllBalances(wallet: string) {
    const balances = { ...balance };
    SmartContract.getX7DAOBalance(wallet, (tokenBalance: number) => {
      balances.x7dao = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7dao";
      }));
    }, () => handleGetDataError("x7dao"));
    SmartContract.getX7M105Balance(wallet, (tokenBalance: number) => {
      balances.x7m105 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7m105";
      }));
    }, () => handleGetDataError("x7m105"));
    SmartContract.getX7Balance(wallet, (tokenBalance: number) => {
      balances.x7 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7";
      }));
    }, () => handleGetDataError("x7"));
    SmartContract.getX7001Balance(wallet, (tokenBalance: number) => {
      balances.x7001 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7001";
      }));
    }, () => handleGetDataError("x7001"));
    SmartContract.getX7002Balance(wallet, (tokenBalance: number) => {
      balances.x7002 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7002";
      }));
    }, () => handleGetDataError("x7002"));
    SmartContract.getX7003Balance(wallet, (tokenBalance: number) => {
      balances.x7003 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7003";
      }));
    }, () => handleGetDataError("x7003"));
    SmartContract.getX7004Balance(wallet, (tokenBalance: number) => {
      balances.x7004 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7004";
      }));
    }, () => handleGetDataError("x7004"));
    SmartContract.getX7005Balance(wallet, (tokenBalance: number) => {
      balances.x7005 = tokenBalance;
      setSyncing(syncing.filter((el) => {
        return el !== "x7005";
      }));
    }, () => handleGetDataError("x7005"));
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
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" align='left' sx={{ flexGrow: 1 }} component="div">
                  X7 Dashboard
                </Typography>
                <Button color='inherit' onClick={switchValueCurrency} sx={{ mr: '10px' }}>{valueCurrency}</Button>
                {!connected ?
                  <Button color='success' variant='outlined' onClick={() => toggleWalletConnectionDialog(true)}>Connect</Button>
                  :
                  <Button color='error' variant='outlined' onClick={disconnect}>Disconnect</Button>
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
                } else {
                  handleNotConnected();
                }
              }} setNode={switchNode} tokens={balance} ethPrice={ethPrice} x7priceData={x7PriceData} valueCurrency={valueCurrency} node={node} smartContract={SmartContract} />} />
              <Route path="/trade" element={<UniswapTradeComponent />} />
              <Route path="/v1" element={<V1ResourcesComponent />} />
              {/* <Route path="/v2" element={<V2ResourcesComponent />} /> */}
              <Route path="/ecosystem" element={<EcosystemComponent />} />
              <Route path="/community" element={<CommunityComponent />} />
            </Routes>
          </Box>
          <Snackbar sx={{ mt: 10 }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} open={errorSnackBarOpen} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
            <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
              {snackBarText}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Router>
    </div>

  );
}

export default App;