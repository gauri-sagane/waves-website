import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../utils/loader';
import { productsById } from '../../store/actions/products.actions';
import { clearCurrentProduct } from '../../store/actions';
import ProductInfo from './productInfo';
import { renderCardImage } from '../../utils/tools';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = (props) => {

    const [modal, setModal] = useState(false);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const { id } = useParams();
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }

    const handleClose = () => setModal(false);
    const handleCarrousel = () => {
        if(products.byId.images.length > 0){
            setModal(true);
        }
    }

    useEffect(()=>{
        dispatch(productsById(id))
    }, [dispatch, id])

    useEffect(()=>{
        return () => {
            dispatch(clearCurrentProduct());
        }
    }, [dispatch])

    return(
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    Product Detail
                </div>
            </div>
            <div className='container'>
                { products && products.byId ?
                    <div className='product_detail_wrapper'>
                        <div className='left'>
                            <div>
                                <img
                                    alt='some img'
                                    src={renderCardImage(products.byId.images)}
                                    onClick={() => handleCarrousel()}
                                >
                                </img>
                            </div>
                        </div>
                        <div className='right'>
                            <ProductInfo 
                                detail={products.byId}
                            />
                        </div>
                    </div>
                : 
                    <Loader />
                }
            </div>
            <Modal show={modal} onHide={handleClose} dialogClassName='modal-90w'>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Slider {...settings}>
                        { products.byId && products.byId.images ?
                            products.byId.images.map((item)=>(
                                <div key={item} style={{margin: '0 auto'}}>
                                    <div className='img-block'
                                        style={{
                                            background: `url(${item}) no-repeat`
                                        }}
                                    ></div>
                                </div>
                            ))
                        : null }
                    </Slider>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductDetail;