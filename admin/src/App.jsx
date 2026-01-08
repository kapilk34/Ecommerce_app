import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const App = () => {
  return (
    <>
    <h1>Welcome to Ecommerce App</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App