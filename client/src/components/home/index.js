import React, { useEffect } from 'react';
import Featured from './featured';
import SlimPromotion from '../../utils/promotions/slim.block';
// import { useDispatch, useSelector } from 'react-redux';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Upto 40% Off',
    lineTwo: 'In second hand guitars',
    lineTitle: 'Shop Now',
    linkTo: '/shop'
};

const Home = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch()
    // },[dispatch])

    return(
        <div>
            <Featured />
            <SlimPromotion items={slimPromotion}/>
        </div>
    )
}

export default Home;