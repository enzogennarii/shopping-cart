import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('e verifica que é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct passando um ID como parâmetro', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });

  it('se o fetch chamado utiliza o endpoint correto', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('o retorno da função com o argumento "MLB1405519561" é uma estrutura de dados igual à product', async () => {
    const returned = await fetchProduct('MLB1405519561');
    expect(typeof returned).toBe(typeof product);
    expect(Object.keys(returned)).toEqual(Object.keys(product));
  });

  it('o retorno da função sem argumento é uma mensagem de erro "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrowError();
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
