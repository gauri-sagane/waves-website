import React, { useState } from 'react';
import { WavesButton } from '../../utils/tools';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useDispatch, useSelector } from 'react-redux';

const ProductInfo = (props) => {

    
    const showProdTags = (detail) => (
        <div className='product_tags'>
            <div className='tag'>
                <div><LocalShippingIcon /></div>
                <div className='tag_text'>
                    { detail.shipping ? 
                        <div>Free Shipping for US location</div>
                    : <div>No Free Shipping for this item</div> 
                    }
                </div>
            </div>
            { detail.available > 0 ? 
                <div className='tag'>
                    <div><DoneOutlineIcon /></div>
                    <div className='tag_text'>
                        <div><strong>{detail.available}</strong> products available</div>
                    </div>
                </div>
            : 
                <div className='tag'>
                    <div><DoneOutlineIcon /></div>
                    <div className='tag_text'>
                        <div>Sorry! Product not available at the moment</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className='product_actions'>
            <div className='price'>${detail.price}</div>
            <div className='cart'>
                <WavesButton 
                    type="add_to_cart_link"
                    runAction={() => alert('Added to cart')}
                />
            </div>
        </div>
    )

    const showProdSpecs = (detail) => (
        <div className='product_specifications'>
            <h2>Specs:</h2>
            <div>
                <div className='item'>
                    <strong>Frets:</strong> {detail.frets}
                </div>
                <div className='item'>
                    <strong>Wood:</strong> {detail.woodtype}
                </div>
            </div>
        </div>
    )

    const detail = props.detail;


    return(
        <div>
            <h1>{detail.brand.name} {detail.model}</h1>
            <p>
                {detail.description}
            </p>
            {showProdTags(detail)}
            {showProdActions(detail)}
            {showProdSpecs(detail)}
        </div>
    )
}

export default ProductInfo;