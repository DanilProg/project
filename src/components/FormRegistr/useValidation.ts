import { parsePhoneNumber } from "libphonenumber-js";
interface FormObject {
  phone?: string;
  password?: string;
  login?: string;
}
export const useValidation = (object: FormObject) => {
  console.log(object);
  let phoneFlag = false;
  let passwordFlag = false;
  let loginFlag = false;
  if (object.phone) {
    if (object.phone.length === 11) {
      const result = parsePhoneNumber(object.phone, { defaultCountry: "RU" });
      if (result.isValid()) {
        phoneFlag = true;
      }
    }
  }
  if (object.password!.length >= 8) {
    passwordFlag = true;
  }
  if (object.login!.length >= 3) {
    loginFlag = true;
  }
  return {
    phoneMessage: phoneFlag ? "" : "Неккоретный номер",
    passwordMessage: passwordFlag
      ? ""
      : "Пароль должен содержать более 8 символов",
    loginMessage: loginFlag ? "" : "Логин должен содержать не менее 3 символов",
  };
};
