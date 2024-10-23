import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

export const handleSearchProductByName = () => {
    const inputHeader = document.getElementById("inputHeader").value.toLowerCase(); // Convertimos a minúsculas
    const products = handleGetProductLocalStorage();

    const result = products.filter((el) => {
        return el.nombre.toLowerCase().includes(inputHeader); // Asegúrate de retornar el resultado del filtro
    });

    handleRenderList(result);
};