// Array of country names
const countryNames = ["India", "Jamaica", "France", "Japan"];

// Object containing states for each country
const states = {
  India: ["Gujarat", "Maharastra", "Rajasthan"],
  Jamaica: ["Kingston", "StAndrew", "Portland"],
  France: ["Corsica", "Mayotte", "Martinique"],
  Japan: ["Hokkaido", "Yamagata", "Tokyo"],
};

// Object containing cities for each state
const cities = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Maharastra: ["Mumbai (Bombay)", "Pune", "Nagpur", "Thane"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"],
  Kingston: ["Kingston", "Montego Bay", "Spanish Town", "Portmore"],
  StAndrew: ["Constant Spring", "Papine", "Mona", "New Kingston"],
  Portland: ["Port Antonio", "Buff Bay", "Manchioneal", "Fairy Hill"],
  Corsica: ["Ajaccio", "Bastia", "Calvi", "Corte"],
  Mayotte: ["Mamoudzou", "Dzaoudzi", "Koungou", "Dembeni"],
  Martinique: ["Fort-de-France", "Le Lamentin", "Le Robert", "Sainte-Marie"],
  Hokkaido: ["Sapporo", "Hakodate", "Asahikawa", "Otaru"],
  Yamagata: ["Sakata", "Tsuruoka", "Yonezawa", "Shinjo"],
  Tokyo: ["Shinjuku", "Shibuya", "Shinagawa", "Meguro"],
};

// Adding default data and calling search method
$(document).ready(function () {
  addDefaultData();
  onSearchButton();
});

// Function called when the country dropdown value is changed
$('select[name="country"]').change(function () {
  onCountrySelected();
  onStateSelected();
});

// Function called when the state dropdown value is changed
$('select[name="state"]').change(function () {
  onStateSelected();
});

// Function called when the form is submitted
$('[name="submit"]').click(function (event) {
  event.preventDefault();
  onFormSubmission();
});

// Function called when the sort dropdown value is changed
$('select[name="sort"]').change(function () {
  sortTable();
});

// Addind default data into the table
function addDefaultData() {
  const defaultData1 = [
    {
      name: "Bhumi",
      email: "bhumi@gmail.com",
      gender: "Female",
      hobby: ["Reading"],
      dob: "2002-11-10",
      country: "India",
      state: "Gujarat",
      city: "Surat",
    },
  ];
  const defaultData2 = [
    {
      name: "Harsh",
      email: "harsh@gmail.com",
      gender: "Male",
      hobby: ["Travelling", "Reading"],
      dob: "2003-11-16",
      country: "India",
      state: "Rajasthan",
      city: "Jodhpur",
    },
  ];
  addRow(defaultData1);
  addRow(defaultData2);

  // Populating country dropdown
  let countryDropdown = $('select[name="country"]');
  for (let i = 0; i < countryNames.length; i++) {
    let option = countryNames[i];
    let ele = $("<option>");

    ele.text(option);
    ele.val(option);
    countryDropdown.append(ele);
  }
}

let rowCount = 0;
let allRowId = [];

// Function to add row
function addRow(rowData) {
  const tableBody = $('tbody[name="table_body"]');
  let tr = $("<tr>");
  let rowId = `row_${rowCount}`;
  tr.attr("id", rowId); // Assigning unique ID to each row
  allRowId.push(rowId);
  rowCount++;

  for (let property in rowData[0]) {
    let td = $("<td>");
    td.attr("id", property);
    let tdText = rowData[0][property];
    td.text(tdText);
    tr.append(td);
  }

  const editButton = $("<button>");
  editButton.text("Edit");
  editButton.css({ color: "blue" });
  editButton.click(function () {
    onEditClick(rowId);
  });

  const deleteButton = $("<button>");
  deleteButton.text("Delete");
  deleteButton.css({ color: "red" });
  deleteButton.click(function () {
    const rowToRemove = $("#" + rowId);
    rowToRemove.remove();
    let index = allRowId.indexOf(rowId);
    if (index !== -1) {
      allRowId.splice(index, 1);
    }
  });

  let editButtonTd = $("<td>");
  editButtonTd.append(editButton);
  let deleteButtonTd = $("<td>");
  deleteButtonTd.append(deleteButton);

  tr.append(deleteButtonTd);
  tr.append(editButtonTd);

  tableBody.append(tr);
}

// Function to populate state dropdown when country is changed
function onCountrySelected() {
  let selectedCountry = $('select[name="country"]').val();
  let stateDropdown = $('select[name="state"]');
  let currentStates = [];
  stateDropdown.empty();
  if (selectedCountry) {
    currentStates = states[selectedCountry];
    for (let i = 0; i < currentStates.length; i++) {
      let state = currentStates[i];
      let element = $("<option>");
      element.text(state);
      element.val(state);
      stateDropdown.append(element);
    }
  }
}

// Function to populate city dropdown when state is changed
function onStateSelected() {
  let selectedState = $('select[name="state"]').val();
  let cityDropdown = $('select[name="city"]');
  let currentCity = [];
  cityDropdown.empty();
  if (selectedState) {
    currentCity = cities[selectedState];
    for (let i = 0; i < currentCity.length; i++) {
      let city = currentCity[i];
      let element = $("<option>");
      element.text(city);
      element.val(city);
      cityDropdown.append(element);
    }
  }
}

