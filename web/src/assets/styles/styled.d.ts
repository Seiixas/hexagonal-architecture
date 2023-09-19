import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      red: string;
      white: string;
      gray: string;
      disabled: string;
    };
  }
}
