"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/dashboard/sidebar"
import { User } from "@/types/dashboard"

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21M3 6H21M3 18H21" stroke="#1B212D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        stroke="#929EAE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 18L13.65 13.65" stroke="#929EAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NotificationIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.189 12.0608L16.059 10.1808C15.809 9.7708 15.589 8.9808 15.589 8.5008V6.6308C15.589 3.0008 12.639 0.0508 9.019 0.0508C5.389 0.0608 2.439 3.0008 2.439 6.6308V8.4908C2.439 8.9708 2.219 9.7608 1.979 10.1708L0.849 12.0508C0.419 12.7808 0.319 13.6108 0.589 14.3308C0.859 15.0608 1.469 15.6408 2.269 15.9008C3.349 16.2608 4.439 16.5208 5.549 16.7108C5.659 16.7308 5.769 16.7408 5.879 16.7608C6.019 16.7808 6.169 16.8008 6.319 16.8208C6.579 16.8608 6.839 16.8908 7.109 16.9108C7.739 16.9708 8.379 17.0008 9.019 17.0008C9.649 17.0008 10.279 16.9708 10.899 16.9108C11.129 16.8908 11.359 16.8708 11.579 16.8408C11.759 16.8208 11.939 16.8008 12.119 16.7708C12.229 16.7608 12.339 16.7408 12.449 16.7208C13.569 16.5408 14.679 16.2608 15.759 15.9008C16.529 15.6408 17.119 15.0608 17.399 14.3208C17.679 13.5708 17.599 12.7508 17.189 12.0608ZM9.749 8.0008C9.749 8.4208 9.409 8.7608 8.989 8.7608C8.569 8.7608 8.229 8.4208 8.229 8.0008V4.9008C8.229 4.4808 8.569 4.1408 8.989 4.1408C9.409 4.1408 9.749 4.4808 9.749 4.9008V8.0008ZM11.83 18.01C11.41 19.17 10.3 20 9 20C8.21 20 7.43 19.68 6.88 19.11C6.56 18.81 6.32 18.41 6.18 18C6.31 18.02 6.44 18.03 6.58 18.05C6.81 18.08 7.05 18.11 7.29 18.13C7.86 18.18 8.44 18.21 9.02 18.21C9.59 18.21 10.16 18.18 10.72 18.13C10.93 18.11 11.14 18.1 11.34 18.07C11.5 18.05 11.66 18.03 11.83 18.01Z"
        fill="#929EAE"
      />
    </svg>
  )
}

function DropdownIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.69 0.2939H5.28H1.31C0.63 0.2939 0.29 1.1156 0.77 1.5973L4.44 5.2665C5.02 5.8544 5.98 5.8544 6.57 5.2665L7.96 3.871L10.24 1.5973C10.71 1.1156 10.37 0.2939 9.69 0.2939Z"
        fill="#1B212D"
      />
    </svg>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
      }
    }
  }, [])

  return (
    <header className="flex items-center justify-between border-b border-[#f0f0f0] bg-white px-4 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="rounded-lg p-2 hover:bg-[#f5f5f5] lg:hidden">
              <MenuIcon />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0 bg-[#FAFAFA]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold tracking-tight text-[#1B212D] sm:text-[22px]">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button className="rounded-full p-2 text-[#929EAE] hover:bg-[#f5f5f5]">
          <SearchIcon />
        </button>
        <button className="relative rounded-full p-2 text-[#929EAE] hover:bg-[#f5f5f5]">
          <NotificationIcon />
        </button>

        <div className="flex items-center gap-2 rounded-full bg-[#FAFAFA] px-2 py-1 sm:gap-3 sm:px-3">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarImage src={user?.image || "/images/Mahfuzul Nabil.png"} />
            <AvatarFallback>{user?.fullName?.split(" ").map(n => n[0]).join("") || "MN"}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-[#1B212D] sm:inline">
            {user?.fullName || "Mahfuzul Nabil"}
          </span>
          <DropdownIcon />
        </div>
      </div>
    </header>
  )
}
