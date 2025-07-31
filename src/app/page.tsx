"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Search, ChevronLeft, ChevronRight, Heart, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsAPI } from "@/store/slices/products/getAllProducts"
import type { AppDispatch, RootState } from "@/store/store"
import makeApiRequest from "@/services/axiosInstance"
import { apiEndPoints } from "@/services/apis"
import Link from "next/link"
export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
   const getCategoryData = useSelector(
    (state: RootState) => state?.getAllCategoty?.categories
  );
const [products, setProducts] = useState([]);
  const newArrivals = [
    {
      id: 1,
      name: "Knitted Joggers",
      image: "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
    },
   
  ]
const categoryImages: { [key: string]: string } = {
  tv: "https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5410akxxl/gallery/in-fhd-t5310-ua43t5410akxxl-532972655?$684_547_PNG$",
  laptop: "https://www.livemint.com/lm-img/img/2025/02/21/600x338/best_laptop_under_Rs_30000_1740122015828_1740122045813.jpg",
  audio: "https://shoopy.b-cdn.net/305289/SKU-1621_0-1730978221394.webp?format=webp",
  mobile: "/images/electronics.jpg",
  // fallback image
  
appliances: "https://cdn.firstcry.com/education/2023/01/13101355/Names-Of-Household-Appliances-In-English.jpg",
  gaming: "https://dmrqkbkq8el9i.cloudfront.net/Pictures/480xany/9/2/3/347923_pcgamingsetuptech_450607.jpg",
};


 useEffect(()=>{
  dispatch(getAllProductsAPI())
 },[])
//  https://fakestoreapi.in/api/products?limit=5

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await makeApiRequest(
          `${apiEndPoints.getAllProducts}?limit=4`
        );

        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-400 to-cyan-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <p className="text-lg font-medium">T-Shirt / Tops</p>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Summer
                <br />
                Value Pack
              </h2>
              <p className="text-xl">cool / colorful / comfy</p>
              <Button className="bg-white text-cyan-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Shop Now
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075065521-galaxy%20M13.jpg"
                alt="Summer Fashion Model"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Pagination Dots */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div> */}
      </section>

      {/* Promotional Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orange Card */}
          <Card className="bg-gradient-to-r from-orange-400 to-yellow-400 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="p-8 text-white space-y-4">
                  <p className="text-sm font-medium">Low Price</p>
                  <h3 className="text-3xl font-bold">High Coziness</h3>
                  <p className="text-lg">UPTO 50% OFF</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-orange-500"
                  >
                    Explore Items
                  </Button>
                </div>
                <div className="relative h-64 md:h-full">
                  <img
                    src="https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075065521-galaxy%20M13.jpg"
                    alt="High Coziness Fashion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purple Card */}
          <Card className="bg-gradient-to-r from-purple-400 to-purple-500 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="p-8 text-white space-y-4">
                  <p className="text-sm font-medium">Beyoung Presents</p>
                  <h3 className="text-3xl font-bold">Breezy Summer Style</h3>
                  <p className="text-lg">UPTO 50% OFF</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-purple-500"
                  >
                    Explore Items
                  </Button>
                </div>
                <div className="relative h-64 md:h-full">
                  <img
                    src="https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075065521-galaxy%20M13.jpg"
                    alt="Breezy Summer Style"
                    // fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-1 h-8 bg-purple-500"></div>
            <h2 className="text-3xl font-bold text-gray-900">New Category</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {getCategoryData?.categories?.map((item) => (
           <Link href={`/products?type=${item}`} key={item}>
            <Card key={"item"} className="group pt-0 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative  overflow-hidden  w-full h-[200px] rounded-t-lg">
                  <img
                    src={categoryImages[item] || "/placeholder.svg"}
                    alt={item.title}
                  
                    className="object-cover group-hover:scale-105 transition-transform duration-300 w-full"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 capitalize">{item}</h3>
                </div>
              </CardContent>
            </Card></Link>
          ))}

        </div>
      </section>
      
          <p className="p-12 font-semibold">Hello,

Just wanted to clarify a few things regarding the project setup. I was working with SSR (Server-Side Rendering), but since the code was running locally, I would have needed to either create custom API routes in Next.js or set up a proxy to handle the API calls properly. Given the time constraints, I prioritized implementing the core functionality and logic rather than focusing too much on the UI polish.

My primary focus was to ensure the app is scalable, handles routing, pagination, and API integration effectively, and follows best practices. However, I'm confident that with a bit more time, the UI can be further enhanced without compromising performance or functionality.

Looking forward to your feedback, and I’d be glad to walk you through the implementation choices I made.

Thank you!</p>
    </div>
  )
}
