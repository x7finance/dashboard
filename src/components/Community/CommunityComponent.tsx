import { Box, Container, Card, Typography, Button } from '@mui/material';
import discordLogo from '../../assets/images/discordLogo-w.png'
import telegramLogo from '../../assets/images/telegramLogo-w.png'
import mediumLogo from '../../assets/images/mediumLogo.png'
import webpageLogo from '../../assets/images/webpageLogo.png'
import youtubeLogo from '../../assets/images/youtubeLogo.png'
import duneLogo from '../../assets/images/DuneAnalyticsLogo.png'
import twitterLogo from '../../assets/images/twitterLogo.png'
import ethereumLogo from '../../assets/images/ethereumLogo.png';

interface CommunityCardProps {
    imageSrc: string,
    communityName: string,
    description: string,
    path: string,
}

export default function CommunityComponent() {

    return (
        <Box sx={{ pt: 2, pb: 5, display: 'inline-grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 5, rowGap: 3 }}>
            <CommunityCard communityName={'Telegram Community'} imageSrc={telegramLogo} description={'Main community on telegram channel. Join us!'} path={'https://t.me/X7m105portal'} />
            <CommunityCard communityName={'Website'} imageSrc={webpageLogo} description={'Official website, which developers made.'} path={'https://x7.finance'} />
            <CommunityCard communityName={'Discord'} imageSrc={discordLogo} description={'Join us on Discord if you prefer it over Telegram.'} path={'https://discord.gg/4J88bkpZqA'} />
            <CommunityCard communityName={'Twitter'} imageSrc={twitterLogo} description={'Stay up with the tweets about X7 ecosystem.'} path={'https://twitter.com/X7_Finance'} />
            <CommunityCard communityName={'YouTube'} imageSrc={youtubeLogo} description={'Watch our videos and talks on YouTube.'} path={'https://www.youtube.com/channel/UCYnIyBwiomfUUAnjCbNFkqw'} />
            <CommunityCard communityName={'Announcements'} imageSrc={telegramLogo} description={'Stay up with all the new messages and other X7 announcements.'} path={'https://t.me/X7announcements'} />
            <CommunityCard communityName={'Research'} imageSrc={telegramLogo} description={'Do you want to research X7 ecosystem? Maybe you\'re just curious what other found out. Join us in research group.'} path={'https://t.me/X7m105_Research'} />
            <CommunityCard communityName={'X7 Force'} imageSrc={telegramLogo} description={'Do you want to shill the best project that currently exists? Join us and be a part of the bigger space force out there.'} path={'https://t.me/X7ARMY'} />
            <CommunityCard communityName={'Media Channel'} imageSrc={telegramLogo} description={'You can find our new media content in here.'} path={'https://t.me/X7MediaChannel'} />
            <CommunityCard communityName={'Medium'} imageSrc={mediumLogo} description={'On Medium you can find our community made article about X7 ecosystem.'} path={'https://t.co/9mzFRkTraY'} />
            <CommunityCard communityName={'Dune Analytics'} imageSrc={duneLogo} description={'Check out all the analytics about X7 ecosystem.'} path={'https://dune.com/0xawesomedata/x7m105'} />
            <CommunityCard communityName={'Donate'} imageSrc={ethereumLogo} description={'Want this webpage to grow? Consider donating: \n0xd5e514c6C2bdd7F611F5E36Ce6a433f08E58e177'} path={''} />
        </Box>)
}

const makeCardClickable = (link: string) => {
    if (link !== '')
        window.open(link)
}

function CommunityCard(props: CommunityCardProps) {
    return (
        <Container maxWidth={'sm'}>
            <a onClick={() => { makeCardClickable(props.path) }}>
                <Card sx={{ display: 'flex', p: '1em', height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <Box padding={0.5}>
                                <img src={props.imageSrc} width={50} height={50} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
                                <Typography variant={'h4'} sx={{ pb: '10px' }}>
                                    {props.communityName}
                                </Typography>
                                <Typography align='left' sx={{ pl: '1.5em', wordBreak: 'break-word' }} >
                                    {props.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', wordBreak: 'break-word', width: '100%' }}>
                            <Button color='inherit' sx={{ textAlign: 'right' }}>{props.path}</Button>
                        </Box>
                    </Box>
                </Card>
            </a>
        </Container>
    );
}