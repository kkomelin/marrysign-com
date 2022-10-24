import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'
import auth from '../../../lib/auth/init'

type Props = {}
const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <WagmiConfig client={auth.wagmiClient}>
      <RainbowKitProvider
        chains={auth.chains}
        theme={lightTheme({
          accentColor: '#c084fc', // primary color, see _variables.css.
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AuthProvider
