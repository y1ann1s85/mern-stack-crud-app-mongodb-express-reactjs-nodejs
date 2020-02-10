import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ContactsTable from './contactsTable';

// CREATE THE CONTACT'S LIST COMPONENT
export default class ContactsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    };
  }

  // FETCH DATA FROM THE DB USING AXIOS
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.get('http://localhost:4000/contacts/')
    .then(res => {
      this.setState({
        contacts: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
    <div className="table-wrapper">
      {this.state.contacts.length > 0 ?
        <Table responsive>
          <tbody>
            {/* RENDER CONTACT'S LIST CONTENT FROM IT'S OWN COMPONENT */}
            {this.state.contacts.map((contact, index) => {
              return <ContactsTable obj={contact} key={index} getData={this.getData}/>
            })}
          </tbody>
        </Table>
        :
        <span style={{color: '#353535'}}>No Contacts here</span>
      }
    </div>
    );
  }
}
