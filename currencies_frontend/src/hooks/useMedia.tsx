import { useLayoutEffect, useState } from 'react';

type queryData = {
  mql: MediaQueryList;
  query: string;
  name: string;
}[];

const mediaQueries = [
  { name: 'mobile', query: '(max-width: 480px)' },
  { name: 'tablet', query: '(max-width: 980px) and (min-width: 481px)' },
  { name: 'desktop', query: '(min-width: 981px)' },
];

const getData = (data: queryData) =>
  data
    .map((item) => ({ value: item.mql.matches, name: item.name }))
    .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {} as { [x: string]: boolean });

export const useMedia = () => {
  const queryData = mediaQueries.map((item) => ({ ...item, mql: matchMedia(item.query) }));
  const [list, setList] = useState(getData(queryData));

  useLayoutEffect(() => {
    const handler = () => setList(getData(queryData));

    queryData.forEach((item) => item.mql.addEventListener('change', handler));

    return () => queryData.forEach((item) => item.mql.removeEventListener('change', handler));
  }, [queryData]);

  return list;
};
