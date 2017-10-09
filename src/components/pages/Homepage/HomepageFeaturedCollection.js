/**
 * Imports.
 */
import React from 'react';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Text from '../../common/typography/Text';

/**
 * Component.
 */
class HomepageFeaturedCollection extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./HomepageFeaturedCollection.scss');
    }

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        if (this.props.feature && this.props.feature.img) {
            return (
                <div className="homepage-featured-collection">
                  <div className="image-box">
                    <div className="box-label">
                      <h2>See Collection </h2>
                    </div>
                  </div>
                    <Link to={this.props.feature.link.to} params={this.props.feature.link.params}>
                        <img className="homepage-featured-collection__image" src={this.props.feature.img.src} alt={this.props.feature.img.alt}/>
                    </Link>
                    <div className="homepage-featured-collection__bottom">
                      <div className="box">
                        <div className="collection-title">
                        {intlStore.getMessage(this.props.feature.name)}
                        </div>
                      </div>
                    </div>
                </div>
            );
        } else if (this.props.feature) {
            return (
                <div className="homepage-featured-collection homepage-featured-collection__placeholder">
                    <Link to={this.props.feature.link.to} params={this.props.feature.link.params}>
                        <div>
                            <Text size="large">
                                <FormattedMessage
                                    message={intlStore.getMessage(this.props.feature.name)}
                                    locales={intlStore.getCurrentLocale()} />
                            </Text>
                        </div>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="homepage-featured-collection homepage-featured-collection__placeholder"></div>
            );
        }
    }
}

/**
 * Export.
 */
export default HomepageFeaturedCollection;
