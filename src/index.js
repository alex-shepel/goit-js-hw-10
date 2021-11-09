import './css/styles.css';
import CoutriesService from './js/countries-service';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import counrtyListTpl from './templates/counrty-list.hbs';
import countryInfoTpl from './templates/counrty-info.hbs';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

const coutriesService = new CoutriesService();

const clearResults = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
};

const onResponse = data => {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (data.length > 2) {
    refs.countryList.innerHTML = counrtyListTpl(data);
    return;
  }

  refs.countryInfo.innerHTML = countryInfoTpl(...data);
};

const onInput = e => {
  clearResults();

  const countryName = e.target.value.trim();
  if (!countryName) return;

  coutriesService
    .fetchCountry(countryName)
    .then(onResponse)
    .catch(() => Notify.failure('Oops, there is no country with that name.'));
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
