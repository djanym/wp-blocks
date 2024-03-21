import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

// export default function Edit( props ) {
export default function Edit({ attributes }) {
    const { textColor, backgroundColor, gradient, mediaType, mediaUrl } = attributes;

    const blockProps = useBlockProps(
        {
            style: {
                textColor,
                backgroundColor,
                gradient
            }
        },
        {}
    );

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            template: [
                [
                    'core/media-text',
                    {
                        TEMPLATE: [
                            ['core/heading', { level: 2, textAlign: 'center', placeholder: 'Add Heading' }],
                            ['core/paragraph', { align: 'center', placeholder: 'Add content...' }]
                        ],
                        mediaType: mediaType ?? null,
                        mediaUrl: mediaUrl ?? null
                    }
                ]
            ]
        }
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
}
