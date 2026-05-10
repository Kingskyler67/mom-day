import { useState, useEffect } from 'react';
import { Heart, Flower, Star, Sparkles } from 'lucide-react';

const memories = [
  {
    title: "Always There",
    description: "Through every high and every low, you were always by my side.",
    image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Your Warmth",
    description: "Your hugs could fix anything — and still can.",
    image: "https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Your Strength",
    description: "You showed me what courage and grace look like every single day.",
    image: "https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const qualities = [
  { icon: Heart, label: "Unconditional Love", filled: true },
  { icon: Sparkles, label: "Endless Wisdom", filled: false },
  { icon: Star, label: "Boundless Strength", filled: true },
  { icon: Flower, label: "Gentle Kindness", filled: false },
];

function FloatingPetal({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="currentColor" className="text-rose-300 opacity-25">
        <ellipse cx="8" cy="12" rx="5" ry="11" />
      </svg>
    </div>
  );
}

export default function App() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [petals, setPetals] = useState<React.CSSProperties[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const generated: React.CSSProperties[] = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg)`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${7 + Math.random() * 7}s`,
    }));
    setPetals(generated);
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fff5f7] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-lato { font-family: 'Lato', system-ui, sans-serif; }

        @keyframes float-petal {
          0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-28px) rotate(18deg); opacity: 0.35; }
        }
        .petal { animation: float-petal 9s ease-in-out infinite; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 1s ease both; }

        @keyframes hb {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.18); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
        }
        .hb { animation: hb 2.4s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer {
          background: linear-gradient(90deg,#be123c,#fb7185,#be123c);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .card-hover {
          transition: transform .35s ease, box-shadow .35s ease;
        }
        .card-hover:hover {
          transform: translateY(-7px) scale(1.015);
          box-shadow: 0 20px 44px -10px rgba(190,18,60,.18);
        }
      `}</style>

      {/* Background petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {petals.map((s, i) => (
          <FloatingPetal key={i} style={{ ...s, animationName: 'float-petal', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', position: 'absolute' }} />
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-[#fff5f7] to-[#fff0f3]" />

        <div
          className="relative z-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .9s ease, transform .9s ease',
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-rose-200 rounded-full px-5 py-2 mb-8 shadow-sm">
            <Heart className="w-4 h-4 text-rose-500 hb" fill="currentColor" />
            <span className="font-lato text-xs text-rose-500 tracking-[0.18em] uppercase font-light">Happy Mother's Day</span>
            <Heart className="w-4 h-4 text-rose-500 hb" fill="currentColor" style={{ animationDelay: '0.4s' }} />
          </div>

          <h1 className="font-playfair text-5xl sm:text-7xl md:text-8xl font-bold text-rose-900 mb-6 leading-[1.1]">
            To the Woman<br />
            <em className="shimmer not-italic">Who Made Me</em>
          </h1>

          <p className="font-lato font-light text-lg sm:text-xl text-rose-700/80 max-w-lg mx-auto leading-relaxed mb-12">
            No words are enough, no gift is too great — but this small piece of the internet
            is yours, filled with everything you mean to me.
          </p>

          <a
            href="#letter"
            className="group inline-flex items-center gap-3 bg-rose-600 hover:bg-rose-700 text-white font-lato text-xs tracking-[0.16em] uppercase px-9 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-rose-200 shadow-md"
          >
            Read My Letter
            <Heart className="w-4 h-4 group-hover:scale-125 transition-transform" fill="currentColor" />
          </a>
        </div>

        <div className="absolute bottom-10 left-6 opacity-10 pointer-events-none">
          <Flower className="w-28 h-28 text-rose-400" />
        </div>
        <div className="absolute top-16 right-8 opacity-10 pointer-events-none">
          <Flower className="w-20 h-20 text-rose-300" />
        </div>
      </section>

      {/* ── LETTER ── */}
      <section id="letter" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100 border border-rose-100 p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200" />
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-rose-50 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-pink-50 rounded-full" />

            <div className="relative">
              <p className="font-playfair italic text-rose-400 mb-1">A letter, with love —</p>
              <h2 className="font-playfair text-4xl text-rose-900 font-bold mb-10">Dear Mom,</h2>

              <div className="font-lato font-light text-rose-950/75 leading-[1.95] space-y-5 text-[1.05rem]">
                <p>
                  There are so many things I never said properly, so many moments I took for granted,
                  and yet you never once made me feel like I owed you anything. That is the kind of love
                  I have spent my whole life trying to understand.
                </p>
                <p>
                  You were there at every scraped knee, every heartbreak, every late night I thought
                  I couldn't make it through. You never asked for credit. You just showed up — again
                  and again — with quiet strength and a love that asked nothing in return.
                </p>
                <p>
                  I am who I am because of you. The things I value, the way I treat people, the voice
                  in my head that says{' '}
                  <span className="font-playfair italic text-rose-600">"you can do this"</span>{' '}
                  — that is you. That has always been you.
                </p>
                <p>
                  Thank you for every sacrifice I didn't see. Thank you for every prayer I didn't hear.
                  Thank you for loving me through every version of myself — even the difficult ones.
                </p>
                <p>
                  Today and every day, I am so grateful you are my mom.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-rose-100">
                <p className="font-playfair italic text-rose-500 text-xl">With all my love,</p>
                <p className="font-playfair text-rose-900 text-3xl font-bold mt-1">Your Child</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITIES ── */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#fff0f3] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-lato uppercase tracking-[0.18em] text-rose-400 text-xs mb-2">What you are to me</p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-rose-900 mb-14">
            The Many Ways You Shine
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {qualities.map(({ icon: Icon, label, filled }, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-2xl p-8 border border-rose-100 shadow-sm flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                  <Icon
                    className="w-7 h-7 text-rose-500"
                    fill={filled ? 'currentColor' : 'none'}
                    strokeWidth={filled ? 0 : 1.5}
                  />
                </div>
                <p className="font-lato text-sm font-light text-rose-800 leading-snug tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMORIES ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-lato uppercase tracking-[0.18em] text-rose-400 text-xs mb-2">Moments I cherish</p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-rose-900">
              A Lifetime of Memories
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-7">
            {memories.map((mem, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm cursor-pointer"
                onClick={() => setActiveCard(activeCard === i ? null : i)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/55 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-playfair text-white text-xl font-bold drop-shadow">{mem.title}</h3>
                </div>
                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{ maxHeight: activeCard === i ? '160px' : '0', padding: activeCard === i ? '1.25rem 1.5rem' : '0 1.5rem' }}
                >
                  <p className="font-lato font-light text-rose-800 leading-relaxed">{mem.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-lato text-xs text-rose-300 tracking-wide mt-5">Tap a card to reveal</p>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="py-28 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-xl mx-auto text-center">
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-8 hb" fill="currentColor" />
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-rose-900 mb-6 leading-tight">
            Happy Mother's Day,<br />
            <em className="not-italic italic">I love you always.</em>
          </h2>
          <p className="font-lato font-light text-rose-600 text-lg leading-relaxed">
            Today is yours. Every day is yours. Thank you for everything.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            {[0, 0.2, 0.4, 0.6, 0.8].map((d, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-rose-400 hb"
                fill="currentColor"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t border-rose-100">
        <p className="font-lato text-xs font-light text-rose-300 tracking-[0.2em] uppercase">
          Made with love, just for you
        </p>
      </footer>
    </div>
  );
}
