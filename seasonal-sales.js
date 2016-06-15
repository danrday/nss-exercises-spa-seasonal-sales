var productArea = document.getElementById("productArea");
var discountSelect = document.getElementById("discountArea");

discountSelect.addEventListener("change", applyDiscount);

var newProductData = null;

function testerFunc () {
  console.log("newproductData type", typeof(newProductData));
  console.log("productData type", typeof(productData));
  console.log(productData);
}


//creates a new array with the updated discount prices. Tried modifying the original newProductData items by creating a cloned array, but that changed the original as well, presumably because both referred to the same inner objects?? 
//so I had to get the values from each object I wanted to change and pass those values to a new object (var newObject) so it wouldn't overwrite the original newProductData.
//finally, the function adds all the other objects to the new array that will not be modified. then we can print the new array to the DOM.
function applyDiscount() {

  var newArray = new Array();

 console.log("before product data", newProductData);

  for (var i = 0; i < newProductData.length; i++) {
    console.log("testing apply Discount");
    if (discountSelect.value === "Spring") {
      if (newProductData[i].category_id === 3) {
       
        var productPrice = newProductData[i].price;
        
        var newObject = {
          "id": newProductData[i].id,
          "name": newProductData[i].name,
          "price": productPrice,
          "category_id": newProductData[i].category_id
        }

        newArray.push(newObject);

        newArray[newArray.length -1].price = (productPrice - (productPrice * .15)).toFixed(2);
      } else {newArray.push(newProductData[i])};
    }

    else if (discountSelect.value === "Autumn") {
      if (newProductData[i].category_id === 2) {
       
        var productPrice = newProductData[i].price;
        
        var newObject = {
          "id": newProductData[i].id,
          "name": newProductData[i].name,
          "price": productPrice,
          "category_id": newProductData[i].category_id
        }

        newArray.push(newObject);

        newArray[newArray.length -1].price = (productPrice - (productPrice * .25)).toFixed(2);
      } else {newArray.push(newProductData[i])};
    } 
     else if (discountSelect.value === "Winter") {
      if (newProductData[i].category_id === 1) {
       
        var productPrice = newProductData[i].price;
        
        var newObject = {
          "id": newProductData[i].id,
          "name": newProductData[i].name,
          "price": productPrice,
          "category_id": newProductData[i].category_id
        }

        newArray.push(newObject);

        newArray[newArray.length -1].price = (productPrice - (productPrice * .10)).toFixed(2);
      } else {newArray.push(newProductData[i])};
    } 

  }

    productArea.innerHTML = "";
    printDepartments();

    console.log("newArray type", typeof(newArray));
    console.log("newArray after", newArray);
    printProducts(newArray);
};



function productsPrint() {
  newProductData = JSON.parse(event.target.responseText);  //get and parse JSON data file
  newProductData = newProductData.products.slice(0);
  printProducts(newProductData);
};

function printProducts(dataArray) {
  
  for (var i =0; i < dataArray.length; i++) {
    console.log("dataArray[i]", dataArray[i]);
    if (dataArray[i].category_id === 1) {
      var dept = document.getElementById("div-Apparel")
      dept.innerHTML += `<p>${dataArray[i].name}: $${dataArray[i].price}</p>`;
    } else if (dataArray[i].category_id === 2) {
      var dept = document.getElementById("div-Furniture")
      dept.innerHTML += `<p>${dataArray[i].name}: $${dataArray[i].price}</p>`;
    } else if (dataArray[i].category_id === 3) {
      var dept = document.getElementById("div-Household")
      dept.innerHTML += `<p>${dataArray[i].name}: $${dataArray[i].price}</p>`;
    } 
  }
};


var deptCategories = [];

var deptData = [];

function departmentsPrint() {
  deptData = JSON.parse(event.target.responseText);   //get and parse JSON data file
  printDepartments();
};

function printDepartments() {
 
  var newHTML = "";  //newHTML will be the final result added to the DOM

  deptCategories = deptData["categories"]

  for (var x in deptCategories) {
    var deptName = deptCategories[x]["name"];
    productArea.innerHTML += `<div id="div-${deptName}"><h1>${deptName}</h1></div>`;
  };

  //makes sure that departmentsPrint loads first, and calls productsRequest after departmantsPrint finishes running //
  productsRequest.addEventListener("load", productsPrint);
};



function failToLoad () {
  alert("XHR failed to load.");
};


// Create an XHR object
var departmentsRequest = new XMLHttpRequest();
var productsRequest = new XMLHttpRequest();

// XHR objects emit events when their operation is complete, or an error occurs
departmentsRequest.addEventListener("load", departmentsPrint);
departmentsRequest.addEventListener("error", failToLoad);


productsRequest.addEventListener("error", failToLoad);


// Then tell the XHR object exactly what to do
departmentsRequest.open("GET", "departments.json");
productsRequest.open("GET", "products.json");

// Tell the XHR object to start
departmentsRequest.send();
productsRequest.send();