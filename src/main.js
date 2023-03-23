import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.querySelector('.products');

const showProductSearched = async (product) => {
  const products = await fetchProductsList(product);
  products.forEach((item) => {
    const createItemProduct = createProductElement(item);
    sectionProducts.appendChild(createItemProduct);
  });
};

showProductSearched('computador');
