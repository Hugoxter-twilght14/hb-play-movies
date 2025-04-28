import { Logo } from "@/components/Shared/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Fondo oscuro y la imagen */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-black">
          <div className="h-full w-full bg-[url('/iconos/logo-playmovies.png')] bg-cover bg-no-repeat bg-center opacity-30" />
        </div>
      </div>

      {/* Encabezado */}
      <div className="px-8 py-5 max-w-7xl mx-auto">
        <Logo />
      </div>

      {/* Formulario centrado */}
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="bg-black px-8 py-10 rounded-lg w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
