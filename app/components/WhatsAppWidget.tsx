"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const pathname = usePathname();

  const phoneNumber = "+237654720955";
  const message = encodeURIComponent("Hello! I need information/assistance with payouts.");
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

  useEffect(() => {
    // Show tooltip automatically after 5 seconds to grab attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <style>{`
        .wa-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .wa-tooltip {
          background: #111;
          border: 1px solid #333;
          color: #fff;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          position: relative;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 280px;
          line-height: 1.5;
        }
        
        .wa-tooltip.wa-tooltip--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .wa-tooltip::after {
          content: '';
          position: absolute;
          bottom: -7px;
          right: 24px;
          width: 14px;
          height: 14px;
          background: #111;
          border-right: 1px solid #333;
          border-bottom: 1px solid #333;
          transform: rotate(45deg);
        }

        .wa-tooltip-close {
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
          margin-top: -2px;
          margin-right: -4px;
        }
        .wa-tooltip-close:hover { color: #fff; }

        .wa-button {
          width: 60px;
          height: 60px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
          position: relative;
        }

        .wa-button::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #25D366;
          opacity: 0;
          animation: wa-pulse 2s infinite;
        }

        .wa-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
        }

        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @media (max-width: 768px) {
          .wa-widget-container { bottom: 16px; right: 16px; }
          .wa-button { width: 54px; height: 54px; }
          .wa-tooltip { max-width: 250px; }
          .wa-tooltip::after { right: 20px; }
        }
      `}</style>

      <div className="wa-widget-container">
        <div className={`wa-tooltip ${showTooltip ? 'wa-tooltip--visible' : ''}`}>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4, color: '#25D366', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              VIP Support
            </div>
            <div style={{ color: '#ccc' }}>
              Contact us for exclusive information & assistance with <strong style={{ color: '#fff' }}>large payouts</strong>.
            </div>
          </div>
          <button 
            className="wa-tooltip-close" 
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
          >
            <X size={16} />
          </button>
        </div>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-button"
          aria-label="Contact us on WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.38c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.882-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
