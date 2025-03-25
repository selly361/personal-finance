import * as React from "react"

import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

export const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
))
PaginationContent.displayName = "PaginationContent"

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// Props for the link
type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

export const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? "true" : undefined}
    className={cn(
      buttonVariants({
        // You can use "default" or "outline" for the active page
        variant: isActive ? "default" : "ghost",
        size,
      }),
      // If disabled, reduce opacity and block pointer events
      disabled && "pointer-events-none opacity-50 cursor-not-allowed",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

export const PaginationPrevious = ({
  disabled,
  className,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    disabled={disabled}
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

export const PaginationNext = ({
  disabled,
  className,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to next page"
    disabled={disabled}
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

