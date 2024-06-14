import Image from "next/image";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-thin text-neutral-200">Reinisart - 2024</p>
      <Image
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="object-contain opacity-50"
      />
      <div className="flex items-center gap-6">
        <Image
          src="./tiktok.svg"
          alt="logo"
          width={18}
          height={18}
          className="object-contain"
        />
        <Image
          src="./instagram.svg"
          alt="logo"
          width={18}
          height={18}
          className="object-contain"
        />
        <Image
          src="./twitter.svg"
          alt="logo"
          width={18}
          height={18}
          className="object-contain"
        />
      </div>
    </footer>
  );
}

export default Footer;
