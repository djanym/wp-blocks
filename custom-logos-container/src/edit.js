import { useBlockProps, MediaUpload, MediaUploadCheck, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    // const onSelectImage = imageNumber => media => {
    //     setAttributes({ ['image' + imageNumber]: media.url });
    // };
    // const renderImage =
    //     imageNumber =>
    //     ({ open }) => {
    //         let value = attributes['image' + imageNumber];
    //         let alt = 'Image ' + imageNumber;
    //         return (
    //             <Button onClick={open} className={value ? 'image-button' : 'btn is-primary'}>
    //                 {!value ? 'Select Image ' + imageNumber : <img src={value} alt={alt} />}
    //             </Button>
    //         );
    //     };

    const { images } = attributes;

    const onSelectImage = newImage => {
        const updatedImages = [...images, { id: newImage.id, url: newImage.url }];
        setAttributes({ images: updatedImages });
    };

    const onRemoveImage = index => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setAttributes({ images: updatedImages });
    };

    const onReorderImages = reorderedImages => {
        setAttributes({ images: reorderedImages });
    };

    // return (
    //     <div { ...useBlockProps() }>
    //         <div className="row">
    //             <div className="col">
    //                 <MediaUploadCheck>
    //                     <MediaUpload
    //                         onSelect={ onSelectImage( '1' ) }
    //                         allowedTypes={ [ 'image' ] }
    //                         render={ renderImage( '1' ) }
    //                     />
    //                 </MediaUploadCheck>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <div>
                <Button
                    isPrimary
                    onClick={() => {
                        setAttributes({
                            images: [...images, { id: null, url: '' }]
                        });
                    }}
                >
                    Add Image
                </Button>
            </div>
            <div className="image-gallery">
                <InnerBlocks
                    allowedBlocks={['core/image']}
                    template={images.map((image, index) => ['core/image', { ...image, className: 'image-item', index }])}
                    templateLock="all"
                    renderAppender={() => (
                        <MediaUpload
                            onSelect={onSelectImage}
                            type="image"
                            render={({ open }) => (
                                <Button isPrimary onClick={open}>
                                    Add Image
                                </Button>
                            )}
                        />
                    )}
                    onMove={onReorderImages}
                />
            </div>
        </div>
    );
}
