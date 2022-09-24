import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from "@mui/material";
import MetaMaskService from '../../services/MetaMaskService'

interface DashboardAddTokensToMetamaskListProps {
    tokenData: TokenListDataV1 | TokenListDataV2,
    setTokenListData: Function,
    title: string
}

export interface TokenListDataV1 {
    X7M105: TokenData,
    X7: TokenData,
    X7DAO: TokenData,
    X7001: TokenData,
    X7002: TokenData,
    X7003: TokenData,
    X7004: TokenData,
    X7005: TokenData,
}
export interface TokenListDataV2 {
    X7R: TokenData,
    X7DAO: TokenData,
    X7D: TokenData,
    X7101: TokenData,
    X7102: TokenData,
    X7103: TokenData,
    X7104: TokenData,
    X7105: TokenData,
}

export interface TokenData {
    status: boolean,
    function: Function,
    disabled: boolean
}

export default function DashboardAddTokensToMetamaskList({ tokenData, setTokenListData, title }: DashboardAddTokensToMetamaskListProps) {

    const elementSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        var tokens = { ...tokenData };
        Object.entries(tokens).forEach(([key, value]) => {
            if (key === event.target.name) {
                value.status = !value.status;
            }
        });

        setTokenListData(tokens);
    }

    const addSelectedTokensToMetaMask = () => {
        if (window.ethereum?.isConnected && window.ethereum.isMetaMask) {
            Object.entries(tokenData).forEach(([_, value]) => {
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
        <Paper sx={{ mt: 3, p: 3, display: 'inline-flex', flexWrap: 'wrap', flexDirection: 'column', mr: 5 }} >
            <Typography align='left' variant='h4'>{title}</Typography>
            <Typography align='left' mb={2}>Select all the X7 tokens you<br /> want to add to metamask.</Typography>
            <FormGroup sx={{ mb: 2 }}>
                {Object.entries(tokenData).map(([key, value]) => {
                    return (
                        <FormControlLabel
                            control={
                                <Checkbox checked={value.status} onChange={elementSelected} name={key} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' />
                            }
                            key={key}
                            label={key}
                            disabled={value.disabled}
                        />
                    );
                })}
            </FormGroup>
            <Button variant='outlined' color='inherit'
                onClick={addSelectedTokensToMetaMask}>Add selected to MetaMask</Button>
        </Paper >
    )
}