import { Modal, ModalContent } from "@nextui-org/react"

interface ModalBaseProps {
  isOpen: boolean,
  onOpenChange: (val: any) => void,
  children: React.ReactNode
}

export const ModalBase = ({ isOpen, onOpenChange, children }: ModalBaseProps) => {

  return <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'outside'} backdrop={'blur'} onClose={() => onOpenChange(false)} hideCloseButton classNames={{
    backdrop: "bg-gradient-to-t from-zinc-950 to-zinc-950/10 backdrop-opacity-100 brightness-50 backdrop-blur-md",
    base: "bg-transparent max-w-lg shadow-none",
  }}>
    <ModalContent className="border-0 border-transparent ">
      {children}
    </ModalContent>
  </Modal>
}

export default ModalBase