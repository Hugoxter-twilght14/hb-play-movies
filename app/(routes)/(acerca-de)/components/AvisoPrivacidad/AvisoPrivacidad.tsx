"use client";

import { ButtonRegresar } from "@/components/Shared/ButtonRegresar";

export default function AvisoPrivacidad() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <ButtonRegresar/>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        ACUERDO DE PRIVACIDAD
      </h1>

      <p className="text-right text-sm text-gray-300">
        Última actualización: 20 de mayo de 2025
      </p>

      {/* SECCIONES DEL ACUERDO */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">1. Identidad del responsable</h2>
        <p className="text-justify">
          El responsable del tratamiento de tus datos personales es HB Studios empresa desarrolladora de PlayMovies,
          Puedes contactarnos a través del correo electrónico: hbstudiosoficial14@gmail.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Datos Personales Recopilados</h2>
        <p className="text-justify">Para brindarte el mejor servicio, recopilamos los siguientes datos personales:</p>
        <ul className="list-disc pl-6">
          <li>Al crear una cuenta nueva: Nombre completo o de usuario, correo electrónico, avatar de perfil y contraseña (encriptada) para mayor seguridad</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Finalidades del Tratamiento de Datos</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Crear y gestionar tu cuenta de usuario.</li>
          <li>Acceder al catalogo completo de la aplicación.</li>
          <li>Crear perfiles de usuario.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">4. Transferencia de Datos</h2>
        <ul className="list-disc pl-6">
          <li>Para cumplir con obligaciones legales.</li>
          <li>Para proteger y garantizar la seguridad de nuestros usuarios.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">5. Derechos ARCO</h2>
        <ul className="list-disc pl-6">
          <li>Acceder a los datos recopilados.</li>
          <li>Rectificar datos incorrectos o desactualizados.</li>
          <li>Cancelar tus datos personales.</li>
          <li>Oponerte al uso de tus datos para ciertas finalidades.</li>
        </ul>
        <p className="text-justify">
          Contáctanos en:{" "}
          <a
            href="https://hb-studios-official.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            https://hb-studios-official.vercel.app/
          </a>
          {" "}o al correo hbstudiosoficial14@gmail.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">6. Medidas de Seguridad</h2>
        <p className="text-justify">Aplicamos medidas técnicas y administrativas para proteger tus datos personales de accesos no autorizados, pérdida, alteración o uso indebido.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">7. Uso de Cookies</h2>
        <p className="text-justify">Usamos cookies para mejorar la experiencia de usuario. Estas cookies no recopilan datos personales, y puedes desactivarlas en tu navegador.
          solo se usan para ofrecerte una experiencia mas fluida la siguiente vez que visites nuestra aplicación..</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">8. Modificaciones al Acuerdo</h2>
        <p className="text-justify">Nos reservamos el derecho de actualizar este aviso. Cualquier cambio será notificado mediante correos oficiles como el de hbstudiosoficial14@gmail.com o en nuetro sitio web oficial</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">9. Contacto</h2>
        <p className="text-justify">Si tienes dudas o quieres ejercer tus derechos sobre tus datos  e información personal, escríbenos a:</p>
        <p className="text-justify">Correo: hbstudiosoficial14@gmail.com</p>
        <p className="text-justify">
          Página Web:{" "}
          <a
            href="https://hb-studios-official.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            https://hb-studios-official.vercel.app/
          </a>
          <br /> <br />
          IMPORTANTE: Al crear una cuenta aceptas los terminos y condiciones establecidos en este acuerdo de privacidad.
        </p>
      </section>
    </div>
  );
}
