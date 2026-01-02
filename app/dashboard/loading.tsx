import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-[#fafafa]">
      {/* Sidebar Skeleton */}
      <div className="flex h-full w-[240px] flex-col bg-[#fafafa] p-6">
        {/* Logo */}
        <Skeleton className="mb-10 h-8 w-32" />

        {/* Menu Items */}
        <div className="space-y-2">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Bottom Items */}
        <div className="mt-auto space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex flex-1 gap-6 overflow-auto p-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            {/* Working Capital Chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-50">
              <div className="mb-8 flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
              </div>
              <div className="relative h-[250px] w-full">
                {/* Chart Bars/Lines Simulation */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-2 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 items-center w-full">
                      <Skeleton 
                        className="w-1.5 rounded-full" 
                        style={{ height: `${Math.random() * 60 + 20}%` }} 
                      />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-50">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="space-y-4">
                {/* Table Header Shimmer */}
                <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-50">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                {/* Table Rows Shimmer */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 py-3 items-center border-b border-gray-50/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[360px] flex-shrink-0 space-y-6">
            {/* Wallet Cards */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="relative h-[280px]">
                <Skeleton className="absolute left-0 top-0 h-[180px] w-full rounded-2xl" />
                <Skeleton className="absolute bottom-0 left-4 right-4 h-[140px] rounded-2xl" />
              </div>
            </div>

            {/* Scheduled Transfers */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
