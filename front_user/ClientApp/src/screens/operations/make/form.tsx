import React from "react";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../../context/user";
import { Operation } from "../../../models/operation";
import { OperationType } from "../../../models/operationType";
import { User } from "../../../models/user";

const getDefaultOperation = (): Operation => {
  return {
    type: OperationType.OUTGOING,
    amountInCents: 1,
    ownTitularity: false,
  };
};

export function MakeOperationFormScreen() {
  const userContext = useUserContext();

  const [users, setUser] = React.useState<User[]>([]);
  const [operation, setOperation] = React.useState<Operation>(
    getDefaultOperation()
  );

  const getUsers = async () => {
    if (!userContext?.user) return;

    const usersResponse = await fetch("users");
    if (usersResponse.ok) {
      let newUsers = (await usersResponse.json()) as User[];
      newUsers.splice(
        newUsers.findIndex((u) => u.id === userContext.user?.id),
        1
      );
      setUser(newUsers);
    }
  };

  const makeOperation = async () => {
    if (!userContext?.user) return;

    const operationBody = { ...operation, originId: userContext.user.id };

    const makeOperationResponse = await fetch(`balance/operation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operationBody),
    });
    if (makeOperationResponse.ok) {
      setOperation(getDefaultOperation());
    } else {
      const body = await makeOperationResponse.json();
      console.log("Operation was unsuccesful", body);
    }
  };

  React.useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  const typeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.currentTarget.value);

    let newOperation = {
      ...operation,
      type: newType,
    };
    if (newType !== OperationType.OUTGOING) {
      newOperation.ownTitularity = false;
    }
    if (newType !== OperationType.TRANSFER) {
      newOperation.destinationId = null;
    }
    setOperation(newOperation);
  };

  const amountInCentsChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newOperation = {
      ...operation,
      amountInCents: Number(e.currentTarget.value),
    };
    setOperation(newOperation);
  };

  const destinationIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newDestination: string | null = e.currentTarget.value;
    if (newDestination === "") {
      newDestination = null;
    }

    let newOperation = {
      ...operation,
      destinationId: newDestination,
    };

    setOperation(newOperation);
  };

  const ownTitularityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newOperation = {
      ...operation,
      ownTitularity: e.currentTarget.checked,
    };
    setOperation(newOperation);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="fomOperationType">
        <Form.Label>Type</Form.Label>
        <Form.Select required value={operation.type} onChange={typeChanged}>
          <option value={OperationType.INCOMING}>Incoming</option>
          <option value={OperationType.OUTGOING}>Outgoing</option>
          <option value={OperationType.TRANSFER}>Transfer</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fomAmountInCents">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          min={1}
          required
          value={operation.amountInCents}
          onChange={amountInCentsChanged}
        />
      </Form.Group>

      {operation.type === OperationType.OUTGOING && (
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            id="fomOwnTitularity"
            label="Own titularity outgoing"
            checked={operation.ownTitularity}
            onChange={ownTitularityChanged}
          />
        </div>
      )}

      {operation.type === OperationType.TRANSFER && (
        <Form.Group className="mb-3" controlId="fomDestinationId">
          <Form.Label>Destination</Form.Label>
          <Form.Select
            value={operation.destinationId || ""}
            onChange={destinationIdChanged}
          >
            <option>No user selected</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      <Button variant="primary" type="button" onClick={makeOperation}>
        Create
      </Button>
    </Form>
  );
}
