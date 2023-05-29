import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "vi",
  messages: {
    vi: {
      hello: "Xin chào!",
      "Value is required": "Trường này là bắt buộc",
      "The minimum value allowed is 0": "Giá trị tối thiểu là 0",
      "The minimum value allowed is 1": "Giá trị tối thiểu là 1",
      "The maximum value allowed is 99": "Giá trị tối đa là 99",
      "The maximum value allowed is 100": "Giá trị tối đa là 100",
    },
  },
});
