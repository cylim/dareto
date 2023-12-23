import NextImage from 'next/image'
import daretoLogo from '@/assets/logo/logo.png'

export const Header = async () => {

  return <div className={'py-4 flex flex-col gap-2 px-2 lg:px-4'}>
    <div className={'flex flex-row items-center justify-between w-full'}>
      <div className={"flex flex-row items-center gap-2"}>
        <NextImage src={daretoLogo} alt={'kysenpool logo'} width={48} height={48} />
        {/* <h1>Dare.to</h1> */}
      </div>
      <div className='min-w-[30px]'>
      </div>
    </div>
  </div>
}

export default Header