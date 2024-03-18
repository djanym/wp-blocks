import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { hasWidthOption, widthOption } = attributes;

    // Define the class based on the condition.
    const blockClass = hasWidthOption ? `width-${widthOption}` : '';

    const blockProps = useBlockProps.save({
        className: blockClass
    });

    return (
        <div {...blockProps}>
            <div className="wp-card-block-inner-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
