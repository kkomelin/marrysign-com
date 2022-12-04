import { BigNumber, BytesLike } from 'ethers'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { SERVICE_FEE_PERCENT } from '../../lib/config'
import { handleContractError } from '../../lib/helpers'
import { terminateAgreement } from '../../lib/services/agreement'
import { convertETHToUSD } from '../../lib/services/chainlink'
import { MarrySign } from '../../typechain'
import { ICustomContractError } from '../../types/ICustomContractError'
import { useAppContext } from '../hooks/useAppContext'
import ConfirmDialog from '../misc/ConfigmDialog'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementTerminated: (agreementId: BytesLike) => void
}
const TerminateAgreementForm: FC<Props> = (props) => {
  const { onAgreementTerminated, agreement } = props
  const { showAppLoading, hideAppLoading } = useAppContext()

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
  const [valueInUSD, setValueInUSD] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const handleTerminateAgreement = async () => {
    try {
      showAppLoading('Terminating the agreement...')

      const successful = await terminateAgreement(
        agreement.id.toString(),
        BigNumber.from(agreement.terminationCost),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementTerminated(agreementId)
        }
      )
      if (!successful) {
        hideAppLoading()
        handleContractError('Transaction failed for some reason.')
      }
    } catch (e: ICustomContractError) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  const updateUSD = async (valueInETF: BigNumber | undefined) => {
    // Don't send one more request if we're waiting for a response already.
    if (loading) {
      return
    }

    setLoading(true)
    if (
      valueInETF === undefined ||
      valueInETF == null ||
      valueInETF === BigNumber.from(0)
    ) {
      setValueInUSD(0)
      setLoading(false)
      return
    }

    const amountInUSD = await convertETHToUSD(valueInETF)

    setValueInUSD(Number(amountInUSD))
    setLoading(false)
  }

  useEffect(() => {
    if (agreement) {
      updateUSD(BigNumber.from(agreement.terminationCost))
    }
  }, [agreement])

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <div className="flex flex-col justify-between">
          <button
            className="text-primary hover:underline"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              openConfirmDialog()
            }}
          >
            What if I changed my mind?
          </button>
          {/* <Button color="secondary" onClick={handleTerminateAgreement}>
            Terminate
          </Button> */}
        </div>
      </form>
      <ConfirmDialog
        open={confirmDialogOpen}
        title="You can terminate your agreement but..."
        description={
          <div>
            You will be charged the equivalent of{' '}
            <b>${agreement.terminationCost.toString()} ETH</b>{' '}
            {valueInUSD ? <b>(currently ${valueInUSD} USD)</b> : ''}. Most of it
            will be transferred to your ex, except our{' '}
            <b>{SERVICE_FEE_PERCENT}%</b> service fee.
          </div>
        }
        confirmButtonLabel="Terminate & pay fees"
        onConfirm={handleTerminateAgreement}
        onClose={closeConfirmDialog}
        onCancel={closeConfirmDialog}
      />
    </div>
  )
}

export default TerminateAgreementForm
