const ACCESS_KEY = '-O_P4SLG3cyV7BfwtjGVVtoyUDYc5Onw0zvGeYP_ITw';
let query = 'nature';
let page = 1;
const perPage = 9;

const linkContainer = document.querySelector('.link-container');
const loadMorebtn = document.querySelector('.load-more');
let gallery = document.querySelector('.gallery');

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

    images.forEach(image => {
        let figureElement = document.createElement('figure');
        figureElement.innerHTML = `<img class="gallery-img" src="${image.urls.small}">`;
        gallery.appendChild(figureElement);
    });

    page++; // Increase page number for next load
}

// Load initial images
displayImages(query);

loadMorebtn.addEventListener('click', () => displayImages(query));

linkContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('cities')) {
        query = 'cities';
    } else if (event.target.classList.contains('mountain')) {
        query = 'mountains';
    } else if (event.target.classList.contains('nature')) {
        query = 'nature';
    }

    // Reset gallery and page when switching categories
    gallery.innerHTML = '';
    page = 1;

    displayImages(query);
});
