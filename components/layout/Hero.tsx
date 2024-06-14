import Image from "next/image";

function Hero() {
  return (
    <header className="hero-header">
      <div className="flex flex-col items-center gap-10">
        <Image
          src="/logo.png"
          alt="logo"
          width={101}
          height={96}
          className="object-contain opacity-60"
        />
        <h1 className="hero-text">
          Explore The <span className="blue-gradient">World</span> Data
        </h1>
      </div>
      <div className="bg-container">
        <div
          className="bg-container-image"
          style={{
            backgroundImage: 'url("/MundiOldMap.jpg")',
            opacity: 0.25,
          }}
        />
      </div>
    </header>
  );
}

export default Hero;
