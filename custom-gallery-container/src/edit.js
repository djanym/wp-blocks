import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

// export default function Edit( props ) {
export default function Edit({ attributes, setAttributes }) {
    const allowedBlocks = ['core/gallery'];

    const contentTemplate = [['core/gallery', { }]];

    const blockProps = useBlockProps({
        // style: {
        //     backgroundColor: blockBackgroundColor
        // }
    });

    return (
        <div {...blockProps}>
            <InnerBlocks template={contentTemplate} allowBlocks={allowedBlocks} templateLock="all" />
        </div>
    );
}
