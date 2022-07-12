import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/devpleno.svg'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})
const Login: NextPage = () => {
  const form = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      console.log(values)
    },
  })
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
      <div className='flex flex-col md:flex-row h-screen overflow-y-auto'>
        <div className=' flex h-64 md:h-auto w-full md:w-1/2 bg-initial bg-cover bg-center'></div>
        <main className='flex justify-center items-center md:w-1/2 p-6 sm:px-8 '>
          <div className='w-full max-w-lg'>
            <h1 className='mb-4 text-xl font-semibold text-gray-600 dark:text-gray-200 capitalize'>
              friendlyName
            </h1>
            <p className='-mt-5 mb-3 text-gray-500 '>Faça seu login ou cadastre-se</p>
            <form onSubmit={form.handleSubmit}>
              <label className='grid grid-cols-1 '>
                <span className='text-sm text-gray-600 dark:text-gray-200 capitalize'>Email</span>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder='Digite seu email'
                  className='
                  block w-full px-3 py-2 
                  bg-white dark:bg-gray-700
                  border border-opacity-50 border-gray-200 focus:border-sky-600 dark:focus:border-green-200
                  text-sm dark:text-gray-300 placeholder-slate-400
                  focus:ring-1 focus:ring-sky-600 dark:focus:ring-green-200
                  rounded-lg shadow-sm focus:outline-none'
                />
                <p className='text-xs text-red-300'>{form.errors.email}</p>
              </label>
              <label className='mt-4 grid grid-cols-1 '>
                <span className='text-sm text-gray-600 dark:text-gray-200 capitalize'>Senha</span>
                <input
                  type='password'
                  id='passwd'
                  name='password'
                  value={form.values.password}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder='Digite sua senha'
                  className='
                  block w-full px-3 py-2 
                  bg-white dark:bg-gray-700
                  border border-opacity-50 border-gray-200 focus:border-sky-600 dark:focus:border-green-200
                  text-sm dark:text-gray-300 placeholder-slate-400
                  focus:ring-1 focus:ring-sky-600 dark:focus:ring-green-200
                  rounded-lg shadow-sm focus:outline-none'
                />
                <p className='text-xs text-red-300 '>{form.errors.password}</p>
              </label>
              <button
                className='
                w-full mt-4 py-3.5 
                bg-purple-600 hover:bg-purple-700
                text-white font-medium leading-5
                cursor-pointer transition-colors duration-150
                focus:ring focus:ring-purple-300
                focus:outline-none
                box-border rounded-lg '
                type='submit'
              >
                Entrar
              </button>
            </form>
            <button className=' 
            w-full mt-4 py-3.5 px-5 rounded-lg focus:outline-none
            bg-white active:bg-transparent
            font-medium text-gray-600 leading-5 active:text-gray-500
            border border-gray-300 hover:border-gray-500 focus:border-gray-500
            focus:ring focus:ring-gray-300
            transition-colors duration-150'>
              Criar Conta
            </button>
            <hr className='my-3' />
            <div className='flex justify-between'>
              <Link href='/forgot'>
                <a className='text-sm font-semibold text-gray-500 hover:text-gray-600 hover:underline cursor-pointer '>
                  Esqueceu sua Senha?
                </a>
              </Link>
              <div className='text-right'>
                <Image src={logo} alt='Logo' height={25} width={81} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default Login
