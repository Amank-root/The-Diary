
export default function Loading() {
    return (
        <div className="flex py-10 w-full flex-col items-center justify-center bg-background">
            {/* Loader (bouncing dots) */}
            <div className="flex space-x-2">
                <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
            </div>

            {/* Message */}
            <p className="mt-4 text-sm font-medium text-muted-foreground">
                Loading, please wait...
            </p>
        </div>
    )
}
