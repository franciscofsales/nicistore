import applicationActions from '../../constants/application';
import customerActions from '../../constants/customers';

export default function fetchCustomerAndCheckIfFound(context, payload, done) {
    context.dispatch(customerActions.CUSTOMERS_RETRIEVE);
    context.api.customers.get(payload).then(function successFn(result) {
        context.dispatch(customerActions.CUSTOMERS_RETRIEVE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(customerActions.CUSTOMERS_RETRIEVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, err.status);
        done && done();
    });
}
