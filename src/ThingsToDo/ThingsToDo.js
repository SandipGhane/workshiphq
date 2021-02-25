import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cards from "../Cards/Cards";
import "../App.css";
class ThingsToDo extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.dragNode = React.createRef();
    }
    state = {
        showModal: false,
        todoMsg: '',
        cardsData: [
            { name: 'To Do', show: false, only: true, todos: [] },
            { name: 'Doing', show: false, todos: [] },
            { name: 'Done', show: false, todos: [] },
        ],
        dragging: false
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
    handleDragEnter = (e, obj) => {
        console.log('handle dragg enter', obj);
    }
    handelDragEnd = () => {
        debugger
        console.log("Drag End");
        console.log('dragNode', this.dragNode.current);
        console.log('myRef', this.myRef.current);
        const dragData = [];
        var val = "";
        this.state.cardsData.forEach((c) => {
            if (this.myRef.current.card === 0) {
                if (c.name === "To Do") {
                    val = c.todos[this.myRef.current.id];
                    let filterArr = c.todos.filter((value, id) => id !== this.myRef.current.id);
                    c['todos'] = filterArr;
                } else if (c.name === "Doing") {
                    console.log("value", val);
                    c['todos'].push(val);
                }
                dragData.push(c);
            } else if (this.myRef.current.card === 1) {
                if (c.name === "Doing") {
                    val = c.todos[this.myRef.current.id];
                    let filterArr = c.todos.filter((value, id) => id !== this.myRef.current.id);
                    c['todos'] = filterArr;
                } else if (c.name === "Done") {
                    console.log("value", val);
                    c['todos'].push(val);
                }
                dragData.push(c);
            }
        })
        // console.log('dragData', dragData);
        this.setState({
            cardsData: dragData
        })
        this.dragNode.current.removeEventListener('dragend', this.handelDragEnd);
        this.myRef.current = null;
        this.dragNode.current = null;
    }
    handleDragStart = (e, obj) => {
        console.log("Drag start");
        this.myRef.current = obj;
        this.dragNode.current = e.target;
        this.dragNode.current.addEventListener('dragend', this.handelDragEnd);
    }
    setTodo = (e) => {
        this.setState({
            todoMsg: e.target.value
        })
    }
    render() {
        let cards = this.state.cardsData.map((card, idx) => {
            return (
                <Col xs={3} key={idx}>
                    <Cards
                        name={card.name}
                        msg={this.state.todoMsg}
                        saveTodos={(e) => this.setTodos(e, idx)}
                        getTodo={(e) => this.setTodo(e)}
                        only={card.only}
                        todos={card.todos}
                        show={card.show}
                        clicked={(e) => this.handleClick(e, idx)}
                        dragged={(e, id) => this.handleDragStart(e, { id, card: idx })}
                        draggedEnter={(e, id) => this.handleDragEnter(e, { id, card: idx })}
                    />
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
                    <Link to="/createlist"><h6>Click here to go CreativeBoard</h6></Link>
                </Container>
            </React.Fragment >
        )
    }
}

export default ThingsToDo;