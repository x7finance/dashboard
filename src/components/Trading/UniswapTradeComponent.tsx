import { useState } from 'react';
import { Box, Paper } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

export default function UniswapTradeComponent() {
    const [loading, setLoading] = useState(true);

    const frameLoaded = () => {
        setLoading(false);
    }

    const getLoadingProgressStatus = () => {
        if (loading) {
            return (<Box display="flex"
                justifyContent="center"
                alignItems="center" height={"600px"}><CircularProgress /></Box>)
        }
        return (<></>)
    }

    return (
        <Box height="600px"
            width="100%">
            {getLoadingProgressStatus()}
            <Box visibility={loading ? "hidden" : "visible"}>
                <Paper elevation={10} sx={{ display: 'inline-flex', minWidth: "300px", maxWidth: "800px", width: '100%', }}>
                    <iframe onLoad={frameLoaded}
                        title="Uniswap"
                        src="https://app.uniswap.org/#/swap?outputCurrency=0x7105AA393b9cF9b2497b460837313EA3dBA67Da0"
                        height={800}
                        width="100%"
                        style={{
                            border: "0",
                            margin: "auto",
                            display: "block",
                            borderRadius: "10px",
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    )
};