import { LinkForm } from "../components/LinkForm";
import { Logo } from "../components/logo";


export function Home() {
  return (
    <main className="mx-auto flex w-full max-w-151 flex-col gap-6 px-3 py-8 lg:h-dvh lg:max-w-251 lg:gap-8 lg:pt-22">
      <div className="self-center lg:self-start">
        <Logo />
      </div>

      <LinkForm/>


    </main>
  )
}