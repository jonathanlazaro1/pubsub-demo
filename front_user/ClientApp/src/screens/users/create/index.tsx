import React from "react";
import { Col, Row } from "react-bootstrap";
import { UserCreateFormScreen } from "./form";

export function UserCreateScreen() {
  return (
    <>
      <Row>
        <Col>
          <h1>Create user</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <UserCreateFormScreen />
        </Col>
      </Row>
    </>
  );
}
