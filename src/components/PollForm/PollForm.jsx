import React, { Component } from 'react'
import shortid from 'shortid'
import MyForm from '../MyForm/MyForm'


const defaultOptions = [
    {id : shortid.generate(), value : '', vote : 0},
    {id : shortid.generate(), value : '', vote : 0}
]

class PollForm extends Component {

    state = {
        title : '',
        description : '',
        options : defaultOptions,
        errors : {}
    }

    componentDidMount(){
        const {poll} = this.props
        if(poll && Object.keys(poll).length > 0){
            this.setState({
                title : poll.title,
                description:poll.description,
                options : poll.options
            })
        }
    }

    changeHandler = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    optionChangeHandler = (index, event) => {
        const { options } = this.state
        options[index].value = event.target.value;
        this.setState({options})
    }
    createOptionHandler = () =>{
        const { options } = this.state;
        if(options.length < 5){
            options.push({
                id : shortid.generate(),
                value : '',
                vote : 0
            })
            this.setState({options})
        }
        else{
            alert('You can create max 5 options')
        }
    }
    deleteOptionHandler = index => {
        const { options } = this.state
        if(options.length >= 2){
            options.splice(index, 1)
            this.setState({options})
        }
        else{
            alert('You must have two options')
        }
    }
    submitHandler = event => {
        event.preventDefault()
        const {isValid, errors} = this.validate();

        if(isValid){
            const {title, description, options} = this.state
            const poll ={
                title,
                description,
                options
            }
            if(this.props.isUpdate) {
                poll.id = this.props.poll.id
                this.props.submit(poll);
                alert('successfully update')
            }
            else{
                this.props.submit(poll);
                
            event.target.reset()
            this.setState({
                title : '',
                description : '',
                options : defaultOptions,
                errors : {}
            })
            }
            
        }
        else{
            this.setState({
                errors
            })
        }
    }

    validate = () => {
        const errors = {}
        const {title, description, options} = this.state

        if(!title) {
            errors.title = 'Please provide a title'
        }
        else if(title.length < 20){
            errors.title = 'Title is too short'
        }
        else if(title.length > 100){
            errors.length = 'Title is too long'
        }

        if(!description){
            errors.description = 'Please provide a description'
        }
        else if(description.length > 500){
            errors.description = 'Description is too long'
        }
        const optionErrors = [] ;
        options.forEach((opt, index) => {
            if(!opt.value){
                optionErrors[index] = 'option text empty'
            }
            else if(opt.value.length > 100){
                optionErrors[index] = 'option text is too long'
            }
        })
        if(optionErrors.length > 0){
            errors.options = optionErrors;
        }
        return {
            errors,
            isValid : Object.keys(errors).length === 0
        }
    }

    render() {
        const {title, description, options, errors} = this.state
        return (
            <div>
                <MyForm
                title={title}
                description={description}
                options = {options}
                errors={errors}
                changeHandler={this.changeHandler}
                optionChangeHandler={this.optionChangeHandler}
                createOptionHandler={this.createOptionHandler}
                deleteOptionHandler={this.deleteOptionHandler}
                submitHandler={this.submitHandler}
                />
            </div>
        )
    }
}


export default PollForm;
