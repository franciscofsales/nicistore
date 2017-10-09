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

                  <Link className="homepage-collection-title" to={this.props.feature.link.to} params={this.props.feature.link.params}>
                    {intlStore.getMessage(this.props.feature.name)}
                  </Link>
                  <Link className="homepage-box-label" to={this.props.feature.link.to} params={this.props.feature.link.params}>
                    See Collection
                  </Link>

                  <Link className="homepage-feature-collection__image-conatiner" to={this.props.feature.link.to} params={this.props.feature.link.params}>
                      <img className="homepage-featured-collection__image" src={this.props.feature.img.src} alt={this.props.feature.img.alt}/>
                  </Link>
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
