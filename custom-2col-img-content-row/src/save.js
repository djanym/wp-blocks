import {
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';
import { getSaveElement } from '@wordpress/blocks';

export default function save({attributes}) {
    const {imageSrc, imageCaption, blockBackgroundColor, imageColumnPosition} = attributes;

    // Get the saved HTML element for the image block
    // const imageElement = imageSrc && getSaveElement('core/image', { url: imageSrc, caption: imageCaption, className: 'img-fluid' });

    // {imageSrc && <img src={imageSrc} className="img-fluid" alt="Image"/>}

    return (
        <div {...useBlockProps.save()}>
            <div className="full-width" style={{backgroundColor: blockBackgroundColor}}>
                <div className={`row align-content-center ${imageColumnPosition === 'left' ? 'image-col-left' : 'image-col-right'}`}>
                    <div className="col-md-5 image-col">
                        {imageSrc && (
                            <figure>
                                <img src={imageSrc} className="img-fluid" alt="Image" />
                                {imageCaption && <figcaption>{imageCaption}</figcaption>}
                            </figure>
                        )}
                    </div>
                    <div className="col-md-7 content-col">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        </div>
    );
}
