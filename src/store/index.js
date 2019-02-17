import { createStore } from 'redux';
import tinyApp from './reducers';
const store = createStore(tinyApp);

export default store;
