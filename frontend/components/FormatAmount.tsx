"use client";

import { useEffect, useState } from "react";

export default function FormatAmount({ amount }: { amount: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

  if (!mounted) {
    return <span>${amount.toLocaleString()}</span>;
  }

  return <>{formatted}</>;
}