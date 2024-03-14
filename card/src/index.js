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
            default: '',
        }
    },
    edit: Edit,
    save,
});
