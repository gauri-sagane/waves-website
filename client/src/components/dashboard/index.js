import React from 'react';
import DashboardLayout from '../../hoc/dashboardLayout';
import HistoryBlock from '../../utils/historyBlock';

const UserDashboard = (props) => {

    return (
        <DashboardLayout title="Overview">
            <div className='user_nfo_panel'>
                <div>
                    <span>{props.users.data.firstname}</span>
                    <span>{props.users.data.lastname}</span>
                    <span>{props.users.data.email}</span>
                </div>
                {
                    props.users.data.history.length > 0 ?
                        <div className='user_nfo_panel'>
                            <h1>History of Purchases</h1>
                            <div className='user_product_block_wrapper'>
                                <HistoryBlock 
                                    history={props.users.data.history}
                                />
                            </div>
                        </div>
                    :
                        <div className='user_nfo_panel'>
                            <h1>History of Purchases</h1>
                            <div>You need to make your first purchase with us!!</div>
                        </div>
                }
            </div>
        </DashboardLayout>
    )
}


export default UserDashboard;