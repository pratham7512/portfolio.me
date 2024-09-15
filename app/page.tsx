"use client"
import { useState, useEffect ,useRef} from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter , Clock, Mail} from 'lucide-react'

const questions = [
  "🎓 What's your educational background?",
  "💼 What projects have you worked on?",
  "🌟 What are your key skills?",
  "🚀 What's your experience with AI?",
  "🌐 Which programming languages do you know?",
  "📚 What are you currently learning?",
  "🏆 What are your biggest achievements?",
  "🎯 What are your career goals?",
  "🌍 Where have you worked before?",
  "🤝 How do you collaborate in a team?",
  "💡 What's your problem-solving approach?",
  "🔧 What tools do you use daily?",
  "📈 How do you stay updated with tech trends?",
  "🌱 What's your approach to learning new skills?",
  "🏋️ How do you handle challenging projects?"
]
export default function Component() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null) // Initialize to null
  const scrollRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now) // Store Date object
    }

    updateTime() // Initial call
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true,
        timeZone: 'Asia/Kolkata'
      })
    : '' // Handle null state gracefully
  const handleQuestionClick = (question: string) => {
    setQuery(question)
  }

  useEffect(() => {
    const scrollSpeed = 0.3;

    scrollRefs.forEach((scrollRef, index) => {
      if (scrollRef.current) {
        const scrollElement = scrollRef.current;
        let scrollPosition = 0;
        // Set a different initial scroll position for the middle row
        if (index === 1) {
          scrollPosition = scrollElement.scrollWidth /12; // Example offset
        }

        const scroll = () => {
          scrollPosition += scrollSpeed;
          if (scrollPosition >= scrollElement.scrollWidth / 2) {
            scrollPosition = 0;
          }
          scrollElement.scrollLeft = scrollPosition;
          requestAnimationFrame(scroll);
        };

        requestAnimationFrame(scroll);
      }
    });
  }, [])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen"
    >
      <ResizablePanel defaultSize={35} minSize={35}>
      <div className="flex flex-col h-full bg-background text-white p-6">
          <div className="flex-grow">
            <h1 className="text-6xl font-bold mb-4">Hi, I&apos;m Prathamesh</h1>
            <h2 className="text-xl mb-2">Software Developer</h2>
            <div className="mb-6">
            <p className="text-chart-1 text leading-relaxed">
              I specialize in backend technologies and I&apos;m passionate about creating AI-driven tools that solve real-world problems. Currently, I&apos;m expanding my skills into frontend development.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">NextJs</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Docker</Badge>
              <Badge variant="secondary">AWS</Badge>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg mb-2">Connect with me</h2>
            <div className="flex space-x-4">
              <a href="https://github.com/pratham7512" className="text-chart-1 hover:text-white">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/prathamesh-desai-342594229/" className="text-chart-1 hover:text-white">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/_curious09_" className="text-chart-1 hover:text-white">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          </div>
          <div className="relative">
            {[0, 1, 2].map((rowIndex) => (
                <div key={rowIndex} className="h-12 overflow-hidden mb-2" ref={scrollRefs[rowIndex]}>
                  <div className="flex whitespace-nowrap">
                    {[...questions, ...questions].map((question, index) => (
                      <button
                        key={`${rowIndex}-${index}`}
                        onClick={() => handleQuestionClick(question)}
                        className="px-3 py-2 bg-background text-white text-sm mr-2 border border-muted border-dashed hover:border-muted-foreground transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            <div className="relative">
              
              <Input
                type="text"
                placeholder="ask about me..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-background py-3 text-white pl-10 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-muted placeholder-muted-foreground"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle className="bg-gray-800" />
      <ResizablePanel defaultSize={65}>
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 bg-background"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover contrast-125 brightness-50"
          >
            <source src="/image.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-4 left-4 bg-white bg-opacity-0 rounded-lg p-3 text-white text-sm">
            <div className="flex items-center mb-2">
              <Clock size={16} className="mr-2" />
              {/* Conditionally render the time */}
              {currentTime && <span>Pune {formattedTime} GMT (+5:30)</span>}
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Available October 2024</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:prathameshdesai993@gmail.com" className="hover:underline z-10">
                prathameshdesai993@gmail.com
              </a>
            </div>
          </div>
          <div className="absolute inset-0 flex items-start justify-start p-6">
            <blockquote className="text-white text-xl text-start">
            </blockquote>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}