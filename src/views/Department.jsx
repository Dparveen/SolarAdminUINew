import axios from 'axios';
import { ADD_DEPARTMENT, DELETE_DEPARTMENT, GET_DEPARTMENT, UPDATE_DEPARTMENT } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ==============================|| Staff ||============================== //

const Department = () => {
  const [Department, setDepartment] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Val, setVal] = useState({});
  const [DeptList, setDeptList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterDeptList, setFilterDeptList] = useState([]);

  React.useEffect(()=>{
    setTimeout(() => setIsLoading(false), 2000);
    getDept();
  },[]);

  const getDept = async () =>{
    let resp = await axios.get(GET_DEPARTMENT);
    // console.log(resp);
    if(resp.data.status){
      setDeptList(resp.data.data);
      setFilterDeptList(resp.data.data);
    }
  }
  const handleEditFormSubmitDept = async (e) => {
    e.preventDefault();
    if(Department === null || Department ===''){
      alert('Please Enter Department name');
      return false;
    }
    let add = {
      dep_name:Department,
      status:Status
    }
    let resp = await axios.post(`${UPDATE_DEPARTMENT}/${Val._id}`, add);
    // console.log(add, Val);
    if(resp.data.status){
      setDeptList(resp.data.data);
      setFilterDeptList(resp.data.data);
      setDepartment(null);
      setStatus(false);
      setVal({});
    }
    alert(resp.data.msg);
  };

  const handleFormSubmitDept = async (e) => {
    e.preventDefault();
    if(Department === null || Department ===''){
      alert('Please Enter Department name');
      return false;
    }
    let add = {
      deaprtment:Department,
      status:Status
    }
    let resp = await axios.post(ADD_DEPARTMENT, add);
    console.log(add);
    if(resp.data.status){
      setDeptList(resp.data.data);
      setFilterDeptList(resp.data.data);
      setDepartment(null)
    }
    alert(resp.data.msg);
  };
  const handleDeptEdit = (e, value) => {
    e.preventDefault();
    setVal(value);
    setDepartment(value.dep_name);
    setStatus(value.status);
  };

  const handleDeptDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_DEPARTMENT}/${value._id}`);
    if (response.data.status) {
      setDeptList(response.data.data);
      setFilterDeptList(response.data.data);
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
    console.log(e.target.value)
    const inputValue = e.target.value.toLowerCase();
    const filteredCities = DeptList.filter((item) => item.dep_name.toLowerCase().includes(inputValue));
    setFilterDeptList(filteredCities);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Department</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form
                onSubmit={Val && Val.dep_name ? handleEditFormSubmitDept : handleFormSubmitDept}
              >
                <Form.Group controlId="formCity">
                  <Form.Label>Departmant Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department Name"
                    value={Department !== null ? Department : (Val && Val.dep_name) || ""}
                    onChange={(e) => setDepartment(e.target.value)}
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
                  {Val && Val.dep_name ? "Update Changes" : "Add Changes"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Department List</Card.Title>
              <input type="text" className="form-control" placeholder='Enter Department Name' onChange={(e)=>handleSearch(e)} />
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
                          <span>Status</span>
                        </th>
                        <th>
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
  {FilterDeptList.map((dis, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{dis.dep_name}</td>
      <td>{showStatus(dis.status)}</td>
      <td>
        <i className="feather icon-edit text-warning" onClick={(e) => handleDeptEdit(e, dis)}></i>{" "}&nbsp; &nbsp;
        <i className="feather icon-trash text-danger" onClick={(e) => handleDeptDelete(e, dis)} ></i>
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

export default Department;
