import React, { Component } from 'react';
import "../App.css";
import { Container, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from "../store/actions";
import { auth } from "../firebase/firebaseConfig";
class Toolbar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }
    logout = () => {
        this.props.logout();
        auth.signOut();
        console.log("props", this.props);
    }
    render() {
        // if (this.props.isLog) {
        //     return <Redirect to="/"></Redirect>
        // }
        return (
            <Container className="toolbar">
                <Navbar expand="lg" variant="light" bg="nav.navbar.navbar-expand-lg.navbar-light.bg-light">
                    {this.props.isLog ? <Navbar.Brand><Button variant="success">{this.props.loginUser.name}</Button></Navbar.Brand> : <Navbar.Brand href="#"><Button variant="secondary">Boards</Button></Navbar.Brand>}
                    {this.props.isLog ? <Navbar.Brand href="/"><Button variant="danger" onClick={this.logout}>LogOut</Button></Navbar.Brand> : null}
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </Form>
                </Navbar>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    loginUser: state.auth.loginUser,
    isLog: state.auth.isLoggin,
})
const mapPropsToState = (dispatch) => ({
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapPropsToState)(Toolbar);