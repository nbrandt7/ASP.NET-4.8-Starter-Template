export function initLightboxTags() {
    // Add height, width, and target attributes to the lightbox gallery anchor tags
    window.onload = function () {
        // Get all the images on the page
        const images = document.querySelectorAll('#lightbox-gallery img');

        // Loop through each image
        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            // Create new anchor tag instance and replace image with an anchor wrapped image
            const anchor = document.createElement('a');
            const clonedImage = image.cloneNode(true);
            anchor.appendChild(clonedImage);
            Array.from(image.parentNode.attributes).forEach((attr) => {
                anchor.setAttribute(attr.name, attr.value);
            });
            image.parentNode.parentNode.replaceChild(anchor, image.parentNode);

            // Get the width and height of the image
            const width = image.naturalWidth;
            const height = image.naturalHeight;
            const source = image.getAttribute('src');

            // Set the data attributes on the parent element
            anchor.setAttribute('data-pswp-width', width);
            anchor.setAttribute('data-pswp-height', height);
            anchor.setAttribute("target", "_blank");
            anchor.setAttribute("href", source);
        }
    };
}
