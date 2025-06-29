"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { XIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { Toast as ToastPrimitives } from "radix-ui"
import { useState, useRef, useCallback } from "react"

import { cn } from "@/lib/utils"

interface ProgressToastProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  variant?: 'success' | 'error'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

function useProgressTimer({
  duration,
  interval = 100,
  onComplete,
}: {
  duration: number
  interval?: number
  onComplete?: () => void
}) {
  const [progress, setProgress] = useState(duration)
  const timerRef = useRef(0)
  const timerState = useRef({
    startTime: 0,
    remaining: duration,
    isPaused: false,
  })

  const cleanup = useCallback(() => {
    window.clearInterval(timerRef.current)
  }, [])

  const reset = useCallback(() => {
    cleanup()
    setProgress(duration)
    timerState.current = {
      startTime: 0,
      remaining: duration,
      isPaused: false,
    }
  }, [duration, cleanup])

  const start = useCallback(() => {
    const state = timerState.current
    state.startTime = Date.now()
    state.isPaused = false

    timerRef.current = window.setInterval(() => {
      const elapsedTime = Date.now() - state.startTime
      const remaining = Math.max(0, state.remaining - elapsedTime)

      setProgress(remaining)

      if (remaining <= 0) {
        cleanup()
        onComplete?.()
      }
    }, interval)
  }, [interval, cleanup, onComplete])

  const pause = useCallback(() => {
    const state = timerState.current
    if (!state.isPaused) {
      cleanup()
      state.remaining = Math.max(
        0,
        state.remaining - (Date.now() - state.startTime)
      )
      state.isPaused = true
    }
  }, [cleanup])

  const resume = useCallback(() => {
    const state = timerState.current
    if (state.isPaused && state.remaining > 0) {
      start()
    }
  }, [start])

  React.useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    progress,
    start,
    pause,
    resume,
    reset,
  }
}

const progressToastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start justify-between overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:data-[swipe-direction=left]:slide-out-to-left-full data-[state=closed]:data-[swipe-direction=right]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
        error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function ProgressToast({
  open,
  onOpenChange,
  title,
  description,
  variant = 'success',
  duration = 5000,
  action,
}: ProgressToastProps) {
  console.log('🎯 ProgressToast rendu avec:', { open, title, variant, duration });

  const { progress, start, pause, resume, reset } = useProgressTimer({
    duration,
    onComplete: () => onOpenChange(false),
  })

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen)
      if (isOpen) {
        reset()
        start()
      } else {
        pause()
      }
    },
    [reset, start, pause, onOpenChange]
  )

  const getIcon = () => {
    if (variant === 'success') {
      return <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
    }
    return <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
  }

  const getProgressColor = () => {
    if (variant === 'success') {
      return 'bg-emerald-500'
    }
    return 'bg-red-500'
  }

  return (
    <ToastPrimitives.Root
      open={open}
      onOpenChange={handleOpenChange}
      onPause={pause}
      onResume={resume}
      className={cn(progressToastVariants({ variant }))}
    >
      <div className="flex w-full justify-between gap-3">
        {getIcon()}
        <div className="flex grow flex-col gap-2">
          <div className="space-y-1">
            <ToastPrimitives.Title className="text-sm font-medium">
              {title}
            </ToastPrimitives.Title>
            {description && (
              <ToastPrimitives.Description className="text-sm opacity-90">
                {description}
              </ToastPrimitives.Description>
            )}
          </div>
          {action && (
            <div>
              <ToastPrimitives.Action
                className="hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 hover:group-[.destructive]:border-destructive/30 hover:group-[.destructive]:bg-destructive focus:group-[.destructive]:ring-destructive focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-[color,box-shadow] outline-none hover:group-[.destructive]:text-white focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
                onClick={action.onClick}
                altText={action.label}
              >
                {action.label}
              </ToastPrimitives.Action>
            </div>
          )}
        </div>
        <ToastPrimitives.Close className="group focus-visible:border-ring focus-visible:ring-ring/50 absolute top-3 right-3 flex size-7 items-center justify-center rounded transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none">
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </ToastPrimitives.Close>
      </div>
      
      {/* Barre de progression - structure d'Origin UI */}
      <div className="contents" aria-hidden="true">
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-1 w-full ${getProgressColor()}`}
          style={{
            width: `${(progress / duration) * 100}%`,
            transition: "width 100ms linear",
          }}
        />
      </div>
    </ToastPrimitives.Root>
  )
} 