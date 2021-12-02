import React from "react";
import { Alert, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppAnchor from "../../../components/bootstrap/anchor";
import { useUserContext } from "../../../context/user";
import { User } from "../../../models/user";
import { AppRoutes } from "../../../routing/routes";

export function UserSelectListScreen() {
  const [users, setUser] = React.useState<User[]>([]);

  let navigate = useNavigate();
  const userContext = useUserContext();

  const getUsers = async () => {
    const usersResponse = await fetch("users");
    if (usersResponse.ok) {
      const newUsers = await usersResponse.json();
      setUser(newUsers);
    }
  };

  React.useEffect(() => {
    getUsers();

    return () => {};
  }, []);

  const selectUser = (user: User) => {
    userContext?.signIn(user);
    navigate(AppRoutes.HOME, { replace: true });
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item
                key={user.id}
                action
                onClick={() => selectUser(user)}
              >
                {user.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {users.length === 0 && (
        <Alert variant="info">
          It looks kinda empty here. Maybe you want to{" "}
          <Alert.Link as={AppAnchor} to={AppRoutes.USER_CREATE}>
            create a user
          </Alert.Link>
          ?
        </Alert>
      )}
    </>
  );
}
