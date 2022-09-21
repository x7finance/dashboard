import fullecosystemdiagram from '../../assets/images/fullEcosystemDiagram.png'
import { Box } from '@mui/material'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function EcosystemComponent() {
    return (
        <Zoom>
            <Box component="img" src={fullecosystemdiagram} sx={{ boxShadow: '5' }} />
        </Zoom>
    )
}