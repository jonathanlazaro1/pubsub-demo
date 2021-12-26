import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useUserContext } from "../../../context/user";
import { Operation, operationSchema } from "../../../models/operation";
import { OperationType } from "../../../models/operationType";
import { MakeOperationFormScreen } from "./form";

const getDefaultOperation = (): Operation => {
  return {
    type: OperationType.OUTGOING,
    amountInCents: 1,
    ownTitularity: false,
  };
};

export function OperationMakeScreen() {
  const userContext = useUserContext();

  const makeOperation = async (
    operation: Operation,
    formikHelpers: FormikHelpers<Operation>
  ) => {
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
      formikHelpers.resetForm();
      formikHelpers.setStatus(true);
    } else {
      formikHelpers.setStatus({ success: false });
      const body = await makeOperationResponse.json();
      console.log("Operation was unsuccesful", body);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Make operation</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Formik
            initialValues={getDefaultOperation()}
            onSubmit={makeOperation}
            validationSchema={operationSchema}
          >
            <MakeOperationFormScreen />
          </Formik>
        </Col>
      </Row>
    </>
  );
}
