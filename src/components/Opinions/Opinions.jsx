import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap'

const Opinions = ({opinions}) => {
    return (
        <ListGroup>
            {opinions.map(opinion => (
                <ListGroupItem key={opinion.id}>
                    {opinion.name}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default Opinions;