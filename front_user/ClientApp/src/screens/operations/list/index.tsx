import React from "react";
import { Col, Row } from "react-bootstrap";
import { OperationsListTable } from "./table";

export function OperationsListScreen() {
  return (
    <>
      <Row>
        <Col>
          <h1>Operations</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <OperationsListTable />
        </Col>
      </Row>
    </>
  );
}
