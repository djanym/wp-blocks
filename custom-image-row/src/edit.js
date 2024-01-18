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

export default function Edit({attributes, setAttributes}) {
    const {imageSrc} = attributes;
    const onSelectImage = (media) => {
        setAttributes({imageSrc: media.url});
    };
    const renderImage = ({open}) => {
        return (
            <Button
                onClick={open}
                className={imageSrc ? 'image-button' : 'btn is-primary'}
            >
                {!imageSrc ? 'Select Image' : <img src={imageSrc} alt="Image"/>}
            </Button>
        );
    };
    return (
        <div {...useBlockProps()}>
            <div className="row">
                <div className="col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            render={renderImage}
                        />
                    </MediaUploadCheck>
                </div>
            </div>
        </div>
    );
}
