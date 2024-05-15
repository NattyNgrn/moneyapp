import { Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function NavBar() {
    

    return (
        <div className="object-top w-2/5 flex items-center justify-center bg-pink-500 h-16 rounded-full m-4">
            <div className="flex items-center justify-center  text-violet-900">
                <nav>
                    <ul>
                        <button className="hover:bg-violet-200 p-px px-2 rounded mx-2 bg-violet-300 text-2xl">
                            <Link to={"/Tracker"}>Tracker</Link>
                        </button>

                        <button className="hover:bg-violet-200 p-px px-2 rounded mx-2 bg-violet-300 text-2xl">
                            <Link to={"/Goals"}>Goals</Link>
                        </button>
                            
                        <button className="hover:bg-violet-200 p-px px-2 rounded mx-2 bg-violet-300 text-2xl">
                            <Link to={"/Reports"}>Reports</Link>
                        </button>
                    </ul> 
                </nav>
                <div className="scale-150 m-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default NavBar;