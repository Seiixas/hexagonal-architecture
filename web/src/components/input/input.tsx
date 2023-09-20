import { StyledInput } from "./input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
