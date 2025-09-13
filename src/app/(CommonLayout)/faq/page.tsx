"use client";

import { House } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = { id: string; question: string; answer: string };
type FAQSection = { title: string; items: FAQItem[] };

const sections: FAQSection[] = [
  {
    title: "General Questions",
    items: [
      {
        id: "1",
        question:
          "What materials are used in your clothing and accessories, and are they sustainably sourced?",
        answer:
          "We prioritize high-quality and sustainable materials such as organic cotton, recycled polyester, and ethically sourced leather. Each product page lists the fabric composition and sustainability certifications, so customers can make informed, eco-friendly choices.",
      },
      {
        id: "2",
        question: "How can I find the right size when shopping online?",
        answer:
          "Every product page includes a detailed size chart with measurements in inches and centimeters. We also provide model information and real customer feedback on fit to help you choose the correct size. If you're between sizes, we generally recommend sizing up for comfort.",
      },
      {
        id: "3",
        question:
          "Do you provide care instructions for your fashion items and accessories?",
        answer:
          "Yes, each product comes with specific care instructions. For example, most apparel can be machine-washed on a gentle cycle in cold water, while delicate fabrics like silk should be dry cleaned. Jewelry and leather accessories should be kept away from moisture and stored properly to maintain their quality.",
      },
      {
        id: "4",
        question:
          "Are your products ethically made, and do you work with fair-trade suppliers?",
        answer:
          "We partner only with suppliers who follow fair labor practices and meet global ethical standards. Many of our items are crafted by artisans paid fair wages, and we routinely audit our supply chain to ensure compliance with ethical production standards.",
      },
      {
        id: "5",
        question: "Do you restock popular items once they are sold out?",
        answer:
          "Yes, we frequently restock bestsellers. You can sign up for a 'Back in Stock' alert on each product page to be notified by email as soon as your desired size or color becomes available again.",
      },
    ],
  },
  {
    title: "Shipping & Returns",
    items: [
      {
        id: "1",
        question:
          "What shipping options do you offer, and how long will delivery take?",
        answer:
          "We offer standard, express, and international shipping options. Standard delivery within the U.S. takes 3–5 business days, express shipping takes 1–2 business days, and international delivery times vary by region, typically ranging from 5–10 business days.",
      },
      {
        id: "2",
        question: "How can I track my order once it has been shipped?",
        answer:
          "As soon as your order leaves our warehouse, you will receive an email with a tracking number and a direct link to the courier’s website. You can also log in to your account to view real-time tracking updates for all your orders.",
      },
      {
        id: "3",
        question:
          "What is your return policy if an item doesn’t fit or meet my expectations?",
        answer:
          "We accept returns within 30 days of delivery for unworn and unused items with tags still attached. Returns within the U.S. are free, while international customers may be responsible for return shipping costs. Refunds are processed within 5–7 business days after we receive the returned item.",
      },
      {
        id: "4",
        question: "Do you offer exchanges for different sizes or colors?",
        answer:
          "Yes, if the item you purchased doesn’t fit or you prefer a different color, you can request an exchange instead of a refund. Exchanges are free for U.S. customers and follow the same 30-day policy as returns.",
      },
      {
        id: "5",
        question: "What should I do if my package is lost or arrives damaged?",
        answer:
          "All shipments are insured, so if your package is lost or arrives damaged, please contact our customer support team immediately. We will work with the courier to resolve the issue and arrange for a replacement or full refund as quickly as possible.",
      },
    ],
  },
];

const Page = () => {
  return (
    <div>
      <div className="h-16" />
      <div>
        <div className="flex flex-col items-center justify-center py-10 bg-slate-800/80 text-white">
          <h1 className="text-4xl font-medium">FAQ</h1>
          <nav className="mt-4 text-lg">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex items-start gap-1"
                >
                  <House size={16} className="mt-1" />
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <span className="font-medium">FAQ</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 w-full lg:w-11/12 mx-auto pt-10 pb-28 min-h-screen">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="lg:text-4xl md:text-2xl text-xl font-semibold text-slate-800 tracking-tighter mb-4">
              {section.title}
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full text-base font-sans"
              defaultValue={section.items[0]?.id}
            >
              {section.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-red-700 text-base">
                    {item.id}. {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
