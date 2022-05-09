<?php
/**
 * Admin Support Page
*/

class MIGB_Admin_Page {
    /**
     * Contructor 
    */
    public function __construct(){
        add_action( 'admin_menu', [ $this, 'migb_plugin_admin_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'migb_admin_page_assets' ] );
    }

    // Admin Assets
    public function migb_admin_page_assets($screen) {
        if( 'tools_page_migb-galleryblock' == $screen ) {
            wp_enqueue_style( 'admin-asset', plugins_url('css/admin.css', __FILE__ ) );
        }
    }

    // Admin Page
    public function migb_plugin_admin_page(){
        add_submenu_page( 'tools.php', __('Masonry Gallery Block','masonry-image-gallery'), __('Masonry Gallery Block','masonry-image-gallery'), 'manage_options', 'migb-galleryblock', [ $this, 'migb_admin_page_content_callback' ] );
    }
    public function migb_admin_page_content_callback(){
        ?>
            <div class="admin_page_container">
                <div class="plugin_head">
                    <div class="head_container">
                        <h1 class="plugin_title"><?php echo esc_html__('Masonry Image Gallery Block','masonry-image-gallery'); ?></h1>
                        <h4 class="plugin_subtitle"><?php echo esc_html__('A Custom Gutenberg Block to Create Image Gallery with Lightbox in Masonry style', 'masonry-image-gallery'); ?></h4>
                        <div class="support_btn">
                            <a href="https://makegutenblock.com/contact" target="_blank" style="background: #D37F00"><?php echo esc_html__('Contact Me','masonry-image-gallery'); ?></a>
                            <a href="https://wordpress.org/plugins/mgb-masonry-image-gallery/#reviews" target="_blank" style="background: #0174A2"><?php echo esc_html__('Rate Plugin','masonry-image-gallery'); ?></a>
                        </div>
                    </div>
                </div>
                <div class="plugin_body">
                    <div class="doc_video_area">
                        <div class="doc_video">
                            <iframe width="100%" height="350" src="https://www.youtube.com/embed/BE7nMyVF-9I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="support_area">
                        <div class="single_support">
                            <h4 class="support_title">Freelance Work</h4>
                            <div class="support_btn">
                                <a href="https://www.fiverr.com/users/devs_zak/" target="_blank" style="background: #1DBF73">@Fiverr</a>
                                <a href="https://www.upwork.com/freelancers/~010af183b3205dc627" target="_blank" style="background: #14A800">@UpWork</a>
                            </div>
                        </div>
                        <div class="single_support">
                            <h4 class="support_title">Get Support</h4>
                            <div class="support_btn">
                                <a href="https://makegutenblock.com/contact" target="_blank" style="background: #002B42">Contact</a>
                                <a href="mailto:zbinsaifullah@gmail.com" style="background: #EA4335">Send Mail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php 
    }
}
 new MIGB_Admin_Page();