import React, { Component } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cards from "../Cards/Cards";
import { connect } from 'react-redux';
import axios from "axios";
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
        // cardsData: [
        //     { name: 'To Do', show: false, only: true, todos: [] },
        //     { name: 'Doing', show: false, todos: [] },
        //     { name: 'Done', show: false, todos: [] },
        // ],
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
        this.setState({
            cardsData: newCardsData,
        })
    }
    setTodos = (e, id) => {
        const apiData = {
            name: this.props.loginUser.name,
            email: this.props.loginUser.email,
            todoStatus: "todo",
            tododata: this.state.todoMsg
        }
        axios.post('http://localhost:5000/todo/addtodo', apiData).then((res) => {
            console.log("api response", res.data);
        }).catch((err) => {
            console.log("error", err);
        })
        axios.get(`http://localhost:5000/todo/getAlltodos?email=${this.props.loginUser.email}`).then((res) => {
            console.log("res data", res.data);
            var todos = [];
            var doings = [];
            var dones = [];
            var AllData = [];
            res.data.forEach((todo) => {
                if (todo.todoStatus === "todo") {
                    todos.push(todo.todoData);
                } else if (todo.todoStatus === "doing") {
                    doings.push(todo.todoData);
                } else {
                    dones.push(todo.todoData);
                }
            });
            var todo = { name: 'To Do', show: false, only: true, todos: [] };
            var doing = { name: 'Doing', show: false, todos: [] };
            var done = { name: 'Done', show: false, todos: [] };
            todo.todos = todos;
            doing.todos = doings;
            done.todos = dones;
            AllData.push(todo);
            AllData.push(doing);
            AllData.push(done);
            console.log("All Data", AllData);
            this.setState({
                cardsData: AllData
            })
        }).catch((err) => console.log("err", err))
    }
    handleDragEnter = (e, obj) => {
        console.log('handle dragg enter', obj);
    }
    handelDragEnd = () => {
        const dragData = [];
        var val = "";
        var apiData = {
            email: this.props.loginUser.email,
        }
        this.state.cardsData.forEach((c) => {
            if (this.myRef.current.card === 0) {
                if (c.name === "To Do") {
                    val = c.todos[this.myRef.current.id];
                    let filterArr = c.todos.filter((value, id) => id !== this.myRef.current.id);
                    c['todos'] = filterArr;
                } else if (c.name === "Doing") {
                    apiData.todoStatus = "doing";
                    apiData.tododata = val;
                    axios.post('http://localhost:5000/todo/updatestatus', apiData).then((res) => {
                        console.log('res', res);
                    }).catch(err => console.log(err));
                    c['todos'].push(val);
                }
                dragData.push(c);
            } else if (this.myRef.current.card === 1) {
                if (c.name === "Doing") {
                    val = c.todos[this.myRef.current.id];
                    let filterArr = c.todos.filter((value, id) => id !== this.myRef.current.id);
                    c['todos'] = filterArr;
                } else if (c.name === "Done") {
                    apiData.todoStatus = "done";
                    apiData.tododata = val;
                    axios.post('http://localhost:5000/todo/updatestatus', apiData).then((res) => {
                        console.log('res', res);
                    }).catch(err => console.log(err));
                    c['todos'].push(val);
                }
                dragData.push(c);
            }
        })
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
    componentDidMount() {
        axios.get(`http://localhost:5000/todo/getAlltodos?email=${this.props.loginUser.email}`).then((res) => {
            console.log("res data", res.data);
            var todos = [];
            var doings = [];
            var dones = [];
            var AllData = [];
            res.data.forEach((todo) => {
                if (todo.todoStatus === "todo") {
                    todos.push(todo.todoData);
                } else if (todo.todoStatus === "doing") {
                    doings.push(todo.todoData);
                } else {
                    dones.push(todo.todoData);
                }
            });
            var todo = { name: 'To Do', show: false, only: true, todos: [] };
            var doing = { name: 'Doing', show: false, todos: [] };
            var done = { name: 'Done', show: false, todos: [] };
            todo.todos = todos;
            doing.todos = doings;
            done.todos = dones;
            AllData.push(todo);
            AllData.push(doing);
            AllData.push(done);
            console.log("All Data", AllData);
            this.setState({
                cardsData: AllData
            })
        }).catch((err) => console.log("err", err))
    }
    render() {
        if (!this.state.cardsData) {
            return (<Container className="Lion">
                <Row>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>
            </Container>);
        }
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

const mapStateToProps = (state) => ({
    loginUser: state.auth.loginUser,
})
export default connect(mapStateToProps)(ThingsToDo);