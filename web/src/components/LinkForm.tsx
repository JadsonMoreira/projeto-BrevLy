
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LinkForm() {
    // 1. Um estado para cada campo
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

 setIsLoading(true);
    // Simula 2 segundos salvando:
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <form className="flex w-full flex-col gap-5 rounded-lg bg-gray-100 p-6 lg:w-95 lg:shrink-0 lg:gap-6 lg:p-8"
     onSubmit={handleSubmit}>

   <h2 className="text-gray-600 text-lg">Novo link</h2>

       <div className="flex flex-col gap-4">
        <Input
          label="link original"
          placeholder="www.exemplo.com.br"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
            value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        //   error={errors.originalUrl?.message}
        //   {...register('originalUrl')}
        />

        <Input
          label="link encurtado"
          prefix="brev.ly/"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
            value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
        //   error={errors.shortUrl?.message}
        //   {...register('shortUrl')}
        />
      </div>

       <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar link"}</Button>
    </form>

  )
}