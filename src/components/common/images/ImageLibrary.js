/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Modal from '../modals/Modal';

// Translation data for this component
import intlData from './ImageLibrary.intl';

// Instantiate logger
let debug = require('debug')('nicistore');

/**
 * Component
 */
class ImageLibrary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        showModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ImageLibrary.scss');
    }

    //*** View Controllers ***//

    handleViewURLClick = (idx) => {
        this.setState({showModal: true});
    };

    handleRemoveClick = (idx) => {
        let images = this.props.images;
        images.splice(idx, 1);
        this.props.onChange(images);
    };

    _handleModalClose = () => {
        this.setState({showModal: false});
    }

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="image-library">
                {this.props.images.map((img, idx) => {
                    return (
                        <div key={idx} className="image-library__placeholder">
                            <img className="image-library__image" src={`//${img.url}`} />
                            <div className="image-library__placeholder-overlay">
                                <div className="image-library__placeholder-overlay-content">
                                    {this.state.showModal && (
                                        <Modal title={intlStore.getMessage(intlData, 'viewURL')}
                                            onCloseClick={this._handleModalClose}>
                                            <div className="image-library__modal-container">
                                                <p className="image-library__modal-url">{img.url}</p>
                                            </div>
                                        </Modal>
                                    )}
                                    <div className="image-library__button">
                                        <Button type="default" onClick={this.handleViewURLClick.bind(null, idx)}>
                                            <FormattedMessage message={intlStore.getMessage(intlData, 'viewURL')}
                                                              locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                    </div>
                                    <div className="image-library__button">
                                        <Button type="primary" onClick={this.handleRemoveClick.bind(null, idx)}>
                                            <FormattedMessage message={intlStore.getMessage(intlData, 'delete')}
                                                              locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

/**
 * Default Props
 */
ImageLibrary.defaultProps = {
    onChange: function (images) { debug('onChange not defined.', images); }
};

/**
 * Exports
 */
export default ImageLibrary;
