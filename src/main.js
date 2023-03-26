import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');

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

// const removeError = () => {
//   const errorEl = document.querySelector('.error');
//   errorEl.remove();
// };

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

window.onload = () => {
  loading();
  showProductSearched();
};
