import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    return (
        <div {...useBlockProps.save()}>
            <div className="wp-block-inner-container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
