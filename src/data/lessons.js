// ─── Lesson Content ───────────────────────────────────────────────────────────
export const LESSONS = [

  // ══════════════════════════════════════════════════════
  //  MATHEMATICS
  // ══════════════════════════════════════════════════════
  {
    id: "math-counting-1", subject: "Mathematics", unit: "Number Sense", order: 1, difficulty: "easy",
    emoji: "🔢", title: "Counting to 20", duration: "6 min", xp: 20,
    videoId: "DR-T7kmEt7o",
    gameType: "number-tap", gameCount: 10,
    content: `
## Let's Count! 🔢

Counting is the first step in understanding numbers.

### Counting Forward
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, **20** 🎉

### One-to-One Correspondence
Point to each object as you count it — the last number tells you **how many** there are.

> 💡 **Practice:** Count the fingers on both hands. You should get **10**!
    `,
    questions: [
      { q: "What comes after 15?", options: ["14", "16", "17", "20"], answer: 1 },
      { q: "You count 7 stars ⭐⭐⭐⭐⭐⭐⭐. How many are there?", options: ["6", "8", "7", "5"], answer: 2 },
      { q: "What number is missing? 1, 2, 3, __, 5", options: ["6", "3", "4", "2"], answer: 2 },
    ],
  },
  {
    id: "math-placevalue-1", subject: "Mathematics", unit: "Number Sense", order: 2, difficulty: "easy",
    emoji: "🏛️", title: "Place Value: Tens and Ones", duration: "9 min", xp: 30,
    content: `
## Place Value 🏛️

Every digit in a number has a **place** that tells us its value.

### Tens and Ones
**34** has: **3** in the tens = 30, **4** in the ones = 4

| Number | Tens | Ones |
|--------|------|------|
| 27     | 2    | 7    |
| 53     | 5    | 3    |

### Expanded Form
- **47** = 40 + 7
- **62** = 60 + 2

> 💡 The digit on the **right** is always ones, the digit to its **left** is tens.
    `,
    questions: [
      { q: "In the number 56, what is the value of the digit 5?", options: ["5", "50", "500", "15"], answer: 1 },
      { q: "What is 70 + 3?", options: ["703", "37", "73", "730"], answer: 2 },
      { q: "Which number has 4 tens and 8 ones?", options: ["84", "48", "408", "480"], answer: 1 },
    ],
  },
  {
    id: "math-addition-1", subject: "Mathematics", unit: "Addition & Subtraction", order: 3, difficulty: "easy",
    emoji: "➕", title: "Adding Numbers to 10", duration: "7 min", xp: 25,
    videoId: "AuX7nPBqDts",
    gameType: "word-match",
    gamePairs: [
      { word: "3 + 4", options: ["6", "7", "8", "5"], correct: 1 },
      { word: "5 + 2", options: ["6", "8", "7", "3"], correct: 2 },
      { word: "1 + 9", options: ["8", "11", "10", "9"], correct: 2 },
      { word: "4 + 4", options: ["6", "9", "7", "8"], correct: 3 },
    ],
    content: `
## Addition ➕

**Addition** puts groups together to find the total.

**Example:** 3 + 4 = **7**
🔵🔵🔵 + 🔵🔵🔵🔵 = 🔵🔵🔵🔵🔵🔵🔵

### How to Add
1. Start with the bigger number.
2. Count on from there: **3 + 4** → 4, 5, 6, **7** ✓

> 💡 You can add in any order! 3 + 5 = 5 + 3 = **8**
    `,
    questions: [
      { q: "What is 4 + 3?", options: ["6", "7", "8", "5"], answer: 1 },
      { q: "What is 6 + 2?", options: ["7", "9", "8", "5"], answer: 2 },
      { q: "Sam has 5 toy cars and gets 3 more. How many total?", options: ["7", "9", "8", "6"], answer: 2 },
    ],
  },
  {
    id: "math-subtraction-1", subject: "Mathematics", unit: "Addition & Subtraction", order: 4, difficulty: "easy",
    emoji: "➖", title: "Subtracting Numbers", duration: "8 min", xp: 25,
    content: `
## Subtraction ➖

**Subtraction** means taking away from a group.

**7 − 3 = 4**: start with 7, take away 3.

### Counting Back
- **9 − 4**: start at 9, count back 4 → 8, 7, 6, **5**

### Fact Families
- 3 + 5 = 8 → 8 − 5 = 3 and 8 − 3 = 5

> 💡 Knowing your addition facts means you already know subtraction!
    `,
    questions: [
      { q: "What is 9 − 4?", options: ["4", "6", "5", "3"], answer: 2 },
      { q: "8 birds on a tree. 3 fly away. How many are left?", options: ["11", "4", "5", "6"], answer: 2 },
      { q: "What is 10 − 7?", options: ["2", "3", "4", "17"], answer: 1 },
    ],
  },
  {
    id: "math-fractions-1", subject: "Mathematics", unit: "Fractions", order: 5, difficulty: "medium",
    emoji: "🍕", title: "What is a Fraction?", duration: "8 min", xp: 30,
    videoId: "n0FZhQ_GkKw",
    gameType: "sort",
    sortCategories: [
      { label: "Numerator (top number)", emoji: "⬆️", items: ["3", "1", "2", "5"] },
      { label: "Denominator (bottom number)", emoji: "⬇️", items: ["4", "8", "6", "10"] },
    ],
    content: `
## What is a Fraction? 🍕

A **fraction** represents a part of a whole.

### Parts of a Fraction
- **Numerator** (top) — how many parts you have
- **Denominator** (bottom) — total equal parts

### Examples
- **1/2** = one half, **3/4** = three quarters, **2/5** = two fifths

> 💡 The denominator can **never** be zero!
    `,
    questions: [
      { q: "In the fraction 3/8, what is the numerator?", options: ["8", "3", "11", "5"], answer: 1 },
      { q: "A pizza cut into 6 slices. You eat 2. What fraction?", options: ["2/4", "6/2", "2/6", "1/2"], answer: 2 },
      { q: "Which fraction means 'one half'?", options: ["1/4", "2/3", "1/2", "3/6"], answer: 2 },
    ],
  },
  {
    id: "math-fractions-2", subject: "Mathematics", unit: "Fractions", order: 6, difficulty: "medium",
    emoji: "🧮", title: "Adding Fractions (Same Denominator)", duration: "10 min", xp: 35,
    content: `
## Adding Fractions 🧮

Same denominator? Keep it, add the numerators!

**1/5 + 2/5 = 3/5**

### More Examples
- 2/7 + 3/7 = **5/7**
- 3/10 + 4/10 = **7/10**
- 3/3 = **1 whole** ✅
    `,
    questions: [
      { q: "What is 2/9 + 4/9?", options: ["6/18", "6/9", "8/9", "2/9"], answer: 1 },
      { q: "3/7 + 3/7 = ?", options: ["6/14", "6/7", "3/7", "1"], answer: 1 },
      { q: "5/5 = ?", options: ["5", "0", "1", "1/5"], answer: 2 },
    ],
  },
  {
    id: "math-multiplication-1", subject: "Mathematics", unit: "Multiplication & Division", order: 7, difficulty: "medium",
    emoji: "✖️", title: "Introduction to Multiplication", duration: "9 min", xp: 35,
    content: `
## Multiplication ✖️

Multiplication = **repeated addition**.

**3 × 4** = 4 + 4 + 4 = **12**

### Key Times Tables
| × | 2 | 3 | 5 |
|---|---|---|---|
| **2** | 4 | 6 | 10 |
| **3** | 6 | 9 | 15 |
| **5** | 10 | 15 | 25 |

> 💡 3 × 4 = 4 × 3 = 12 (commutative!)
    `,
    questions: [
      { q: "What is 3 × 5?", options: ["8", "15", "10", "12"], answer: 1 },
      { q: "4 bags, each with 6 apples. How many total?", options: ["10", "20", "24", "18"], answer: 2 },
      { q: "What is 7 × 0?", options: ["7", "1", "0", "70"], answer: 2 },
    ],
  },
  {
    id: "math-division-1", subject: "Mathematics", unit: "Multiplication & Division", order: 8, difficulty: "medium",
    emoji: "➗", title: "Introduction to Division", duration: "9 min", xp: 35,
    content: `
## Division ➗

Division = **sharing equally**.

**12 ÷ 3 = 4** → share 12 into 3 groups → 4 in each.

### Division is Multiplication's Opposite
- 3 × 4 = 12 → 12 ÷ 4 = **3**

### Key Vocabulary
- **Dividend** — the number divided (12)
- **Divisor** — what you divide by (3)
- **Quotient** — the answer (4)

> 💡 Check: 4 × 3 = 12 ✓
    `,
    questions: [
      { q: "What is 20 ÷ 4?", options: ["4", "5", "6", "8"], answer: 1 },
      { q: "18 cookies shared among 3 friends. How many each?", options: ["5", "6", "7", "9"], answer: 1 },
      { q: "In 24 ÷ 6 = 4, what is the quotient?", options: ["24", "6", "4", "30"], answer: 2 },
    ],
  },
  {
    id: "math-geometry-1", subject: "Mathematics", unit: "Geometry", order: 9, difficulty: "easy",
    emoji: "📐", title: "2D Shapes", duration: "8 min", xp: 30,
    content: `
## 2D Shapes 📐

**2D shapes** are flat: length and width, no depth.

| Shape | Sides | Corners |
|-------|-------|---------|
| Triangle | 3 | 3 |
| Square | 4 (equal) | 4 |
| Rectangle | 4 | 4 |
| Circle | 0 | 0 |
| Pentagon | 5 | 5 |
| Hexagon | 6 | 6 |

> 💡 A **polygon** is any closed 2D shape with straight sides.
    `,
    questions: [
      { q: "How many sides does a hexagon have?", options: ["4", "5", "6", "8"], answer: 2 },
      { q: "Which shape has no sides and no corners?", options: ["Triangle", "Square", "Circle", "Pentagon"], answer: 2 },
      { q: "A square is a special type of:", options: ["Triangle", "Rectangle", "Circle", "Pentagon"], answer: 1 },
    ],
  },
  {
    id: "math-algebra-1", subject: "Mathematics", unit: "Algebra Basics", order: 10, difficulty: "hard",
    emoji: "🔣", title: "Introduction to Algebra", duration: "12 min", xp: 50,
    content: `
## Introduction to Algebra 🔣

**Algebra** uses letters to represent unknown numbers.

### Variables
A **variable** is a letter (like *x*) that stands for an unknown value.

**Example:** x + 3 = 7 → x = **4**

### Solving Equations
To find *x*, do the **opposite operation** to both sides:
- x + 5 = 12 → x = 12 − 5 = **7**
- x − 4 = 9  → x = 9 + 4 = **13**
- 3x = 15    → x = 15 ÷ 3 = **5**

### Writing Expressions
- "A number plus 6" → **n + 6**
- "Twice a number" → **2n**
- "A number minus 4" → **n − 4**

> 💡 Both sides of an equation must **always stay equal** — like a balance scale!
    `,
    questions: [
      { q: "If x + 4 = 9, what is x?", options: ["3", "5", "13", "4"], answer: 1 },
      { q: "If 2n = 14, what is n?", options: ["28", "12", "7", "16"], answer: 2 },
      { q: "How would you write 'three times a number' algebraically?", options: ["n + 3", "n − 3", "3n", "n ÷ 3"], answer: 2 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  ENGLISH
  // ══════════════════════════════════════════════════════
  {
    id: "eng-phonics-1", subject: "English", unit: "Phonics & Reading", order: 1, difficulty: "easy",
    emoji: "🔤", title: "Vowels and Consonants", duration: "7 min", xp: 25,
    videoId: "VVb_B2mypXc",
    gameType: "sort",
    sortCategories: [
      { label: "Vowel", emoji: "🔴", items: ["A", "E", "I", "O", "U"] },
      { label: "Consonant", emoji: "🔵", items: ["B", "T", "S", "M", "R", "D"] },
    ],
    content: `
## Vowels and Consonants 🔤

26 letters split into two groups.

### Vowels: A, E, I, O, U (and sometimes Y)
Every word needs at least one vowel.

### CVC Words (Consonant-Vowel-Consonant)
- **c-a-t**, **d-o-g**, **s-u-n**

> 💡 Sound out each letter, then blend them together!
    `,
    questions: [
      { q: "Which is a vowel?", options: ["B", "E", "T", "S"], answer: 1 },
      { q: "How many vowels in 'book'?", options: ["1", "3", "2", "0"], answer: 2 },
      { q: "Which word follows CVC pattern?", options: ["street", "cat", "plate", "through"], answer: 1 },
    ],
  },
  {
    id: "eng-reading-1", subject: "English", unit: "Reading Comprehension", order: 2, difficulty: "easy",
    emoji: "📖", title: "Finding the Main Idea", duration: "10 min", xp: 30,
    content: `
## What is the Main Idea? 📝

The **main idea** is what a text is mostly about.

### How to Find It
1. Read the whole paragraph.
2. Ask: *"What is this mostly about?"*
3. Check the **first and last sentence** — main ideas often appear there.

### Example
> *"Dolphins are very intelligent. They learn tricks, use sounds to communicate, and recognise themselves in mirrors."*

**Main idea:** Dolphins are very intelligent.

> 💡 Supporting sentences give **details** that back up the main idea.
    `,
    questions: [
      { q: "What is the 'main idea' of a paragraph?", options: ["A small detail", "What the text is mostly about", "The last sentence only", "A frequent word"], answer: 1 },
      { q: "In the dolphin example, the main idea is:", options: ["Dolphins recognise themselves", "Dolphins communicate", "Dolphins are very intelligent", "Scientists study dolphins"], answer: 2 },
      { q: "Where do you often find the main idea?", options: ["Only in the middle", "First or last sentence", "In every sentence", "Never written directly"], answer: 1 },
    ],
  },
  {
    id: "eng-vocab-1", subject: "English", unit: "Vocabulary", order: 3, difficulty: "medium",
    emoji: "📚", title: "Context Clues", duration: "10 min", xp: 30,
    content: `
## Context Clues 🔍

Use words *around* an unknown word to figure out its meaning.

**1. Definition clue:** *"The veterinarian, or animal doctor, examined the puppy."*

**2. Example clue:** *"She enjoyed citrus fruits such as oranges, lemons, and limes."*

**3. Contrast clue:** *"Unlike his timid brother, Marcus was very bold."*
→ timid = opposite of bold = shy

> 💡 Circle the unknown word, then read the sentences around it.
    `,
    questions: [
      { q: '"The arid, or very dry, desert." What does \'arid\' mean?', options: ["Very hot", "Very dry", "Very cold", "Very windy"], answer: 1 },
      { q: '"Unlike the noisy cafeteria, the library was tranquil." \'Tranquil\' means:', options: ["Loud", "Crowded", "Peaceful", "Dark"], answer: 2 },
      { q: "What context clue uses 'such as'?", options: ["Definition", "Contrast", "Example", "Synonym"], answer: 2 },
    ],
  },
  {
    id: "eng-writing-1", subject: "English", unit: "Writing", order: 4, difficulty: "easy",
    emoji: "✍️", title: "Writing Complete Sentences", duration: "8 min", xp: 30,
    content: `
## Complete Sentences ✍️

A sentence needs: **Subject** + **Predicate** + punctuation.

- *The dog* (subject) *ran fast.* (predicate)

### Requirements ✅
1. Capital letter to start
2. Subject + predicate
3. Ends with . ! ?

✅ **The cat sat on the mat.**  
❌ ~~ran fast~~ (no subject!)
    `,
    questions: [
      { q: "Which is a complete sentence?", options: ["The big blue", "Ran to school.", "The boy kicked the ball.", "Happy and loud"], answer: 2 },
      { q: "In 'The birds flew south', the subject is:", options: ["flew", "south", "The birds", "birds flew"], answer: 2 },
      { q: "Most sentences end with a:", options: ["Comma", "Full stop", "Apostrophe", "Hyphen"], answer: 1 },
    ],
  },
  {
    id: "eng-grammar-1", subject: "English", unit: "Grammar", order: 5, difficulty: "easy",
    emoji: "📝", title: "Nouns, Verbs and Adjectives", duration: "10 min", xp: 35,
    videoId: "7SLXRB4W3u0",
    gameType: "sort",
    sortCategories: [
      { label: "Noun", emoji: "🟦", items: ["dog", "school", "table", "city"] },
      { label: "Verb", emoji: "🟩", items: ["run", "eat", "jump", "think"] },
      { label: "Adjective", emoji: "🟨", items: ["happy", "big", "red", "soft"] },
    ],
    content: `
## Parts of Speech 📝

**Noun** — a person, place, thing, or idea: *dog, school, happiness*

**Verb** — an action or state: *run, eat, is, think*

**Adjective** — describes a noun: *happy, big, red, soft*

### In a Sentence
> "The **fluffy** (adj) **cat** (noun) **jumped** (verb) over the wall."

> 💡 If "the" before a word makes sense, it's probably a noun!
    `,
    questions: [
      { q: "Which word is a noun?", options: ["quickly", "beautiful", "elephant", "jump"], answer: 2 },
      { q: "In 'The red car sped away', the adjective is:", options: ["car", "sped", "red", "away"], answer: 2 },
      { q: "Which word is a verb?", options: ["table", "green", "climbed", "happy"], answer: 2 },
    ],
  },
  {
    id: "eng-punctuation-1", subject: "English", unit: "Grammar", order: 6, difficulty: "easy",
    emoji: "❓", title: "Punctuation Marks", duration: "8 min", xp: 30,
    content: `
## Punctuation Marks ❓

| Mark | Name | Use |
|------|------|-----|
| . | Full stop | Ends a statement |
| ? | Question mark | Ends a question |
| ! | Exclamation mark | Strong feeling |
| , | Comma | Joins ideas |
| " " | Quotation marks | Exact words |
| ' | Apostrophe | Possession/contraction |

> 💡 Every sentence must end with . ? or !
    `,
    questions: [
      { q: "Which punctuation ends a question?", options: ["Full stop", "Comma", "Question mark", "Exclamation mark"], answer: 2 },
      { q: "Which mark shows someone's exact words?", options: ["Apostrophe", "Quotation marks", "Comma", "Hyphen"], answer: 1 },
      { q: "Where does the apostrophe go in 'the cat's tail'?", options: ["After 'tail'", "After 'cat'", "Before 'cat'", "No apostrophe needed"], answer: 1 },
    ],
  },
  {
    id: "eng-poetry-1", subject: "English", unit: "Poetry & Creative Writing", order: 7, difficulty: "medium",
    emoji: "🎭", title: "Rhyme and Rhythm in Poetry", duration: "9 min", xp: 30,
    content: `
## Poetry 🎭

### Rhyme
Words rhyme when they end with the same sound: **cat/hat**, **moon/soon**

**AABB scheme:** Lines 1&2 rhyme, Lines 3&4 rhyme.

### Simile vs Metaphor
- **Simile:** "The moon is *like* a silver coin" (uses like/as)
- **Metaphor:** "The moon *is* a silver coin" (says it directly)

> 💡 Free verse poetry has no rules — no rhyme required!
    `,
    questions: [
      { q: "Which pair rhymes?", options: ["cat / dog", "sun / moon", "night / light", "red / blue"], answer: 2 },
      { q: "AABB means:", options: ["Every other line rhymes", "Lines 1&2 rhyme, 3&4 rhyme", "All 4 lines rhyme", "No lines rhyme"], answer: 1 },
      { q: "'He ran like the wind' is a:", options: ["Metaphor", "Rhyme", "Simile", "Rhythm"], answer: 2 },
    ],
  },
  {
    id: "eng-persuasion-1", subject: "English", unit: "Writing", order: 8, difficulty: "hard",
    emoji: "🗣️", title: "Persuasive Writing", duration: "14 min", xp: 55,
    content: `
## Persuasive Writing 🗣️

Persuasive writing aims to **change the reader's mind** or **inspire action**.

### PEEL Paragraph Structure
- **P**oint — state your argument
- **E**vidence — facts or statistics
- **E**xplain — why your evidence supports your point
- **L**ink — connect back to the main argument

### Persuasive Techniques
| Technique | Example |
|-----------|---------|
| **Rhetorical question** | "Don't we all deserve clean air?" |
| **Rule of three** | "It is fast, safe, and reliable." |
| **Emotive language** | "Innocent animals are suffering." |
| **Statistics** | "9 out of 10 experts agree…" |
| **Direct address** | "You can make a difference." |

### Formal vs Informal
Persuasive essays are usually **formal**: no slang, full sentences, passive voice where appropriate.

> 💡 Acknowledge the **counter-argument** — then knock it down to appear more credible!
    `,
    questions: [
      { q: "What does the P in PEEL stand for?", options: ["Paragraph", "Point", "Persuade", "Proof"], answer: 1 },
      { q: "Which is an example of a rhetorical question?", options: ["The sky is blue.", "Don't we all want clean air?", "Use three words.", "According to statistics…"], answer: 1 },
      { q: "Why should writers acknowledge a counter-argument?", options: ["To confuse the reader", "To make the essay longer", "To appear credible and thorough", "Because it is required by the rules"], answer: 2 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SCIENCE
  // ══════════════════════════════════════════════════════
  {
    id: "sci-living-1", subject: "Science", unit: "Living Things", order: 1, difficulty: "easy",
    emoji: "🌱", title: "Living vs Non-Living Things", duration: "8 min", xp: 25,
    videoId: "nAIqkMfGIy8",
    gameType: "sort",
    sortCategories: [
      { label: "Living", emoji: "🌿", items: ["Dog", "Tree", "Mushroom", "Human", "Fish"] },
      { label: "Non-Living", emoji: "🪨", items: ["Rock", "Chair", "Cloud", "Car"] },
    ],
    content: `
## Living and Non-Living Things 🌱

### MRS GREN — 7 Life Processes
**M**ovement · **R**espiration · **S**ensitivity · **G**rowth · **R**eproduction · **E**xcretion · **N**utrition

Examples: 🐕 dogs, 🌳 trees, 🐟 fish, 🧑 humans

### Non-Living
Rocks, chairs, sunlight — do not carry out MRS GREN.

### Formerly Living
Wood, leather, paper — came from living things, no longer alive.

> 💡 Fire grows and needs oxygen, but it can't reproduce — not alive!
    `,
    questions: [
      { q: "Which is a living thing?", options: ["A rock", "A cloud", "A mushroom", "A car"], answer: 2 },
      { q: "Which is NOT a life process?", options: ["Growth", "Reproduction", "Always being visible", "Nutrition"], answer: 2 },
      { q: "A wooden chair is:", options: ["Living", "Non-living", "Formerly living", "Almost living"], answer: 2 },
    ],
  },
  {
    id: "sci-plants-1", subject: "Science", unit: "Living Things", order: 2, difficulty: "medium",
    emoji: "🌿", title: "Plants and Photosynthesis", duration: "10 min", xp: 35,
    content: `
## Photosynthesis 🌿

**CO₂ + H₂O + Sunlight → Glucose + Oxygen**

Happens inside **chloroplasts** using green **chlorophyll**.

### Plant Parts
| Part | Job |
|------|-----|
| Roots | Absorb water + minerals |
| Stem | Carries water upward |
| Leaves | Make food via photosynthesis |
| Flowers | Reproduction |

> 💡 Plants release **oxygen** — the air we breathe!
    `,
    questions: [
      { q: "What do plants need for photosynthesis?", options: ["Soil, water, sunlight", "CO₂, water, sunlight", "O₂, water, soil", "Glucose, soil, sunlight"], answer: 1 },
      { q: "Which part absorbs water from soil?", options: ["Leaves", "Stem", "Roots", "Flowers"], answer: 2 },
      { q: "What gas do plants release?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], answer: 2 },
    ],
  },
  {
    id: "sci-foodchains-1", subject: "Science", unit: "Ecosystems", order: 3, difficulty: "medium",
    emoji: "🦁", title: "Food Chains", duration: "9 min", xp: 30,
    content: `
## Food Chains 🦁

**Grass → Rabbit → Fox** (arrow = "is eaten by")

### Key Terms
- **Producer** — plants (start of every chain)
- **Primary consumer** — eats producers
- **Secondary consumer** — eats primary consumers
- **Predator / Prey**

### Food Webs
Many interconnected food chains = **food web**.

> 💡 If a producer dies out, every consumer above it is affected!
    `,
    questions: [
      { q: "What does a producer do?", options: ["Eat other animals", "Make its own food", "Hunt prey", "Decompose matter"], answer: 1 },
      { q: "In Grass → Rabbit → Fox, the rabbit is:", options: ["Producer", "Primary consumer", "Secondary consumer", "Predator"], answer: 1 },
      { q: "The arrow in a food chain means:", options: ["Is larger than", "Lives near", "Is eaten by / provides energy for", "Is afraid of"], answer: 2 },
    ],
  },
  {
    id: "sci-solar-1", subject: "Science", unit: "Space & Earth", order: 4, difficulty: "easy",
    emoji: "🌍", title: "The Solar System", duration: "12 min", xp: 35,
    videoId: "libKVRa01L8",
    gameType: "word-match",
    gamePairs: [
      { word: "Red Planet 🔴", options: ["Venus", "Mars", "Mercury", "Jupiter"], correct: 1 },
      { word: "Largest planet 🪐", options: ["Saturn", "Uranus", "Jupiter", "Neptune"], correct: 2 },
      { word: "Planet with rings", options: ["Mars", "Neptune", "Uranus", "Saturn"], correct: 3 },
      { word: "Closest to Sun ☀️", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
    ],
    content: `
## Our Solar System 🌍☀️

**8 Planets in order:** Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune

> 💡 **"My Very Excellent Mother Just Served Us Nachos"**

### Inner (rocky) vs Outer (gas giants)
- Inner: Mercury, Venus, Earth, Mars
- Outer: Jupiter, Saturn, Uranus, Neptune
    `,
    questions: [
      { q: "Which is the 'Red Planet'?", options: ["Venus", "Jupiter", "Mars", "Mercury"], answer: 2 },
      { q: "What is at the centre of our solar system?", options: ["Earth", "The Moon", "The Sun", "Jupiter"], answer: 2 },
      { q: "Which planet has famous rings?", options: ["Uranus", "Neptune", "Jupiter", "Saturn"], answer: 3 },
    ],
  },
  {
    id: "sci-human-body-1", subject: "Science", unit: "Human Body", order: 5, difficulty: "medium",
    emoji: "🫀", title: "The Human Body Systems", duration: "11 min", xp: 35,
    content: `
## Human Body Systems 🫀

| System | Key Organs | Function |
|--------|-----------|----------|
| Circulatory | Heart, blood vessels | Pumps blood + oxygen |
| Respiratory | Lungs | Takes in O₂, releases CO₂ |
| Skeletal | 206 bones | Support, protection |
| Muscular | Muscles | Movement |
| Nervous | Brain, nerves | Control centre |

> 💡 Your heart beats ~100,000 times every day!
    `,
    questions: [
      { q: "What does the circulatory system do?", options: ["Digest food", "Pump blood around the body", "Control breathing", "Support body structure"], answer: 1 },
      { q: "How many bones in the adult body?", options: ["150", "206", "300", "52"], answer: 1 },
      { q: "The control centre of the nervous system is:", options: ["Heart", "Lungs", "Brain", "Stomach"], answer: 2 },
    ],
  },
  {
    id: "sci-weather-1", subject: "Science", unit: "Weather & Earth", order: 6, difficulty: "easy",
    emoji: "⛅", title: "Weather and Climate", duration: "8 min", xp: 25,
    content: `
## Weather and Climate ⛅

- **Weather** = what's happening today
- **Climate** = typical weather over many years

### Instruments
| Instrument | Measures |
|-----------|----------|
| Thermometer | Temperature |
| Anemometer | Wind speed |
| Rain gauge | Rainfall |
| Barometer | Air pressure |

> 💡 **Meteorologists** forecast the weather!
    `,
    questions: [
      { q: "What measures temperature?", options: ["Anemometer", "Rain gauge", "Thermometer", "Barometer"], answer: 2 },
      { q: "Climate vs weather:", options: ["They are the same", "Weather is short-term, climate is long-term", "Climate is measured daily", "Weather is long-term"], answer: 1 },
      { q: "What does an anemometer measure?", options: ["Temperature", "Rainfall", "Wind speed", "Air pressure"], answer: 2 },
    ],
  },
  {
    id: "sci-evolution-1", subject: "Science", unit: "Ecosystems", order: 7, difficulty: "hard",
    emoji: "🦕", title: "Evolution and Natural Selection", duration: "14 min", xp: 55,
    content: `
## Evolution and Natural Selection 🦕

**Evolution** is the gradual change in species over many generations.

### Charles Darwin
Darwin observed that organisms with **advantageous traits** survive and reproduce more — this is **natural selection** ("survival of the fittest").

### How It Works
1. **Variation** — individuals differ in traits
2. **Selection pressure** — environment favours certain traits
3. **Survival** — those with helpful traits live longer + reproduce
4. **Inheritance** — offspring inherit the advantageous traits
5. **Over time** → the species gradually changes

### Classic Example: Peppered Moths 🦋
- Before industrial revolution: pale moths camouflaged against light trees → survived
- After soot darkened trees: dark moths were better camouflaged → pale moths got eaten
- Dark moths became **dominant** — natural selection in action!

### Evidence for Evolution
- **Fossil record** — shows how species changed over time
- **Comparative anatomy** — similar bone structures in different species (e.g. human arm, whale flipper, bat wing)
- **DNA evidence** — closely related species share more DNA

> 💡 Evolution happens over **thousands to millions of years** — not within a single lifetime!
    `,
    questions: [
      { q: "What is natural selection?", options: ["Organisms choosing their own traits", "Traits that help survival are passed on more", "Random changes in DNA", "Humans choosing which animals to breed"], answer: 1 },
      { q: "Which provides fossil evidence for evolution?", options: ["The fossil record", "DNA testing only", "Comparative behaviour", "Selective breeding"], answer: 0 },
      { q: "In the peppered moth example, why did dark moths become dominant?", options: ["They were stronger", "They were faster", "They were better camouflaged on soot-covered trees", "Pale moths migrated away"], answer: 2 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SOCIAL STUDIES
  // ══════════════════════════════════════════════════════
  {
    id: "ss-maps-1", subject: "Social Studies", unit: "Geography", order: 1, difficulty: "easy",
    emoji: "🗺️", title: "Reading Maps", duration: "9 min", xp: 30,
    content: `
## Reading Maps 🗺️

### Parts of a Map
- 🧭 **Compass Rose** — N, S, E, W
- 📏 **Scale** — map distance vs real distance
- 🔑 **Legend** — explains symbols
- 🏷️ **Title** — what place is shown

### Types: Political · Physical · Climate

> 💡 A **globe** is a 3D model of Earth!
    `,
    questions: [
      { q: "What does a map legend show?", options: ["Date made", "Symbols and colours", "Distance between cities", "Author"], answer: 1 },
      { q: "On most maps, 'up' is:", options: ["South", "East", "West", "North"], answer: 3 },
      { q: "Which map shows country borders?", options: ["Physical", "Climate", "Political", "Weather"], answer: 2 },
    ],
  },
  {
    id: "ss-community-1", subject: "Social Studies", unit: "Community & Society", order: 2, difficulty: "easy",
    emoji: "🏘️", title: "Our Community", duration: "8 min", xp: 25,
    content: `
## Our Community 🏘️

Types: 🌆 **Urban** · 🏘️ **Suburban** · 🌾 **Rural**

### Community Helpers
Police, Firefighters, Doctors, Teachers, Paramedics

### Rights vs Responsibilities
- **Rights** — things you are entitled to
- **Responsibilities** — things you are expected to do

> 💡 Everyone has a role in making their community better!
    `,
    questions: [
      { q: "Which community type is in the countryside?", options: ["Urban", "Suburban", "Rural", "Coastal"], answer: 2 },
      { q: "Who puts out fires?", options: ["Police officer", "Teacher", "Firefighter", "Doctor"], answer: 2 },
      { q: "Rights vs responsibilities:", options: ["Same thing", "Rights are earned; responsibilities given", "Rights are entitlements; responsibilities are duties", "Rights are rules"], answer: 2 },
    ],
  },
  {
    id: "ss-ancient-1", subject: "Social Studies", unit: "History", order: 3, difficulty: "medium",
    emoji: "🏛️", title: "Ancient Civilisations", duration: "12 min", xp: 40,
    content: `
## Ancient Civilisations 🏛️

**Egypt** 🇪🇬 — River Nile, Pyramids, Pharaohs, Hieroglyphics

**Greece** 🏛️ — Democracy, Olympics, Socrates/Plato/Aristotle

**Rome** 🐺 — Empire, roads, aqueducts, Latin

**China** 🐉 — Paper, printing, gunpowder, Great Wall

> 💡 "Civilisation" comes from Latin *civitas* — "city"
    `,
    questions: [
      { q: "Which river was central to Ancient Egypt?", options: ["Amazon", "Thames", "Nile", "Ganges"], answer: 2 },
      { q: "Which civilisation invented democracy?", options: ["Rome", "Egypt", "China", "Greece"], answer: 3 },
      { q: "Ancient China invented:", options: ["The wheel", "Democracy", "Paper and printing", "The alphabet"], answer: 2 },
    ],
  },
  {
    id: "ss-economics-1", subject: "Social Studies", unit: "Economics", order: 4, difficulty: "medium",
    emoji: "💰", title: "Needs, Wants and Resources", duration: "9 min", xp: 30,
    content: `
## Needs, Wants and Resources 💰

**Needs** — food, water, shelter, clothing, healthcare  
**Wants** — video games, holidays, sweets

### Scarcity
Not enough of something for everyone → we make **choices**.

### Trade and Barter
- **Barter** — swap goods without money
- **Trade** — exchange using money

> 💡 **Economics** = how people make choices about scarce resources!
    `,
    questions: [
      { q: "Which is a NEED?", options: ["A toy", "Clean water", "A holiday", "A new phone"], answer: 1 },
      { q: "Scarcity means:", options: ["Too much of something", "Not enough for all who want it", "Trading without money", "A type of resource"], answer: 1 },
      { q: "Barter is:", options: ["Using money", "Swapping goods without money", "Factory production", "Saving in a bank"], answer: 1 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  HISTORY
  // ══════════════════════════════════════════════════════
  {
    id: "hist-egypt-1", subject: "History", unit: "Ancient World", order: 1, difficulty: "easy",
    emoji: "🏺", title: "Ancient Egypt", duration: "10 min", xp: 30,
    content: `
## Ancient Egypt 🏺

Ancient Egypt was one of the world's earliest great civilisations, lasting over **3,000 years**.

### The Nile River
The **Nile** was Egypt's lifeline — it flooded annually, leaving **fertile soil** for farming.

### Key Features
- **Pharaohs** — god-like rulers (e.g. Tutankhamun, Cleopatra, Ramesses II)
- **Pyramids** — massive tombs built for pharaohs; the Great Pyramid at Giza is one of the Seven Wonders of the Ancient World
- **Hieroglyphics** — ancient Egyptian writing using pictures/symbols
- **Mummification** — preserving bodies for the afterlife

### Society
Egyptian society was structured like a pyramid:
1. Pharaoh (top)
2. Priests & nobles
3. Scribes & craftsmen
4. Farmers
5. Slaves (bottom)

> 💡 The **Rosetta Stone** (discovered 1799) helped modern historians decode hieroglyphics!
    `,
    questions: [
      { q: "Why was the Nile River so important to Egypt?", options: ["It provided fish only", "It flooded and left fertile soil for farming", "It separated Egypt from enemies", "It was used for trade with Greece"], answer: 1 },
      { q: "What was the purpose of the Pyramids?", options: ["Temples for worship", "Grain storage", "Tombs for pharaohs", "Palaces for nobles"], answer: 2 },
      { q: "What is mummification?", options: ["A form of writing", "Preserving bodies for the afterlife", "Building techniques", "Religious prayer"], answer: 1 },
    ],
  },
  {
    id: "hist-greece-1", subject: "History", unit: "Ancient World", order: 2, difficulty: "medium",
    emoji: "🏛️", title: "Ancient Greece and Democracy", duration: "11 min", xp: 40,
    content: `
## Ancient Greece 🏛️

Ancient Greece (c. 800–146 BC) gave us ideas that still shape our world today.

### City-States (Poleis)
Greece was not one united country — it was made up of independent **city-states**:
- **Athens** — known for democracy, arts, and philosophy
- **Sparta** — famous for its powerful warrior culture
- **Corinth**, **Thebes**, **Olympia**, and many more

### Democracy
Athens invented **demokratia** ("rule by the people") around 508 BC.
- Male citizens voted directly on laws
- A council of 500 managed day-to-day government
- ⚠️ Women, slaves, and foreigners could NOT vote

### Great Thinkers
| Philosopher | Key Ideas |
|-------------|-----------|
| **Socrates** | Question everything (Socratic method) |
| **Plato** | Ideal forms; founded the Academy |
| **Aristotle** | Logic, science, ethics; taught Alexander the Great |

### The Olympic Games 🏅
Started in **776 BC** in Olympia to honour Zeus. Athletes competed from all city-states.

> 💡 The word **"politics"** comes from Greek *polis* (city-state)!
    `,
    questions: [
      { q: "What does 'demokratia' mean?", options: ["Rule by kings", "Rule by the people", "Rule by priests", "Rule by soldiers"], answer: 1 },
      { q: "Which city-state was famous for its warrior culture?", options: ["Athens", "Corinth", "Sparta", "Olympia"], answer: 2 },
      { q: "Who was Aristotle's most famous student?", options: ["Socrates", "Plato", "Alexander the Great", "Julius Caesar"], answer: 2 },
    ],
  },
  {
    id: "hist-industrial-1", subject: "History", unit: "Modern History", order: 3, difficulty: "medium",
    emoji: "⚙️", title: "The Industrial Revolution", duration: "12 min", xp: 45,
    content: `
## The Industrial Revolution ⚙️

The Industrial Revolution (c. 1760–1840) transformed Britain — and later the world — from farming-based societies to industrial ones.

### Where and When
- Began in **Britain** around 1760
- Spread to Europe, USA, and beyond by the mid-1800s

### Key Inventions
| Invention | Inventor | Impact |
|-----------|----------|--------|
| **Steam engine** (improved) | James Watt | Powered factories and trains |
| **Spinning jenny** | James Hargreaves | Faster textile production |
| **Steam locomotive** | George Stephenson | Railway transport revolution |
| **Telegraph** | Samuel Morse | Long-distance communication |

### Changes to Society
- People moved from **countryside to cities** (urbanisation)
- Factories replaced cottage industries
- **Child labour** was common — children worked in mines and factories
- Eventually led to **trade unions** and workers' rights movements

### Impact on Environment
Coal-powered factories caused **air pollution** — cities like London were covered in smog.

> 💡 Britain had advantages: coal deposits, rivers for power, a strong navy for trade, and a stable government.
    `,
    questions: [
      { q: "Where did the Industrial Revolution begin?", options: ["France", "USA", "Britain", "Germany"], answer: 2 },
      { q: "Who improved the steam engine?", options: ["George Stephenson", "James Hargreaves", "Samuel Morse", "James Watt"], answer: 3 },
      { q: "What is urbanisation?", options: ["Building more farms", "People moving from countryside to cities", "Improving trade routes", "Inventing new machines"], answer: 1 },
    ],
  },
  {
    id: "hist-ww1-1", subject: "History", unit: "Modern History", order: 4, difficulty: "hard",
    emoji: "🕊️", title: "World War I", duration: "14 min", xp: 55,
    content: `
## World War I (1914–1918) 🕊️

World War I was one of the deadliest conflicts in human history, involving nations from around the globe.

### Causes (MAIN)
- **M**ilitarism — countries built up huge armies and navies
- **A**lliances — Europe split into two rival groups:
  - Triple Entente: France, Russia, Britain
  - Triple Alliance: Germany, Austria-Hungary, Italy
- **I**mperialism — competition for colonies
- **N**ationalism — pride in one's nation; tensions in the Balkans

### The Spark: Assassination of Franz Ferdinand
28 June 1914: Archduke Franz Ferdinand (heir to Austria-Hungary) was assassinated in Sarajevo by Gavrilo Princip. This triggered the alliance system — and within weeks, most of Europe was at war.

### Trench Warfare
Both sides dug **trenches** stretching hundreds of miles. Life in the trenches was horrific:
- Mud, rats, disease
- "Going over the top" — soldiers charging enemy lines
- Little ground was gained for enormous casualties

### Key Events
- **1914** — War begins; Germany invades Belgium
- **1916** — Battle of the Somme (60,000 British casualties on Day 1)
- **1917** — USA enters the war
- **1918** — Armistice signed 11 November at 11am

### Aftermath
- 17 million dead
- **Treaty of Versailles** (1919) — Germany blamed, fined heavily, lost territory
- ⚠️ The harsh terms contributed to conditions for World War II

> 💡 WWI was called "The Great War" until WWII began — nobody imagined there could be a second one.
    `,
    questions: [
      { q: "What does the 'A' in MAIN stand for?", options: ["Armistice", "Alliances", "Artillery", "Austria"], answer: 1 },
      { q: "What event triggered the start of WWI?", options: ["Germany invaded France", "Assassination of Franz Ferdinand", "Russia mobilised its army", "Britain declared war"], answer: 1 },
      { q: "When was the WWI Armistice signed?", options: ["1916", "1917", "1918", "1919"], answer: 2 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SOCIAL EMOTIONAL LEARNING
  // ══════════════════════════════════════════════════════
  {
    id: "sel-emotions-1", subject: "Social Emotional Learning", unit: "Self-Awareness", order: 1, difficulty: "easy",
    emoji: "😊", title: "Understanding Your Emotions", duration: "8 min", xp: 25,
    videoId: "G0FqCGO2PnI",
    gameType: "memory",
    memoryPairs: [
      ["😊 Joy", "Happy & content"],
      ["😢 Sadness", "Feeling down"],
      ["😡 Anger", "Frustrated"],
      ["😨 Fear", "Scared or anxious"],
    ],
    content: `
## Understanding Your Emotions 😊

**Emotions** are feelings that everyone experiences. Learning to **name** them is the first step to managing them.

### Core Emotions (Plutchik's Wheel)
- 😊 **Joy** — feeling happy, content, or excited
- 😢 **Sadness** — feeling down, disappointed, or lonely
- 😡 **Anger** — feeling frustrated, annoyed, or furious
- 😨 **Fear** — feeling scared, anxious, or worried
- 🤢 **Disgust** — finding something unpleasant or wrong
- 😲 **Surprise** — feeling shocked or caught off-guard

### Why Name Your Emotions?
Research shows that when you can **name** a feeling ("I feel anxious"), your brain's stress response calms down. This is called **"name it to tame it."**

### Emotion Check-In
Ask yourself:
1. *What am I feeling right now?*
2. *Where do I feel it in my body?* (tight chest? stomach ache?)
3. *What triggered this feeling?*
4. *What do I need right now?*

> 💡 All emotions are **valid** — even uncomfortable ones exist to give us useful information!
    `,
    questions: [
      { q: "What does 'name it to tame it' mean?", options: ["Naming pets helps you relax", "Naming a feeling helps calm your brain's stress response", "Feelings have names like people do", "You should name your worries"], answer: 1 },
      { q: "Which of these is a core emotion?", options: ["Hunger", "Tiredness", "Joy", "Boredom"], answer: 2 },
      { q: "Why is it useful to notice where you feel emotions in your body?", options: ["It is not useful", "It helps you become more aware of your emotional state", "It tells your teacher how you feel", "It makes emotions go away faster"], answer: 1 },
    ],
  },
  {
    id: "sel-empathy-1", subject: "Social Emotional Learning", unit: "Social Awareness", order: 2, difficulty: "easy",
    emoji: "🤝", title: "Empathy and Kindness", duration: "9 min", xp: 30,
    content: `
## Empathy and Kindness 🤝

**Empathy** is the ability to understand and share the feelings of another person.

### Types of Empathy
- **Cognitive empathy** — understanding *what* someone is thinking or feeling ("I can see why you'd feel that way")
- **Emotional empathy** — actually *feeling* what another person feels
- **Compassionate empathy** — understanding + feeling + *taking action* to help

### Empathy vs Sympathy
- **Sympathy:** "I'm sorry that happened to you." (feeling *for* someone)
- **Empathy:** "I understand how painful that must be." (feeling *with* someone)

### How to Show Empathy
1. **Listen actively** — don't plan your reply while they're talking
2. **Validate feelings** — "That sounds really difficult"
3. **Ask open questions** — "How are you feeling about that?"
4. **Don't minimise** — avoid saying "At least…" or "It could be worse"

### Acts of Kindness
Random acts of kindness boost **both** the giver's and receiver's wellbeing. Even small gestures matter: holding a door, sharing a snack, giving a compliment.

> 💡 Studies show that doing **3 kind acts per week** significantly increases happiness!
    `,
    questions: [
      { q: "What is empathy?", options: ["Feeling sorry for someone", "Understanding and sharing another's feelings", "Being nice to strangers", "Agreeing with everyone"], answer: 1 },
      { q: "Which is an example of NOT showing empathy?", options: ["Active listening", "Saying 'At least it could be worse'", "Validating someone's feelings", "Asking open questions"], answer: 1 },
      { q: "What is compassionate empathy?", options: ["Feeling what others feel only", "Understanding feelings only", "Understanding, feeling, AND taking action to help", "Feeling sympathy"], answer: 2 },
    ],
  },
  {
    id: "sel-selfregulation-1", subject: "Social Emotional Learning", unit: "Self-Management", order: 3, difficulty: "medium",
    emoji: "🧘", title: "Managing Big Emotions", duration: "10 min", xp: 35,
    content: `
## Managing Big Emotions 🧘

**Self-regulation** is the ability to manage your emotions, thoughts, and behaviour — especially in difficult situations.

### The Emotional Thermometer
Imagine your emotions as a thermometer from 0–10:
- **0–3:** Calm, content, focused
- **4–6:** Mild stress — you can still think clearly
- **7–10:** Flooded — hard to think rationally ("amygdala hijack")

When you're at 7–10, your brain's **fight-or-flight** response takes over. You need to bring your temperature **down** before solving problems.

### Cool-Down Strategies
**🫁 Deep breathing:** Breathe in for 4 counts, hold for 4, out for 4 (box breathing)

**🧠 5-4-3-2-1 Grounding:** Name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, 1 you can taste

**💪 Physical release:** Walk, do jumping jacks, squeeze a stress ball

**🗣️ Talk it out:** Tell a trusted adult or friend how you feel

### Anger ≠ Bad
Anger is a **normal, useful emotion** — it tells you something feels unfair or wrong. The goal isn't to remove anger, but to **choose how you respond** to it.

> 💡 Viktor Frankl: *"Between stimulus and response, there is a space. In that space lies our freedom to choose."*
    `,
    questions: [
      { q: "What is self-regulation?", options: ["Setting your own rules", "Managing your emotions, thoughts, and behaviour", "Only controlling anger", "Ignoring feelings"], answer: 1 },
      { q: "What is 'box breathing'?", options: ["Breathing into a box", "Breathe in 4, hold 4, out 4", "Taking 10 quick breaths", "Holding your breath for 30 seconds"], answer: 1 },
      { q: "What does the 'amygdala hijack' mean?", options: ["A type of deep breathing", "When fight-or-flight takes over rational thinking", "When you feel very calm", "A grounding technique"], answer: 1 },
    ],
  },
  {
    id: "sel-growthmindset-1", subject: "Social Emotional Learning", unit: "Self-Management", order: 4, difficulty: "medium",
    emoji: "🌱", title: "Growth Mindset", duration: "11 min", xp: 40,
    videoId: "ElVUqv0v1EE",
    gameType: "sort",
    sortCategories: [
      { label: "Fixed Mindset 🚫", emoji: "🚫", items: ["I'm just not smart", "I give up easily", "Effort is pointless"] },
      { label: "Growth Mindset ✅", emoji: "✅", items: ["I can't do this YET", "I embrace challenges", "Effort leads to mastery"] },
    ],
    content: `
## Growth Mindset 🌱

Psychologist **Carol Dweck** identified two core ways people think about their abilities:

### Fixed vs Growth Mindset

| Fixed Mindset | Growth Mindset |
|---------------|----------------|
| "I'm just not smart" | "I can learn anything with effort" |
| Avoids challenges | Embraces challenges |
| Gives up easily | Persists through difficulties |
| Views effort as pointless | Views effort as the path to mastery |
| Ignores feedback | Learns from criticism |

### The Power of "Yet"
Replace "I can't do this" → **"I can't do this *yet*."**

That one word transforms a fixed statement into a growth opportunity.

### Neuroplasticity
Your brain is **not fixed** — it literally grows new connections when you learn and practise. This is called **neuroplasticity**.
- Every time you struggle and persist, you are physically strengthening your brain.

### Praise the Process, Not the Person
- ❌ "You're so smart!"
- ✅ "You worked really hard on that — great effort!"

Praising effort encourages growth mindset. Praising intelligence can make people afraid to fail.

> 💡 Michael Jordan was cut from his high school basketball team. He used that as fuel. Growth mindset in action!
    `,
    questions: [
      { q: "Who developed the concept of Growth Mindset?", options: ["Albert Einstein", "Carol Dweck", "Viktor Frankl", "Brené Brown"], answer: 1 },
      { q: "What does neuroplasticity mean?", options: ["A fixed IQ score", "The brain's ability to grow new connections through learning", "A type of memory loss", "Being naturally talented"], answer: 1 },
      { q: "Which phrase reflects a growth mindset?", options: ["I'll never be good at maths", "I'm just not creative", "I can't do this yet", "Some people are born smart"], answer: 2 },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  UPPER GRADES (6–12) — CUSTOM CURRICULUM
  // ══════════════════════════════════════════════════════
  {
    id: "math-linear-equations", subject: "Mathematics", unit: "Algebra", order: 11, difficulty: "medium",
    emoji: "📐", title: "Linear Equations", duration: "12 min", xp: 45,
    content: `
## Linear Equations 📐

A **linear equation** has variables with a power of 1, and graphs as a straight line.

### Solving Equations
Do the **same operation to both sides** to keep it balanced.

**Example:** 2x + 3 = 11
1. Subtract 3 from both sides → 2x = 8
2. Divide both sides by 2 → **x = 4**

### The Gradient–Intercept Form
**y = mx + c**
- **m** = gradient (slope)
- **c** = y-intercept (where the line crosses the y-axis)

> 💡 A balance scale is the perfect way to picture an equation — whatever you do to one side, do to the other!
    `,
    questions: [
      { q: "Solve: 2x + 3 = 11. What is x?", options: ["3", "4", "5", "8"], answer: 1 },
      { q: "In y = 3x + 2, what is the gradient?", options: ["2", "3", "5", "6"], answer: 1 },
      { q: "Solve: 3(x − 2) = 9. What is x?", options: ["3", "5", "6", "9"], answer: 1 },
    ],
  },
  {
    id: "math-pythagoras", subject: "Mathematics", unit: "Geometry", order: 12, difficulty: "medium",
    emoji: "📏", title: "Pythagorean Theorem", duration: "11 min", xp: 45,
    content: `
## Pythagorean Theorem 📏

For a **right-angled triangle**: **a² + b² = c²**

Where **c** is the hypotenuse (longest side, opposite the right angle).

### Example
A triangle with sides 3 and 4:
3² + 4² = 9 + 16 = 25 → c = √25 = **5**

> 💡 Only works on triangles with a right angle (90°)!
    `,
    questions: [
      { q: "A right triangle has sides 3 and 4. What is the hypotenuse?", options: ["5", "6", "7", "12"], answer: 0 },
      { q: "Which side is the hypotenuse?", options: ["The shortest side", "Opposite the right angle", "Next to the right angle", "Any side"], answer: 1 },
      { q: "A right triangle has sides 6 and 8. What is the hypotenuse?", options: ["10", "12", "14", "48"], answer: 0 },
    ],
  },
  {
    id: "eng-essay-structure", subject: "English", unit: "Writing", order: 9, difficulty: "medium",
    emoji: "📝", title: "Essay Structure: PEEL", duration: "13 min", xp: 50,
    content: `
## Structuring an Essay 📝

A strong paragraph uses **PEEL**:
- **P**oint — your main argument
- **E**vidence — a quote, fact, or statistic
- **E**xplanation — how the evidence proves your point
- **L**ink — connect to the next idea or the question

### Full Essay Shape
1. **Introduction** — hook + thesis statement
2. **Body paragraphs** (3+) — each one PEEL
3. **Conclusion** — restate thesis, sum up, final thought

> 💡 A thesis statement is your main argument in one sentence — it belongs at the end of the introduction.
    `,
    questions: [
      { q: "What does the P in PEEL stand for?", options: ["Paragraph", "Point", "Proof", "Plan"], answer: 1 },
      { q: "Where should a thesis statement appear?", options: ["The conclusion", "The introduction", "A footnote", "The title"], answer: 1 },
      { q: "Which is part of PEEL?", options: ["Guess", "Evidence", "Rhyme", "Heading"], answer: 1 },
    ],
  },
  {
    id: "sci-cells", subject: "Science", unit: "Biology", order: 8, difficulty: "medium",
    emoji: "🔬", title: "Cells: The Building Blocks of Life", duration: "11 min", xp: 40,
    content: `
## Cells 🔬

All living things are made of **cells** — the basic unit of life.

### Key Parts
| Part | Job |
|------|-----|
| **Nucleus** | Controls the cell; stores DNA |
| **Mitochondria** | Releases energy (the "powerhouse") |
| **Cell membrane** | Controls what enters/leaves |
| **Cytoplasm** | Jelly where reactions happen |

### Plant vs Animal Cells
Plant cells also have a **cell wall** (for support) and **chloroplasts** (for photosynthesis).

> 💡 The mitochondria is the "powerhouse" of the cell because it turns food into usable energy.
    `,
    questions: [
      { q: "Which part controls the cell and stores DNA?", options: ["Nucleus", "Membrane", "Cytoplasm", "Ribosome"], answer: 0 },
      { q: "The 'powerhouse' of the cell is the…", options: ["Nucleus", "Mitochondria", "Membrane", "Vacuole"], answer: 1 },
      { q: "Plant cells have which extra structure animal cells lack?", options: ["Nucleus", "Chloroplasts", "Membrane", "Cytoplasm"], answer: 1 },
    ],
  },
  {
    id: "sci-newtons-laws", subject: "Science", unit: "Physics", order: 9, difficulty: "hard",
    emoji: "🍎", title: "Newton's Three Laws of Motion", duration: "15 min", xp: 60,
    content: `
## Newton's Laws of Motion 🍎

### 1st Law (Inertia)
An object stays still, or moves at a steady speed, **unless a force acts on it**.

### 2nd Law
**Force = mass × acceleration** (F = ma)
A bigger force, or a smaller mass, means more acceleration.

### 3rd Law
**Every action has an equal and opposite reaction.**
When you push the ground, the ground pushes you back — that's how you walk!

> 💡 A rocket pushes gas downward, so the gas pushes the rocket upward. Newton's 3rd law in action!
    `,
    questions: [
      { q: "Newton's 2nd law is written as…", options: ["F = mv", "F = ma", "F = mgh", "F = ½mv²"], answer: 1 },
      { q: "An object at rest stays at rest unless acted on by a force. This is the…", options: ["1st law", "2nd law", "3rd law", "4th law"], answer: 0 },
      { q: "Every action has an equal and opposite reaction is the…", options: ["1st law", "2nd law", "3rd law", "Law of gravity"], answer: 2 },
    ],
  },
  {
    id: "ss-civics-branches", subject: "Social Studies", unit: "Civics", order: 5, difficulty: "easy",
    emoji: "⚖️", title: "Three Branches of Government", duration: "10 min", xp: 35,
    content: `
## Three Branches of Government ⚖️

Most democracies split power into three branches so no one group has too much control — this is called **separation of powers**.

| Branch | Role | Example |
|--------|------|---------|
| **Legislative** | Makes the laws | Parliament / Congress |
| **Executive** | Carries out the laws | President / Prime Minister |
| **Judiciary** | Interprets the laws | Courts & judges |

### Checks and Balances
Each branch can limit the others — for example, the judiciary can strike down a law that breaks the constitution.

> 💡 Separating power prevents any single person or group from becoming too powerful.
    `,
    questions: [
      { q: "Which branch makes the laws?", options: ["Executive", "Legislative", "Judiciary", "Military"], answer: 1 },
      { q: "Which branch interprets the laws?", options: ["Executive", "Legislative", "Judiciary", "Press"], answer: 2 },
      { q: "Separation of powers exists to…", options: ["Speed up laws", "Prevent any one group having too much power", "Raise taxes", "Replace elections"], answer: 1 },
    ],
  },
];

// ─── Badge Rules ──────────────────────────────────────────────────────────────
export const BADGE_RULES = [
  { key: "first_lesson",    label: "First Step!",        emoji: "🎯", points: 50,  condition: (c) => c.length >= 1 },
  { key: "three_lessons",   label: "Getting Started",    emoji: "📗", points: 75,  condition: (c) => c.length >= 3 },
  { key: "math_master",     label: "Maths Master",       emoji: "🔢", points: 100, subject: "Mathematics",              condition: (c) => c.filter(x => x.subject === "Mathematics").length >= 4 },
  { key: "bookworm",        label: "Bookworm",           emoji: "📚", points: 100, subject: "English",                  condition: (c) => c.filter(x => x.subject === "English").length >= 4 },
  { key: "scientist",       label: "Young Scientist",    emoji: "🔬", points: 100, subject: "Science",                  condition: (c) => c.filter(x => x.subject === "Science").length >= 3 },
  { key: "explorer",        label: "Explorer",           emoji: "🌍", points: 100, subject: "Social Studies",           condition: (c) => c.filter(x => x.subject === "Social Studies").length >= 3 },
  { key: "historian",       label: "Historian",          emoji: "📜", points: 100, subject: "History",                  condition: (c) => c.filter(x => x.subject === "History").length >= 2 },
  { key: "emotional_iq",   label: "Emotional IQ",       emoji: "🧠", points: 100, subject: "Social Emotional Learning",condition: (c) => c.filter(x => x.subject === "Social Emotional Learning").length >= 2 },
  { key: "perfect_score",   label: "Perfect Score!",     emoji: "⭐", points: 150, condition: (c) => c.some(x => x.score === 100) },
  { key: "five_lessons",    label: "On a Roll!",         emoji: "🔥", points: 200, condition: (c) => c.length >= 5 },
  { key: "ten_lessons",     label: "Dedicated Learner",  emoji: "🏅", points: 300, condition: (c) => c.length >= 10 },
  { key: "fifteen_lessons", label: "Scholar",            emoji: "🎓", points: 400, condition: (c) => c.length >= 15 },
  { key: "speed_learner",   label: "Fast Learner!",      emoji: "⚡", points: 200, condition: (c) => c.length >= 3 && c.some(x => x.score >= 90) },
  { key: "streak_3",        label: "3-Day Streak!",      emoji: "🌟", points: 150, condition: (_c, streak) => (streak || 0) >= 3 },
  { key: "streak_7",        label: "Week Warrior!",      emoji: "💫", points: 300, condition: (_c, streak) => (streak || 0) >= 7 },
];
