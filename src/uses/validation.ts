export const checkPriceValidation = (
  bookInfo: { price: number },
  error: { price?: string }
) => {
  if (bookInfo.price.toString() == "") {
    error.price = "Giá niêm yết không được để trống";
  } else if (bookInfo.price < 0) {
    error.price = "Giá niêm yết phải lớn hơn 0";
  } else {
    error.price = "";
  }
};

export const checkDiscountValidation = (
  bookInfo: { discount: number },
  error: { discount?: string }
) => {
  if (bookInfo.discount.toString() == "") {
    error.discount = "Giảm giá không được để trống";
  } else if (bookInfo.discount < 0) {
    error.discount = "Giảm giá phải lớn hơn 0";
  } else {
    error.discount = "";
  }
};

export const checkValidationBeforeSubmit = (
  metaData,
  previewImage,
  bookInfo,
  studyProgram,
  bookContent,
  error
) => {
  let returnValue = true;
  const fields = [
    { key: "metadata", name: "Metadata", value: metaData.value },
    {
      key: "bookcontent",
      name: "Nội dung sách",
      value: bookContent.value,
    },
    { key: "image", name: "Hình ảnh", value: previewImage.value },
    { key: "level", name: "", value: bookInfo.level },
    { key: "subject", name: "", value: bookInfo.subject },
    { key: "program", name: "", value: studyProgram.value },
    { key: "price", name: "Giá", value: bookInfo.price },
    { key: "discount", name: "Giảm giá", value: bookInfo.discount },
  ];

  // Check for empty input values

  fields.forEach((field) => {
    if (!field.value) {
      error[field.key] = `${field.name} không được để trống`;
      returnValue = false;
    }
  });
  return returnValue;
};
