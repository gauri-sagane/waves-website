import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from '../../utils/tools';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { List, ListItem, ListItemText, Collapse, TextField, Button } from '@mui/material';


const RangeSelect = (props) => {

    const [open, setOpen] = useState(props.initState);
    const handleCollapseOpen = () => setOpen(!open);

    const formik = useFormik({
        initialValues: {min: 0, max: 5000},
        validationSchema: Yup.object({
            min: Yup.number()
            .min(0, 'The minimum is 0'),
            max: Yup.number()
            .max(10000, 'The maximum is 5000')
        }),
        onSubmit: (values) => {
            props.handleRange([values.min, values.max]);
        }
    })

    return(
        <div className='collapse_items_wrapper'>
            <List>
                <ListItem onClick={handleCollapseOpen}>
                    <ListItemText 
                        primary={props.title}
                        className='collapse_title'
                    />
                    { open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <form className='mt-3' onSubmit={formik.handleSubmit}>
                            <div>
                            <TextField 
                                style={{width: '100%', padding: '0 0 10px 0'}}
                                placeholder='$ Min'
                                name='min'
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('min')}
                                {...errorHelper(formik, 'min')}
                            />
                            </div>
                            <div>
                            <TextField 
                                style={{width: '100%'}}
                                placeholder='$ Max'
                                name='max'
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('max')}
                                {...errorHelper(formik, 'max')}
                            />
                            </div>
                            <Button
                                type='submit'
                                className='mt-3'
                                variant='outlined'
                                color='secondary'
                                size='small'
                            >
                                Search
                            </Button>
                        </form>
                    </List>
                </Collapse>             
            </List>
        </div>
    )
}


export default RangeSelect;