import { motion } from "motion/react";

export default function Stats() {
  const stats = [
    {
      value: "20+",
      label: "Years Experience",
      caption: "In design engineering & spatial architecture.",
    },
    {
      value: "95+",
      label: "Projects Done",
      caption: "Shipped globally across digital ecosystems.",
    },
    {
      value: "200%",
      label: "Satisfied Clients",
      caption: "Delivering unmatched aesthetic precision.",
    },
  ];

  return (
    <section className="bg-bg py-20 md:py-28 select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {stats.map((stat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col text-center md:text-left border-t border-stroke/50 pt-8"
              >
                {/* Stat Display */}
                <span className="text-5xl sm:text-6xl lg:text-7xl font-display italic font-semibold text-text-primary tracking-tight mb-3">
                  {stat.value}
                </span>
                {/* Title Label */}
                <h3 className="text-[11px] font-sans font-bold tracking-widest uppercase text-text-primary mb-2">
                  {stat.label}
                </h3>
                {/* Mini context caption */}
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  {stat.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
