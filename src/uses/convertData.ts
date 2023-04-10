export default function () {
  const convertPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
  };
  const dateFormater = (date) => {
    const day: string | number =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month: string | number =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const year: string | number = date.getFullYear();
    return year + "-" + month + "-" + day;
  };
  return { convertPrice, convertTimestampToDate, dateFormater };
}
