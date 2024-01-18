import {
    useBlockProps
} from '@wordpress/block-editor';

export default function save( {attributes} ) {
    const {imageSrc} = attributes;

    return (
        <div { ...useBlockProps.save() }>
            <div className="full-width">
                <div className="row">
                    <div className="col">
                        { imageSrc && <img src={ imageSrc } alt="Image"/> }
                    </div>
                </div>
            </div>
        </div>
    );
}
