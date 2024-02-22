import CartSlice from './CartSlice';
import SearchSlice from './SearchSlice';
import { combineReducers } from "redux";
const rootReducers = combineReducers({
   CartSlice,
   SearchSlice,
})
export default rootReducers