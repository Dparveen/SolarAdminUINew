import axios from 'axios';
import { ADD_STAFF, DELETE_STAFF, GET_STATE_CITY, UPDATE_STAFF, } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Staff = () => {
  const [State, setState] = useState(null);
  const [City, setCity] = useState(null);
  const [Status, setStatus] = useState(false);
  const [tableDataState, setTableDataState] = useState([]);
  const [tableDataCity, setTableDataCity] = useState([]);
  const [tableFilterDataState, setTableFilterDataState] = useState([]);
  const [tableFilterDataCity, setTableFilterDataCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [Val, setVal] = useState({});
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);
  const [Role, setRole] = useState(0);
  const [Name, setName] = useState(null);
  const [Pass, setPass] = useState(null)
  const [Email, setEmail] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [Department, setDepartment] = useState(null);
  const [DepAdmin, setDepAdmin] = useState(null);
  const [tableDataStaff, setTableDataStaff] = useState([]);
  const [tableFilterDataStaff, setTableFilterDataStaff] = useState([]);
  const [tableDepartment, settableDepartment] = useState([]);
  const [tableDepartmentAdmin, settableDepartmentAdmin] = useState([]);
  const [Session, setSession]=useState({});
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    getData();
  }, []);

    const getData = async () => {
      let sess = await JSON.parse(sessionStorage.getItem('authToken'));
      setSession(sess[0]);
      let resp = await axios.get(GET_STATE_CITY);
      if (resp.data.status) {
        setTableDataState(resp.data.data[0]);
        setTableDataCity(resp.data.data[1]);
        setTableFilterDataState(resp.data.data[0]);
        setTableFilterDataCity(resp.data.data[1]);
        setTableDataStaff(resp.data.data[2]);
        setTableFilterDataStaff(resp.data.data[2]);
        settableDepartment(resp.data.data[3]);
      }
    };

  // Modal control functions
  const handleShow = () => {setShowModal(true);setVal({});}
  const handleClose = () => {setShowModal(false); setVal({});}

  // Handle form submission (Add/Edit State)
  const handleFormSubmitState = async (e) => {
    e.preventDefault();
    if (Role === '' || Role === 0) {
      seterror(true);
      seterrorMsg('Please Select Role first');
      return false;
    }else if (Name === null || Name === '') {
      seterror(true);
      seterrorMsg('Please Enter the name');
      return false;
    }else if (Mobile === null || Mobile === '' || Mobile.length != 10) {
      seterror(true);
      seterrorMsg('Please Enter valid Mobile number');
      return false;
    }else if (Email === null || Email === '') {
      seterror(true);
      seterrorMsg('Please Enter valid Email address');
      return false;
    }else if (Pass === null || Pass === '' || Pass.length <= 7) {
      seterror(true);
      seterrorMsg('Password Must be more than 8 digit');
      return false;
    }else if (State === null || State === '') {
      seterror(true);
      seterrorMsg('Please Select a State');
      return false;
    }else if (City === null || City === '') {
      seterror(true);
      seterrorMsg('Please Select a City');
      return false;
    }else if (Status === null || Status === '') {
      seterror(true);
      seterrorMsg('Please Select a Status');
      return false;
    }else if (Department === null || Department === '') {
      seterror(true);
      seterrorMsg('Please Select Department');
      return false;
    }
    const newEntry = { name: Name, role: Role,  status: Status, mob: Mobile, userId: Email, pass: Pass, city: City, state: State, department: Department, dep_admin: DepAdmin ? DepAdmin : Session._id };    
    console.log(newEntry)
    const response = await axios.post(ADD_STAFF, newEntry);
    if (response.data.status) {
      setTableDataState(response.data.data);
      setTableFilterDataStaff(response.data.data);
      seterror(true);
      alert(response.data.msg);
    } else {
      seterror(true);
      seterrorMsg(response.data.msg);
    }
  };

  const handleEditFormSubmitState = async (e, value) => {
    e.preventDefault();
    if (State === null || State === '') {
      seterror(true);
      seterrorMsg('Please enter a state name');
      return false;
    }
    const newState = { name: State, status: Status };
    const response = await axios.post(`${UPDATE_STAFF}/${value._id}`, newState);
    if (response.data.status) {
      setTableDataState(response.data.data);
      setTableFilterDataStaff(response.data.data);
      seterror(true);
      seterrorMsg(response.data.msg);
    } else {
      seterror(true);
      seterrorMsg(response.data.msg);
    }
  };

  // Handle State and City Edit
  const handleStateEdit = (e, value) => {
    e.preventDefault();
    setShowModal(true);
    setVal(value);
    setState(value.name);
    setStatus(value.status);
  };
  // Handle State and City Delete
  const handleStateDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_STAFF}/${value._id}`);
    if (response.data.status) {
      console.log(response.data);
      setTableDataStaff(response.data.data);
      setTableFilterDataStaff(response.data.data);
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }
  };

  const handleStateName = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredState = tableDataState.filter((item) => 
      item.name.toLowerCase().includes(inputValue)
    );
    setTableFilterDataState(filteredState);
  };

  const handleState = (e) => {
    e.preventDefault();
    let val = tableDataState.find((item) => item.id === parseInt(e.target.value));
    setState(val.name)
    const filteredCities = tableDataCity.filter((item) => item.state_id === parseInt(e.target.value));
    // console.log(filteredCities)
    setTableFilterDataCity(filteredCities);
  }
  const showRole = (role) =>{
    if(role === 2) return <span className="text-success">Admin</span>;
    if(role === 1) return <span className="text-primary">Staff</span>;
  }
  const handleRole = (e) =>{
    e.preventDefault();
    // console.log(e.target.value)
    setRole(e.target.value);
  }
  const handleDepartment = (e) =>{
    e.preventDefault();
    setDepartment(e.target.value);
    let data = tableDataStaff.filter((item)=> item.department._id == e.target.value);
    settableDepartmentAdmin(data);
  }
  if (error) {
    setTimeout(() => {
      seterror(false);
    }, 2000);
  }
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Staff</Card.Title>
              <Button style={{ float: 'right' }} onClick={handleShow}>Add Staff</Button>
              <input type="text" placeholder='search Staff' onChange={(e)=>handleStateName(e)} className='pop-search' />
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-card" style={{ height: '362px' }}>
                <PerfectScrollbar>
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Staff Name</th>
                          <th>Role</th>
                          <th>Department</th>
                          <th>Address</th>
                          <th>Credintials</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableFilterDataStaff.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{showRole(row.role)}</td>
                            <td>{row.department.dep_name}</td>
                            <td>{row.city +' '+row.state}</td>
                            <td>{row.userId}<br />{row.pass}</td>
                            <td>{row.status ? 'Active' : 'Disable'}</td>
                            <td>
                              <i className="feather icon-edit text-warning" onClick={(e)=>handleStateEdit(e, row)}></i> &nbsp; &nbsp;
                              <i className="feather icon-trash text-danger" onClick={(e)=> handleStateDelete(e, row)}></i>
                              </td>
                          </tr>
                        ))}
                        {tableFilterDataState.length === 0 && <tr>No State found</tr>}
                      </tbody>
                    </Table>
                  )}
                </PerfectScrollbar>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>{Val && Val.name ? 'Edit Staff' : 'Add Staff'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  
    <Form onSubmit={Val && Val.name ? (e)=>handleEditFormSubmitState(e, Val) :(e)=> handleFormSubmitState(e)}>
    <Row>
    <Col sm={12}>
      <Form.Group controlId="formStatus">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select"  onChange={(e) => handleRole(e)} >
          <option value={0}>Select Role</option>
          <option value={2}>Admin</option>
          <option value={1}>Staff</option>
        </Form.Control>
      </Form.Group>
      </Col>
      {parseInt(Role) != 0 && <Col sm={parseInt(Role) == 1 ? 6 : 12}>
        <Form.Group controlId="formState">
          <Form.Label>Department</Form.Label>
          <Form.Control as="select"  onChange={(e) => handleDepartment(e)} >
            <option key="0" value="">Select Department</option>
            {tableDepartment.map((item, index) => (
              <option key={index + 1} value={item._id}>
                {item.dep_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>}
      {parseInt(Role) === 1 ? <Col sm={6}>
        <Form.Group controlId="formState">
          <Form.Label>Select Department Admin</Form.Label>
          <Form.Control as="select"  onChange={(e)=>setDepAdmin(e.target.value)} >
            <option key="0" value="">Select Department Admin</option>
            {tableDepartmentAdmin.map((item, index) => (
              <option key={index + 1} value={item._id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>:''
      }
      <Col sm={6}>
        <Form.Group controlId="formState">
          <Form.Label>Staff name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={Name || Val && Val.name || ''} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formState">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="Enter Mobile Number" value={Mobile || Val && Val.mob || ''} onChange={(e) => setMobile(e.target.value)} />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formState">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={Email || Val && Val.userId || ''} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
      </Col> 
      <Col sm={6}>
        <Form.Group controlId="formState">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" value={Pass || Val && Val.pass || ''} onChange={(e) => setPass(e.target.value)} />
        </Form.Group>
      </Col>
      <Col sm={6}>
      <Form.Group controlId="formStatus">
          <Form.Label>State</Form.Label>
          <Form.Control as="select"  onChange={(e) => handleState(e)} >
            <option key="0" value="">Select State</option>
            {tableDataState.map((item, index) => (
              <option key={index + 1} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col sm={6}>
      <Form.Group controlId="formStatus">
        <Form.Label>City</Form.Label>
        <Form.Control as="select" onChange={(e) => setCity(e.target.value)} >
            <option key="0" value="">Select City</option>
            {tableFilterDataCity.map((item, index) => (
              <option key={index + 1} value={item.city_name}>
                {item.city_name}
              </option>
            ))}
          </Form.Control>
      </Form.Group>
      </Col>
      <Col sm={12}>
      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" value={Status || Val && Val.status || false} onChange={(e) => setStatus(e.target.value === 'true')} >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </Form.Control>
      </Form.Group>
      </Col>
      </Row>
      <hr />
      <Button variant="primary" type="submit">
        {Val && Val.name ? 'Update Changes' : 'Add Changes'} 
      </Button>
    </Form>
  </Modal.Body>
  {error ? <Modal.Footer>{errorMsg}</Modal.Footer> : ''}
</Modal>

    </React.Fragment>
  );
};

export default Staff;
