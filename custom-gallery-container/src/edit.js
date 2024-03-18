import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

// export default function Edit( props ) {
export default function Edit({ attributes }) {
    const { textColor, backgroundColor, gradient } = attributes;

    const blockProps = useBlockProps({
        style: {
            textColor,
            backgroundColor,
            gradient
        }
    });

    const allowedBlocks = ['core/gallery'];

    const contentTemplate = [['core/gallery', {}]];

    return (
        <div {...blockProps}>
            <InnerBlocks template={contentTemplate} allowBlocks={allowedBlocks} templateLock="all" />
        </div>
    );
}
