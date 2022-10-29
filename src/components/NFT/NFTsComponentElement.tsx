import { Container, Card, Box, Typography, Button, Paper, List, ListItemText, ListItem, Divider, ListItemIcon } from "@mui/material";
import { Done } from '@mui/icons-material';

export interface NFTCardProps {
    name: string,
    contract: string,
    description?: string,
    objective?: string,
    benefits: string[],
    path: string,
    icon: string
}

export default function ResourcesComponentTableRow(props: NFTCardProps) {
    return (
        <Container maxWidth={'sm'}>
            <Card elevation={2} sx={{ display: 'flex', pb: '1em', height: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Box>
                        <video autoPlay loop muted width={"100%"} style={{ boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }}>
                            <source src={props.icon} type="video/mp4" />
                        </video>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, pr: 5, pl: 5, height: '100%' }}>
                        <Typography justifyContent={"flex-start"} variant={'h5'} sx={{ pb: '1em', pt: "0.5em" }} >
                            {props.objective}
                        </Typography >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography align="justify" pb={2}>
                                {props.description}
                            </Typography>
                        </Box>
                        <List>
                            {props.benefits.map((benefit) => {
                                return (<div key={benefit.substring(0, 10)}><ListItem>
                                    <ListItemIcon style={{ maxWidth: "100%" }}>
                                        <Done sx={{ mr: 2 }} color={"success"} />
                                        <ListItemText secondary={benefit} />
                                    </ListItemIcon>
                                </ListItem><Divider component="li" /></div>)
                            })}
                        </List>

                        <Typography sx={{ mt: 2 }} textAlign="left">
                            {props.contract}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', wordBreak: 'break-word' }} mr={3} mt={1}>
                        <Button color='inherit' onClick={() => { makeCardClickable(props.path) }} style={{ padding: 10 }} >OpenSea</Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );

}

const makeCardClickable = (link: string) => {
    if (link !== '')
        window.open('https://' + link)
}
