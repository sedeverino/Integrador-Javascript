import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";

import { openModal } from "../../main";
import { closeModal } from "../../main";

/*
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
}*/

export const handleGetProductsToStore = (filter = "Todo") => {
    const products = handleGetProductLocalStorage();
    
    let filteredProducts = products;

    if (filter === "Hamburguesas") {
        filteredProducts = products.filter((el) => el.categories === "Hamburguesas");
    } else if (filter === "Papas") {
        filteredProducts = products.filter((el) => el.categories === "Papas");
    } else if (filter === "Gaseosas") {
        filteredProducts = products.filter((el) => el.categories === "Gaseosas");
    } else if (filter === "mayorPrecio") {
        filteredProducts = products.sort((a, b) => b.precio - a.precio);
    } else if (filter === "menorPrecio") {
        filteredProducts = products.sort((a, b) => a.precio - b.precio);
    }

    handleRenderList(filteredProducts);
};

export const handleRenderList = (productosIn) => {
    const burguers = productosIn.filter((el) => el.categories === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosas");

    const renderProductGroup = (productos, title) => {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div class='containerTargetItem' id='product-${producto.categories}-${index}'>
                            <div>
                                <img src='${producto.imagen}' />
                                <div style="margin-top:1rem;">
                                    <h2>${producto.nombre}</h2>
                                </div>
                                <div class='targetProps'>
                                    <p><b>Precio:</b> $${producto.precio}</p>
                                </div>
                            </div>
                        </div>`;
            });

            return `
                <section class='sectionStore'>
                    <div class='containerTitleSection'>
                        <h3>${title}</h3>
                    </div>
                    <div class='containerProductStore'>
                        ${productosHTML.join("")}
                    </div>
                </section>
            `;
        } else {
            return "";
        }
    };

    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(burguers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    const addEvents = (productsIn) => {
        productsIn.forEach((element, index) => {
            const productContainer = document.getElementById(`product-${element.categories}-${index}`);
            
            // Verifica si el elemento existe antes de agregar el evento
            if (productContainer) {
                productContainer.addEventListener('click', () => {
                    setProductoActivo(element);
                    openModal();
                });
            } else {
                console.warn(`No se encontró el elemento con id: product-${element.categories}-${index}`);
            }
        });
    };

    addEvents(burguers);
    addEvents(papas);
    addEvents(gaseosas);
};
