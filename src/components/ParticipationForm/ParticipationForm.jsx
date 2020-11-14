import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, CustomInput, Button, FormFeedback} from 'reactstrap'


class ParticipationForm extends Component {
    state = {
        name : '',
        selectedOption : '',
        errors : {}
    }

    changeHandler = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        const {errors, isValidate} = this.validate()
        if(isValidate){
            this.props.getOpinion({
                pollId: this.props.poll.id,
                name : this.state.name,
                selectedOption: this.state.selectedOption
            })
            event.target.reset()
            this.setState({
                name : '',
                selectedOption : '',
                errors : {}
            })
        }else{
            this.setState({errors})
        }
    }

    validate = () => {
        const errors = {}
        if(!this.state.name){
            errors.name = 'please provide a name'
        }
        else if(this.state.name.length > 20){
            errors.name = 'Name is very long'
        }
        if(!this.state.selectedOption){
            errors.selectedOption = 'Please select a option'
        }

        return {
            errors,
            isValidate: Object.keys(errors).length === 0
        }
    }


    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <div className='d-flex'>
                    <h4>Options</h4>
                    <Button
                    type='button'
                    color='warning'
                    className='ml-auto'
                    onClick={this.props.toggleModal}
                    >
                        Edit
                    </Button>
                    <Button
                    type='button'
                    color='danger'
                    className='ml-2'
                    onClick={()=>this.props.deletedPoll(this.props.poll.id)}
                    >
                        Delete
                    </Button>
                </div>
                {
                    this.props.poll.options.map(opt => (
                        <FormGroup key={opt.id} className='my-2'>
                            <Label className='d-flex'>
                                <CustomInput
                                type='radio'
                                id={opt.id}
                                name='selectedOption'
                                value={opt.value}
                                onChange={this.changeHandler}
                                invalid={this.state.errors.selectedOption ? true : false}
                                />
                                {opt.value}

                                <span
                                style ={{background:'green', color:'white', padding:'5px 20px', borderRadius:'5px'}}
                                className='ml-auto'
                                >
                                    {opt.vote}
                                </span>
                                <span
                                style ={{background:'red', color:'white', padding:'5px 20px', borderRadius:'5px'}}
                                className='ml-2'
                                >
                                    {this.props.poll.totalVote > 0 ? ((opt.vote * 100)/ this.props.poll.totalVote).toFixed(2) : 0}
                                </span>
                            </Label>

                        </FormGroup>
                    ))
                }
                <FormGroup className='my-2'>
                    <Label>Enter Your Name</Label>
                    <Input 
                    name='name'
                    value={this.state.value}
                    onChange={this.changeHandler}
                    placeholder='Name'
                    invalid={this.state.errors.name ? true : false}
                    />
                    {this.state.errors.name && <FormFeedback>{this.state.errors.name}</FormFeedback>}
                </FormGroup>
                <Button type='submit'>Submit Your opinion</Button>
            </Form>
        );
    }
}

export default ParticipationForm;