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
            <div className="alignfull content-grid" style={{backgroundColor: blockBackgroundColor}}>
                <div className="breakout cols">
                    <div className={`col image-col ${imageColumnPosition === 'left' ? 'left-col' : 'right-col'}`}>
                        {imageSrc && (
                            <figure>
                                <img src={imageSrc} className="img-fluid" alt="Image"/>
                                {imageCaption && <figcaption>{imageCaption}</figcaption>}
                            </figure>
                        )}
                    </div>
                    <div className="col content-col">
                        <InnerBlocks.Content/>
                    </div>
                </div>
            </div>
        </div>
    );
}
