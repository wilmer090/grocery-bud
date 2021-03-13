const field = document.getElementById('grocery');
const list = document.getElementById('list');
const alert = document.getElementById('alert');
const clearBtn = document.getElementById('clearBtn');
const form = document.getElementById('form');
const deleteBtn = document.getElementsByClassName('btn-delete');
// getList();
window.addEventListener('DOMContentLoaded', ()=>{
	setUpItems();
	clearList();
	callDeleteBtn();
});

form.addEventListener('submit', (e)=>{

	e.preventDefault();

	if(field.value === '') return

	const value = field.value.charAt(0).toUpperCase() + field.value.slice(1);
	let ID = new Date().getTime().toString();

	createListItems(ID,value);
	addtoLocal(ID,value);
	clearField();
	callDeleteBtn();
});


addtoLocal = (id, value) =>{
	
	const grocery = {id, value};
	let items = getFromStorage();
	items.push(grocery);

	localStorage.setItem('list', JSON.stringify(items));
	clearList();
	alertFunction('New item added to the list', 'success');
}
clearField = ()=>{
	field.value = '';
}
removeFromStorage = (id)=>{

}
getFromStorage = ()=>{
	return localStorage.getItem('list')? 
	JSON.parse(localStorage.getItem('list')):[];
}
function setUpItems(){
	let items = getFromStorage();

	if(items.length > 0){
		items.forEach(item =>{
			createListItems(item.id,item.value);
		});
	}
}
function clearList(){
	let items = getFromStorage();

	if(items.length >= 1){

		clearBtn.addEventListener('click', clearListFunction);

		clearBtn.innerHTML = 'Clear items';
		clearBtn.style.visibility = 'visible';
	}else{
		clearBtn.style.visibility = 'hidden';
		alertFunction('Empty list', 'danger');
	}

}

function clearListFunction(){
	
	let items = document.querySelectorAll('.grocery-item');
	items.forEach(item=>{
		list.removeChild(item);
	})
	
	localStorage.clear();
	clearBtn.style.visibility = 'hidden';
	alertFunction('Empty list', 'danger');
}
createListItems = (id, value) =>{

	const element = document.createElement('article');
	element.classList.add('grocery-item');
	const attr = document.createAttribute('data-id');
	attr.value = id;
	element.setAttributeNode(attr);
	element.innerHTML = `
			<p class="title">${value}</p>
			<button class='btn-delete'><i class="fa fa-trash"></i></button>
	`;
	list.appendChild(element);

}
function callDeleteBtn(){
	return Array.from(deleteBtn).forEach(btn=>{
	btn.addEventListener('click', deleteBtnFunction);
	})
}
function deleteBtnFunction(e){
	let target = e.currentTarget.parentElement.getAttribute('data-id');
	e.currentTarget.parentElement.style.display = 'none';
	deleteData(target);	

}
function deleteData(target){
	// let key = target.toString();
	// localStorage.removeItem(key);
	let items = JSON.parse(localStorage.getItem('list'));

	let newItems = items.filter(item=>{
			
			if(item.id != target){
				return item;
			}	
	});

	localStorage.setItem('list', JSON.stringify(newItems));
	clearList();
	alertFunction('item removed','danger');
}

alertFunction = (text,action)=>{
	alert.classList.add(`alert-${action}`);
	alert.textContent = text;

	setTimeout(function(){
		alert.textContent = '';
		alert.classList.remove(`alert-${action}`);
	},1000);


}