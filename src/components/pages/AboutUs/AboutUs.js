/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';
import Carousel from '../../common/images/Carousel';

/**
 * Component
 */
class AboutUs extends React.Component {

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
                    <h1>About DICCI</h1>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Influential, innovative and progressive, DICCI is reinventing a wholly modern approach to fashion. Under the vision of creative director Moises Teixeira,
                    the House has redefined luxury for the 21st century, further reinforcing its position as one of the world’s most desirable fashion houses. Eclectic, contemporary, romantic—DICCI products represent the pinnacle of Portuguese craftsmanship and are unsurpassed for their quality and attention to detail.
                    DICCI is part of the Kering Group, a world leader in apparel and accessories that owns a portfolio of powerful luxury and sport and lifestyle brands.
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
