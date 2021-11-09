const API_URL = 'https://restcountries.com/v3.1';
const RES = 'name';
const FILTER = ['name', 'capital', 'population', 'flags', 'languages'];
const FORMAT = ['name.official', 'capital.0', 'flags.svg'];

export default class CoutriesService {
  fetchCountry(name) {
    const url = `${API_URL}/${RES}/${name}?fields=${FILTER.join(',')}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => data.map(item => this.#format(item)));
  }

  #format(counrtyData) {
    const result = { ...counrtyData };

    FORMAT.forEach(formatItem => {
      const [propName, subName] = formatItem.split('.');
      result[propName] = result[propName][subName];
    });

    result.languages = Object.values(result.languages).join(', ');

    return result;
  }
}
