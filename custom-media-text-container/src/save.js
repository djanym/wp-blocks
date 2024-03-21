import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({});

    const innerBlocksProps = useInnerBlocksProps.save({
        className: 'wp-block-inner-container'
    });

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
}
