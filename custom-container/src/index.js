import { registerBlockType } from '@wordpress/blocks';
// The code used gets applied both to the front of your site and to the editor.
import './style.scss';
// Internal dependencies
import Edit from './edit';
import save from './save';
import metadata from './block.json';

// Get default values for the block attributes based on the custom theme configuration.
import config from '../../../../wp-blocks.config.json';

const attributes = config.blocks['custom-container'].attributes ?? {};
const supports = config.blocks['custom-container'].supports ?? {};
const styles = config.blocks['custom-container'].styles ?? [];
const features = config.blocks['custom-container'].features ?? {};

// registerBlockStyle( 'core/button', {
//     name: 'custom-button',
//     label: 'Custom Button',
// } );

registerBlockType(metadata.name, {
    attributes: {
        // built-in attribute name. Works with `supports: { anchor: true }`.
        anchor: {
            type: 'string',
            default: ''
        },
        align: {
            type: 'string',
            default: 'full'
        },
        // built-in attribute name. Works when text, background, gradient colors support enabled.
        style: {
            type: 'object',
            // margin: 'value',
            // padding: {
            // top: 'value'
            // }
            default: {
                color: {
                    text: attributes.blockTextColor ?? '',
                    background: attributes.blockBgColor ?? '',
                    gradient: attributes.blockGradientBgColor ?? ''
                }
            }
        },
        // built-in attribute name. Works with `supports: { color: { text: true } }`.
        textColor: {
            type: 'string',
            default: attributes.blockTextColorPreset ?? '' // custom 'color-preset-slug' should be defined via add_theme_support( 'editor-color-palette') feature.
        },
        // built-in attribute name. Works with `supports: { color: { background: true } }`.
        backgroundColor: {
            type: 'string',
            default: attributes.blockBgColorPreset ?? '' // custom 'color-preset-slug' should be defined via add_theme_support( 'editor-color-palette') feature.
        },
        // built-in attribute name. Works with `supports: { color: { gradients: true } }`.
        gradient: {
            type: 'string',
            default: attributes.blockGradientBgColorPreset ?? '' // custom 'gradient-preset-slug' should be defined via add_theme_support( 'editor-gradient-presets') feature.
        },
        // Custom features: horizontal scroller.
        hasHorizontalScrollerOption: {
            type: 'boolean',
            default: features.hasHorizontalScrollerOption ?? false
        },
        horizontalScrollerOption: {
            type: 'boolean',
            default: false
        },
        // Custom features: grid layout.
        hasGridLayoutOption: {
            type: 'boolean',
            default: features.hasGridLayoutOption ?? false
        },
        gridLayoutOption: {
            type: 'boolean',
            default: false
        },
        gridCols: {
            type: 'integer',
            default: 2
        },
        // Custom features: flex (inline) layout.
        hasFlexLayoutOption: {
            type: 'boolean',
            default: features.hasFlexLayoutOption ?? false
        },
        flexLayoutOption: {
            type: 'boolean',
            default: false
        }
    },
    supports: {
        // Check for ref: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
        // Declare support for specific alignment options.
        align: ['full', 'wide'], // Possible values: "left", "center", "right", "wide", "full", "wide" and "full".
        alignWide: true,
        anchor: true,
        color: {
            // Enable gradients UI control.
            gradients: supports.gradients ?? false, // If `true` force text and background UI controls.
            // Enables background and text.
            color: supports.colors ?? true,
            // Disable background support. Text color support is still enabled.
            background: supports.bgColor ?? true, // Possible values: true, false, "only".
            text: supports.textColor ?? true // Possible values: true, false, "only".
        },
        // Add add_theme_support( 'custom-spacing' ); to enable spacing UI control.
        spacing: {
            // Enable margin UI control.
            margin: supports.margin ?? false, // Can be true or false or ['top', 'right', 'bottom', 'left' ]
            // Enable padding UI control.
            padding: supports.padding ?? false, // Can be true or false or ['top', 'right', 'bottom', 'left' ]
            // Enables block spacing UI control for blocks that also use `layout`.
            blockGap: supports.blockGap ?? false // can be [ 'horizontal', 'vertical' ]
        }
    },
    styles: styles ?? [],
    edit: Edit,
    save
});
