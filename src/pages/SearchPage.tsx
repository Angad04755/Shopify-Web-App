import { lazy, Suspense } from "react";
const Search = lazy(() => import("../components/search/SearchPage"))
function SearchPage() {
return (
    <Suspense>
        <Search/>
    </Suspense>
)
}
export default SearchPage;