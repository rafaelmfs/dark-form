import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorLabel } from "../../components/ErrorLabel";
import { TextFieldInput, TextFieldRoot } from "../../components/TextField";
import { AUTH_ROUTES } from "../../constants/routesConstants";

export function ForgotPassword() {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;

  function handleSendForgotPassword(data: { email: string }) {
    console.log(data);
  }

  return (
    <>
      <h1 className="font-instrument-sans font-semibold text-2xl mt-4">
        Recuperar senha
      </h1>
      <form
        className="w-full px-4 mt-6 gap-3 flex flex-col"
        onSubmit={handleSubmit(handleSendForgotPassword)}
      >
        <p className="text-gray-200 text-sm">
          Digite seu email cadastrado para receber um link de recuperação de
          senha
        </p>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-gray-200 font-medium text-base"
          >
            Email
          </label>
          <TextFieldRoot error={Boolean(errors.email)}>
            <EnvelopeClosedIcon
              width={18}
              height={18}
              className="text-gray-400"
            />

            <Controller
              control={control}
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo obrigatório",
                },
              })}
              render={({ field: { ref, ...field } }) => (
                <TextFieldInput
                  id="email"
                  placeholder="jhondoe@email.com"
                  ref={ref}
                  {...field}
                />
              )}
            />
          </TextFieldRoot>
          {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
        </div>
        <div className="w-full mt-2 flex flex-col gap-2">
          <button className="w-full bg-green-500 border border-green-600 p-3 rounded-md mt-4 font-medium hover:bg-green-400 transition-colors">
            Enviar
          </button>
          <Link
            className="underline text-gray-400 hover:text-gray-300"
            to={AUTH_ROUTES.LOGIN}
          >
            Voltar para login
          </Link>
        </div>
      </form>
    </>
  );
}
