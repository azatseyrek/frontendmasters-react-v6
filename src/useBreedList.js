import {useState, useEffect} from 'react';

const localCache = {};

const useBreedList = (animal) => {
  const [breedlist, setBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    const requestBreedList = async () => {
      setBreedList([]);
      setStatus('loading');

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
      );

      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus('loaded');
      console.log(localCache[animal]);
      console.log(localCache);
    };

    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
  }, [animal]);
  return [breedlist, status];
};

export default useBreedList;
