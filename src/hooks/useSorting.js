export default (array) => {
  const sortItems = [].concat(array)
  .sort(function(a, b) {
    return b.id - a.id;
  });

  return {
    sortItems
  }
}
