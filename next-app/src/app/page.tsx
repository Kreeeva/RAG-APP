//add async so it is rendered on the server once, it nakes this function a server componenet
export default async function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold"> Chat with Ezer</h1>
          </div>
        </div>
      </div>
      
    </div>
  )
}