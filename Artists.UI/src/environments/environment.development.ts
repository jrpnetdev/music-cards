import { last } from 'rxjs';

export const environment = {
  production: false,
  CORE_API_URL: 'http://localhost:5211/artist/1',
  CORE_API_PAGINATION_URL: 'http://localhost:5211/artist/pagination/',
  WIKIDATA_API_URL: 'https://www.wikidata.org/wiki/Special:EntityData/',
  TOOLMAKER_API_URL:
    'https://cors-anywhere.herokuapp.com/https://magnus-toolserver.toolforge.org/commonsapi.php?image=',
};
