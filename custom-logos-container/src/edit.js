import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';
import {
    Button
} from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

export default function Edit( {attributes, setAttributes} ) {
    const onSelectImage = ( imageNumber ) => ( media ) => {
        setAttributes( {[ 'image' + imageNumber ]: media.url} );
    };
    const renderImage = ( imageNumber ) => ( {open} ) => {
        let value = attributes[ 'image' + imageNumber ];
        let alt = 'Image ' + imageNumber;
        return (
            <Button
                onClick={ open }
                className={ value ? 'image-button' : 'btn is-primary' }
            >
                { !value ? ('Select Image ' + imageNumber) : <img src={ value } alt={ alt }/> }
            </Button>
        );
    };
    return (
        <div { ...useBlockProps() }>
            <div className="row">
                <div className="col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ onSelectImage( '1' ) }
                            allowedTypes={ [ 'image' ] }
                            render={ renderImage( '1' ) }
                        />
                    </MediaUploadCheck>
                </div>
                <div className="col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ onSelectImage( '2' ) }
                            allowedTypes={ [ 'image' ] }
                            render={ renderImage( '2' ) }
                        />
                    </MediaUploadCheck>
                </div>
                <div className="col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ onSelectImage( '3' ) }
                            allowedTypes={ [ 'image' ] }
                            render={ renderImage( '3' ) }
                        />
                    </MediaUploadCheck>
                </div>
            </div>
        </div>
    );
}
