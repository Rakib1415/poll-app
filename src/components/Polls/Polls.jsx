import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import MainContiant from '../MainContaint/MainContiant';
import Sidebar from '../Sidebar/Sidebar';
import POLLS from '../../data/pollsData';

class Polls extends Component {
    state ={
        polls : [],
        selectedPoll : {},
        searchTerm : ''
    }
    componentDidMount(){
        this.setState({polls:POLLS})
    }
    render() {
        return (
            <Container className='my-4'>
                <Row>
                    <Col md={4}>
                        <Sidebar/>
                    </Col>
                    <Col md={8}>
                        <MainContiant/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Polls;