import { registerBlockType } from '@wordpress/blocks';
// The code used gets applied both to the front of your site and to the editor.
import './style.scss';
// Internal dependencies
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
		image1: {
			type: 'string',
			// source: 'attribute',
			default: '',
		},
		image2: {
			type: 'string',
			default: '',
		},
		image3: {
			type: 'string',
			default: '',
		}
	},
	edit: Edit,
	save,
} );
