import { useState, type RefObject } from "react";
import { ArrowRight, Plus, Minus, Package, Sliders, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FAQ_ITEMS } from "@/data/faq";
import { Parallax } from "@/components/animations/Parallax";
import { ScrollDiagonalLine } from "@/components/animations/ScrollDiagonalLine";
import { cn } from "@/lib/utils";

type FaqProps = {
  /** Optional shared scroll target so the diagonal line spans FAQ+Contact. */
  scrollRef?: RefObject<HTMLElement | null>;
};

export function Faq({ scrollRef }: FaqProps = {}) {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].number);
  const openIndex = FAQ_ITEMS.findIndex((i) => i.number === openId);
  const counter = openIndex >= 0 ? openIndex + 1 : 1;

  return (
    <section
      id="faq"
      className="relative isolate w-full overflow-hidden"
    >
      {/* diagonal split cream(left) → obsidian(right) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, #F8EEE3 0%, #F8EEE3 44%, #1a1f1e 55%, #050807 100%)",
        }}
      />
      {/* soft fog + scroll-driven diagonal line spanning FAQ→Contact */}
      <div aria-hidden className="absolute inset-0 bg-fog opacity-70" />
      <ScrollDiagonalLine
        targetRef={scrollRef as RefObject<HTMLElement> | undefined}
        x1={0}
        y1={82}
        x2={100}
        y2={18}
      />


      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-14 px-6 pt-24 pb-24 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:px-14 lg:pt-28 lg:pb-28">
        {/* LEFT cream copy */}
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-mint" />
            <span className="text-eyebrow text-obsidian/80">FAQ</span>
          </div>
          <h2 className="text-h1 text-obsidian">
            Questions,
            <br />
            <span className="italic-serif">clearly answered.</span>
          </h2>
          <p className="mt-8 max-w-[440px] text-[0.98rem] leading-relaxed text-obsidian/75">
            Everything you need to know before we start making something
            extraordinary.
          </p>

          <div className="mt-12">
            <p className="text-sm font-semibold text-obsidian">
              Still have a question?
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-1 inline-flex items-center gap-3 border-b border-obsidian/40 pb-1 text-sm font-medium text-obsidian transition hover:border-mint hover:text-mint"
            >
              Talk to Our Team
              <ArrowRight size={16} />
            </a>
          </div>

          {/* progress */}
          <div className="mt-12 hidden lg:block">
            <div className="flex items-start gap-4">
              <div className="relative h-40 w-px bg-obsidian/30">
                <motion.span
                  className="absolute left-0 top-0 w-px mint-line"
                  animate={{ height: `${(counter / FAQ_ITEMS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="text-meta text-obsidian/60">Scroll Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT obsidian accordion — enters slowly from visual depth */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
          role="list"
        >
          {FAQ_ITEMS.map((f) => {
            const open = openId === f.number;
            const panelId = `faq-panel-${f.number}`;
            const btnId = `faq-btn-${f.number}`;
            return (
              <div
                key={f.number}
                role="listitem"
                className={cn(
                  "rounded-md border transition cut-corners",
                  open
                    ? "border-mint bg-cream text-obsidian"
                    : "border-edge bg-graphite/60 text-cream",
                )}
              >
                <h3 className="m-0">
                  <button
                    id={btnId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? "" : f.number)}
                    className="flex w-full items-start gap-5 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-mint sm:px-6"
                  >
                    <span
                      className={cn(
                        "flex-1 text-sm font-semibold uppercase leading-snug tracking-[0.06em] sm:text-[15px]",
                        open ? "text-obsidian" : "text-cream",
                      )}
                    >
                      {f.question}
                    </span>
                    <span aria-hidden className={open ? "mt-0.5 text-mint" : "mt-0.5 text-cream/60"}>
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-14 sm:px-6 sm:pl-16">
                        <div className="mb-3 h-px w-12 mint-line" />
                        <p className="max-w-[540px] text-[13.5px] leading-relaxed text-obsidian/80">
                          {f.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-8 gap-y-3 border-t border-edge/60 bg-obsidian px-6 py-5 text-cream sm:px-8 lg:px-14">
        <BottomItem icon={<CheckCircle2 size={14} />} label="Clear Scopes" />
        <Divider />
        <BottomItem icon={<Sliders size={14} />} label="Flexible Workflows" />
        <Divider />
        <BottomItem icon={<Package size={14} />} label="Commercial-Ready Delivery" />
        <span className="ml-auto flex items-center gap-3 text-meta text-cream/60">
          <span>Contact</span>
          <span className="h-px w-24 bg-cream/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        </span>
      </div>
    </section>
  );
}

function BottomItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cream">
      <span className="text-mint">{icon}</span>
      {label}
    </span>
  );
}
function Divider() {
  return <span aria-hidden className="hidden h-4 w-px bg-cream/20 sm:block" />;
}
