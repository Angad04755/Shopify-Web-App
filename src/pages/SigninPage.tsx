import { lazy, Suspense } from "react";
const Signin = lazy(() => import("../components/auth/SigninPage"))
function SigninPage() {
    return (
        <Suspense>
            <Signin/>
        </Suspense>
    )
}

export default SigninPage;