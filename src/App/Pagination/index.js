import React from 'react';
import { container, back, forward, content, page } from './Pagination.css';

const Pagination = ({ onPaginate, pages, onGoto, currentPage }) => (
  <section className={container} >
    <button className={back} onClick={onPaginate(false)}>{'<<'}</button>
    <div className={content} >
      {pages.map(
        number =>
          <button
            disabled={currentPage === parseInt(number)}
            key={number}
            onClick={onGoto(number)}
            className={page}
          >{number}</button>
      )}
    </div>
    <button className={forward} onClick={onPaginate(true)}>{'>>'}</button>
  </section>
);

Pagination.propTypes = {
  onPaginate: React.PropTypes.func,
  currentPage: React.PropTypes.number,
  pages: React.PropTypes.array,
  onGoto: React.PropTypes.func,
};

export default Pagination;
