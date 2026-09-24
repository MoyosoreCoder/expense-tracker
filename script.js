//form
const expenseForm = document.querySelector("#expenseForm");

//table
const expenseTableBody = document.querySelector("#expenseTableBody");

//total summary of expenses
const totalExpenses = document.querySelector("#totalExpenses");

let total = 0;

// the temporary database
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// click event on form
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const expenseName = document.querySelector("#expenseName").value;
  const amount = Number(document.querySelector("#amount").value);
  const category = document.querySelector("#category").value;
  const date = document.querySelector("#date").value;

  expenses.push({
    id: Date.now(),
    expenseName: expenseName,
    amount: amount,
    category: category,
    date: date,
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayTable();

  expenseForm.reset();
});

function deleteExpense(id) {
  let filterExpense = expenses.filter((expense) => {
    //return other non deleted expense
    return expense.id !== id;
  });
  expenses = filterExpense;
  localStorage.setItem("expenses", JSON.stringify(expenses));
  console.log(expenses);
  displayTable();
}


function displayTable() {
  // this is necessary not to go over duplicate items
  expenseTableBody.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.expenseName}</td>
         <td>₦${expense.amount.toLocaleString()}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button onclick="deleteExpense(${expense.id})">DELETE</button></td>

        `;

    expenseTableBody.appendChild(row);
  });
  // after table, display amount total for each data
  expenseTotal();
}
function expenseTotal() {
  total = 0;
  expenses.forEach((expense) => {
    total += expense.amount;
  });
  totalExpenses.textContent = `₦${total.toFixed(2)}`;
}

displayTable();
