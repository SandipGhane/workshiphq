import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";
import "../App.css";
class CreativeBoard extends Component {
    state = {
        showModal: false,
        todoMsg: '',
        cardsData: [
            { name: 'Unit Backlog', show: false, todos: [] },
            { name: 'Creative-Next', show: false, todos: [] },
            { name: 'Creative-Doing', show: false, todos: [] },
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
            if (id === idx && this.state.todoMsg != '') {
                c.todos.push(this.state.todoMsg);
                return c;
            }
            return c;
        })
        // console.log('newCardsData', newCardsData);
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
                    <h5> LionGate - CreativeBoard</h5>
                    <Row>
                        {cards}
                    </Row>
                    <Button variant="outline-info" style={{ marginBottom: 20 }}>Add More List</Button>
                    <Link to="/thingstodo"><h6>Click here to go and add things to get done</h6></Link>
                </Container>
            </React.Fragment >
        )
    }
}

export default CreativeBoard;