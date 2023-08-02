const transmissionData = (formData, array, name) => {
  const dataLength = array.length;
  for (let i = 0; i < dataLength; i++) {
    const data = array[i];
    formData.append(`${name}[${i}]`, data);
  }
};

export default transmissionData;
