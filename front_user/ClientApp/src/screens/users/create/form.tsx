import React from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import AppAnchor from "../../../components/bootstrap/anchor";
import { AppRoutes } from "../../../routing/routes";

export function UserCreateFormScreen() {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [name, setName] = React.useState("");

  const createUser = async () => {
    const createUserResponse = await fetch(`users?name=${name}`, {
      method: "POST",
    });
    if (createUserResponse.ok) {
      setName("");
      setShowSuccess(true);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          required
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Form.Text className="text-muted">
          Between 3 and 60 characters.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="button" onClick={createUser}>
        Create
      </Button>
      <span className="ms-3">
        <AppAnchor to={AppRoutes.USER_SELECT}>
          ...or select one instead
        </AppAnchor>
      </span>
      {showSuccess && (
        <Row className="mt-3">
          <Col>
            <Alert
              variant="success"
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              Success! Your request to create a user was sent.
              <hr />
              Now you can{" "}
              <Alert.Link as={AppAnchor} to={AppRoutes.USER_SELECT}>
                see if it the creation request was already processed
              </Alert.Link>{" "}
              or create another user above.
            </Alert>
          </Col>
        </Row>
      )}
    </Form>
  );
}
