import React, { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate } from '../../store/actions/products.actions';
import { getAllBrands } from '../../store/actions/brands.actions';
import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';
import CardBlocks from '../../utils/products/card.block';
import PaginateNav from '../../utils/paginateNav';
import SearchBar from './searchBar';

const defaultValues = { keywords: '', brand: [], min: 0, max: 10000, frets: [], page: 1 }

const Shop = () => {

    const [grid, setGrid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValues
    );
    const { byPaginate } = useSelector(state => state.products);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    const handleGrid = () => setGrid(!grid);

    const goToPage = (page) => {
        setSearchValues({ page: page })
    }

    const handleResetSearch = () => {
        setSearchValues({ keywords: '', page: 1 })
    }

    const handleKeywords = (values) => {
        setSearchValues({ keywords: values, page: 1 })
    }

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch]);

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues]);

    return(
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    <SearchBar 
                        handleKeywords={(values)=>handleKeywords(values)}
                    />
                </div>
            </div>
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        brands
                        frets
                        range
                    </div>
                    <div className='right'>
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                                <div className={`grid_btn ${grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOnIcon />
                                </div>
                                <div className={`grid_btn ${!grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOffIcon />
                                </div>
                            </div>  
                            <div>
                                { byPaginate && byPaginate.docs ? 
                                    <>
                                        <CardBlocks 
                                            grid={grid}
                                            items={byPaginate.docs}
                                            shop={true}
                                        />
                                        <PaginateNav 
                                            prods={byPaginate}
                                            prev={(page)=>goToPage(page)}
                                            next={(page)=>goToPage(page)}
                                            resetSearch={()=>handleResetSearch()}
                                        />
                                    </>
                                : null }    
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;