import { combineReducers } from 'redux';
import users from './users.reducer';
import products from './products.reducer';
import notifications from './notifications.reducer';
import brands from './brands.reducer';

const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands
});

export default appReducers;