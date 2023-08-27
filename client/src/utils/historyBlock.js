import React from 'react';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

const HistoryBlock = ({history}) => {

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Amount Paid</th>
                        <th>Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    { history.map((item,i)=>(
                        item.map((transaction)=>(
                            <tr key={transaction.transactionId}>
                                <td><Moment to={transaction.date}></Moment></td>
                                <td>
                                    { transaction.items.map((article, i)=>(
                                        <div key={i}>{article.name}</div>          
                                    ))}
                                </td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.orderID}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default HistoryBlock;