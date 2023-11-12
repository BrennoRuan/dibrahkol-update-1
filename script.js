function searchProducts() {
  var searchTerm = document
     .getElementById("product-search")
     .value.toLowerCase();
 
  // Itera sobre todas as seções e verifica se o produto está presente
  var sections = document.querySelectorAll("main > section");
  sections.forEach(function (section) {
     var products = section.querySelectorAll(".product-container");
 
     if (searchTerm === "") {
       products.forEach(function (product) {
         product.style.display = "block";
       });
       return;
     }
 
     products.forEach(function (product) {
       var productTitle = product
         .querySelector(".product-title")
         .innerText.toLowerCase();
       var productPrice = product
         .querySelector(".product-price")
         .innerText.toLowerCase();
 
       if (
         productTitle.includes(searchTerm) ||
         productPrice.includes(searchTerm)
       ) {
         // Exibe a caixa de produto relevante
         product.style.display = "block";
 
         // Cria um parágrafo para mostrar os detalhes do produto na área de resultados
         var resultParagraph = document.createElement("p");
         resultParagraph.innerHTML = product.innerHTML;
         searchResultsContainer.appendChild(resultParagraph);
       } else {
         // Oculta os produtos que não correspondem à pesquisa
         product.style.display = "none";
       }
     });
  });
 }
 
 var clearButton = document.getElementById('clear-button');
 clearButton.addEventListener('click', function() {
  document.getElementById('product-search').value = "";
 })



let products = JSON.parse(localStorage.getItem('products')) || [];

        function renderProducts() {
            $('#productsList').empty();
            products.forEach(product => {
                let listItem = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center');
                listItem.text(product.name + ' - Quantidade: ' + product.quantity + ' ' + product.unit);
                listItem.append('<button class="btn btn-danger btn-sm delete-product" data-index="' + products.indexOf(product) + '">Remover</button>');
                $('#productsList').append(listItem);
            });
        }

        renderProducts();

        $('#addProduct').on('click', function() {
            let product = {
                name: $('#productName').val(),
                value: parseFloat($('#productValue').val()),
                quantity: parseInt($('#productQuantity').val()),
                unit: $('#productUnit').val()
            };
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
            $('#addModal').modal('hide');
            renderProducts();
        });

        $('#productsList').on('click', '.delete-product', function() {
            let index = $(this).data('index');
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        });

        