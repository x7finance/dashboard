import { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import MetaMaskService from '../../services/MetaMaskService'
import DashboardAddTokensToMetamaskList from './DashboardAddTokensToMetamaskList'

export default function DashboardUtilityComponent() {
    const [tokenListDataV1, setTokenListData] = useState(
        {
            X7M105: { status: true, function: MetaMaskService.addX7M105ToWatchList, disabled: false },
            X7DAO: { status: true, function: MetaMaskService.addX7DAOToWatchList, disabled: false },
            X7: { status: true, function: MetaMaskService.addX7ToWatchList, disabled: false },
            X7001: { status: true, function: MetaMaskService.addX7001ToWatchList, disabled: false },
            X7002: { status: true, function: MetaMaskService.addX7002ToWatchList, disabled: false },
            X7003: { status: true, function: MetaMaskService.addX7003ToWatchList, disabled: false },
            X7004: { status: true, function: MetaMaskService.addX7004ToWatchList, disabled: false },
            X7005: { status: true, function: MetaMaskService.addX7005ToWatchList, disabled: false },
        }
    );
    const [tokenListDataV2, setTokenListDataV2] = useState(
        {
            X7R: { status: true, function: MetaMaskService.addX7RToWatchList, disabled: false },
            X7DAO: { status: true, function: MetaMaskService.addX7DAOv2ToWatchList, disabled: false },
            X7101: { status: true, function: MetaMaskService.addX7101ToWatchList, disabled: false },
            X7102: { status: true, function: MetaMaskService.addX7102ToWatchList, disabled: false },
            X7103: { status: true, function: MetaMaskService.addX7103ToWatchList, disabled: false },
            X7104: { status: true, function: MetaMaskService.addX7104ToWatchList, disabled: false },
            X7105: { status: true, function: MetaMaskService.addX7105ToWatchList, disabled: false },
            X7D: { status: false, function: MetaMaskService.addX7DToWatchList, disabled: true },
        }
    )

    return (
        <Box>
            <Divider sx={{ mt: 3 }} />
            <Typography mt={3} variant='h5' width={'100%'} display="flex" flexDirection="row">Utility</Typography>
            <Box display="flex" sx={{ justifyContent: "start", pt: 3 }}>
                <DashboardAddTokensToMetamaskList tokenData={tokenListDataV1} setTokenListData={setTokenListData} title={'V1'} />
                <DashboardAddTokensToMetamaskList tokenData={tokenListDataV2} setTokenListData={setTokenListDataV2} title={'V2'} />
            </Box>
        </Box>
    );
}