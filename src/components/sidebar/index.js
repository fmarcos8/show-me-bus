import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row, ListGroup, Spinner } from 'react-bootstrap'
import { ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { FaSearch, FaArrowRight, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import api from 'api'

import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = () => {
  const [lines, setLines] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const getLines = (term) => {
    setIsLoading(true)
    api.get('/lines', { params: { search_term: term } })
      .then(({ data }) => {
        setLines(data)
      })
      .finally(() => setIsLoading(false))
  }

  const getShapesAndBusPositions = (data) => {
    Promise.all([
      getShapes(data.shapeId),
      getBusPositions(data.lineId)
    ])
    .then(async ([shapeResponse, busPositionsResponse]) => {
      const { data: shapes } = shapeResponse;
      const { data: busPositions } = busPositionsResponse;
      
      setShapes(shapes.map(({ lat, lng }) => [lat, lng]))
      setBusPositions(busPositions.vehicles.map(({ prefix, lat, lng }) => {
        return { prefix, coords: [lat, lng] }
      }))
    })    
  }

  const getShapes = shapeId => {
    return api.get('/shapes', { params: { shape_id: shapeId } })
  }

  const getBusPositions = lineId => {
    return api.get('/bus-position', { params: { line_id: lineId } })
  }

  const setShapes = (shapes) => {
    dispatch({ type: 'SET_SHAPES', data: shapes })
  }

  const setBusPositions = (positions) => {
    dispatch({ type: 'SET_BUS_POSITIONS', data: positions })
  }

  const buildLineItem = line =>{
    return (
      <Row>
        <Col md="12" className="d-flex flex-column">
          <span style={{ fontSize: '12px' }}>
            {line.mainTerminal} {' '}
            {line.direction === 1 ? <FaArrowRight color={"green"} /> : <FaArrowLeft color={"red"} />}  {' '}
            {line.secondaryTerminal}
          </span>
          <span style={{ fontSize: '12px' }}>{ `${line.displaySign}-${line.type}` }</span>
        </Col>
      </Row>
    )
  }

  return (
    <ProSidebar>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Show me Bus
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Row className="p-3">
          <Col md="12">
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={isLoading}
                    value={searchTerm}
                    onChange={({ target }) => {
                      setSearchTerm(target.value)
                    }}
                    type="input"
                    placeholder="Ex.: 5024-31 ou Jabaquara"
                  />
                  <InputGroup.Append>
                    <Button 
                      onClick={() => {
                        if (searchTerm.length >= 4) {
                          getLines(searchTerm)
                        }
                      }}
                      variant="info"
                    >
                      {isLoading ? <Spinner animation="border" size="sm" /> : <FaSearch /> }                      
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
          <Col md="12">
            <Button 
              size="sm" 
              variant="danger"
              onClick={() => setLines([])}
            >
              Limpar <FaTrash />
            </Button>
          </Col>
          <Col md="12" className="mt-3">
            <ListGroup>
              {lines.map(line => (
                <ListGroup.Item
                  action
                  key={line.lineId}
                  onClick={() => getShapesAndBusPositions(line)}
                >
                  { buildLineItem(line) }
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </SidebarContent>
    </ProSidebar>
  )
}

export default Sidebar