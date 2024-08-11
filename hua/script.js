let currentPage = 1;
const imagesPerPage = 4;
let images = [];

document.getElementById('uploadButton').addEventListener('click', () => {
    const input = document.getElementById('uploadInput');
    const files = input.files;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            images.push(e.target.result);
            displayImages();
        }
        
        reader.readAsDataURL(file);
    }
});

function displayImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const start = (currentPage - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const paginatedImages = images.slice(start, end);

    paginatedImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        gallery.appendChild(img);
    });

    updatePagination();
}

function updatePagination() {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage * imagesPerPage >= images.length;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayImages();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * imagesPerPage < images.length) {
        currentPage++;
        displayImages();
    }
});
