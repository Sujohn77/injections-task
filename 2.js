const getNumberFromString = (str) => {
	return Number(str.replace(" ","").match(/\d+/)[0])
}

const updateDiscounts = () => {
	const productPrices = document.querySelectorAll('div.product-card__price');
	const discounts = document.getElementsByClassName('discount')
	
	for(let index = discounts.length; index < productPrices.length; index++){
		const productPrice = productPrices[index]
		const oldPrice = getNumberFromString(productPrice.children[0].innerText);
		const actualPrice = getNumberFromString(productPrice.children[2].innerText);
		const discount = 100 *  (1 - actualPrice / oldPrice);

		const productCard = productPrice.closest('div.product-card');
		const discountElement = document.createElement('div');
			
		discountElement.innerText = Math.round(discount) + '%';
		discountElement.classList.add('discount');
			
		productCard.appendChild(discountElement);
	}
}

const handleProductUpdate = (mutationList, observer) => {
	const panelElement = document.getElementsByClassName('panel-product')[0];
	const discountElements = document.getElementsByClassName('discount');
	console.log(panelElement.children.length -1 - discountElements.length);
	
	if(panelElement.children.length -1 > discountElements.length){
		updateDiscounts();
	}
};

const main = () => {
	const rootElement = document.getElementById('container');
	const config = { childList: true, attributes: true, subtree: true };
	const observer = new MutationObserver(handleProductUpdate);
	
	observer.observe(rootElement, config);
}


document.addEventListener("DOMContentLoaded", main);