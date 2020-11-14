import React, { Component } from 'react';
import {Input, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import PollList from '../PollList/PollList';
import PropTypes from 'prop-types'
import PollForm from '../PollForm/PollForm';
class Sidebar extends Component {
    state = {
        openModal : false 
    }
    toggleModal = () => {
        this.setState({openModal:!this.state.openModal})
    }
    render() {
        return (
            <div style={{background:'#efefef', padding:'10px'}}>
                <div className='d-flex mb-5'>
                    <Input 
                    className='mr-3'
                    type='search' 
                    placeholder='Search' 
                    value={this.props.searchTerm}
                    onChange={e => this.props.searchHandler(e.target.value)}
                    />
                    <Button
                    color='success' 
                    onClick={this.toggleModal}
                    >
                        Add
                    </Button>
                </div>
                <h3 className='text-center'>List of Polls</h3>
                <hr/>
                <PollList
                polls={this.props.polls}
                selectedPoll={this.props.selectedPoll}
                />
                <Modal
                isOpen={this.state.openModal}
                toggle={this.toggleModal}
                unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Create a new Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm 
                        submit={this.props.addNewPoll}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

Sidebar.propTypes ={
    polls:PropTypes.array.isRequired,
    searchTerm : PropTypes.string.isRequired,
    selectedPoll:PropTypes.func.isRequired,
    searchHandler:PropTypes.func.isRequired
}
export default Sidebar;