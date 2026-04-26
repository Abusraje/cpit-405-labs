const ACCESS_KEY = "VVE2SEJS8_RPBYIrwTFvv376KV23_cFd-ibV1Z_BOjI";

const gallery = document.getElementById("gallery");

function displayImages(images) {
    gallery.innerHTML = "";

    images.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash Image";
        gallery.appendChild(img);
    });
}
document.getElementById("query").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchAsync();
    }
});

function getQuery() {
    return document.getElementById("query").value;
}

// =====================
// 1. XHR
// =====================
function searchXHR() {
    const query = getQuery();

    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `https://api.unsplash.com/search/photos?query=${query}`,
        true
    );

    xhr.setRequestHeader("Authorization", `Client-ID ${ACCESS_KEY}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        }
    };

    xhr.send();
}

// =====================
// 2. Fetch Promises
// =====================
function searchFetch() {
    const query = getQuery();

    fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => displayImages(data.results))
    .catch(error => console.log(error));
}

// =====================
// 3. Async / Await
// =====================
async function searchAsync() {
    const query = getQuery();

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}`,
            {
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`
                }
            }
        );

        const data = await response.json();
        displayImages(data.results);

    } catch (error) {
        console.log(error);
    }
}