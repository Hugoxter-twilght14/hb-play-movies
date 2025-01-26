
export function SliderVideo() {
  return (
    <div className="relative w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[url('/iconos/logo-playmovies.png')]
        bg-no-repeat bg-center bg-contain"
      />
      <div
        className="relative flex flex-col items-center text-center px-4 md:px-0 w-full md:w-[50%] z-20"
      >
        <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-4 text-[#0B614B] uppercase underline">
          Series
        </h2>
        <p className="text-sm md:text-base lg:text-lg max-w-lg mb-6 font-semibold text-[#0B614B] uppercase">
          En esta sección podrás encontrar y ver todas las películas de nuestro catálogo.
          Los mejores momentos se viven en familia disfrutando de una película.
        </p>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[14.7vw] bg-gradient-video"
      />
    </div>
  );
}
