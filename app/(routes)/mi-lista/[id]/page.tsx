import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { CardContenido } from "@/components/Shared/CardContenido";
import { VolverListas } from "@/components/Shared/VolverListas";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    id: string; // listaId
  };
}

export default async function ListaDetallePage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const perfilId = cookies().get("perfilId")?.value;

  if (!perfilId) {
    return redirect("/profiles");
  }

  const lista = await db.lista.findFirst({
    where: {
      id: params.id,
      perfilId: perfilId,
    },
    include: {
      contenidos: true,
    },
  });

  if (!lista) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <VolverListas /> {/* ✅ Botón para volver a "Mis Listas" */}
      
      <h1 className="text-2xl font-bold mb-2">{lista.nombre}</h1>
      {lista.descripcion && (
        <p className="text-muted-foreground mb-6">{lista.descripcion}</p>
      )}

      {lista.contenidos.length === 0 ? (
        <p className="text-muted-foreground">No hay contenido en esta lista.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {lista.contenidos.map((item) => (
            <CardContenido
              key={item.id}
              contenidoId={item.contenidoId}
              tipo={item.tipo as "pelicula" | "anime" | "serie"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
