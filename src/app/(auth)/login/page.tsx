import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md items-center bg-[#fff8f0] p-5">
      <section className="w-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-100">
        <div className="bg-[#e85d4a] p-7 text-white"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffd9cf]">Jesús y Laura</p><h1 className="mt-2 text-3xl font-black tracking-tight">Menú semanal</h1><p className="mt-3 text-sm leading-6 text-[#fff0eb]">Planificación sencilla para comer bien cada día.</p></div>
        <div className="p-7">
        <p className="text-sm text-stone-600">Introduce el código para consultar y organizar el menú.</p>
        <LoginForm />
        </div>
      </section>
    </main>
  );
}
