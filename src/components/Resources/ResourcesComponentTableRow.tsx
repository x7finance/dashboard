import { IconButton, TableCell, TableRow } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ResourcesComponentTableRowProps {
    name: string,
    contract: string,
    description: string,
    path: string
}

export default function ResourcesComponentTableRow({ name, contract, description, path }: ResourcesComponentTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <b>{name}</b>
            </TableCell>
            <TableCell style={{ wordBreak: "break-word" }}>
                {description}
            </TableCell>
            <TableCell style={{ wordBreak: "break-word", maxWidth: "15em" }}>
                {contract}
            </TableCell>
            <TableCell align="right" width={2}>
                <IconButton onClick={() => { window.open(path) }}>
                    <OpenInNewIcon style={{ color: "inherit" }} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}