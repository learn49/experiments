import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import error404 from '../public/404/error-404.svg'

const Page404: NextPage = () => {
    return (
        <div className='bg-404 bg-cover flex flex-col items-center min-h-screen p-12 bg-gray-50 dark:bg-gray-900 '>
            <Image
                src={error404}
                alt='Not found'
                height={300}
                width={300}
            />
            <h1 className='text-4xl lg:text-6xl font-bold text-white mt-4'>
                Erro 404
            </h1>
            <p className='text-white my-4 font-semibold'>Página Não Encontrada</p>
            <Link href='/'>
                <a className='bg-purple-600 px-8 lg:px-24 py-2 rounded-md text-white font-semibold hover:bg-purple-500'>
                    Voltar para Principal
                </a>
            </Link>
        </div>
    )
}

export default Page404