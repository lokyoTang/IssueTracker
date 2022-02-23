import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardGroup, Col, Container, Form,
    Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
export class Dashboard extends Component {
    static displayName = Dashboard.name;

    constructor(props) {
        super(props);
        this.state = { tickets: [], loading: true };
        this.logout = this.logout.bind(this);
        this.create = this.create.bind(this);
        this.resolved = this.resolved.bind(this);
        this.populateTicketData = this.populateTicketData.bind(this);
        this.populateQARole = this.populateQARole.bind(this);
        this.populateRDRole = this.populateRDRole.bind(this);
        this.renderTicketsTable = this.renderTicketsTable.bind(this);
    }

    componentDidMount() {
        this.populateTicketData();
    }

    logout(event) {
        debugger;
        fetch('Api/login/out', {
            method: 'patch',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.status !== 'Success')
                    alert('Invalid Operation');
                else
                    this.props.history.push("/");
            })
    }

    create(event) {
        debugger;
        this.populateQARole();
    }

    resolved(event) {
        console.log(event.target.name);
        const tId = parseInt(event.target.name, 10)
        console.log(tId);
        debugger;
        this.populateRDRole(tId);
        window.location.reload(false);
    }

    renderTicketsTable(tickets) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Summary</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket =>
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.type}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.owner}</td>
                            <td>{ticket.summary}</td>
                            <td>{ticket.description}</td>
                            <Button name={ticket.id} onClick={this.resolved}
                                color="success" block>Resolve
                            </Button>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTicketsTable(this.state.tickets);

        return (
            <div className="row" className="mb-2 pageheading">
                <h4 class="title">
                    Dashboard
                </h4>
                <Button onClick={this.logout}
                    color="success" block>Logout
                </Button>
                <Button onClick={this.create}
                    color="success" block>Create New Ticket
                </Button>
                {contents}
            </div>
        );
    }

    async populateTicketData() {
        const response = await fetch('Api/TicketList/fetchall');
        const data = await response.json();
        this.setState({ tickets: data, loading: false });
    }

    async populateQARole() {
        const response = await fetch('Api/login/role');
        const data = await response.json();
        console.log(data);
        if (data.message === 'QA') {
            this.props.history.push("/Editor");
        }
        else {
            alert('Access denied.');
        }
    }

    async populateRDRole(tId) {
        const response = await fetch('Api/login/role');
        const data = await response.json();
        console.log(data);
        console.log(tId);
        if (data.message === 'RD') {
            fetch('Api/ticketlist/update', {
                method: 'patch',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: tId
                })
            .then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    if (result.status !== 'Success') {
                        alert('Operation failed');
                    }                        
                })
        }
        else {
            alert('Access denied.');
        }
    }
}