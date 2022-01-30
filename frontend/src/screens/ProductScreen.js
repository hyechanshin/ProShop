import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import products from '../products'


function ProductScreen({ match }) {

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails )
    const { loading, error, product } = productDetails
    const { id } = useParams();
    const product2 = products.find((p) => p._id === (id));
    
    useEffect(()=>{
        dispatch(listProductDetails(product2.id))
    }, [dispatch, match])


    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                    <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroupItem>
    
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
    
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button className='btn-block' disabled={product.countInStock <= 0} type='button'>ADD TO CART</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                )
            }
            
            {product.name}
        </div>
    )
}

export default ProductScreen
