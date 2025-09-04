"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const phoneNumber = "+1 (555) 123-4567";
  const emailAddress = "info@techstore.com";
  const telegramUsername = "@techstore_support";

  const copyToClipboard = async (
    text: string,
    type: "phone" | "email" | "telegram"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedTelegram(true);
        setTimeout(() => setCopiedTelegram(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Have questions about our products or need assistance with your order?
          We&apos;re here to help! Reach out to us through any of the methods
          below.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">{phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7
                    </p>
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

              {/* Email */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">{emailAddress}</p>
                    <p className="text-sm text-muted-foreground">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(emailAddress, "email")}
                  className={cn(
                    "transition-all duration-200",
                    copiedEmail && "bg-green-50 border-green-200 text-green-700"
                  )}
                >
                  {copiedEmail ? (
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
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telegram</h3>
                    <p className="text-muted-foreground">{telegramUsername}</p>
                    <p className="text-sm text-muted-foreground">
                      Instant messaging support
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

              {/* Address */}
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">123 Tech Street</p>
                  <p className="text-muted-foreground">
                    Digital City, DC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-medium">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-medium">12:00 PM - 5:00 PM</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Online support available 24/7 through phone and Telegram
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          {/* Additional Info */}
          <div className="mt-8 p-6 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">
              Quick Response Guarantee
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">
              We pride ourselves on excellent customer service. Expect a
              response within 24 hours for emails, or contact us directly via
              phone or Telegram for immediate assistance with urgent matters.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-8">
          Can&apos;t find what you&apos;re looking for? Check out our most
          common questions below.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-muted-foreground">
                We accept all major bank transfers and tele birr.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
