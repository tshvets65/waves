import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const Paginator = props => {
  const {currentPage} = props;

  return (
    <div className="pagination-wrapper">

      <Pagination>

        <PaginationItem disabled={currentPage <= 0}>

          <PaginationLink
            onClick={e => props.handleClick(e, currentPage - 1)}
            previous
            href="#"
          />

        </PaginationItem>

        {[...Array(props.pagesCount)].map((page, i) =>
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink onClick={e => props.handleClick(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem disabled={currentPage >= props.pagesCount - 1}>

          <PaginationLink
            onClick={e => props.handleClick(e, currentPage + 1)}
            next
            href="#"
          />

        </PaginationItem>

      </Pagination>

    </div>
  )
}

export default Paginator;