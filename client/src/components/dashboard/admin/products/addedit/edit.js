import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../../../hoc/dashboardLayout';
import { useFormik } from 'formik';
import { errorHelper } from '../../../../../utils/tools';
import { TextField, Button, Divider, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import Loader from '../../../../../utils/loader';
import { validation, formValues, getValuesToEdit } from './formValues';
import PicUpload from './upload';
import PicViewer from './picViewer';
import { useDispatch , useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { getAllBrands } from '../../../../../store/actions/brands.actions';
import { productEdit, productsById } from '../../../../../store/actions/products.actions';
import { clearProductAdd, clearCurrentProduct } from '../../../../../store/actions/index';
import { useParams } from 'react-router-dom';

const EditProduct = (props) => {

    const [values, setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(productEdit(values, id));
    }

    const handlePicValue = (pic) => {
        const picArray = formik.values.images;
        picArray.push(pic.url);
        formik.setFieldValue('images', picArray)
    }

    const deletePic = (index) => {
        const picArray = formik.values.images;
        picArray.splice(index, 1);
        formik.setFieldValue('images', picArray)
    }

    useEffect(() => {
        if(notifications){
            setLoading(false)
        }
    }, [notifications])

    useEffect(() => {
        // console.log(props.match.params)
        // const param = props.match.params.id;
        console.log(id)
        dispatch(getAllBrands());
        if(id){
            dispatch(productsById(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        return() => {
            dispatch(clearProductAdd())
        }
    }, [dispatch])

    useEffect(() => {
        if(products && products.byId){
            setValues(getValuesToEdit(products.byId))
        }
    }, [products])

    useEffect(() => {
        return() => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])

    console.log(formik.values)

    return(
        <DashboardLayout title="Add Product">
            { loading ?
                <Loader />
            :  
                <>
                    <PicViewer 
                        formik={formik}
                        deletePic={(index) => deletePic(index) }
                    />
                    <PicUpload 
                        picValue={(pic) => handlePicValue(pic)}
                        name="images"
                    />

                    <Divider className='mt-3 mb-3' />

                    <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="model"
                                label="Enter a model"
                                variant='outlined'
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik,'model')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="frets"
                                label="Enter the amount of frets"
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('frets')}
                                {...errorHelper(formik,'frets')}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="woodtype"
                                label="Enter the woodtype"
                                variant='outlined'
                                {...formik.getFieldProps('woodtype')}
                                {...errorHelper(formik,'woodtype')}
                            />
                        </div>
                        <div className='form-group'>
                            <FormControl variant='outlined' style={{padding: '0 0 13px 0'}}>
                                <h5>Select a brand</h5>
                                <Select
                                    name="brand"
                                    {...formik.getFieldProps('brand')}
                                    error={formik.errors.brand && formik.touched.brand ? true : false}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    { brands && brands.all ?
                                        brands.all.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        )) 
                                    : null }
                                </Select>
                                { formik.errors.brand && formik.touched.brand ? 
                                    <FormHelperText error={true}>
                                        { formik.errors.brand }
                                    </FormHelperText>
                                : null }
                            </FormControl>
                        </div>
                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="description"
                                label="Enter description"
                                variant='outlined'
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik,'description')}
                                multiline
                                rows={4}
                            />
                        </div>
                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="price"
                                label="Enter the price"
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik,'price')}
                            />
                        </div>

                        <Divider className='mt-3 mb-3' />

                        <div className='form-group'>
                            <TextField 
                                style={{width: '100%', padding: '0 0 13px 0'}}
                                name="available"
                                label="How many of these we have in storage?"
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik,'available')}
                            />
                        </div>

                        <Divider className='mt-3 mb-3' />

                        <div className='form-group'>
                            <FormControl variant='outlined' style={{padding: '0 0 13px 0'}}>
                                <h5>Do we offer free shipping?</h5>
                                <Select
                                    name="shipping"
                                    {...formik.getFieldProps('shipping')}
                                    error={formik.errors.shipping && formik.touched.shipping ? true : false}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { formik.errors.shipping && formik.touched.shipping ? 
                                    <FormHelperText error={true}>
                                        { formik.error.shipping }
                                    </FormHelperText>
                                : null }
                            </FormControl>
                        </div>

                        <Divider className='mt-3 mb-3' />

                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Edit Product
                        </Button>
                    </form>
                </>
            }
        </DashboardLayout>
    )
}

export default EditProduct;