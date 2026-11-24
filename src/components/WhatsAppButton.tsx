import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { SITE } from "../data";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const digits = SITE.phone.replace(/\D/g, "");
  const url = `https://wa.me/${digits}?text=Hi Orvix Frame Media, I'd like to know more`;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="fixed bottom-24 left-4 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1eb454] transition-colors"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-start px-4 pb-4"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            className="w-full max-w-xs bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-white font-bold text-sm">WhatsApp</div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white hover:bg-[#0f7a6e] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              <div className="bg-slate-700 rounded-2xl rounded-tr-none p-3 max-w-[80%] text-slate-200">
                Hi, welcome to Orvix Frame Media
              </div>
              <div className="bg-slate-700 rounded-2xl rounded-tr-none p-3 max-w-[80%] text-slate-200">
                Can we help you?
              </div>
            </div>
            <div className="p-4 border-t border-slate-800">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full bg-[#25D366] text-white text-center px-5 py-3 rounded-2xl font-semibold hover:bg-[#1eb454] transition-colors flex items-center justify-center gap-2 mx-auto max-w-fit"
              >
                Open Chat <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
