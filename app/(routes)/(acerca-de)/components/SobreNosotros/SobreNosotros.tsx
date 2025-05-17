"use client";
import { ButtonRegresar } from '@/components/Shared/ButtonRegresar';
import React from 'react'

export default function SobreNosotros() {
 
  return (
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <ButtonRegresar/>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ESTO ES PLAYMOVIES
          </h1>
        {/* SECCIONES DEL ACUERDO */}
          <section className="space-y-4">
            <p className="text-justify">
              <strong>PlayMovies</strong> es una aplicación desarrollada por el estudio independiente <strong>HB Studios</strong>, 
              sin fines de lucro. Su objetivo es brindar acceso a una amplia variedad de películas, series y animes a través de una cuenta gratuita dentro de la plataforma.
              <br /><br />
              El contenido disponible en nuestra aplicación proviene de múltiples plataformas y servidores públicos de libre acceso. 
              Por lo tanto, cualquier contenido protegido por derechos de autor es propiedad exclusiva de sus respectivos autores o titulares, y <strong>HB Studios</strong> no ejerce control directo sobre dicho contenido ni busca lucrar con él.
              <br /><br />
              En caso de que seas titular de derechos sobre alguna obra incluida en nuestra plataforma y consideres que se vulneran las disposiciones 
              del <strong>DMCA</strong>, puedes solicitar su retiro enviando un correo a <strong>hbstudiosoficial14@gmail.com</strong>. Te pedimos incluir el nombre del contenido, capítulo o episodio en cuestión, así como una breve descripción del motivo de la solicitud.
              <br /><br />
              Nuestra intención no es infringir los derechos de autor ni distribuir contenido sin consentimiento. 
              En situaciones donde no se pueda verificar la autoría de una obra, se intentará justificar su inclusión indicando la fuente pública de donde fue tomada.
              <br /><br />
              Agradecemos tu comprensión.
              <br />
              <strong>El equipo de HB Studios y PlayMovies</strong>.
            </p>
          </section>
      </div>
  )
}
