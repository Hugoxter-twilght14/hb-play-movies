import Link from "next/link";
import { Terms } from "../components/Terms";
import { RegisterForm } from "./RegisterForm";

export default function page() {
  return (
    <div>
        <p className="text-3xl font-bold text-left mb-7">
            CREAR CUENTA
        </p>

        <RegisterForm/>

        <div className="mt-4 flex gap-1">
            <p  className="text-white opacity-70">
                ¿Ya tienes una cuenta?
            </p>
            <Link href="login" className="opacity-1 text-white">
                Inicia sesión aquí
            </Link>
        </div>
        <Terms/>
    </div>
  );
}
