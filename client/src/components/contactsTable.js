import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Icon } from 'antd';

// CREATE CONTACT'S LIST RENDERING COMPONENT
export default class ContactsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false
        }
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

    // PERFORM DELETE ACTION USING AXIOS
    deleteContact = (props) => {
        axios.delete('http://localhost:4000/contacts/delete-contact/' + this.props.obj._id)
        .then((res) => {
            console.log('Contact successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.getData()
    }

    render() {
        return (
            <>
                <tr style={{fontWeight: 'bolder'}}><Icon type="idcard" style={{fontSize: 'large'}}/> Contact Info</tr>
                <tr>
                    <td><Icon type="user" style={{fontSize: 'large'}}/> {this.props.obj.name}</td>
                    <td><span><Icon type="phone" style={{fontSize: 'large'}}/></span> {this.props.obj.firstnumber}</td>
                    <td><span><Icon type="mail"style={{fontSize: 'large'}}/></span> {this.props.obj.email}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button size="sm" variant="primary" style={{ marginRight: '2.5%' }}>
                            <Link className="edit-link" to={"/edit-contact/" + this.props.obj._id}
                                style={{ color: 'white', textDecoration: 'none' }}>
                            <Icon type="edit" /> Edit
                            </Link>
                        </Button>
                        <Button onClick={this.showPopup} size="sm" variant="danger">
                            <Icon type="delete" />Delete
                        </Button>
                    </td>
                </tr>
                <tr style={{marginBottom: '1.5%'}}>
                    <td><span><Icon type="phone" style={{fontSize: 'large'}}/></span> {this.props.obj.secondnumber}</td>
                    <td><span><Icon type="phone" style={{fontSize: 'large'}}/></span> {this.props.obj.thirdnumber}</td>
                    <td><span><Icon type="environment" style={{fontSize: 'large'}}/></span>{this.props.obj.address}</td>
                </tr>
                <tr><br/></tr>
                <Modal show={this.state.popupVisible} onHide={this.hidePopup}>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <div style={{textAlign: 'center'}}>
                            Are you sure you want to Delete <span style={{fontWeight: 'bolder'}}>{this.props.obj.name}</span> Contact?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hidePopup}>Cancel</Button>
                        <Button variant="danger" onClick={this.deleteContact}>Delete Contact</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
