//add async so it is rendered on the server once, it nakes this function a server componenet
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { LogIn, ArrowRight } from "lucide-react"
//import FileUpload from "@/components/FileUpload";
//import { checkSubscription } from "@/lib/subscription";
//import SubscriptionButton from "@/components/SubscriptionButton";


export default async function Home() {
  const { userId } = await auth()
  const isAuth = !!userId
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 via-blue-400 to-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-white text-5xl font-semibold"> Chat with Ezer</h1>
            <UserButton> </UserButton>
          </div>
          <div className="flex mt-2">
            {isAuth && (<Link href="/chat">
              <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
            </Link>)
            }
          </div>
          <p className="max-w-xl mt-1 text-lg text-600">
            Join millions of students, researchers and professionals to instantly
            answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <h1>File upload</h1>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}