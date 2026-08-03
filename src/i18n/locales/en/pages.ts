export const pages = {
  home: {
    discoveryOfDay: "DISCOVERY OF THE DAY",
    exploreButton: "Explore",
    emptyHero: "Discover the Universe 🌌",
    exploreCosmos: "Explore the cosmos",
    viewMore: "View more",
    features: {
      infinite: { title: "Infinite Exploration", desc: "Discover daily images of the universe straight from NASA." },
      collection: { title: "Your Collection", desc: "Save your favorite astronomical phenomena in your personal gallery." },
      history: { title: "Historical Archive", desc: "Navigate through history and relive past discoveries." }
    }
  },
  discover: {
    title: "Cosmic Exploration",
    subtitle: "Discover the wonders of the universe through the NASA archive"
  },
  detail: {
    copyright: "Copyright:",
    back: "Back",
    addToFavs: "Add to Favourites",
    removeFromFavs: "Remove from Favourites",
    playVideo: "Watch video on YouTube"
  },
  favourites: {
    title: "Your Stellar Collection",
    subtitle: "Your favorite astronomical discoveries saved forever.",
    emptyTitle: "No discoveries saved yet",
    emptyDesc: "Explore our astronomical gallery and save your favorite images to create your own personal cosmos collection.",
    startExploring: "Start Exploring"
  },
  history: {
    title: "Exploration Archive",
    subtitle: "A record of all your discoveries and journeys through the cosmos.",
    clearHistory: "Clear Archive",
    emptyTitle: "Your archive is empty",
    emptyDesc: "You haven't explored any astronomical image yet. The universe awaits!",
    startExploring: "Start Exploring"
  },
  about: {
    title: "About the Project",
    subtitle: "Discovering the universe, one line of code at a time.",
    whatIs: {
      title: "What is APOD-explorer?",
      p1: "I am Maximiliano Giménez, a Computer Engineering student at UNAJ. This application aims to facilitate universe exploration by bringing scientific knowledge closer through NASA's official Astronomy Picture of the Day (APOD) interface.",
      p2: "The project allows you to explore a vast archive of daily images and videos of the cosmos, with features such as date filters, a favorites system, an exploration history, and a modern design inspired by premium editorial platforms."
    },
    tech: {
      title: "Technology",
      desc: "Built with modern technologies to deliver optimal performance and a smooth experience."
    },
    location: {
      title: "Where can you find me?",
      desc: "At the Arturo Jauretche National University (UNAJ). This space became my second home since I started my degree. It's here where many of my ideas and projects are born, where I face challenges that drive me to improve every day, and where I surround myself with people seeking to grow and contribute to the world of technology and science."
    },
    survey: {
      title: "Leave your feedback"
    }
  }
} as const;
