/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Breakpoint from '../../core/Breakpoint';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './OrderSummary.intl';

/**
 * Component
 */
class OrderSummary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderSummary.scss');
    }

    _getProductName = product => {
        let intlStore = this.context.getStore(IntlStore);
        let variant = null;
        if(product.variantId){
            variant = product.details.variants.find(varint => varint.id === product.variantId);
        }
        return variant ? 
            `${intlStore.getMessage(product.details.name)} - ${intlStore.getMessage(variant.name)}` :
            intlStore.getMessage(product.details.name)
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        //
        // Return
        //
        return (
            <div className="order-summary">
                <div className="order-summary__list">
                    <div className="order-summary__row order-summary__item-labels">
                        <div className="order-summary__list-name">
                            <Text size="small">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'name')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="order-summary__list-quantity-price">
                            <Text size="small">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'quantityAndPrice')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="order-summary__list-total">
                            <Text size="small">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'total')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                    </div>
                    {this.props.checkout.cart.products.map( (product, idx) => {
                        let variant = null;
                        if(product.variantId){
                            variant = product.details.variants.find(varint => varint.id === product.variantId);
                        }
                        return (
                            <div key={idx} className="order-summary__row order-summary__item">
                                <div className="order-summary__list-name">
                                    <Breakpoint point="handhelds">
                                        <Text size="small">
                                            {this._getProductName(product)}
                                        </Text>
                                    </Breakpoint>
                                    <Breakpoint point="medium-screens">
                                        <Text>
                                            {this._getProductName(product)}
                                        </Text>
                                    </Breakpoint>
                                    <Breakpoint point="wide-screens">
                                        <Text>
                                            {this._getProductName(product)}
                                        </Text>
                                    </Breakpoint>
                                </div>
                                <div className="order-summary__list-quantity-price">
                                    <Text>
                                        {product.quantity}
                                    </Text>
                                    &nbsp;x&nbsp;
                                    <Text>
                                        <FormattedNumber
                                            value={variant ? variant.pricing.retail : product.details.pricing.retail}
                                            style="currency"
                                            currency={variant ? variant.pricing.currency : product.details.pricing.currency} />
                                    </Text>
                                </div>
                                <div className="order-summary__list-total">
                                    <Text>
                                        <FormattedNumber
                                            value={variant ? product.quantity * variant.pricing.retail : product.quantity * product.details.pricing.retail}
                                            style="currency"
                                            currency={variant ? variant.pricing.currency : product.details.pricing.currency} />
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="order-summary__totals">
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'subTotal')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            <Text>
                                <FormattedNumber
                                    value={this.props.checkout.subTotal}
                                    style="currency"
                                    currency={this.props.checkout.currency} />
                            </Text>
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'shipping')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            {this.props.checkout.hasOwnProperty('shippingCost') ?
                                <Text>
                                    <FormattedNumber
                                        value={this.props.checkout.shippingCost}
                                        style="currency"
                                        currency={this.props.checkout.currency} />
                                </Text>
                                :
                                <Text>-</Text>
                            }
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text weight="bold">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'total')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            <Text weight="bold">
                                <FormattedNumber
                                    value={this.props.checkout.total}
                                    style="currency"
                                    currency={this.props.checkout.currency} />
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default OrderSummary;
