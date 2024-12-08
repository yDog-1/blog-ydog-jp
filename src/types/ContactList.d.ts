export type ContactList = {
  href: string;
  id: string;
  logo: {
    size?: number;
    darkMode?: boolean;
    SVG?: (props: LogoProps) => JSX.Element;
  };
};
