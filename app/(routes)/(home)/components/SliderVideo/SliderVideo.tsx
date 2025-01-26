export function SliderVideo() {
  return (
    <div className="relative w-full h-[80vw] md:h-[56.25vw] lg:h-[45vw] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[url('/iconos/logo-playmovies.png')]
        bg-no-repeat bg-center bg-contain"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[14.7vw] bg-gradient-video"
      />
    </div>
  );
}