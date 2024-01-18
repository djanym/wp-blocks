import {
    useState,
    useEffect
} from '@wordpress/element';
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
    RadioControl,
    SelectControl,
    TextControl
} from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';
import {getSaveElement} from '@wordpress/blocks';

// export default function Edit( props ) {
export default function Edit({attributes, setAttributes}) {
    const {imageSrc, imageCaption, blockBackgroundColor, imageColumnPosition, formID, analyticsID, formMessageColor} = attributes;

    const blockProps = useBlockProps({
        style: {
            backgroundColor: blockBackgroundColor,
        },
    });

    const contentColumnTemplate = [
        ['core/heading', {placeholder: 'Add heading', level: 3}],
    ];

    // Get the saved HTML element for the image block
    const imageElement = imageSrc && getSaveElement('core/image', {url: imageSrc, caption: imageCaption});

    // Initialize CF7 selector constants.
    const [forms, setForms] = useState([]);

    // Pull available CF7 forms.
    useEffect(() => {
        wp.apiFetch({path: '/contact-form-7/v1/contact-forms'}).then(data => {
            setForms(data);
        });
    }, []);

    // Prepare CF7 selector options.
    const formSelectorOptions = forms.map(form => ({
        label: form.title,
        value: form.id,
    }));

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={'Block Options'}>
                    <RadioControl
                        label="Alignment"
                        selected={imageColumnPosition}
                        options={[
                            {label: 'Left', value: 'left'},
                            {label: 'Right', value: 'right'},
                        ]}
                        onChange={(value) => setAttributes({imageColumnPosition: value})}
                    />
                    <h3>Background Color</h3>
                    <ColorPicker
                        color={blockBackgroundColor}
                        onChangeComplete={(value) => setAttributes({blockBackgroundColor: value.hex})}/>
                </PanelBody>
                <PanelBody title={'Form Options'}>
                    <h3>Form Text Message Color</h3>
                    <ColorPicker
                        color={formMessageColor}
                        onChangeComplete={(value) => setAttributes({formMessageColor: value.hex})}/>
                </PanelBody>
            </InspectorControls>
            <div className={`row ${imageColumnPosition === 'left' ? 'image-col-left' : 'image-col-right'}`}>
                <div className="col image-col">
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({imageSrc: media.url, imageCaption: media.caption})}
                            allowedTypes={['image']}
                            value={imageSrc}
                            render={({open}) => (
                                <Button
                                    onClick={open}
                                    className={imageSrc ? 'image-button' : 'btn is-primary'}
                                >
                                    {!imageSrc ? 'Select Image ' : (
                                        <div>
                                            {imageElement}
                                        </div>
                                    )}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div className="col content-col">
                    <div className="">
                        <InnerBlocks
                            template={contentColumnTemplate}/>
                    </div>
                    <div className="">
                        <SelectControl
                            label="Select a form"
                            value={formID}
                            options={[{label: 'Select a form', value: ''}, ...formSelectorOptions]}
                            onChange={(selectedFormId) => setAttributes({formID: selectedFormId})}
                        />
                    </div>
                    <div className="">
                        <TextControl
                            label="Form Analytics ID"
                            value={analyticsID}
                            onChange={(value) => setAttributes({analyticsID: value})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}