import {
        ClerkProvider,
        SignInButton,
        SignedIn,
        SignedOut,
        UserButton} from "@clerk/nextjs"
import { Metadata } from "next"
import '@/app/globals.css'

// app/layout.tsx
export const metadata: Metadata = {
    title: 'Ezer Chat'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in" >
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}