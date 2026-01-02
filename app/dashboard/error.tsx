"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error)
    
    // Show a centralized toast notification
    toast.error(error.message || "An error occurred while loading the dashboard. Please try again.", {
      id: "dashboard-error",
      duration: 5000,
      position: "top-center",
    })
  }, [error])

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#fafafa] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-gray-100">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={32} />
        </div>
        
        <h2 className="mb-2 text-2xl font-bold text-[#1a1a2e]">Oops! Something went wrong</h2>
        <p className="mb-8 text-[#6b7280]">
          We encountered an error while fetching your dashboard data. Don't worry, your data is safe.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => {
              toast.loading("Retrying...", { id: "dashboard-retry" })
              reset()
              setTimeout(() => toast.dismiss("dashboard-retry"), 1000)
            }} 
            className="h-12 w-full bg-[#C8EE44] text-[#1a1a2e] hover:bg-[#b8de34] font-semibold gap-2"
          >
            <RefreshCcw size={18} />
            Try Again
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = "/dashboard"}
            className="text-[#6b7280] hover:text-[#1a1a2e]"
          >
            Refresh Page
          </Button>
        </div>
        
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 text-left">
            <p className="text-xs font-mono text-red-400 bg-red-50 p-3 rounded-lg overflow-auto max-h-32">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
