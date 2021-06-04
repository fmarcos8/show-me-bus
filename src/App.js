import React from 'react'
import Map from 'components/Map';
import Sidebar from 'components/sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import './App.scss';
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <Container fluid>
        <Row>
          <Col md="2" className="p-0">
            <Sidebar />
          </Col>
          <Col md="10" className="p-0">
            <Map />
          </Col>
        </Row>
      </Container>
    </Provider>
  )
}

export default App;
