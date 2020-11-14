import React, { Component } from 'react';
import {Button} from 'reactstrap'
import Opinions from '../Opinions/Opinions';
class ShowOpinions extends Component {
    state ={
        opinions:[],
        totalOpinions:[],

    }
    opinionsHandler = option =>{
        const {opinions} = this.props.poll
        const opinionsArr = opinions.filter(opinion => opinion.selectedOption===option)
        this.setState({
            opinions:opinionsArr
        })
    }
    totalOpinionsHandler = () => {
        const {opinions} = this.props.poll
        this.setState({
            totalOpinions: opinions
        })

    }
    render() {
        console.log(this.state.totalOpinions)
        return (
           <div>
                <div className='d-flex'>
                {this.props.poll.options.map(option => (
                    <Button onClick={() => this.opinionsHandler(option.value)} key={option.id} color='success' type='button' className=' mr-2'>{option.value}</Button>
                ))}
               <Button onClick={this.totalOpinionsHandler} type='button' color='success' className='ml-2'>Total Opinions</Button>
            </div>
            <div>
            {this.state.opinions.length > 0 ? (<Opinions opinions={this.state.opinions}/>): <h1>there is no opinions</h1>}
            
            <h3>total Opinions</h3>
            <hr/>
            <Opinions opinions={this.state.totalOpinions}/>
            </div>
           </div>
        );
    }
}

export default ShowOpinions;