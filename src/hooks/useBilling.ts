// hooks/useBilling.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plan, App, ValidForType, OrderPayload } from '@/@types/subscription';
import { getValidForMultiplier, getDiscountPercentage } from '@/utils/pricing';

const NEW_BASE_URL = 'https://gian-1eve.onrender.com';

// Define Razorpay response types
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

// Declare Razorpay window interface
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export const useBilling = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedApps, setSelectedApps] = useState<App[]>([]);
  const [teamCount, setTeamCount] = useState(1);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${NEW_BASE_URL}/api/v1/subscription/plans`);
      const data = response.data;
      setPlans(data?.result?.data.plans || []);
      setApps(data?.result?.data.apps || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleToggleApp = (app: App) => {
    setSelectedApps((prev) => {
      const alreadySelected = prev.some((item) => item._id === app._id);
      if (alreadySelected) {
        return prev.filter((item) => item._id !== app._id);
      }
      return [...prev, app];
    });
  };

  const handleRemoveApp = (app: App) => {
    setSelectedApps((prev) => prev.filter((item) => item._id !== app._id));
  };

  const handleTeamChange = (delta: number) => {
    setTeamCount((prev) => Math.max(1, prev + delta));
  };

  const isPlanSelected = (planId: string): boolean | string => {
    if (selectedPlan && selectedPlan._id === planId) {
      return planId;
    }
    return false;
  };

  const appsLocked = !selectedPlan;

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (validFor: ValidForType): Promise<void> => {
    if (!selectedPlan) return;

    const multiplier = getValidForMultiplier(validFor);
    const discount = getDiscountPercentage(validFor);
    const teamCost = teamCount * 500;

    const payload: OrderPayload = {
      planId: selectedPlan._id,
      appIds: selectedApps.map((app) => app._id),
      validFor: multiplier,
      discount: discount,
      teamCount: teamCount,
      teamCost: teamCost,
    };

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const response = await fetch(`${NEW_BASE_URL}/api/v1/subscription/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      
      const order = await response.json();
      console.log('Order created:', order);
      
      if (order.success === false) {
        alert("Subscription already exists. Please contact support.");
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_UZ0V9jh3jMC0C9',
        amount: order.result.doc.amount,
        currency: "INR",
        name: "Eazotel Technologies Pvt Ltd",
        description: selectedPlan.name,
        order_id: order.result.doc.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch(`${NEW_BASE_URL}/api/v1/subscription/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                ...response,
                validFor: multiplier,
                planId: selectedPlan._id,
                appIds: selectedApps.map((app) => app._id)
              }),
            });
            
            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              alert("Payment successful! Your subscription has been activated.");
              console.log("Payment successful:", response);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || 'Customer Name',
          email: localStorage.getItem("userEmail") || 'customer@email.com'
        },
        theme: {
          color: '#152547'
        },
        modal: {
          ondismiss: () => {
            console.log("Checkout form closed");
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert("Failed to create order. Please try again.");
    }
  };

  return {
    selectedPlan,
    selectedApps,
    teamCount,
    plans,
    apps,
    loading,
    handlePlanSelect,
    handleToggleApp,
    handleRemoveApp,
    handleTeamChange,
    isPlanSelected,
    appsLocked,
    handleUpgrade,
  };
};