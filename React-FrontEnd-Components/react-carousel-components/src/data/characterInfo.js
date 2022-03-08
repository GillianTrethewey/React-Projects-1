import frodo from '../images/thumbs/frodo.jpg';
import arwen from '../images/thumbs/arwen.jpg';
import gandalf from '../images/thumbs/gandalf.jpg';
import legolas from '../images/thumbs/legolas.png';


// You could have also done "export default nameOfArray;", assuming you
// assigned the array to a variable called "nameOfArray" earlier.
export default [
  {
    image: frodo,
    name: "Frodo Baggins",
    bio: `Frodo comes from the Shire. He inherits the One Ring from his cousin
      (referred to as his uncle) Bilbo Baggins and undertakes the quest to
      destroy it in the fires of Mount Doom.`,
    birthYear: "2968 Third Age",
    species: "Hobbit",
    ring: "The One Ring",
    title: "Deputy Mayor of Michel Delving, Bearer of the One Ring, Elf-friend",
  },

  {
    image: arwen,
    name: "Arwen",
    bio: `Arwen is the Half-Elven daughter of Elrond and
      Celebrían. She is often called Arwen Undómiel or
      "Evenstar". Arwen was born in TA 241, to Lord Elrond
      and Lady Celebrían of Rivendell. Like her father and
      brothers, she had the right to choose between
      immortality or mortal life. She lived most of her life
      in Rivendell and Lothlórien interchangeably.`,
    birthYear: "241 Third Age",
    species: "Half-Elven",
    title: "Lady of Rivendell, Queen of the Reunited Kingdom",
  },

  {
    image: gandalf,
    name: "Gandalf",
    bio: `Gandalf joined Thorin and his company to reclaim
      the Lonely Mountain from Smaug, convoked the Fellowship
      of the Ring to destroy the One Ring, and leads the Free
      Peoples in the final campaign of the War of the Ring.`,
    birthYear: "Unknown",
    species: "Maia",
    ring: "Narya",
    title: `Servant of the Secret Fire, Elf-friend, Istar
      (Wizard), Wielder of the Flame of Anor, Ring-bearer`,
  },

  {
    image: legolas,
    name: "Legolas",
    bio: "They're taking the hobbits to Isengard!",
    birthYear: "2594 Third Age",
    species: "Elf",
    title: "Prince of the Woodland Realm",
  },
];
