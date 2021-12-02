import React from "react";
import { Table } from "react-bootstrap";
import { fromCentsToBrazilianCurrency } from "../../../functions/fromCentsToBRLString";

export function OperationsListTable() {
  const [stats, setStats] = React.useState(1);

  const getLineColorFromOpContext = (op: number): string => {
    if (op > 2 && op < 5) {
      return "text-primary";
    }
    if (op > 0 && op < 3) {
      return "text-danger";
    }
    return "text-secondary";
  };

  const getOperationDescriptionFromOpContext = (op: number): string => {
    if (op === 1) {
      return "MONEY WITHDRAW";
    }
    if (op === 2) {
      return "MONEY TRANSFER MADE";
    }
    if (op === 3) {
      return "MONEY DEPOSIT";
    }
    if (op === 4) {
      return "MONEY TRANSFER RECEIVED";
    }
    return "UNKNOWN OPERATION";
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Operation</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>11 NOV</td>
          <td>{getOperationDescriptionFromOpContext(1)}</td>
          <td className={getLineColorFromOpContext(1)}>
            {fromCentsToBrazilianCurrency(50000)}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2}>Total Operations: {stats}</th>
          <th>{fromCentsToBrazilianCurrency(50000)}</th>
        </tr>
      </tfoot>
    </Table>
  );
}
