$("#stat-sel").change(function () {
    let chosenStat = $(this).find(":selected").text();
    chosenStat = chosenStat.toLowerCase();
    showProds(products, chosenStat);
});

let makeProdCont = function (prod) {
    $("<div class='prod-cont'></div>").appendTo(".gallery__wrapper");
    $("<div class='prod-cont__stat-img'></div>").appendTo(".prod-cont:last");
    $("<div class='prod-cont__stats-cont'></div>").appendTo(".prod-cont__stat-img:last");
    if (prod.prod_status) { // if there is a product status
        if (prod.prod_status.indexOf(",") < 0) { // if there is not a coma - only one status
            $(`<h4 class="prod-cont__stat-label">${prod.prod_status}</h4>`).appendTo($(".prod-cont__stats-cont:last"));
        } else { // if there is a coma dividing more than one status
            let arr = prod.prod_status.split(',');
            $.each(arr, function (j, item) {
                $(`<h4 class="prod-cont__stat-label">${item}</h4 > `).appendTo($(".prod-cont__stats-cont:last"));
            });
        };
    };
    $("<img class='prod-cont__prod-img' src='assets/pictures/placeholder.jpg' alt='product image'>").appendTo($(".prod-cont__stat-img:last"));
    $("<div class='prod-cont__name-price'></div>").appendTo(".prod-cont:last");
    $(`<h3 class='prod-cont__prod-name'>${prod.prod_name}</h3 >`).appendTo($(".prod-cont__name-price:last"));
    $(`<span class='prod-cont__prod-price'>${prod.prod_price} zł</span>`).appendTo($(".prod-cont__name-price:last"));
};

let showProds = function (products, filter = "all") {
    $(".gallery__wrapper").empty();
    if (filter == "all") {
        $.each(products, function (i, product) {
            makeProdCont(product);
        });
    } else {
        $.each(products, function (i, product) {
            if (product.prod_status && product.prod_status.includes(filter)) { // check if item is not empty
                makeProdCont(product);
            }
        });
    };
};

let bacshowProds = function (products, filter = "all") {
    $(".gallery__wrapper").empty();
    $.each(products, function (i, product) {
        if (filter == "all") {
            makeProdCont(product);
        } else if (product.prod_status.includes(filter)) {
            makeProdCont(product);
        }
    });
};

const srcFile = "./products.json";
let products = [];
$.getJSON(srcFile, {
})
    .done(function (data) {
        products = data;
        showProds(products, "all");
    })
    .fail(function () {
        alert('Ajax call failed.');
    });
