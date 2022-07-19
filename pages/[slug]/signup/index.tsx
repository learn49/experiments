import { createRef } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ReCaptcha from "react-google-recaptcha";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { Label } from "./Label";

import DevplenoLogo from "../../../public/devpleno.svg";

interface SignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export default function Signup() {
  // const siteKey = process.env.RECAPTCHA_SITE_KEY;
  // const captchaRef = createRef<ReCaptcha>();

  const handleSubmit = (
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) => {
    const results = {
      ...values,
      // captcha: captchaRef.current?.getValue(),
    };
    setTimeout(() => {
      alert(JSON.stringify(results, null, 2));
      setSubmitting(false);
    }, 500);
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Campo obrigatório"),
    lastName: Yup.string().required("Campo obrigatório"),
    email: Yup.string().required("Campo obrigatório").email("Email inválido"),
    password: Yup.string()
      .required("Campo obrigatório")
      .min(6, "Mínimo de 6 caracteres"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Deve-se aceitar os Termos & Condições"
    ),
  });

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 `}>
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
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form>
                  <Label>
                    <span className="block">Nome</span>
                    <Field
                      className="mt-1 border border-opacity-50 w-full text-sm rounded-md p-2 "
                      type="text"
                      id="firstName"
                      placeholder="Nome"
                      name="firstName"
                    />
                    {errors.firstName ? (
                      <div className="text-xs text-red-300">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </Label>
                  <Label className="mt-2 block">
                    <span className="block">Último Nome</span>
                    <Field
                      className="mt-1 border border-opacity-50 w-full text-sm rounded-md p-2"
                      type="text"
                      id="lastName"
                      placeholder="Nome"
                      name="lastName"
                    />
                    {errors.lastName ? (
                      <div className="text-xs text-red-300">
                        {errors.lastName}
                      </div>
                    ) : null}
                  </Label>
                  <Label className="mt-2">
                    <span className="block">Email</span>
                    <Field
                      className="mt-1 border border-opacity-50 w-full text-sm rounded-md p-2"
                      type="email"
                      id="email"
                      placeholder="Digite seu email"
                      name="email"
                    />
                    {errors.email ? (
                      <div className="text-xs text-red-300">{errors.email}</div>
                    ) : null}
                  </Label>
                  <Label className="mt-2">
                    <span className="block">Senha</span>
                    <Field
                      className="mt-1 border border-opacity-50 w-full text-sm rounded-md p-2"
                      type="password"
                      id="password"
                      placeholder="Digite sua senha"
                      name="password"
                    />
                    {errors.password ? (
                      <div className="text-xs text-red-300">
                        {errors.password}
                      </div>
                    ) : null}
                  </Label>
                  <Label check={true} className="mt-2">
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
                      {errors.acceptTerms ? (
                        <div className="text-xs text-red-300">
                          {errors.acceptTerms}
                        </div>
                      ) : null}
                    </span>
                  </Label>
                  <Button
                    className="mt-4 w-full bg-purple-600 rounded-md text-white text-lg font-bold py-3 hover:bg-purple-600"
                    block={false}
                    size="large"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                </Form>
              )}
            </Formik>

            <hr className="my-3" />
            <div className="flex justify-between">
              <Link href="/">
                <a className="text-sm text-gray-500 hover:text-gray-600 hover:underline cursor-pointer font-semibold">
                  Fazer Login
                </a>
              </Link>
              <div className="text-right">
                <Image src={DevplenoLogo} alt="Logo" height={25} width={81} />
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
