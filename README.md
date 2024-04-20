# Day16_Task

// Create table element
// let table = document.createElement('table');
// table.classList.add('table', 'table-striped', 'table-hover'); 

// // Create table header
// let thead = document.createElement('thead');
// let headerRow = document.createElement('tr');

// let tableHeadData = ['ID', 'Name', 'Email']
// tableHeadData.forEach(column => {
//     let th = document.createElement('th');
//     th.classList.add('bg-dark', 'text-white');
//     th.textContent = column;
//     headerRow.appendChild(th);
// });
// thead.appendChild(headerRow);

// // Create table body with sample data
// let tbody = document.createElement('tbody');
// let data = [
//     { id: 1, name: 'John', age: 30 },
//     { id: 2, name: 'Jane', age: 25 },
//     { id: 3, name: 'Doe', age: 40 }
// ];

// data.forEach(item => {
//     let row = document.createElement('tr');
//     ['id', 'name', 'email'].forEach(key => {
//         let cell = document.createElement('td');
//         cell.textContent = item[key];
//         row.appendChild(cell);
//     });

//     tbody.appendChild(row);
// });

// // Append thead and tbody to table
// table.appendChild(thead);
// table.appendChild(tbody);

// // Append table to the ciontainer
// container.appendChild(table);