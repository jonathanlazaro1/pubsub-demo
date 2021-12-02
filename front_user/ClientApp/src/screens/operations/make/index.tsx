import React from "react";
import { Col, Row } from "react-bootstrap";
import { MakeOperationFormScreen } from "./form";

export function OperationMakeScreen() {
  return (
    <>
      <Row>
        <Col>
          <h1>Make operation</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <MakeOperationFormScreen />
        </Col>
      </Row>
    </>
  );
}
