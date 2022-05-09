<?php
/**
 * Plugin Name:       Image Masonry Gallery Block
 * Description:       <strong>Masonry Image Gallery</strong> is a custom <strong>Gutenberg Block</strong> built with <strong>Gutenberg Native Components</strong>. You can easily create an image gallery in Gutenberg Editor with this block. 
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           2.0.0
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       masonry-image-gallery
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [migb] && [MIGB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';

/**
 * Blocks Final Class
 */

final class MIGB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->migb_define_constants();

		// load textdomain
		add_action( 'plugins_loaded', [ $this, 'migb_load_textdomain' ] );

		// block initialization
		add_action( 'init', [ $this, 'migb_blocks_init' ] );

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'migb_external_libraries' ] );

		// admin page
		add_action( 'activated_plugin', [ $this, 'migb_user_redirecting' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Textdomain Loader
	 */
	public function migb_load_textdomain() {
		load_plugin_textdomain( 'masonry-image-gallery', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	// Admin Page Redirecting
	public function migb_user_redirecting( $plugin ) {
		if( plugin_basename(__FILE__) == $plugin ){
			wp_redirect( admin_url( 'tools.php?page=migb-galleryblock' ) );
			die();
		}
	}
	/**
	 * Define the plugin constants
	 */
	private function migb_define_constants() {
		define( 'MIGB_VERSION', '2.0.0' );
		define( 'MIGB_URL', plugin_dir_url( __FILE__ ) );
		define( 'MIGB_LIB_URL', MIGB_URL . 'lib/' );		
	}

	/**
	 * Blocks Registration 
	 */

	public function migb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function migb_blocks_init() {
		// register single block
		$this->migb_register_block( 'masonry-gallery' );
	}

	/**
	 * Enqueue Block Assets
	 */
	public function migb_external_libraries() {
		// admin css
		if( is_admin() ) {
			wp_enqueue_style( 'migb-admin-editor', MIGB_URL . 'admin/css/editor.css' );
		}
		// frontend css
		wp_enqueue_style( 'migb-magnific-css', MIGB_LIB_URL . 'css/magnific-popup.css', array(), MIGB_VERSION, 'all' );
		// enqueue JS
		wp_enqueue_script( 'migb-magnific-popup', MIGB_LIB_URL . 'js/jquery.magnific-popup.min.js', array('jquery'), MIGB_VERSION, true );
		wp_enqueue_script( 'migb-lib', MIGB_LIB_URL . 'js/lightbox.js', array('jquery'), MIGB_VERSION, true );
	}

}

/**
 * Kickoff
*/

MIGB_BLOCKS_CLASS::init();
