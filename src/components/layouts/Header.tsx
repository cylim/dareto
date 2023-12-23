"use client"
import NextImage from 'next/image'
import daretoLogo from '@/assets/logo/logo.png'
import { Auth } from '../auth/Auth'
import { AuthAction } from '../auth/AuthAction'


export const Header = async () => {

  return <header className={'py-4 flex flex-col gap-2 px-2 lg:px-4'}>
    <div className={'flex flex-row items-center justify-between w-full'}>
      <NextImage src={daretoLogo} alt={'kysenpool logo'} width={48} height={48} />
      <Auth>
        <AuthAction />
      </Auth>
    </div>
  </header>
}

export default Header