import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Greetings!</h1>
        <p>Welcome to IssueTracker! Tacking everyday!</p>
        <p>Login to get started.</p>
        <h5>Navigation</h5>
        <ul>
          <li><strong>Login</strong>: Enter your <em>ID</em> and <em>Password</em> to get into dashboard.</li>
          <li><strong>Dashboard</strong>: Browse the tickets on <code>Dashboard</code> and get the details.</li>
        </ul>
      </div>
    );
  }
}
