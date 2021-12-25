import { useFormikContext } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../../context/user";
import { Operation } from "../../../models/operation";
import { OperationType } from "../../../models/operationType";
import { User } from "../../../models/user";

export function MakeOperationFormScreen() {
  const userContext = useUserContext();
  const { values, setFieldValue, submitForm } = useFormikContext<Operation>();

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

  React.useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  const typeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.currentTarget.value);
    setFieldValue("type", newType);

    let newOperation = {
      ...operation,
      type: newType,
    };
    if (newType !== OperationType.OUTGOING) {
      setFieldValue("ownTitularity", false);
    }
    if (newType !== OperationType.TRANSFER) {
      setFieldValue("destinationId", null);
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

    setFieldValue("destinationId", newDestination);
  };

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();
        submitForm();
      }}
    >
      <Form.Group className="mb-3" controlId="fomOperationType">
        <Form.Label>Type</Form.Label>
        <Form.Select required value={values.type} onChange={typeChanged}>
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

      {values.type === OperationType.OUTGOING && (
        <div className="mb-3">
          <AppCheckboxInput
            id="fomOwnTitularity"
            name="ownTitularity"
            label="Own titularity outgoing"
          />
        </div>
      )}

      {values.type === OperationType.TRANSFER && (
        <Form.Group className="mb-3" controlId="fomDestinationId">
          <Form.Label>Destination</Form.Label>
          <Form.Select
            value={values.destinationId || ""}
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

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}
