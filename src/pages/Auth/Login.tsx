import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ErrorLabel } from "../../components/ErrorLabel";
import { TextFieldInput, TextFieldRoot } from "../../components/TextField";
import { AUTH_ROUTES } from "../../constants/routesConstants";

const loginFormSchema = z.object({
  user: z.string().min(1, "Campo obrigatório"),

  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatŕio"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const { register, control, handleSubmit, formState } = useForm<LoginFormData>(
    {
      defaultValues: {
        user: "",
        password: "",
      },
      resolver: zodResolver(loginFormSchema),
    }
  );

  const { errors } = formState;

  function handleLogin(data: LoginFormData) {
    console.log(data);
  }

  return (
    <>
      <h1 className="font-instrument-sans font-semibold text-2xl mt-4">
        Acesse sua conta
      </h1>
      <form
        className="w-full px-4 mt-6 gap-3 flex flex-col"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="user" className="text-gray-200 font-medium text-base">
            Usuário
          </label>
          <TextFieldRoot error={Boolean(errors.user)}>
            <AvatarIcon width={18} height={18} className="text-gray-400" />
            <Controller
              {...register("user")}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextFieldInput
                  id="user"
                  placeholder="Digite seu usuário"
                  ref={ref}
                  {...field}
                />
              )}
            />
          </TextFieldRoot>
          {errors.user && <ErrorLabel>{errors.user.message}</ErrorLabel>}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-gray-200 font-medium text-base"
          >
            Senha
          </label>
          <TextFieldRoot error={Boolean(errors.password)}>
            <LockClosedIcon width={18} height={18} className="text-gray-400" />
            <Controller
              control={control}
              {...register("password")}
              render={({ field: { ref, ...field } }) => (
                <TextFieldInput
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="false"
                  ref={ref}
                  {...field}
                />
              )}
            />
          </TextFieldRoot>
          {errors.password && (
            <ErrorLabel>{errors.password.message}</ErrorLabel>
          )}
        </div>

        <div className="w-full mt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-green-500 border border-green-600 p-3 rounded-md mt-4 font-medium hover:bg-green-400 transition-colors"
          >
            Entrar
          </button>
          <Link
            className="underline text-gray-400 hover:text-gray-300"
            to={AUTH_ROUTES.FORGOT_PASSWORD}
          >
            Esqueci minha senha
          </Link>
        </div>

        <div className="flex mt-4 gap-2">
          <span className="text-gray-400">Não possui acesso?</span>
          <Link
            className="underline text-gray-300 hover:text-gray-200"
            to={AUTH_ROUTES.REGISTER}
          >
            Registre-se gratuitamente
          </Link>
        </div>
      </form>
    </>
  );
}
