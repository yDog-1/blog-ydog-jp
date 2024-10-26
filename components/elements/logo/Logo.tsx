import Image from "next/image";

const Logo = (props: SuperLogoProps) => {
	const { width, height, darkMode, Dir, Name } = props;
	const src = darkMode ? Dir.black : Dir.white;
	return <Image src={src} width={width} height={height} alt={`${Name}logo`} />;
};
export default Logo;
