import { useBlockProps, InspectorControls, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    RangeControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';
import { useEffect, useState } from '@wordpress/element';

// export default function Edit( props ) {
export default function Edit({ attributes, setAttributes }) {
    const [innerBlockClasses, setInnerBlockClasses] = useState('');
    const { textColor, backgroundColor, gradient } = attributes;
    const { hasHorizontalScrollerOption, horizontalScrollerOption } = attributes;
    const { hasFlexLayoutOption, flexLayoutOption, flexDirection } = attributes;
    const { hasGridLayoutOption, gridLayoutOption, gridCols } = attributes;
    const minColsRange = 2;
    const maxColsRange = 12;

    // Set block props.
    const blockProps = useBlockProps({
        // className: `${blockClasses}`,
        style: {
            textColor,
            backgroundColor,
            gradient
        }
    });

    const contentColumnTemplate = [
        ['core/heading', { level: 2, textAlign: 'center', placeholder: 'Add Heading' }],
        ['core/paragraph', { align: 'center', placeholder: 'Add content...' }]
    ];

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: `${innerBlockClasses}`
        },
        {
            template: contentColumnTemplate,
            templateInsertUpdatesSelection: false
        }
    );

    // Update block classes whenever widthOption or fontSize changes.
    useEffect(() => {
        // updateBlockClasses();
        updateInnerBlockClasses();
    }, [horizontalScrollerOption, gridLayoutOption, gridCols, flexLayoutOption, flexDirection]);

    // Update block classes based on widthOption and fontSize
    const updateInnerBlockClasses = () => {
        let classes = [
            hasHorizontalScrollerOption && horizontalScrollerOption && 'is-horizontal-scroller',
            hasGridLayoutOption && gridLayoutOption && 'is-layout-grid',
            hasGridLayoutOption && gridLayoutOption && gridCols && `grid-cols-${gridCols}`,
            hasFlexLayoutOption && flexLayoutOption && 'is-layout-flex',
            hasFlexLayoutOption && flexLayoutOption && flexDirection && `is-${flexDirection}`
        ]
            .filter(Boolean)
            .join(' ');

        setInnerBlockClasses(classes);
    };

    const allowOnlyOneOption = (optionName, value) => {
        if (value) {
            setAttributes({
                horizontalScrollerOption: optionName === 'horizontalScrollerOption',
                gridLayoutOption: optionName === 'gridLayoutOption',
                flexLayoutOption: optionName === 'flexLayoutOption'
            });
        } else {
            setAttributes({ [optionName]: value });
        }
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                {(hasHorizontalScrollerOption || hasGridLayoutOption || hasFlexLayoutOption) && (
                    <PanelBody title="Layout Settings">
                        {hasHorizontalScrollerOption && (
                            <ToggleControl
                                label="Horizontal Scroller"
                                help="If enabled, then all content will be positioned in one row with horizontal scrollbar."
                                checked={horizontalScrollerOption}
                                onChange={value => allowOnlyOneOption('horizontalScrollerOption', value)}
                            />
                        )}
                        {hasGridLayoutOption && (
                            <>
                                <ToggleControl
                                    label="Enable Grid Layout"
                                    help="Helpful for creating grid-based layouts."
                                    checked={gridLayoutOption}
                                    onChange={value => allowOnlyOneOption('gridLayoutOption', value)}
                                />

                                {gridLayoutOption && (
                                    <RangeControl label="Columns Number" value={gridCols} onChange={value => setAttributes({ gridCols: value })} min={minColsRange} max={maxColsRange} />
                                )}
                            </>
                        )}
                        {hasFlexLayoutOption && (
                            <>
                                <ToggleControl
                                    label="Enable Flex Layout"
                                    help="Helpful for creating flex-based layouts."
                                    checked={flexLayoutOption}
                                    onChange={value => allowOnlyOneOption('flexLayoutOption', value)}
                                />

                                {flexLayoutOption && (
                                    <ToggleGroupControl label="Layout Direction" value={flexDirection} onChange={value => setAttributes({ flexDirection: value })} isBlock>
                                        <ToggleGroupControlOption value="vertical" label="Vertical" />
                                        <ToggleGroupControlOption value="horizontal" label="Horizontal" />
                                    </ToggleGroupControl>
                                )}
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorControls>
            <div {...innerBlocksProps} />
        </div>
    );
}
