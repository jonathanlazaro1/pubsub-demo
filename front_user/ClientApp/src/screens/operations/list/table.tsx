import { compareDesc, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import React from "react";
import { Table } from "react-bootstrap";
import { useUserContext } from "../../../context/user";
import { fetchApiDateReviver } from "../../../functions/fetchApiDateReviver";
import { fromCentsToBrazilianCurrency } from "../../../functions/fromCentsToBRLString";
import { Operation } from "../../../models/operation";
import { OperationType } from "../../../models/operationType";

export function OperationsListTable() {
  const userContext = useUserContext();

  const [operations, setOperations] = React.useState<Operation[] | null>([]);

  const getOperations = async () => {
    if (!userContext?.user) return;

    const operationsResponse = await fetch(
      `Balance/${userContext.user.id}/Operations`
    );
    if (operationsResponse.ok) {
      const newOperations = JSON.parse(
        await operationsResponse.text(),
        fetchApiDateReviver
      ) as Operation[];

      setOperations(newOperations);
    }
  };

  React.useEffect(() => {
    getOperations();

    return () => {};
  }, []);

  const getLineColorFromOpContext = (op: Operation): string => {
    if (
      op.type === OperationType.INCOMING ||
      (op.type === OperationType.TRANSFER &&
        op.destinationId === userContext?.user?.id)
    ) {
      return "text-primary";
    }
    if (
      op.type === OperationType.OUTGOING ||
      (op.type === OperationType.TRANSFER &&
        op.originId === userContext?.user?.id)
    ) {
      return "text-danger";
    }
    return "text-secondary";
  };

  const getOperationDescriptionFromOpContext = (op: Operation): string => {
    switch (op.type) {
      case OperationType.INCOMING:
        return "MONEY INCOMING";

      case OperationType.OUTGOING:
        return "MONEY WITHDRAW";

      case OperationType.TRANSFER:
        return op.destinationId === userContext?.user?.id
          ? "MONEY TRANSFER RECEIVED"
          : "MONEY TRANSFER MADE";

      default:
        return "UNKNOWN OPERATION";
    }
  };

  const formatOperationDate = (operationDate: Date) => {
    const dateNow = new Date();

    const formatToken =
      dateNow.getFullYear() === operationDate.getFullYear()
        ? "dd' 'MMM"
        : "dd' 'MMM y";
    return format(operationDate, formatToken, {
      locale: ptBR,
    }).toLocaleUpperCase();
  };

  const formatOperationTime = (operationDate: Date) => {
    return format(operationDate, "HH':'mm':'ss", {
      locale: ptBR,
    });
  };

  const formatOperationFromTo = (op: Operation) => {
    if (op.type !== OperationType.TRANSFER) {
      return null;
    }
    return op.destinationId === userContext?.user?.id
      ? op.origin?.name
      : op.destination?.name;
  };

  const formatOperationAmount = (op: Operation) => {
    let amount = op.amountInCents;
    if (
      op.type === OperationType.TRANSFER &&
      op.originId === userContext?.user?.id
    ) {
      amount = amount * -1;
    }
    return fromCentsToBrazilianCurrency(amount);
  };

  const sumOperations = (acc: number, current: Operation) => {
    let amount = current.amountInCents;
    if (
      current.type === OperationType.TRANSFER &&
      current.originId === userContext?.user?.id
    ) {
      amount = amount * -1;
    }
    return acc + amount;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Operation</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {operations
          ?.sort((op1, op2) => compareDesc(op1.timestamp, op2.timestamp))
          .map((op) => (
            <tr key={op.id}>
              <td>{formatOperationDate(op.timestamp)}</td>
              <td>{formatOperationTime(op.timestamp)}</td>
              <td>
                {getOperationDescriptionFromOpContext(op)}
                <br></br>
                <small>{formatOperationFromTo(op)}</small>
              </td>
              <td className={getLineColorFromOpContext(op)}>
                {formatOperationAmount(op)}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3}>Total Operations: {operations?.length || 0}</th>
          <th>
            {fromCentsToBrazilianCurrency(operations?.reduce(sumOperations, 0))}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
}
