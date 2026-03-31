import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import { Container } from "@/components/layout/container"

export function NotFoundPage() {
  return (
    <div className="py-32">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
