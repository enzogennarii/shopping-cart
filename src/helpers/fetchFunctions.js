const createErrorMessage = () => {
  const sectionProducts = document.querySelector('.products');
  const errorMessage = document.createElement('p');
  errorMessage.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorMessage.classList.add('error');
  sectionProducts.appendChild(errorMessage);
};

export const fetchProduct = async (id) => {
  if (!id) { throw new Error('ID não informado'); }
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    createErrorMessage();
    console.log('entrou no erro');
  }
};

export const fetchProductsList = async (product) => {
  if (!product) { throw new Error('Termo de busca não informado'); }
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    createErrorMessage();
    console.log('entrou no erro');
  }
};
