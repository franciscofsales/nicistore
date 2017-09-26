/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsListStore from '../../../stores/Products/ProductsListStore';

import fetchProducts from '../../../actions/Products/fetchProductsSearch';

// Required components
import Breadcrumbs from '../../common/navigation/Breadcrumbs';
import ProductList from '../../common/products/ProductList';
import ProductsSortingSelect from '../../common/products/ProductsSortingSelect';

// Translation data for this component
import intlData from './ProductSearchPage.intl';

/**
 * Component
 */
class ProductSearchPage extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        let productsQuery = {};
        if (query.page) {
            productsQuery.page = query.page;
        }
        if (query.sort) {
            productsQuery.sort = query.sort;
        }
        if (query.term) {
            productsQuery.term = query.term;
        }
        context.executeAction(fetchProducts, productsQuery, done);
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: context.getStore(IntlStore).getMessage(intlData, 'pageTitle')
        }
    };

    //*** Initial State ***//

    state = {
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        products: this.context.getStore(ProductsListStore).getProducts(),
        totalPages: this.context.getStore(ProductsListStore).getTotalPages(),
        currentPage: this.context.getStore(ProductsListStore).getCurrentPage()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductSearchPage.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps._categories,
            collections: nextProps._collections,
            products: nextProps._products,
            totalPages: nextProps._totalPages,
            currentPage: nextProps._currentPage
        });
    }

    //*** View Controllers ***//

    handleSortChange = (value) => {
        this.context.router.transitionTo('product-search', {
            locale: this.context.getStore(IntlStore).getCurrentLocale()
        }, {sort: value});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params


        //
        // Return
        //
        return (
            <div className="product-listing-search-page">
                <div>
                    <div className="product-listing-search-page__header">
                        <div className="product-listing-search-page__breadcrumbs">

                        </div>
                        <div className="product-listing-search-page__sorting">
                            <ProductsSortingSelect onChange={this.handleSortChange} />
                        </div>
                    </div>

                    <div className="product-listing-search-page__products">
                        <ProductList title={<FormattedMessage
                                                    message={this.props.query.term}
                                                    locales={intlStore.getCurrentLocale()} />}
                                     filters={null}
                                     products={this.state.products}
                                     paginateTo="products"
                                     routeParams={routeParams}
                                     totalPages={this.state.totalPages}
                                     currentPage={this.state.currentPage} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
ProductSearchPage = connectToStores(ProductSearchPage, [CollectionsStore, ProductsListStore], (context) => {
    return {
        _products: context.getStore(ProductsListStore).getProducts(),
        _totalPages: context.getStore(ProductsListStore).getTotalPages(),
        _currentPage: context.getStore(ProductsListStore).getCurrentPage(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection'])
    };
});

/**
 * Exports
 */
export default ProductSearchPage;
