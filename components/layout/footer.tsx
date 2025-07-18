export function Footer() {
  return (
    <footer className="flex shrink-0 items-center justify-between gap-2 border-t px-4 py-3 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Apple-Inspired Layout. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          Privacy Policy
        </p>
        <p className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          Terms of Service
        </p>
      </div>
    </footer>
  )
}
