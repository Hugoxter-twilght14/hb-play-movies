import { Navbar } from "@/components/Shared/Navbar";
import { SliderVideo } from "./components/SliderVideo";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BlockSeries } from "./components/BlockSeries";

export default async function Home() {
  const session = await auth();
  
  // Si no hay sesión, redirige al login
  if (!session || !session.user || !session.user.id) {
    return redirect("/login");
  }

  // Obtén las series de la base de datos
  const series = await db.serie.findMany({
    include: {
      seasons: true, // Si también necesitas las temporadas
    },
  });

  const usersNetflix = await db.userNetflix.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div>
      <Navbar users={usersNetflix} />
      <SliderVideo />
      <BlockSeries series={series} /> {/* Pasa las series reales aquí */}
    </div>
  );
}
