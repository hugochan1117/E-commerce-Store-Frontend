import { Alert, Button, Form, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import NavigationBar from "../../SharedComponents/NavigationBar";
import { useState } from "react";
import {signInWithEmailAndPassword, signInWithGoogle} from "../../../authService/FirebaseAuthService.ts";
import {useNavigate, useRouter, useSearch} from "@tanstack/react-router";
import { GoogleLoginButton } from "react-social-login-buttons";
import * as React from "react";

export default function LoginPage() {
  const navigate = useNavigate()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { reason, redirect } = useSearch({from:"/login/"});


  const handleGoogleLogin = async ()=>{
    const loginResult = await signInWithGoogle();
    if (loginResult){
      if (redirect){
        await navigate({to: redirect})
      }else {
        router.history.back();
      }
    } else {
      setIsLoginFail(true);
    }
  }
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const loginResult = await signInWithEmailAndPassword(email, password);
    setIsLoading(false);
    if (loginResult) {
      router.history.back();
    } else {
      setIsLoginFail(true);
    }
  };

  return (
    <>
      <NavigationBar />
      {
        reason &&
        <Alert variant="danger" className="text-center">
          Sorry, you need to log in to {reason}
        </Alert>
      }
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Welcome Back</h2>
                {isLoginFail && (
                  <Alert variant="danger" className="text-center">
                    Invalid username or password. Please try again...
                  </Alert>
                )}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                      {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                    </Button>
                  </div>
                </Form>

                <hr className="my-4" />

                <GoogleLoginButton
                  onClick={() => handleGoogleLogin()}
                  style={{ width: "100%" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
