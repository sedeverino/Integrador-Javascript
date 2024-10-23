import { handleGetProductsToStore } from "../views/store";

export const renderCategories = () => {
    const ulList = document.getElementById('listFilter');
    ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas">Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
    `;

    const liElements = ulList.querySelectorAll("li");

    liElements.forEach((liElement) => {
        liElement.addEventListener('click', () => {
            handleFilterClick(liElement);
        });
    });

    const handleFilterClick = (elemento) => {
        liElements.forEach((el) => {
            if (el.classList.contains('liActive')) {
                el.classList.remove('liActive');
            }
            if (elemento === el) {
                el.classList.add('liActive');
                const filter = elemento.id;
                handleGetProductsToStore(filter); // Llamamos a la función para obtener productos filtrados
            }
        });
    };
};
