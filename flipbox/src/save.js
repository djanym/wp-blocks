import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { hasHorizontalScrollerOption, horizontalScrollerOption } = attributes;
    const { hasGridLayoutOption, gridLayoutOption, gridCols } = attributes;
    const { hasFlexLayoutOption, flexLayoutOption } = attributes;

    // Define the class based on the condition.
    const innerBlockClass = [
        'wp-block-group__inner-container', // Default class.
        hasHorizontalScrollerOption && horizontalScrollerOption && 'is-horizontal-scroller',
        hasGridLayoutOption && gridLayoutOption && 'is-layout-grid',
        hasGridLayoutOption && gridLayoutOption && gridCols && `grid-cols-${gridCols}`,
        hasFlexLayoutOption && flexLayoutOption && 'is-layout-flex'
    ]
        .filter(Boolean)
        .join(' ');

    const blockProps = useBlockProps.save({
        // className: blockClass
    });

    const innerBlocksProps = useInnerBlocksProps.save({
        className: innerBlockClass
    });

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
}
