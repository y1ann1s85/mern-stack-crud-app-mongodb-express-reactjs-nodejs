import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Icon } from 'antd';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContactsList from "./contacts-list";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class EditContact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: '',
            firstNumber: '',
            secondNumber: '',
            thirdNumber: '',
            showRequiredFieldsWarning: false,
            invalidEmailWarning: false,
            invalidPhoneNumber: false,
            invalidPhoneNumberTwo: false,
            invalidPhoneNumberThree: false,
            popupVisible: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/contacts/edit-contact/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                address: res.data.address,
                firstNumber: res.data.firstnumber,
                secondNumber: res.data.secondnumber,
                thirdNumber: res.data.thirdnumber,
            })
            console.log(res)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    showPopup = () => {
        this.setState({
            popupVisible: true
        })
    }

    hidePopup = () => {
        this.setState({
            popupVisible: false
        })
    }

    // RETRIEVE USER'S INPUT FROM THE FORM
    getContactName = (e) => {
        this.setState({ name: e.target.value })
    }

    getContactEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    getContactAddress = (e) => {
        this.setState({ address: e.target.value })
    }

    getContactFirstNumber = (e) => {
        this.setState({ firstNumber: e.target.value })
    }

    getContactSecondNumber = (e) => {
        this.setState({ secondNumber: e.target.value })
    }

    getContactThirdNumber = (e) => {
        this.setState({ thirdNumber: e.target.value })
    }


    updateData = (e) => {

        e.preventDefault();

        // GENERATE THE USER'S OBJECT-MODEL TO BE RECORDED IN THE DATABASE USING THE DATA WHE RETRIEVED
        const contactData = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            firstnumber: this.state.firstNumber,
            secondnumber: this.state.secondNumber,
            thirdnumber: this.state.thirdNumber
        }

        // SET VALIDATION RULES FOR EMAIL/PHONES
        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        // TEST IF THE REQUIRED FIELDS ARE FILLED
        if (this.state.name.length > 0 && this.state.email.length > 0 & this.state.firstNumber.length > 0) {

            // SET THE REQUIRED FIELDS WARNING FALSE
            this.setState({
                showRequiredFieldsWarning: false
            })

            // VALIDATE EMAIL AND PRIMARY PHONE
            if (validEmail.test(this.state.email) && validPhone.test(this.state.firstNumber)) {

                // SINCE EMAIL AND PRIMARY PHONE ARE VALIDATED HIDE THEIR WARNING MESSAGES
                this.setState({
                    invalidEmailWarning: false,
                    invalidPhoneNumber: false
                })

                // CHECK FOR SECOND AND THIRD PHONE NUMBER

                // CASE OF ONLY SECOND NUMBER GIVEN FROM THE USER
                if (this.state.secondNumber.length > 0 && this.state.thirdNumber.length == 0) {
                    // VALIDATE SECOND NUMBER 
                    if (validPhone.test(this.state.secondNumber)) {
                        // SECOND NUMBER VALID - UPDATE THE DB BY CREATING THE USER
                        axios.put('http://localhost:4000/contacts/update-contact/' + this.props.match.params.id, contactData)
                        .then((res) => {
                            console.log(res.data)
                            console.log('Contact successfully updated')
                        }).catch((error) => {
                            console.log(error)
                        })

                        this.setState({
                            popupVisible: true
                        })
                    // SECOND NUMBER NOT VALID - WARN USER
                    } else if (!validPhone.test(this.state.secondNumber)) {
                        this.setState({
                            invalidPhoneNumberTwo: true,
                            invalidPhoneNumberThree: false
                        })
                    }

                // CASE OF ONLY THIRD NUMBER GIVEN FROM THE USER
                } else if (this.state.secondNumber.length == 0 && this.state.thirdNumber.length > 0) {
                    // VALIDATE THIRD NUMBER 
                    if (validPhone.test(this.state.thirdNumber)) {
                        // THIRD NUMBER VALID - UPDATE THE DB BY CREATING THE USER
                        axios.put('http://localhost:4000/contacts/update-contact/' + this.props.match.params.id, contactData)
                        .then((res) => {
                            console.log(res.data)
                            console.log('Contact successfully updated')
                        }).catch((error) => {
                            console.log(error)
                        })

                        this.setState({
                            popupVisible: true
                        })
                    // SECOND NUMBER NOT VALID - WARN USER
                    } else if (!validPhone.test(this.state.thirdNumber)) {
                        this.setState({
                            invalidPhoneNumberTwo: false,
                            invalidPhoneNumberThree: true,
                        })
                    }

                // CASE OF BOTH SECOND AND THIRD NUMBER GIVEN FROM THE USER
                } else if (this.state.secondNumber.length > 0 && this.state.thirdNumber.length > 0) {
                    // VALIDATE NUMBERS
                    if (validPhone.test(this.state.secondNumber) && validPhone.test(this.state.thirdNumber)) {
                        // NUMBERS VALID - UPDATE THE DB BY CREATING THE USER
                        axios.put('http://localhost:4000/contacts/update-contact/' + this.props.match.params.id, contactData)
                        .then((res) => {
                            console.log(res.data)
                            console.log('Contact successfully updated')
                        }).catch((error) => {
                            console.log(error)
                        })

                        this.setState({
                            popupVisible: true
                        })
                    // NUMBERS NOT VALID - WARN USER
                    } else if (!validPhone.test(this.state.secondNumber) && validPhone.test(this.state.thirdNumber)) {
                        this.setState({
                            invalidPhoneNumberTwo: true,
                            invalidPhoneNumberThree: false
                        })
                    } else if (!validPhone.test(this.state.secondNumber) && !validPhone.test(this.state.thirdNumber)) {
                        this.setState({
                            invalidPhoneNumberTwo: true,
                            invalidPhoneNumberThree: true
                        })
                    } else if (validPhone.test(this.state.secondNumber) && !validPhone.test(this.state.thirdNumber)) {
                        this.setState({
                            invalidPhoneNumberTwo: false,
                            invalidPhoneNumberThree: true
                        })
                    }
                    // END OF SECOND AND THIRD NUMBER CASES

                // NO EXTRA PHONE NUMBERS TO VALIDATE FROM THE USER - CREATE CONTACT USING THE REQUIRED FIELDS
                } else {
                    axios.put('http://localhost:4000/contacts/update-contact/' + this.props.match.params.id, contactData)
                    .then((res) => {
                        console.log(res.data)
                        console.log('Contact successfully updated')
                    }).catch((error) => {
                        console.log(error)
                    })

                    this.setState({
                        popupVisible: true
                    })

                }

            // VALIDATION ON REQUIRED FIELDS FAILED - WARN USER
            } else if (!validEmail.test(this.state.email) && validPhone.test(this.state.firstNumber)) {
                this.setState({
                    invalidEmailWarning: true,
                    invalidPhoneNumber: false
                })
            } else if (!validEmail.test(this.state.email) && !validPhone.test(this.state.firstNumber)) {
                this.setState({
                    invalidEmailWarning: true,
                    invalidPhoneNumber: true
                })
            } else if (validEmail.test(this.state.email) && !validPhone.test(this.state.firstNumber)) {
                this.setState({
                    invalidEmailWarning: false,
                    invalidPhoneNumber: true
                })
            }

        // REQUIRED FIELDS NOT FILLED - WARN USER
        } else {
            this.setState({
                showRequiredFieldsWarning: true,
                invalidEmailWarning: false,
                invalidPhoneNumber: false
            })
        }
    }

    // CANCEL CONTACT UPDATE AND RETURN TO HOMEPAGE
    cancelUpdate = () => {
        this.props.history.push('/contacts-list')
    }

    render() {
        return (
            <div className="form-wrapper">
                <div>
                <Container>
                    <Row>
                    <Col xs='6' sm='6' md='6' lg='6'>
                        {this.state.showRequiredFieldsWarning ?
                        <div style={{ color: 'red', textAlign: 'left' }}>Please fill in all the Required Fields</div> : null
                        }
                    </Col>
                    <Col xs='6' sm='6' md='6' lg='6'>
                        <div style={{ textAlign: 'right' }}><span style={{ color: 'red' }}>*</span>Required Field</div>
                    </Col>
                    </Row>
                </Container>
                </div>
                <Container>
                    <Form>
                        <Row>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="Name">
                                    <Form.Label>Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control type="text" value={this.state.name} onChange={this.getContactName} />
                                </Form.Group>
                            </Col>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="Email">
                                    <Form.Label>Email<span style={{ color: 'red' }}>*</span>
                                        {this.state.invalidEmailWarning &&
                                            <span style={{ color: 'red', fontSize: '6' }}> Please provide a valid Email Address</span>
                                        }
                                    </Form.Label>
                                    <Form.Control type="email" value={this.state.email} onChange={this.getContactEmail} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="Address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" value={this.state.address} onChange={this.getContactAddress} />
                                </Form.Group>
                            </Col>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="PrimaryPhoneNumber">
                                    <Form.Label>Primary Phone Number<span style={{ color: 'red' }}>*</span>
                                        {this.state.invalidPhoneNumber &&
                                            <span style={{ color: 'red', fontSize: '6' }}> Please provide a valid Phone Number</span>
                                        }
                                    </Form.Label>
                                    <Form.Control type="text" value={this.state.firstNumber} onChange={this.getContactFirstNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="SecondaryPhoneNumber">
                                    <Form.Label>Secondary Phone Number 1
                                        {this.state.invalidPhoneNumberTwo &&
                                            <span style={{ color: 'red', fontSize: '6' }}> Please provide a valid Phone Number</span>
                                        }
                                    </Form.Label>
                                    <Form.Control type="text" value={this.state.secondNumber} onChange={this.getContactSecondNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs='6' sm='6' md='6' lg='6'>
                                <Form.Group controlId="ThirdPhoneNumber">
                                    <Form.Label>Secondary Phone Number 2
                                        {this.state.invalidPhoneNumberThree &&
                                            <span style={{ color: 'red' }}> Please provide a valid Phone Number</span>
                                        }
                                    </Form.Label>
                                    <Form.Control type="text" value={this.state.thirdNumber} onChange={this.getContactThirdNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '2.5%' }}>
                            <Col xs='0' sm='0' md='8' lg='8'></Col>
                            <Col xs='6' sm='6' md='2' lg='2'>
                                <Button variant="danger" size="md" block="block" type="submit" onClick={this.cancelUpdate}>
                                    Cancel
                            </Button>
                            </Col>
                            <Col xs='6' sm='6' md='2' lg='2'>
                                <Button variant="success" size="md" block="block" type="submit" onClick={this.updateData}>
                                    Update Contact
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Modal show={this.state.popupVisible} onHide={this.hidePopup}>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                            <Icon type="check" style={{ color: 'green' }}/> Contact Succesfully Updated
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Container>
                            <Row>
                                <Col xs='6' sm='6' md='6' lg='6'>
                                    <div style={{ textAlign: 'left' }}>
                                        <Button variant="success" onClick={this.hidePopup}>Re-edit Contact's Info</Button>
                                    </div>
                                </Col>
                                <Col xs='6' sm='6' md='6' lg='6'>
                                    <div style={{ textAlign: 'right' }}>
                                        <Button variant="secondary" >
                                            <Link to={"/contacts-list"} style={{ color: 'white', textDecoration: 'none' }}>
                                                Back To Contacts List
                                            </Link>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                </Modal>
                <Router>
                    <Switch>
                        <Route path="/contacts-list" component={ContactsList} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

