import React, { Component } from "react";

class NewThingTodo extends Component {
    state = {
        cardsData: [
            { name: 'To Do', show: false, only: true, todos: [] },
            { name: 'Doing', show: false, todos: [] },
            { name: 'Done', show: false, todos: [] },
        ]
    }
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
export default NewThingTodo;
