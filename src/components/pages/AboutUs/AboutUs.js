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
            <div className="aboutus-page">
                <div className="aboutus_content">
                    <div className="aboutus__block">
                        <Carousel images = {
                          [{
                            src:'../../static/diccislide1.jpg',
                          },
                          {
                            src:'../../static/diccislide2.jpg',
                          },
                          {
                            src:'../../static/diccislide3.jpg',
                          }]
                        }/>
                    </div>
                    <div className="aboutus__block">
                        <Heading size="medium" align="center">
                            About DICCI
                        </Heading>
                        <p>
                          Influential, innovative and progressive, DICCI is reinventing a wholly modern approach to fashion. Under the new vision of creative director Alessandro Michele, the House has redefined luxury for the 21st century, further reinforcing its position as one of the world’s most desirable fashion houses. Eclectic, contemporary, romantic—DICCI products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail.
                          DICCI is part of the Kering Group, a world leader in apparel and accessories that owns a portfolio of powerful luxury and sport and lifestyle brands.
                        </p>
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
