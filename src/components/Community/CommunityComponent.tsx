import { useEffect, useRef } from 'react'
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

    const style = (theme: any) => ({
        display: 'inline-grid',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        pt: 2,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: { sm: '1fr 6fr 1fr' },
            gridTemplateAreas: `
            'column-2' 
            'column-1' 
            'column-3'`,
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateAreas: `
            'column-2 column-2' 
            'column-1 column-3'`,
            gridTemplateColumns: { lg: '1fr 6fr 1fr' },
        },
        [theme.breakpoints.up('lg')]: {
            gridTemplateAreas: `
            'column-1 column-2 column-3'`,
            gridTemplateColumns: { lg: '1fr 6fr 1fr' },
        },
    });
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?19";
        script.setAttribute("data-telegram-post", "X7announcements/55");
        script.setAttribute("data-dark", "1");
        script.setAttribute("data-userpic", "false");
        ref.current?.appendChild(script)
    }, []);
    return (
        <Box sx={style}>
            <Box gridArea={'column-1'} >
                <iframe title='Discord Widget' src="https://discord.com/widget?id=1016657044553617428&theme=dark" height={500} style={{ border: '0' }} sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
            </Box>
            <Box gridArea={'column-2'}>
                <Box sx={{ pb: 5, display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, rowGap: 3, gridAutoRows: 'min-content' }} >
                    <CommunityCard communityName={'Telegram Community'} imageSrc={telegramLogo} description={'Main community on telegram channel. Join us!'} path={'t.me/X7m105portal'} />
                    <CommunityCard communityName={'Website'} imageSrc={webpageLogo} description={'Official website, which developers made.'} path={'x7.finance'} />
                    <CommunityCard communityName={'Discord'} imageSrc={discordLogo} description={'Join us on Discord if you prefer it over Telegram.'} path={'discord.gg/4J88bkpZqA'} />
                    <CommunityCard communityName={'Twitter'} imageSrc={twitterLogo} description={'Stay up with the tweets about X7 ecosystem.'} path={'twitter.com/X7_Finance'} />
                    <CommunityCard communityName={'YouTube'} imageSrc={youtubeLogo} description={'Watch our videos and talks on YouTube.'} path={'youtube.com/channel/UCYnIyBwiomfUUAnjCbNFkqw'} />
                    <CommunityCard communityName={'Announcements'} imageSrc={telegramLogo} description={'Stay up with all the new messages and other X7 announcements.'} path={'t.me/X7announcements'} />
                    <CommunityCard communityName={'Research'} imageSrc={telegramLogo} description={'Do you want to research X7 ecosystem? Maybe you\'re just curious what other found out. Join us in research group.'} path={'t.me/X7m105_Research'} />
                    <CommunityCard communityName={'X7 Force'} imageSrc={telegramLogo} description={'Do you want to shill the best project that currently exists? Join us and be a part of the bigger space force out there.'} path={'t.me/X7ARMY'} />
                    <CommunityCard communityName={'Media Channel'} imageSrc={telegramLogo} description={'You can find our new media content in here.'} path={'t.me/X7MediaChannel'} />
                    <CommunityCard communityName={'Medium'} imageSrc={mediumLogo} description={'On Medium you can find our community made article about X7 ecosystem.'} path={'t.co/9mzFRkTraY'} />
                    <CommunityCard communityName={'Dune Analytics'} imageSrc={duneLogo} description={'Check out all the analytics about X7 ecosystem.'} path={'dune.com/0xawesomedata/x7m105'} />
                    <CommunityCard communityName={'Donate'} imageSrc={ethereumLogo} description={'Want this webpage to grow? Consider donating: \n0xd5e514c6C2bdd7F611F5E36Ce6a433f08E58e177'} path={''} />
                </Box>
            </Box>
            <Box gridArea={'column-3'}>
                <Box><div ref={ref} ></div></Box>
            </Box>
        </Box>
    );
}

const makeCardClickable = (link: string) => {
    if (link !== '')
        window.open('https://' + link)
}

function CommunityCard(props: CommunityCardProps) {
    return (
        <Container maxWidth={'sm'}>
            <Card elevation={2} sx={{ display: 'flex', p: '1em', height: '100%' }} onClick={() => { makeCardClickable(props.path) }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Box padding={0.5}>
                            <img alt='community element logo' src={props.imageSrc} width={50} height={50} />
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
        </Container>
    );
}