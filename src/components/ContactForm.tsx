import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

async function submitForm(formName: string, fields: Record<string, string>) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}

export function ContactForm() {
  const [data, setData] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const services = [
    "Social Media Marketing",
    "Social Media Management",
    "Branding",
    "PPC",
    "Graphic Design",
    "Website Development",
    "Productions",
  ];

  const validate = () => {
    if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus("idle");
    try {
      const res = await submitForm("contact", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
      });
      if (res.ok) {
        setStatus("success");
        setData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
        setError(res.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400 text-2xl">
          ✓
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank you!</h3>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          We have received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
        <input
          type="tel"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
          placeholder="+1 234 567 8900"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
          value={data.service}
          onChange={(e) => setData({ ...data, service: e.target.value })}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f4fa8] outline-none"
          placeholder="Tell us about your project..."
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1f4fa8] text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60 hover:bg-[#1b2a6b] transition-colors"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
