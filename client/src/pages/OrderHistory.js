import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

// Import Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function OrderHistory() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
          <Row>
            <Link to="/">← Back to Products</Link>
    
            {user ? (
              <>
                <h2 className="text-center mt-5 mb-5">
                  Order History for {user.firstName} {user.lastName}
                </h2>
                {user.orders.map((order) => (
                  <Col lg={2} key={order._id}>
                    <h3>
                      {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                    </h3>
                    <Card>
                      {order.products.map(({ _id, image, name, price }, index) => (
                        <Card.Body key={index}>
                          <Link to={`/products/${_id}`}>
                            <Card.Img alt={name} src={`/images/${image}`} />
                            <p>{name}</p>
                          </Link>
                          <div>
                            <span>${price}</span>
                          </div>
                        </Card.Body>
                      ))}
                    </Card>
                  </Col>
                ))}
              </>
            ) : null}
          </Row>
        </>
      );
}

export default OrderHistory;