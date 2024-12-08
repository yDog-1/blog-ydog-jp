import Logo from "./Logo";

const Github = (props: LogoProps) => {
  const { width, height, darkMode } = props;
  const Dir = {
    white: "/images/SNS_logo/github-mark-white.svg",
    black: "/images/SNS_logo/github-mark.svg",
  };
  const Name = "Github";
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
export default Github;
