import { combineReducers } from 'redux';
import users from './users.reducer';
import products from './products.reducer';
import notifications from './notifications.reducer';

const appReducers = combineReducers({
    users,
    products,
    notifications
});

export default appReducers;