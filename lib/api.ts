import type { Board, Thread } from "@/lib/types"

// Mock data for boards
export const mockBoards: Board[] = [
  {
    board: "g",
    title: "Technology",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "The technology board - computers, programming, and other related topics",
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 1,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "a",
    title: "Anime & Manga",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Anime and manga discussion",
    spoilers: 1,
    custom_spoilers: 5,
    is_archived: 1,
    code_tags: 0,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "v",
    title: "Video Games",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Video games discussion",
    spoilers: 1,
    custom_spoilers: 3,
    is_archived: 1,
    code_tags: 0,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "biz",
    title: "Business & Finance",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Business and finance discussion",
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 0,
    math_tags: 1,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "fit",
    title: "Fitness",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Health, fitness, and physical improvement",
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 0,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "sci",
    title: "Science & Math",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Science, mathematics, and related topics",
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 1,
    math_tags: 1,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "pol",
    title: "Politically Incorrect",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 4096,
    max_webm_filesize: 3072,
    max_comment_chars: 2000,
    max_webm_duration: 120,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Political discussion",
    country_flags: 1,
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 0,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
  {
    board: "mu",
    title: "Music",
    ws_board: 0,
    per_page: 15,
    pages: 10,
    max_filesize: 6144,
    max_webm_filesize: 6144,
    max_comment_chars: 2000,
    max_webm_duration: 300,
    bump_limit: 300,
    image_limit: 150,
    cooldowns: {
      threads: 600,
      replies: 60,
      images: 60,
    },
    meta_description: "Music discussion",
    spoilers: 0,
    custom_spoilers: 0,
    is_archived: 1,
    code_tags: 0,
    math_tags: 0,
    text_only: 0,
    forced_anon: 0,
    webm_audio: 1,
    require_subject: 0,
  },
]

// Mock data for threads
const mockThreads = [
  {
    no: 1001,
    time: Math.floor(Date.now() / 1000) - 3600 * 2,
    name: "Anonymous",
    sub: "Is Rust worth learning in 2025?",
    com: "&gt;year is 2025\n&gt;still using JavaScript\n&gt;not learning Rust\n\nI've been a JavaScript dev for 5 years and I'm thinking about learning Rust. Is it worth the effort? What are the job prospects like?",
    replies: 12,
    images: 1,
    bumps: 15,
    id: "Op1Anon",
    tim: "1682541234",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 1002,
    time: Math.floor(Date.now() / 1000) - 3600 * 5,
    name: "Anonymous",
    sub: "Thread about mechanical keyboards",
    com: "&gt;what about muh Cherry MX Browns?\n&gt;Gateron Yellows are better\n&gt;actually Kailh Box switches are superior\n&gt;Holy Pandas or nothing\n\nWhat's your favorite mechanical keyboard switch? I'm thinking about building a custom keyboard and can't decide between Cherry MX Browns and Gateron Yellows.",
    replies: 8,
    images: 2,
    bumps: 10,
    id: "Kb2Anon",
    tim: "1682542345",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 1003,
    time: Math.floor(Date.now() / 1000) - 3600 * 8,
    name: "Anonymous",
    sub: "Linux distro recommendations",
    com: "&gt;I use Arch btw\n&gt;Ubuntu is for normies\n&gt;Gentoo is the only real Linux\n&gt;just install Hannah Montana Linux\n\nI'm tired of Windows. What Linux distro would you recommend for a developer who also games occasionally?",
    replies: 15,
    images: 0,
    bumps: 18,
    id: "Lx3Anon",
  },
  {
    no: 1004,
    time: Math.floor(Date.now() / 1000) - 3600 * 12,
    name: "Anonymous",
    sub: "AI is taking our jobs",
    com: "&gt;year is 2025\n&gt;AI writes all the code now\n&gt;programmers are obsolete\n&gt;we're all just prompt engineers\n\nAnyone else worried about AI taking programming jobs? These LLMs are getting scary good.",
    replies: 20,
    images: 1,
    bumps: 25,
    id: "Ai4Anon",
    tim: "1682543456",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 1005,
    time: Math.floor(Date.now() / 1000) - 3600 * 24,
    name: "Anonymous",
    sub: "Rate my battlestation",
    com: "&gt;triple monitors\n&gt;custom mechanical keyboard\n&gt;ergonomic chair\n&gt;RGB everything\n\nJust finished setting up my new dev environment. Triple monitors, custom mechanical keyboard, and ergonomic chair.",
    replies: 7,
    images: 3,
    bumps: 9,
    id: "Bs5Anon",
    tim: "1682544567",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 1006,
    time: Math.floor(Date.now() / 1000) - 3600 * 36,
    name: "Anonymous",
    sub: "Microsoft Teams history",
    com: '&gt;year is 1996\n&gt;invent NetMeeting\n&gt;has video, audio, screen sharing, whiteboard\n&gt;it\'s the future, guys\n&gt;actually kinda works if network doesn\'t suck\n&gt;we need to go deeper\n&gt;MSN Messenger happens, eventually gets video\n&gt;Windows Messenger in XP too, for reasons\n&gt;"what about muh entreprise??"\n&gt;Microsoft now makes Office Communicator\n&gt;NetMeeting declared cringe, must be purged\n&gt;replace with "Windows Meeting Space"\n&gt;literally no one uses it, ever, kek\n&gt;communicator becomes Lync, again for reasons\n&gt;finally everything starts to settle\n&gt;GUYS LET\'S BUY SKYPE FOR $8.5 BILLION\n&gt;GUYS WE DIDN\'T DETECT ENOUGH EMAIL CHAINS ASKING BILL GATES TO KEEP MESSENGER SO LET\'S KILL IT\n&gt;force normies onto Skype\n&gt;"How do we leverage Skype synergy for enterprise?"\n&gt;"boys, we need something like Slack but jeetier"\n&gt;Microsoft Teams, it\'s the future, now for real\n&gt;kill Skype for Business\n&gt;kill normal Skype, leaving thirdies without cheap phone calls\n&gt;"Okay Teams is the one true app"\n&gt;2025\nHow long till Teams dies?',
    replies: 3,
    images: 1,
    bumps: 5,
    id: "Ms6Anon",
    tim: "1682545678",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
]

// Mock anime threads
const mockAnimeThreads = [
  {
    no: 2001,
    time: Math.floor(Date.now() / 1000) - 3600 * 1,
    name: "Anonymous",
    sub: "Anime recommendations for 2025",
    com: "What are some good anime to watch this season? I've already seen all the mainstream stuff.",
    replies: 15,
    images: 2,
    bumps: 18,
    id: "An1Anon",
    tim: "1682551234",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 2002,
    time: Math.floor(Date.now() / 1000) - 3600 * 3,
    name: "Anonymous",
    sub: "Manga > Anime",
    com: "&gt;waiting for weekly anime episodes\n&gt;not reading the manga\n&gt;being years behind the actual story\n\nWhy do people still watch anime when the manga is usually better and further ahead?",
    replies: 22,
    images: 1,
    bumps: 25,
    id: "Mg1Anon",
    tim: "1682552345",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 2003,
    time: Math.floor(Date.now() / 1000) - 3600 * 6,
    name: "Anonymous",
    sub: "Studio Ghibli thread",
    com: "Let's discuss Studio Ghibli films. Which one is your favorite and why?",
    replies: 18,
    images: 5,
    bumps: 20,
    id: "Gb1Anon",
    tim: "1682553456",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
]

// Mock video game threads
const mockVideoGameThreads = [
  {
    no: 3001,
    time: Math.floor(Date.now() / 1000) - 3600 * 2,
    name: "Anonymous",
    sub: "PC Gaming in 2025",
    com: "Are GPUs still impossible to find at MSRP? What's the state of PC gaming these days?",
    replies: 25,
    images: 3,
    bumps: 28,
    id: "Pc1Anon",
    tim: "1682561234",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 3002,
    time: Math.floor(Date.now() / 1000) - 3600 * 4,
    name: "Anonymous",
    sub: "Nintendo Switch 2 when?",
    com: "It's been 8 years since the original Switch. When is Nintendo going to release a proper successor?",
    replies: 19,
    images: 1,
    bumps: 22,
    id: "Ns1Anon",
    tim: "1682562345",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
  {
    no: 3003,
    time: Math.floor(Date.now() / 1000) - 3600 * 7,
    name: "Anonymous",
    sub: "Best games of all time thread",
    com: "Let's settle this once and for all. What are the best video games ever made?",
    replies: 30,
    images: 4,
    bumps: 35,
    id: "Bg1Anon",
    tim: "1682563456",
    ext: ".jpg",
    w: 800,
    h: 600,
  },
]

// Board-specific thread mappings
const boardThreads: Record<string, Thread[]> = {
  g: mockThreads,
  a: mockAnimeThreads,
  v: mockVideoGameThreads,
  biz: [],
  fit: [],
  sci: [],
  pol: [],
  mu: [],
}

// Thread data mapping
const threadData = {
  // Thread 1001 - Rust thread
  "1001": {
    thread: mockThreads[0],
    replies: [
      {
        no: 2001,
        time: Math.floor(Date.now() / 1000) - 3600 * 1.5,
        name: "Anonymous",
        com: "Rust is definitely worth learning. Memory safety without garbage collection is a game changer. I've been using it for backend services and it's rock solid.",
        id: "Rs1Anon",
        replies: 2,
      },
      {
        no: 2002,
        time: Math.floor(Date.now() / 1000) - 3600 * 1.2,
        name: "Anonymous",
        com: "&gt;I've been a JavaScript dev for 5 years\nThere's your problem right there. Learn a real language.",
        id: "Tr2Anon",
        replies: 1,
      },
      {
        no: 2003,
        time: Math.floor(Date.now() / 1000) - 3600 * 1,
        name: "Anonymous",
        com: "Job prospects are decent but not as plentiful as JS. Companies using Rust are usually more selective though, so the pay is better.",
        id: "Jp3Anon",
        tim: "1682545678",
        ext: ".jpg",
        w: 800,
        h: 600,
      },
      {
        no: 2004,
        time: Math.floor(Date.now() / 1000) - 3600 * 0.8,
        name: "Anonymous",
        com: "I switched from JS to Rust last year. The learning curve is steep but worth it. Start with 'The Book' and take your time.",
        id: "Bk4Anon",
      },
      {
        no: 2005,
        time: Math.floor(Date.now() / 1000) - 3600 * 0.5,
        name: "Anonymous",
        com: "Rust is a meme. Just learn Go instead, much easier and still performant.",
        id: "Go5Anon",
      },
    ],
    nestedReplies: {
      "2001": [
        {
          no: 3001,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.4,
          name: "Anonymous",
          com: "What kind of backend services are you building with Rust? I'm curious about real-world use cases.",
          id: "Bk1Anon",
          replies: 1,
        },
        {
          no: 3002,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.3,
          name: "Anonymous",
          com: "How long did it take you to become productive in Rust?",
          id: "Tm2Anon",
        },
      ],
      "2002": [
        {
          no: 3003,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.1,
          name: "Anonymous",
          com: "&gt;Learn a real language\nJavaScript powers most of the web. How is that not a real language?",
          id: "Js3Anon",
          replies: 2,
        },
      ],
      "3001": [
        {
          no: 4001,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.35,
          name: "Anonymous",
          com: "Not the original poster, but I use Rust for high-performance API services that need to handle thousands of requests per second. The compile-time guarantees make it much easier to refactor with confidence.",
          id: "Ap1Anon",
          replies: 1,
          tim: "1682545679",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "3003": [
        {
          no: 4002,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.05,
          name: "Anonymous",
          com: "JavaScript was created in 10 days and it shows. It's a mess of a language with terrible design decisions that we're stuck with forever.",
          id: "Jh2Anon",
          replies: 1,
        },
        {
          no: 4003,
          time: Math.floor(Date.now() / 1000) - 3600 * 1,
          name: "Anonymous",
          com: "TypeScript makes it bearable at least.",
          id: "Ts3Anon",
          tim: "1682545680",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "4001": [
        {
          no: 5001,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.34,
          name: "Anonymous",
          com: "What kind of performance improvements did you see compared to other languages? I'm considering rewriting some Node.js services in Rust.",
          id: "Pf1Anon",
          replies: 1,
        },
      ],
      "4002": [
        {
          no: 5002,
          time: Math.floor(Date.now() / 1000) - 3600 * 0.95,
          name: "Anonymous",
          com: "This. JavaScript is the PHP of frontend development.",
          id: "Ph1Anon",
          replies: 1,
          tim: "1682545681",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "5001": [
        {
          no: 6001,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.33,
          name: "Anonymous",
          com: "Not OP, but we saw a 10x improvement in throughput and 80% reduction in memory usage when we rewrote our Node API in Rust. The development time was longer though.",
          id: "Th1Anon",
          replies: 1,
        },
      ],
      "5002": [
        {
          no: 6002,
          time: Math.floor(Date.now() / 1000) - 3600 * 0.94,
          name: "Anonymous",
          com: "At least PHP has consistent naming conventions. JavaScript can't even decide if it wants to use camelCase or snake_case.",
          id: "Nc1Anon",
          tim: "1682545682",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "6001": [
        {
          no: 7001,
          time: Math.floor(Date.now() / 1000) - 3600 * 1.32,
          name: "Anonymous",
          com: "That's impressive. Did you use any specific frameworks or just vanilla Rust with hyper or something similar?",
          id: "Fr1Anon",
          tim: "1682545683",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
    },
  },
  // Thread 1002 - Mechanical keyboards
  "1002": {
    thread: mockThreads[1],
    replies: [
      {
        no: 8001,
        time: Math.floor(Date.now() / 1000) - 3600 * 4.5,
        name: "Anonymous",
        com: "Gateron Yellows are the best budget linear switch. Smooth right out of the box and sound great when lubed.",
        id: "Gy1Anon",
        replies: 2,
      },
      {
        no: 8002,
        time: Math.floor(Date.now() / 1000) - 3600 * 4.2,
        name: "Anonymous",
        com: "Cherry MX Browns are tactile garbage. Get Holy Pandas if you want a real tactile experience.",
        id: "Hp2Anon",
      },
      {
        no: 8003,
        time: Math.floor(Date.now() / 1000) - 3600 * 4,
        name: "Anonymous",
        com: "Don't listen to the switch elitists. Just get whatever feels good to you. Keyboard preferences are highly subjective.",
        id: "Kp3Anon",
        tim: "1682546789",
        ext: ".jpg",
        w: 800,
        h: 600,
      },
    ],
    nestedReplies: {
      "8001": [
        {
          no: 9001,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.4,
          name: "Anonymous",
          com: "Agreed. I've tried dozens of switches and always come back to lubed Gateron Yellows. Great value for money.",
          id: "Sw1Anon",
          tim: "1682546790",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
        {
          no: 9002,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.3,
          name: "Anonymous",
          com: "What lube do you recommend? Krytox 205g0?",
          id: "Lb2Anon",
          replies: 1,
        },
      ],
      "9002": [
        {
          no: 10001,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.25,
          name: "Anonymous",
          com: "Krytox 205g0 for linears, Tribosys 3203 for tactiles. Don't overlube or you'll lose the tactile bump.",
          id: "Lb1Anon",
          replies: 1,
          tim: "1682546791",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "10001": [
        {
          no: 11001,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.24,
          name: "Anonymous",
          com: "Is it worth buying a lube station or can I just do it on a silicone mat?",
          id: "Ls1Anon",
          replies: 1,
        },
      ],
      "11001": [
        {
          no: 12001,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.23,
          name: "Anonymous",
          com: "Lube station is worth it if you're doing multiple keyboards. For just one board, a silicone mat is fine. Just be methodical.",
          id: "Mt1Anon",
          replies: 1,
          tim: "1682546792",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "12001": [
        {
          no: 13001,
          time: Math.floor(Date.now() / 1000) - 3600 * 4.22,
          name: "Anonymous",
          com: "Thanks for the advice. I'm planning to lube 70 switches for my first custom build. Any other tools I should get?",
          id: "Tl1Anon",
          tim: "1682546793",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
    },
  },
  // Thread 1003 - Linux distros
  "1003": {
    thread: mockThreads[2],
    replies: [
      {
        no: 14001,
        time: Math.floor(Date.now() / 1000) - 3600 * 7.5,
        name: "Anonymous",
        com: "Pop!_OS is great for developers who also game. It has good Nvidia support out of the box and Steam integration.",
        id: "Po1Anon",
      },
      {
        no: 14002,
        time: Math.floor(Date.now() / 1000) - 3600 * 7.2,
        name: "Anonymous",
        com: "Arch Linux if you want to actually learn how Linux works. The wiki is the best resource in the Linux community.",
        id: "Ar2Anon",
        replies: 2,
      },
      {
        no: 14003,
        time: Math.floor(Date.now() / 1000) - 3600 * 7,
        name: "Anonymous",
        com: "Just use Ubuntu LTS and be done with it. You're a developer, not a system administrator. Focus on your actual work.",
        id: "Ub3Anon",
      },
    ],
    nestedReplies: {
      "14002": [
        {
          no: 15001,
          time: Math.floor(Date.now() / 1000) - 3600 * 7.1,
          name: "Anonymous",
          com: "&gt;Arch Linux\n&gt;implying\nI use Gentoo btw",
          id: "Ge1Anon",
          replies: 1,
          tim: "1682547890",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
        {
          no: 15002,
          time: Math.floor(Date.now() / 1000) - 3600 * 7,
          name: "Anonymous",
          com: "Manjaro is Arch for people who don't want to spend a day setting up their system.",
          id: "Ma2Anon",
        },
      ],
      "15001": [
        {
          no: 16001,
          time: Math.floor(Date.now() / 1000) - 3600 * 7.05,
          name: "Anonymous",
          com: "&gt;I use Gentoo btw\nHow's that 3-day compile time working out for you?",
          id: "Ct1Anon",
          replies: 1,
        },
      ],
      "16001": [
        {
          no: 17001,
          time: Math.floor(Date.now() / 1000) - 3600 * 7.04,
          name: "Anonymous",
          com: "It's not about the compile time, it's about the optimization. My Firefox launches 0.2 seconds faster than yours.",
          id: "Op1Anon",
          replies: 1,
          tim: "1682547891",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "17001": [
        {
          no: 18001,
          time: Math.floor(Date.now() / 1000) - 3600 * 7.03,
          name: "Anonymous",
          com: "Imagine spending 3 days compiling to save 0.2 seconds on launch. This is why people think Linux users are insane.",
          id: "In1Anon",
        },
      ],
    },
  },
  // Thread 1004 - AI taking jobs
  "1004": {
    thread: mockThreads[3],
    replies: [
      {
        no: 19001,
        time: Math.floor(Date.now() / 1000) - 3600 * 11.5,
        name: "Anonymous",
        com: "AI won't replace programmers, it will replace bad programmers. Learn to use AI as a tool instead of fearing it.",
        id: "Ai1Anon",
        replies: 1,
      },
      {
        no: 19002,
        time: Math.floor(Date.now() / 1000) - 3600 * 11.2,
        name: "Anonymous",
        com: "I've been using GitHub Copilot for a year and it's made me more productive, not less employed. It's just a tool.",
        id: "Cp2Anon",
      },
      {
        no: 19003,
        time: Math.floor(Date.now() / 1000) - 3600 * 11,
        name: "Anonymous",
        com: "The real concern is that AI will commoditize certain types of programming. The value will shift to system design and architecture.",
        id: "Sd3Anon",
        tim: "1682547892",
        ext: ".jpg",
        w: 800,
        h: 600,
      },
    ],
    nestedReplies: {
      "19001": [
        {
          no: 20001,
          time: Math.floor(Date.now() / 1000) - 3600 * 11.4,
          name: "Anonymous",
          com: "This. The programmers who will be replaced are the ones who just copy-paste from Stack Overflow without understanding what they're doing.",
          id: "St1Anon",
          replies: 1,
          tim: "1682547893",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "20001": [
        {
          no: 21001,
          time: Math.floor(Date.now() / 1000) - 3600 * 11.35,
          name: "Anonymous",
          com: "So like 90% of web developers then?",
          id: "Wd1Anon",
          replies: 1,
        },
      ],
      "21001": [
        {
          no: 22001,
          time: Math.floor(Date.now() / 1000) - 3600 * 11.34,
          name: "Anonymous",
          com: "Exactly. The entire JavaScript ecosystem is built on copy-pasting npm packages without understanding how they work.",
          id: "Js1Anon",
          replies: 1,
          tim: "1682547894",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "22001": [
        {
          no: 23001,
          time: Math.floor(Date.now() / 1000) - 3600 * 11.33,
          name: "Anonymous",
          com: "And that's why we have security vulnerabilities like log4j. Nobody audits the dependencies they use.",
          id: "Sc1Anon",
          replies: 1,
        },
      ],
      "23001": [
        {
          no: 24001,
          time: Math.floor(Date.now() / 1000) - 3600 * 11.32,
          name: "Anonymous",
          com: "log4j is Java, not JavaScript. But your point still stands.",
          id: "Jv1Anon",
          tim: "1682547895",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
    },
  },
  // Thread 1005 - Battlestation
  "1005": {
    thread: mockThreads[4],
    replies: [
      {
        no: 25001,
        time: Math.floor(Date.now() / 1000) - 3600 * 23.5,
        name: "Anonymous",
        com: "Pics or it didn't happen.",
        id: "Pi1Anon",
      },
      {
        no: 25002,
        time: Math.floor(Date.now() / 1000) - 3600 * 23.2,
        name: "Anonymous",
        com: "What monitors are you using? I'm looking to upgrade my setup.",
        id: "Mo2Anon",
        replies: 1,
      },
      {
        no: 25003,
        time: Math.floor(Date.now() / 1000) - 3600 * 23,
        name: "Anonymous",
        com: "Ergonomic chairs are worth every penny. Your back will thank you in 10 years.",
        id: "Er3Anon",
      },
    ],
    nestedReplies: {
      "25002": [
        {
          no: 26001,
          time: Math.floor(Date.now() / 1000) - 3600 * 23.1,
          name: "Anonymous",
          com: 'Not OP, but I use an ultrawide (LG 34GN850) in the center and a vertical 27" on the side for code. Perfect combo for development.',
          id: "Uw1Anon",
          replies: 1,
          tim: "1682547896",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "26001": [
        {
          no: 27001,
          time: Math.floor(Date.now() / 1000) - 3600 * 23.05,
          name: "Anonymous",
          com: "How's the ultrawide for gaming? I've heard mixed things about compatibility with some games.",
          id: "Gm1Anon",
          replies: 1,
        },
      ],
      "27001": [
        {
          no: 28001,
          time: Math.floor(Date.now() / 1000) - 3600 * 23.04,
          name: "Anonymous",
          com: "Most modern games support 21:9 well. Older games can be hit or miss. Some competitive games intentionally limit ultrawide support to prevent advantages.",
          id: "Cg1Anon",
          replies: 1,
          tim: "1682547897",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
      "28001": [
        {
          no: 29001,
          time: Math.floor(Date.now() / 1000) - 3600 * 23.03,
          name: "Anonymous",
          com: "What about productivity? Do you find the extra width helpful for coding or do you prefer the vertical monitor for that?",
          id: "Pd1Anon",
          replies: 1,
        },
      ],
      "29001": [
        {
          no: 30001,
          time: Math.floor(Date.now() / 1000) - 3600 * 23.02,
          name: "Anonymous",
          com: "Ultrawide is great for having multiple windows side by side. I usually have my editor in the middle, browser on the left, and terminal on the right. Vertical monitor is perfect for reading docs or long code files.",
          id: "Wf1Anon",
          tim: "1682547898",
          ext: ".jpg",
          w: 800,
          h: 600,
        },
      ],
    },
  },
}

// Add some basic thread data for anime and video game boards
const animeThreadData = {
  "2001": {
    thread: mockAnimeThreads[0],
    replies: [],
    nestedReplies: {},
  },
  "2002": {
    thread: mockAnimeThreads[1],
    replies: [],
    nestedReplies: {},
  },
  "2003": {
    thread: mockAnimeThreads[2],
    replies: [],
    nestedReplies: {},
  },
}

const videoGameThreadData = {
  "3001": {
    thread: mockVideoGameThreads[0],
    replies: [],
    nestedReplies: {},
  },
  "3002": {
    thread: mockVideoGameThreads[1],
    replies: [],
    nestedReplies: {},
  },
  "3003": {
    thread: mockVideoGameThreads[2],
    replies: [],
    nestedReplies: {},
  },
}

// Fetch all boards
export async function fetchBoards() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBoards
}

// Fetch a specific board by ID
export async function fetchBoard(boardId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBoards.find((board) => board.board === boardId) || null
}

// Fetch threads for a specific board
export async function fetchThreads(boardId = "g") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return boardThreads[boardId] || []
}

// Fetch thread by ID
export async function fetchThread(threadId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check in the main thread data
  if (threadData[threadId]?.thread) {
    return threadData[threadId].thread
  }

  // Check in anime thread data
  if (animeThreadData[threadId]?.thread) {
    return animeThreadData[threadId].thread
  }

  // Check in video game thread data
  if (videoGameThreadData[threadId]?.thread) {
    return videoGameThreadData[threadId].thread
  }

  return null
}

// Fetch replies for a specific thread
export async function fetchReplies(threadId: number | string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const threadIdStr = String(threadId)

  // Check in the main thread data
  if (threadData[threadIdStr]?.replies) {
    return threadData[threadIdStr].replies
  }

  // Check in anime thread data
  if (animeThreadData[threadIdStr]?.replies) {
    return animeThreadData[threadIdStr].replies
  }

  // Check in video game thread data
  if (videoGameThreadData[threadIdStr]?.replies) {
    return videoGameThreadData[threadIdStr].replies
  }

  return []
}

// Fetch nested replies for a specific post
export async function fetchNestedReplies(postId: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const postIdStr = String(postId)

  // Look through all threads to find the nested replies for this post
  // Check main thread data
  for (const threadId in threadData) {
    if (threadData[threadId].nestedReplies[postIdStr]) {
      return threadData[threadId].nestedReplies[postIdStr]
    }
  }

  // Check anime thread data
  for (const threadId in animeThreadData) {
    if (animeThreadData[threadId].nestedReplies[postIdStr]) {
      return animeThreadData[threadId].nestedReplies[postIdStr]
    }
  }

  // Check video game thread data
  for (const threadId in videoGameThreadData) {
    if (videoGameThreadData[threadId].nestedReplies[postIdStr]) {
      return videoGameThreadData[threadId].nestedReplies[postIdStr]
    }
  }

  return []
}
