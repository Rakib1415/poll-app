import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import MainContiant from '../MainContaint/MainContiant';
import Sidebar from '../Sidebar/Sidebar';
import POLLS from '../../data/pollsData';
import shortid from 'shortid';

class Polls extends Component {
    state ={
        polls : [],
        selectedPoll : {},
        searchTerm : ''
    }
    componentDidMount(){
        this.setState({polls:POLLS})
    }
    addNewPoll = poll => {
        poll.id = shortid.generate();
        poll.created = new Date();
        poll.totalVote = 0;
        poll.opinions = [];
        this.setState({
            // polls : [...this.state.polls, poll]
            polls : this.state.polls.concat(poll)
        })
    }

    updatedPoll = updatePoll => {
        const polls = [...this.state.polls];
        const poll = polls.find(p => p.id === updatePoll.id);
        poll.title = updatePoll.title;
        poll.description = updatePoll.description;
        poll.opinions = updatePoll.opinions;
        this.setState({polls})
    }
    deletedPoll = pollId => {
        const polls = this.state.polls.filter(p => p.id !== pollId) ;
        this.setState({polls, selectedPoll:{}})
    }

    selectedPoll = pollId => {
        const {polls} = this.state
        const poll = polls.find(p => p.id === pollId);
        this.setState({selectedPoll : poll})
    }
    searchHandler = term => {
        this.setState({
            searchTerm:term
        })
    }

    performSearch = () => {
        const {polls} = this.state
        return polls.filter(poll => poll.title.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
        
    }
    getOpinion = response => {
        const {polls} = this.state
        // console.log(response)
        let poll = polls.find(p => p.id === response.pollId)
        let option = poll.options.find(o => o.value === response.selectedOption)
        poll.totalVote++
        option.vote++

        const opinion = {
            id : shortid.generate(),
            name : response.name,
            selectedOption:response.selectedOption
        }
        poll.opinions.push(opinion)
        this.setState({polls})
    }

    render() {
        // console.log(this.state.selectedPoll)
        // console.log(this.state.selectedPoll)
        const polls = this.performSearch()
        return (
            <Container className='my-4'>
                <Row>
                    <Col md={4}>
                        <Sidebar
                        polls={polls}
                        selectedPoll={this.selectedPoll}
                        searchTerm={this.state.searchTerm}
                        searchHandler={this.searchHandler}
                        addNewPoll={this.addNewPoll}
                        />
                    </Col>
                    <Col md={8}>
                        <MainContiant
                        poll={this.state.selectedPoll}
                        updatedPoll={this.updatedPoll}
                        deletedPoll={this.deletedPoll}
                        getOpinion ={this.getOpinion}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Polls;