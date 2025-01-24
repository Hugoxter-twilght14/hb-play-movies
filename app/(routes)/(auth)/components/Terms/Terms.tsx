"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Terms() {
  const[showExtraTerms, setShowExtraTerms] = useState(false)
  return (
    <div className="text-xs mt-4 mb-10 text-gray-600 max-w-72">
      <div className="mb-5">
        <span>
          Esta página utiliza reCAPTCHA para 
          verificar que no eres un robot.
        </span>
        <Button variant="ghost" 
        onClick={() => setShowExtraTerms(!showExtraTerms)}
        className="opacity-1 text-[#00FFFF] hover:bg-transparent p-0 ml-1 h-fit">
          Más Información
        </Button>
      </div>

      <div className="h-28">{showExtraTerms && (
          <p>La información recopilada por Google reCAPTCHA esta sujeta
            a la política de privacidad y condiciones del servicio de Google
            y se utiliza para proporcionar, mantener y mejorar el servicio y uso
            de reCAPTCHA, así como para fines generales de seguridad (Google no la
            utiliza para publicidad personalizada ni otras finalidades que afecten
            a los usuarios).
          </p>
        )}
      </div>
    </div>
  );
}
