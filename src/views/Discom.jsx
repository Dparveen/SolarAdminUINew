import axios from 'axios';
import { ADD_DISCOM, DELETE_DISCOM, GET_DISCOM, UPDATE_DISCOM } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ==============================|| Staff ||============================== //

const Discom = () => {
  const [Discom, setDiscom] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Val, setVal] = useState({});
  const [DiscomList, setDiscomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterDiscomList, setFilterDiscomList] = useState([]);

  React.useEffect(()=>{
    setTimeout(() => setIsLoading(false), 2000);
    getDiscom();
  },[]);

  const getDiscom = async () =>{
    let resp = await axios.get(GET_DISCOM);
    console.log(resp);
    if(resp.data.status){
      setDiscomList(resp.data.data);
      setFilterDiscomList(resp.data.data);
    }
  }
  const handleEditFormSubmitDiscom = async (e) => {
    e.preventDefault();
    let add = {
      name:Discom,
      status:Status
    }
    let resp = await axios.post(`${UPDATE_DISCOM}/${Val._id}`, add);
    console.log(resp);
    if(resp.data.status){
      setDiscomList(resp.data.data);
      setFilterDiscomList(resp.data.data);
    }
    alert(resp.data.msg);
  };

  const handleFormSubmitDiscom = async (e) => {
    e.preventDefault();
    let add = {
      name:Discom,
      status:Status
    }
    let resp = await axios.post(ADD_DISCOM, add);
    console.log(resp);
    if(resp.data.status){
      setDiscomList(resp.data.data);
      setFilterDiscomList(resp.data.data);
    }
    alert(resp.data.msg);
  };
  const handleDiscomEdit = (e, value) => {
    e.preventDefault();
    setVal(value);
    setDiscom(value.name);
    setStatus(value.status);
  };

  const handleDiscomDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_DISCOM}/${value._id}`);
    if (response.data.status) {
      setDiscomList(response.data.data);
      setFilterDiscomList(response.data.data);
    }
      alert(response.data.msg);
  };

  const showStatus = (cond) => {
    return cond ? (
      <Button variant="success">Active</Button>
    ) : (
      <Button variant="danger">Inactive</Button>
    );
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e)
    const inputValue = e.target.value.toLowerCase();
    const filteredCities = DiscomList.filter((item) => item.name.toLowerCase().includes(inputValue));
    setFilterDiscomList(filteredCities);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Discom</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form
                onSubmit={Val && Val.name ? handleEditFormSubmitDiscom : handleFormSubmitDiscom}
              >
                <Form.Group controlId="formCity">
                  <Form.Label>Discom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Discom"
                    value={Discom !== null ? Discom : (Val && Val.name) || ""}
                    onChange={(e) => setDiscom(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formStatus1">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={Status !== null ? Status : (Val && Val.status) || false}
                    onChange={(e) => setStatus(e.target.value === "true")}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Form.Control>
                </Form.Group>
                <hr />
                <Button variant="primary" type="submit">
                  {Val && Val.name ? "Update Changes" : "Add Changes"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Discom List</Card.Title>
              <input type="text" className="form-control" placeholder='Enter Discom Name' onChange={(e)=>handleSearch(e)} />
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
                        <th>
                          <span>Sr.</span>
                        </th>
                        <th>
                          <span>Name</span>
                        </th>
                        <th>
                          <span>STatus</span>
                        </th>
                        <th>
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
  {FilterDiscomList.map((dis, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{dis.name}</td>
      <td>{showStatus(dis.status)}</td>
      <td>
        <i
          className="feather icon-edit text-warning"
          onClick={(e) => handleDiscomEdit(e, dis)}
        ></i>{" "}
        &nbsp; &nbsp;
        <i
          className="feather icon-trash text-danger"
          onClick={(e) => handleDiscomDelete(e, dis)}
        ></i>
      </td>
    </tr>
  ))}
</tbody>

                  </Table>
                  )}
                </PerfectScrollbar>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Discom;
