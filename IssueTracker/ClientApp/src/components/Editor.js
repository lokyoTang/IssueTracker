import { Alert } from 'bootstrap';
import React, { Component } from 'react';

export class Editor extends Component {
    static displayName = Editor.name;

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            id: 0,
            title: '',
            type: '',
            status: 'open',
            owner: '',
            summary: '',
            description: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleSubmit = (e) => {
        debugger;
        console.log(this.state)
        if ((this.state.description.trim() === "") || (this.state.summary.trim() === "")) {
            alert('Summary and Description are required.');
            e.preventDefault();
        }
        else
        {
            fetch('Api/ticketlist/create', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.id,
                    title: this.state.title,
                    type: this.state.type,
                    status: this.state.status,
                    owner: this.state.owner,
                    summary: this.state.summary,
                    description: this.state.description
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    console.log(result);
                    if (result.status !== 'Success') {
                        alert('Operation failed');
                    }
                    else
                        this.props.history.push("/Dashboard");
                })
            e.preventDefault();
        }
    }

    handleInputChange = (e) => {
        if (e.target.name === 'id') {
            this.setState({
                [e.target.name]: parseInt(e.target.value, 10)
            });
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        //console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Ticket Editor</h1>

                <p>Summay and description are required. After filling the content, click sumitt to create ticket.</p>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h5>ID：</h5>
                        <input type="number" name="id" onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <h5>Title：</h5>
                        <input type="text" name="title" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <h5>Type：</h5>
                        <input type="text" name="type" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <h5>Status：</h5>
                        <input type="radio" name="status" value="open" id="status_open" onChange={this.handleInputChange}/>
                        <label htmlFor="status_open">Open</label>
                        <input type="radio" name="status" value="solved" id="status_solved" onChange={this.handleInputChange}/>
                        <label htmlFor="status_solved">Solved</label>
                    </div>
                    <div>
                        <h5>Owner：</h5>
                        <input type="text" name="owner" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <h5>Summary：</h5>
                        <textarea type="text" name="summary" style={{ height: "250px", width: "250px" }} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <h5>Description：</h5>
                        <textarea type="text" name="description" style={{ height: "250px", width: "250px" }} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}