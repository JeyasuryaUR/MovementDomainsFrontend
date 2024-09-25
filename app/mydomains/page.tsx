"use client";
import DomainList from "@/components/DomainList";
import bg1 from "@/assets/images/bg1.png";

export default function MyDomainsPage() {
  return (
    <main
      className="flex flex-col h-full"
    >
      <section className="container flex-grow flex justify-center w-full px-4 md:px-0">
        <DomainList />
      </section>
    </main>
  );
}