import { useState } from "react";
import { ArrowLeft, Bot, ChevronRight, MessageCircle, X } from "lucide-react";

const faqs = [
  {
    question: "How do I search for a property?",
    answer:
      "Choose Buy or Rent, then search by keyword. Use the city, township, property type, and MMK price filters to narrow the results. The marketplace currently covers Yangon and Mandalay.",
  },
  {
    question: "Which cities are supported?",
    answer:
      "You can browse properties in Yangon and Mandalay. Available township filters depend on the city you select.",
  },
  {
    question: "How do I contact an owner or agent?",
    answer:
      "Open a listing and use its inquiry form. Sign in or create a Buyer / renter account to send an inquiry to the listing representative.",
  },
  {
    question: "How do I publish a property?",
    answer:
      "Sign in or create an account as a property owner or authorized agent. Add your property, save it as a draft, then submit it for administrator review. Approved listings become visible in search.",
  },
  {
    question: "Why isn't my listing visible yet?",
    answer:
      "Only active, approved listings appear in public search. Drafts and listings awaiting review are private. If a listing was rejected, check its status and any review reason in your dashboard before resubmitting it.",
  },
  {
    question: "Which currency and rental terms are supported?",
    answer:
      "Listing prices are shown in Myanmar kyat (MMK) only. Rental prices are shown per month; the site does not convert currencies.",
  },
  {
    question: "Can I save properties for later?",
    answer:
      "Sign in with a Buyer / renter account and select the heart on a listing. Your saved properties are available from your dashboard.",
  },
];

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const selected = selectedFaq === null ? null : faqs[selectedFaq];

  return (
    <div className="support-widget">
      {open && (
        <section
          className="support-panel"
          id="customer-support-panel"
          role="dialog"
          aria-labelledby="support-title"
        >
          <header className="support-panel-header">
            <div>
              <span className="support-eyebrow">PROPERTY PORTAL SUPPORT</span>
              <h2 id="support-title">How can we help?</h2>
              <p>Choose a question for a quick answer.</p>
            </div>
            <button
              className="support-close"
              type="button"
              aria-label="Close customer support"
              onClick={() => setOpen(false)}
            >
              <X size={19} />
            </button>
          </header>

          <div className="support-panel-body" aria-live="polite">
            {selected ? (
              <>
                <button
                  className="support-back"
                  type="button"
                  onClick={() => setSelectedFaq(null)}
                >
                  <ArrowLeft size={15} /> All questions
                </button>
                <p className="support-question">{selected.question}</p>
                <div className="support-answer">
                  <span className="support-bot-icon"><Bot size={17} /></span>
                  <p>{selected.answer}</p>
                </div>
              </>
            ) : (
              <>
                <div className="support-greeting">
                  <span className="support-bot-icon"><Bot size={17} /></span>
                  <p>Hi! I can help with common questions about using Thuta Property.</p>
                </div>
                <div className="support-faq-list" aria-label="Frequently asked questions">
                  {faqs.map((faq, index) => (
                    <button
                      className="support-faq"
                      type="button"
                      key={faq.question}
                      onClick={() => setSelectedFaq(index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <footer className="support-panel-footer">Predefined FAQ answers · English</footer>
        </section>
      )}

      <button
        className="support-launcher"
        type="button"
        aria-label={open ? "Close customer support" : "Open customer support"}
        aria-expanded={open}
        aria-controls="customer-support-panel"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={19} /> : <MessageCircle size={19} />}
        <span>{open ? "Close" : "Help"}</span>
      </button>
    </div>
  );
}
