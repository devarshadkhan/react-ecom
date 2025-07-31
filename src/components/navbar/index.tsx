"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAPI } from "@/store/slices/products/getAllProducts";
import type { AppDispatch, RootState } from "@/store/store";
import { getAllProductsCategoryAPI } from "@/store/slices/category/getAllCategory";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getCategoryData = useSelector(
    (state: RootState) => state?.getAllCategoty?.categories
  );
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  useEffect(() => {
    dispatch(getAllProductsCategoryAPI());
  }, []);

  const totalItems = useSelector((state) =>
    state.cartSlice.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <>
      {" "}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link className="text-2xl font-bold text-gray-900" href={"/"}>
              Euphoria
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {getCategoryData?.categories?.map((item: string) => {
                const isActive = currentType === item;
                return (
                  <>
                    <Link
                      key={item}
                      href={`/products?type=${item}`}
                      className={`text-sm hover:text-gray-900 transition-all capitalize ${
                        isActive
                          ? "text-blue-600 font-semibold underline"
                          : "text-gray-700"
                      }`}
                    >
                      {item}
                    </Link>
                  </>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search" className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Link href={"/cart"} className="h-auto ">
              <ShoppingBag className="w-5 h-5" />{" "}
              <Badge className=" relative bottom-6 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1">
                {totalItems}
              </Badge>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
