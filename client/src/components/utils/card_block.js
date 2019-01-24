import React from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Media } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

const CardBlock = (props) => {
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_availble.png'
    }
  }
  const renderCards = () => (
    props.list ?
      props.list.map((card, i) => (
        
          props.grid ?
            <Col key={i}>
              <Link to={`/product_detail/${card._id}`}>
              <Media className="mb-5">
                <Media left middle>
                  <Media object src={renderCardImage(card.images)} alt={card.name} />
                </Media>
                <Media body className="ml-5">
                  <Media heading>{card.brand.name} {card.name}</Media>
                  <p>{card.description}</p>
                  <div className="price">${card.price}</div>
                </Media>
              </Media>
              </Link>
              
            </Col>
            :
            <Col md="6" lg="4"  key={i}>
              <Card className="mb-5">
                <Link to={`/product_detail/${card._id}`}>
                  <CardImg src={renderCardImage(card.images)} alt={card.name} />
                  <CardBody>
                    <CardTitle className="brand"> {card.brand.name} {card.name}</CardTitle>
                    <CardSubtitle className="price">${card.price}</CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
        
      ))
      : null
  )

  return (
    <Container>
      {
        props.title ?
          <Row>
            <Col className="justify-content-center">
              <h1>{props.title}</h1>
            </Col>
          </Row>
          : null
      }
      <Row>
        {renderCards(props.list)}
      </Row>
    </Container>
  );
};

export default withRouter(CardBlock);