import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement, attPrice }
  from './helpers/shopFunctions';
import './style.css';

const sectionProducts = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');
document.querySelector('.cep-button').addEventListener('click', searchCep);

const loading = () => {
  const loadingEl = document.createElement('p');
  loadingEl.innerText = 'carregando...';
  loadingEl.classList.add('loading');
  sectionProducts.appendChild(loadingEl);
};

const removeLoading = () => {
  const loadingEl = document.querySelector('.loading');
  loadingEl.remove();
};

const createErrorMessage = () => {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorMessage.classList.add('error');
  sectionProducts.appendChild(errorMessage);
};

const showProductSearched = async (product = 'computador') => {
  try {
    const products = await fetchProductsList(product);
    products.forEach((item) => {
      const createItemProduct = createProductElement(item);
      sectionProducts.appendChild(createItemProduct);
    });
  } catch (error) {
    createErrorMessage();
  }
  removeLoading();
};

const reloadCart = async () => {
  const idsOnLocalStorage = getSavedCartIDs().map((id) => fetchProduct(id));
  const products = await Promise.all(idsOnLocalStorage);
  products.forEach((product) => cartProducts
    .appendChild(createCartProductElement(product)));
};

window.onload = () => {
  loading();
  showProductSearched();
  reloadCart();
  attPrice();
};
