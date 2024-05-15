import { Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn} from '@clerk/clerk-react';
import NavBar from '../components/NavBar/';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

function RootLayout()  {

    const navigate = useNavigate();

    return (
        <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
            <header className="header">
                <div>
                <SignedIn>
                    <NavBar />
                </SignedIn>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    )
}

export default RootLayout;