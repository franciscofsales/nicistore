/**
 * Imports
 */
import React from 'react';
import Overlay from '../modals/Overlay';

/**
 * Component
 */
class ImageGallery extends React.Component {

    //*** Initial State ***//

    state = {
        selectedImage: 0, // Default to first image of the array
        showingOverlay: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ImageGallery.scss');
    }

    //*** View Controllers ***//

    handleImageClick = (idx) => {
        this.setState({selectedImage: idx});
    };

    _toggleOverlay = () => {
        this.setState({showingOverlay: !this.state.showingOverlay});
    }

    //*** Template ***//

    render() {
        return (
            <div>
                {this.state.showingOverlay && (
                        <Overlay onClick={this._toggleOverlay}>
                            <img
                                className="image-gallery__fullscreen" 
                                src={`//${this.props.images[this.state.selectedImage].url}`}
                                alt={this.props.images[this.state.selectedImage].alt} />
                        </Overlay>
                    )}
                <div className="image-gallery">

                    <div className="image-gallery__current">
                        {this.props.images.length > 0 ?
                            <img onClick={this._toggleOverlay} src={`//${this.props.images[this.state.selectedImage].url}`}
                                 alt={this.props.images[this.state.selectedImage].alt} />
                            :
                            <div>No Image</div>
                        }
                    </div>
                    {this.props.images.length > 1 ?
                        <div className="image-gallery__thumbnails">
                            {this.props.images.map((img, idx) => {
                                let imageClass = 'image-gallery__image';
                                if (idx === this.state.selectedImage) {
                                    imageClass += ' image-gallery__image--selected';
                                }
                                return (
                                    <div key={idx} className={imageClass} onClick={this.handleImageClick.bind(null, idx)}>
                                        <img src={`//${img.url}`} alt={img.alt} />
                                    </div>
                                );
                            })}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ImageGallery;
