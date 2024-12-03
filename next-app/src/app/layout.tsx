
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { title } from "process"
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
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}