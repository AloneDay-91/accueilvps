import { useState, useCallback } from 'react'

interface ProgressToastConfig {
  title: string
  description?: string
  variant?: 'success' | 'error'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useProgressToast() {
  const [toasts, setToasts] = useState<Array<ProgressToastConfig & { id: string; open: boolean }>>([])

  const showToast = useCallback((config: ProgressToastConfig) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...config, id, open: true }
    
    setToasts(prev => [...prev, newToast])

    // Auto-remove toast after duration
    const duration = config.duration || 5000
    setTimeout(() => {
      setToasts(prev => prev.map(toast => 
        toast.id === id ? { ...toast, open: false } : toast
      ))
      
      // Remove from state after animation completes
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, 500)
    }, duration)
  }, [])

  const closeToast = useCallback((id: string) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, open: false } : toast
    ))
    
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 500)
  }, [])

  const success = useCallback((title: string, description?: string, action?: { label: string; onClick: () => void }) => {
    showToast({ title, description, variant: 'success', action })
  }, [showToast])

  const error = useCallback((title: string, description?: string, action?: { label: string; onClick: () => void }) => {
    showToast({ title, description, variant: 'error', action })
  }, [showToast])

  return {
    toasts,
    showToast,
    closeToast,
    success,
    error,
  }
} 