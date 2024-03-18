import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { hasHorizontalScrollerOption, horizontalScrollerOption } = attributes;
    const { hasGridLayoutOption, gridLayoutOption, gridCols } = attributes;
    const { hasFlexLayoutOption, flexLayoutOption } = attributes;

    // Define the class based on the condition.
    const blockClass = [
        hasHorizontalScrollerOption && horizontalScrollerOption && 'is-horizontal-scroller',
        hasGridLayoutOption && gridLayoutOption && 'is-grid-layout',
        hasGridLayoutOption && gridLayoutOption && gridCols && `grid-cols-${gridCols}`,
        hasFlexLayoutOption && flexLayoutOption && 'is-flex-layout'
    ]
        .filter(Boolean)
        .join(' ');

    const blockProps = useBlockProps.save({
        className: blockClass
    });

    return (
        <div {...blockProps}>
            <div className="wp-block-group__inner-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
