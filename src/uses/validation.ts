export const checkPriceValidation = (
  price: number,
  error: { price?: string }
) => {
  if (price.toString() == "") {
    error.price = "Giá niêm yết không được để trống";
  } else if (price < 0) {
    error.price = "Giá niêm yết phải lớn hơn 0";
  } else {
    error.price = "";
  }
};

export const checkDiscountValidation = (
  discount: number,
  error: { discount?: string }
) => {
  if (discount.toString() == "") {
    error.discount = "Giảm giá không được để trống";
  } else if (discount < 0) {
    error.discount = "Giảm giá phải lớn hơn 0";
  } else {
    error.discount = "";
  }
};

export const checkValidationBeforeSubmit = (
  metaData,
  previewImage,
  bookInfo,
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
    { key: "image", name: "Bìa sách", value: previewImage.value },
    { key: "discount", name: "Giảm giá", value: bookInfo.discount },
    { key: "price", name: "Giá sách", value: bookInfo.price },
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
