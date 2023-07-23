import React from 'react';
import Carrousel from '../../utils/carrousel';

const Featured = () => {

    const carrouselItems = [
        {
            img: '/images/featured/featured_home.jpg',
            lineOne: 'Fender',
            lineTwo: 'Custom Shop',
            lineTitle: 'Shop Now',
            linkTo: '/shop'
        },
        {
            img: '/images/featured/featured_home_2.jpg',
            lineOne: 'B-Stock',
            lineTwo: 'Awesome Discounts',
            lineTitle: 'View offers',
            linkTo: '/shop'
        }  
    ]

    return(
        <div className='featured_container'>
            <Carrousel items = {carrouselItems}/>
        </div>
    )
}


export default Featured;