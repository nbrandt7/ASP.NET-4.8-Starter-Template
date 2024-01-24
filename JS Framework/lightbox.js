import PhotoSwipeLightbox from '/Content/js/PhotoSwipe-master/dist/photoswipe-lightbox.esm.js';
import { initLightboxTags } from '/Content/js/initLightboxTags.js';

(async () => {
    // Load the width and height data attributes to the lightbox gallery anchor tags for ease of use
    await initLightboxTags();

    //Create new lightbox with settings/options
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#lightbox-gallery',
        children: 'a',
        pswpModule: () => import('/Content/js/PhotoSwipe-master/dist/photoswipe.esm.js'),
    });

    // Initialize the lightbox
    lightbox.init();
})();

