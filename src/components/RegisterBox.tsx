import React, { useRef, useState } from "react";
import clientData from "../data/config";

const { secureMessage } = clientData;

export default function RegisterBox() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessages("");
    setSuccessMessage("");

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";

    if (!name || !email) {
      setErrorMessages("Por favor, rellena todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages("Por favor, ingresa un email válido");
      return;
    }

    setIsSubmitting(true);

    const capitalizeFirstLetter = (word: string): string => {
      return word
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    };

    const capitalizedName = capitalizeFirstLetter(name);

    try {
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizedName,
          email: email.toLowerCase(),
        }),
      });

      if (userRes.ok) {
        // const emailRes = await fetch("/api/sendEmails", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name: capitalizedName,
        //     email: email.toLowerCase(),
        //   }),
        // });

        // if (!emailRes.ok) {
        //   setErrorMessages(
        //     "Verifica que tu correo sea correcto y vuelve a intentarlo"
        //   );
        //   setIsSubmitting(false);
        //   return;
        // }

        setSuccessMessage("¡Registro exitoso! Te redirigiremos en breve...");
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      } else {
        setSuccessMessage("¡Registro exitoso! Te redirigiremos en breve...");
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      }
    } catch (error) {
      setErrorMessages(
        "Hubo un error al procesar tu solicitud. Intenta nuevamente."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <form className="flex flex-col gap-6 p-8 glass-card rounded-xl">
        <h3 className="text-center gradient-text mb-4">
          Inicia tu Transformación
        </h3>

        <input
          ref={nameRef}
          type="text"
          id="name"
          name="name"
          required
          placeholder="Tu nombre y apellido*"
          className="w-full p-4 text-lg border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-true-blue focus:ring-offset-2 focus:ring-offset-oxford-blue-3"
        />

        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
          required
          placeholder="Tu email*"
          className="w-full p-4 text-lg border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-true-blue focus:ring-offset-2 focus:ring-offset-oxford-blue-3"
        />

        {errorMessages && (
          <p className="text-red-400 text-sm text-center">{errorMessages}</p>
        )}

        {successMessage && (
          <p className="text-green-400 text-sm text-center">{successMessage}</p>
        )}

        {isSubmitting ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-true-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full px-10 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-true-blue to-sapphire rounded-lg hover:from-sapphire hover:to-true-blue hover:scale-105"
            onClick={handleSubmit}
          >
            Registrarme
          </button>
        )}

        <p className="text-center text-sm text-white/70">{secureMessage}</p>
      </form>
    </div>
  );
}