// Function called when the form is submitted
function onFormSubmission() {
  console.log("submit button is called");
  data = getDataFromForm();

  isValid = validationOfForm(data[0]);
  if (isValid) {
    addRow(data);
    resetForm();
  }
}

// Function to get data from the form
function getDataFromForm() {
  let peopleData = [];
  let hobbies = [];
  let person = {};
  let form = $('[name="myform"]');
  let elements = form.find("input, select");

  elements.each(function () {
    let item = $(this);
    if (item.is(":radio")) {
      if (item.is(":checked")) {
        person[item.attr("name")] = item.val();
      }
    } else if (item.is(":checkbox")) {
      if (item.is(":checked")) {
        hobbies.push(item.val());
      }
      person["hobby"] = hobbies;
    } else if (item.attr("name") !== "submit") {
      person[item.attr("name")] = item.val();
    }
  });

  if (!person["gender"]) {
    person["gender"] = "";
  }

  peopleData.push(person);
  return peopleData;
}

function resetForm() {
  $('[name="myform"]').trigger("reset");
  $('[name="state"]').empty();
  $('[name="city"]').empty();
}

function onEditClick(rowId) {
  // Update button
  $('[name="submit"]').hide();
  let updateButton = $('[name="update"]');
  updateButton.show();
  updateButton.off("click");
  updateButton.click(function (event) {
    event.preventDefault();
    onUpdateClicked(rowId);
  });
  let cancelButton = $('[name="cancel"]');
  cancelButton.show();
  cancelButton.click(function () {
    resetForm();
  });

  const row = $("#" + rowId);

  let formData = getDataFromRow(row);

  let formElement = $('form[name="myform"]').find("input, select");
  for (let i = 0; i < formElement.length; i++) {
    let item = formElement[i];
    let fieldName = item.name;
    if (fieldName in formData) {
      if (item.type === "checkbox") {
        item.checked = false;
        let hobbies = formData[fieldName];
        console.log(hobbies);
        for (let j = 0; j < hobbies.length; j++) {
          if (hobbies[j] === item.value) {
            item.checked = true;
            break;
          }
        }
      } else if (item.type === "radio") {
        if (item.value == formData[fieldName]) {
          item.checked = true;
        }
      } else if (
        fieldName === "country" ||
        fieldName === "state" ||
        fieldName === "city"
      ) {
        item.value = formData[fieldName];

        item.dispatchEvent(new Event("change"));
      } else {
        item.value = formData[fieldName];
      }
    }
  }
}

// Getting data from row for editing 
function getDataFromRow(row) {
  const rowData = {};
  // Loop through each cell in the row and extract data
  row.find("td").each(function () {
    const cell = $(this);
    const property = cell.attr("id");
    let value = cell.text();
    if (property === "hobby") {
      value = value.split(","); // Split hobbies by comma without space
    }
    rowData[property] = value;
  });
  return rowData;
}

// When update button is clicked 
function onUpdateClicked(rowId) {
  updatedData = getDataFromForm();
  const row = $("#" + rowId);
  const cells = row.find("td");

  for (let property in updatedData[0]) {
    const cell = findCell(cells, property);
    if (cell) {
      $(cell).text(updatedData[0][property]);
    }
  }
  $('[name="update"]').hide();
  $('[name="cancel"]').hide();
  $('[name="submit"]').show();
  resetForm();
}

// Function to find the correct cell
function findCell(cells, property) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].id === property) {
      return cells[i];
    }
  }
  return null;
}

// Function to check validation of form
function validationOfForm(data) {
  const re = /\S+@\S+\.\S+/;
  let isValid = true;
  let errorMessages = $(".error_message");

  errorMessages.text("");

  for (let property in data) {
    let gettingFieldId = `${property}_error`;
    let errorMessageElement = $(`[name="${gettingFieldId}"]`);

    // Check if the field is empty or "select"
    if (data[property] == "" || data[property] == "select") {
      errorMessageElement.text(`${property} is required`);
      isValid = false;
    } else if (property == "email") {
      // Validate email format
      isEmailValid = re.test(data[property]);
      if (!isEmailValid) {
        errorMessageElement.text("Please enter a valid email");
        isValid = false;
      }
    }
  }

  return isValid;
}

// Function to search through table
function onSearchButton() {
  $('[name="search"]').on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $('tbody[name="table_body"] tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
}

// Function to sort table
function sortTable() {
  const sortingOrder = $('[name="sort"]').val();

  let names = {};
  const tableBody = $('tbody[name="table_body"]');
  for (let i = 0; i < allRowId.length; i++) {
    let trId = allRowId[i];
    let row = $("#" + trId);
    const cells = row.find("td");
    const nameCell = cells.eq(0).text();
    names[trId] = nameCell;
  }
  let sortArray = Object.entries(names);
  function compareValues(a, b) {
    return a[1].localeCompare(b[1]);
  }
  sortArray.sort(compareValues);
  if (sortingOrder == "descending") {
    sortArray.reverse();
  }
  sortArray.forEach(([trId, name]) => {
    tableBody.append($("#" + trId));
  });
}
