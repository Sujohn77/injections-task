const chooseSizeHeaderId = 'choose_header_size';
const dropDownClassName = 'pdp__size-select';
const sizeOptionsClassName = 'vanilla-js-dropdown__list-item';

const createHeader = () => {
	const fieldSet = document.getElementsByClassName(dropDownClassName)[0];
	const header = document.createElement('h3');
	
	header.innerText = 'Choose size';
	header.setAttribute('id', chooseSizeHeaderId);
	
	fieldSet.parentNode.insertBefore(header, fieldSet);
}

const showSizeOptions = () => {
	const dropDown = document.getElementsByClassName(dropDownClassName)[0];
	const config = { attributes: true, childList: true, subtree: true };
	
	const insertSizesOptions = (mutationList, observer) => {
	    const listItems = document.getElementsByClassName(sizeOptionsClassName);
	    const squaresParent = document.createElement('div');
		squaresParent.classList.add("square-parent");

		for(const listItem of listItems){
			if(listItem.className.indexOf('input-container__mobile-label') == -1){
				const square = document.createElement('div');
				
				if(listItem.hasAttribute('data-disabled')){
				   square.classList.add("square-disabled");
				} else {
				   square.classList.add("square");
				   square.onclick = handleSquareClick;
				}
				square.innerText = listItem.innerText.match(/\d+/)[0];
				squaresParent.append(square);
				
			}
		}
				
		dropDown.parentNode.insertBefore(squaresParent, dropDown.nextSibling);
		
		observer.disconnect();
	};
	
	const observer = new MutationObserver(insertSizesOptions);
	observer.observe(dropDown, config);
}


const handleSquareClick = (e) => {
	const value = e.target.innerText;
	const chooseSizeHeader = document.getElementById(chooseSizeHeaderId);
	const listItems = document.getElementsByClassName(sizeOptionsClassName);
	
	for(const listItem of listItems){
		if(listItem.innerText === value){
			listItem.click();
		}
	}
	
	chooseSizeHeader.innerText = `size ${e.target.innerText} selected`;
}

const main = () => {
	createHeader();
	showSizeOptions();
}

document.addEventListener("DOMContentLoaded", main);