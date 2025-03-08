import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import Link from "next/link";

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Carlora Strategic Innovation get the latest updates on business, technology and digital to help improve your business.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Kigali, Rwanda</li>
              <li>contact@carlora.com</li>
              <li>+250 (796) 157-413</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://x.com/carlora" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Follow us on X (formerly Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </Link>
              <Link 
                href="https://facebook.com/carlora" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/csi.consultancy/" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://youtube.com/@csi.consutant?si=QKV8r30Z3UrjUjIK" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link 
                href="https://tiktok.com/@carlora" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/carlora" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Carlora Strategic Innovation Ltd. All rights reserved.</p>
          <p className="mt-2">
            Built and Engineered by{" "}
            <Link 
              href="https://www.kingstechstudio.tech/" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kings Tech Studio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}