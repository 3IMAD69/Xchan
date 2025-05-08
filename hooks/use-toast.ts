"use client"

// This is a simplified version of the toast hook
// In a real app, you would use a proper toast library

import { useState } from "react"

type ToastProps = {
  title: string
  description: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Date.now()
    const newToast = { ...props, id }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, props.duration || 3000)

    // For simplicity, we're using browser's alert
    // In a real app, you would render a proper toast component
    alert(`${props.title}\n${props.description}`)

    return id
  }

  return { toast, toasts }
}
