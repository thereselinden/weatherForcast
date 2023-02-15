export const loadFile = async () => {
  const response = await fetch('../../city.list.json');
  const data = await response.json();
  console.log(data);
  const searchTerm: string = 'Sal';

  let result = data.filter((item: any) => {
    const name: string = item.name;
    return name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
  console.log(result);
};
