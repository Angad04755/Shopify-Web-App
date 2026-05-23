import { lazy, Suspense } from "react";
const Searchbox = lazy(() => import("../components/search/SearchBox"));
const Search = lazy(() => import("../components/search/SearchDetails"))
function SearchPage() {
return (
    <main className="min-h-screen">
    <Suspense>
        <Searchbox/>
        <Search/>
    </Suspense>
    </main>
)
}
export default SearchPage;