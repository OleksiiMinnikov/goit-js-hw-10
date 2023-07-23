import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectors = {
  breedEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  errorEl: document.querySelector('.error'),
  loaderEl: document.querySelector('.loader'),
};
selectors.breedEl.style.visibility = 'hidden';
selectors.breedEl.addEventListener('change', catHandler);

function breedHandler() {
  showLoader();
  fetchBreeds()
    .then(data => {
      selectors.breedEl.style.visibility = 'visible';
      hideLoader();
      const selectorOptions = data
        .map(({ id, name }) => {
          return `<option value="${id}">${name}</option>`;
        })
        .join('');
      selectors.breedEl.insertAdjacentHTML('beforeend', selectorOptions);
      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(error => {
      console.log(error);
      hideLoader();
      Notiflix.Notify.failure(selectors.errorEl.textContent);
    });
}

function catHandler() {
  selectors.breedEl.style.visibility = 'hidden';
  showLoader();
  fetchCatByBreed(selectors.breedEl.value)
    .then(data => {
      selectors.breedEl.style.visibility = 'visible';
      hideLoader();
      let {
        url,
        breeds: {
          0: { description, temperament, name },
        },
      } = data[0];
      selectors.catInfoEl.innerHTML = `<div class="thumb">
          <img src="${url}" alt="${name}" class="image"></div>
          <h2 class="catName">${name}</h2>
          <p class="description"><b>Description:</b> ${description}</p>
          <p class="temperament"><b>Temperament:</b> ${temperament}</p>
          `;
    })
    .catch(error => {
      console.log(error);
      hideLoader();
      Notiflix.Notify.failure(selectors.errorEl.textContent);
    });
}

function showLoader() {
  selectors.catInfoEl.innerHTML = '';
  selectors.loaderEl.style.display = 'block';
}
function hideLoader() {
  selectors.loaderEl.style.display = 'none';

}

breedHandler();
