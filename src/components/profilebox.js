import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileBox({ userName = "User" }) {
  // Generate a random seed for the avatar
  const seed = Math.random().toString(36).substring(7)
  const avatarUrl = `https://api.dicebear.com/6.x/bottts/svg?seed=${seed}`

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-100">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={80}
              height={80}
              className="rounded-full bg-white p-1"
            />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome,</h2>
            <p className="text-lg sm:text-xl text-gray-600 mt-1">{userName}</p>
          </div>
          <div className="flex-shrink-0 mt-4 sm:mt-0">
            <Button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white">
              View Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}