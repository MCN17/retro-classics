import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// Import Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Signup(props) {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
          variables: {
            email: formState.email,
            password: formState.password,
            firstName: formState.firstName,
            lastName: formState.lastName,
          },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      return (
        <Row className="justify-content-center">
          <Link to="/login">← Go to Login</Link>
          <h2 className="text-center">Signup</h2>
          <Col lg={3}>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <Form.Label htmlFor="firstName">First Name:</Form.Label>
                <Form.Control
                  placeholder="First"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                <Form.Control
                  placeholder="Last"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="pwd">Password:</Form.Label>
                <Form.Control
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center mt-2">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
            </Col>
        </Row>
      );
}

export default Signup;