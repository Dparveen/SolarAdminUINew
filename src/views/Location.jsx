import axios from 'axios';
import { ADD_STATE, GET_STATE_CITY, DELETE_STATE, UPDATE_STATE, ADD_CITY, UPDATE_CITY, DELETE_CITY } from 'config/api';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Location = () => {
  const [State, setState] = useState(null);
  const [City, setCity] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Status1, setStatus1] = useState(false);
  const [tableDataState, setTableDataState] = useState([]);
  const [tableDataCity, setTableDataCity] = useState([]);
  const [tableFilterDataState, setTableFilterDataState] = useState([]);
  const [tableFilterDataCity, setTableFilterDataCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [SelectedState, setSelectedState] = useState(null);
  const [Val, setVal] = useState({});
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    getData();
  }, []);

  const getData = async () => {
    let resp = await axios.get(GET_STATE_CITY);
    if (resp.data.status) {
      setTableDataState(resp.data.data[0]);
      setTableDataCity(resp.data.data[1]);
      setTableFilterDataState(resp.data.data[0]);
      setTableFilterDataCity(resp.data.data[1]);
    }
  };

  // Modal control functions
  const handleShow = () => {setShowModal(true);setVal({});}
  const handleClose = () => {setShowModal(false); setVal({});}
  const handleShow1 = () => {setShowModal1(true);setVal({});}
  const handleClose1 = () => {setShowModal1(false); setVal({});}

  // Handle form submission (Add/Edit State)
  const handleFormSubmitState = async (e) => {
    e.preventDefault();
    if (State === null || State === '') {
      seterror(true);
      seterrorMsg('Please enter a state name');
      return false;
    }
    const newState = { name: State, status: Status };
    const response = await axios.post(ADD_STATE, newState);
    if (response.data.status) {
      setTableDataState(response.data.data);
      seterror(true);
      seterrorMsg(response.data.msg);
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
    const response = await axios.post(`${UPDATE_STATE}/${value._id}`, newState);
    if (response.data.status) {
      setTableDataState(response.data.data);
      seterror(true);
      seterrorMsg(response.data.msg);
    } else {
      seterror(true);
      seterrorMsg(response.data.msg);
    }
  };

  // Handle form submission (Add/Edit City)
  const handleFormSubmitCity = async (e) => {
    e.preventDefault();
    if (SelectedState === null || SelectedState === '') {
      seterror(true);
      seterrorMsg('Please select a state name');
      return false;
    }
    if (City === null || City === '') {
      seterror(true);
      seterrorMsg('Please enter a city name');
      return false;
    }
    const newCity = {
      name: City,
      state: SelectedState,
      status: Status1,
    };

    const response = await axios.post(ADD_CITY, newCity); // Add City API call
    if (response.data.status) {
      setTableDataCity(response.data.data);
      handleClose1();
    } else {
      seterror(true);
      seterrorMsg(response.data.msg);
    }
  };

  const handleEditFormSubmitCity = async (e, value) => {
    e.preventDefault();
    if (SelectedState === null || SelectedState === '') {
      seterror(true);
      seterrorMsg('Please select a state name');
      return false;
    }
    if (City === null || City === '') {
      seterror(true);
      seterrorMsg('Please enter a city name');
      return false;
    }
    const updatedCity = {
      name: City,
      state: SelectedState,
      status: Status1,
    };

    const response = await axios.post(`${UPDATE_CITY}/${value._id}`, updatedCity); // Edit City API call
    if (response.data.status) {
      setTableDataCity(response.data.data);
      handleClose1();
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

  const handleCityEdit = (e, value) => {
    e.preventDefault();
    setShowModal1(true);
    setVal(value);
    setCity(value.name);
    setSelectedState(value.state);
    setStatus1(value.status);
  };

  // Handle State and City Delete
  const handleStateDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_STATE}/${value._id}`);
    if (response.data.status) {
      setTableDataState(response.data.data);
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }
  };

  const handleCityDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_CITY}/${value._id}`); // Delete City API call
    if (response.data.status) {
      setTableDataCity(response.data.data);
      alert(response.data.msg);
    } else {
      alert(response.data.msg);
    }
  };

  const StateName = (id) => {
    const state = tableDataState.find((item) => item.id === id);
    return state ? state.name : null;
  };
  const handleCityName = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredCities = tableDataCity.filter((item) => 
      item.city_name.toLowerCase().includes(inputValue)
    );
    setTableFilterDataCity(filteredCities);
  };

  const handleStateName = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredState = tableDataState.filter((item) => 
      item.name.toLowerCase().includes(inputValue)
    );
    setTableFilterDataState(filteredState);
  };
  
  if (error) {
    setTimeout(() => {
      handleClose();
      handleClose1();
      seterror(false);
      setCity(null);
      setState(null);
      setStatus(false);
      setStatus1(false);
    }, 2000);
  }
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">State</Card.Title>
              <Button style={{ float: 'right' }} onClick={handleShow}>Add State</Button>
              <input type="text" placeholder='search state' onChange={(e)=>handleStateName(e)} className='pop-search' />
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
                          <th>State</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableFilterDataState.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
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
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">City</Card.Title>   <Button style={{ float: 'right' }} onClick={handleShow1}>Add City</Button>
            <input type="text" placeholder='search city' onChange={(e)=>handleCityName(e)} className='pop-search' />
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
                          <th>City</th>
                          <th>State</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableFilterDataCity.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.city_name}</td>
                            <td>{StateName(row.state_id)}</td>
                            <td>{row.status ? 'Active' : 'Disable'}</td>
                            <td>
                              <i className="feather icon-edit text-warning" onClick={(e)=>handleCityEdit(e, row)}></i> &nbsp; &nbsp;
                              <i className="feather icon-trash text-danger" onClick={(e)=> handleCityDelete(e, row)}></i>
                              </td>
                          </tr>
                        ))}
                        {tableFilterDataCity.length === 0 && <tr>No City found</tr>}
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
    <Modal.Title>{Val && Val.name ? 'Edit State' : 'Add State'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={Val && Val.name ? (e)=>handleEditFormSubmitState(e, Val) :(e)=> handleFormSubmitState(e)}>
      <Form.Group controlId="formState">
        <Form.Label>State name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter State name"
          value={State || (Val ? Val.name : '')}
          onChange={(e) => setState(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={Status || (Val ? Val.status : false)}
          onChange={(e) => setStatus(e.target.value === 'true')}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </Form.Control>
      </Form.Group>
      <hr />
      <Button variant="primary" type="submit">
        {Val && Val.name ? 'Update Changes' : 'Add Changes'} 
      </Button>
    </Form>
  </Modal.Body>
  {error ? <Modal.Footer>{errorMsg}</Modal.Footer> : ''}
</Modal>


      {/* Add City Modal */}
      <Modal show={showModal1} onHide={handleClose1}>
  <Modal.Header closeButton>
    <Modal.Title>{Val && Val.city_name ? 'Edit City' : 'Add City'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={Val && Val.city_name ? (e) => handleEditFormSubmitCity(e, Val) : handleFormSubmitCity}>
      <Form.Group controlId="formCity">
        <Form.Label>City Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City Name"
          value={City || (Val ? Val.city_name : '')}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      {Val && Val.city_name &&
      <Form.Group controlId="formCity">
        <Form.Label className="text-primary">State Name  -----> {StateName(Val.state_id)}</Form.Label>
      </Form.Group>
        }
      <Form.Group controlId="formStateSelect">
        <Form.Label>Select State</Form.Label>
        <Form.Control as="select" value={SelectedState || (Val ? Val.state : '')} onChange={(e) => setSelectedState(e.target.value)}>
          <option value={null}>Select State</option>
          {tableDataState.map((row, index) => (
            <option key={index} value={row._id}>{row.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formStatus1">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={Status1 || (Val ? Val.status : false)}
          onChange={(e) => setStatus1(e.target.value === 'true')}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </Form.Control>
      </Form.Group>
      <hr />
      <Button variant="primary" type="submit">
        {Val && Val.city_name ? 'Update Changes' : 'Add Changes'}
      </Button>
    </Form>
  </Modal.Body>
</Modal>

    </React.Fragment>
  );
};

export default Location;
