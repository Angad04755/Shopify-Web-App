import { lazy, Suspense } from "react";
const Search = lazy(() => import("../components/search/SearchDetails"))
function SearchPage() {
return (
    <main className="min-h-screen">
    <Suspense>
        <Search/>
    </Suspense>
    </main>
)
}
export default SearchPage;