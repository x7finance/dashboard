import { Paper, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ResourcesComponentTableRow from '../ResourcesComponentTableRow';
import * as Addresses from '../../../EthereumAddresses';

export default function V1ResourcesComponent() {
    return (
        <Box>
            <Typography variant='h4' pb={3}>Tokens</Typography>
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
                            <ResourcesComponentTableRow name="X7DAO" contract={Addresses.X7DAO} description="Governance token" path={`https://etherscan.io/token/${Addresses.X7DAO}`} />
                            <ResourcesComponentTableRow name="X7M105" contract={Addresses.X7m105} description="Reward token" path={`https://etherscan.io/token/${Addresses.X7m105}`} />
                            <ResourcesComponentTableRow name="X7 Protocol" contract={Addresses.X7} description="DEX token" path={`https://etherscan.io/token/${Addresses.X7}`} />
                            <ResourcesComponentTableRow name="X7001" contract={Addresses.X7001} description="First of price consistent collection" path={`https://etherscan.io/token/${Addresses.X7001}`} />
                            <ResourcesComponentTableRow name="X7002" contract={Addresses.X7002} description="Second of price consistent collection" path={`https://etherscan.io/token/${Addresses.X7002}`} />
                            <ResourcesComponentTableRow name="X7003" contract={Addresses.X7003} description="Third of price consistent collection" path={`https://etherscan.io/token/${Addresses.X7003}`} />
                            <ResourcesComponentTableRow name="X7004" contract={Addresses.X7004} description="Fourth of price consistent collection" path={`https://etherscan.io/token/${Addresses.X7004}`} />
                            <ResourcesComponentTableRow name="X7005" contract={Addresses.X7005} description="Fifth of price consistent collection" path={`https://etherscan.io/token/${Addresses.X7005}`} />
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
                            <ResourcesComponentTableRow name="X7DAO developer" contract="0x7000a09c425abf5173ff458df1370c25d1c58105" description="X7DAO developer address. From this address developers send most of their onchain messages" path="https://etherscan.io/address/0x7000a09c425abf5173ff458df1370c25d1c58105" />
                            <ResourcesComponentTableRow name="X7DAO deployer" contract="0x7565ce5e02d368bb3aec044b7c3398911e27db1e" description="Currently most important wallet, because all news come from this wallet" path="https://etherscan.io/address/0x7565ce5e02d368bb3aec044b7c3398911e27db1e" />
                            <ResourcesComponentTableRow name="X7M105 & X7 deployer" contract="0x8fe821fb171076b850a3048b9aad7600be8d0f30" description="Deployer the first token (X7M105) and X7 protocol token" path="https://etherscan.io/address/0x8fe821fb171076b850a3048b9aad7600be8d0f30" />
                            <ResourcesComponentTableRow name="X7M105 developer" contract="0x8a790d1e746C2621E12c66fb1523672a97B502F7" description="X7M105 developer's wallet" path="https://etherscan.io/address/0x8a790d1e746C2621E12c66fb1523672a97B502F7" />
                            <ResourcesComponentTableRow name="X7 developer" contract="0x69dbc4f1527791fEA8f9b61D4d264a54F2627369" description="X7 developer's wallet" path="https://etherscan.io/address/0x69dbc4f1527791fEA8f9b61D4d264a54F2627369" />
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
}