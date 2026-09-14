const ProductDetailsSkeleton = () => {
    return (
        <main className="min-h-screen bg-gray-100 animate-pulse">

            {/* Main Product Section */}
            <section className="mx-auto container px-8 py-10 flex flex-col md:flex-row gap-12">


                    {/* Left - Product Image */}
                    <article className="flex flex-col place-content-center">

                        <div className="w-full h-[350px] md:w-[750px] md:h-[550px] bg-gray-200 rounded-xl"></div>

                        {/* Image Navigation */}
                        <div className="flex flex-row place-content-center gap-4 mt-6">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        </div>

                    </article>


                    {/* Right - Product Information */}
                    <article className="flex flex-col place-content-center space-y-5">

                        {/* Title */}
                        <div className="space-y-2">
                            <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-7 bg-gray-200 rounded w-1/2"></div>
                        </div>


                        {/* Price */}
                        <div className="h-6 bg-gray-200 rounded w-24"></div>


                        {/* Stock */}
                        <div className="flex items-center gap-3">
                            <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-24 bg-gray-200 rounded"></div>
                        </div>


                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>


                        {/* Product Info */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">

                            <div>
                                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                                <div className="h-5 bg-gray-200 rounded w-24"></div>
                            </div>

                            <div>
                                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-5 bg-gray-200 rounded w-28"></div>
                            </div>

                            <div>
                                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                                <div className="h-5 bg-gray-200 rounded w-20"></div>
                            </div>

                            <div>
                                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                                <div className="h-5 bg-gray-200 rounded w-28"></div>
                            </div>

                        </div>


                        {/* Buttons */}
                        <div className="flex flex-row gap-5 pt-2">

                            <div className="h-12 w-36 bg-gray-200 rounded-lg"></div>

                            <div className="h-12 w-16 bg-gray-200 rounded-lg"></div>

                        </div>


                        {/* Product Details */}
                        <div>

                            <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>

                            <div className="space-y-2">
                                <div className="h-5 bg-gray-200 rounded w-40"></div>
                                <div className="h-5 bg-gray-200 rounded w-72"></div>
                            </div>

                        </div>


                        {/* Delivery & Warranty */}
                        <div>

                            <div className="h-6 bg-gray-200 rounded w-64 mb-3"></div>

                            <div className="space-y-2">
                                <div className="h-5 bg-gray-200 rounded w-full"></div>
                                <div className="h-5 bg-gray-200 rounded w-full"></div>
                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                            </div>

                        </div>

                    </article>

            </section>


            {/* Reviews */}
            <section className="mx-auto container px-8 py-8">

                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>

                <div className="w-full bg-gray-200 rounded-xl p-8">

                    {/* Reviewer */}
                    <div className="h-5 bg-gray-300 rounded w-32"></div>

                    <div className="h-4 bg-gray-300 rounded w-48 mt-2"></div>


                    {/* Rating + Date */}
                    <div className="flex justify-between mt-4">

                        <div className="h-5 bg-gray-300 rounded w-20"></div>

                        <div className="h-5 bg-gray-300 rounded w-32"></div>

                    </div>


                    {/* Review */}
                    <div className="space-y-2 mt-6">

                        <div className="h-4 bg-gray-300 rounded w-full"></div>

                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

                    </div>

                </div>

            </section>


            {/* Related Products */}
            <section className="mx-auto container px-8 py-8">

                <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="h-80 bg-gray-200 rounded-xl"></div>

                    <div className="h-80 bg-gray-200 rounded-xl"></div>

                    <div className="h-80 bg-gray-200 rounded-xl"></div>

                    <div className="h-80 bg-gray-200 rounded-xl"></div>

                </div>

            </section>

        </main>
    );
};

export default ProductDetailsSkeleton;