class SuperLogoProps {
  width: number;
  height: number;
  darkMode: boolean;
  Dir: { black: string; white: string };
  Name: string;
}

type LogoProps = Omit<SuperLogoProps, "Dir" | "Name">;
