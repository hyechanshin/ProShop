import React, { useState, useEffect } from 'react'

/* REACT - REDUX */
import { useDispatch, useSelector } from 'react-redux'

/* REACT BOOTSTRAP */
import { Row, Col } from 'react-bootstrap'

/* ACTION CREATORS */
import { listProducts } from '../actions/productActions'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(()=>{
        dispatch(listProducts())
        
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </div>
            }
        </div>
    )
}

export default HomeScreen
