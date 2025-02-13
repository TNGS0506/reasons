"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const reasons = [
    "Миний мэдрэмж, сэтгэл хөдлөлийг ойлгож, надад үргэлж санаа тавьдаг.",
    "Миний мөрөөдлийг ойлгож, урам зориг өгдөг.",
    "Зорилгодоо хүрэхийн тулд шаргуу хөдөлмөрлөж, шантардаггүй.",
    "Чамтай хамт байх мөч бүхэн аз жаргалаар дүүрэн.",
    "Дэлхий дээр чамаас өөр хэн ч чиний орон зайг нөхөж чадахгүй.",
    "Юуг ч өөрчлөхийг шаардалгүй, яг байгаагаар минь хүлээж авдаг.",
    "Чиний инээмсэглэл, харц, бүх зүйл чинь намайг татдаг.",
    "Чамтай учирсан нь миний амьдралын хамгийн сайхан бэлэг.",
    "Чи зүгээр л төгс",
    "Би чамд ХАЙРТАЙ",
    "Хайрт чамдаа гэгээн Валентины мэнд хүргэе",
];

const FloatingHeart = ({ delay }: { delay: number }) => (
    <div
        className="absolute animate-float opacity-30"
        style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
        }}
    >
        <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
    </div>
);

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timer = setInterval(() => {
            setActiveIndex((current) =>
                current === reasons.length - 1 ? 0 : current + 1
            );
        }, 3500);

        return () => clearInterval(timer);
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <main className="min-h-screen overflow-hidden relative bg-gradient-to-br from-red-50 via-rose-100 to-pink-200 dark:from-rose-950 dark:via-pink-900 dark:to-purple-900">
            {/* Floating hearts */}
            {[...Array(15)].map((_, i) => (
                <FloatingHeart key={i} delay={i * 0.5} />
            ))}

            <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('bg.jpg')] bg-cover bg-center opacity-4.5" />

                <div className="relative z-10">
                    <h1
                        className={`text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-300 dark:to-pink-300 text-transparent bg-clip-text drop-shadow-lg ${pacifico.className}`}
                    >
                        Reasons To Love Oyu
                    </h1>

                    <div className="relative w-full max-w-2xl min-h-[300px]">
                        {reasons.map((reason, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out",
                                    {
                                        "opacity-90 translate-y-0":
                                            index === activeIndex,
                                        "opacity-0 translate-y-8":
                                            index !== activeIndex,
                                    }
                                )}
                                style={{
                                    transform:
                                        index === activeIndex
                                            ? "none"
                                            : "translateY(20px)",
                                    visibility:
                                        index === activeIndex
                                            ? "visible"
                                            : "hidden",
                                }}
                            >
                                <div className="bg-white/60 dark:bg-gray-800/60 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-rose-200/50 dark:border-rose-800/50 hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
                                    <div className="flex items-center justify-center mb-4">
                                        <Heart
                                            className="w-8 h-8 text-rose-500 animate-pulse"
                                            fill="currentColor"
                                        />
                                    </div>
                                    <p className="text-xl md:text-2xl text-center text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                        {reason}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex gap-2 justify-center">
                        {reasons.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    {
                                        "bg-rose-500 scale-125":
                                            index === activeIndex,
                                        "bg-rose-300 hover:bg-rose-400":
                                            index !== activeIndex,
                                    }
                                )}
                                aria-label={`Go to reason ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
