// Create container element
let container = document.createElement('div');
container.classList.add('p-5')

// Fetch the data from the URL
fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // Store the fetched data in a variable
        let jsonData = data;

        // Create table
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');

        // Create table header
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        ['ID', 'Name', 'Email'].forEach(column => {
            let th = document.createElement('th');
            th.classList.add('bg-dark', 'text-white');
            th.textContent = column;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table body
        let tbody = document.createElement('tbody');

        // Function to populate table rows
        function populateTable(pageNumber = 1) {
            tbody.innerHTML = ''; // Clear previous rows
            let itemsPerPage = 10; // Number of items to display per page
            let startIndex = (pageNumber - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let currentPageData = jsonData.slice(startIndex, endIndex);

            currentPageData.forEach(item => {
                let row = document.createElement('tr');
                ['id', 'name', 'email'].forEach(key => {
                    let cell = document.createElement('td');
                    cell.textContent = item[key];
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        }

        // Initial table population
        populateTable();

        // Create pagination
        let navTag = document.createElement('nav');
        navTag.setAttribute('aria-label', 'Page navigation');

        // create un-ordered tag
        let unorderListTag = document.createElement('ul');
        unorderListTag.classList.add('pagination');

        let pages = ['Previous', '1', '2', '3', '4', '5', 'Next'];

        pages.forEach(page => {
            // create list tags
            let listTag = document.createElement('li');
            listTag.classList.add('page-item');

            // create anchor tag
            let anchorTag = document.createElement('a');
            anchorTag.classList.add('page-link');
            anchorTag.setAttribute('href', '#');
            anchorTag.textContent = page;

            anchorTag.addEventListener('click', () => {
                let currentPage = getCurrentPage();
                if (page === 'Previous' && currentPage > 1) {
                    // Handle previous page click
                    populateTable(currentPage - 1);
                    updateActivePage(currentPage - 1);
                } else if (page === 'Next' && currentPage < pages.length - 2) {  // -2 to exclude 'Previous' and 'Next' from page count
                    // Handle next page click
                    populateTable(currentPage + 1);
                    updateActivePage(currentPage + 1);
                } else if (!isNaN(page)) {
                    // Handle page number click
                    populateTable(parseInt(page));
                    updateActivePage(parseInt(page));
                }
            });

            listTag.appendChild(anchorTag);
            unorderListTag.appendChild(listTag);
        });

        navTag.appendChild(unorderListTag);

        // Append table and pagination to container
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        container.appendChild(navTag);

        // Append container to document body
        document.body.appendChild(container);

        // Initial active page
        updateActivePage(1);

    })
    .catch(error => {
        console.error("Error fetching the data:", error);
    });

// Function to get the current active page
function getCurrentPage() {
    let activePage = document.querySelector('.pagination .active');
    return activePage ? parseInt(activePage.textContent) : 1;
}

// Function to update active page in pagination
function updateActivePage(pageNumber) {
    let pages = document.querySelectorAll('.pagination .page-item');
    pages.forEach((page, index) => {
        if (index === pageNumber) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}
