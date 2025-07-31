"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, SlidersHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import makeApiRequest from "@/services/axiosInstance";
import { apiEndPoints } from "@/services/apis";
import Link from "next/link";
import ReactPaginate from "react-paginate";
// import { Slider } from "@/components/ui/slider"

export default function WomensClothingPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [priceRange, setPriceRange] = useState([70, 500]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const getCategoryData = useSelector(
    (state: RootState) => state?.getAllCategoty?.categories
  );
  const searchParams = useSearchParams();
  const category = searchParams.get("type");

  const [products, setProducts] = useState([]);
  console.log("products:", products);

  const toggleLike = (productId: number) => {
    setLikedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // api fetch for products by category

  //   const

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const url = `${apiEndPoints.productCategory}?type=${category}`;
      const response = await makeApiRequest(url);
      const allProducts = response.products || [];

      // Pagination logic on frontend
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = allProducts.slice(start, end);

      setProducts(paginatedProducts);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (category) {
    fetchProducts();
  }
}, [category, page]);



  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1); // react-paginate is 0-based
  };

   const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Under $500", min: 0, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $2000", min: 1000, max: 2000 },
    { label: "Above $2000", min: 2000, max: Infinity },
  ];

const [selectedRange, setSelectedRange] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);
useEffect(() => {
    if (selectedRange) {
      const selected = priceRanges.find((range) => range.label === selectedRange);
      const filtered = products.filter(
        (item) => item.price >= selected.min && item.price <= selected.max
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    }, [selectedRange, products]);
   const handleChange = (e) => {
    const selected = priceRanges.find((range) => range.label === e.target.value);
    setSelectedRange(selected.label);

    const filtered = products.filter(
      (item) => item.price >= selected.min && item.price <= selected.max
    );
    setFilteredProducts(filtered);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter by category
                  </h3>
                  {/* <SlidersHorizontal className="w-5 h-5 text-gray-500" /> */}
                </div>

                {/* Categories */}
                <div className="space-y-3 mb-8">
                  {getCategoryData?.categories?.map((item: string) => {
                    const isActive = category === item;

                    return (
                      <div
                        key={item}
                        className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 -mx-2"
                      >
                        <Link
                          href={`/products?type=${item}`}
                          className={`text-sm hover:text-gray-900 transition-all capitalize ${
                            isActive
                              ? "text-blue-600 font-semibold underline"
                              : "text-gray-700"
                          }`}
                        >
                          {item}
                        </Link>

                        {/* Optional icon if needed */}
                        {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
                      </div>
                    );
                  })}
                </div>

                {/* Price Filter */}
                {/* <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center justify-between">
                    Price
                    <ChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
                  </h4>

                </div> */}

                <div className="mb-6">
  <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-2">
    Filter by Price
  </label>
  <select
    id="price-filter"
    value={selectedRange}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-md p-2"
  >
    {priceRanges.map((range) => (
      <option key={range.label} value={range.label}>
        {range.label}
      </option>
    ))}
  </select>
</div>

              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {/* Women&rsquo;s Clothing */}
              </h1>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => {
                return (
                  <>
                    {" "}
                    {/* <Link href={`products/${product.id}`}> */}
                      {" "}
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          {/* Product Image */}
                          <div className="relative  bg-gray-100">
                            <img
                              src={
                                product.image ||
                                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                              }
                              alt="Fjallraven Backpack"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Heart Icon */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add dummy handler or remove
                              }}
                            >
                              <Heart className="w-4 h-4 text-gray-600" />
                            </Button>
                          </div>

                          {/* Product Info */}
                          <div className="p-4 space-y-2">
                            <h3 className="font-medium text-gray-900 line-clamp-2">
                              {product?.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Model: {product?.model}, Color: {product?.color}
                              <span
                                className="inline-block w-3 h-3 rounded-full ml-2 border"
                                style={{ backgroundColor: product?.color }}
                              ></span>
                            </p>

                            <p className="text-lg font-bold text-gray-900">
                              ${product?.price}
                            </p>
                          </div>
                          {/* add to cart  */}
                               <div className=" flex  gap-4 justify-center items-center p-4">
                                 {/* <Button
                                variant="outline"
                                className="= bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 "
                                >
                                Add to Cart
                                </Button> */}
                                 <Link
                                // variant="outline"
                                className="= bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 border-2 px-2 py-1 rounded-md"
                                href={`products/${product.id}`}
                                >
                                View Detail
                                </Link>
                               </div>

                        </CardContent>
                      </Card>
                    {/* </Link> */}
                  </>
                );
              })}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
             <div className="mt-10 flex justify-center">
 <ReactPaginate
  previousLabel={"←"}
  nextLabel={"→"}
  breakLabel={"..."}
  breakClassName={"break-me"}
  pageCount={totalPages}              // ✅ dynamic total pages
  marginPagesDisplayed={2}
  pageRangeDisplayed={3}
  onPageChange={handlePageClick}      // ✅ updates `page`
  containerClassName={"flex gap-2"}
  pageClassName={"px-3 py-1 border rounded-md"}
  activeClassName={"bg-blue-600 text-white"}
  previousClassName={"px-3 py-1 border rounded-md"}
  nextClassName={"px-3 py-1 border rounded-md"}
  disabledClassName={"opacity-50"}
/>
<p className="text-center mt-4 text-gray-500 text-sm">
  Showing page {page} of {totalPages}
</p>

</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
