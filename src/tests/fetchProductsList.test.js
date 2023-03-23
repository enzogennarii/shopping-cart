import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toBeCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('o retorno da função com o argumento "computador" é uma estrutura de dados igual à computadorSearch', async () => {
    const returned = await fetchProductsList('computador');
    expect(typeof returned).toBe(typeof computadorSearch);
    expect(returned.length).toEqual(50);
  });

  it('o retorno da função sem argumento é uma mensagem de erro "Termo de busca não informado"', async () => {
    await expect(fetchProductsList()).rejects.toThrowError();
    await expect(fetchProductsList()).rejects.toThrow("Termo de busca não informado");
  });
});
