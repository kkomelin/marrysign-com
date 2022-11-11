import { BytesLike } from 'ethers'
import { FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { absoluteAgreementUrl } from '../../lib/helpers'
import Button from './Button'

type Props = {
  agreementId: BytesLike
  className?: string
}
const CopyToClipboardButton: FC<Props> = ({ agreementId, className }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const sharedUrl = absoluteAgreementUrl(agreementId as BytesLike)

  return (
    <>
      <Button
        className={className}
        onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()

          try {
            await navigator.clipboard.writeText(sharedUrl)
            setIsClicked(true)
            toast('Copied to clipboard')
          } catch (err) {
            toast.error('An error has occurred. Please try again.')
            console.log(err)
          }
        }}
      >
        Copy link
      </Button>

      {isClicked && <div className="px-3 py-2 break-all">{sharedUrl}</div>}
    </>
  )
}

export default CopyToClipboardButton
