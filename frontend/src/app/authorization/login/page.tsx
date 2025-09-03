import LoginForm from "./login";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Left Wires */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          className="w-[500px] h-[300px]"
          fill="none"
        >
          {/* Top Downward Parabola */}
          <path
            d="M0,100 C300,20 500,180 800,100"
            className="animate-pulse"
            stroke="url(#gradL1)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #8b5cf6)" }}
          />
          {/* Middle Straight Line */}
          <path
            d="M0,200 L800,201"
            className="animate-pulse"
            stroke="url(#gradL2)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
          />
          {/* Bottom Downward Parabola */}
          <path
            d="M0,300 C300,380 500,220 800,300"
            className="animate-pulse"
            stroke="url(#gradL3)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #f97316)" }}
          />

          <defs>
            {/* Top Line Gradient */}
            <linearGradient id="gradL1" x1="0" y1="0" x2="1" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#60a5fa" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#6366f1"
                className="dark:stop-[#8b5cf6]"
              />
              <stop
                offset="100%"
                stopColor="#0ea5e9"
                className="dark:stop-[#3b82f6]"
              />
            </linearGradient>

            {/* Middle Line Gradient */}
            <linearGradient id="gradL2" x1="0" y1="0" x2="1" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#5eead4" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#34d399"
                className="dark:stop-[#10b981]"
              />
              <stop
                offset="100%"
                stopColor="#2dd4bf"
                className="dark:stop-[#14b8a6]"
              />
            </linearGradient>

            {/* Bottom Line Gradient */}
            <linearGradient id="gradL3" x1="0" y1="0" x2="1" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#fb7185" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#fbbf24"
                className="dark:stop-[#f97316]"
              />
              <stop
                offset="100%"
                stopColor="#f43f5e"
                className="dark:stop-[#ef4444]"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Login Form Center */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-md px-4 -translate-y-8">
        <LoginForm />
      </div>

      {/* Right Wires */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 400"
          className="w-[500px] h-[300px]"
          fill="none"
        >
          {/* Top Downward Parabola */}
          <path
            d="M800,100 C500,20 300,180 0,100"
            className="animate-pulse"
            stroke="url(#gradR1)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #8b5cf6)" }}
          />
          {/* Middle Straight Line */}
          <path
            d="M800,200 L0,201"
            className="animate-pulse"
            stroke="url(#gradR2)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
          />
          {/* Bottom Downward Parabola */}
          <path
            d="M800,300 C500,380 300,220 0,300"
            className="animate-pulse"
            stroke="url(#gradR3)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 0 6px #f97316)" }}
          />

          <defs>
            {/* Top Line Gradient */}
            <linearGradient id="gradR1" x1="1" y1="0" x2="0" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#60a5fa" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#6366f1"
                className="dark:stop-[#8b5cf6]"
              />
              <stop
                offset="100%"
                stopColor="#0ea5e9"
                className="dark:stop-[#3b82f6]"
              />
            </linearGradient>

            {/* Middle Line Gradient */}
            <linearGradient id="gradR2" x1="1" y1="0" x2="0" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#5eead4" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#34d399"
                className="dark:stop-[#10b981]"
              />
              <stop
                offset="100%"
                stopColor="#2dd4bf"
                className="dark:stop-[#14b8a6]"
              />
            </linearGradient>

            {/* Bottom Line Gradient */}
            <linearGradient id="gradR3" x1="1" y1="0" x2="0" y2="1">
              {/* Light Mode Colors */}
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#fb7185" />
              {/* Dark Mode Colors */}
              <stop
                offset="0%"
                stopColor="#fbbf24"
                className="dark:stop-[#f97316]"
              />
              <stop
                offset="100%"
                stopColor="#f43f5e"
                className="dark:stop-[#ef4444]"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
