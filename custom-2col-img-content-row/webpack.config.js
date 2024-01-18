/**
 * External Dependencies
 */
const path = require( 'path' );

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

console.log( 'PATH', path.resolve( __dirname, 'assets/src', 'index.js' ) );

module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve( __dirname, 'assets/src', 'index.js' ),
    }
}