import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import ParticipationForm from '../ParticipationForm/ParticipationForm';
import PollForm from '../PollForm/PollForm';
import ShowOpinions from '../ShowOpinions/ShowOpinions';
class MainContiant extends Component {
    state = {
        openModal : false
    }
    toggleModal = ()=> {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    render() {
        if(Object.keys(this.props.poll).length === 0){
            return (
                <div>
                    <h3>Welcome my application</h3>
                </div>
            )
        }
        const {poll, getOpinion, updatedPoll, deletedPoll} = this.props
        // console.log(poll)
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br/>
                <ParticipationForm
                poll={poll}
                getOpinion={getOpinion}
                deletedPoll={deletedPoll}
                toggleModal={this.toggleModal}
                />
                <Modal
                isOpen={this.state.openModal}
                toggle={this.toggleModal}
                unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update poll
                    </ModalHeader>

                    <ModalBody>
                        <PollForm
                        submit={updatedPoll}
                        poll={poll}
                        isUpdate ={true}
                        />
                    </ModalBody>
                </Modal>
                <div className='my-4'>
                    <ShowOpinions
                    poll={poll}
                    />
                </div>
            </div>
        );
    }
}

export default MainContiant;