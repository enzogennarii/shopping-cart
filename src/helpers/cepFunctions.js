export const getAddress = async (cep) => {
  const promise1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
    .then((res) => res.json()).then((data) => data);

  const promise2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    .then((res) => res.json()).then((data) => data);

  const address = Promise.any([promise1, promise2]);
  return address;
};

export const searchCep = async () => {
  const cep = document.querySelector('.cep-input').value || '0';
  const span = document.querySelector('.cart__address');

  const addressObj = await getAddress(cep);

  if (addressObj.code) {
    span.innerText = 'CEP não encontrado';
    return;
  }

  if (addressObj.ddd) {
    const { address, district, city, state } = addressObj;
    span.innerText = `${address} - ${district} - ${city} - ${state}`;
  } else {
    const { street, neighborhood, city, state } = addressObj;
    span.innerText = `${street} - ${neighborhood} - ${city} - ${state}`;
  }
};
