"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastAction, ToastClose } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface ProgressToastConfig {
  title: string;
  description?: string;
  variant?: 'success' | 'error';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ProgressToastContextType {
  toasts: Array<ProgressToastConfig & { id: string; open: boolean }>;
  showToast: (config: ProgressToastConfig) => void;
  closeToast: (id: string) => void;
  success: (title: string, description?: string, action?: { label: string; onClick: () => void }) => void;
  error: (title: string, description?: string, action?: { label: string; onClick: () => void }) => void;
}

const ProgressToastContext = createContext<ProgressToastContextType | undefined>(undefined);

export function ProgressToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<ProgressToastConfig & { id: string; open: boolean }>>([]);

  const showToast = useCallback((config: ProgressToastConfig) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...config, id, open: true };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    const duration = config.duration || 5000;
    setTimeout(() => {
      setToasts(prev => prev.map(toast => 
        toast.id === id ? { ...toast, open: false } : toast
      ));
      
      // Remove from state after animation completes
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, 500);
    }, duration);
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, open: false } : toast
    ));
    
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 500);
  }, []);

  const success = useCallback((title: string, description?: string, action?: { label: string; onClick: () => void }) => {
    showToast({ title, description, variant: 'success', action });
  }, [showToast]);

  const error = useCallback((title: string, description?: string, action?: { label: string; onClick: () => void }) => {
    showToast({ title, description, variant: 'error', action });
  }, [showToast]);

  return (
    <ProgressToastContext.Provider value={{ toasts, showToast, closeToast, success, error }}>
      <ToastProvider>
        {children}
        <ToastViewport className="sm:right-auto sm:left-0" />
        {/* Rendu des toasts avec barre de progression */}
        {toasts.map((toast) => (
          <ToastWithProgress
            key={toast.id}
            toast={toast}
            onClose={closeToast}
          />
        ))}
      </ToastProvider>
    </ProgressToastContext.Provider>
  );
}

// Composant Toast avec barre de progression
function ToastWithProgress({ 
  toast, 
  onClose 
}: { 
  toast: ProgressToastConfig & { id: string; open: boolean };
  onClose: (id: string) => void;
}) {
  const duration = toast.duration || 5000;
  const [progress, setProgress] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  // Démarrer le timer quand le toast s'ouvre
  useEffect(() => {
    if (toast.open) {
      setProgress(duration);
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        
        const elapsedTime = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, duration - elapsedTime);
        
        setProgress(remaining);

        if (remaining <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onClose(toast.id);
        }
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [toast.open, duration, onClose, toast.id]);

  // Debug: log du progress
  useEffect(() => {
    // Log supprimé pour la production
  }, [progress, duration]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        onClose(toast.id);
      }
    },
    [onClose, toast.id]
  );

  return (
    <Toast
      open={toast.open}
      onOpenChange={handleOpenChange}
    >
      <div className="flex w-full justify-between gap-3">
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <ToastTitle className="text-xs font-normal">{toast.title}</ToastTitle>
            {toast.description && (
              <ToastDescription className="text-xs">{toast.description}</ToastDescription>
            )}
          </div>
          {toast.action && (
            <div>
              <ToastAction altText={toast.action.label} asChild>
                <Button size="sm" className="text-xs" onClick={toast.action.onClick}>
                  {toast.action.label}
                </Button>
              </ToastAction>
            </div>
          )}
        </div>
        <ToastClose asChild>
          <Button
            variant="ghost"
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
            aria-label="Close notification"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </ToastClose>
      </div>
      
      {/* Barre de progression */}
      <div className="contents" aria-hidden="true">
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-0.5 w-full ${
            toast.variant === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`}
          style={{
            width: `${(progress / duration) * 100}%`,
            transition: "width 100ms linear",
          }}
        />
      </div>
    </Toast>
  );
}

export function useProgressToast() {
  const context = useContext(ProgressToastContext);
  if (context === undefined) {
    throw new Error('useProgressToast must be used within a ProgressToastProvider');
  }
  return context;
} 