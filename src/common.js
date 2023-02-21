export const getID = () => {
  return Math.random().toString(32).slice(2);
};
export const getNowDate = () => {
  return new Date().toISOString().slice(0, 10);
};
export const getTwoWeeksDate = (dateValue) => {
  if (dateValue) {
    const dateInstance = new Date(dateValue);
    const year = dateInstance.getFullYear(); // 년
    const month = dateInstance.getMonth(); // 월
    const day = dateInstance.getDate(); // 일
    return new Date(year, month, day + 15).toISOString().slice(0, 10);
  } else {
    const dateInstance = new Date();
    const year = dateInstance.getFullYear(); // 년
    const month = dateInstance.getMonth(); // 월
    const day = dateInstance.getDate(); // 일
    return new Date(year, month, day + 15).toISOString().slice(0, 10);
  }
};
