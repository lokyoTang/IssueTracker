import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardGroup, Col, Container, Form, Input,
    InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Password: ''
        }

        this.Password = this.Password.bind(this);
        this.Email = this.Email.bind(this);
        this.login = this.login.bind(this);
    }

    Email(event) {
        this.setState({ Email: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    login(event) {
        debugger;
        fetch('Api/login/in', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.status !== 'Success')
                    alert('Invalid User');
                else
                    this.props.history.push("/Dashboard");
            })
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div className="row"
                                                className="mb-2 pageheading">
                                                <h4 className="CardTitle">
                                                    Enter your credential
                                                </h4>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text"
                                                    onChange={this.Email}
                                                    placeholder="Enter Email" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <Input type="password"
                                                    onChange={this.Password}
                                                    placeholder="Enter Password" />
                                            </InputGroup>
                                            <Button onClick={this.login}
                                                color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
