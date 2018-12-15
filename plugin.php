<?php
/**
 * Plugin Name: WPR Custom Gutenberg Blocks
 * Plugin URI: https://github.com/ajien/wpr-blocks/
 * Description: WPR Custom Gutenberg Blocks is a Gutenberg plugin created via create-guten-block.
 * Author: ajien
 * Author URI: https://aaronjeffreynolasco.com/
 * Version: 1.1.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
