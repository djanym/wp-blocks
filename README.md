# WP Gutenberg Blocks. Reusable. Extendable. Customizable.

## Installation

### 1. `cd` to the theme directory

### 2. Clone this repository to your theme. If you're already using git, you can add this repository as a submodule.
```
git submodule add -f git@github.com:djanym/wp-blocks.git src/wp-blocks/
```

### 3. Install Node.
1. If you don't have it already, download [Node](https://nodejs.org/en/).
2. Install it.

### 4. Install theme dependencies.
```
npm install --save-dev @wordpress/block-editor @wordpress/blocks @wordpress/components @wordpress/scripts
```

!!! IMPORTANT !!! Block's package.json will not be used, because we have a theme packages which covers everything. Just rename slug, title, etc.

### 5. Add to theme/plugin package.json:
Replace {block-name} with block name slug.
Replace {block-folder} with necessary src.
```
"scripts": {
    "build:wp": "wp-scripts build",
    "packages-update": "wp-scripts packages-update",
    "build:{block-name}": "wp-scripts build --webpack-src-dir=./src/wp-blocks/{block-folder}/src --output-path=wp-blocks/{block-folder}/",
    "start:{block-name}": "wp-scripts start --webpack-src-dir=./src/wp-blocks/{block-folder}/src --output-path=wp-blocks/{block-folder}/",
}
```

`start` for dev environment.

`build` for the final production version.

### 6. #3. Build block files:
```
npm run start:{block-name} // For dev environment
npm run build:{block-name} // For final production version
```

### 7. Add block to the theme/plugin:

Include block php file in functions.php:

```
function gutenberg_block_custom_2col_img_content_row() {
    register_block_type( __DIR__ . '/wp-blocks/custom-2col-img-content-row' );
}
add_action( 'init', 'gutenberg_block_custom_2col_img_content_row' );
```
