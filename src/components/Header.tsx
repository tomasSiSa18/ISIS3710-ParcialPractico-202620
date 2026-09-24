"use client";

import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// ssr: false para que se cargue solo en el navegador, donde existe el localStorage
const UserMenu = dynamic(() => import("./UserMenu"), { ssr: false });

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <header className="flex justify-between items-center bg-white border-b border-slate-200 px-24 py-4">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3">

          <span className="text-2xl font-bold text-slate-900">Planes Parcial</span>
        </Link>

        <Link href="/plans" className="text-lg font-semibold text-blue-700">
          Explorar Planes
        </Link>

        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            disabled={loc === locale}
            className="text-stone-700 hover:underline disabled:font-bold disabled:no-underline disabled:cursor-default"
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    

      {/* key={pathname} hace que el menú se vuelva a cargar al cambiar de página,
          así se entera si el usuario acaba de iniciar sesión */}
      <UserMenu key={pathname} />
      
    </header>
  );
}
