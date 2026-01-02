import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatCards } from "@/components/dashboard/stat-cards"
import { WorkingCapitalChart } from "@/components/dashboard/working-capital-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { WalletCards } from "@/components/dashboard/wallet-cards"
import { ScheduledTransfers } from "@/components/dashboard/scheduled-transfers"
import { apiFetch } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import type { 
  FinancialSummary, 
  Transaction, 
  WalletCard, 
  ScheduledTransfer, 
  Stat, 
  WorkingCapitalApiResponse, 
  TransactionsApiResponse, 
  ScheduledTransfersApiResponse 
} from "@/types/dashboard"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  // Get browser locale or fallback to 'en-US'
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(date)
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const [summaryRes, workingCapitalRes, recentTransactionsRes, walletRes, scheduledTransfersRes] = await Promise.all([
    apiFetch<FinancialSummary>("/financial/summary", { token }),
    apiFetch<WorkingCapitalApiResponse["data"]>("/financial/working-capital", { token }),
    apiFetch<TransactionsApiResponse["data"]>("/financial/transactions/recent", { token }),
    apiFetch<{ cards: WalletCard[] }>("/financial/wallet", { token }),
    apiFetch<ScheduledTransfersApiResponse["data"]>("/financial/transfers/scheduled", { token }),
  ])

  // Redirect to sign-in if any request fails with unauthorized
  if (
    summaryRes.message === "Unauthorized" ||
    workingCapitalRes.message === "Unauthorized" ||
    recentTransactionsRes.message === "Unauthorized" ||
    walletRes.message === "Unauthorized" ||
    scheduledTransfersRes.message === "Unauthorized"
  ) {
    redirect("/")
  }

  const mockData = {
    transactions: [
      { id: "trx_001", name: "iPhone 17 Pro MAX", business: "Apple Inc.", image: "https://i.ibb.co/Apple-Logo.png", type: "Mobile", amount: -420.84, currency: "TRY", date: "2025-10-06T10:30:00.000Z", status: "completed" },
      { id: "trx_002", name: "Netflix Subscription", business: "Netflix", image: "https://i.ibb.co/Netflix-Logo.png", type: "Entertainment", amount: -100, currency: "TRY", date: "2025-10-06T04:30:00.000Z", status: "completed" },
      { id: "trx_003", name: "Figma Subscription", business: "Figma Inc.", image: "https://i.ibb.co/Figma-Logo.png", type: "Software", amount: -244.2, currency: "TRY", date: "2025-10-05T22:30:00.000Z", status: "completed" },
      { id: "trx_004", name: "Monthly Salary", business: "Tech Corp Ltd.", image: "https://i.ibb.co/Company-Logo.png", type: "Salary", amount: 45000, currency: "TRY", date: "2025-10-05T16:30:00.000Z", status: "completed" }
    ],
    summary: { totalIncome: 45000, totalExpense: 765.04, count: 4 },
    cards: [
      { id: "card_001", name: "Maglo Gold Card", type: "credit" as const, cardNumber: "5495 7381 3759 2321", bank: "Maglo | Universal Bank", network: "Visa", expiryMonth: 12, expiryYear: 2027, color: "#000000", isDefault: true, balance: 0, currency: "TRY" }
    ],
    chartData: [
      { month: "Ocak", income: 65000, expense: 42000, net: 23000 },
      { month: "Şubat", income: 70000, expense: 45000, net: 25000 },
      { month: "Mart", income: 68000, expense: 43000, net: 25000 },
      { month: "Nisan", income: 75000, expense: 48000, net: 27000 },
      { month: "Mayıs", income: 80000, expense: 52000, net: 28000 },
      { month: "Haziran", income: 78000, expense: 50000, net: 28000 },
    ]
  }

  // Use API data if available, otherwise fallback to mockData
  const totalIncomeValue = summaryRes.data?.totalBalance.amount ?? 
                          recentTransactionsRes.data?.summary?.totalIncome ?? 
                          mockData.summary.totalIncome

  const totalExpenseValue = (typeof summaryRes.data?.totalExpense === 'object' ? summaryRes.data.totalExpense.amount : null) ?? 
                           recentTransactionsRes.data?.summary?.totalExpense ?? 
                           mockData.summary.totalExpense

  const finalTransactions = recentTransactionsRes.data?.transactions && recentTransactionsRes.data.transactions.length > 0 
    ? recentTransactionsRes.data.transactions 
    : mockData.transactions

  const incomeCurrency = summaryRes.data?.totalBalance.currency || "TRY"
  const expenseCurrency = (typeof summaryRes.data?.totalExpense === 'object' ? summaryRes.data.totalExpense.currency : null) || "TRY"
  const savingsCurrency = (typeof summaryRes.data?.totalSavings === 'object' ? summaryRes.data.totalSavings.currency : null) || "TRY"

  // 1. StatCards mapping
  const mappedStats: Stat[] = [
    {
      label: "Total Income",
      value: formatCurrency(totalIncomeValue, incomeCurrency),
      highlight: true,
    },
    {
      label: "Total Expense",
      value: formatCurrency(totalExpenseValue, expenseCurrency),
      highlight: false,
    },
    {
      label: "Total Savings",
      value: formatCurrency(totalIncomeValue - totalExpenseValue, savingsCurrency),
      highlight: false,
    },
  ]

  const chartPoints = workingCapitalRes.data?.data || []
  const chartData = chartPoints.length > 0 
    ? chartPoints.map((point) => ({
        date: point.month,
        income: point.income,
        expense: point.expense,
      }))
    : mockData.chartData.map((point) => ({
        date: point.month,
        income: point.income,
        expense: point.expense,
      }))

  const transactions = finalTransactions.map((t: any) => ({
    ...t,
    amount: formatCurrency(t.amount, t.currency || "TRY"),
    date: formatDate(t.date),
    status: t.status === "completed" ? "Success" : "Pending",
    icon: t.name?.toLowerCase().includes("apple") || t.business?.toLowerCase().includes("apple") ? "apple" :
          t.name?.toLowerCase().includes("netflix") || t.business?.toLowerCase().includes("netflix") ? "netflix" :
          t.name?.toLowerCase().includes("figma") || t.business?.toLowerCase().includes("figma") ? "figma" :
          "apple"
  }))

  const walletCards = walletRes.data?.cards && walletRes.data.cards.length > 0 
    ? walletRes.data.cards 
    : mockData.cards

  const scheduledTransfers = [
    {
      id: "sch_001",
      name: "Saleh Ahmed",
      image: "https://ui-avatars.com/api/?name=Saleh+Ahmed&background=random&size=100",
      date: "2022-04-28T11:00:00Z",
      amount: -435,
      currency: "TRY",
      status: "scheduled"
    }
  ]

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex flex-1 flex-col gap-6 overflow-auto p-4 sm:p-8 xl:flex-row">
          <div className="flex-1 space-y-6 min-w-0">
            <StatCards stats={mappedStats} />
            <WorkingCapitalChart 
              data={chartData} 
              currency={workingCapitalRes.data?.currency || "TRY"} 
            />
            <RecentTransactions transactions={transactions} />
          </div>

          <div className="w-full xl:w-[360px] flex-shrink-0">
            <WalletCards cards={walletCards.length > 0 ? walletCards : mockData.cards} />
            <ScheduledTransfers transfers={scheduledTransfers} />
          </div>
        </main>
      </div>
    </div>
  )
}
