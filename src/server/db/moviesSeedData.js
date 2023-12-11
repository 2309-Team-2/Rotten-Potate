// moviesSeedData.js
const db = require("./client");

const moviesSeedData = [
  // Family movies -----------------------------------
  {
    imageUrl: 'https://www.themoviedb.org/t/p/original/qYYIxgm9qxz1Fvu6mA6gKs9iLZC.jpg',  
    title: "The Grinch",
    description: "A grumpy, green creature known as the Grinch attempts to ruin Christmas for the cheerful residents of Whoville. Living alone on the snowy Mount Crumpit, the Grinch despises the holiday season and the joy it brings to the townsfolk. His heart set on stopping Christmas from coming, the Grinch devises a mischievous plan to steal all the Christmas decorations, gifts, and feast. However, his encounter with the kind-hearted Cindy Lou Who may lead to an unexpected change of heart.",
    genre: "Family",
    releaseYear: 2000,  
    rating: 6.2  
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg',
    title: "Toy Story",
    description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as the top toy in a boy's room.",
    genre: "Family",
    releaseYear: 1995,
    rating: 8.3
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/XOsAAOSwX1pfiAia/s-l1200.jpg',
    title: "The Lion King",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    genre: "Family",
    releaseYear: 1994,
    rating: 8.5
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/718cl3ZJR1L._AC_UF894,1000_QL80_.jpg',
    title: "Finding Nemo",
    description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    genre: "Family",
    releaseYear: 2003,
    rating: 8.1
  },
  {
    imageUrl: 'https://filmartgallery.com/cdn/shop/products/Frozen-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1645671855',
    title: "Frozen",
    description: "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.",
    genre: "Family",
    releaseYear: 2013,
    rating: 7.4
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/eP0AAOSwhvFZBnty/s-l1200.jpg',
    title: "Moana",
    description: "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
    genre: "Family",
    releaseYear: 2016,
    rating: 7.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMmYwNWZlNzEtNjE4Zi00NzQ4LWI2YmUtOWZhNzZhZDYyNmVmXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_.jpg',
    title: "Paddington 2",
    description: "Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy's 100th birthday, only for the gift to be stolen.",
    genre: "Family",
    releaseYear: 2017,
    rating: 7.8
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/6IkAAOSwMw1hZOzG/s-l1600.png',
    title: "Coco",
    description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    genre: "Family",
    releaseYear: 2017,
    rating: 8.4
  },
  {
    imageUrl: 'https://myhotposters.com/cdn/shop/products/mHP0104_grande.jpeg?v=1571444281',
    title: "The Incredibles",
    description: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
    genre: "Family",
    releaseYear: 2004,
    rating: 8.0
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/pScAAOSwn7JYCrO1/s-l1200.webp',
    title: "Shrek",
    description: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
    genre: "Family",
    releaseYear: 2001,
    rating: 7.8
  },
  // action movies ------------------------------------
  {
    imageUrl: 'http://media2.firstshowing.net/firstshowing/img/darkknightposter-fullhuge.jpg',
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action",
    releaseYear: 2008,
    rating: 9.0
  },
  {
    imageUrl: 'https://originalvintagemovieposters.com/wp-content/uploads/2019/12/DIE-HARD-8410.jpg',
    title: "Die Hard",
    description: "NYPD officer John McClane tries to save hostages from a Los Angeles skyscraper taken over by terrorists on Christmas Eve.",
    genre: "Action",
    releaseYear: 1988,
    rating: 8.2
  },
  {
    imageUrl: 'https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    title: "Mad Max: Fury Road",
    description: "In a post-apocalyptic wasteland, Max teams up with a mysterious woman, Furiosa, to try and survive and escape from a tyrannical warlord.",
    genre: "Action",
    releaseYear: 2015,
    rating: 8.1
  },
  {
    imageUrl: 'https://originalvintagemovieposters.com/wp-content/uploads/2021/06/Terminator-2-5942-scaled.jpg',
    title: "Terminator 2: Judgment Day",
    description: "A cyborg is sent from the future to protect the young John Connor from a more advanced and deadly cyborg.",
    genre: "Action",
    releaseYear: 1991,
    rating: 8.5
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/f1sAAOSwAChhkI33/s-l1200.webp',
    title: "John Wick",
    description: "A retired hitman seeks vengeance for the killing of his dog, a gift from his deceased wife.",
    genre: "Action",
    releaseYear: 2014,
    rating: 7.4
  },
  {
    imageUrl: 'https://www.themoviedb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
    title: "Mission: Impossible - Fallout",
    description: "Ethan Hunt and his IMF team must stop a global catastrophe after a mission goes wrong.",
    genre: "Action",
    releaseYear: 2018,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61ATuIYm1EL.jpg',
    title: "Gladiator",
    description: "A betrayed Roman general seeks justice by becoming a gladiator in ancient Rome.",
    genre: "Action",
    releaseYear: 2000,
    rating: 8.5
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/51qm7bmoi4L._AC_UF894,1000_QL80_.jpg',
    title: "The Bourne Identity",
    description: "A man is picked up by a fishing boat, bullet-riddled and without memory, then races to elude assassins and recover from amnesia.",
    genre: "Action",
    releaseYear: 2002,
    rating: 7.9
  },
  {
    imageUrl: 'https://www.movieposters.com/cdn/shop/products/KILLBILL.VOL.1.PW_500x.jpg?v=1574966219',
    title: "Kill Bill: Vol. 1",
    description: "The Bride awakens from a four-year coma. The child she carried in her womb is gone. Now, she must wreak vengeance on the team of assassins who betrayed her.",
    genre: "Action",
    releaseYear: 2003,
    rating: 8.1
  },
  {
    imageUrl: 'https://filmartgallery.com/cdn/shop/products/The-Terminator-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1663222603',
    title: "The Terminator",
    description: "A cyborg assassin known as the Terminator is sent from the future to kill Sarah Connor, whose son will one day become a savior against machines in a post-apocalyptic future. A soldier from the future is also sent to protect Sarah.",
    genre: "Action",
    releaseYear: 1984,
    rating: 8.0
  },
  // crime movies --------------------------------
  {
    imageUrl: 'https://image.tmdb.org/t/p/original/gSnbhR0vftfJ2U6KpGmR7WzZlVo.jpg',
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime",
    releaseYear: 1994,
    rating: 8.9
  },
  {
    imageUrl: 'https://movietalkexpress.files.wordpress.com/2015/12/the-godfather.jpeg',
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Crime",
    releaseYear: 1972,
    rating: 9.2
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    title: "The Godfather: Part II",
    description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    genre: "Crime",
    releaseYear: 1974,
    rating: 9.0
  },
  {
    imageUrl: 'https://wallpapers.com/images/hd/goodfellas-movie-poster-template-7cc9ns0pt4wnw6um.jpg',
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    genre: "Crime",
    releaseYear: 1990,
    rating: 8.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    title: "The Silence of the Lambs",
    description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    genre: "Crime",
    releaseYear: 1991,
    rating: 8.6
  },
  {
    imageUrl: 'https://i.etsystatic.com/23402008/r/il/8b111e/2375948959/il_570xN.2375948959_6kw0.jpg',
    title: "The Departed",
    description: "An undercover cop and a mole in the police force attempt to identify each other while infiltrating an Irish gang in Boston.",
    genre: "Crime",
    releaseYear: 2006,
    rating: 8.5
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg',
    title: "Casino",
    description: "A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.",
    genre: "Crime",
    releaseYear: 1995,
    rating: 8.2
  },
  {
    imageUrl: 'https://myhotposters.com/cdn/shop/products/HP2802_e2a5221f-a197-4a61-8a28-783c078e0cd0_1024x1024.jpg?v=1571444930',
    title: "Heat",
    description: "A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.",
    genre: "Crime",
    releaseYear: 1995,
    rating: 8.2
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTIzNDUyMjA4MV5BMl5BanBnXkFtZTYwNDc4ODM3._V1_.jpg',
    title: "Mystic River",
    description: "The lives of three childhood friends are shattered when one of them has a family tragedy.",
    genre: "Crime",
    releaseYear: 2003,
    rating: 7.9
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    title: "The Usual Suspects",
    description: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
    genre: "Crime",
    releaseYear: 1995,
    rating: 8.5
  },
  // drama movies ---------------------------------
  {
    imageUrl: 'https://www.researchgate.net/profile/Stefan_Bolea/publication/309717420/figure/fig1/AS:425102790664192@1478363811754/Fight-Club-movie-poster-1999.png',
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
    genre: "Drama",
    releaseYear: 1999,
    rating: 8.8
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    title: "A Beautiful Mind",
    description: "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.",
    genre: "Drama",
    releaseYear: 2001,
    rating: 8.2
  },
  {
    imageUrl: 'https://static.displate.com/857x1200/displate/2020-12-17/4bfb146e8b9850cdc9502e0725bf4908_884a0f175d1b6e6162e202d6153d69cd.jpg',
    title: "The Social Network",
    description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.",
    genre: "Drama",
    releaseYear: 2010,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/61yU3beuBPL._AC_UF894,1000_QL80_.jpg',
    title: "A Star is Born",
    description: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.",
    genre: "Drama",
    releaseYear: 2018,
    rating: 7.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/A1BjliXNDPL.jpg',
    title: "The Revenant",
    description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    genre: "Drama",
    releaseYear: 2015,
    rating: 8.0
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_FMjpg_UX1000_.jpg',
    title: "12 Years a Slave",
    description: "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.",
    genre: "Drama",
    releaseYear: 2013,
    rating: 8.1
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg',
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    genre: "Drama",
    releaseYear: 1999,
    rating: 8.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    genre: "Drama",
    releaseYear: 1993,
    rating: 8.9
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/71JBbULtGSL._AC_UF894,1000_QL80_.jpg',
    title: "Good Will Hunting",
    description: "A janitor at MIT has a gift for mathematics but needs help from a psychologist to find direction in his life.",
    genre: "Drama",
    releaseYear: 1997,
    rating: 8.3
  },
  {
    imageUrl: 'http://www.reelworldtheology.com/wp-content/uploads/2018/08/the-shawshank-redemption-movie-poster-29x41-in-r2000-franck-darabont-tim-robbins.jpg',
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    releaseYear: 1994,
    rating: 9.3
  },
  // romance movies -------------------------------
  {
    imageUrl: 'https://1.bp.blogspot.com/-0wpQLAHzsjU/Tomg5okGRpI/AAAAAAAAAyM/2fzQk5bwEnw/s1600/Forrest-Gump-Poster-3.jpg',
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    genre: "Romance",
    releaseYear: 1994,
    rating: 8.8
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/5152xUVky4L._AC_UF894,1000_QL80_.jpg',
    title: "The Notebook",
    description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    genre: "Romance",
    releaseYear: 2004,
    rating: 7.8
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/jjEAAOSwZIZhPkJ9/s-l1200.jpg',
    title: "Titanic",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    genre: "Romance",
    releaseYear: 1997,
    rating: 7.8
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/51d5M05dlWL._AC_UF894,1000_QL80_.jpg',
    title: "Pride and Prejudice",
    description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
    genre: "Romance",
    releaseYear: 2005,
    rating: 7.8
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg',
    title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    genre: "Romance",
    releaseYear: 2016,
    rating: 8.0
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    title: "Before Sunrise",
    description: "A young man and woman meet on a train in Europe and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
    genre: "Romance",
    releaseYear: 1995,
    rating: 8.1
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg',
    title: "Eternal Sunshine of the Spotless Mind",
    description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    genre: "Romance",
    releaseYear: 2004,
    rating: 8.3
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_.jpg',
    title: "500 Days of Summer",
    description: "An offbeat romantic comedy about a woman who doesn't believe true love exists and the young man who falls for her.",
    genre: "Romance",
    releaseYear: 2009,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNTVkMTFiZWItOTFkOC00YTc3LWFhYzQtZTg3NzAxZjJlNTAyXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg',
    title: "The Fault in Our Stars",
    description: "Two teenage cancer patients begin a life-affirming journey to visit a reclusive author in Amsterdam.",
    genre: "Romance",
    releaseYear: 2014,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTM2MTI5NzA3MF5BMl5BanBnXkFtZTcwODExNTc0OA@@._V1_.jpg',
    title: "Silver Linings Playbook",
    description: "After a stint in a mental institution, former teacher Pat Solitano moves back in with his parents and tries to reconcile with his ex-wife. Things get more challenging when Pat meets Tiffany, a mysterious girl with problems of her own.",
    genre: "Romance",
    releaseYear: 2012,
    rating: 7.7
  },
  // War movies ---------------------------------
  {
    imageUrl: 'https://furiousreviews.files.wordpress.com/2015/03/7736093674_2e8414a35c_o.jpg',
    title: "Inglourious Basterds",
    description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    genre: "War",
    releaseYear: 2009,
    rating: 8.3
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51FiFegjEXL.jpg',
    title: "Saving Private Ryan",
    description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    genre: "War",
    releaseYear: 1998,
    rating: 8.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg',
    title: "Dunkirk",
    description: "Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
    genre: "War",
    releaseYear: 2017,
    rating: 7.8
  },
  {
    imageUrl: 'https://i.etsystatic.com/18242346/r/il/3ebf33/2173565278/il_570xN.2173565278_3u9u.jpg',
    title: "1917",
    description: "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
    genre: "War",
    releaseYear: 2019,
    rating: 8.3
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzRjZjdlMjQtODVkYS00N2YzLWJlYWYtMGVlN2E5MWEwMWQzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    title: "Platoon",
    description: "A young soldier in Vietnam faces a moral crisis when confronted with the horrors of war and the duality of man.",
    genre: "War",
    releaseYear: 1986,
    rating: 8.1
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNzkxODk0NjEtYjc4Mi00ZDI0LTgyYjEtYzc1NDkxY2YzYTgyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    title: "Full Metal Jacket",
    description: "A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits from their brutal boot camp training to the bloody street fighting in Hue.",
    genre: "War",
    releaseYear: 1987,
    rating: 8.3
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/~DEAAOSwYipgm8TR/s-l1600.jpg',
    title: "Apocalypse Now",
    description: "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
    genre: "War",
    releaseYear: 1979,
    rating: 8.4
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_.jpg',
    title: "Hacksaw Ridge",
    description: "World War II American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.",
    genre: "War",
    releaseYear: 2016,
    rating: 8.1
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BYjEzMTM2NjAtNWFmZC00MTVlLTgyMmQtMGQyNTFjZDk5N2NmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg',
    title: "The Thin Red Line",
    description: "Adaptation of James Jones' autobiographical 1962 novel, focusing on the conflict at Guadalcanal during the second World War.",
    genre: "War",
    releaseYear: 1998,
    rating: 7.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51Cb++0HC4L.jpg',
    title: "Black Hawk Down",
    description: "160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis.",
    genre: "War",
    releaseYear: 2001,
    rating: 7.7
  },
  // Sci-Fi movies -------------------------------
  {
    imageUrl: 'https://image.tmdb.org/t/p/original/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
    title: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    genre: "Sci-Fi",
    releaseYear: 1999,
    rating: 8.7
  },
  {
    imageUrl: 'https://i.pinimg.com/originals/4c/29/d6/4c29d6753e61511d6369567214af2f53.jpg',
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    releaseYear: 2014,
    rating: 8.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    genre: "Sci-Fi",
    releaseYear: 2010,
    rating: 8.8
  },
  {
    imageUrl: 'https://i.etsystatic.com/23402008/r/il/05d9e5/3286666323/il_570xN.3286666323_kuth.jpg',
    title: "Blade Runner",
    description: "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    genre: "Sci-Fi",
    releaseYear: 1982,
    rating: 8.1
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    title: "The Matrix Reloaded",
    description: "Neo and his allies race against time before the machines discover Zion and destroy it. While seeking the truth about the Matrix, Neo must save Trinity from a dark fate.",
    genre: "Sci-Fi",
    releaseYear: 2003,
    rating: 7.2
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_.jpg',
    title: "The Martian",
    description: "An astronaut becomes stranded on Mars after his team assumes him dead and must rely on his ingenuity to signal to Earth that he is alive.",
    genre: "Sci-Fi",
    releaseYear: 2015,
    rating: 8.0
  },
  {
    imageUrl: 'https://i.ebayimg.com/images/g/UeIAAOSwL-tfjIhX/s-l1200.webp',
    title: "Star Wars: Episode IV - A New Hope",
    description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station.",
    genre: "Sci-Fi",
    releaseYear: 1977,
    rating: 8.6
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51F5dxl+MwL._AC_.jpg',
    title: "The Fifth Element",
    description: "In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.",
    genre: "Sci-Fi",
    releaseYear: 1997,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_.jpg',
    title: "Ex Machina",
    description: "A young programmer is selected to participate in a groundbreaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
    genre: "Sci-Fi",
    releaseYear: 2014,
    rating: 7.7
  },
  {
    imageUrl: 'https://m.media-amazon.com/images/I/71zR7dYIjzL._AC_UF894,1000_QL80_.jpg',
    title: "Star Trek",
    description: "The film follows a young James T. Kirk and Spock as they join Starfleet and become part of the crew on the USS Enterprise. Together, they face a powerful Romulan threat that could alter the course of the future.",
    genre: "Science Fiction",
    releaseYear: 2009,
    rating: 7.9
  },
  // Mystery movies ----------------------------
  {
    imageUrl: 'https://www.themoviedb.org/t/p/original/8yHuuCyL9sWWGbqTYLG3bStjFts.jpg',
    title: "Se7en",
    description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    genre: "Mystery",
  releaseYear: 1995,
  rating: 8.6
},
{
  imageUrl: 'https://www.gstatic.com/tv/thumb/v22vodart/2642/p2642_v_v8_ae.jpg',
  title: "Sherlock Holmes",
  description: "Detective Sherlock Holmes and his stalwart partner Watson engage in a battle of wits and brawn with a nemesis whose plot is a threat to all of England.",
  genre: "Mystery",
  releaseYear: 2009,
  rating: 7.6
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjIxMjQyMTc3Nl5BMl5BanBnXkFtZTcwMTA1MDUzMw@@._V1_.jpg',
  title: "The Da Vinci Code",
  description: "A murder inside the Louvre and clues in Da Vinci paintings lead to the discovery of a religious mystery protected by a secret society for two thousand years.",
  genre: "Mystery",
  releaseYear: 2006,
  rating: 6.6
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg',
  title: "Gone Girl",
  description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
  genre: "Mystery",
  releaseYear: 2014,
  rating: 8.1
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_.jpg',
  title: "The Girl with the Dragon Tattoo",
  description: "Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for forty years by Lisbeth Salander, a young computer hacker.",
  genre: "Mystery",
  releaseYear: 2011,
  rating: 7.8
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_.jpg',
  title: "Prisoners",
  description: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
  genre: "Mystery",
  releaseYear: 2013,
  rating: 8.1
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
  title: "Zodiac",
  description: "In the late 1960s/early 1970s, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
  genre: "Mystery",
  releaseYear: 2007,
  rating: 7.7
},
{
  imageUrl: 'https://i.etsystatic.com/27725708/r/il/e42833/2927140553/il_570xN.2927140553_9u6n.jpg',
  title: "The Prestige",
  description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
  genre: "Mystery",
  releaseYear: 2006,
  rating: 8.5
},
{
  imageUrl: 'https://i.ebayimg.com/images/g/~rIAAOSwMJJg5rJL/s-l1600.jpg',
  title: "The Sixth Sense",
  description: "A boy who communicates with spirits that don't know they're dead seeks the help of a disheartened child psychologist.",
  genre: "Mystery",
  releaseYear: 1999,
  rating: 8.1
},
{
  imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
  title: "The Usual Suspects",
  description: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
  genre: "Mystery",
  releaseYear: 1995,
  rating: 8.5
},
// Horror movies ----------------------------
{
  imageUrl: 'https://www.themoviedb.org/t/p/original/6u1F2BnzZsT4kpX6V1iYmeXQ5iY.jpg',
  title: "The Exorcist",
  description: "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
  genre: "Horror",
  releaseYear: 1973,
  rating: 8.0
},
{
  imageUrl: 'http://4.bp.blogspot.com/-kPLV9lP66vI/UJCWw4bOlrI/AAAAAAAAB7U/RtWwU2F8TM0/s1600/halloween_1_poster_01.jpg',
  title: "Halloween",
  description: "Fifteen years after murdering his sister on Halloween night, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield to kill again.",
  genre: "Horror",
  releaseYear: 1978,
  rating: 7.8
},
{
  imageUrl: 'https://media-cache.cinematerial.com/p/500x/rywwznp1/a-nightmare-on-elm-street-movie-poster.jpg?v=1456749732',
  title: "A Nightmare on Elm Street",
  description: "The monstrous spirit of a slain child murderer seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death.",
  genre: "Horror",
  releaseYear: 1984,
  rating: 7.5
},
{
  imageUrl: 'https://filmblitz.org/wp-content/uploads/2020/07/shining-poster.jpg',
  title: "The Shining",
  description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
  genre: "Horror",
  releaseYear: 1980,
  rating: 8.4
},
{
  imageUrl: 'https://preview.redd.it/f3rbav1bispz.jpg?auto=webp&s=8b829c8558fd806dc97edc376cd7e69c90b124b9',
  title: "The Texas Chain Saw Massacre",
  description: "Two siblings and three of their friends en route to visit their grandfather's grave in Texas end up falling victim to a family of cannibalistic psychopaths.",
  genre: "Horror",
  releaseYear: 1974,
  rating: 7.5
},
{
  imageUrl: 'https://media-cache.cinematerial.com/p/500x/erxfdhit/it-movie-poster.jpg?v=1503966987',
  title: "It",
  description: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.",
  genre: "Horror",
  releaseYear: 2017,
  rating: 7.3
},
{
  imageUrl: 'https://posterspy.com/wp-content/uploads/2017/01/Poster-2017-Get-Out-1.jpg',
  title: "Get Out",
  description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
  genre: "Horror",
  releaseYear: 2017,
  rating: 7.7
},
{
  imageUrl: 'https://www.newdvdreleasedates.com/images/posters/large/hereditary-2018-02.jpg',
  title: "Hereditary",
  description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
  genre: "Horror",
  releaseYear: 2018,
  rating: 7.3
},
{
  imageUrl: 'https://picfiles.alphacoders.com/134/134299.jpg',
  title: "The Conjuring",
  description: "Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse.",
  genre: "Horror",
  releaseYear: 2013,
  rating: 7.5
},
{
  imageUrl: 'https://www.themoviedb.org/t/p/original/bWX50hLnJbKQcsPO51aRwtzP0xQ.jpg',
  title: "Psycho",
  description: "A Phoenix secretary embezzles forty thousand dollars from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
  genre: "Horror",
  releaseYear: 1960,
  rating: 8.5
},
// Comedy movies -------------------------------
{
  imageUrl: 'https://picfiles.alphacoders.com/137/thumb-1920-137212.jpg',
  title: "The Grand Budapest Hotel",
  description: "A famous concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé.",
  genre: "Comedy",
  releaseYear: 2014,
  rating: 8.1
},
{
  imageUrl: 'https://img.moviesrankings.com/t/p/w1280/hqNVGI3tvo7mu6SJVIbmBSIYzA1.jpg',
  title: "Superbad",
  description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
  genre: "Comedy",
  releaseYear: 2007,
  rating: 7.6
},
{
  imageUrl: 'https://img.moviesrankings.com/t/p/w1280/p6bJk43CTrOp3qnBmBgOGxZOpBw.jpg',
  title: "The Hangover",
  description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
  genre: "Comedy",
  releaseYear: 2009,
  rating: 7.7
},
{
  imageUrl: 'https://picfiles.alphacoders.com/774/thumb-1920-77421.jpg',
  title: "Bridesmaids",
  description: "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
  genre: "Comedy",
  releaseYear: 2011,
  rating: 6.8
},
{
  imageUrl: 'https://media.baselineresearch.com/images/333385/333385_full.jpg',
  title: "Anchorman: The Legend of Ron Burgundy",
  description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change.",
  genre: "Comedy",
  releaseYear: 2004,
  rating: 7.2
},
{
  imageUrl: 'https://cdn.vox-cdn.com/thumbor/SDfuqvklMAtFURbYf1GGQK8vgp4=/0x0:960x1440/1200x0/filters:focal(0x0:960x1440)/cdn.vox-cdn.com/uploads/chorus_asset/file/8042377/p175884_p_v8_ag.jpg',
  title: "Step Brothers",
  description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
  genre: "Comedy",
  releaseYear: 2008,
  rating: 6.9
},
{
  imageUrl: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8110/8110051_so.jpg',
  title: "Zoolander",
  description: "At the end of his career, a clueless fashion model is brainwashed to kill the Prime Minister of Malaysia.",
  genre: "Comedy",
  releaseYear: 2001,
  rating: 6.5
},
{
  imageUrl: 'https://alchetron.com/cdn/Napoleon-Dynamite-images-08122225-c0e2-4561-9454-b1a82420c2c.jpg',
  title: "Napoleon Dynamite",
  description: "A listless and alienated teenager decides to help his new friend win the class presidency in their small western high school, while he must deal with his bizarre family life back home.",
  genre: "Comedy",
  releaseYear: 2004,
  rating: 6.9
},
{
  imageUrl: 'https://4.bp.blogspot.com/-G0SEVkztMoA/VkJVgqCETvI/AAAAAAAAKCU/p1a2zEDOyvQ/s640/tropic%2Bthunder%2BDVD.jpg',
  title: "Tropic Thunder",
  description: "Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.",
  genre: "Comedy",
  releaseYear: 2008,
  rating: 7.0
},
{
  imageUrl: 'https://i.etsystatic.com/28260419/r/il/7f596f/3013583480/il_fullxfull.3013583480_ju0f.jpg',
  title: "The 40-Year-Old Virgin",
  description: "Goaded by his buddies, a nerdy guy who's never done the deed only finds the pressure mounting when he meets a single mother.",
  genre: "Comedy",
  releaseYear: 2005,
  rating: 7.1
}
];

module.exports = moviesSeedData

