import { Button } from "../Button/Button.tsx";
import { Input } from "../Input/Input.tsx";
import { Chip } from "../Chip/Chip.tsx";
import { Checkbox } from "../Checkbox/Checkbox.tsx";
import { Popup } from "../Popup/Popup.tsx";
import { FormRegister } from "../FormRegistr/FormRegistr.tsx";
import { FormAuth } from "../FormAuth/FormAuth.tsx";
import { Typography } from "../Typography/Typography.tsx";

export const Main = () => {
  return (
    <div className={"container"}>
      <div className={"app_block"}>
        <Button variant={"primary"} className={"margin-right"} id={"id"}>
          Кнопка для попапа
        </Button>
        <Button variant={"outline"}>Кнопка</Button>
        <Button variant={"ghost"}>Кнопка</Button>
        <Input
          variant={"primary"}
          label={"123"}
          errorMessage={"123"}
          className={"margin-right"}
        ></Input>
        <Input variant={"primary"} />
        <Chip variant={"primary"}>
          <p>Тут у нас будет какой-нибудь текст</p>
        </Chip>
        <Chip variant={"outline"}>
          <p>Тут у нас будет какой-нибудь текст</p>
        </Chip>
        <Chip variant={"ghost"}>
          <p>Тут у нас будет какой-нибудь текст</p>
        </Chip>
      </div>
      <div className={"app_block"}>
        <Checkbox label={"Первый"} />
        <Checkbox label={"Второй"} />
        <Checkbox label={"Третий"} />
        <Checkbox label={"Четвертый"} />
      </div>
      <div className={"center"}>
        <Popup
          children={
            <Button variant={"primary"}>Открыть попап Регистрация </Button>
          }
          placement={"top"}
          onContent={<FormRegister />}
        />
        <Popup
          children={
            <Button variant={"primary"}>Открыть попап Авторизация</Button>
          }
          placement={"bottom"}
          onContent={<FormAuth />}
        />
      </div>
      <div>
        <Typography Component={"span"} variant={"h2"}>
          Привет
        </Typography>
      </div>
    </div>
  );
};
