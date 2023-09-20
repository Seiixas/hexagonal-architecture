import { EnqueueSnackbar } from "notistack";
import * as yup from "yup";
import { api } from "../../api/api";

type CreateUserProps = {
  data: {
    name: string;
    password: string;
    email: string;
  };
  feedbackMessage: EnqueueSnackbar;
};

const userSignUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(5).required(),
});

export async function createUserService(props: CreateUserProps) {
  const { name, password, email } = props.data;
  const { feedbackMessage } = props;
  try {
    const user = await userSignUpSchema.validate({ name, password, email });

    await api.post("/users", { ...user });

    return feedbackMessage("Conta criada com sucesso.", { variant: "success" });
  } catch (err: any) {
    if (err.response.data.message) {
      return feedbackMessage(err.response.data.message, {
        variant: "error",
      });
    }

    return feedbackMessage(err, {
      variant: "error",
    });
  }
}
