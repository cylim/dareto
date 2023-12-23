import { StatCard } from "./StatCard"

const colors = ['red', 'blue']

const items = [
  { title: 'DAO Funded', accounts: ["0x9EfF95aE55bd46b86EE43f79780D5C73A95Fd3f0"]},
  { title: 'Donated', accounts: ["0xF847EB8ffFa5cADf96d59e206C8F2925a1FF6006", "0xAbB840EF2f94925e957B6680541793565d63f228"]},
]

export const GeneralStats = () => {

  const renderCard = (item: typeof items[0], index: number) => {
    return <StatCard key={item.title} item={item} color={colors[index % colors.length]} />
  }

  return <section className="flex flex-col items-center w-full pt-16">
    <a id="networks" />
    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 py-8">
      {items.map(renderCard)}
    </div>
  </section>
}