const ACCESS_KEY = '-O_P4SLG3cyV7BfwtjGVVtoyUDYc5Onw0zvGeYP_ITw';
let query = 'nature';
let page = 1;
const perPage = 9;

const linkContainer = document.querySelector('.link-container');
const loadMorebtn = document.querySelector('.load-more');
let gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.container')

let imagesArray = [];
let currentIndex = 0;  

async function fetchImage(query) {
    try {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=${perPage}&page=${page}&client_id=${ACCESS_KEY}`);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log('Error while fetching the data');
        return [];
    }
}

async function displayImages(queryParam = query) {
    let images = await fetchImage(queryParam);
    imagesArray = [...imagesArray, ...images]; 

    images.forEach((image, index) => {
        let figureElement = document.createElement('figure');
        let imgElement = document.createElement('img');
        let imgContainer = document.createElement('div')
        imgContainer.classList = 'img-container'
        imgElement.className = 'gallery-img';
        imgElement.src = image.urls.small;

        imgElement.addEventListener('click', () => {
            openModal(index); 
        });
        imgContainer.appendChild(imgElement)
        figureElement.appendChild(imgContainer);
        gallery.appendChild(figureElement);
    });

    page++;
}

function openModal(index) {
    currentIndex = index; 
    updateModalImage(); 

    modal.showModal();
}

function updateModalImage() {
    if (imagesArray.length === 0) return;

    const image = imagesArray[currentIndex];

    modalContainer.innerHTML = `
        <button class="close">✖</button>
        <button class="prev modal-nav">PREV</button>
        <button class="next modal-nav">NEXT</button>
        <img  class="dialog-img" src="${image.urls.full}">
    `;

    document.querySelector('.close').addEventListener('click', () => modal.close());
    document.querySelector('.prev').addEventListener('click', () => changeImage(-1));
    document.querySelector('.next').addEventListener('click', () => changeImage(1));
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = imagesArray.length - 1;
    } else if (currentIndex >= imagesArray.length) {
        currentIndex = 0;
    }

    updateModalImage();
}

displayImages(query);

loadMorebtn.addEventListener('click', () => displayImages(query));

linkContainer.addEventListener('click', (event) => {

    if (event.target.tagName !== 'LI') return; 

    document.querySelectorAll('.links').forEach(button => {
        button.style.backgroundColor = ''; // Reset background
        button.style.color = ''; // Reset text color
    });

    // Apply styles to clicked button
    event.target.style.backgroundColor = 'black';
    event.target.style.color = 'white';


    if (event.target.classList.contains('cities')) {
        query = 'cities';
    } else if (event.target.classList.contains('mountain')) {
        query = 'mountains';
    } else if (event.target.classList.contains('nature')) {
        query = 'nature';
    }

    gallery.innerHTML = '';
    imagesArray = []; 
    page = 1;

    displayImages(query);
});
