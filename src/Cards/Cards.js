import React from "react";
import { Link, } from "react-router-dom";
import { Modal, ModalDialog, Button, Form, Card } from "react-bootstrap";
import "./Cards.css";

const Cards = (props) => {
    let model;
    if (props.show) {
        model = <Modal.Body >
            {props.only ? <div> <Form.Label>Example textarea</Form.Label><Form.Control as="textarea" rows={2} onChange={(e) => props.getTodo(e)} /><br /><Button variant="success" onClick={props.saveTodos}>Add</Button> </div> : null}
        </Modal.Body >
    }
    let todos;
    if (props.todos.length > 0) {
        todos = props.todos.map((msg, id) => {
            return (
                <Card key={id}
                    draggable
                    onDragStart={(e) => props.dragged(e, id)}
                    onDragOver={(e) => props.draggedEnter(e, id)}
                    className="lists">
                    <p>{msg}</p>
                </Card>
            )
        })
    }
    return (
        <React.Fragment>
            <ModalDialog>
                <Modal.Header>
                    <Modal.Title style={{
                        fontSize: 14
                    }}>{props.name}</Modal.Title>
                </Modal.Header>
                {todos}
                {model}
                {props.show ? null : <Modal.Footer>
                    <Link onClick={props.clicked}>Add to card</Link >
                </Modal.Footer>}
            </ModalDialog>
        </React.Fragment >
    );
}
export default Cards;