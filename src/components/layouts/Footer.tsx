export const Footer = () => {
  return (
    <footer className="mt-10 bg-red-600 py-3">
      <div className="bg-red-600 text-slate-50 container mx-auto">
        <div>
          <ul className=" grid grid-cols-7 gap-2 md:grid-cols-5 md:gap-5 ">
            <li className=" col-span-3 my-auto md:col-span-1 ">
              <a href="/">
                <img
                  src="/images/yDog.png"
                  width={120}
                  height={120}
                  alt="yDog"
                  className="mx-auto md:ml-0"
                />
              </a>
            </li>
            <li className=" col-span-4 flex-auto text-slate-50 md:col-span-4 ">
              <ul className=" grid grid-flow-row grid-cols-1 text-lg">
                <li className="flex flex-col items-end gap-2">
                  <a href="/about" className="md:hover:underline">
                    About
                  </a>
                </li>{" "}
                <li className="flex flex-col items-end gap-2">
                  <a href="/contact" className="md:hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
