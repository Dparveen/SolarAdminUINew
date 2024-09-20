import React, { useState } from 'react';

// react-bootstrap
import { Card, Col, Row, Spinner, Table } from 'react-bootstrap';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import axios from 'axios';
import { GET_STATE_CITY } from 'config/api';
import OrderCard from '../../components/Widgets/Statistic/OrderCard';


// assets

// ==============================|| DASHBOARD ANALYTICS ||============================== //

const DashAnalytics = () => {
  const [orderReceived, setOrderReceived]=useState(0);
  const [totalStaff, setTotalStaff]=useState(0);
  const [totalDepartment, setTotalDepartment]=useState(0);
  const [totalState, setTotalState]=useState(0);
  const [totalCity, setTotalCity]=useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [Orders, setOrders] =useState([]);
  const [OrderFilter, setOrderFilter] =useState([]);
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    getData();
  },[])

  const getData = async () => {
    let resp = await axios.get(GET_STATE_CITY);
    // console.log(resp.data.data)
    if(resp.data.status){
      setTotalState(resp.data.data[0].length);
      setTotalCity(resp.data.data[1].length);
      setTotalStaff(resp.data.data[2].length);
      setTotalDepartment(resp.data.data[3].length);
      setOrderReceived(resp.data.data[4].length);
      setOrders(resp.data.data[4]);
      setOrderFilter(resp.data.data[4]);
    }
  }

  const actions = () => {
    return (
      <>
        <i className='float-start feather icon-edit'></i>
      </>
    );
  };
  
  return (
    <React.Fragment>
      <Row>
        {/* order cards */}
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Orders Received',
              class: 'bg-c-blue',
              icon: 'feather icon-shopping-cart',
              primaryText: orderReceived,
              // secondaryText: 'Completed Orders',
              // extraText: '351'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'State',
              class: 'bg-c-green',
              icon: 'feather icon-tag',
              primaryText: totalState,
              // secondaryText: 'This Month',
              // extraText: '213'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'City',
              class: 'bg-c-yellow',
              icon: 'feather icon-repeat',
              primaryText: totalCity,
              // secondaryText: 'This Month',
              // extraText: '$5,032'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Department',
              class: 'bg-c-red',
              icon: 'feather icon-award',
              primaryText: totalDepartment,
              // secondaryText: 'This Month',
              // extraText: '$542'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Staff',
              class: 'bg-c-yellow',
              icon: 'feather icon-repeat',
              primaryText: totalStaff,
              // secondaryText: 'This Month',
              // extraText: '$5,032'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Inquery',
              class: 'bg-c-red',
              icon: 'feather icon-award',
              primaryText: orderReceived,
              // secondaryText: 'This Month',
              // extraText: '$542'
            }}
          />
        </Col>
        {/* <Col md={12} xl={6}>
          <Card>
            <Card.Header>
              <h5>Unique Visitor</h5>
            </Card.Header>
            <Card.Body className="ps-4 pt-4 pb-0">
              <Chart {...uniqueVisitorChart} />
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={12} xl={6}>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Customers</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0">826</h2>
                      <span className="text-c-green">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">New</span>
                    </Col>
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle text-primary f-10 mx-2" />
                        182
                      </h3>
                      <span className="ms-3">Return</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="bg-primary text-white">
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Customers</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0 text-white">826</h2>
                      <span className="text-white">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart1} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">New</span>
                    </Col>
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-white" />
                        182
                      </h3>
                      <span className="ms-3">Return</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col> */}

        {/* <Col lg={4} md={12}>
          <SocialCard
            params={{
              icon: 'fa fa-envelope-open',
              class: 'blue',
              variant: 'primary',
              primaryTitle: '8.62k',
              primaryText: 'Subscribers',
              secondaryText: 'Your main list is growing',
              label: 'Manage List'
            }}
          />
          <SocialCard
            params={{
              icon: 'fab fa-twitter',
              class: 'green',
              variant: 'success',
              primaryTitle: '+40',
              primaryText: 'Followers',
              secondaryText: 'Your main list is growing',
              label: 'Check them out'
            }}
          />
        </Col> */}
        {/* <Col lg={8} md={12}>
          <Card>
            <Card.Header>
              <h5>Activity Feed</h5>
            </Card.Header>
            <Card.Body className="card-body pt-4">
              <ListGroup as="ul" bsPrefix=" " className="feed-blog ps-0">
                <ListGroup.Item as="li" bsPrefix=" " className="active-feed">
                  <div className="feed-user-img">
                    <img src={avatar1} className="img-radius " alt="User-Profile" />
                  </div>
                  <h6>
                    <span className="badge bg-danger">File</span> Eddie uploaded new files:{' '}
                    <small className="text-muted">2 hours ago</small>
                  </h6>
                  <p className="m-b-15 m-t-15">
                    hii <b> @everone</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s.
                  </p>
                  <Row>
                    <Col sm="auto" className="text-center">
                      <img src={imgGrid1} alt="img" className="img-fluid wid-100" />
                      <h6 className="m-t-15 m-b-0">Old Scooter</h6>
                      <p className="text-muted m-b-0">
                        <small>PNG-100KB</small>
                      </p>
                    </Col>
                    <Col sm="auto" className="text-center">
                      <img src={imgGrid2} alt="img" className="img-fluid wid-100" />
                      <h6 className="m-t-15 m-b-0">Wall Art</h6>
                      <p className="text-muted m-b-0">
                        <small>PNG-150KB</small>
                      </p>
                    </Col>
                    <Col sm="auto" className="text-center">
                      <img src={imgGrid3} alt="img" className="img-fluid wid-100" />
                      <h6 className="m-t-15 m-b-0">Microphone</h6>
                      <p className="text-muted m-b-0">
                        <small>PNG-150KB</small>
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" " className="diactive-feed">
                  <div className="feed-user-img">
                    <img src={avatar1} className="img-radius" alt="User-Profile" />
                  </div>
                  <h6>
                    <span className="badge bg-success">Task</span> Sarah marked the Pending Review:{' '}
                    <span className="text-c-green"> Trash Can Icon Design</span>
                    <small className="text-muted"> 2 hours ago</small>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" " className="diactive-feed">
                  <div className="feed-user-img">
                    <img src={avatar1} className="img-radius" alt="User-Profile" />
                  </div>
                  <h6>
                    <span className="badge bg-primary">comment</span> abc posted a task:{' '}
                    <span className="text-c-green">Design a new Homepage</span> <small className="text-muted">6 hours ago</small>
                  </h6>
                  <p className="m-b-15 m-t-15">
                    hii <b> @everone</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s.
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col> */}

        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">New Inquery</Card.Title>
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
                          <span>Subscription ID</span>
                        </th>
                        <th>
                          <span>Date</span>
                        </th>
                        <th>
                          <span>Customer Acc. No.</span>
                        </th>
                        <th>
                          <span>Name</span>
                        </th>
                        <th>
                          <span>Address</span>
                        </th>
                        <th>
                          <span>Assign To</span>
                        </th>
                        <th>
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {console.log(OrderFilter)}
                    {OrderFilter.map((item, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.lead_id}</td>
                          <td>{item.created_at}</td>
                          <td>{item.bill_account_no}</td>
                          <td>{item.name}</td>
                          <td>{item.city} / {item.state}</td>
                          <td>{item.staff_id && item.staff_id.name || '---'}</td>
                          <td>{actions(item)}</td>
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

export default DashAnalytics;
