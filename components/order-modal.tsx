"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Phone, MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
}

export function OrderModal({
  isOpen,
  onClose,
  productName,
  productPrice,
}: OrderModalProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const phoneNumber = "+1 (555) 123-4567";
  const telegramUsername = "@techstore_support";

  const copyToClipboard = async (text: string, type: "phone" | "telegram") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedTelegram(true);
        setTimeout(() => setCopiedTelegram(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Order Product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="text-center space-y-2 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold text-lg text-balance">
              {productName}
            </h3>
            <p className="text-2xl font-bold text-primary">{productPrice}</p>
          </div>

          {/* Contact Instructions */}
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-foreground">
              Contact us to place your order
            </h4>
            <p className="text-sm text-muted-foreground text-pretty">
              Choose your preferred contact method below. Our team will assist
              you with your order.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            {/* Phone Number */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{phoneNumber}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(phoneNumber, "phone")}
                className={cn(
                  "transition-all duration-200",
                  copiedPhone && "bg-green-50 border-green-200 text-green-700"
                )}
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Telegram */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Telegram</p>
                  <p className="text-sm text-muted-foreground">
                    {telegramUsername}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(telegramUsername, "telegram")}
                className={cn(
                  "transition-all duration-200",
                  copiedTelegram &&
                    "bg-green-50 border-green-200 text-green-700"
                )}
              >
                {copiedTelegram ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground text-pretty">
              Our support team is available 24/7 to help you with your order.
              Please mention the product name when contacting us.
            </p>
          </div>

          {/* Close Button */}
          <Button onClick={onClose} className="w-full" size="lg">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
