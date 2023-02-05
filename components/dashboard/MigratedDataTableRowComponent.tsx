interface MigratedDataTableRowProps {
  tokenName: string;
  percentage: number;
  formattedAmount: number;
}

export default function MigratedDataTableRow({
  tokenName,
  percentage,
  formattedAmount,
}: MigratedDataTableRowProps) {
  return (
    <tr>
      <td>
        <h6>{tokenName}</h6>
      </td>
      <td>
        <h6>
          {percentage} % ({formattedAmount.toLocaleString()})
        </h6>
      </td>
    </tr>
  );
}
