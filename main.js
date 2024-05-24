let mainSection = document.getElementById("data-list-wrapper");

// Pitch inputs
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch inputs
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

// Update price inputs
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

// Sort and filter buttons
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

// Search inputs
    let searchBySelect = document.getElementById("search-by-select");
    let searchByInput = document.getElementById("search-by-input");
    let searchByButton = document.getElementById("search-by-button");

let product = [];
function fetchdata() {
    fetch("https://tank-project-js.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) => {
            cardlist(data);
            product = data;
        })
        .catch((err) => console.log(err));
}

fetchdata();

function cardlist(data) {
    let store = data.map((el) => singlecard(el.id, el.image, el.title, el.founder, el.category, el.price, el.description));
    document.querySelector(".card-list").innerHTML = store.join('');
}


function singlecard(id, image, title, founder, category, price, description) {
    let card = ` 
        <a  style="text-decoration:none;border:none;box-shadow:none;" href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}&price=${encodeURIComponent(price)}&id=${encodeURIComponent(id)}" class="card">
        <div class="card" data-id="${id}">
        <div class="pic">
        <img src="${image}" class="card-img-top" alt="...">
          </div>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text price">Price : ${price}</p>
            </div>
            <ul class="list-group list-group-flush list">
                <p class="card-text founder" style="color:black;">Founder :  ${founder}</p>
                <p class="card-text category" style="color:black;">Category : ${category}</p>
                <li class="list-group-item" style="display:none;">${description}</li>
            </ul>
            <div class="card-body">
                <a href="#" data-id="${id}" class="card-link">Edit</a>
                <button data-id="${id}" class="card-button">delete</button>
    
            </div>
    </div>
        </a>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Mock product data
    const products = [
        { title: 'Product A', founder: 'Alice', category: 'Personal Care' },
        { title: 'Product B', founder: 'Bob', category: 'Electronics' },
        { title: 'Product C', founder: 'Charlie', category: 'Personal Care' },
        // Add more products as needed
    ];

    searchByButton.addEventListener('click', () => {
        const searchBy = searchBySelect.value;
        const searchTerm = searchByInput.value.toLowerCase();

        if (searchBy && searchTerm) {
            const filteredData = products.filter(product =>
                product[searchBy].toLowerCase().includes(searchTerm)
            );
            displayResults(filteredData);
        } else {
            alert('Please select a search criteria and enter a search term');
        }
    });

    function displayResults(data) {
        searchResultsDiv.innerHTML = '';  // Clear previous results

        if (data.length > 0) {
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `Title: ${item.title} - Founder: ${item.founder}`;
                searchResultsDiv.appendChild(itemDiv);
            });
        } else {
            searchResultsDiv.textContent = 'No results found';
        }
    }
});


// Add
pitchCreateBtn.addEventListener("click", () => {
    let newProduct = {
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category: pitchCategoryInput.value,
        founder: pitchfounderInput.value,
        price: pitchPriceInput.value
    };

    fetch("https://tank-project-js.onrender.com/pitches", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert("Product Added!");
            fetchdata(); // Refresh the product list
        })
        .catch((err) => console.log(err));
});

// Delete
document.addEventListener("click", (el) => {
    if (el.target.classList.contains("card-button")) {
        Dproduct(el.target.dataset.id);
    }
});

function Dproduct(id) {
    fetch(`https://tank-project-js.onrender.com/pitches/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchdata(); // Refresh the product list
        })
        .catch((err) => console.log(err));
}

// Filter
filterFood.addEventListener("click", () => {
    let filterdata = product.filter((el) => el.category === "Food");
    console.log(filterdata);
    cardlist(filterdata);
});

filterElectronics.addEventListener("click", () => {
    let filterdata = product.filter((el) => el.category === "Electronics");
    console.log(filterdata);
    cardlist(filterdata);
});

filterPersonalCare.addEventListener("click", () => {
    let filterdata = product.filter((el) => el.category === "Personal Care");
    console.log(filterdata);
    cardlist(filterdata);
});


//search 

// Sort
sortAtoZBtn.addEventListener("click", () => {
    const lowToHigh = product.sort((a, b) => a.price - b.price);
    cardlist(lowToHigh);
});

sortZtoABtn.addEventListener("click", () => {
    const highToLow = product.sort((a, b) => b.price - a.price);
    cardlist(highToLow);
});

// Update
document.addEventListener("click", (el) => {
    if (el.target.classList.contains("card-link")) {
        let id = el.target.dataset.id;
        update(id);
    }
});

function update(id) {
    fetch(`https://tank-project-js.onrender.com/pitches/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            updatePitchIdInput.value = data.id;
            updatePitchTitleInput.value = data.title;
            updatePitchImageInput.value = data.image;
            updatePitchfounderInput.value = data.founder;
            updatePitchCategoryInput.value = data.category;
            updatePitchPriceInput.value = data.price;
        })
        .catch((err) => console.log(err));
}

updatePitchBtn.addEventListener("click", () => {
    let userdata = {
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value,
        id: updatePitchIdInput.value
    };
    console.log(userdata);

    fetch(`https://tank-project-js.onrender.com/pitches/${userdata.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userdata)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchdata();
        })
        .catch((err) => console.log(err));
});


updatePricePitchPriceButton.addEventListener("click", () => {
    const pitchId = updatePricePitchId.value;
    const newPrice = updatePricePitchPrice.value;

    if (!pitchId || !newPrice) {
        alert("Both ID and Price fields are required.");
        return;
    }

    fetch(`https://tank-project-js.onrender.com/pitches/${pitchId}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data) {
                alert("Pitch not found.");
                return;
            }
            const updatedData = {
                ...data,
                price: newPrice
            };

            fetch(`https://tank-project-js.onrender.com/pitches/${pitchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    alert("Pitch price updated successfully.");
                })
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
});
// description
{/* <div class="card" data-id="${id}" >
                <div class="card-img" >
                    <img src="${image}" alt="">
                </div>  
                <div class="card-body">
                    <h5 class="card-title">title:${title}</h5>
                    <p class="card-founder ">${founder}</p>
                    <p class="card-category">${category}</p>
                    <p class="card-price">${price}</p><br>
                    <p class="card-description" style="display:none;">${description}</p>
                    <a href="#" data-id="${id}" class="card-link">edit</a>
                    <button data-id="${id}" class="card-button">delete</button>
                </div>
            </div> */}


            document.getElementById('search-by-button').addEventListener('click', () => {
                const searchByInput = document.getElementById('search-by-input').value.toLowerCase();
                const searchBySelect = document.getElementById('search-by-select').value;
    
                if (searchBySelect && searchByInput) {
                    const filteredData = product.filter(e => {
                        return searchBySelect === 'title' ? e.title.toLowerCase().includes(searchByInput) :
                               searchBySelect === 'founder' ? e.founder.toLowerCase().includes(searchByInput) : false;
                    });
                    cardlist(filteredData);
                }
            });

