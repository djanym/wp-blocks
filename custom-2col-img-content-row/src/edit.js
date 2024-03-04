import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    InnerBlocks
} from '@wordpress/block-editor';
import {
    Button,
    PanelBody,
    ColorPicker,
    RadioControl
} from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';
import { getSaveElement } from '@wordpress/blocks';

// export default function Edit( props ) {
export default function Edit({ attributes, setAttributes }) {
    const {
        imageSrc,
        imageCaption,
        blockBackgroundColor,
        imageColumnPosition
    } = attributes;

    const blockProps = useBlockProps({
        style: {
            backgroundColor: blockBackgroundColor
        }
    });

    const contentColumnTemplate = [
        [
            'core/heading',
            { level: 2, textAlign: 'center', placeholder: 'Add Heading' }
        ],
        [
            'core/paragraph',
            { align: 'center', placeholder: 'Fill with content...' }
        ],
        [
            'core/buttons',
            { align: 'center' },
            [
                [
                    'core/button',
                    {
                        placeholder: 'Add button label',
                        href: '#',
                        align: 'center'
                    }
                ]
            ]
        ]
    ];

    // Get the saved HTML element for the image block
    const imageElement =
        imageSrc &&
        getSaveElement('core/image', { url: imageSrc, caption: imageCaption });

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={'Background Color'}>
                    <ColorPicker
                        color={blockBackgroundColor}
                        onChangeComplete={value =>
                            setAttributes({ blockBackgroundColor: value.hex })
                        }
                    />
                    <RadioControl
                        label="Alignment"
                        selected={imageColumnPosition}
                        options={[
                            { label: 'Left', value: 'left' },
                            { label: 'Right', value: 'right' }
                        ]}
                        onChange={value =>
                            setAttributes({ imageColumnPosition: value })
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <div
                className={`row ${
                    imageColumnPosition === 'left'
                        ? 'image-col-left'
                        : 'image-col-right'
                }`}
            >
                <div className="col image-col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={media =>
                                setAttributes({
                                    imageSrc: media.url,
                                    imageCaption: media.caption
                                })
                            }
                            allowedTypes={['image']}
                            value={imageSrc}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    className={
                                        imageSrc
                                            ? 'image-button'
                                            : 'btn is-primary'
                                    }
                                >
                                    {!imageSrc ? (
                                        'Select Image '
                                    ) : (
                                        <div>{imageElement}</div>
                                    )}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div className="col content-col">
                    <InnerBlocks template={contentColumnTemplate} />
                </div>
            </div>
        </div>
    );
}
