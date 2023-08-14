import React, { useEffect, useReducer, useState } from 'react';
import DashboardLayout from '../../../../hoc/dashboardLayout';
import ProductsTable from './productsTable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from '../../../../utils/tools';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsByPaginate, productRemove } from '../../../../store/actions/products.actions';

const defaultValues = { keywords: '', brand: [], min: 0, max: 5000, frets: [], page: 1 }

const AdminProducts = (props) => {

    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValues
    );

    const formik = useFormik({
        initialValues: { keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string()
            .min(3, 'You need more than 3 characters')
            .max(200, 'Your search is too long')
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchValues({ keywords: values.keywords, page: 1 });
            resetForm();
        }
    });

    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`)
    }

    const goToPage = (page) => {
        setSearchValues({page:page});
    }
    
    const handleClose = () => {
        setRemoveModal(false);
    }

    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true)
    }

    const handleRemove = () => {
        dispatch(productRemove(toRemove))
    }

    const resetSearch = () => {
        setSearchValues(defaultValues);
    }

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])

    useEffect(() => {
        handleClose()
        setToRemove(null);
        if(notifications && notifications.removeArticle){
            dispatch(productsByPaginate(searchValues))
        }
    }, [dispatch, notifications, searchValues])

    return(
        <DashboardLayout title="Products">
            <div className='products_table'>
                <div>
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <TextField 
                            style={{width: '100%'}}
                            name='keywords'
                            label="Enter your search"
                            variant='outlined'
                            { ...formik.getFieldProps('keywords') }
                            { ...errorHelper(formik, 'keywords') }
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>
                        Reset search
                    </Button>
                </div>
                <hr />
                <ProductsTable 
                    removeModal={removeModal}
                    prods={products.byPaginate}
                    prev={(page) => goToPage(page)}
                    next={(page) => goToPage(page)}
                    goToEdit={(id) => goToEdit(id)}
                    handleClose={() => handleClose()}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>

        </DashboardLayout>
    )
}

export default AdminProducts;