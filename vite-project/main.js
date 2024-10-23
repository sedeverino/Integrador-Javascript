import { handleGetProductLocalStorage, setInLocalStorage } from "./src/persistence/localStorage";
import { renderCategories } from "./src/services/categories";
import { handleGetProductsToStore, handleRenderList } from "./src/views/store";
import { handleSearchProductByName } from "./src/services/searchBar";
import '/style.css'

export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};

export let productoActivo = null;

export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
};


handleGetProductsToStore();
renderCategories();

const buttonAdd = document.getElementById('buttonAddElement');

buttonAdd.addEventListener('click', () => {
    openModal();
})

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', () => {
    closeModal();
})

export const openModal = () => {
    const modal = document.getElementById('modalPopUP');
    modal.style.display = "flex";
    const buttonDelete = document.getElementById('deleteButton');

    if(productoActivo){
        buttonDelete.style.display = 'block';
    } else {
        buttonDelete.style.display = 'none';
    }


    if(productoActivo){
        const nombre = document.getElementById("nombre"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categories = document.getElementById("categoria");
        nombre.value=productoActivo.nombre;
        imagen.value=productoActivo.imagen;
        precio.value=productoActivo.precio;
        categories.value =productoActivo.categories;
    }
}

export const closeModal = () => {
    const modal = document.getElementById('modalPopUP');
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
}

const resetModal = () => {
    const nombre = document.getElementById("nombre"),
    imagen = document.getElementById("img"),
    precio = document.getElementById("precio"),
    categories = document.getElementById("categoria");

    nombre.value="";
    imagen.value="";
    precio.value=0;
    categories.value ="";
}

const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener('click', () => {
    handleSaveOrModifyElements();
})

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("nombre").value,
          imagen = document.getElementById("img").value,
          precio = document.getElementById("precio").value,
          categories = document.getElementById("categoria").value;
    
    let object = null;

    if(productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories
        }

    }else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories
        };
    }


    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
}


const buttonSearch = document.getElementById("buttonSearch"); 
buttonSearch.addEventListener('click', () => {
    handleSearchProductByName();
})



export const handleDeleteProduct = () => {
    const products = handleGetProductLocalStorage();
    const result = products.filter((el) => el.id !== productoActivo.id);
    localStorage.setItem('products', JSON.stringify(result));
    const newProducts = handleGetProductLocalStorage();
    handleRenderList(newProducts);
    closeModal();
}

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener('click', () =>{
    handleButtonDelete();
});

const handleButtonDelete = () => {
    handleDeleteProduct();
};