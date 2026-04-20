import Link from "next/link";
import { ArrowRight, Home, MessageSquare } from "lucide-react";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-bg-alt min-h-[75vh] flex flex-col items-center justify-center px-4 py-20 text-center grain isolate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-primary/12 to-accent/15 blur-[120px]" />
      </div>
      <p className="font-display font-extrabold text-[7rem] lg:text-[10rem] leading-none gradient-text tracking-tighter">
        404
      </p>
      <h1 className="font-display font-extrabold text-ink text-2xl lg:text-3xl tracking-tight mt-4">
        Page introuvable.
      </h1>
      <p className="mt-4 text-text-light max-w-md leading-relaxed">
        Le lien est peut-être obsolète ou la page a été déplacée. Revenez à l’accueil ou
        écrivez-nous si vous cherchez une information précise.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button href="/" size="md">
          <Home className="w-4 h-4" />
          Retour à l’accueil
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-[0.92rem] font-semibold text-ink hover:border-primary/30 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          Nous contacter
        </Link>
      </div>
    </main>
  );
}
