import { registerBlockType } from '@wordpress/blocks'
// The code used gets applied both to the front of your site and to the editor.
import './style.scss'
// Internal dependencies
import Edit from './edit'
import save from './save'
import metadata from './block.json'

registerBlockType(metadata.name, {
    attributes: {
        // built-in attribute name. Works with `supports: { anchor: true }`.
        anchor: {
            type: 'string',
            default: ''
        },
        align: {
            type: 'string',
            default: 'full',
        },
        // built-in attribute name. Works when text, background, gradient colors support enabled.
        style: {
            type: 'object'
        },
        // built-in attribute name. Works with `supports: { color: { text: true } }`.
        textColor: {
            type: 'string',
            default: 'white', // custom 'color-preset-slug' should be defined via add_theme_support( 'editor-color-palette') feature.
        },
        // built-in attribute name. Works with `supports: { color: { background: true } }`.
        // backgroundColor: {
        //     type: 'string',
        //     default: 'commtask-color-1' // custom 'color-preset-slug' should be defined via add_theme_support( 'editor-color-palette') feature.
        // },
        // built-in attribute name. Works with `supports: { color: { gradients: true } }`.
        gradient: {
            type: 'string',
            // default: 'gradient-slug', // custom 'gradient-preset-slug' should be defined via add_theme_support( 'editor-gradient-presets') feature.
        },
        imageSrc: {
            type: 'string',
            // source: 'attribute',
            default: ''
        },
        imageCaption: {
            type: 'string',
            // source: 'attribute',
            default: ''
        },
        imageColumnPosition: {
            enum: ['left', 'right'],
            default: 'right'
        },
        blockBackgroundColor: {
            type: 'string',
            default: '#008651' // Add `00` to the end of the color to make it transparent. Example: #FFFFFF00
        }
    },
    supports: {
        // Check for ref: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
        // Declare support for specific alignment options.
        align: [ 'full' ], // Possible values: "left", "center", "right", "wide", "full", "wide" and "full".
        alignWide: true,
        anchor: true,
        color: {
            // Enable gradients UI control.
            gradients: false, // If `true` force text and background UI controls.
            // Enables background and text.
            color: true,
            // Disable background support. Text color support is still enabled.
            background: false, // Possible values: true, false, "only".
            text: true // Possible values: true, false, "only".
        }
    },
    edit: Edit,
    save
})
