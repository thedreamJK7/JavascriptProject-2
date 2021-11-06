const apiKey = 'B_RJTYn7umfIdgUgbmlYwwm2PR7XiVyH6Ok0MGS3TqY';
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imgContainer = document.getElementById('img');
let photosArray = [];

function photosCreate() {
    photosArray.forEach(element => {
        const ahref = document.createElement('a');
        const img = document.createElement('img');
        ahref.setAttribute('href', element.links.html);
        ahref.setAttribute('target', '_blank');
        
        img.setAttribute('src', element.urls.regular);
        img.setAttribute('alt', element.alt_description);
        
        ahref.appendChild(img);
        imgContainer.appendChild(ahref);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        photosCreate();
    } catch (error) {
        
    }
}

getPhotos();