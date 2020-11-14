import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';

const PollList = ({polls, selectedPoll}) => {
   if(polls.length === 0){
       return <p>There is no poll item</p>
   }
   return (
       <ListGroup>
           {
              polls.map(poll => (
                   <ListGroupItem 
                   key={poll.id}
                   style={{cursor:'pointer'}}
                   onClick={()=> selectedPoll(poll.id)}
                   >
                       {poll.title.length > 30 ? poll.title.substr(0,30)+'...' : poll.title}
                   </ListGroupItem>
               ))
           }
       </ListGroup>
   )
};

PollList.propTypes = {
    polls : PropTypes.array.isRequired,
    selectedPoll : PropTypes.func.isRequired
}
export default PollList;