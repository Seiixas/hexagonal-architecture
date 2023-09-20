import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import * as yup from "yup";
import { api } from "../../api/api";

type CreateUserProps = {
  data: {
    password: string;
    email: string;
  };
  feedbackMessage: (
    message: SnackbarMessage,
    options?: OptionsObject
  ) => SnackbarKey;
};

const userSignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5),
});

export async function authenticateUserService(props: CreateUserProps) {
  const { password, email } = props.data;
  const { feedbackMessage } = props;
  try {
    const user = await userSignInSchema.validate({ password, email });

    await api.post("/auth/signin", { ...user });

    return feedbackMessage("Log-in efeutado.", { variant: "success" });
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
