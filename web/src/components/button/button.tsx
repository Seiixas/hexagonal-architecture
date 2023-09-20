import { StyledButton } from "./button.styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export function Button(props: ButtonProps) {
  return <StyledButton secondary={props.secondary} {...props}></StyledButton>;
}
