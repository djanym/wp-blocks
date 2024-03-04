import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, PanelBody, ColorPicker, RadioControl } from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';
import { getSaveElement } from '@wordpress/blocks';

// export default function Edit( props ) {
export default function Edit({ attributes, setAttributes }) {
    // const { imageSrc, imageCaption, blockBackgroundColor } = attributes;

    const blockProps = useBlockProps({
        // style: {
        //     backgroundColor: blockBackgroundColor
        // }
    });

    const contentColumnTemplate = [
        ['core/heading', { level: 2, textAlign: 'center', placeholder: 'Add Heading' }],
        ['core/paragraph', { align: 'center', placeholder: 'Add content...' }]
    ];

    // Get the saved HTML element for the image block
    // const imageElement = imageSrc && getSaveElement('core/image', { url: imageSrc, caption: imageCaption });

    return (
        <div {...blockProps}>
            <InnerBlocks template={contentColumnTemplate} />
        </div>
    );
}
