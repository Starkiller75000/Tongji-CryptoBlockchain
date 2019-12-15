export default ts => {
  const d = new Date(ts);
  return `${d.getMonth() +
    1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};
