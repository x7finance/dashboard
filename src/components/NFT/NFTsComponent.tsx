import { Box } from "@mui/material";
import * as Addresses from '../../EthereumAddresses';
import NFTsComponentElement from './NFTsComponentElement';
import MagisterIcon from '../../assets/nftVideos/magister.mp4';
import LiquidityIcon from '../../assets/nftVideos/liquidity.mp4';
import EcosystemIcon from '../../assets/nftVideos/ecosystem.mp4';
import BorrowingIcon from '../../assets/nftVideos/borrowing.mp4';
import DexIcon from '../../assets/nftVideos/dex.mp4';

export default function NFTsComponent() {
    return (
        <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '1fr 1fr 1fr', md: '1fr 1fr', sm: '1fr' }, rowGap: 3, gridAutoRows: 'min-content' }} >
                <NFTsComponentElement name="MAGISTER"
                    contract={Addresses.NFTs.Magister.ca} objective={"Veto power in DAO votes"}
                    description={"MAGISTER NFTs are designed to give investors responsible access to higher DAO voting privileges. Providing this ensures a proper array of checks and balances to the ecosystem. The MAGISTER NFTs also provide owners with the similar high tier benefits of Ecosystem, Liquidity, Dex and Borrower Maxi NFTs."}
                    benefits={["Majority MAGISTER vote overrides 50-75% DAO vote", "50% discount on DEX LP fee", "20% loan origination fee reduction"]}
                    path={`opensea.io/collection/${Addresses.NFTs.Magister.openSeaID}`}
                    icon={MagisterIcon} />

                <NFTsComponentElement name="Liquidity MAXI"
                    contract={Addresses.NFTs.LiquidityMaxi.ca}
                    objective={"Arbitrage optimizer"}
                    description={"Liquidity Maxi NFTs are designed to provide added insurance to larger price movements. Ownership is for those who aim to preserve as much capital as possible while trading."}
                    benefits={["50% fee discount on X7100", "25% fee discount on X7R", "15% fee discount on X7DAO"]}
                    path={`opensea.io/collection/${Addresses.NFTs.LiquidityMaxi.openSeaID}`}
                    icon={LiquidityIcon} />

                <NFTsComponentElement name="Ecosystem MAXI"
                    contract={Addresses.NFTs.EcosystemMaxi.ca}
                    objective={"Lower fees on trades"}
                    description={"Ecosystem Maxi NFTs are for your everyday X7 maximalist. Ownership will provide traders with added flexibility during their trading experience between trading pairs."}
                    benefits={["25% fee discount on X7100", "10% fee discount on X7DAO and X7R"]}
                    path={`opensea.io/collection/${Addresses.NFTs.EcosystemMaxi.openSeaID}`}
                    icon={EcosystemIcon} />

                <NFTsComponentElement name="Borrowing MAXI"
                    contract={Addresses.NFTs.BorrowingMaxi.ca}
                    objective={"Borrow at lower costs"}
                    description={"Borrowing Maxi NFTs will provide borrowers within our ILO Dex platform a significant advantage in their loan terms. Owning this NFT will reduce overall risk for lenders and borrowers while simultaneously allowing easier liquidity acquisition for DeFi entrepreneurs."}
                    benefits={["10% loan origination fee reduction", "20% loan premium discount"]}
                    path={`opensea.io/collection/${Addresses.NFTs.BorrowingMaxi.openSeaID}`}
                    icon={BorrowingIcon} />

                <NFTsComponentElement name="DEX MAXI"
                    contract={Addresses.NFTs.DexMaxi.ca}
                    objective={"Lower costs on Xchange"}
                    description={"Dex Maxi NFTs provide users of our Dex an additional layer of flexibility during trading. Dex users will find this NFT useful towards a more frictionless trading experience."}
                    benefits={["50% discount on DEX LP fee"]}
                    path={`opensea.io/collection/${Addresses.NFTs.DexMaxi.openSeaID}`}
                    icon={DexIcon} />
            </Box>
        </Box>
    );
}