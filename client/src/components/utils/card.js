import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Media } from 'reactstrap';
import MyButton from './button';

import { connect } from 'react-redux';
import { addToCart } from '../../actions/user';

class MyCard extends Component {

  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_availble.png'
    }
  }


  render() {
    const props = this.props;
    return (
      // <div className={`card_item_wrapper ${props.grid}`}>
      //   <div
      //     className="image"
      //     style={{
      //       background: `url(${this.renderCardImage(props.images)}) no-repeat`
      //     }}
      //   >  </div>
      //   <div className="action_container">
      //     <div className="tags">
      //       <div className="brand">{props.brand.name}</div>
      //       <div className="name">{props.name}</div>
      //       <div className="name">${props.price}</div>
      //     </div>

      //     {props.grid ?
      //       <div className="description">
      //         <p>
      //           {props.description}
      //         </p>
      //       </div>
      //       : null
      //     }
      //     <div className="actions">
      //       <div className="button_wrapp">
      //         <MyButton
      //           type="default"
      //           altClass="card_link"
      //           title="View product"
      //           linkTo={`/product_detail/${props._id}`}
      //           addStyles={{
      //             margin: '10px 0 0 0'
      //           }}
      //         />
      //       </div>
      //       <div className="button_wrapp">
      //         <MyButton
      //           type="bag_link"
      //           runAction={() => {
      //             props.user.userData.isAuth ?
      //               this.props.dispatch(addToCart(props._id)).then(() => this.props.history.push('/user/cart'))
      //               :
      //               console.log('you need to log in')
      //           }}
      //         />
      //       </div>
      //     </div>
      //   </div>
      // </div>

      props.grid ?
        <Media className="mb-5">
          <Media left middle>
            <Media object src={this.renderCardImage(props.images)} alt={props.name} />
          </Media>
          <Media body className="ml-5">
            <Media heading>{props.brand.name} {props.name}</Media>
            <p>{props.description}</p>
            <div className="price">${props.price}</div>
          </Media>
        </Media>
        :
        <Card className="mb-5">
          <Link to={`/product_detail/${props._id}`}>
            <CardImg src={this.renderCardImage(props.images)} alt={props.name} />
            <CardBody>
              <CardTitle className="brand"> {props.brand.name} {props.name}</CardTitle>
              <CardSubtitle className="price">${props.price}</CardSubtitle>
              {props.grid ? <CardText>{props.description}</CardText> : null}
            </CardBody>
          </Link>
        </Card>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(MyCard));