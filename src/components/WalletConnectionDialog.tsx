import { useState } from 'react';
import { Dialog, DialogTitle, Box, Button, Paper, TextField, Typography } from '@mui/material';
import metamaskLogo from '../assets/images/MetamaskLogo.png'
import Web3 from 'web3';

interface WalletConnectionDialogProps {
    open: boolean,
    toggleDialog: Function,
    connectMetamask: Function,
    setAddress: Function,
    openSnackbar: Function,
    address: string,
    applyAddress: Function,
    setConnected: Function,
}

export default function WalletConnectionDialog({ open, toggleDialog, connectMetamask, setAddress, openSnackbar, address, applyAddress, setConnected }: WalletConnectionDialogProps) {
    const [walletAddress, setWalletAddress] = useState('');
    const onCloseDialog = () => {
        toggleDialog(false);
        if (Web3.utils.isAddress(walletAddress)) {
            if (address === walletAddress)
                return;
            setAddress(walletAddress);
            applyAddress(walletAddress);
            setConnected(true);
            setWalletAddress('');
        } else {
            if (walletAddress === '')
                return;
            openSnackbar();
        }
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} fullWidth={true} maxWidth={'md'}>
            <DialogTitle variant='h4' align='center'>Import your wallet</DialogTitle>
            <Box
                sx={{
                    p: 4,
                    pt: 1,
                    display: 'inline-grid',
                    gridTemplateColumns: { sm: '1fr 1fr' },
                    gap: 4,
                }}>
                <Paper sx={{ justifyItems: 'center', flex: 1, display: 'flex' }}>
                    <Button sx={{ m: 2, display: 'flex', flex: 1, flexDirection: 'column' }} color='inherit' onClick={() => {
                        if (window.ethereum?.isMetaMask) {
                            setWalletAddress('')
                            toggleDialog(false);
                            connectMetamask();
                        } else {
                            alert("You need metamask for this");
                        }
                    }}>
                        <img alt={'Metamask logo'} src={metamaskLogo} width={60} height={60}></img>
                        <Typography ml={2.5} variant={'h6'} color='inherit'>Connect with Metamask</Typography>
                    </Button>
                </Paper>
                <Paper sx={{ pt: 2, pb: 2, display: 'grid', flex: 1, justifyItems: "center" }}>
                    <Typography variant={'h6'} sx={{ pb: 2 }}>Input wallet address</Typography>
                    <Box p={2} flex={1} width={'100%'} >
                        <TextField value={walletAddress} onChange={(event) => { setWalletAddress(event.target.value) }} label='Wallet' variant='outlined' fullWidth >
                        </TextField>
                        <Button variant='outlined' color='success' sx={{ mt: 2, pt: 1.5, pb: 1.5, pl: 5, pr: 5 }} onClick={onCloseDialog}>Connect</Button>
                    </Box>
                </Paper>
            </Box>
        </Dialog>
    )
}