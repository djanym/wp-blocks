import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Card, CardBody } from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { textColor, backgroundColor, gradient } = attributes;

    const blockProps = useBlockProps({
        style: {
            textColor,
            backgroundColor,
            gradient
        }
    });

    const contentTemplate = [
        ['core/heading', { level: 4, placeholder: 'Add card heading' }],
        ['core/paragraph', { placeholder: 'Add card content...' }]
    ];

    return (
        <div {...blockProps}>
            <InnerBlocks template={contentTemplate} />
        </div>
    );
}
