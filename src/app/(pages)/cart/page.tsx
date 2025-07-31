"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/store/slices/cart/cart";

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  shipping: number;
  image: string;
}

export default function CartPage() {
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = () => {
    // Coupon logic would go here
    console.log("Applying coupon:", couponCode);
  };
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);
  console.log("cartItems:", cartItems);

  const dispatch = useDispatch<AppDispatch>();

  const updateQty = (id: number, quantity: number) => {
    dispatch(decrementQuantity({ id, quantity }));
  };

  const removeItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const increaseQty = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const decreaseQty = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalShipping = cartItems.reduce(
    (sum, item) => sum + (item.shipping ?? 0),
    0
  );
  const grandTotal = subtotal + totalShipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Cart Table Header */}
        <div className="bg-gray-700 text-white px-6 py-4 rounded-t-lg">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium">
            <div className="col-span-4">PRODUCT DETAILS</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-center">SHIPPING</div>
            <div className="col-span-1 text-center">SUBTOTAL</div>
            <div className="col-span-1 text-center">ACTION</div>
          </div>
        </div>

        {/* Cart Items */}
        <Card className="rounded-t-none">
          <CardContent className="p-0">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-12 gap-4 items-center p-6 ${
                  index !== cartItems.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Product Details */}
                <div className="col-span-4 flex items-center space-x-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    {/* <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p> */}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  {/* <span className="font-medium">${item.price.toFixed(2)}</span> */}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => decreaseQty(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-3 py-1 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => increaseQty(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Shipping */}
                <div className="col-span-2 text-center">
                  {/* <span className={item.shipping === 0 ? "text-green-600 font-medium" : "text-gray-600"}>
                    {item.shipping === 0 ? "FREE" : `$${item.shipping.toFixed(2)}`}
                  </span> */}
                </div>

                {/* Subtotal */}
                <div className="col-span-1 text-center">
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-1 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Discount Codes */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Discount Codes
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter your coupon code if you have one
              </p>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={applyCoupon}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Apply Coupon
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full lg:w-auto bg-transparent"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    ${totalShipping.toFixed(2)}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
