import { Paper, Container, IconButton, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ResourcesComponentTableRowProps {
    name: string,
    contract: string,
    description: string,
    path: string
}

export default function V1ResourcesComponent() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <Typography variant='h4' pb={3}>Tokens</Typography>
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Contract</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ResourcesComponentTableRow name="X7DAO" contract="0x7105aa393b9cf9b2497b460837313ea3dba67da0" description="Governance token" path="https://etherscan.io/token/0x7105aa393b9cf9b2497b460837313ea3dba67da0" />
                            <ResourcesComponentTableRow name="X7M105" contract="0x06d5ca7c9accd15a87d4993a421b7e702bdbab20" description="Reward token" path="https://etherscan.io/token/0x06d5ca7c9accd15a87d4993a421b7e702bdbab20" />
                            <ResourcesComponentTableRow name="X7 Protocol" contract="0x33dad834eca1290a330c4c4634bc3b64a0197120" description="DEX token" path="https://etherscan.io/token/0x33dad834eca1290a330c4c4634bc3b64a0197120" />
                            <ResourcesComponentTableRow name="X7001" contract="0x7001629b8bf9a5d5f204b6d464a06f506fbfa105" description="First of price consistent collection" path="https://etherscan.io/token/0x7001629b8bf9a5d5f204b6d464a06f506fbfa105" />
                            <ResourcesComponentTableRow name="X7002" contract="0x70021e5eda64e68f035356ea3dce14ef87b6f105" description="Second of price consistent collection" path="https://etherscan.io/token/0x70021e5eda64e68f035356ea3dce14ef87b6f105" />
                            <ResourcesComponentTableRow name="X7003" contract="0x70036ddf2f2850f6d1b9d78d652776a0d1cab105" description="Third of price consistent collection" path="https://etherscan.io/token/0x70036ddf2f2850f6d1b9d78d652776a0d1cab105" />
                            <ResourcesComponentTableRow name="X7004" contract="0x70041db5acdf2f8aa648a000fa4a87067abae105" description="Fourth of price consistent collection" path="https://etherscan.io/token/0x70041db5acdf2f8aa648a000fa4a87067abae105" />
                            <ResourcesComponentTableRow name="X7005" contract="0x7005d9011f4275747d5cb38bc3deb0c46edbd105" description="Fifth of price consistent collection" path="https://etherscan.io/token/0x7005d9011f4275747d5cb38bc3deb0c46edbd105" />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Typography variant='h4' pt={6} pb={3}>Wallets</Typography>
            <Container maxWidth={'lg'}>
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Wallet</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ResourcesComponentTableRow name="X7DAO deployer" contract="0x7565ce5e02d368bb3aec044b7c3398911e27db1e" description="Currently most important wallet, because all news come from this wallet" path="https://etherscan.io/address/0x7565ce5e02d368bb3aec044b7c3398911e27db1e" />
                            <ResourcesComponentTableRow name="X7M105 & X7 deployer" contract="0x8fe821fb171076b850a3048b9aad7600be8d0f30" description="Deployer the first token (X7M105) and X7 protocol token" path="https://etherscan.io/address/0x8fe821fb171076b850a3048b9aad7600be8d0f30" />
                            <ResourcesComponentTableRow name="Gnosis multisignature" contract="0x5CF4288Bf373BBe17f76948E39Baf33B9f6ac2e0" description="Wallet signed by all the developers" path="https://gnosis-safe.io/app/eth:0x5CF4288Bf373BBe17f76948E39Baf33B9f6ac2e0" />
                            <ResourcesComponentTableRow name="X7 Protocol Marketing" contract="0x76685a61585010B7855436906E50c05f91d316F9" description="X7 Protocol token marketing wallet. NOT YET USED" path="https://etherscan.io/address/0x76685a61585010B7855436906E50c05f91d316F9" />
                            <ResourcesComponentTableRow name="X7M105 & X7DAO Marketing" contract="0x5Bacb575b88888D08231b65B243419eDe49D1795" description="X7M105 and X7DAO tokens marketing wallet. NOT YET USED" path="https://etherscan.io/address/0x5Bacb575b88888D08231b65B243419eDe49D1795" />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Typography variant='h4' pt={6} pb={3}>Contracts</Typography>
            <Container maxWidth={'lg'}>
                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Contract</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ResourcesComponentTableRow name="BuyX7Evenly" contract="0x7000862F50E771d91E7CD1Df8036a2Ff6a822D1F" description="Utility for the community to evenly buy into the X700 series." path="https://etherscan.io/address/0x7000862F50E771d91E7CD1Df8036a2Ff6a822D1F" />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )

    function ResourcesComponentTableRow({ name, contract, description, path }: ResourcesComponentTableRowProps) {
        return (
            <TableRow>
                <TableCell>
                    <b>{name}</b>
                </TableCell>
                <TableCell style={{ wordBreak: "break-word" }}>
                    {description}
                </TableCell>
                <TableCell style={{ wordBreak: "break-word", width: "14.5em", maxWidth: "14.5em" }}>
                    {contract}
                </TableCell>
                <TableCell align="right" width={2}>
                    <IconButton onClick={() => { window.open(path, "_self") }}>
                        <OpenInNewIcon style={{ color: "inherit" }} />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}