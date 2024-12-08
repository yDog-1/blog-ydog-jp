import type { ContactList as ContactListType } from "@/types/ContactList";

export default function ContactList({
  href,
  id,
  logo: { size = 50, darkMode = true, SVG },
}: ContactListType) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full "
      >
        <div className="flex flex-col items-center">
          {(() => {
            if (SVG) {
              return <SVG width={size} height={size} darkMode={darkMode} />;
            }
          })()}
          <div className=" text-lg ">{id}</div>
        </div>
      </a>
    </li>
  );
}
