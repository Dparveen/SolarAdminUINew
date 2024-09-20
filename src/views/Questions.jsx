import axios from 'axios';
import { ADD_QUESTION, DELETE_QUESTION, GET_QUESTION, UPDATE_QUESTION } from 'config/api';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ==============================|| Staff ||============================== //

const Questions = () => {
  const [Questions, setQuestions] = useState(null);
  const [Questions_hin, setQuestions_hin] = useState(null);
  const [Status, setStatus] = useState(false);
  const [Val, setVal] = useState({});
  const [QuestionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterQuestionsList, setFilterQuestionsList] = useState([]);

  React.useEffect(()=>{
    setTimeout(() => setIsLoading(false), 2000);
    getQuestions();
  },[]);

  const getQuestions = async () =>{
    let resp = await axios.get(GET_QUESTION);
    // console.log(resp);
    if(resp.data.success){
      setQuestionsList(resp.data.data);
      setFilterQuestionsList(resp.data.data);
    }
  }
  const handleEditFormSubmitQuestions = async (e) => {
    e.preventDefault();
    let add = {
      question:Questions,
      question_hin:Questions_hin,
      status:Status
    }
    let resp = await axios.post(`${UPDATE_QUESTION}/${Val._id}`, add);
    // console.log(add, Val);
    if(resp.data.status){
      setQuestionsList(resp.data.data);
      setFilterQuestionsList(resp.data.data);
      setStatus(false);
      setVal({});
      setQuestions_hin(null);
      setQuestions(null);
      setStatus(false);
    }
    alert(resp.data.msg);
  };

  const handleFormSubmitQuestions = async (e) => {
    e.preventDefault();
    let add = {
      question:Questions,
      question_hin:Questions_hin,
      status:Status
    }
    let resp = await axios.post(ADD_QUESTION, add);
    console.log(add);
    if(resp.data.status){
      setQuestionsList(resp.data.data);
      setFilterQuestionsList(resp.data.data);
      setQuestions_hin(null);
      setQuestions(null);
      setStatus(false);
    }
    alert(resp.data.msg);
  };
  const handleQuestionsEdit = (e, value) => {
    e.preventDefault();
    setVal(value);
    setQuestions(value.question);
    setQuestions_hin(value.question_hin);
    setStatus(value.status);
  };

  const handleQuestionsDelete = async (e, value) => {
    e.preventDefault();
    // console.log(value)
    const response = await axios.post(`${DELETE_QUESTION}/${value._id}`);
    if (response.data.status) {
      setQuestionsList(response.data.data);
      setFilterQuestionsList(response.data.data);
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
    const filteredCities = QuestionsList.filter((item) => item.title.toLowerCase().includes(inputValue));
    setFilterQuestionsList(filteredCities);
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Questions</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form
                onSubmit={Val && Val.question ? handleEditFormSubmitQuestions : handleFormSubmitQuestions}
              >
                <Form.Group controlId="formCity">
                  <Form.Label>Question (ENG)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={Questions !== null ? Questions : (Val && Val.question) || ""}
                    onChange={(e) => setQuestions(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Question (HIN)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    value={Questions_hin !== null ? Questions_hin : (Val && Val.question_hin) || ""}
                    onChange={(e) => setQuestions_hin(e.target.value)}
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
                  {Val && Val.question ? "Update Changes" : "Add Changes"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Questions List</Card.Title>
              <input type="text" className="form-control" placeholder='Enter Questions Name' onChange={(e)=>handleSearch(e)} />
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
                          <span>Question</span>
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
  {FilterQuestionsList.map((dis, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{dis.question}<br/>{dis.question_hin}</td>
      <td>{showStatus(dis.status)}</td>
      <td>
        <i className="feather icon-edit text-warning" onClick={(e) => handleQuestionsEdit(e, dis)}></i>{" "}&nbsp; &nbsp;
        <i className="feather icon-trash text-danger" onClick={(e) => handleQuestionsDelete(e, dis)} ></i>
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

export default Questions;
