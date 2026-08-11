export interface Movie {
  id: string;
  title: string;
  duration: string;
  genre: string;
  tagline: string;
  synopsis: string;
  poster: string;
  episode: string;
}

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Toy Story 4",
    duration: "1 Hr 40 Min",
    genre: "Family, Comedy, Animation",
    tagline: "A quiet story about choosing each other, again and again.",
    synopsis:
      "Sheriff Woody as he struggles to adjust to life with his new owner, Bonnie. During a family road trip, Woody helps a reluctant, homemade spork-turned-toy named Forky. Along the way, Woody reunites with his long-lost friend Bo Peep, who opens his eyes to a whole new world outside of being a child's bedroom toy.",
    poster: "/images/movies/movie1.png",
    episode: "ep1",
  },
  {
    id: "m2",
    title: "Minions",
    duration: "1 Hr 31 Min",
    genre: "Family, Adventure, Animation",
    tagline: "A short film about the sound that makes every bad day better.",
    synopsis:
      "a prequel to Despicable Me that follows Kevin, Stuart, and Bob as they travel the globe in 1968 to find a new supervillain master to lead their tribe, ultimately serving the ambitious Scarlet Overkill before realizing that their true destiny lies with a young Gru",
    poster: "/images/movies/movie2.png",
    episode: "ep1",
  },
  {
    id: "m3",
    title: "Despicable Me 4",
    duration: "1 Hr 34 Min",
    genre: "Action, Comedy, Animation",
    tagline: "The sequel we're still writing together.",
    synopsis:
      " Gru and Lucy welcome a new baby, Gru Jr., who absolutely adores his mother but constantly torments his father. When Maxime escapes seeking revenge with a weapon that turns people into cockroach hybrids, the Anti-Villain League moves the family to the wealthy suburb of Mayflower. Gru takes on the persona of a solar panel salesman named Chad, while dealing with eccentric neighbors and a teenage girl who blackmails him into helping with a heist.",
    poster: "/images/movies/movie3.png",
    episode: "ep1",
  },
  {
    id: "m2-1",
    title: "Inside Out 2",
    duration: "1 hr and 36 mins",
    genre: "Animation, Comedy-Drama, Adventure, Coming-of-Age / Family",
    tagline: "The sequel we're still writing together.",
    synopsis:
      " 13-year-old Riley enters puberty, bringing new teenage emotions like Anxiety, Envy, Ennui, and Embarrassment. When Anxiety takes over Headquarters and banishes Joy, Sadness, Anger, Fear, and Disgust, the original emotions must race back to save Riley's core sense of self from toxic perfectionism.",
    poster: "/images/movies/movie4.png",
    episode: "ep2",
  },
  {
    id: "m2-2",
    title: "Zootopia 2",
    duration: "1 Hr 58 Min",
    genre: "Animation, Adventure, Comedy, Crime / Mystery, Family",
    tagline: "The sequel we're still writing together.",
    synopsis:
      "animated adventure comedy film with a duration of 108 minutes (1 hour and 48 minutes). The story follows police detectives Judy Hopps and Nick Wilde as they go undercover to track a mysterious, exiled reptile named Gary De'Snake across new districts of the mammal metropolis",
    poster: "/images/movies/movie5.png",
      episode: "ep2",
  },
  {
    id: "m2-3",
    title: "Kimitsu no Yaiba: Infinity Castle Arc Part 1",  
    duration: "2 Hr 34 Min",
    genre: "Action, Supernatural, Shōnen anime",
    tagline: "The sequel we're still writing together.",
    synopsis:
      " plunges the Demon Slayer Corps into Muzan's shifting extra-dimensional fortress. Separated, the slayers face brutal clashes against elite Upper Rank demons, featuring Shinobu's tragic duel with Doma, Zenitsu's face-off with Kaigaku, and Tanjiro and Giyu taking on Akaza.",
    poster: "/images/movies/movie6.png",
    episode: "ep2",
  },

];
