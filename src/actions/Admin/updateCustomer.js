import applicationActions from '../../constants/application';
import customerActions from '../../constants/customers';

export default function updateCustomer(context, payload, done) {
    context.dispatch(customerActions.CUSTOMERS_SAVE);
    context.api.customers.patch(payload.id, payload.data).then(function successFn(result) {
        context.dispatch(customerActions.CUSTOMERS_SAVE_SUCCESS, result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(customerActions.CUSTOMERS_SAVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
        done && done();
    });
}
