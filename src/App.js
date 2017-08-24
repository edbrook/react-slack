import React from 'react';

import BasicForm from './BasicForm';
import Container from './Container';
import Comment from './Comment';
import Slack from './Slack';
import Welcome from './Welcome';
import { ListTest, MultiClock, MultiComponent, ToggleTest } from './demo';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.comment = {
      text: "This is a test comment",
      author: {
        avatarUrl: "#",
        name: "Ed Brook",
      },
    };
  }

  render() {
   return (
      <div>
        <Container description="Basic Tests" isOpen={false}>
          <img src={logo} className="App-logo" alt="logo"/>
          <Welcome firstName="Ed" lastName="Brook"/>
          <ListTest />
          <Comment
            author={this.comment.author}
            text={this.comment.text}
            date={new Date()} />
          <MultiClock />
          <ToggleTest />
          <MultiComponent />
          <div>
            <BasicForm />
          </div>
        </Container>

        <Container description="Slack Clone - v0.1">
          <Slack/>
        </Container>
      </div>
    );
  }
}

export default App;
