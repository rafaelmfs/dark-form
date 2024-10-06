import { zodResolver } from "@hookform/resolvers/zod";
import {
  AvatarIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ErrorLabel } from "../../components/ErrorLabel";
import { TextFieldInput, TextFieldRoot } from "../../components/TextField";
import { AUTH_ROUTES } from "../../constants/routesConstants";

type InptFields = {
  name: "name" | "email" | "user" | "password" | "confirm-password";
  type: string;
  placeholder: string;
  label: string;
  icon: JSX.Element;
};

const fields: InptFields[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Digite seu nome",
    label: "Nome",
    icon: <PersonIcon width={18} height={18} className="text-gray-400" />,
  },
  {
    name: "email",
    type: "text",
    placeholder: "Digite seu email",
    label: "E-mail",
    icon: (
      <EnvelopeClosedIcon width={18} height={18} className="text-gray-400" />
    ),
  },
  {
    name: "user",
    type: "text",
    placeholder: "Digite seu nome de usuário",
    label: "Usuário",
    icon: <AvatarIcon width={18} height={18} className="text-gray-400" />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Crie uma senha",
    label: "Senha",
    icon: <LockClosedIcon width={18} height={18} className="text-gray-400" />,
  },
  {
    name: "confirm-password",
    type: "password",
    placeholder: "Digite novamente sua senha",
    label: "Confirmar senha",
    icon: <LockClosedIcon width={18} height={18} className="text-gray-400" />,
  },
];

const registerFormSchema = z
  .object({
    name: z.string({
      required_error: "Campo obrigatório",
    }),
    email: z
      .string({
        required_error: "Campo obrigatório",
      })
      .email("Digite um email válido"),
    user: z.string({
      required_error: "Campo obrigatório",
    }),
    password: z
      .string({
        required_error: "Campo obrigatório",
      })
      .min(6, "Digite uma senha com no mínimo 6 caracteres"),
    "confirm-password": z.string({
      required_error: "Campo obrigatório",
    }),
  })
  .refine((schema) => schema.password === schema["confirm-password"], {
    path: ["confirm-password"],
    message: "Senhas não conferem",
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function Register() {
  const { control, register, formState, handleSubmit } =
    useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema),
    });
  const { errors } = formState;

  function handleSubmitRegister(data: RegisterFormData) {
    console.log(data);
  }

  return (
    <>
      <h1 className="font-instrument-sans font-semibold text-2xl mt-4">
        Cadastrar
      </h1>
      <form
        className="w-full px-4 mt-6 gap-3 flex flex-col"
        onSubmit={handleSubmit(handleSubmitRegister)}
      >
        {fields.map((field) => (
          <div className="flex flex-col" key={field.name}>
            <label
              htmlFor={field.name}
              className="text-gray-200 font-medium text-base"
            >
              {field.label}
            </label>
            <TextFieldRoot error={Boolean(errors[field.name])}>
              {field.icon}
              <Controller
                control={control}
                {...register(field.name)}
                render={({ field: { ref, ...controlField } }) => (
                  <TextFieldInput
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    ref={ref}
                    {...controlField}
                  />
                )}
              />
            </TextFieldRoot>

            {errors[field.name] && (
              <ErrorLabel>{errors[field.name]?.message}</ErrorLabel>
            )}
          </div>
        ))}

        <div className="w-full mt-2 flex flex-col gap-2">
          <button className="w-full bg-green-500 border border-green-600 p-3 rounded-md mt-4 font-medium hover:bg-green-400 transition-colors">
            Cadastrar
          </button>
        </div>
        <div className="flex mt-4 gap-2">
          <span className="text-gray-400">Já possui acesso?</span>
          <Link
            className="underline text-gray-300 hover:text-gray-200"
            to={AUTH_ROUTES.LOGIN}
          >
            voltar para login
          </Link>
        </div>
      </form>
    </>
  );
}
