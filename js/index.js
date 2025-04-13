// *HTML elements

var nameInput = document.querySelector(".form-control");
var urlInput = document.querySelector(".urlInput");
var bookContainer = document.querySelector(".bookContainer");
var searchInput = document.querySelector(".search");
var addBtn = document.querySelector(".btn1");
var updateBtn = document.querySelector(".btn2");
var siteNameRegex = /^[A-Z][a-z]{3,8}$/;
var siteUrlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

// ^app variables

var bookList = JSON.parse(localStorage.getItem("books")) || [];

// &Functions
addBtn.addEventListener("click", function addBook() {
  if (validate(siteNameRegex, nameInput) && validate(siteUrlRegex, urlInput)) {
    var book = {
      name: nameInput.value,
      link: urlInput.value,
    };

    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
    clearInput();
    displayAllBook();
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Book added successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter a valid name and URL.",
      confirmButtonColor: "#d33",
    });
  }
});

function displayBook(index) {
  var displayHtml = `
                <tr>
                <td class="Index">${index + 1}</td>
                <td class="Name">${bookList[index].name}</td>
                <td>
                  <button
                    class="btn btn-visit d-flex justify-content-center align-items-center m-auto gap-1" onclick="visitSite(${index})"
                  >
                    <i class="fa-regular fa-eye"></i>Visit
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-delete d-flex justify-content-center align-items-center m-auto gap-1" onclick="deleteBook(${index})"
                  >
                  <i class="fa-regular fa-trash-can"></i>Delete
                  </button>
                </td>
                                <td>
                  <button
                    class="btn btn-update d-flex justify-content-center align-items-center m-auto gap-1" onclick="getBookInfo(${index})"
                  >
                  <i class="fa-regular fa-trash-can"></i>Update
                  </button>
                </td>
              </tr>`;
  bookContainer.innerHTML += displayHtml;
}

function displayAllBook() {
  bookContainer.innerHTML = "";
  for (var i = 0; i < bookList.length; i++) {
    displayBook(i);
  }
}
displayAllBook();

function clearInput() {
  nameInput.value = "";
  nameInput.classList.remove("is-valid");
  urlInput.value = "";
  urlInput.classList.remove("is-valid");
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  bookContainer.innerHTML = "";
  displayAllBook();
  Swal.fire({
    icon: "success",
    title: "Deleted!",
    text: "The bookmark has been deleted.",
    timer: 2000,
    showConfirmButton: false,
  });
}

function visitSite(index) {
  window.open(bookList[index].link, "_blank");
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
searchInput.addEventListener("input", function searchProducts() {
  bookContainer.innerHTML = "";
  for (var i = 0; i < bookList.length; i++) {
    if (
      bookList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      displayBook(i);
    }
  }
});

var updatedIndex;
function getBookInfo(i) {
  updatedIndex = i;
  nameInput.value = bookList[i].name;
  urlInput.value = bookList[i].link;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
updateBtn.addEventListener("click", function updateurl() {
  if (validate(siteNameRegex, nameInput) && validate(siteUrlRegex, urlInput)) {
    bookList[updatedIndex].name = nameInput.value;
    bookList[updatedIndex].link = urlInput.value;
    localStorage.setItem("books", JSON.stringify(bookList));
    bookContainer.innerHTML = "";
    displayAllBook();
    clearInput();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Bookmark updated successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Input!",
      text: "Please enter a valid site name and URL.",
      confirmButtonColor: "#d33",
    });
  }
});
