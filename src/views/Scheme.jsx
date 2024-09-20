import axios from 'axios';
import { ADD_SCHEME, DELETE_SCHEME, GET_SCHEME, UPDATE_SCHEME } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
// ==============================|| Staff ||============================== //

const Scheme = () => {
  const [Scheme, setScheme] = useState(null);
  const [ImageURL, setImageURL] = useState(null);
  const [SchemeURL, setSchemeURL] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Val, setVal] = useState({});
  const [SchemeList, setSchemeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterSchemeList, setFilterSchemeList] = useState([]);

  React.useEffect(()=>{
    setTimeout(() => setIsLoading(false), 2000);
    getScheme();
  },[]);

  const getScheme = async () =>{
    let resp = await axios.get(GET_SCHEME);
    console.log(resp);
    if(resp.data.success){
      setSchemeList(resp.data.data);
      setFilterSchemeList(resp.data.data);
    }
  }
  const handleEditFormSubmitScheme = async (e) => {
    e.preventDefault();
    let add = {
      title:Scheme,
      img:ImageURL,
      scheme_url:SchemeURL,
      status:Status
    }
    let resp = await axios.post(`${UPDATE_SCHEME}/${Val._id}`, add);
    // console.log(add, Val);
    if(resp.data.status){
      setSchemeList(resp.data.data);
      setFilterSchemeList(resp.data.data);
      setImageURL(null);
      setSchemeURL(null);
      setScheme(null);
      setStatus(false);
      setVal({});
    }
    alert(resp.data.msg);
  };

  const handleFormSubmitScheme = async (e) => {
    e.preventDefault();
    let add = {
      title:Scheme,
      img:ImageURL,
      scheme_url:SchemeURL,
      status:Status
    }
    let resp = await axios.post(ADD_SCHEME, add);
    console.log(add);
    if(resp.data.status){
      setSchemeList(resp.data.data);
      setFilterSchemeList(resp.data.data);
    }
    alert(resp.data.msg);
  };
  const handleSchemeEdit = (e, value) => {
    e.preventDefault();
    setVal(value);
    setScheme(value.title);
    setImageURL(value.img);
    setSchemeURL(value.scheme_url);
    setStatus(value.status);
  };

  const handleSchemeDelete = async (e, value) => {
    e.preventDefault();
    const response = await axios.post(`${DELETE_SCHEME}/${value._id}`);
    if (response.data.status) {
      setSchemeList(response.data.data);
      setFilterSchemeList(response.data.data);
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
    const filteredCities = SchemeList.filter((item) => item.title.toLowerCase().includes(inputValue));
    setFilterSchemeList(filteredCities);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Scheme</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form
                onSubmit={Val && Val.title ? handleEditFormSubmitScheme : handleFormSubmitScheme}
              >
                <Form.Group controlId="formCity">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={Scheme !== null ? Scheme : (Val && Val.title) || ""}
                    onChange={(e) => setScheme(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Paste Image URL"
                    value={ImageURL !== null ? ImageURL : (Val && Val.img) || ""}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </Form.Group>
                {(ImageURL !== null || (Val && Val.img)) && (<img className="img-radius wid-40" src={ImageURL !== null ? ImageURL : Val.img} alt="Discom" />)}
                <Form.Group controlId="formCity">
                  <Form.Label>Scheme URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Paste Scheme URL"
                    value={SchemeURL !== null ? SchemeURL : (Val && Val.scheme_url) || ""}
                    onChange={(e) => setSchemeURL(e.target.value)}
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
                  {Val && Val.title ? "Update Changes" : "Add Changes"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Scheme List</Card.Title>
              <input type="text" className="form-control" placeholder='Enter Scheme Name' onChange={(e)=>handleSearch(e)} />
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
                          <span>Title</span>
                        </th>
                        <th>
                          <span>Img</span>
                        </th>
                        <th>
                          <span>Scheme URL</span>
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
  {FilterSchemeList.map((dis, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{dis.title}</td>
      <td><img className="img-radius wid-40" src={dis.img} /></td>
      <td><Link to={dis.scheme_url} target="_blank" ><i className='feather icon-globe'></i></Link></td>
      <td>{showStatus(dis.status)}</td>
      <td>
        <i className="feather icon-edit text-warning" onClick={(e) => handleSchemeEdit(e, dis)}></i>{" "}&nbsp; &nbsp;
        <i className="feather icon-trash text-danger" onClick={(e) => handleSchemeDelete(e, dis)} ></i>
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

export default Scheme;
