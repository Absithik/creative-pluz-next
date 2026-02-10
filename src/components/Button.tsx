import Link from 'next/link'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string
    href?: string
    children: React.ReactNode
    className?: string
}

export default function Button({ to, href, children, className = '', ...props }: ButtonProps) {
    const linkHref = href || to || '';

    if (!linkHref) {
        return (
            <button className={`inline-flex items-center justify-center transition-all ${className}`} {...props}>
                {children}
            </button>
        )
    }

    return (
        <Link href={linkHref}>
            <button className={`inline-flex items-center justify-center transition-all ${className}`} {...props}>
                {children}
            </button>
        </Link>
    )
}
