// moviesSeedData.js
const db = require("./client");

const moviesSeedData = [
  {
    
    title: "Inception",
    imageUrl: "../../../public/inception.png",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    genre: "Sci-Fi",
    releaseYear: 2010,
    rating: 8.8
},
{
  imageUrl: 'https://www.themoviedb.org/t/p/original/qYYIxgm9qxz1Fvu6mA6gKs9iLZC.jpg',  
  title: "The Grinch",
  description: "A grumpy, green creature known as the Grinch attempts to ruin Christmas for the cheerful residents of Whoville. Living alone on the snowy Mount Crumpit, the Grinch despises the holiday season and the joy it brings to the townsfolk. His heart set on stopping Christmas from coming, the Grinch devises a mischievous plan to steal all the Christmas decorations, gifts, and feast. However, his encounter with the kind-hearted Cindy Lou Who may lead to an unexpected change of heart.",
  genre: "Family",
  releaseYear: 2000,  
  rating: 6.2  
},
{
  imageUrl: 'http://www.reelworldtheology.com/wp-content/uploads/2018/08/the-shawshank-redemption-movie-poster-29x41-in-r2000-franck-darabont-tim-robbins.jpg',
  title: "The Shawshank Redemption",
  description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  genre: "Drama",
  releaseYear: 1994,
  rating: 9.3
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
  imageUrl: 'http://media2.firstshowing.net/firstshowing/img/darkknightposter-fullhuge.jpg',
  title: "The Dark Knight",
  description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  genre: "Action",
  releaseYear: 2008,
  rating: 9.0
},
{
  imageUrl: 'https://image.tmdb.org/t/p/original/gSnbhR0vftfJ2U6KpGmR7WzZlVo.jpg',
  title: "Pulp Fiction",
  description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  genre: "Crime",
  releaseYear: 1994,
  rating: 8.9
},
{
  imageUrl: 'https://www.researchgate.net/profile/Stefan_Bolea/publication/309717420/figure/fig1/AS:425102790664192@1478363811754/Fight-Club-movie-poster-1999.png',
  title: "Fight Club",
  description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
  genre: "Drama",
  releaseYear: 1999,
  rating: 8.8
},
{
  imageUrl: 'https://1.bp.blogspot.com/-0wpQLAHzsjU/Tomg5okGRpI/AAAAAAAAAyM/2fzQk5bwEnw/s1600/Forrest-Gump-Poster-3.jpg',
  title: "Forrest Gump",
  description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  genre: "Romance",
  releaseYear: 1994,
  rating: 8.8
},
{
  imageUrl: 'https://furiousreviews.files.wordpress.com/2015/03/7736093674_2e8414a35c_o.jpg',
  title: "Inglourious Basterds",
  description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
  genre: "War",
  releaseYear: 2009,
  rating: 8.3
},
{
  imageUrl: 'https://image.tmdb.org/t/p/original/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
  title: "The Matrix",
  description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
  genre: "Action",
  releaseYear: 1999,
  rating: 8.7
},
{
  imageUrl: 'https://www.themoviedb.org/t/p/original/8yHuuCyL9sWWGbqTYLG3bStjFts.jpg',
  title: "Se7en",
  description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
  genre: "Mystery",
  releaseYear: 1995,
  rating: 8.6
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
},
];

module.exports = moviesSeedData

