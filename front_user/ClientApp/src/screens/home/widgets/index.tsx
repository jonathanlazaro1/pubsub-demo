import { format, isDate, isValid } from "date-fns";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../../context/user";
import { fetchApiDateReviver } from "../../../functions/fetchApiDateReviver";
import { fromCentsToBrazilianCurrency } from "../../../functions/fromCentsToBRLString";
import { fromDateToPtBRString } from "../../../functions/fromDateToPtBRString";
import { BalanceStats } from "../../../models/balanceStats";

export function HomeWidgetsScreen() {
  const userContext = useUserContext();
  const [stats, setStats] = React.useState<BalanceStats>();

  const getBalance = async () => {
    const balanceResponse = await fetch(
      `balance/${userContext?.user?.id}/stats`
    );
    if (balanceResponse.ok) {
      const newStats = JSON.parse(
        await balanceResponse.text(),
        fetchApiDateReviver
      ) as BalanceStats;
      setStats(newStats);
    }
  };

  React.useEffect(() => {
    getBalance();

    return () => {};
  }, []);

  return stats ? (
    <>
      <Row>
        <Col md>
          <Card
            bg={stats.balance.amountInCents < 0 ? "danger" : "success"}
            text="light"
          >
            <Card.Header>Your balance today</Card.Header>
            <Card.Body>
              <Card.Text>
                {fromCentsToBrazilianCurrency(stats.balance.amountInCents)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card bg="info" text="dark">
            <Card.Header>Total operations made</Card.Header>
            <Card.Body>
              <Card.Text>{stats.operationsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card bg="light" text="dark">
            <Card.Header>Money movements total</Card.Header>
            <Card.Body>
              <Card.Text>
                <span className="fs-6 text-success">
                  <Badge bg="success">
                    {fromCentsToBrazilianCurrency(stats.incomingAmountInCents)}
                  </Badge>
                  {" in "}
                </span>
                <span className="text-danger">
                  <Badge bg="danger">
                    {fromCentsToBrazilianCurrency(stats.outgoingAmountInCents)}
                  </Badge>
                  {" out"}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span>
            Your balance record was last updated at{" "}
            {fromDateToPtBRString(stats.balance.lastUpdatedAt)}
          </span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Button variant="primary" size="sm" onClick={getBalance}>
            Refresh
          </Button>
        </Col>
      </Row>
    </>
  ) : null;
}
