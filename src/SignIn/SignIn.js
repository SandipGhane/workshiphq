import React from 'react';
// import './App.css';
import { Button, Container, Card, Col, Row } from 'react-bootstrap';
import { signInWithGoogle, auth } from '../firebase/firebaseConfig';
import { connect } from "react-redux";
import { setUser } from "../store/actions";
// import { auth } from "../firebase/firebaseConfig";


class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            let userData = {
                name: user.displayName,
                email: user.email,
                login: true,
            }
            this.props.setLogin(userData);
        });
    }
    render() {
        if (this.props.isLog) {
            this.props.history.push('/thingstodo');
        }
        return (
            <React.Fragment>
                <Container className="Lion">
                    <Row>
                        <Col xs={3}>
                            <h5> Please SignIn </h5>
                            <Card>
                                <Button onClick={signInWithGoogle} variant="success">SIGN IN WITH GOOGLE</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        );
    }
}
const mapStateToProps = state => ({
    loginUser: state.auth.loginUser,
    isLog: state.auth.isLoggin
})
const mapPropsToState = dispatch => ({
    setLogin: (data) => dispatch(setUser(data)),
})

export default connect(mapStateToProps, mapPropsToState)(SignIn);