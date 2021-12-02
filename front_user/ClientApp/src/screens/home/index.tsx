import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { OperationMakeScreen } from "../operations/make";
import { HomeWidgetsScreen } from "./widgets";

export function HomeScreen(): JSX.Element {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>Recon Bank</h1>
              </Card.Title>
              <Card.Text>Here's your account. Have fun!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mt-3">
        <HomeWidgetsScreen />
      </div>
      <div className="mt-3">
        <OperationMakeScreen />
      </div>
    </>
  );
}
