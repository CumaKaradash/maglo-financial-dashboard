import { ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScheduledTransfer } from "@/types/dashboard"

interface ScheduledTransfersProps {
  transfers: ScheduledTransfer[]
}

export function ScheduledTransfers({ transfers }: ScheduledTransfersProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatAmount = (amount: number, currency: string): string => {
    const absAmount = Math.abs(amount)
    return `${absAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Scheduled Transfers</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-[#22C55E]">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {transfers.length > 0 && (
        <div className="space-y-4">
          {transfers.map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={transfer.image || "/placeholder.svg"} />
                  <AvatarFallback>{transfer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[#1a1a2e]">{transfer.name}</p>
                  <p className="text-sm text-[#22C55E]">{formatDate(transfer.date)}</p>
                </div>
              </div>
              <span className="font-medium text-[#1a1a2e]">
                - {transfer.currency}{formatAmount(transfer.amount, transfer.currency)}
              </span>
            </div>
          ))}
        </div>
      )}

      {transfers.length === 0 && (
        <div className="space-y-4">
          <p className="text-[#929EAE]">Planlanmış transfer bulunamadı</p>
        </div>
      )}
    </div>
  )
}
