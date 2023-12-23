import { useEffect, useState } from 'react'

export const StatCard = ({ item, color }: { item: any, color: string }) => {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    (async () => {
      // const amounts = await item.accounts.map(
      //   async (acc: string) => await balance({
      //     accountIdentifier: acc,
      //     index: {
      //       identity: new AnonymousIdentity()
      //     }
      //   }))
      //   console.log(amounts)
    })();

  }, [amount])

  const renderOverview = () => {
    return <section className={`absolute transition-opacity duration-1000 overflow-hidden text w-full h-full`}>
      <div className={'flex flex-col justify-between w-full h-full'}>
        <div className={'flex flex-row justify-between items-center'}>
          <span className="text-base font-bold tracking-wide uppercase">{item.title}</span>
        </div>
        <span className={'font-medium text-5xl tracking-tight leading-normal text-center'}>{amount} <span className={'font-medium text-xl tracking-tight leading-normal text-center'}>ICP</span></span>
      </div>
    </section>
  }

  return <div
    className={`card-${color} h-[180px] md:w-[320px] w-full rounded-[48px] px-8 py-10 shadow`}
  >
    <div className={'relative h-full w-full rounded-[48px]'}>
      {renderOverview()}
    </div>
  </div>
}