import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../hoc/dashboardLayout';
import Loader from '../../../utils/loader';
import CartDetail from './cartDetail';
import { removeFromCart, userPurchaseSuccess } from '../../../store/actions/user.actions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const UserCart = (props) => {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state=>state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialOptions = {
        clientId: "AeL6nCcey1Tmp5oBSaA3n71WO0dj_jL09r_B7B77gPI4y8txWZ4pfdtXSLkf-oWPwtPF3WR58sDbWvIG",
        currency: "USD",
        disableFunding: 'credit,card'
    };

    const removeItem = (position) => {
        dispatch(removeFromCart(position));
    }

    const calculateTotal = () => {
        let total = 0
        props.users.cart.forEach(item => {
            total += parseInt(item.price, 10)
        });
        return total;
    }

    const generateUnits = () => (
        [{
            description: "Guitars and accessories",
            amount: {
                currency_code: "USD",
                value: calculateTotal(),
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: calculateTotal()
                    }
                }
            },
            items: generateItems()
        }]
    );

    const generateItems = () => {
        let items = props.users.cart.map((item)=>(
            {
                unit_amount: {
                    currency_code: "USD",
                    value: item.price
                },
                quantity: 1,
                name: item.model
            }
        ));
        return items;
    }

    useEffect(()=>{
        if(notifications && notifications.success){
            navigate('/dashboard')
        }
        if(notifications && notifications.error){
            setLoading(false);
        }
    }, [notifications, navigate])

    return(
        <DashboardLayout title="Your Cart">
            { props.users.cart && props.users.cart.length > 0 ? 
                <>
                    <CartDetail 
                        products={props.users.cart}
                        removeItem={(position)=>removeItem(position)}
                    />
                    <div className='user_cart_sum'>
                        <div>
                            Total amount: ${calculateTotal()}
                        </div>
                    </div>
                    { loading ? 
                        <Loader />
                    : 
                    <div className='pp_button'>
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons 
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: generateUnits()
                                    })
                                }}
                                onApprove={(details, data)=>{
                                    // console.log(details);
                                    // console.log(data);
                                    dispatch(userPurchaseSuccess(details.orderID))
                                    setLoading(true);
                                }}
                                onCancel={(data)=>{
                                    setLoading(false);
                                }}
                            />
                        </PayPalScriptProvider>
                        
                    </div>
                    }
                </>
            :
                <div>There is nothing in your cart!</div>
            }
        </DashboardLayout>
    )

}

export default UserCart;