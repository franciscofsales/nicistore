/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import customerActions from '../../constants/customers';

/**
 * Store
 */
class CustomerDetailsStore extends BaseStore {

    static storeName = 'CustomerDetailsStore';

    static handlers = {
        [customerActions.CUSTOMERS_RETRIEVE]: 'handleRequest',
        [customerActions.CUSTOMERS_RETRIEVE_SUCCESS]: 'handleSuccess',
        [customerActions.CUSTOMERS_RETRIEVE_ERROR]: 'handleError',
        [customerActions.CUSTOMERS_SAVE]: 'handleRequest',
        [customerActions.CUSTOMERS_SAVE_SUCCESS]: 'handleSuccess',
        [customerActions.CUSTOMERS_SAVE_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.customer = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            customer: this.customer
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.loading = state.loading;
        this.error = state.error;
        this.customer = state.customer;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getError() {
        return this.error;
    }

    getCustomer() {
        return this.customer;
    }

    //
    // Handlers
    //

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.customer = payload;
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CustomerDetailsStore;
