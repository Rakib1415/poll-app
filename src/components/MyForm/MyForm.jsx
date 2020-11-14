import React from 'react';
import {FormGroup, Form, FormFeedback, Label, Input, Button, } from 'reactstrap';

const MyForm = ({
    title,
    description,
    options,
    errors,
    changeHandler,
    optionChangeHandler,
    createOptionHandler,
    deleteOptionHandler,
    submitHandler,

}) => {
    return (
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                id='title'
                name='title'
                placeholder='title'
                value={title}
                onChange={changeHandler}
                invalid = {errors.title ? true : false}
                />
                {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
            </FormGroup>

            <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                id='description'
                type = 'textarea'
                name='description'
                placeholder='description'
                value={description}
                onChange={changeHandler}
                invalid = {errors.description ? true : false}
                />
                {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
            </FormGroup>

            <FormGroup>
                <Label>
                    Enter option 
                    <span
                    style={{marginLeft : '10px', background:'green', color:'white', padding:'5px', borderRadius:'5px', cursor:'pointer'}}
                    onClick={createOptionHandler}
                    >
                        Add option
                    </span>
                </Label>
                {options.map((opt, index) => (
                    <div key={opt.id} className='d-flex my-4'>
                        <Input
                        value={opt.value}
                        onChange={e => optionChangeHandler(index, e)}
                        invalid={errors.options && errors.options[index] ? true : false}
                        />
                        
                        <Button
                        color='danger'
                        className='ml-4'
                        disabled={options.length <= 2}
                        onClick ={() => deleteOptionHandler(index)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </FormGroup>
            <Button color='success' type='submit'>
                Submit
            </Button>
        </Form>
    );
};

export default MyForm;