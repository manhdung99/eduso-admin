const transmissionData = (formData, array, name) => {
  const dataLength = array.length;
  for (let i = 0; i < dataLength; i++) {
    const data = array[i];
    formData.append(`${name}[${i}]`, data);
  }
};
const transmissionPermisstionData = (formData, array, name) => {
  const dataLength = array.length;
  for (let i = 0; i < dataLength; i++) {
    const data = array[i];
    const permisstion = data.split("-");
    formData.append(`${name}[${i}].CtrlName`, permisstion[0]);
    formData.append(`${name}[${i}].ActName`, permisstion[1]);
  }
  console.log(formData);
};

export { transmissionData, transmissionPermisstionData };
