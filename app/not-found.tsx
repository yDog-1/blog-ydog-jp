import Link from "next/link";

export default function NotFound() {
	return (
		<main>
			<div>
				<h2>Not Found</h2>
				<p>Could not find requested resource</p>
				<Link className=" text-blue-500 hover:underline" href="/">
					Return Home
				</Link>
			</div>
		</main>
	);
}
