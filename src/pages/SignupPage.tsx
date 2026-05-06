import { lazy, Suspense } from "react";
const Signup = lazy(() => import("../components/auth/SignupPage"))
function SignupPage() {
    return (
        <Suspense>
            <Signup/>
        </Suspense>
    )
}

export default SignupPage;