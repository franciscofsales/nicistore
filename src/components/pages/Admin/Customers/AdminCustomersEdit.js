/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../../stores/Application/IntlStore';
import CustomersDetailsStore from '../../../../stores/Customers/CustomersDetailsStore';
import {customerStatus} from '../../../../constants/customers';
import fetchCustomerAndCheckIfFound from '../../../../actions/Customers/fetchCustomerAndCheckIfFound';
import updateCustomer from '../../../../actions/Admin/updateCustomer';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import Heading from '../../../common/typography/Heading';
import InlineItems from '../../../common/forms/InlineItems';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Spinner from '../../../common/indicators/Spinner';
import Textarea from '../../../common/forms/Textarea';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './AdminCustomersEdit.intl';

/**
 * Component
 */
class AdminCustomersEdit extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        custome: this.context.getStore(CustomersDetailsStore).getCustomer(),
        error: this.context.getStore(CustomersDetailsStore).getError(),
        loading: this.context.getStore(CustomersDetailsStore).isLoading(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCustomersEdit.scss');

        // Load required data
        this.context.executeAction(fetchCustomerAndCheckIfFound, this.props.params.customerId);
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
              fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        this.setState({
            customer: nextProps._customer,
            error: nextProps._error,
            loading: nextProps._loading,
            categories: nextProps._categories,
            collections: nextProps._collections,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleEnabledChange = () => {
        let customer = this.state.customer;
        customer.enabled = !(customer.enabled === true);
        this.setState({customer: customer});
    };

    handleFieldChange = (field, value) => {
        let customer = this.state.customer;
        customer[field] = value;
        this.setState({customer});
    };

    handleIntlFieldChange = (field, locale, value) => {
        let customer = this.state.customer;
        if (!customer[field]) {
            customer[field] = {};
        }
        customer[field][locale] = value;
        this.setState({customer});
    };

    handleSectionChange = (tag) => {
        let customer = this.state.customer;
        if (!customer.tags) {
            customer.tags = [tag];
        } else if (customer.tags.indexOf(tag) === -1) {
            customer.tags.push(tag);
        } else {
            customer.tags.splice(customer.tags.indexOf(tag), 1);
        }
        this.setState({customer});
    };

    handleSaveClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.customer.status) {
            fieldErrors.status = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let customer = this.state.customer;
            this.context.executeAction(updateCustomer, {
                id: customer.id,
                data: {
                    status: customer.status,
                    notes: customer.notes
                }
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        //


        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        const statusOptions = customerStatus.map(status => {
          return {
            name: intlStore.getMessage(intlData, status.name),
            value: status.value
          }
        })
        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-customers-edit">
                <div className="admin-customers-edit__header">
                    <div className="admin-customers-edit__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    {this.state.customer ?
                        <div className="admin-customers-edit__toolbar">
                            <div className="admin-customers-edit__toolbar-item">
                                <Link to="adm-customers" params={routeParams}>
                                    <Button type="default" disabled={this.state.loading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'back')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-customers-edit__toolbar-item">
                                <Button type="primary" onClick={this.handleSaveClick} disabled={this.state.loading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'save')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>

                {this.state.loading ?
                    <div className="admin-customers-edit__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && !this.state.customer  ?
                    <NotFound />
                    :
                    null
                }
                {!this.state.loading && this.state.customer ?
                    <div className="admin-customers-edit__form">
                        <div className="admin-customers-edit__left-column">
                            <div className="admin-customers-edit__form-item">
                              <Select label={intlStore.getMessage(intlData, 'status')}
                                      placeholder
                                      options={statusOptions}
                                      value={this.state.customer.status}
                                      error={fieldError('status')}
                                      onChange={this.handleFieldChange.bind(null, 'status')} />
                            </div>
                            <div className="admin-customers-edit__form-item">
                                <InlineItems>
                                    <InputField label={intlStore.getMessage(intlData, 'name')}
                                                onChange={()=>{}}
                                                value={this.state.customer.name}
                                                error={fieldError('name')}
                                                disabled/>
                                </InlineItems>
                            </div>
                            <div className="admin-customers-edit__form-item">
                                <Textarea label={intlStore.getMessage(intlData, 'notes')}
                                          rows="5"
                                          onChange={this.handleFieldChange.bind(null, 'notes')}
                                          value={this.state.customer.notes ? this.state.customer.notes : null}
                                          error={fieldError('notes')} />
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminCustomersEdit = connectToStores(AdminCustomersEdit, [CollectionsStore, CustomersDetailsStore], (context) => {
    return {
        _customer: context.getStore(CustomersDetailsStore).getCustomer(),
        _error: context.getStore(CustomersDetailsStore).getError(),
        _loading: context.getStore(CustomersDetailsStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminCustomersEdit;
