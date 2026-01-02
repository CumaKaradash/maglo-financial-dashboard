import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/types/dashboard"

function AppleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="5" fill="#E4F1FF" />
      <image href="/images/Iphone.png" x="4" y="4" width="32" height="32" preserveAspectRatio="xMidYMid slice" />
    </svg>
  )
}

function Iphone13ProMaxIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="5" fill="#F3F4F6" />
      <image href="/images/Iphone.png" x="4" y="4" width="32" height="32" preserveAspectRatio="xMidYMid slice" />
    </svg>
  )
}

function NetflixIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="5" fill="#F3F4F6" />
      <image href="/images/netlifx.png" x="4" y="4" width="32" height="32" preserveAspectRatio="xMidYMid slice" />
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="5" fill="#F3F4F6" />
      <image href="/images/figma.png" x="4" y="4" width="32" height="32" preserveAspectRatio="xMidYMid slice" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function getIconComponent(icon: string) {
  switch (icon) {
    case "apple":
      return <AppleIcon />
    case "iphone13promax":
      return <Iphone13ProMaxIcon />
    case "netflix":
      return <NetflixIcon />
    case "figma":
      return <FigmaIcon />
    default:
      return <AppleIcon />
  }
}

function StatusBadge({ status }: { status: "Success" | "Pending" }) {
  if (status === "Success") {
    return <Badge className="bg-[#DCFCE7] text-[#166534] hover:bg-[#DCFCE7] font-medium">Success</Badge>
  }
  return <Badge className="bg-[#FEF3C7] text-[#92400E] hover:bg-[#FEF3C7] font-medium">Pending</Badge>
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="rounded-[10px] border border-[#F5F5F5] bg-white p-6 overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Recent Transaction</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-[#22c55e]">
          View All
          <ChevronRightIcon />
        </button>
      </div>

      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-[#f0f0f0]">
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
              Name/Business
            </th>
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[#9ca3af]">Type</th>
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[#9ca3af]">Amount</th>
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[#9ca3af]">Date</th>
            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-[#9ca3af]">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id} className="border-b border-[#f0f0f0] last:border-0">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  {getIconComponent(transaction.icon)}
                  <div>
                    <p className="font-medium text-[#1a1a2e]">{transaction.name}</p>
                    <p className="text-sm text-[#9ca3af]">{transaction.business}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 text-[#6b7280]">{transaction.type}</td>
              <td className="py-4 font-medium text-[#1a1a2e]">{transaction.amount}</td>
              <td className="py-4 text-[#6b7280]">{transaction.date}</td>
              <td className="py-4">
                <StatusBadge status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
