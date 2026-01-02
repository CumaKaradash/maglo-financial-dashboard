export interface Stat {
  label: string
  value: string
  highlight: boolean
}

export interface ChartDataPoint {
  date: string
  income: number
  expense: number
}

export interface Transaction {
  id: string | number
  name: string
  business: string
  type: string
  amount: number | string
  date: string
  status: "Success" | "Pending" | "Failed"
  icon: string
  image?: string
  currency: string
}

export interface WalletCard {
  id: string
  name: string
  type: "credit" | "debit"
  bank: string
  cardNumber: string
  expiryMonth: number
  expiryYear: number
  color?: string
  network: string
  isDefault: boolean
}

export interface WalletApiResponse {
  success: boolean
  message: string
  data: {
    cards: WalletCard[]
  }
}

export interface ScheduledTransfer {
  id: string
  name: string
  image: string
  date: string
  amount: number
  currency: string
  status?: string
}

export interface ScheduledTransfersSummary {
  totalScheduledAmount: number
  count: number
}

export interface ScheduledTransfersApiResponse {
  success: boolean
  message: string
  data: {
    transfers: ScheduledTransfer[]
    summary: ScheduledTransfersSummary
  }
}

export interface User {
  id: string
  fullName: string
  email: string
  role: string
  image?: string
  isActive?: boolean
  lastLoginAt?: string
  lastLoginIP?: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    accessToken: string
  }
}

export interface FinancialSummary {
  totalBalance: { amount: number; currency: string }
  totalExpense: { amount: number; currency: string }
  totalSavings: { amount: number; currency: string }
}

export interface WorkingCapitalPoint {
  month: string
  income: number
  expense: number
  net: number
}

export interface WorkingCapitalSummary {
  totalIncome: number
  totalExpense: number
  netBalance: number
}

export interface WorkingCapitalApiResponse {
  success: boolean
  message: string
  data: {
    period: string
    currency: string
    data: WorkingCapitalPoint[]
    summary: WorkingCapitalSummary
  }
}

export interface TransactionsApiResponse {
  success: boolean
  message: string
  data: {
    transactions: Transaction[]
    summary: {
      totalIncome: number
      totalExpense: number
      count: number
    }
  }
}

export interface DashboardData {
  stats: Stat[]
  chartData: ChartDataPoint[]
  transactions: Transaction[]
  walletCards: WalletCard[]
  scheduledTransfers: ScheduledTransfer[]
}
