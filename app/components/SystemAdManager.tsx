"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SystemAd } from "../lib/ads";

function AdModal({ ad }: { ad: SystemAd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(`ad-dismissed-${ad.id}`);
    if (!dismissed) {
      setHasDismissed(false);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, ad.delaySeconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [ad]);

  function handleClose() {
    setIsOpen(false);
    localStorage.setItem(`ad-dismissed-${ad.id}`, "true");
  }

  if (hasDismissed) return null;

  return (
    <>
      <style>{`
        .tp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(14, 60, 99, 0.9);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .tp-overlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        .tp-modal {
          width: 100%;
          max-width: 800px;
          background: var(--navy);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          transform: translateY(20px) scale(0.95);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 25px 50px -12px rgba(18, 72, 115, 0.5);
          position: relative;
        }
        .tp-overlay.is-open .tp-modal {
          transform: translateY(0) scale(1);
        }

        .tp-image-col {
          flex: 1;
          position: relative;
          background: var(--navy-light);
          min-height: 400px;
          overflow: hidden;
        }
        
        .tp-image-col::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, var(--navy));
        }

        .tp-content-col {
          flex: 1;
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .tp-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #888;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .tp-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          transform: rotate(90deg);
        }

        .tp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(37, 211, 102, 0.1);
          border: 1px solid rgba(37, 211, 102, 0.3);
          color: #25D366;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          align-self: flex-start;
        }

        .tp-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .tp-title span {
          color: #25D366;
        }

        .tp-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .tp-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 18px 24px;
          background: #25D366;
          color: #fff;
          font-weight: 900;
          font-size: 1.05rem;
          text-decoration: none;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.2);
        }
        .tp-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37, 211, 102, 0.35);
          background: #22c55e;
        }

        @media (max-width: 768px) {
          .tp-modal {
            flex-direction: column;
          }
          .tp-image-col {
            min-height: 180px;
          }
          .tp-image-col::after {
            background: linear-gradient(to bottom, transparent, var(--navy));
          }
          .tp-content-col {
            padding: 32px 24px;
          }
          .tp-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className={`tp-overlay ${isOpen ? 'is-open' : ''}`} onClick={handleClose}>
        <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
          <button className="tp-close-btn" onClick={handleClose} aria-label="Close modal">
            <X size={16} />
          </button>
          
          <div className="tp-image-col">
            <Image 
              src={ad.imageUrl} 
              alt={ad.title.replace(/<[^>]*>?/gm, '')} // remove HTML tags for alt
              fill 
              style={{ objectFit: 'cover' }} 
              priority
            />
          </div>
          
          <div className="tp-content-col">
            <div className="tp-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.38c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.882-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {ad.badgeText}
            </div>
            
            <h2 className="tp-title" dangerouslySetInnerHTML={{ __html: ad.title }} />
            
            <p className="tp-desc">{ad.description}</p>

            <a 
              href={ad.ctaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="tp-cta"
              onClick={() => handleClose()}
            >
              {ad.ctaText} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SystemAdManager() {
  const [ads, setAds] = useState<SystemAd[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => r.ok ? r.json() : [])
      .then(setAds)
      .catch(console.error);
  }, []);

  // Don't show any ads in the admin area
  if (pathname?.startsWith("/admin")) return null;

  // Filter ads by placement logic
  const activeAds = ads.filter(ad => {
    if (ad.placement === "global") return true;
    
    // Assume paths are localized, e.g. /en, /es/sports, /fr/promos
    const segments = pathname?.split("/").filter(Boolean) || [];
    const page = segments.length > 1 ? segments[1] : "home";
    
    if (ad.placement === "home" && page === "home") return true;
    if (ad.placement === "sports" && page === "sports") return true;
    if (ad.placement === "promos" && page === "promos") return true;
    if (ad.placement === "blog" && page === "blog") return true;
    
    return false;
  });

  return (
    <>
      {activeAds.map(ad => <AdModal key={ad.id} ad={ad} />)}
    </>
  );
}
