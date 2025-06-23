"use strict";
/*create the main container storing the desserts
then append it to the DOM body*/
const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';
document.body.appendChild(mainContainer);
//append the 'Desserts' h1 into the main container
const dessertsH1 = document.createElement('h1');
dessertsH1.textContent = 'Desserts';
mainContainer.appendChild(dessertsH1);
//create checkout container then append to body 
const checkoutDiv = document.createElement('div');
checkoutDiv.className = 'checkout-Div';
document.body.appendChild(checkoutDiv);
//create contents in checkoutDiv 
const yourCartH1 = document.createElement('h1');
yourCartH1.className = 'your-cart-h1';
yourCartH1.innerHTML = `Your cart (0)`;
//div to contain selected desserts
const selectedDesserts = document.createElement('div');
selectedDesserts.className = 'selected-desserts';
//create cartCount to count number of dessert types picked
let cartCount = 0;
const cakeImage = document.createElement('img');
cakeImage.src = 'assets/images/illustration-empty-cart.svg';
cakeImage.alt = 'cake icon';
const cakeText = document.createElement('p');
cakeText.className = 'cake-text';
cakeText.innerHTML = 'Your added items will appear here';
const cakeAndText = document.createElement('div');
cakeAndText.className = 'cake-and-text';
cakeAndText.append(cakeImage, cakeText);
selectedDesserts.appendChild(cakeAndText);
checkoutDiv.append(yourCartH1, selectedDesserts);
fetch('data.json')
    .then(response => response.json())
    .then((data) => {
    //logic for total price
    const selectedItems = new Map();
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.className = 'total-price-div';
    const orderTotal = document.createElement('p');
    orderTotal.textContent = 'Order-Total';
    const totalFigure = document.createElement('p');
    totalFigure.className = 'total-figure';
    totalFigure.textContent = '$0.00';
    totalPriceDiv.append(orderTotal, totalFigure);
    //carbon neutral info
    const carbonNeutral = document.createElement('div');
    carbonNeutral.className = 'carbon-neutral';
    carbonNeutral.innerHTML = `
            <img src="assets/images/icon-carbon-neutral.svg" alt="carbon neutral information">
            <p>This is a <span>carbon neutral</span> delivery</p>
        `;
    //confirm order btn
    const confirmOrder = document.createElement('button');
    confirmOrder.className = 'confirm-order';
    confirmOrder.textContent = 'Confirm Order';
    //activate confirm order btn
    confirmOrder.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'confirmation-overlay';
        //order confirmation page
        const confirmationPage = document.createElement('div');
        confirmationPage.className = 'confirmation-page';
        const icon = document.createElement('img');
        icon.src = 'assets/images/icon-order-confirmed.svg';
        icon.alt = 'order confirmed';
        const heading = document.createElement('h1');
        heading.innerHTML = 'Order <br>Confirmed';
        const message = document.createElement('p');
        message.textContent = 'We hope you enjoy your food!';
        const selectedDessertsDiv = document.createElement('div');
        selectedDessertsDiv.className = 'selectedDesserts-div';
        const receiptContainer = document.createElement('div');
        receiptContainer.className = 'receiptContainer';
        let totalAmount = 0;
        selectedItems.forEach(({ quantity, price }, name) => {
            const receiptItem = document.createElement('div');
            receiptItem.className = 'receipt-item';
            //image
            const matchedDessert = data.find(d => d.name === name);
            const itemImage = document.createElement('img');
            itemImage.className = 'receipt-thumbnail';
            itemImage.src = matchedDessert
                ? matchedDessert.image.thumbnail
                : 'assets/images/placeholder.jpg';
            itemImage.alt = 'desert image';
            //text content
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'receipt-details';
            const nameP = document.createElement('p');
            nameP.className = 'receipt-dessert-name';
            nameP.textContent = name;
            const infoP = document.createElement('p');
            infoP.innerHTML = `<span id="quantity">x${quantity}</span> <span id="price">@$${price.toFixed(2)}</span>`;
            const totalP = document.createElement('p');
            totalP.className = 'totalP';
            totalP.innerHTML = `$${(quantity * price).toFixed(2)}`;
            detailsDiv.append(nameP, infoP);
            const imageAndDetailsDiv = document.createElement('div');
            imageAndDetailsDiv.className = 'image-and-details';
            imageAndDetailsDiv.append(itemImage, detailsDiv);
            receiptItem.append(imageAndDetailsDiv, totalP);
            totalAmount += quantity * price;
            selectedDessertsDiv.appendChild(receiptItem);
        });
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.className = 'totalPriceDiv';
        totalPriceDiv.innerHTML = `Order Total: <span>$${totalAmount.toFixed(2)}</span>`;
        const startNewOrderBtn = document.createElement('button');
        startNewOrderBtn.classList = 'start-new-order-btn';
        startNewOrderBtn.textContent = 'Start new order';
        startNewOrderBtn.addEventListener('click', () => {
            location.reload();
        });
        confirmationPage.append(icon, heading, message, selectedDessertsDiv, totalPriceDiv, startNewOrderBtn);
        overlay.appendChild(confirmationPage);
        document.body.appendChild(overlay);
    });
    //logic for total figure
    function updateTotalFigure() {
        let total = 0;
        selectedItems.forEach(({ quantity, price }) => {
            total += quantity * price;
        });
        totalFigure.innerHTML = `$${total.toFixed(2)}`;
    }
    /*create 3 containers to
    group the desserts into group of 3s*/
    const container1 = document.createElement('div');
    container1.className = 'containers';
    const container2 = document.createElement('div');
    container2.className = 'containers';
    const container3 = document.createElement('div');
    container3.className = 'containers';
    const containersDiv = document.createElement('div');
    containersDiv.className = 'containers-div';
    containersDiv.append(container1, container2, container3);
    mainContainer.appendChild(containersDiv);
    /*loop through the array of objects
    to access and use its contents*/
    data.forEach((item, index) => {
        //create a separate div for each dessert
        const dessertContainer = document.createElement('div');
        dessertContainer.className = 'dessert-container';
        //create a div for each dessert image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const picture = document.createElement('picture');
        picture.innerHTML = `
                <source media="(min-width: 1024px)" srcset="${item.image.desktop}">
                <source media="(min-width: 768px)" srcset="${item.image.tablet}">
                <source media="(min-width: 359px)" srcset="${item.image.mobile}">
                <img src="${item.image.thumbnail}" alt="${item.name} thumbnail" />
            `;
        imageContainer.appendChild(picture);
        dessertContainer.appendChild(imageContainer);
        //create addToCartBtn then append to imageContainer
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.innerHTML = `
                <img src="assets/images/icon-add-to-cart.svg" alt="add to cart icon">
                <p>Add to cart</p>
            `;
        imageContainer.appendChild(addToCartBtn);
        //activate addToCartBtn
        addToCartBtn.addEventListener('click', () => {
            //style the picture of the clicked dessert
            picture.style.borderRadius = '5px';
            picture.style.border = '2px solid hsl(14, 86%, 42%)';
            //change addToCart style when clicked
            addToCartBtn.innerHTML = '';
            const quantityControls = document.createElement('button');
            quantityControls.className = 'add-to-cart-btn';
            //styles for quantityControls btn
            quantityControls.style.background = 'hsl(14, 86%, 42%)';
            quantityControls.style.gap = '10px';
            //decrement btn
            const decrementBtn = document.createElement('button');
            decrementBtn.className = 'decrement-btn';
            const decrementIcon = document.createElement('img');
            decrementIcon.src = 'assets/images/icon-decrement-quantity.svg';
            decrementIcon.alt = 'decrement icon';
            decrementBtn.appendChild(decrementIcon);
            //const create a counter for when increment or decrement is clicked
            let count = 1;
            selectedItems.set(item.name, { quantity: count, price: item.price });
            updateTotalFigure();
            const counter = document.createElement('p');
            counter.className = 'counter';
            counter.textContent = `${count}`;
            //create increment btn
            const incrementBtn = document.createElement('button');
            incrementBtn.className = 'increment-btn';
            const incrementIcon = document.createElement('img');
            incrementIcon.src = 'assets/images/icon-increment-quantity.svg';
            incrementIcon.alt = 'increment icon';
            incrementBtn.appendChild(incrementIcon);
            quantityControls.append(decrementBtn, counter, incrementBtn);
            addToCartBtn.replaceWith(quantityControls);
            /*increment the cartCount with every dessert type picked
            then use template literal to update yourCartH1*/
            cartCount++;
            const yourCartH1 = document.querySelector('.your-cart-h1');
            if (yourCartH1) {
                yourCartH1.textContent = `Your cart (${cartCount})`;
            }
            /*remove cakeAndText container
            when addToCart btn is clicked*/
            const cakeAndText = document.querySelector('.cake-and-text');
            if (cakeAndText) {
                cakeAndText.remove();
            }
            /*create a div for each dessert selected*/
            let dessertDiv = null;
            function updateCheckoutInfo() {
                if (dessertDiv) {
                    dessertDiv.innerHTML = `
                            <div>
                                <p id="item-name">${item.name}</p>
                                <p><span id="number">x${count}</span> <span id="price">@$${item.price}</span> <span id="totalPrice">= $${item.price * count}</span></p>
                            </div>
                            <button><img src="assets/images/icon-remove-item.svg" alt="remove icon"></button>
                        `;
                }
            }
            const selectedDesserts = document.querySelector('.selected-desserts');
            if (selectedDesserts) {
                dessertDiv = document.createElement('div');
                dessertDiv.className = 'dessert-div';
                selectedDesserts.appendChild(dessertDiv);
                updateCheckoutInfo();
            }
            //activate decrement and increment btns
            incrementBtn.addEventListener('click', () => {
                count++;
                counter.textContent = `${count}`;
                if (count === 1 && !dessertDiv) {
                    dessertDiv = document.createElement('div');
                    dessertDiv.className = 'dessert-div';
                    selectedDesserts.appendChild(dessertDiv);
                }
                updateCheckoutInfo();
                selectedItems.set(item.name, { quantity: count, price: item.price });
                updateTotalFigure();
            });
            decrementBtn.addEventListener('click', () => {
                if (count > 0) {
                    count--;
                    counter.textContent = `${count}`;
                    if (count === 0) {
                        selectedItems.delete(item.name);
                        dessertDiv === null || dessertDiv === void 0 ? void 0 : dessertDiv.remove();
                        dessertDiv = null;
                    }
                    else {
                        selectedItems.set(item.name, { quantity: count, price: item.price });
                        updateCheckoutInfo();
                    }
                    updateTotalFigure();
                }
            });
            checkoutDiv.append(totalPriceDiv, carbonNeutral, confirmOrder);
        });
        //create a div for details for each dessert
        const dessertDetails = document.createElement('div');
        dessertDetails.className = 'dessert-details';
        const dessertCategory = document.createElement('p');
        dessertCategory.className = 'dessert-category';
        dessertCategory.textContent = `${item.category}`;
        const dessertName = document.createElement('h2');
        dessertName.className = 'dessert-name';
        dessertName.textContent = `${item.name}`;
        const dessertPrice = document.createElement('p');
        dessertPrice.className = 'dessert-price';
        dessertPrice.textContent = `$${item.price}`;
        dessertDetails.append(dessertCategory, dessertName, dessertPrice);
        dessertContainer.appendChild(dessertDetails);
        if (index % 3 === 0) {
            container1.appendChild(dessertContainer);
        }
        else if (index % 3 === 1) {
            container2.appendChild(dessertContainer);
        }
        else {
            container3.appendChild(dessertContainer);
        }
    });
});
