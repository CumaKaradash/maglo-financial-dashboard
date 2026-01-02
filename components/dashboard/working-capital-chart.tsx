"use client"

import { useState, useRef, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { ChartDataPoint } from "@/types/dashboard"
import { Shower } from "./shower"
import { cn, formatCurrency } from "@/lib/utils"

function ChevronDownIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CustomTooltip({
  active,
  payload,
  label,
  currency = "TRY",
}: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string; currency?: string }) {
  if (active && payload && payload.length) {
    const income = payload.find((p) => p.dataKey === "income")?.value || 0
    const expense = payload.find((p) => p.dataKey === "expense")?.value || 0
    const difference = income - expense

    return (
      <div className="rounded-lg bg-[#1B212D] px-4 py-3 shadow-xl border border-white/10 min-w-[160px]">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C8EE44]" />
              <span className="text-[11px] text-gray-300">Income</span>
            </div>
            <span className="text-xs font-bold text-white">{formatCurrency(income, currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#29A073]" />
              <span className="text-[11px] text-gray-300">Expense</span>
            </div>
            <span className="text-xs font-bold text-white">{formatCurrency(expense, currency)}</span>
          </div>
          <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium text-gray-400">Net Balance</span>
            <span className={cn("text-xs font-bold", difference >= 0 ? "text-[#C8EE44]" : "text-red-400")}>
              {formatCurrency(difference, currency)}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

interface WorkingCapitalChartProps {
  data: ChartDataPoint[]
  currency?: string
}

export function WorkingCapitalChart({ data, currency = "TRY" }: WorkingCapitalChartProps) {
  const [period, setPeriod] = useState("Last 7 days")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const periods = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="rounded-[10px] border border-[#F5F5F5] bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[#1B212D]">Working Capital</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C8EE44]" />
            <span className="text-sm text-[#6b7280]">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#29A073]" />
            <span className="text-sm text-[#6b7280]">Expenses</span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] hover:bg-gray-50 transition-colors"
            >
              {period}
              <ChevronDownIcon />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-lg z-50">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      period === p ? "bg-[#C8EE44]/10 text-[#1B212D] font-medium" : "text-[#6b7280] hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-[240px] relative">
        <div className="absolute inset-0 flex justify-between items-end px-4 pb-8 pointer-events-none">
          {data?.map((_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              {activeIndex === i && <Shower />}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setActiveIndex(e.activeTooltipIndex)
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid
              stroke="#FFF4FE"
              strokeWidth={1}
              horizontal={true}
              vertical={true}
              horizontalCoordinatesGenerator={(props) => [60, 120, 180]}
            />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
              domain={[0, 10000]}
              ticks={[0, 3000, 5000, 7000, 10000]}
            />
            <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#C8EE44"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#C8EE44", stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#29A073"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#29A073", stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
