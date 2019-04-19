import React, { Component } from 'react'
import { socket } from './socket'

class App extends Component {
  state = { message: '', messages: [] }

  componentDidMount = () => {
    const oldMessages = localStorage.getItem('chat')
    console.log(oldMessages)
    // this.setState(prevState => ({
    //   messages: [...prevState.messages, oldMessages]
    // }))
    this.getMessages()
  }

  getMessages = () => {
    console.log(this.state)

    localStorage.setItem('chat', JSON.stringify(this.state.messages))

    socket.on('chat message', msg => {
      this.setState(prevState => ({
        messages: [...prevState.messages, msg]
      }))
    })
  }

  renderMessages = messages => {
    return messages.map(message => <li key={Math.random() * 100}>{message}</li>)
  }

  onSubmit = event => {
    event.preventDefault()
    socket.emit('chat message', this.state.message)

    this.setState({ message: '' })
  }

  inputHandler = event => {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Chit Chat</h1>
        <form onSubmit={this.onSubmit}>
          <input
            id="message"
            autoComplete="off"
            value={this.state.message}
            onChange={this.inputHandler}
          />
          <button>Send</button>
        </form>
        <h2>Messages</h2>
        <div>{this.renderMessages(this.state.messages)}</div>
      </div>
    )
  }
}
export default App
