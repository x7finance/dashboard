import { useState } from 'react';
import { Box, Divider, Typography, Checkbox, Button, FormControlLabel, FormGroup, Paper } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material/';
import MetaMaskService from '../../services/MetaMaskService'

export default function DashboardUtilityComponent() {
    const [tokenListData, setTokenListData] = useState(
        {
            X7M105: { status: true, function: MetaMaskService.addX7M105ToWatchList },
            X7DAO: { status: true, function: MetaMaskService.addX7DAOToWatchList },
            X7: { status: true, function: MetaMaskService.addX7ToWatchList },
            X7001: { status: true, function: MetaMaskService.addX7001ToWatchList },
            X7002: { status: true, function: MetaMaskService.addX7002ToWatchList },
            X7003: { status: true, function: MetaMaskService.addX7003ToWatchList },
            X7004: { status: true, function: MetaMaskService.addX7004ToWatchList },
            X7005: { status: true, function: MetaMaskService.addX7005ToWatchList }
        }
    );

    const elementSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        var tokens = { ...tokenListData };
        Object.entries(tokens).map(([key, value]) => {
            if (key === event.target.name) {
                value.status = !value.status;
            }
        });

        setTokenListData(tokens);
    }

    const addSelectedTokensToMetaMask = () => {
        if (window.ethereum?.isConnected && window.ethereum.isMetaMask) {
            Object.entries(tokenListData).map(([_, value]) => {
                if (value.status) {
                    value.function();
                }
            });
        }
        else {
            if (!window.ethereum?.isMetaMask) {
                MetaMaskService.warnUserToInstallMetaMask();
            } else
                if (!window.ethereum?.isConnected) {
                    MetaMaskService.warnUserToConnectMetaMask();
                }
        }
    }

    return (
        <Box>
            <Divider sx={{ mt: 3 }} />
            <Typography mt={3} variant='h5' width={'100%'} display="flex" flexDirection="row">Utility</Typography>
            <Box display="flex" sx={{ justifyContent: "start" }}>
                <Paper sx={{ mt: 3, p: 3, display: 'inline-flex', flexWrap: 'wrap', flexDirection: 'column' }} >
                    <Typography align='left' mb={2}>Select all the X7 tokens you<br /> want to add to metamask.</Typography>
                    <FormGroup>
                        {Object.entries(tokenListData).map(([key, value]) => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={value.status} onChange={elementSelected} name={key} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' />
                                    }
                                    key={key}
                                    label={key} />
                            );
                        })}
                    </FormGroup>
                    <Button variant='outlined' color='inherit' sx={{ mt: 3 }}
                        onClick={addSelectedTokensToMetaMask}>Add selected to MetaMask</Button>
                </Paper >
            </Box>
        </Box>
    );
}