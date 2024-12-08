import Logo from "./Logo";

const X = (props: LogoProps) => {
  const { width, height, darkMode } = props;
  const Dir = {
    white: "/images/SNS_logo/x-logo-white.svg",
    black: "/images/SNS_logo/x-logo.svg",
  };
  const Name = "X";
  return (
    <Logo
      width={width}
      height={height}
      darkMode={darkMode}
      Dir={Dir}
      Name={Name}
    />
  );
};
export default X;
