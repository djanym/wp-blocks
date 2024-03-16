import { registerBlockType } from '@wordpress/blocks';
// The code used gets applied both to the front of your site and to the editor.
import './style.scss';
// Internal dependencies
import Edit from './edit';
import save from './save';
import metadata from './block.json';

// Get default values for the block attributes based on the custom theme configuration.
import config from '../../../../wp-blocks.config.json';

// eslint-disable-next-line
const attributes = config.blocks['animated-number'].attributes;
// eslint-disable-next-line
const supports = config.blocks['animated-number'].supports;
// eslint-disable-next-line
const styles = config.blocks['animated-number'].styles;

registerBlockType(metadata.name, {
    attributes: {
        align: {
            type: 'string',
            default: ''
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
        }
    },
    supports: {
        // Check for ref: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
        // Declare support for specific alignment options.
        align: false, // Possible values: "left", "center", "right", "wide", "full", "wide" and "full".
        alignWide: false,
        anchor: false,
        color: {
            // Enable gradients UI control.
            gradients: supports.gradients ?? false, // If `true` force text and background UI controls.
            // Enables background and text.
            color: supports.colors ?? false,
            // Disable background support. Text color support is still enabled.
            background: supports.bgColor ?? false, // Possible values: true, false, "only".
            text: supports.textColor ?? true // Possible values: true, false, "only".
        }
    },
    styles: styles ?? [],
    edit: Edit,
    save
});
