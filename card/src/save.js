import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { hasWidthOption, widthOption } = attributes;

    // Define the class based on the condition.
    const blockClass = hasWidthOption ? `width-${widthOption}` : '';

    const blockProps = useBlockProps.save({
        className: blockClass
    });

    const innerBlocksProps = useInnerBlocksProps.save({
        className: 'wp-card-block-inner-container' // Default class.
    });

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
}
