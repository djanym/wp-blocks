import { useBlockProps, InnerBlocks, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { SelectControl, PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { textColor, backgroundColor, gradient } = attributes;
    const { hasWidthOption, widthOption } = attributes;
    const [blockClasses, setBlockClasses] = useState('');

    const blockProps = useBlockProps({
        className: `${blockClasses}`,
        style: {
            textColor,
            backgroundColor,
            gradient
        }
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            template: [
                ['core/heading', { level: 4, placeholder: 'Add card heading' }],
                ['core/paragraph', { placeholder: 'Add card content...' }]
            ],
            templateInsertUpdatesSelection: false
        }
    );

    // Update block classes whenever widthOption or fontSize changes.
    useEffect(() => {
        updateBlockClasses();
    }, [widthOption]);

    // Update block classes based on widthOption and fontSize
    const updateBlockClasses = () => {
        setBlockClasses(`width-${widthOption}`);
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                {hasWidthOption && (
                    <PanelBody title="Layout Options">
                        <SelectControl
                            label="Width"
                            value={widthOption}
                            options={[
                                { label: 'Default', value: 'default' },
                                { label: '100%', value: 'full' },
                                { label: '1/2 (50%)', value: 'half' },
                                { label: '1/3 (33%)', value: 'third' },
                                { label: '1/4 (25%)', value: 'quarter' },
                                { label: '1/5 (20%)', value: 'fifth' },
                                { label: 'Auto', value: 'auto' }
                            ]}
                            onChange={value => setAttributes({ widthOption: value })}
                        />
                    </PanelBody>
                )}
            </InspectorControls>

            <div {...innerBlocksProps} />
        </div>
    );
}
