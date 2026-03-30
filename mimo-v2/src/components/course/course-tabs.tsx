// ═══════════════════════════════════════════════════════════
// Course Tabs Component - Tabbed navigation for course sections
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CourseTabsProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
}

export function CourseTabs({ tabs }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex gap-1 -mb-px overflow-x-auto" aria-label="Course sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 font-mono text-sm font-medium uppercase tracking-wider whitespace-nowrap",
                "border-b-2 transition-colors duration-200",
                activeTab === tab.id
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              )}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
