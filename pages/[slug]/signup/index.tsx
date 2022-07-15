import { Formik, Field, Form, FormikHelpers } from "formik";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { Label } from "./Label";

interface SignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export default function Signup() {
  const handleSubmit = (
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <div className="flex flex-col h-screen overflow-y-auto md:flex-row">
        <div className="bg-initial flex bg-cover bg-center w-full md:w-1/2 h-64 md:h-auto"></div>
        <main className="flex justify-center items-center p-6 sm:px-8 md:w-1/2">
          <div className="w-full max-w-lg">
            <h1 className="mb-4 text-xl font-semibold text-gray-600 dark:text-gray-200 capitalize">
              friendlyName
            </h1>
            <p className="text-gray-500 -mt-5 mb-3">
              É bom ter você aqui! Crie uma conta!
            </p>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                acceptTerms: false,
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <Label className="dark:text-gray-200">
                  <span>Nome</span>
                  <Field
                    className="mt-1 border border-opacity-50"
                    type="text"
                    id="firstName"
                    placeholder="Nome"
                    name="firstName"
                  />
                </Label>
                <Label className="mt-2 dark:text-gray-200">
                  <span>Último Nome</span>
                  <Field
                    css="mt-1 border border-opacity-50 border-gray-200"
                    type="text"
                    id="lastName"
                    placeholder="Nome"
                    name="lastName"
                  />
                </Label>
                <Label className="mt-2 dark:text-gray-200">
                  <span>Email</span>
                  <Field
                    className="mt-1 border border-opacity-50 border-gray-200"
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    name="email"
                  />
                </Label>
                <Label className="mt-2 dark:text-gray-200">
                  <span>Senha</span>
                  <Field
                    className="mt-1 border border-opacity-50 border-gray-200"
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    name="password"
                  />
                </Label>
                <Label check className="mt-2 dark:text-gray-200">
                  <Field className="" type="checkbox" name="acceptTerms" />
                  <span className="ml-2">
                    Criar uma conta significa que você concorda com nossos{" "}
                    <Link href="/accept-terms" passHref>
                      <a className="text-gray-800 font-medium hover:underline hover:text-gray-600">
                        Termos de Serviço,
                      </a>
                    </Link>
                    <Link href="/policies" passHref>
                      <a className="text-gray-800 font-medium hover:underline hover:text-gray-600">
                        Política de Privacidade
                      </a>
                    </Link>{" "}
                    e nossas{" "}
                    <Link href="/policies" passHref>
                      <a className="text-gray-800 font-medium hover:underline hover:text-gray-600">
                        Configurações de Notificações.
                      </a>
                    </Link>
                  </span>
                </Label>
                <Button
                  className="mt-4 dark:text-gray-200"
                  // block
                  size="large"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </Form>
            </Formik>

            <hr className="my-3" />
            <div className="flex justify-between">
              <Link href="/">
                <a className="text-sm text-gray-500 hover:text-gray-600 hover:underline cursor-pointer font-semibold">
                  Fazer Login
                </a>
              </Link>
              <div className="text-right">
                <Image src="/devpleno.svg" alt="Logo" height={25} width={81} />
              </div>
            </div>
            {/* {siteKey && (
              <ReCaptcha ref={captchaRef} size="invisible" sitekey={siteKey} />
            )} */}
          </div>
        </main>
      </div>
    </div>
  );
}
