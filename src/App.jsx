
import { AuthProvider } from "@/contexts/AuthProvider"
import { PostProvider } from "@/contexts/PostContext"
import React from "react"
// import ReactDOM from "react-dom/client"

// import {Home} from "@/pages/HomePage"
import Routes from "@/routes"
// import { Route } from "react-router"

function App() {
  return (
    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   {/* <Button>Click me</Button>
    //    */}
    //  <Button variant="outline">Button</Button>
      
    // </div>
        
    <AuthProvider>
      <PostProvider>
        <Routes />
      </PostProvider>
    </AuthProvider>
  )
}

export default App