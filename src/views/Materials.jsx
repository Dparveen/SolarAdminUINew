import axios from 'axios';
import { ADD_MATERIAL, DELETE_MATERIAL, GET_MATERIAL, UPDATE_MATERIAL } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ==============================|| Staff ||============================== //

const Materials = () => {
  const [Material, setMaterial] = useState(null);
  const [QTY, setQTY] = useState(0);
  const [Img, setImg] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Val, setVal] = useState({});
  const [MaterialsList, setMaterialsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterMaterialsList, setFilterMaterialsList] = useState([]);

  React.useEffect(()=>{
    setTimeout(() => setIsLoading(false), 2000);
    getMaterials();
  },[]);

  const getMaterials = async () =>{
    let resp = await axios.get(GET_MATERIAL);
    // console.log(resp);
    if(resp.data.status){
      setMaterialsList(resp.data.data);
      setFilterMaterialsList(resp.data.data);
    }
  }
  const handleEditFormSubmitMaterials = async (e) => {
    e.preventDefault();
    let add = {
      name:Material,
      qty:QTY,
      img:Img,
      status:Status
    }
    let resp = await axios.post(`${UPDATE_MATERIAL}/${Val._id}`, add);
    // console.log(add, Val);
    if(resp.data.status){
      setMaterialsList(resp.data.data);
      setFilterMaterialsList(resp.data.data);
      setStatus(false);
      setVal({});
      setMaterial(null);
      setImg(null);
      setQTY(0);
      setStatus(false);
    }
    alert(resp.data.msg);
  };

  const handleFormSubmitMaterials = async (e) => {
    e.preventDefault();
    let add = {
      name:Material,
      qty:QTY,
      img:Img,
      status:Status
    }
    let resp = await axios.post(ADD_MATERIAL, add);
    console.log(add);
    if(resp.data.status){
      setMaterialsList(resp.data.data);
      setFilterMaterialsList(resp.data.data);
      setMaterial(null);
      setImg(null);
      setQTY(0);
      setStatus(false);
      setStatus(false);
    }
    alert(resp.data.msg);
  };
  const handleMaterialsEdit = (e, value) => {
    e.preventDefault();
    setVal(value);
    setMaterial(value.name);
    setQTY(value.qty);
    setImg(value.img);
    setStatus(value.status);
  };

  const handleMaterialsDelete = async (e, value) => {
    e.preventDefault();
    // console.log(value)
    const response = await axios.post(`${DELETE_MATERIAL}/${value._id}`);
    if (response.data.status) {
      setMaterialsList(response.data.data);
      setFilterMaterialsList(response.data.data);
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
    const filteredCities = MaterialsList.filter((item) => item.name.toLowerCase().includes(inputValue));
    setFilterMaterialsList(filteredCities);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Materials</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form
                onSubmit={Val && Val.name ? handleEditFormSubmitMaterials : handleFormSubmitMaterials}
              >
                <Form.Group controlId="formCity">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={Material !== null ? Material : (Val && Val.name) || ""}
                    onChange={(e) => setMaterial(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Title"
                    value={QTY !== null ? QTY : (Val && Val.qty) || ""}
                    onChange={(e) => setQTY(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Image Url</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Paste Image URL"
                    value={Img !== null ? Img : (Val && Val.img) || ""}
                    onChange={(e) => setImg(e.target.value)}
                  />
                </Form.Group>
                {Img && Val.img && <img src={Img && Val.img} className="img-radius wid-40" />}
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
              <Card.Title as="h5">Materials List</Card.Title>
              <input type="text" className="form-control" placeholder='Enter Materials Name' onChange={(e)=>handleSearch(e)} />
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
                          <span>Image</span>
                        </th>
                        <th>
                          <span>Quantity</span>
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
  {FilterMaterialsList.map((dis, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{dis.name}</td>
      <td><img src={dis.img} className="img-radius wid-40" /></td>
      <td>{dis.qty}</td>
      <td>{showStatus(dis.status)}</td>
      <td>
        <i className="feather icon-edit text-warning" onClick={(e) => handleMaterialsEdit(e, dis)}></i>{" "}&nbsp; &nbsp;
        <i className="feather icon-trash text-danger" onClick={(e) => handleMaterialsDelete(e, dis)} ></i>
      </td>
    </tr>
  ))}
  {FilterMaterialsList.length === 0 && <tr>No Data Found</tr>}
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

export default Materials;
