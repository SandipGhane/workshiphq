import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cards from "../Cards/Cards";
import "../App.css";
class ThingsToDo extends Component {
    state = {
        showModal: false,
        todoMsg: '',
        cardsData: [
            { name: 'To Do', show: false, todos: [] },
            { name: 'Doing', show: false, todos: [] },
            { name: 'Done', show: false, todos: [] },
        ]
    }
    handleClick = (e, id) => {
        const newCardsData = this.state.cardsData.map((c, idx) => {
            if (id === idx) {
                c.show = true;
                return c;
            }
            return c;
        })
        console.log('newCardsData', newCardsData);
        this.setState({
            cardsData: newCardsData,
        })
    }
    setTodos = (e, id) => {
        const newCardsData = this.state.cardsData.map((c, idx) => {
            if (id === idx && this.state.todoMsg !== '') {
                c.todos.push(this.state.todoMsg);
                return c;
            }
            return c;
        })
        this.setState({
            cardsData: newCardsData,
            todoMsg: ''
        })
    }
    setTodo = (e) => {
        this.setState({
            todoMsg: e.target.value
        })
    }
    render() {
        let cards = this.state.cardsData.map((card, id) => {
            return (
                <Col xs={3} key={id}>
                    <Cards name={card.name} msg={this.state.todoMsg} saveTodos={(e) => this.setTodos(e, id)} getTodo={(e) => this.setTodo(e)} todos={card.todos} show={card.show} clicked={(e) => this.handleClick(e, id)} />
                </Col>
            )
        })
        return (
            <React.Fragment>
                <Container className="Lion">
                    <h5> Things to get done</h5>
                    <Row>
                        {cards}
                    </Row>
                    <Button variant="outline-info" style={{ marginBottom: 20 }}>Add More List</Button>
                    <Link to="/"><h6>Click here to go CreativeBoard</h6></Link>
                </Container>
            </React.Fragment >
        )
    }
}

export default ThingsToDo;