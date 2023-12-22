export type CharityType = {
  title: string,
  walletAddress: string
}

export const charities = [
  {
    title: 'Plant a Red Panda Home',
    walletAddress: ''
  },
  {
    title: 'No Panda Poaching',
    walletAddress: ''
  },
  {
    title: 'Fulgens DAO',
    walletAddress: ''
  },
] as const satisfies CharityType[]
