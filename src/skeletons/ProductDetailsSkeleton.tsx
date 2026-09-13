const ProductDetailsSkeleton = () => {
    return (
        <main className="min-h-screen bg-gray-100 animate-pulse">
            <section className="mx-auto container p-8">
                <article className="flex flex-col place-content-center w-full">
                    <div className="bg-gray-200 rounded-xl h-[400px] md:h-[500px] w-full"></div>
                    <div className="flex flex-row place-content-center gap-4 mt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                     <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    </div>
                </article>

                   <article className="flex flex-col place-content-center space-y-5 w-full md:w-1/2">

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
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-[1fr_1fr] gap-4">

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
          <div className="flex flex-row gap-5">
            <div className="mt-4 h-12 w-36 bg-gray-200 rounded-lg"></div>
            <div className="mt-4 h-12 w-16 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Product Details */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>

            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-40"></div>
              <div className="h-5 bg-gray-200 rounded w-72"></div>
            </div>
          </div>

          {/* Delivery */}
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
      <section className="mx-auto container p-8">
        <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>

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
      <section className="mx-auto container p-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-6">
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-80 bg-gray-200 rounded-xl"></div>
        </div>
            </section>
        </main>
    )
}

export default ProductDetailsSkeleton;