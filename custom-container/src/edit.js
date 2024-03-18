import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
// Those files can contain any CSS code that gets applied to the editor.
import './editor.scss';
import { useEffect, useState } from '@wordpress/element';

// export default function Edit( props ) {
export default function Edit({ attributes, setAttributes }) {
    const { textColor, backgroundColor, gradient } = attributes;
    const { hasHorizontalScrollerOption, horizontalScrollerOption } = attributes;
    const [blockClasses, setBlockClasses] = useState('');
    // const [enableGrid, setEnableGrid] = useState(attributes.enableGrid || false);
    const { hasGridLayoutOption, gridLayoutOption, gridCols } = attributes;
    // const [hasGridLayoutOption, gridLayoutOption, gridCols] = useState('');
    const minColsRange = 2;
    const maxColsRange = 12;

    // Set block props.
    const blockProps = useBlockProps({
        className: `${blockClasses}`,
        style: {
            textColor,
            backgroundColor,
            gradient
        }
    });

    // Update block classes whenever widthOption or fontSize changes.
    useEffect(() => {
        updateBlockClasses();
    }, [horizontalScrollerOption, gridLayoutOption, gridCols]);

    // Update block classes based on widthOption and fontSize
    const updateBlockClasses = () => {
        let classes = [
            hasHorizontalScrollerOption && horizontalScrollerOption && 'is-horizontal-scroller',
            hasGridLayoutOption && gridLayoutOption && 'is-grid-layout',
            hasGridLayoutOption && gridLayoutOption && gridCols && `grid-cols-${gridCols}`
        ]
            .filter(Boolean)
            .join(' ');

        setBlockClasses(classes);
    };

    const contentColumnTemplate = [
        ['core/heading', { level: 2, textAlign: 'center', placeholder: 'Add Heading' }],
        ['core/paragraph', { align: 'center', placeholder: 'Add content...' }]
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                {(hasHorizontalScrollerOption || hasGridLayoutOption) && (
                    <PanelBody title="Layout Settings">
                        {hasHorizontalScrollerOption && (
                            <ToggleControl
                                label="Horizontal Scroller"
                                help="If enabled, then all content will be positioned in one row with horizontal scrollbar."
                                checked={horizontalScrollerOption}
                                onChange={value => setAttributes({ horizontalScrollerOption: value })}
                            />
                        )}
                        {hasGridLayoutOption && (
                            <>
                                <ToggleControl label="Enable Grid Layout" checked={gridLayoutOption} onChange={value => setAttributes({ gridLayoutOption: value })} />

                                {gridLayoutOption && (
                                    <RangeControl label="Columns Number" value={gridCols} onChange={value => setAttributes({ gridCols: value })} min={minColsRange} max={maxColsRange} />
                                )}
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorControls>
            <InnerBlocks template={contentColumnTemplate} />
        </div>
    );
}
