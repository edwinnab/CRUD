//attach data from the db
function displayProducts(product) {
    let tableRow = document.createElement("tr")
    tableRow.id = "table-row"
    tableRow.innerHTML = `
    <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.image}</td>
    <td>${product.price}</td>
    <td><button class="btn" id="edit">Edit</button></td>
    <td><button class="btn btn-light" style="background-color: red;" id="delete">Delete</button></td>
    `
    document.querySelector("#table-body").append(tableRow)
    tableRow.querySelector("#edit").addEventListener("click", () =>{
        updatePrice(product.id)
    })
    tableRow.querySelector("#delete").addEventListener("click", () => {
        tableRow.remove()
        deleteRecord(product.id)
    })
}

//GET 
// /base_URL/products
const base_URL = "http://localhost:3000"

function fetchProducts() {
    fetch(`${base_URL}/products`)
    .then(res => res.json())
    .then(products => 
        products.forEach((product) => {
            displayProducts(product)
        })
    )
}
fetchProducts()

//function to collect formData
let formData;

function collectFormData() {
    let form = document.querySelector("#form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        formData = {
            title: e.target.name.value,
            image: e.target.image.value,
            description: e.target.description.value,
            price: e.target.price.value
        }
        postProducts()
    })
}
collectFormData()

//POST 
// base_URL/products
function postProducts() {
    fetch(`${base_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(products => console.log(products))
}

//DELETE
// base_URL/products/id

function deleteRecord(id) {
    fetch(`${base_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

//update the products details
function updatePrice(id) {
    fetch(`${base_URL}/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            price: 151000
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}