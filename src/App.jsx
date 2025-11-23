
import { AuthProvider } from "@/contexts/AuthContext"
import Routes from "@/routes"

function App() {
  return (
    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   {/* <Button>Click me</Button>
    //    */}
    //  <Button variant="outline">Button</Button>
      
    // </div>
        <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App