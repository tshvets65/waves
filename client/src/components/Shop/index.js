import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import Paginator from '../utils/paginator';

import { frets, price } from '../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../actions/products';

import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';

import CardBlock from '../utils/card_block';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons';


class Shop extends Component {

  constructor() {

    super();

    this.pageSize = 6;

    this.state = {
      grid: false,
      currentPage: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
        price: []
      }
    }
  }


  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(getProductsToShop(
      this.state.currentPage,
      this.pageSize,
      this.state.filters
    ))
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    return array;
  }


  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters }
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues
    }

    this.showFilteredResults(newFilters)
    this.setState({
      filters: newFilters
    })
  }

  showFilteredResults = (filters) => {
    this.props.dispatch(getProductsToShop(
      0,
      this.pageSize,
      filters
    )).then(() => {
      this.setState({
        currentPage: 0
      })
    })
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? true : false
    });
  }

  handleClick = (e, index) => {

    e.preventDefault();

    this.props.dispatch(getProductsToShop(
      index,
      this.pageSize,
      this.state.filters
    ));
    this.setState({
      currentPage: index
    });

  }

  render() {
    const products = this.props.products;
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Browse Products</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={true}
              title="Brands"
              list={products.brands}
              handleFilters={(filters) => this.handleFilters(filters, 'brand')}
            />
            <CollapseCheckbox
              initState={false}
              title="Frets"
              list={frets}
              handleFilters={(filters) => this.handleFilters(filters, 'frets')}
            />
            <CollapseCheckbox
              initState={false}
              title="Wood"
              list={products.woods}
              handleFilters={(filters) => this.handleFilters(filters, 'wood')}
            />
            <CollapseRadio
              initState={true}
              title="Price"
              list={price}
              handleFilters={(filters) => this.handleFilters(filters, 'price')}
            />
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faTh} />
                </div>
                <div
                  className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                  onClick={() => this.handleGrid()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
            </div>
            {
              products.toShop ?
                <div style={{ clear: 'both' }}>
                  <Paginator
                    pagesCount={Math.ceil(products.toShopSize / this.pageSize)}
                    currentPage={this.state.currentPage}
                    handleClick={this.handleClick}
                  />
                  <CardBlock
                    grid={this.state.grid}
                    list={products.toShop}
                  />
                </div>
                : null
            }

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);