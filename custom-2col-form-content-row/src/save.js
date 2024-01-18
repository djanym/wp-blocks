import {
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';
import {getSaveElement} from '@wordpress/blocks';

export default function save({attributes}) {
    const {imageSrc, imageCaption, blockBackgroundColor, imageColumnPosition, formID} = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div className="full-width" id="request-call-form" style={{backgroundColor: blockBackgroundColor}}>
                <div className={`row align-content-center ${imageColumnPosition === 'left' ? 'image-col-left' : 'image-col-right'}`}>
                    <div className="col-md-7 content-col">
                        <InnerBlocks.Content/>
                        <div className="form-wrapper">
                            {formID && `[contact-form-7 id="${formID}"]`}
                        </div>
                    </div>
                    <div className="col-md-5 image-col">
                        {imageSrc && (
                            <figure>
                                <img src={imageSrc} className="img-fluid" alt="Image"/>
                                {imageCaption && <figcaption>{imageCaption}</figcaption>}
                            </figure>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
