import { TableRow, TableCell, Typography } from "@mui/material";

interface MigratedDataTableRowProps {
    tokenName: string,
    percentage: number,
    formattedAmount: number,
}

export default function MigratedDataTableRow({ tokenName, percentage, formattedAmount }: MigratedDataTableRowProps) {
    return (
        <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="h6">
                    {tokenName}
                </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="h6">
                    {percentage} % ({formattedAmount.toLocaleString()})
                </Typography>
            </TableCell>
        </TableRow>
    );
}