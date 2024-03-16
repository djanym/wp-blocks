import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    SelectControl,
    FontSizePicker,
    PanelBody,
    __experimentalToolsPanel as Label,
    __experimentalToolsPanel as Spacer,
    __experimentalToolsPanel as Header,
    __experimentalToolsPanel as HeaderLabel
} from '@wordpress/components';
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

    // Update block classes based on widthOption and fontSize
    const updateBlockClasses = () => {
        setBlockClasses(` width-${widthOption}`);
        return;
        // console.log(widthOption);
        let classes = '';
        // Add class based on widthOption value
        if (widthOption === '50') {
            classes += ' width-50';
        } else if (widthOption === '100') {
            classes += ' width-100';
        } else if (widthOption === 'fixed') {
            classes += ' width-fixed';
        }
        // Add class based on fontSize value
        if (widthOption) {
            classes += ` font-size-${widthOption}`;
        }
        setBlockClasses(classes);
    };

    const contentTemplate = [
        ['core/heading', { level: 4, placeholder: 'Add card heading' }],
        ['core/paragraph', { placeholder: 'Add card content...' }]
    ];

    // Update block classes whenever widthOption or fontSize changes.
    useEffect(() => {
        updateBlockClasses();
    }, [widthOption]);

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

            <InnerBlocks template={contentTemplate} />
        </div>
    );
}
