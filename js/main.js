const apiKey = 'B_RJTYn7umfIdgUgbmlYwwm2PR7XiVyH6Ok0MGS3TqY';
const count = 30;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imgContainer = document.getElementById('img');
const loader = document.getElementById('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoader() {
    imageLoaded++;
    if(imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function photosCreate() {
    totalImages = photosArray.length;
    photosArray.forEach(element => {
        const ahref = document.createElement('a');
        const img = document.createElement('img');
        createAttribute(ahref, {
            href: element.links.html,
            target: '_blank'
        })
        
        createAttribute(img, {
            src: element.urls.regular,
            alt: element.alt_description
        })

        img.addEventListener('load', imageLoader);
        
        ahref.appendChild(img);
        imgContainer.appendChild(ahref);
    });
}

function createAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        photosCreate();
    } catch (error) {
        
    }
}

window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imageLoaded = 0;
        getPhotos();
    }
})
getPhotos();