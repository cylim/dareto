export const truncate = (addr: string, count = 4): string => `${addr.substring(0, count + 2)}...${addr.substring(addr.length - count)}`

export const formatAddress = (addr: string, count = 4): string =>
  addr?.length >= 42 && addr?.startsWith('0x')
    ? truncate(addr, count)
    : addr
