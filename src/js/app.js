const srcFile = "./products.json";
var products = [];
var productsQty = 0;
var productsIndex = 0;
var chosenStat = 'all';



$("#stat-sel").change(function () {
    chosenStat = $(this).find(":selected").text();
    chosenStat = chosenStat.toLowerCase();
    productsIndex = 0;
    $(".gallery__wrapper").empty();
    showProducts(products, chosenStat, productsIndex);
    lastContainerObserver.observe(document.querySelector(".prod-cont:last-child"));

});

fetchProducts = async () => {
    try {
        const res = await fetch(srcFile);
        products = await res.json();
        productsQty = Object.keys(products).length - 2;
        $(".gallery__wrapper").empty();
        showProducts(products, chosenStat, productsIndex);
        lastContainerObserver.observe(document.querySelector(".prod-cont:last-child"));
    } catch (e) {
        console.log('ERROR!!', e);
    }
};

fetchProducts();

function showProducts(products, filter = "all", index) {
    let lazyCounter = 0;
    if (filter == "all") { // if there is "all" - no filter selected
        for (index; index <= productsQty; index++) {
            makeProductContainer(products[index]);
            lazyCounter += 1;
            if (lazyCounter >= 12 || index == productsQty) {
                return productsIndex = index + 1; //change starting point for next
            }
        };
    } else { // if there is a filter selected
        for (index; index <= productsQty; index++) {
            if (products[index].prod_status && products[index].prod_status.includes(filter)) { // check if item is not empty
                makeProductContainer(products[index]);
                lazyCounter += 1;
            };
            if (lazyCounter >= 12 || index == productsQty) {
                return productsIndex = index + 1; //change starting point for next
            }
        };
    };
};

function makeProductContainer(prod) {
    $("<div class='prod-cont'></div>").appendTo(".gallery__wrapper");
    $("<div class='prod-cont__stat-img'></div>").appendTo(".prod-cont:last");
    $("<div class='prod-cont__stats-cont'></div>").appendTo(".prod-cont__stat-img:last");
    if (prod.prod_status) { // if there is a product status
        if (prod.prod_status.indexOf(",") < 0) { // if there IS NOT a coma - only one status
            $(`<h4 class="prod-cont__stat-label">${prod.prod_status}</h4>`).appendTo($(".prod-cont__stats-cont:last"));
        } else { // if there IS a coma dividing - more than one status
            let arr = prod.prod_status.split(',');
            $.each(arr, function (j, item) {
                $(`<h4 class="prod-cont__stat-label">${item}</h4 > `).appendTo($(".prod-cont__stats-cont:last"));
            });
        };
    };
    $("<img class='prod-cont__prod-img' loading='auto' src='assets/images/placeholder.png' alt='product image'>").appendTo($(".prod-cont__stat-img:last"));
    $("<div class='prod-cont__name-price'></div>").appendTo(".prod-cont:last");
    $(`<h3 class='prod-cont__prod-name'>${prod.prod_id}. ${prod.prod_name}</h3 >`).appendTo($(".prod-cont__name-price:last"));
    $(`<span class='prod-cont__prod-price'>${prod.prod_price} zł</span>`).appendTo($(".prod-cont__name-price:last"));
};

const lastContainerObserver = new IntersectionObserver(entries => {
    const lastContainer = entries[0]
    if (!lastContainer.isIntersecting) return
    showProducts(products, chosenStat, productsIndex)
    lastContainerObserver.unobserve(lastContainer.target)
    lastContainerObserver.observe(document.querySelector(".prod-cont:last-child"))
},
    {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    })
