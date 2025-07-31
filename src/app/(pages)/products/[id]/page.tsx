"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star, Heart, Play, ChevronRight, Shield, Truck, RotateCcw, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { getProductsByIDAPI } from "@/store/slices/products/getProductByID"
import { addToCart } from "@/store/slices/cart/cart"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("L")
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
 const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>()
  const productDetail = useSelector((state: RootState) => state?.getProductByIDSlice?.productDetail?.
product)
  console.log("productDetail:", productDetail);
  

  const productImages = [  productDetail?.image
  ]

  const sizes = ["XS", "S", "M", "L", "XL"]

  const colors = [
    { name: "black", value: "#000000" },
    { name: "yellow", value: "#FCD34D" },
    { name: "pink", value: "#F472B6" },
    { name: "red", value: "#EF4444" },
  ]

const specifications = [
  { label: "Brand", value: productDetail?.brand },
  { label: "Model", value: productDetail?.model },
  { label: "Color", value: productDetail?.color },
  { label: "Category", value: productDetail?.category },
  { label: "Discount", value: productDetail?.discount ? `${productDetail.discount}%` : "No Discount" },
];


useEffect(() => {
    if (id) {
      dispatch(getProductsByIDAPI(id));
    }
  }, [id]);




  const handleAddToCart = () => {
    dispatch(addToCart({
      id: productDetail.id,
      title: productDetail.title,
      price: productDetail.price,
      image: productDetail.image,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        {/* <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <a href="#" className="hover:text-gray-700">
            Shop
          </a>
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="hover:text-gray-700">
            Women
          </a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Top</span>
        </nav> */}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt="Product Image"
        
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image }
                    alt={`Product view ${index + 1}`}
                    
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productDetail?.title}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 3.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-2">3.5</span>
                </div>
                <a href="#" className="text-sm text-purple-600 hover:underline">
                  120 comment
                </a>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                <a href="#" className="text-sm text-purple-600 hover:underline flex items-center">
                  Size Guide
                  <ChevronRight className="w-3 h-3 ml-1" />
                </a>
              </div>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-purple-500 bg-purple-50 text-purple-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Colours Available</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.name ? "border-gray-400" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center space-x-4">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3"   onClick={handleAddToCart}>Add to cart</Button>
              <div className="text-2xl font-bold text-gray-900">${productDetail?.price}</div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Secure payment</span>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Size & Fit</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Free shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Free Shipping & Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-16">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-1 h-8 bg-purple-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Product Description</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="comments" className="flex items-center space-x-2">
                    <span>User comments</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-600">
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="flex items-center space-x-2">
                    <span>Question & Answer</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      0
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6 space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                   {productDetail?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-900">{spec.label}</span>
                        <span className="text-sm text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="mt-6">
                  <div className="text-center py-8 text-gray-500">User comments will be displayed here</div>
                </TabsContent>

                <TabsContent value="qa" className="mt-6">
                  <div className="text-center py-8 text-gray-500">Questions and answers will be displayed here</div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Video Section */}
            {/* <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900">
                    <Image
                      src="/placeholder.svg?height=300&width=400&text=Product+Video"
                      alt="Product Video"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/50 text-white">1:00 M</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">Raven Hoodie with black colored design</h3>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
