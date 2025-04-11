import { db } from "../lib/db";

// Word roots data
const wordRoots = [
  {
    prefix: "auto",
    meaning: "self",
    description: "From Greek 'autos' meaning 'self' or 'same'",
    origin: "Greek",
    words: [
      {
        term: "autobiography",
        definition: "A self-written account of one's own life",
        pronunciation: "aw-toh-bye-OG-ruh-fee",
        partOfSpeech: "noun",
        example: "She published her autobiography at the age of 40.",
        notes: "From auto (self) + biography (life writing)",
      },
      {
        term: "automatic",
        definition: "Working by itself with little or no direct human control",
        pronunciation: "aw-tuh-MAT-ik",
        partOfSpeech: "adjective",
        example: "The door has an automatic closing mechanism.",
        notes: "From auto (self) + -matic (willing)",
      },
      {
        term: "autonomy",
        definition: "Freedom from external control or influence; independence",
        pronunciation: "aw-TON-uh-mee",
        partOfSpeech: "noun",
        example: "The region was granted autonomy after years of conflict.",
        notes: "From auto (self) + nomos (law)",
      },
      {
        term: "automobile",
        definition: "A road vehicle designed to carry a driver and passengers",
        pronunciation: "AW-tuh-moh-beel",
        partOfSpeech: "noun",
        example:
          "The automobile industry is rapidly evolving with electric vehicles.",
        notes: "From auto (self) + mobile (moving)",
      },
    ],
    examples: [
      {
        text: "The autopilot system took control of the plane.",
        translation: "Hệ thống lái tự động đã điều khiển máy bay.",
      },
    ],
  },
  {
    prefix: "bio",
    meaning: "life",
    description: "From Greek 'bios' meaning 'life' or 'mode of life'",
    origin: "Greek",
    words: [
      {
        term: "biology",
        definition: "The study of living organisms",
        pronunciation: "bye-OL-uh-jee",
        partOfSpeech: "noun",
        example: "She majored in biology at university.",
        notes: "From bio (life) + -logy (study)",
      },
      {
        term: "biodiversity",
        definition:
          "The variety of plant and animal life in a particular habitat",
        pronunciation: "bye-oh-dih-VER-sih-tee",
        partOfSpeech: "noun",
        example: "The rainforest has incredible biodiversity.",
        notes: "From bio (life) + diversity (variety)",
      },
      {
        term: "biosphere",
        definition:
          "The regions of the Earth's crust and atmosphere occupied by living organisms",
        pronunciation: "BYE-oh-sfeer",
        partOfSpeech: "noun",
        example: "Humans have significantly impacted the biosphere.",
        notes: "From bio (life) + sphere (globe)",
      },
      {
        term: "bioethics",
        definition: "The ethics of medical and biological research",
        pronunciation: "bye-oh-ETH-iks",
        partOfSpeech: "noun",
        example:
          "Bioethics is an increasingly important field in modern medicine.",
        notes: "From bio (life) + ethics (moral principles)",
      },
    ],
    examples: [
      {
        text: "The biography details her life from childhood to fame.",
        translation:
          "Tiểu sử chi tiết cuộc đời của cô ấy từ thời thơ ấu đến khi nổi tiếng.",
      },
    ],
  },
  {
    prefix: "tele",
    meaning: "distant",
    description: "From Greek 'tele' meaning 'far off' or 'at a distance'",
    origin: "Greek",
    words: [
      {
        term: "telephone",
        definition:
          "An apparatus for sound transmission and reception over distance",
        pronunciation: "TEL-uh-fohn",
        partOfSpeech: "noun",
        example: "He made a telephone call to his mother.",
        notes: "From tele (distant) + phone (sound)",
      },
      {
        term: "telescope",
        definition:
          "An optical instrument for making distant objects appear closer",
        pronunciation: "TEL-uh-skohp",
        partOfSpeech: "noun",
        example: "She observed the stars through a telescope.",
        notes: "From tele (distant) + scope (to look)",
      },
      {
        term: "television",
        definition:
          "A system for transmitting visual images and sound over a distance",
        pronunciation: "TEL-uh-vizh-un",
        partOfSpeech: "noun",
        example: "They watched the news on television.",
        notes: "From tele (distant) + vision (sight)",
      },
      {
        term: "teleport",
        definition:
          "To transport or be transported across space by supernatural means",
        pronunciation: "TEL-uh-port",
        partOfSpeech: "verb",
        example:
          "In the movie, the character could teleport between dimensions.",
        notes: "From tele (distant) + port (to carry)",
      },
    ],
    examples: [
      {
        text: "Telecommuting allows employees to work from home.",
        translation: "Làm việc từ xa cho phép nhân viên làm việc tại nhà.",
      },
    ],
  },
  {
    prefix: "geo",
    meaning: "earth",
    description: "From Greek 'ge' meaning 'earth'",
    origin: "Greek",
    words: [
      {
        term: "geography",
        definition: "The study of the physical features of the earth",
        pronunciation: "jee-OG-ruh-fee",
        partOfSpeech: "noun",
        example: "Geography is an important subject in school.",
        notes: "From geo (earth) + -graphy (writing)",
      },
      {
        term: "geology",
        definition:
          "The science of the earth's physical structure and substance",
        pronunciation: "jee-OL-uh-jee",
        partOfSpeech: "noun",
        example: "She studied geology and specializes in volcanic formations.",
        notes: "From geo (earth) + -logy (study)",
      },
      {
        term: "geothermal",
        definition: "Relating to or produced by the internal heat of the earth",
        pronunciation: "jee-oh-THER-mul",
        partOfSpeech: "adjective",
        example: "Iceland uses geothermal energy to heat homes.",
        notes: "From geo (earth) + thermal (heat)",
      },
      {
        term: "geopolitics",
        definition: "Politics influenced by geographical factors",
        pronunciation: "jee-oh-POL-ih-tiks",
        partOfSpeech: "noun",
        example:
          "The country's geopolitics are shaped by its access to the sea.",
        notes: "From geo (earth) + politics (governance)",
      },
    ],
    examples: [
      {
        text: "Geophysics combines physics and earth science.",
        translation: "Địa vật lý kết hợp vật lý học và khoa học trái đất.",
      },
    ],
  },
  {
    prefix: "micro",
    meaning: "small",
    description: "From Greek 'mikros' meaning 'small'",
    origin: "Greek",
    words: [
      {
        term: "microscope",
        definition:
          "An instrument for viewing objects too small to be seen by the naked eye",
        pronunciation: "MY-kruh-skohp",
        partOfSpeech: "noun",
        example: "The scientist examined the cells under a microscope.",
        notes: "From micro (small) + scope (to look)",
      },
      {
        term: "microphone",
        definition:
          "An instrument that converts sound waves into electrical signals",
        pronunciation: "MY-kruh-fohn",
        partOfSpeech: "noun",
        example: "The singer spoke into the microphone.",
        notes: "From micro (small) + phone (sound)",
      },
      {
        term: "microorganism",
        definition:
          "A microscopic organism, especially a bacterium, virus, or fungus",
        pronunciation: "my-kroh-OR-guh-niz-um",
        partOfSpeech: "noun",
        example: "Certain microorganisms cause disease.",
        notes: "From micro (small) + organism (living entity)",
      },
      {
        term: "microchip",
        definition:
          "A tiny wafer of semiconducting material used to make an integrated circuit",
        pronunciation: "MY-kroh-chip",
        partOfSpeech: "noun",
        example: "Modern computers rely on microchips for processing.",
        notes: "From micro (small) + chip (piece)",
      },
    ],
    examples: [
      {
        text: "Microeconomics studies individual markets rather than entire economies.",
        translation:
          "Kinh tế vi mô nghiên cứu các thị trường cá nhân thay vì toàn bộ nền kinh tế.",
      },
    ],
  },
  {
    prefix: "poly",
    meaning: "many",
    description: "From Greek 'polus' meaning 'much' or 'many'",
    origin: "Greek",
    words: [
      {
        term: "polygon",
        definition:
          "A plane figure with at least three straight sides and angles",
        pronunciation: "POL-ee-gon",
        partOfSpeech: "noun",
        example: "A hexagon is a polygon with six sides.",
        notes: "From poly (many) + gon (angle)",
      },
      {
        term: "polyglot",
        definition: "A person who knows and uses several languages",
        pronunciation: "POL-ee-glot",
        partOfSpeech: "noun",
        example:
          "As a polyglot, she works as a translator for the United Nations.",
        notes: "From poly (many) + glot (language)",
      },
      {
        term: "polysyllabic",
        definition: "Having many syllables",
        pronunciation: "pol-ee-sih-LAB-ik",
        partOfSpeech: "adjective",
        example: "Children often struggle with polysyllabic words.",
        notes: "From poly (many) + syllabic (relating to syllables)",
      },
      {
        term: "polymorphic",
        definition: "Occurring in several different forms",
        pronunciation: "pol-ee-MOR-fik",
        partOfSpeech: "adjective",
        example:
          "The software has polymorphic capabilities to adapt to different devices.",
        notes: "From poly (many) + morphic (form)",
      },
    ],
    examples: [
      {
        text: "Polynesia consists of over 1,000 islands scattered over the central and southern Pacific Ocean.",
        translation:
          "Polynesia bao gồm hơn 1.000 hòn đảo rải rác trên khắp Trung và Nam Thái Bình Dương.",
      },
    ],
  },
  {
    prefix: "trans",
    meaning: "across",
    description: "From Latin 'trans' meaning 'across, beyond, or through'",
    origin: "Latin",
    words: [
      {
        term: "transport",
        definition: "Take or carry from one place to another",
        pronunciation: "trans-PORT",
        partOfSpeech: "verb",
        example: "The goods were transported by train.",
        notes: "From trans (across) + port (carry)",
      },
      {
        term: "transform",
        definition: "Make a thorough or dramatic change in form or appearance",
        pronunciation: "trans-FORM",
        partOfSpeech: "verb",
        example: "The renovation transformed the old building completely.",
        notes: "From trans (across) + form (shape)",
      },
      {
        term: "transnational",
        definition: "Extending or operating across national boundaries",
        pronunciation: "trans-NASH-un-ul",
        partOfSpeech: "adjective",
        example: "Many large corporations are transnational entities.",
        notes: "From trans (across) + national (relating to a nation)",
      },
      {
        term: "transparent",
        definition:
          "Allowing light to pass through so that objects behind can be distinctly seen",
        pronunciation: "trans-PAIR-ent",
        partOfSpeech: "adjective",
        example: "The window was made of transparent glass.",
        notes: "From trans (across) + parent (appearing)",
      },
    ],
    examples: [
      {
        text: "The TransSiberian Railway spans almost all of Russia from Moscow to Vladivostok.",
        translation:
          "Đường sắt xuyên Siberia trải dài gần như toàn bộ nước Nga từ Moscow đến Vladivostok.",
      },
    ],
  },
  {
    prefix: "mono",
    meaning: "one",
    description: "From Greek 'monos' meaning 'alone' or 'single'",
    origin: "Greek",
    words: [
      {
        term: "monologue",
        definition: "A long speech by one person during a conversation",
        pronunciation: "MON-uh-log",
        partOfSpeech: "noun",
        example:
          "The actor delivered a powerful monologue at the end of the play.",
        notes: "From mono (one) + logue (speech)",
      },
      {
        term: "monochrome",
        definition:
          "A photograph or picture developed or executed in black and white or in varying tones of only one color",
        pronunciation: "MON-uh-krohm",
        partOfSpeech: "noun",
        example: "The artist specializes in monochrome photography.",
        notes: "From mono (one) + chrome (color)",
      },
      {
        term: "monopoly",
        definition:
          "Complete control of the supply of or trade in a commodity or service",
        pronunciation: "muh-NOP-uh-lee",
        partOfSpeech: "noun",
        example:
          "The company has a monopoly on the local telecommunications market.",
        notes: "From mono (one) + poly (sell)",
      },
      {
        term: "monotonous",
        definition:
          "Dull, tedious, and repetitious; lacking in variety and interest",
        pronunciation: "muh-NOT-uh-nus",
        partOfSpeech: "adjective",
        example: "His monotonous voice put the audience to sleep.",
        notes: "From mono (one) + tonous (tone)",
      },
    ],
    examples: [
      {
        text: "A monoculture can be vulnerable to pests and diseases.",
        translation:
          "Một nền nông nghiệp độc canh có thể dễ bị tổn thương bởi sâu bệnh.",
      },
    ],
  },
  {
    prefix: "sub",
    meaning: "under",
    description: "From Latin 'sub' meaning 'under' or 'below'",
    origin: "Latin",
    words: [
      {
        term: "submarine",
        definition: "A watercraft capable of independent operation underwater",
        pronunciation: "SUB-muh-reen",
        partOfSpeech: "noun",
        example: "The submarine descended to explore the ocean depths.",
        notes: "From sub (under) + marine (sea)",
      },
      {
        term: "submerge",
        definition:
          "To go under or cause to go under the surface of water or another fluid",
        pronunciation: "sub-MERJ",
        partOfSpeech: "verb",
        example: "The boat began to submerge as it took on water.",
        notes: "From sub (under) + merge (to dip)",
      },
      {
        term: "subordinate",
        definition: "Lower in rank or position",
        pronunciation: "suh-BOR-din-it",
        partOfSpeech: "adjective",
        example: "She supervised a team of subordinate employees.",
        notes: "From sub (under) + ordinate (ordered)",
      },
      {
        term: "subconscious",
        definition:
          "The part of the mind that influences actions and feelings but of which you are not fully aware",
        pronunciation: "sub-KON-shus",
        partOfSpeech: "noun",
        example:
          "His fear of heights stems from a subconscious memory of falling as a child.",
        notes: "From sub (under) + conscious (aware)",
      },
    ],
    examples: [
      {
        text: "The subway provides a fast way to travel beneath the congested city streets.",
        translation:
          "Tàu điện ngầm cung cấp một cách nhanh chóng để di chuyển bên dưới các đường phố tắc nghẽn của thành phố.",
      },
    ],
  },
  {
    prefix: "inter",
    meaning: "between",
    description: "From Latin 'inter' meaning 'between' or 'among'",
    origin: "Latin",
    words: [
      {
        term: "international",
        definition: "Existing, occurring, or carried on between nations",
        pronunciation: "in-ter-NASH-uh-nul",
        partOfSpeech: "adjective",
        example: "The Olympic Games is an international sporting event.",
        notes: "From inter (between) + national (relating to nations)",
      },
      {
        term: "interact",
        definition:
          "Act in such a way as to have an effect on another; act reciprocally",
        pronunciation: "in-ter-AKT",
        partOfSpeech: "verb",
        example: "Students and teachers interact in the classroom.",
        notes: "From inter (between) + act (to do)",
      },
      {
        term: "intermediate",
        definition: "Lying between two extremes in degree, amount, or position",
        pronunciation: "in-ter-MEE-dee-it",
        partOfSpeech: "adjective",
        example: "She is at an intermediate level in her Spanish studies.",
        notes: "From inter (between) + mediate (middle)",
      },
      {
        term: "interstellar",
        definition: "Occurring or situated between stars",
        pronunciation: "in-ter-STEL-er",
        partOfSpeech: "adjective",
        example: "The probe was designed to study interstellar space.",
        notes: "From inter (between) + stellar (relating to stars)",
      },
    ],
    examples: [
      {
        text: "The internet connects computers around the world.",
        translation: "Internet kết nối các máy tính trên toàn thế giới.",
      },
    ],
  },
];

// Function to seed the database
async function seed() {
  console.log("Starting seeding...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.progress.deleteMany({});
  await db.word.deleteMany({});
  await db.example.deleteMany({});
  await db.wordRoot.deleteMany({});

  console.log("Seeding word roots and vocabulary...");
  for (const rootData of wordRoots) {
    const { words, examples, ...rootFields } = rootData;

    // Create the word root
    const root = await db.wordRoot.create({
      data: rootFields,
    });

    console.log(`Created root: ${root.prefix}`);

    // Create words for this root
    for (const wordData of words) {
      const word = await db.word.create({
        data: {
          ...wordData,
          rootId: root.id,
        },
      });
      console.log(`Created word: ${word.term}`);
    }

    // Create examples for this root
    for (const exampleData of examples) {
      const example = await db.example.create({
        data: {
          ...exampleData,
          rootId: root.id,
        },
      });
      console.log(`Created example for root: ${root.prefix}`);
    }
  }

  console.log("Seeding completed!");
}

// Call the seed function
seed()
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    // Close the database connection
    await db.$disconnect();
  });
