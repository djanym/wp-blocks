# WP Gutenberg Blocks. Reusable. Extendable. Customizable.

## Installation

### 1. Install Node.
1. If you don't have it already, download [Node](https://nodejs.org/en/).
2. Install it.

### 2. `cd` to the theme directory

### 3. Clone this repository to your theme as a submodule (if you're already using git repo in the project).
```
git submodule add -f git@github.com:djanym/wp-blocks.git src/wp-blocks/
```

### 4. `cd` to the blocks directory:
```
cd src/wp-blocks
```

### 5. Install blocks dependencies.
```
npm install
```

### 5. Add to scripts to package.json:
Replace {block-name} with block name slug.
Replace {block-folder} with necessary src.
```
"scripts": {
    "build:wp": "wp-scripts build",
    "packages-update": "wp-scripts packages-update",
    "start:{block-name}": "wp-scripts start --webpack-src-dir=./{block-folder}/src --output-path=../../wp-blocks/{block-folder}/",
    "build:{block-name}": "wp-scripts build --webpack-src-dir=./{block-folder}/src --output-path=../../wp-blocks/{block-folder}/",
}
```

`start` for dev environment.

`build` for the final production version.

### 6. Build block files:
```
npm run start:{block-name} // For dev environment
npm run build:{block-name} // For final production version
```

### 7. Add block to the theme/plugin:

Include block php file in functions.php:

```
function gutenberg_block_{block-name}() {
    register_block_type( __DIR__ . '/wp-blocks/{block-folder}' );
}
add_action( 'init', 'gutenberg_block_{block-name}' );
```
