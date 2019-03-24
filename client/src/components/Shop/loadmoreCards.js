import React from 'react';
import CardBlock from '../utils/card_block';

const LoadmoreCards = (props) => {
  return (
    <React.Fragment>
      
        <CardBlock
          grid={props.grid}
          list={props.products}
        />
      
      {
        props.size > 0 && props.size >= props.limit ?
          <div className="load_more_container">
            <span onClick={() => props.loadMore()}>
              Load More
            </span>
          </div>
          : null
      }
    </React.Fragment>
  );
};

export default LoadmoreCards;