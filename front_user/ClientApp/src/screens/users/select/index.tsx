import React from "react";
import { Col, Row } from "react-bootstrap";
import AppAnchor from "../../../components/bootstrap/anchor";
import { AppRoutes } from "../../../routing/routes";
import { UserSelectListScreen } from "./select-list";

export function UserSelectScreen() {
  return (
    <>
      <Row>
        <Col>
          <h1>Select user</h1>
        </Col>
      </Row>
      <UserSelectListScreen />
      <Row className="mt-3">
        <Col>
          <AppAnchor to={AppRoutes.USER_CREATE}>
            ...or create one instead
          </AppAnchor>
        </Col>
      </Row>
    </>
  );
}
