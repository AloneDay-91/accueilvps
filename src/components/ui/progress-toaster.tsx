"use client"

import { useProgressToast } from "@/hooks/use-progress-toast"
import { ProgressToast } from "@/components/ui/progress-toast"
import { ToastProvider } from "@/components/ui/toast"

export function ProgressToaster() {
  const { toasts } = useProgressToast()

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <ProgressToast
          key={toast.id}
          open={toast.open}
          onOpenChange={(open) => !open && toast.id && useProgressToast().closeToast(toast.id)}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          duration={toast.duration}
          action={toast.action}
        />
      ))}
    </ToastProvider>
  )
} 