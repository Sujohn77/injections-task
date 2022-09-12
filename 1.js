const chooseSizeHeaderId = 'choose_header_size';
const dropDownClassName = 'pdp__size-select';
const sizeOptionsClassName = 'select-size__original';

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
	    const sizeOptions = document.getElementsByClassName(sizeOptionsClassName);
	    const squaresParent = document.createElement('div');
		squaresParent.classList.add("square-parent");
			
		for(const opt of sizeOptions){
			const square = document.createElement('div');
			square.classList.add("square");
			square.innerText = opt.innerText;
			squaresParent.append(square);
			square.onclick = handleSquareClick;
		}
				
		dropDown.parentNode.insertBefore(squaresParent, dropDown.nextSibling);
		
		observer.disconnect();
	};
	
	const observer = new MutationObserver(insertSizesOptions);
	observer.observe(dropDown, config);
}


const handleSquareClick = (e) => {
	const chooseSizeHeader = document.getElementById(chooseSizeHeaderId);
	chooseSizeHeader.innerText = `size ${e.target.innerText} selected`;
}

const main = () => {
	createHeader();
	showSizeOptions();
}

document.addEventListener("DOMContentLoaded", main);