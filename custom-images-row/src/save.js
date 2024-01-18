import {
    useBlockProps
} from '@wordpress/block-editor';

export default function save( {attributes} ) {
    const {image1, image2, image3} = attributes;

    return (
        <div { ...useBlockProps.save() }>
            <div className="full-width">
                <div className="row">
                    <div className="col">
                        { image1 && <img src={ image1 } alt="Image 1"/> }
                    </div>
                    <div className="col">
                        { image2 && <img src={ image2 } alt="Image 2"/> }
                    </div>
                    <div className="col">
                        { image3 && <img src={ image3 } alt="Image 3"/> }
                    </div>
                </div>
            </div>
        </div>
    );
}
