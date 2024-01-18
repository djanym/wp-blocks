import {registerBlockType} from '@wordpress/blocks';
// The code used gets applied both to the front of your site and to the editor.
import './style.scss';
// Internal dependencies
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    attributes: {
        imageSrc: {
            type: 'string',
            // source: 'attribute',
            default: '',
        },
        imageCaption: {
            type: 'string',
            // source: 'attribute',
            default: '',
        },
        imageColumnPosition: {
            enum: ['left', 'right'],
            default: 'right',
        },
        blockBackgroundColor: {
            type: 'string',
            default: '#8e0816',
        },
        formID: {
            type: 'string',
            default: '',
        },
        analyticsID: {
            type: 'string',
            default: '',
        },
        formMessageColor: {
            type: 'string',
            default: '#ecd602',
        }
    },
    supports: {
        align: ['full'],
    },
    edit: Edit,
    save,
});
