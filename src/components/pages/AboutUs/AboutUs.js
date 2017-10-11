/**
 * Imports
 */
import React from 'react';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Heading from '../../common/typography/Heading';
import Carousel from '../../common/images/Carousel';

// Translation data for this component
import intlData from './AboutUs.intl';

/**
 * Component
 */
class AboutUs extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'About us'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AboutUs.scss');
    }

    //*** Template ***//

    render() {

      let intlStore = this.context.getStore(IntlStore);

        return (
          <div>
            <div className="wrapper">
              <div className="aboutus-block">
                <div className="aboutus_content">
                  <div className="aboutus__image">
                    <h1>DICCI</h1>
                    <h2>Men's Fashion</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="aboutus-block">
                <div className="aboutus_content">
                  <div className="aboutus-img-square">
                  </div>
                </div>
              </div>
              <div className="aboutus-block">
                <div className="aboutus_content">
                  <div className="aboutus-blank-square">
                    <h1>{intlStore.getMessage(intlData, 'about')} DICCI</h1>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      {intlStore.getMessage(intlData, 'aboutus')}
                    </p>
                  </div>
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
export default AboutUs;
