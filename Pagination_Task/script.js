function createElements(tagName, classes = [], textContents = '') {
    let element = document.createElement(tagName);
    if (classes.length > 0) {
        element; element.classList.add(...classes);
    }
    if (textContents !== '') {
        element.textContent = textContents;
    }
    return element;
}

// Create container element with Bootstrap classes
const container = createElements('div', ['container-fluid', 'mt-5', 'p-5']);

// Create and append h1 tag for title
const h1Tag = createElements('h1', ['p-3', 'text-center'], 'Pagination DOM Manipulation');
h1Tag.setAttribute('id', 'title');
container.appendChild(h1Tag);

// Create and append paragrapg tag for description
const paragraphTag = createElements('p', ['text-center'], 'Pagination DOM Manipulation with json data appending on Tables');
paragraphTag.setAttribute('id', 'description');
container.appendChild(paragraphTag);

// Create rows and columns for table and pagination
const row1 = createElements('div', ['row']);
const col1 = createElements('div', ['col-md-12']);

const row2 = createElements('div', ['row']);
const col2 = createElements('div', ['col-md-12']);

const row3 = createElements('div', ['row']);
const col3 = createElements('div', ['col-md-12']);

const tableDiv = createElements('div', ['table-responsive']);

const table = createElements('table', ['table', 'table-bordered', 'table-hover', 'table-striped']);

const tableHead = createElements('thead');
const headRow = createElements('tr');

// Create pagination elements
const paginationContainer = document.createElement('nav');
paginationContainer.setAttribute('aria-label', 'Page navigation');

const paginationList = document.createElement('ul');
paginationList.classList.add('pagination');

// Pagination buttons container
const firstButton = createPaginationButton('First', goToFirstPage);
const prevButton = createPaginationButton('Previous', goToPrevPage);
const nextButton = createPaginationButton('Next', goToNextPage);
const lastButton = createPaginationButton('Last', goToLastPage);
const numbersContainer = createElements('ul', ['pagination']);

const paginationInfo = createElements('span', ['pagination-info']);
paginationInfo.style.margin = '0 10px';

// Append elements to pagination container
paginationList.appendChild(firstButton);
paginationList.appendChild(prevButton);
paginationList.appendChild(numbersContainer)
paginationList.appendChild(nextButton);
paginationList.appendChild(lastButton);

paginationContainer.appendChild(paginationList);

// Create table headers
['ID', 'Name', 'Email'].forEach(text => {
    const th = createElements('th', ['bg-dark', 'text-white'], text);
    headRow.appendChild(th);
});

// Append tables and pagination container
tableHead.appendChild(headRow);
table.appendChild(tableHead);
tableDiv.appendChild(table)
col1.appendChild(tableDiv);
col2.appendChild(paginationContainer);
col3.appendChild(paginationInfo);

// Append rows and columns to container
row1.appendChild(col1);
row2.appendChild(col2);
row3.appendChild(col3);

container.appendChild(row1);
container.appendChild(row2);
container.appendChild(row3);

// Append container to body
document.body.appendChild(container);

// Function to create pagination button
function createPaginationButton(text, clickHandler) {
    // Pagination buttons create
    const button = createElements('li', ['page-item']);
    button.setAttribute('id', 'buttons');

    const link = createElements('a', ['page-link'], text);

    // Add click event listener
    link.addEventListener('click', clickHandler);

    button.appendChild(link);
    return button;
}

// Fetch JSON data directly using fetch API
// fetch('URL'): Initiates a request to the specified URL to fetch data.
fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => {  // Handles the response from the fetch request
        if (!response.ok) { // Checks if the response was successful. The ok property of the response object is a boolean indicating whether the request was successful (status in the range 200-299) or not
            throw new Error('Network response was not ok');
        }
        // Parses the response body as JSON. This returns a promise that resolves with the parsed JSON data.
        return response.json();
    })
    .then(data => { //  Handles the parsed JSON data received from the previous .then()
        items = data;
        displayItems(); // Calls the displayItems()
        updatePagination(); // Calls the updatePagination()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Pagination settings
const itemsPerPage = 10;
let currentPage = 1;
let items = [];

// function to display the items on the current page in the table.
function displayItems() {

    // Calculate the start and end index of items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Extract items for the current page using slice
    const currentPageItems = items.slice(startIndex, endIndex);

    // Create a new table body element
    const tableBody = createElements('tbody');

    // Iterate over each item in currentPageItems to create table rows
    currentPageItems.forEach(item => {

        // Create a new table row element
        const row = createElements('tr');

        // Populate table cells with item properties ('id', 'name', 'email')
        ['id', 'name', 'email'].forEach(prop => {

            // Create a new table cell element with item property value
            const cell = createElements('td', [''], item[prop]);

            // Append the cell to the row
            row.appendChild(cell);
        });

        // Append the row to the table body
        tableBody.appendChild(row);
    });

    // Replace previous table body with new table body
    if (table.lastChild !== tableHead) {
        table.replaceChild(tableBody, table.lastChild);
    } else {
        table.appendChild(tableBody);
    }
}

// function to update the pagination buttons and information based on the total number of items and current page
function updatePagination() {
    // Calculate total number of pages based on total items and items per page
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Toggle 'disabled' class for navigation buttons based on current page
    firstButton.classList.toggle('disabled', currentPage === 1);
    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
    lastButton.classList.toggle('disabled', currentPage === totalPages);

    // Set text content for pagination information
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Clear number buttons container
    numbersContainer.innerHTML = '';
    // Create number buttons for each page and update their active state
    for (let i = 1; i <= totalPages; i++) {

        // Create a number button with page number as text and goToPage as click handler
        const numberButton = createPaginationButton(i.toString(), () => goToPage(i));

        // Add 'active' class to the button corresponding to the current page
        if (i === currentPage) {
            numberButton.classList.add('active');
        }

        // Append the number button to the numbers container
        numbersContainer.appendChild(numberButton);
    }
}

// Function to handle number button click
function goToPage(page) {
    currentPage = page;
    displayItems();
    updatePagination();
}

// Function to handle first button click
function goToFirstPage() {
    currentPage = 1;
    displayItems();
    updatePagination();
}

// Function to handle previous button click
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayItems();
        updatePagination();
    }
}

// Function to handle next button click
function goToNextPage() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayItems();
        updatePagination();
    }
}

// Function to handle last button click
function goToLastPage() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    currentPage = totalPages;
    displayItems();
    updatePagination();
}
