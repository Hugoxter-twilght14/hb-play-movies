"use client"
export default function InformacionGeneral() {
  const anioActual = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center space-y-8">
      <h1 className="text-3xl font-semibold text-white">Información General</h1>

      <p className="text-gray-300 text-lg">
        Bienvenido a <span className="font-bold text-white">PlayMovies</span>, tu plataforma digital para disfrutar de películas, series y anime en un solo lugar.
      </p>

      <div className="bg-gray-800 rounded-xl p-6 shadow-md text-left space-y-3">
        <p><span className="font-semibold text-white">Versión de la App:</span> 1.3.0</p>
        <p><span className="font-semibold text-white">Nombre de la aplicación:</span> PlayMovies</p>
        <p><span className="font-semibold text-white">Nombre del desarrollador:</span> HB Studios</p>
        <p><span className="font-semibold text-white">Fecha de creación:</span> © 2024 - {anioActual}</p>
        <p><span className="font-semibold text-white">Correo de contacto:</span> hbstudiosoficial14@gmail.com</p>
        <p>
          <span className="font-semibold text-white">Sitio web:</span>{' '}
          <a
            href="https://hb-studios-official.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            https://hb-studios-official.vercel.app/
          </a>
        </p>
      </div>
    </div>
  );
}
