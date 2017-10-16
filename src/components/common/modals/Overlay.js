/**
 * Imports
 */
import React from 'react';


/**
 * Component
 */
class Overlay extends React.Component {
    
    //*** Component Lifecycle ***//
    
    componentDidMount() {
        
        // Component styles
        require('./Overlay.scss');
    }
    
    //*** Template ***//

    render() {
        return (
            <div className="overlay" onClick={() => {if(this.props.onClick){ this.props.onClick(); }}}>
                <div className="overlay__container">
                    <div className="overlay__content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Overlay;