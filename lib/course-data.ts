export interface Exercise {
  type: string
  question: string
  scenario?: string
  options?: string[]
  correct?: number | string
  explanation?: string
  feedback?: {
    success: string
    failure: string
  }
  items?: any[]
  categories?: string[]
  targetOrder?: string[]
  solution?: string[]
  formula?: string
  variables?: string[]
  steps?: string[]
  story_context?: any
}

export interface Lesson {
  title: string
  description: string
  story?: {
    setting: string
    scenario: string
    characters: string[]
  }
  content: {
    theory: string
    exercises: Exercise[]
  }
}

export interface Course {
  id: string
  title: string
  description: string
  level: string
  lessons: { [key: number]: Lesson }
}

export const courses: { [key: string]: Course } = {
  logic: {
    id: "logic",
    title: "Mathematical Logic",
    description: "Learn the foundations of logical reasoning and proof techniques",
    level: "Beginner",
    lessons: {
      1: {
        title: "What Makes a Proposition?",
        description: "Learn to identify valid logical statements",
        story: {
          setting: "Detective Academy Training",
          scenario:
            "You're a new detective learning to analyze witness statements. Not all statements can be used as evidence in court - only those that are clearly true or false.",
          characters: ["Detective Smith", "Witness A", "Judge"],
        },
        content: {
          theory: `Welcome to Detective Academy! 🕵️

A **proposition** is a statement that is either true or false, but not both. Think of it as evidence that can be verified in court.

**Valid Propositions (Admissible Evidence):**
• "The suspect was wearing a red jacket" ✓
• "The crime occurred at 3:15 PM" ✓  
• "There were 5 witnesses present" ✓

**Invalid Propositions (Inadmissible):**
• "What time did you arrive?" ❌ (Question)
• "Please close the door!" ❌ (Command)
• "The suspect looked suspicious" ❌ (Opinion)
• "x + 1 = 5" ❌ (Depends on x)

**Your Mission:** Help Detective Smith sort witness statements into admissible and inadmissible evidence.`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Witness A says: 'The getaway car was blue.' Can this be used as evidence?",
              question: "Is this statement a valid proposition?",
              options: [
                "Yes - it's either true or false",
                "No - it's just an opinion",
                "No - we need more details",
                "Maybe - depends on lighting",
              ],
              correct: 0,
              explanation:
                "Correct! 'The getaway car was blue' is a proposition because it makes a definite claim that can be verified as true or false.",
              feedback: {
                success:
                  "Detective Smith nods approvingly. 'Excellent work! This statement can be verified by checking security footage.'",
                failure:
                  "Detective Smith shakes his head. 'Remember, a proposition must have a definite truth value, regardless of whether we can currently verify it.'",
              },
            },
          ],
        },
      },
      2: {
        title: "Logical Connectives",
        description: "Understanding AND, OR, NOT, and other logical operators",
        story: {
          setting: "Crime Scene Investigation",
          scenario:
            "You're analyzing a complex case where multiple pieces of evidence must be combined to reach conclusions.",
          characters: ["Detective Smith", "Forensics Team", "Prosecutor"],
        },
        content: {
          theory: `🔍 **Case File: The Museum Heist**

Sometimes we need to combine evidence to build a stronger case. Logical connectives help us do this precisely.

**The Logical Connectives:**

**Conjunction (∧) - "AND"**
• Both conditions must be true
• "The alarm was triggered AND the window was broken"
• Symbol: ∧ (like an upside-down V)

**Disjunction (∨) - "OR"** 
• At least one condition must be true
• "The thief entered through the window OR the door"
• Symbol: ∨ (like a V)

**Negation (¬) - "NOT"**
• The opposite of the statement
• "The security guard was NOT at his post"
• Symbol: ¬

**Truth Conditions:**
• P ∧ Q is true only when both P and Q are true
• P ∨ Q is true when at least one of P or Q is true  
• ¬P is true when P is false`,
          exercises: [
            {
              type: "truth-table",
              scenario: "The prosecutor needs to understand when 'The suspect was present AND had the key' is true.",
              question: "Complete the truth table for P ∧ Q (where P = 'suspect present', Q = 'had key'):",
              formula: "P ∧ Q",
              variables: ["P", "Q"],
            },
          ],
        },
      },
      3: {
        title: "Quantifiers",
        description: "Using 'for all' and 'there exists' in logical statements",
        story: {
          setting: "Interrogation Room",
          scenario:
            "You're questioning multiple suspects, and need to use quantifiers to make accurate deductions about their testimonies.",
          characters: ["Detective Smith", "Suspect A", "Suspect B", "Suspect C"],
        },
        content: {
          theory: `🔎 **Interrogation Tactics: Quantifiers**

Detective Smith leans forward...

"To catch a liar, we must use quantifiers to analyze their statements precisely."

**Universal Quantifier (∀) - "For all"**
• Claims something is true for every element in a set
• "∀ x, if x is a suspect, then x has an alibi"

**Existential Quantifier (∃) - "There exists"**
• Claims something is true for at least one element in a set
• "∃ x, x is a witness who saw the crime"

**Negating Quantified Statements:**
• ¬(∀ x, P(x)) ≡ ∃ x, ¬P(x)
• ¬(∃ x, P(x)) ≡ ∀ x, ¬P(x)

**Examples:**
• "All witnesses are telling the truth" (∀ x, witness(x) → truth(x))
• "Someone saw the suspect" (∃ x, saw(x, suspect))

**Your Mission:** Help Detective Smith translate witness statements into quantified logical expressions.`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Suspect A claims: 'Everyone in this room is innocent.' How do you express this?",
              question: "Which logical expression represents this statement?",
              options: [
                "∀ x, inRoom(x) → innocent(x)",
                "∃ x, inRoom(x) ∧ innocent(x)",
                "∀ x, innocent(x) → inRoom(x)",
                "∃ x, inRoom(x) → innocent(x)",
              ],
              correct: 0,
              explanation:
                "Correct! '∀ x, inRoom(x) → innocent(x)' means 'For all x, if x is in the room, then x is innocent.'",
              feedback: {
                success:
                  "Detective Smith smiles. 'Excellent! Now we can analyze the statement's truth value based on the evidence.'",
                failure:
                  "Detective Smith frowns. 'Remember, the universal quantifier (∀) means 'for all'. We need to ensure the implication is correct.'",
              },
            },
            {
              type: "truth-table",
              scenario: "Analyze the statement: 'There exists a witness who is lying.'",
              question: "Complete the truth table for ∃x, witness(x) ∧ lying(x):",
              formula: "∃x, witness(x) ∧ lying(x)",
              variables: ["witness(x)", "lying(x)"],
            },
          ],
        },
      },
      4: {
        title: "Proof by Contradiction",
        description: "Using contradiction to prove a statement is true",
        story: {
          setting: "Courtroom Drama",
          scenario: "You're a lawyer using proof by contradiction to demonstrate the defendant's innocence.",
          characters: ["Lawyer", "Judge", "Defendant", "Prosecutor"],
        },
        content: {
          theory: `⚖️ **Courtroom Strategy: Proof by Contradiction**

The Lawyer addresses the jury...

"We will prove the defendant's innocence by showing that assuming guilt leads to an impossible contradiction!"

**Proof by Contradiction:**
1. Assume the negation of the statement you want to prove.
2. Show that this assumption leads to a logical contradiction.
3. Conclude that the original statement must be true.

**Example:**
• To prove: "√2 is irrational"
• Assume: "√2 is rational" (i.e., √2 = a/b for integers a, b)
• Show: This leads to a contradiction (a and b must both be even)
• Conclude: "√2 is irrational"

**Your Mission:** Use proof by contradiction to win the case.`,
          exercises: [
            {
              type: "proof-builder",
              scenario: "Prove that there are infinitely many prime numbers using proof by contradiction.",
              question: "Arrange the steps to prove there are infinitely many primes:",
              steps: [
                "Assume there are finitely many primes: p₁, p₂, ..., pₙ",
                "Let N = (p₁ × p₂ × ... × pₙ) + 1",
                "N is either prime or composite",
                "If N is prime, then we have a new prime, contradicting our assumption",
                "If N is composite, it must be divisible by some prime pᵢ",
                "But then pᵢ divides both N and p₁ × p₂ × ... × pₙ, so it must divide their difference, which is 1",
                "This is impossible, so we have a contradiction",
                "Therefore, there must be infinitely many primes",
              ],
            },
            {
              type: "story-choice",
              scenario:
                "The prosecutor claims: 'The defendant was at the crime scene.' You assume the opposite. What's your next step?",
              question: "What's the next step in proof by contradiction?",
              options: [
                "Show that the assumption leads to a contradiction",
                "Present evidence supporting the assumption",
                "Admit the assumption is false",
                "Ignore the assumption and present new evidence",
              ],
              correct: 0,
              explanation:
                "Correct! The next step is to show that assuming the defendant was NOT at the crime scene leads to a logical contradiction.",
              feedback: {
                success: "The judge nods. 'Proceed with demonstrating the contradiction, counselor.'",
                failure:
                  "The judge raises an eyebrow. 'Remember, the goal is to show that the assumption leads to an impossible situation.'",
              },
            },
          ],
        },
      },
      5: {
        title: "Set Theory",
        description: "Applying set theory to logical problems",
        story: {
          setting: "Mathematical Conference",
          scenario:
            "You're attending a conference where mathematicians are using set theory to solve complex logical puzzles.",
          characters: ["Mathematician A", "Mathematician B", "Conference Attendees"],
        },
        content: {
          theory: `🧩 **Mathematical Conference: Set Theory Applications**

Mathematician A presents a new approach...

"Set theory provides a powerful framework for analyzing logical statements and solving intricate problems."

**Sets and Logic:**
• Propositions can be represented as sets of possible worlds
• Logical connectives correspond to set operations
• Universal quantifier (∀) corresponds to intersection
• Existential quantifier (∃) corresponds to union

**Example:**
• Let P = {worlds where 'it is raining'}
• Let Q = {worlds where 'the ground is wet'}
• P → Q means P ⊆ Q (if it's raining, then the ground is wet)

**Applications:**
• Database queries
• Formal verification
• Artificial intelligence
• Software engineering

**Your Mission:** Use set theory to solve logical puzzles presented at the conference.`,
          exercises: [
            {
              type: "visual-logic",
              scenario:
                "Mathematician B presents a Venn diagram. 'If A represents 'suspects with an alibi' and B represents 'suspects with a motive', which area represents suspects with an alibi but no motive?'",
              question: "Which region represents A - B?",
              options: ["A ∩ B", "A ∪ B", "A - B", "B - A"],
              correct: "A - B",
              explanation:
                "Correct! A - B represents the set of elements in A but not in B, which corresponds to suspects with an alibi but no motive.",
            },
            {
              type: "drag-drop",
              scenario:
                "A logical puzzle involves sets of suspects. Drag the suspects to the correct sets based on the given information.",
              question: "Sort the suspects into the correct sets:",
              items: [
                { id: "1", text: "Suspect X", category: "alibi" },
                { id: "2", text: "Suspect Y", category: "motive" },
                { id: "3", text: "Suspect Z", category: "both" },
                { id: "4", text: "Suspect W", category: "neither" },
              ],
              categories: ["alibi", "motive", "both", "neither"],
            },
          ],
        },
      },
    },
  },

  "set-theory": {
    id: "set-theory",
    title: "Set Theory",
    description: "Explore the fundamental concepts of sets, relations, and functions",
    level: "Beginner",
    lessons: {
      1: {
        title: "Introduction to Sets",
        description: "Understanding collections and membership",
        story: {
          setting: "Cantor's Study",
          scenario:
            "You're visiting Georg Cantor, the father of set theory, learning about his revolutionary ideas on collections.",
          characters: ["Georg Cantor", "Mathematical Colleagues", "Students"],
        },
        content: {
          theory: `📜 **Cantor's Revolutionary Ideas**

Georg Cantor looks up from his manuscripts...

"Welcome! I've been developing a theory about collections - what I call 'sets'. These simple ideas will revolutionize all of mathematics!"

**What is a Set?**
A set is simply a collection of distinct objects, called elements or members.

**Notation:**
• A = {1, 2, 3, 4, 5} - roster notation (list the elements)
• B = {x | x is an even integer} - set-builder notation (describe the property)
• a ∈ A means "a is an element of A"
• a ∉ A means "a is not an element of A"

**Special Sets:**
• ∅ or {} - the empty set (contains nothing)
• ℕ = {1, 2, 3, ...} - natural numbers
• ℤ = {..., -2, -1, 0, 1, 2, ...} - integers  
• ℚ - rational numbers (fractions)
• ℝ - real numbers`,
          exercises: [
            {
              type: "drag-drop",
              scenario: "Cantor asks you to identify which numbers belong to the set of even numbers between 1 and 10.",
              question: "Drag the even numbers to the correct set:",
              items: [
                { id: "1", text: "2", category: "even" },
                { id: "2", text: "3", category: "odd" },
                { id: "3", text: "4", category: "even" },
                { id: "4", text: "5", category: "odd" },
                { id: "5", text: "6", category: "even" },
                { id: "6", text: "7", category: "odd" },
                { id: "7", text: "8", category: "even" },
                { id: "8", text: "9", category: "odd" },
              ],
              categories: ["even", "odd"],
            },
          ],
        },
      },
      2: {
        title: "Set Operations",
        description: "Union, intersection, and complement",
        story: {
          setting: "Mathematical Conference",
          scenario: "Cantor is presenting his work on set operations to fellow mathematicians.",
          characters: ["Georg Cantor", "Dedekind", "Weierstrass"],
        },
        content: {
          theory: `🎯 **Set Operations Workshop**

Cantor demonstrates with two circles on the blackboard...

**Set Operations:**
• **Union (A ∪ B):** All elements in A or B (or both)
• **Intersection (A ∩ B):** Elements in both A and B
• **Difference (A - B):** Elements in A but not in B
• **Complement (A'):** Elements not in A (within some universal set)

**Examples:**
If A = {1, 2, 3} and B = {2, 3, 4}, then:
• A ∪ B = {1, 2, 3, 4}
• A ∩ B = {2, 3}
• A - B = {1}
• B - A = {4}

**Properties:**
• Commutative: A ∪ B = B ∪ A
• Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)
• Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)`,
          exercises: [
            {
              type: "visual-logic",
              scenario: "Cantor draws Venn diagrams to illustrate set operations.",
              question: "Which diagram represents A ∪ B?",
              options: ["union", "intersection", "difference", "complement"],
              correct: "union",
            },
          ],
        },
      },
      3: {
        title: "Functions and Relations",
        description: "Mapping between sets and relationships between elements",
        story: {
          setting: "Cantor's Garden",
          scenario:
            "Cantor is explaining the concept of functions and relations using the plants and flowers in his garden.",
          characters: ["Georg Cantor", "Gardener", "Visiting Mathematician"],
        },
        content: {
          theory: `🌸 **Cantor's Garden of Mappings**

Cantor gestures towards the flowers...

"Just as each flower is related to its species, elements in sets can be related through functions and relations!"

**Functions:**
A function f: A → B maps each element of A to a unique element of B.
• A is the domain
• B is the codomain
• Range is the set of all actual outputs

**Relations:**
A relation R ⊆ A × B is a set of ordered pairs (a, b) where a ∈ A and b ∈ B.
• Reflexive: (a, a) ∈ R for all a ∈ A
• Symmetric: If (a, b) ∈ R, then (b, a) ∈ R
• Transitive: If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R

**Equivalence Relations:**
A relation that is reflexive, symmetric, and transitive.

**Examples:**
• f(x) = x² is a function from ℝ to ℝ
• "is equal to" is an equivalence relation

**Your Mission:** Identify functions and relations in Cantor's garden.`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Cantor points to a rose bush. 'Is the mapping from each rose to its color a function?'",
              question: "Is this mapping a function?",
              options: [
                "Yes, each rose has a unique color",
                "No, some roses have multiple colors",
                "No, it's a relation, not a function",
                "Maybe, depending on the lighting",
              ],
              correct: 0,
              explanation:
                "Correct! Each rose has a unique color, so the mapping is a function from the set of roses to the set of colors.",
              feedback: {
                success: "Cantor smiles. 'Indeed! A function maps each element to a unique output.'",
                failure:
                  "Cantor shakes his head. 'Remember, a function must map each element to a single, unique output.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Sort the relations into reflexive, symmetric, and transitive categories.",
              question: "Classify the following relations:",
              items: [
                { id: "1", text: "is equal to", category: "equivalence" },
                { id: "2", text: "is greater than", category: "transitive" },
                { id: "3", text: "is a sibling of", category: "symmetric" },
                { id: "4", text: "is a parent of", category: "none" },
              ],
              categories: ["equivalence", "transitive", "symmetric", "none"],
            },
          ],
        },
      },
      4: {
        title: "Cardinality and Infinite Sets",
        description: "Comparing the sizes of sets, including infinite sets",
        story: {
          setting: "Cantor's Office",
          scenario:
            "Cantor is explaining his groundbreaking ideas about the sizes of infinite sets, which were initially controversial.",
          characters: ["Georg Cantor", "Skeptical Colleague", "Enthusiastic Student"],
        },
        content: {
          theory: `♾️ **Cantor's Infinite Discoveries**

Cantor leans forward, a twinkle in his eye...

"I've discovered that some infinities are larger than others! This will change everything!"

**Cardinality:**
The "size" of a set.
• |A| = |B| if there exists a bijection (one-to-one correspondence) between A and B.

**Countable Sets:**
Sets that can be put into a one-to-one correspondence with the natural numbers ℕ.
• Examples: ℤ, ℚ

**Uncountable Sets:**
Sets that are "larger" than ℕ.
• Examples: ℝ, the power set of ℕ

**Cantor's Diagonal Argument:**
Proves that ℝ is uncountable.

**Your Mission:** Explore the different sizes of infinity with Cantor.`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Cantor asks: 'Can we list all real numbers between 0 and 1?'",
              question: "Is the set of real numbers between 0 and 1 countable?",
              options: [
                "Yes, we can list them all",
                "No, it's uncountable",
                "Maybe, if we use a computer",
                "It depends on the definition of 'real number'",
              ],
              correct: 1,
              explanation:
                "Correct! The set of real numbers between 0 and 1 is uncountable, as proven by Cantor's diagonal argument.",
              feedback: {
                success:
                  "Cantor nods approvingly. 'Indeed! The real numbers form a larger infinity than the natural numbers.'",
                failure:
                  "Cantor smiles gently. 'Remember, Cantor's diagonal argument shows that we cannot list all real numbers.'",
              },
            },
            {
              type: "proof-builder",
              scenario:
                "Outline the steps of Cantor's diagonal argument to prove that the real numbers are uncountable.",
              question: "Arrange the steps of Cantor's diagonal argument:",
              steps: [
                "Assume the real numbers between 0 and 1 are countable",
                "List them: r₁, r₂, r₃, ...",
                "Create a new number r by changing the nth digit of rₙ",
                "r differs from every number in the list",
                "Therefore, the list is incomplete, and the real numbers are uncountable",
              ],
            },
          ],
        },
      },
      5: {
        title: "Russell's Paradox and Axiomatic Set Theory",
        description: "Addressing paradoxes in naive set theory and the need for axioms",
        story: {
          setting: "Mathematical Crisis Meeting",
          scenario:
            "Mathematicians are grappling with Russell's Paradox, which threatens the foundations of set theory.",
          characters: ["Bertrand Russell", "Gottlob Frege", "David Hilbert"],
        },
        content: {
          theory: `🤯 **The Paradox That Shook Mathematics**

Russell presents his devastating paradox...

"Consider the set of all sets that do not contain themselves. Does this set contain itself? This leads to a contradiction!"

**Russell's Paradox:**
Let R = {x | x ∉ x}. Does R ∈ R?
• If R ∈ R, then R ∉ R (contradiction)
• If R ∉ R, then R ∈ R (contradiction)

**Axiomatic Set Theory (ZFC):**
A set of axioms designed to avoid paradoxes like Russell's.
• Axiom of Extensionality
• Axiom of Union
• Axiom of Power Set
• Axiom of Infinity
• Axiom of Choice

**Your Mission:** Understand the implications of Russell's Paradox and the need for axiomatic set theory.`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Russell asks: 'Does the set of all sets that do not contain themselves contain itself?'",
              question: "What is the consequence of Russell's Paradox?",
              options: [
                "Set theory is consistent",
                "Set theory is incomplete",
                "Naive set theory is inconsistent",
                "Mathematics is doomed",
              ],
              correct: 2,
              explanation:
                "Correct! Russell's Paradox demonstrates that naive set theory, without axioms, is inconsistent.",
              feedback: {
                success: "Russell nods grimly. 'Indeed! We must rebuild set theory on a more solid foundation.'",
                failure:
                  "Russell sighs. 'Remember, the paradox reveals a fundamental flaw in our initial assumptions.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Explain why Russell's Paradox is a paradox.",
              question: "Arrange the steps to demonstrate Russell's Paradox:",
              steps: [
                "Define R = {x | x ∉ x}",
                "Assume R ∈ R",
                "Then R must satisfy the condition for membership in R, so R ∉ R",
                "This is a contradiction",
                "Assume R ∉ R",
                "Then R satisfies the condition for not being in R, so R ∈ R",
                "This is also a contradiction",
                "Therefore, the definition of R leads to a paradox",
              ],
            },
          ],
        },
      },
      6: {
        title: "The Axiom of Choice",
        description: "Understanding and applying the Axiom of Choice",
        story: {
          setting: "Axiomatic Debate",
          scenario: "Mathematicians are debating the validity and implications of the Axiom of Choice.",
          characters: ["Ernst Zermelo", "Kurt Gödel", "Paul Cohen"],
        },
        content: {
          theory: `🤔 **The Controversial Axiom of Choice**

Zermelo defends his controversial axiom...

"The Axiom of Choice is essential for many important results in mathematics, even if it seems counterintuitive!"

**Axiom of Choice (AC):**
Given any collection of non-empty sets, it is possible to choose one element from each set.

**Formal Statement:**
For any set I and any family (Aᵢ)ᵢ∈I of non-empty sets, there exists a function f: I → ∪ᵢ∈I Aᵢ such that f(i) ∈ Aᵢ for all i ∈ I.

**Consequences:**
• Every vector space has a basis
• The well-ordering theorem
• Zorn's Lemma

**Controversies:**
• Non-constructive: It doesn't tell us how to choose the elements
• Leads to counterintuitive results (e.g., Banach-Tarski paradox)

**Your Mission:** Explore the consequences and controversies surrounding the Axiom of Choice.`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "Zermelo asks: 'If you have infinitely many pairs of shoes, can you choose one shoe from each pair?'",
              question: "Does the Axiom of Choice guarantee that you can choose one shoe from each pair?",
              options: [
                "Yes, always",
                "No, never",
                "Only if the pairs are distinguishable",
                "It depends on the type of shoes",
              ],
              correct: 0,
              explanation:
                "Correct! The Axiom of Choice guarantees that you can choose one element (shoe) from each set (pair), even if there are infinitely many sets.",
              feedback: {
                success:
                  "Zermelo nods. 'Indeed! The Axiom of Choice allows us to make such selections, even in infinite cases.'",
                failure:
                  "Zermelo frowns. 'Remember, the Axiom of Choice asserts the existence of such a selection function, regardless of how we find it.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the consequences with the Axiom of Choice.",
              question: "Connect the Axiom of Choice to its consequences:",
              items: [
                { id: "1", text: "Every vector space has a basis", category: "consequence" },
                { id: "2", text: "The well-ordering theorem", category: "consequence" },
                { id: "3", text: "Zorn's Lemma", category: "consequence" },
                { id: "4", text: "Russell's Paradox", category: "unrelated" },
              ],
              categories: ["consequence", "unrelated"],
            },
          ],
        },
      },
    },
  },

  "linear-algebra": {
    id: "linear-algebra",
    title: "Linear Algebra",
    description: "Master vectors, matrices, and linear transformations",
    level: "Intermediate",
    lessons: {
      1: {
        title: "Introduction to Vectors",
        description: "Understanding vectors as directed quantities",
        story: {
          setting: "NASA Mission Control",
          scenario:
            "You're working with the flight dynamics team to understand spacecraft trajectories using vector mathematics.",
          characters: ["Flight Director", "Navigation Engineer", "Mission Specialist"],
        },
        content: {
          theory: `🚀 **Mission Control: Vector Navigation**

The Flight Director briefs the team...

"Every spacecraft movement can be described using vectors - quantities with both magnitude and direction."

**What is a Vector?**
A vector represents a quantity with both magnitude (size) and direction.

**Examples:**
• Velocity: 500 km/h northeast
• Force: 100 N downward
• Displacement: 50 m at 30° angle

**Vector Notation:**
• **v** = ⟨3, 4⟩ (component form)
• **v** = 3**i** + 4**j** (unit vector form)
• |**v**| = √(3² + 4²) = 5 (magnitude)

**Vector Operations:**
• Addition: **u** + **v** = ⟨u₁ + v₁, u₂ + v₂⟩
• Scalar multiplication: c**v** = ⟨cv₁, cv₂⟩
• Dot product: **u** · **v** = u₁v₁ + u₂v₂

**Applications:**
• Navigation and GPS
• Computer graphics
• Physics simulations
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "The spacecraft needs to change course. Current velocity is ⟨100, 200⟩ km/h, and we need to add ⟨50, -100⟩ km/h.",
              question: "What will be the new velocity vector?",
              options: ["⟨150, 100⟩ km/h", "⟨50, 300⟩ km/h", "⟨150, 300⟩ km/h", "⟨50, 100⟩ km/h"],
              correct: 0,
              explanation: "Vector addition: ⟨100, 200⟩ + ⟨50, -100⟩ = ⟨100+50, 200+(-100)⟩ = ⟨150, 100⟩",
            },
          ],
        },
      },
      2: {
        title: "Matrix Operations",
        description: "Working with matrices and their properties",
        story: {
          setting: "Computer Graphics Studio",
          scenario: "You're learning how 3D animations are created using matrix transformations.",
          characters: ["Lead Animator", "Technical Director", "Graphics Programmer"],
        },
        content: {
          theory: `🎬 **Animation Studio: Matrix Magic**

The Lead Animator explains...

"Every rotation, scaling, and translation you see in our 3D animations is powered by matrix mathematics!"

**What is a Matrix?**
A matrix is a rectangular array of numbers arranged in rows and columns.

**Matrix Notation:**
A = [a₁₁  a₁₂]
    [a₂₁  a₂₂]

**Matrix Operations:**
• **Addition:** Add corresponding elements
• **Scalar Multiplication:** Multiply each element by the scalar
• **Matrix Multiplication:** Row × Column rule
• **Transpose:** Flip rows and columns

**Special Matrices:**
• Identity Matrix: I (like the number 1)
• Zero Matrix: O (like the number 0)
• Inverse Matrix: A⁻¹ (when AA⁻¹ = I)

**Applications:**
• 3D transformations
• Solving systems of equations
• Data compression
• Machine learning algorithms`,
          exercises: [
            {
              type: "drag-drop",
              scenario: "Calculate the matrix product of two 2×2 transformation matrices.",
              question: "Arrange the steps to multiply matrices A and B:",
              items: [
                { id: "1", text: "Multiply row 1 of A by column 1 of B", category: "step1" },
                { id: "2", text: "Multiply row 1 of A by column 2 of B", category: "step2" },
                { id: "3", text: "Multiply row 2 of A by column 1 of B", category: "step3" },
                { id: "4", text: "Multiply row 2 of A by column 2 of B", category: "step4" },
              ],
              categories: ["step1", "step2", "step3", "step4"],
            },
          ],
        },
      },
      3: {
        title: "Linear Transformations",
        description: "Understanding how matrices transform vectors",
        story: {
          setting: "Virtual Reality Design Studio",
          scenario:
            "You're designing virtual reality environments, and need to use linear transformations to manipulate objects in 3D space.",
          characters: ["VR Designer", "Software Engineer", "3D Modeler"],
        },
        content: {
          theory: `🎮 **VR Design: Transforming Reality**

The VR Designer explains...

"Linear transformations are the backbone of VR. They allow us to rotate, scale, and translate objects seamlessly."

**Linear Transformation:**
A function T: V → W between vector spaces V and W that preserves vector addition and scalar multiplication.

**Matrix Representation:**
Every linear transformation can be represented by a matrix.
• T(**v**) = A**v**

**Examples:**
• Rotation: Rotate an object around an axis
• Scaling: Enlarge or shrink an object
• Translation: Move an object in space
• Shear: Skew an object

**Composition of Transformations:**
Applying multiple transformations in sequence.
• T₂(T₁(**v**)) = A₂A₁**v**

**Applications:**
• Computer graphics
• Robotics
• Image processing
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "A 3D model needs to be rotated 90 degrees around the z-axis. Which matrix transformation should you apply?",
              question: "Which matrix represents a 90-degree rotation around the z-axis?",
              options: [
                "[0 -1 0; 1 0 0; 0 0 1]",
                "[1 0 0; 0 0 -1; 0 1 0]",
                "[0 1 0; -1 0 0; 0 0 1]",
                "[0 0 1; 0 1 0; -1 0 0]",
              ],
              correct: 0,
              explanation:
                "Correct! The matrix [0 -1 0; 1 0 0; 0 0 1] represents a 90-degree rotation around the z-axis.",
              feedback: {
                success:
                  "The VR Designer nods. 'Excellent! The model is now correctly oriented in the virtual environment.'",
                failure:
                  "The VR Designer frowns. 'Remember, the rotation matrix must correctly transform the coordinates of the model.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Arrange the steps to apply a scaling transformation followed by a translation.",
              question: "Order the steps to transform a vector:",
              items: [
                { id: "1", text: "Multiply the vector by the scaling matrix", category: "step1" },
                { id: "2", text: "Add the translation vector to the scaled vector", category: "step2" },
              ],
              categories: ["step1", "step2"],
            },
          ],
        },
      },
      4: {
        title: "Eigenvalues and Eigenvectors",
        description: "Understanding invariant directions under linear transformations",
        story: {
          setting: "Structural Engineering Firm",
          scenario:
            "You're analyzing the stability of a bridge, and need to find the eigenvalues and eigenvectors of the structure's stiffness matrix.",
          characters: ["Structural Engineer", "Civil Engineer", "Software Analyst"],
        },
        content: {
          theory: `🌉 **Bridge Stability: Eigenvalue Analysis**

The Structural Engineer explains...

"Eigenvalues and eigenvectors tell us about the natural modes of vibration and potential failure points of the bridge."

**Eigenvalue:**
A scalar λ such that A**v** = λ**v** for some non-zero vector **v**.

**Eigenvector:**
A non-zero vector **v** such that A**v** = λ**v** for some scalar λ.

**Characteristic Equation:**
det(A - λI) = 0

**Examples:**
• A rotation matrix has complex eigenvalues
• A symmetric matrix has real eigenvalues

**Applications:**
• Vibration analysis
• Quantum mechanics
• Principal component analysis
• Google's PageRank algorithm`,
          exercises: [
            {
              type: "story-choice",
              scenario: "The stiffness matrix of a bridge section has an eigenvalue of 0. What does this indicate?",
              question: "What does an eigenvalue of 0 signify?",
              options: [
                "The section is perfectly stable",
                "The section is unstable and may collapse",
                "The section is vibrating at its natural frequency",
                "The section is undergoing a linear transformation",
              ],
              correct: 1,
              explanation:
                "Correct! An eigenvalue of 0 indicates that the section is unstable and may collapse under certain loads.",
              feedback: {
                success: "The Structural Engineer nods gravely. 'We must reinforce this section immediately!'",
                failure:
                  "The Structural Engineer sighs. 'Remember, an eigenvalue of 0 indicates a potential instability.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Show that if **v** is an eigenvector of A, then c**v** is also an eigenvector of A.",
              question: "Arrange the steps to prove that c**v** is an eigenvector:",
              steps: [
                "Let A**v** = λ**v**",
                "Consider A(c**v**)",
                "A(c**v**) = c(A**v**)",
                "Since A**v** = λ**v**, we have c(A**v**) = c(λ**v**)",
                "c(λ**v**) = λ(c**v**)",
                "Therefore, A(c**v**) = λ(c**v**), so c**v** is an eigenvector of A",
              ],
            },
          ],
        },
      },
      5: {
        title: "Vector Spaces and Subspaces",
        description: "Understanding the abstract structure of vector spaces",
        story: {
          setting: "University Mathematics Department",
          scenario: "You're attending a lecture on the abstract definition of vector spaces and their properties.",
          characters: ["Professor", "Graduate Student", "Undergraduate Student"],
        },
        content: {
          theory: `🎓 **Abstract Vector Spaces**

The Professor begins the lecture...

"Today, we delve into the abstract definition of vector spaces - the foundation of linear algebra."

**Vector Space:**
A set V with two operations (addition and scalar multiplication) satisfying certain axioms.

**Axioms:**
• Closure under addition and scalar multiplication
• Associativity and commutativity of addition
• Existence of additive identity and inverse
• Distributivity of scalar multiplication

**Subspace:**
A subset W of V that is itself a vector space.

**Examples:**
• ℝⁿ is a vector space
• The set of all polynomials is a vector space
• The set of all continuous functions is a vector space

**Applications:**
• Functional analysis
• Quantum mechanics
• Signal processing
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario: "The professor asks: 'Is the set of all 2x2 matrices with determinant 0 a vector space?'",
              question: "Does this set form a vector space?",
              options: [
                "Yes, it satisfies all vector space axioms",
                "No, it's not closed under addition",
                "No, it lacks an additive identity",
                "No, it lacks inverses",
              ],
              correct: 1,
              explanation:
                "Correct! The set is not closed under addition. The sum of two matrices with determinant 0 may have a non-zero determinant.",
              feedback: {
                success: "The Professor nods. 'Indeed! Closure is a crucial requirement for a vector space.'",
                failure: "The Professor sighs. 'Remember, all vector space axioms must be satisfied.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Sort the following sets into vector spaces and non-vector spaces.",
              question: "Classify the following sets:",
              items: [
                { id: "1", text: "ℝ²", category: "vector_space" },
                { id: "2", text: "The set of all lines in ℝ² passing through the origin", category: "vector_space" },
                {
                  id: "3",
                  text: "The set of all lines in ℝ² not passing through the origin",
                  category: "not_vector_space",
                },
                { id: "4", text: "The set of all polynomials of degree exactly 2", category: "not_vector_space" },
              ],
              categories: ["vector_space", "not_vector_space"],
            },
          ],
        },
      },
      6: {
        title: "Inner Products and Orthogonality",
        description: "Defining angles and distances in vector spaces",
        story: {
          setting: "Data Science Research Lab",
          scenario:
            "You're working on a machine learning project, and need to use inner products to measure the similarity between data points.",
          characters: ["Data Scientist", "Machine Learning Engineer", "Research Assistant"],
        },
        content: {
          theory: `📊 **Data Analysis: Measuring Similarity**

The Data Scientist explains...

"Inner products allow us to quantify the similarity between data points, which is crucial for machine learning algorithms."

**Inner Product:**
A function ⟨**u**, **v**⟩ that satisfies certain axioms (conjugate symmetry, linearity, positive definiteness).

**Norm:**
||**v**|| = √(⟨**v**, **v**⟩)

**Orthogonality:**
**u** and **v** are orthogonal if ⟨**u**, **v**⟩ = 0.

**Examples:**
• Dot product in ℝⁿ
• Integral inner product in function spaces

**Applications:**
• Machine learning
• Signal processing
• Quantum mechanics
• Fourier analysis`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Two data points are orthogonal. What does this imply about their similarity?",
              question: "What does orthogonality imply?",
              options: [
                "They are very similar",
                "They are completely dissimilar",
                "They are linearly dependent",
                "They have the same magnitude",
              ],
              correct: 1,
              explanation: "Correct! Orthogonality implies that the data points are completely dissimilar.",
              feedback: {
                success: "The Data Scientist nods. 'Indeed! Orthogonal data points are uncorrelated.'",
                failure: "The Data Scientist sighs. 'Remember, orthogonality implies a lack of correlation.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Prove the Cauchy-Schwarz inequality: |⟨**u**, **v**⟩| ≤ ||**u**|| ||**v**||",
              question: "Arrange the steps to prove the Cauchy-Schwarz inequality:",
              steps: [
                "Let **w** = **u** - proj_**v**(**u**)",
                "Then **w** is orthogonal to **v**",
                "So ⟨**w**, **v**⟩ = 0",
                "Expand ⟨**w**, **w**⟩ ≥ 0",
                "This leads to the Cauchy-Schwarz inequality",
              ],
            },
          ],
        },
      },
    },
  },

  "real-analysis": {
    id: "real-analysis",
    title: "Real Analysis",
    description: "Explore the rigorous foundation of calculus and real numbers",
    level: "Advanced",
    lessons: {
      1: {
        title: "Sequences and Limits",
        description: "Understanding convergence and limit behavior",
        story: {
          setting: "19th Century Mathematical Society",
          scenario: "You're attending Cauchy's lectures on making calculus rigorous through precise definitions.",
          characters: ["Augustin-Louis Cauchy", "Karl Weierstrass", "Students"],
        },
        content: {
          theory: `📐 **Cauchy's Rigorous Revolution**

Cauchy addresses the mathematical society...

"Gentlemen, we must make our calculus precise! No more hand-waving about 'infinitely small' quantities."

**Sequences:**
A sequence is a function from ℕ to ℝ: a₁, a₂, a₃, ...

**Limit of a Sequence:**
We say lim(n→∞) aₙ = L if:
For every ε > 0, there exists N such that for all n > N, |aₙ - L| < ε

**Convergence:**
• A sequence converges if it has a limit
• A sequence diverges if it doesn't converge

**Examples:**
• aₙ = 1/n → 0 as n → ∞
• aₙ = (-1)ⁿ diverges (oscillates)
• aₙ = n diverges to infinity

**Important Theorems:**
• Monotone Convergence Theorem
• Bolzano-Weierstrass Theorem
• Cauchy Criterion for Convergence`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Cauchy asks: 'Consider the sequence aₙ = (n+1)/n. What is its limit?'",
              question: "What does this sequence converge to?",
              options: ["0", "1", "∞", "Does not converge"],
              correct: 1,
              explanation: "aₙ = (n+1)/n = 1 + 1/n → 1 as n → ∞, since 1/n → 0.",
            },
          ],
        },
      },
      2: {
        title: "Continuity and Uniform Continuity",
        description: "Precise definitions of continuous functions",
        story: {
          setting: "Weierstrass's Study",
          scenario: "Learning about the pathological functions that challenged 19th-century intuition.",
          characters: ["Karl Weierstrass", "Georg Cantor", "Research Students"],
        },
        content: {
          theory: `🔬 **Weierstrass's Counterexamples**

Weierstrass reveals shocking examples...

"I will show you a function that is continuous everywhere but differentiable nowhere!"

**Continuity at a Point:**
f is continuous at c if:
For every ε > 0, there exists δ > 0 such that |x - c| < δ implies |f(x) - f(c)| < ε

**Uniform Continuity:**
f is uniformly continuous on [a,b] if:
For every ε > 0, there exists δ > 0 such that for all x,y in [a,b], |x - y| < δ implies |f(x) - f(y)| < ε

**Key Differences:**
• Continuity: δ may depend on both ε and the point c
• Uniform continuity: δ depends only on ε

**Important Results:**
• Continuous functions on compact sets are uniformly continuous
• The Intermediate Value Theorem
• The Extreme Value Theorem`,
          exercises: [
            {
              type: "proof-builder",
              scenario: "Prove that f(x) = x² is continuous at x = 2.",
              question: "Arrange the proof steps:",
              steps: [
                "Let ε > 0 be given",
                "We need to find δ > 0 such that |x - 2| < δ implies |x² - 4| < ε",
                "Note that |x² - 4| = |x - 2||x + 2|",
                "If |x - 2| < 1, then |x| < 3, so |x + 2| < 5",
                "Choose δ = min(1, ε/5)",
                "Then |x - 2| < δ implies |x² - 4| = |x - 2||x + 2| < (ε/5) · 5 = ε",
              ],
            },
          ],
        },
      },
      3: {
        title: "Derivatives and Mean Value Theorem",
        description: "Understanding differentiation and its fundamental theorems",
        story: {
          setting: "Hospital's Office",
          scenario: "You're a doctor using derivatives to model the rate of change of a patient's vital signs.",
          characters: ["Doctor", "Nurse", "Medical Student"],
        },
        content: {
          theory: `🩺 **Hospital Ward: Rate of Change**

The Doctor explains...

"Derivatives help us understand how a patient's vital signs are changing over time, allowing us to make critical decisions."

**Derivative:**
The instantaneous rate of change of a function.
f'(x) = lim[h→0] [f(x + h) - f(x)]/h

**Mean Value Theorem:**
If f is continuous on [a, b] and differentiable on (a, b), then there exists c ∈ (a, b) such that:
f'(c) = [f(b) - f(a)] / (b - a)

**Examples:**
• Velocity is the derivative of position
• Acceleration is the derivative of velocity

**Applications:**
• Optimization
• Physics
• Economics
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "A patient's heart rate is increasing at a rate of 5 beats per minute. What does this represent?",
              question: "What does this rate of change represent?",
              options: [
                "The patient's heart rate",
                "The derivative of the patient's heart rate",
                "The integral of the patient's heart rate",
                "The patient's blood pressure",
              ],
              correct: 1,
              explanation: "Correct! The rate of change represents the derivative of the patient's heart rate.",
              feedback: {
                success: "The Doctor nods. 'Indeed! The derivative gives us the instantaneous rate of change.'",
                failure: "The Doctor sighs. 'Remember, the derivative represents the rate of change.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the functions with their derivatives.",
              question: "Connect the functions to their derivatives:",
              items: [
                { id: "1", text: "f(x) = x²", category: "derivative" },
                { id: "2", text: "f(x) = sin(x)", category: "derivative" },
                { id: "3", text: "f(x) = e^x", category: "derivative" },
                { id: "4", text: "f(x) = cos(x)", category: "derivative" },
              ],
              categories: ["derivative"],
            },
          ],
        },
      },
      4: {
        title: "Integration and Fundamental Theorem",
        description: "Understanding integration and its relationship to differentiation",
        story: {
          setting: "Archaeological Dig Site",
          scenario:
            "You're an archaeologist using integration to estimate the total amount of sediment removed from a dig site.",
          characters: ["Archaeologist", "Geologist", "Field Assistant"],
        },
        content: {
          theory: `⛏️ **Archaeological Site: Accumulation of Sediment**

The Archaeologist explains...

"Integration allows us to calculate the total amount of sediment removed by summing up the small amounts removed each day."

**Integral:**
The area under a curve.
∫[a,b] f(x) dx

**Fundamental Theorem of Calculus:**
Differentiation and integration are inverse operations.
• d/dx ∫[a,x] f(t) dt = f(x)
• ∫[a,b] f'(x) dx = f(b) - f(a)

**Examples:**
• Area under a velocity curve is displacement
• Area under an acceleration curve is velocity

**Applications:**
• Physics
• Engineering
• Economics
• Probability`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "The rate of sediment removal is given by f(t) = 10t cubic meters per day. What does the integral of f(t) from 0 to 5 represent?",
              question: "What does the integral represent?",
              options: [
                "The rate of sediment removal at t = 5",
                "The total amount of sediment removed in 5 days",
                "The average rate of sediment removal",
                "The derivative of the sediment removal rate",
              ],
              correct: 1,
              explanation: "Correct! The integral represents the total amount of sediment removed in 5 days.",
              feedback: {
                success: "The Archaeologist nods. 'Indeed! Integration allows us to accumulate the total amount.'",
                failure: "The Archaeologist sighs. 'Remember, integration gives us the total accumulation.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Use the Fundamental Theorem of Calculus to evaluate ∫[0,1] 2x dx.",
              question: "Arrange the steps to evaluate the integral:",
              steps: [
                "The antiderivative of 2x is x²",
                "By the Fundamental Theorem of Calculus, ∫[0,1] 2x dx = x² evaluated from 0 to 1",
                "x² evaluated at 1 is 1",
                "x² evaluated at 0 is 0",
                "Therefore, ∫[0,1] 2x dx = 1 - 0 = 1",
              ],
            },
          ],
        },
      },
      5: {
        title: "Series and Convergence Tests",
        description: "Understanding infinite series and determining their convergence",
        story: {
          setting: "Financial Analyst's Office",
          scenario: "You're a financial analyst using series to model the long-term growth of an investment.",
          characters: ["Financial Analyst", "Investment Banker", "Client"],
        },
        content: {
          theory: `💰 **Financial Modeling: Long-Term Growth**

The Financial Analyst explains...

"Series allow us to model the long-term growth of an investment by summing up the returns over many periods."

**Series:**
The sum of an infinite sequence.
∑[n=1,∞] aₙ

**Convergence Tests:**
• Ratio Test
• Root Test
• Comparison Test
• Integral Test

**Examples:**
• Geometric series
• Harmonic series
• Power series

**Applications:**
• Financial modeling
• Physics
• Engineering
• Computer science`,
          exercises: [
            {
              type: "story-choice",
              scenario: "An investment grows by 5% each year. What type of series models the total growth?",
              question: "Which type of series models this growth?",
              options: ["Arithmetic series", "Geometric series", "Harmonic series", "Power series"],
              correct: 1,
              explanation:
                "Correct! A geometric series models the growth, since each term is a constant multiple of the previous term.",
              feedback: {
                success:
                  "The Financial Analyst nods. 'Indeed! Geometric series are perfect for modeling exponential growth.'",
                failure:
                  "The Financial Analyst sighs. 'Remember, geometric series involve a constant ratio between terms.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the convergence tests with their descriptions.",
              question: "Connect the convergence tests to their descriptions:",
              items: [
                { id: "1", text: "Ratio Test", category: "test" },
                { id: "2", text: "Root Test", category: "test" },
                { id: "3", text: "Comparison Test", category: "test" },
                { id: "4", text: "Integral Test", category: "test" },
              ],
              categories: ["test"],
            },
          ],
        },
      },
      6: {
        title: "Metric Spaces",
        description: "Generalizing the notion of distance and convergence",
        story: {
          setting: "Navigation Center",
          scenario: "You're a navigator using metric spaces to model distances between locations on a map.",
          characters: ["Navigator", "Cartographer", "Explorer"],
        },
        content: {
          theory: `🗺️ **Navigation Center: Measuring Distances**

The Navigator explains...

"Metric spaces allow us to define distances between any two points, even in abstract spaces."

**Metric Space:**
A set X with a distance function d(x, y) satisfying certain axioms.

**Axioms:**
• Non-negativity: d(x, y) ≥ 0
• Identity of indiscernibles: d(x, y) = 0 if and only if x = y
• Symmetry: d(x, y) = d(y, x)
• Triangle inequality: d(x, z) ≤ d(x, y) + d(y, z)

**Examples:**
• Euclidean space ℝⁿ
• Discrete metric space
• Function spaces

**Applications:**
• Topology
• Analysis
• Computer science
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario: "The distance between two locations is 0. What does this imply?",
              question: "What does a distance of 0 signify?",
              options: [
                "The locations are very far apart",
                "The locations are the same",
                "The locations are orthogonal",
                "The locations are moving",
              ],
              correct: 1,
              explanation: "Correct! A distance of 0 implies that the locations are the same.",
              feedback: {
                success: "The Navigator nods. 'Indeed! A distance of 0 means we're at the same spot.'",
                failure: "The Navigator sighs. 'Remember, a distance of 0 means identity.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Prove the triangle inequality for the Euclidean metric in ℝ².",
              question: "Arrange the steps to prove the triangle inequality:",
              steps: [
                "Let x, y, z be points in ℝ²",
                "The Euclidean metric is d(x, y) = ||x - y||",
                "By the triangle inequality for norms, ||x - z|| ≤ ||x - y|| + ||y - z||",
                "Therefore, d(x, z) ≤ d(x, y) + d(y, z)",
              ],
            },
          ],
        },
      },
    },
  },

  "abstract-algebra": {
    id: "abstract-algebra",
    title: "Abstract Algebra",
    description: "Explore groups, rings, fields, and algebraic structures",
    level: "Advanced",
    lessons: {
      1: {
        title: "Introduction to Groups",
        description: "Understanding the fundamental algebraic structure",
        story: {
          setting: "Galois's Revolutionary Workshop",
          scenario:
            "You're learning about the algebraic structures that Évariste Galois discovered while studying polynomial equations.",
          characters: ["Évariste Galois", "Niels Henrik Abel", "Fellow Revolutionaries"],
        },
        content: {
          theory: `⚔️ **Galois's Revolutionary Mathematics**

Young Galois, passionate about both mathematics and revolution...

"The symmetries of polynomial equations reveal deep algebraic structures - what I call groups!"

**Definition of a Group:**
A group (G, ∗) is a set G with an operation ∗ satisfying:

1. **Closure:** For all a, b ∈ G, a ∗ b ∈ G
2. **Associativity:** (a ∗ b) ∗ c = a ∗ (b ∗ c)
3. **Identity:** There exists e ∈ G such that e ∗ a = a ∗ e = a for all a ∈ G
4. **Inverse:** For each a ∈ G, there exists a⁻¹ ∈ G such that a ∗ a⁻¹ = a⁻¹ ∗ a = e

**Examples:**
• (ℤ, +): integers under addition
• (ℚ*, ×): non-zero rationals under multiplication  
• (Sₙ, ∘): symmetric group of permutations
• (ℤₙ, +): integers modulo n

**Types of Groups:**
• Abelian: commutative groups (a ∗ b = b ∗ a)
• Cyclic: generated by a single element
• Finite vs. Infinite groups`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Galois asks: 'Is the set of even integers under addition a group?'",
              question: "Check if (2ℤ, +) forms a group:",
              options: [
                "Yes, it satisfies all group axioms",
                "No, it lacks closure",
                "No, it lacks an identity element",
                "No, it lacks inverses",
              ],
              correct: 0,
              explanation:
                "Yes! Even integers are closed under addition, addition is associative, 0 is the identity, and every even integer has an additive inverse.",
            },
          ],
        },
      },
      2: {
        title: "Subgroups and Cosets",
        description: "Understanding substructures within groups",
        story: {
          setting: "Lagrange's Academy",
          scenario:
            "Joseph-Louis Lagrange is teaching about the beautiful relationship between subgroups and the structure of the whole group.",
          characters: ["Joseph-Louis Lagrange", "Students", "Academy Members"],
        },
        content: {
          theory: `🏛️ **Lagrange's Fundamental Theorem**

Lagrange presents his groundbreaking result...

"The order of any subgroup divides the order of the group - a beautiful constraint on algebraic structure!"

**Subgroups:**
A subset H ⊆ G is a subgroup if:
1. H is non-empty
2. H is closed under the group operation
3. H contains inverses of all its elements

**Lagrange's Theorem:**
If G is a finite group and H is a subgroup of G, then |H| divides |G|.

**Cosets:**
For a subgroup H and element g ∈ G:
• Left coset: gH = {gh : h ∈ H}
• Right coset: Hg = {hg : h ∈ H}

**Properties:**
• Cosets partition the group
• All cosets have the same size as H
• |G| = |H| × (number of distinct cosets)

**Applications:**
• Classification of groups
• Quotient groups
• Normal subgroups`,
          exercises: [
            {
              type: "drag-drop",
              scenario: "Find all subgroups of ℤ₆ = {0, 1, 2, 3, 4, 5} under addition modulo 6.",
              question: "Drag elements to form the subgroups:",
              items: [
                { id: "1", text: "{0}", category: "trivial" },
                { id: "2", text: "{0, 2, 4}", category: "order3" },
                { id: "3", text: "{0, 3}", category: "order2" },
                { id: "4", text: "{0, 1, 2, 3, 4, 5}", category: "whole" },
              ],
              categories: ["trivial", "order2", "order3", "whole"],
            },
          ],
        },
      },
      3: {
        title: "Homomorphisms and Isomorphisms",
        description: "Understanding structure-preserving maps between groups",
        story: {
          setting: "Noether's Lecture Hall",
          scenario:
            "Emmy Noether is lecturing on the fundamental concepts of homomorphisms and isomorphisms, revealing the deep connections between algebraic structures.",
          characters: ["Emmy Noether", "Students", "Visiting Mathematicians"],
        },
        content: {
          theory: `👩‍🏫 **Noether's Structural Insights**

Emmy Noether addresses the audience...

"Homomorphisms and isomorphisms reveal the underlying structure of algebraic objects, allowing us to see when two groups are essentially the same!"

**Homomorphism:**
A function φ: G → H between groups G and H such that φ(a ∗ b) = φ(a) ∗ φ(b) for all a, b ∈ G.

**Isomorphism:**
A bijective homomorphism. If there exists an isomorphism between G and H, we say G and H are isomorphic (G ≅ H).

**Kernel and Image:**
• Kernel: ker(φ) = {g ∈ G | φ(g) = e_H}
• Image: im(φ) = {h ∈ H | h = φ(g) for some g ∈ G}

**Examples:**
• The exponential map from (ℝ, +) to (ℝ⁺, ×)
• The determinant map from GLₙ(ℝ) to (ℝ*, ×)

**Applications:**
• Group classification
• Cryptography
• Coding theory`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Noether asks: 'Is the map φ: (ℤ, +) → (ℤ₂, +) defined by φ(x) = x mod 2 a homomorphism?'",
              question: "Is this map a homomorphism?",
              options: [
                "Yes, it preserves the group operation",
                "No, it doesn't map the identity to the identity",
                "No, it's not surjective",
                "No, it's not injective",
              ],
              correct: 0,
              explanation:
                "Correct! φ(x + y) = (x + y) mod 2 = (x mod 2) + (y mod 2) = φ(x) + φ(y), so it preserves the group operation.",
              feedback: {
                success: "Noether nods approvingly. 'Indeed! This map preserves the structure of the groups.'",
                failure: "Noether sighs gently. 'Remember, a homomorphism must preserve the group operation.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the homomorphisms with their kernels.",
              question: "Connect the homomorphisms to their kernels:",
              items: [
                { id: "1", text: "φ: (ℤ, +) → (ℤ₂, +), φ(x) = x mod 2", category: "kernel" },
                { id: "2", text: "φ: (ℝ, +) → (ℝ⁺, ×), φ(x) = e^x", category: "kernel" },
                { id: "3", text: "φ: GLₙ(ℝ) → (ℝ*, ×), φ(A) = det(A)", category: "kernel" },
              ],
              categories: ["kernel"],
            },
          ],
        },
      },
      4: {
        title: "Cyclic Groups and Group Actions",
        description: "Exploring groups generated by a single element and their actions on sets",
        story: {
          setting: "Burnside's Puzzle Room",
          scenario:
            "William Burnside is demonstrating the properties of cyclic groups and group actions using intricate puzzles and games.",
          characters: ["William Burnside", "Puzzle Enthusiasts", "Group Theory Students"],
        },
        content: {
          theory: `🧩 **Burnside's Group Games**

Burnside presents a challenging puzzle...

"Cyclic groups and group actions reveal the symmetries and patterns hidden within these seemingly simple games!"

**Cyclic Group:**
A group G generated by a single element a (G = {aⁿ | n ∈ ℤ}).

**Group Action:**
A map G × X → X (written g · x) satisfying:
• e · x = x for all x ∈ X
• (g₁g₂) · x = g₁ · (g₂ · x) for all g₁, g₂ ∈ G, x ∈ X

**Examples:**
• (ℤₙ, +) is a cyclic group
• The rotation group acting on a polygon
• The symmetric group acting on a set

**Applications:**
• Cryptography
• Coding theory
• Combinatorics
• Physics`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Burnside asks: 'Is the group of rotations of a square a cyclic group?'",
              question: "Is the rotation group of a square cyclic?",
              options: [
                "Yes, it's generated by a single rotation",
                "No, it requires multiple generators",
                "Maybe, depending on the angle of rotation",
                "It's not a group",
              ],
              correct: 0,
              explanation: "Correct! The rotation group of a square is cyclic, generated by a 90-degree rotation.",
              feedback: {
                success: "Burnside smiles. 'Indeed! A single rotation generates all the symmetries.'",
                failure: "Burnside frowns. 'Remember, a cyclic group is generated by a single element.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the group actions with their descriptions.",
              question: "Connect the group actions to their descriptions:",
              items: [
                { id: "1", text: "Rotation group acting on a polygon", category: "action" },
                { id: "2", text: "Symmetric group acting on a set", category: "action" },
                { id: "3", text: "Translation group acting on a plane", category: "action" },
              ],
              categories: ["action"],
            },
          ],
        },
      },
      5: {
        title: "Rings and Ring Theory",
        description: "Exploring algebraic structures with two operations",
        story: {
          setting: "Dedekind's Study",
          scenario:
            "Richard Dedekind is developing the theory of rings, generalizing the properties of integers and polynomials.",
          characters: ["Richard Dedekind", "Students", "Visiting Algebraists"],
        },
        content: {
          theory: `📜 **Dedekind's Ring Structures**

Dedekind explains his new algebraic framework...

"Rings generalize the properties of integers and polynomials, providing a powerful tool for studying algebraic structures with two operations!"

**Ring:**
A set R with two operations (+ and ×) satisfying:
• (R, +) is an abelian group
• (R, ×) is associative
• Distributive laws hold: a × (b + c) = (a × b) + (a × c)

**Examples:**
• ℤ (integers)
• ℚ (rationals)
• ℝ (reals)
• ℂ (complex numbers)
• Polynomial rings

**Types of Rings:**
• Commutative ring: a × b = b × a
• Ring with unity: has a multiplicative identity (1)
• Integral domain: commutative ring with unity and no zero divisors
• Field: commutative ring with unity where every non-zero element has a multiplicative inverse

**Applications:**
• Number theory
• Algebraic geometry
• Cryptography`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Dedekind asks: 'Is the set of even integers a ring?'",
              question: "Is the set of even integers a ring?",
              options: [
                "Yes, it satisfies all ring axioms",
                "No, it lacks a multiplicative identity",
                "No, it's not closed under multiplication",
                "No, it lacks additive inverses",
              ],
              correct: 1,
              explanation:
                "Correct! The set of even integers lacks a multiplicative identity (1), so it's not a ring with unity.",
              feedback: {
                success:
                  "Dedekind nods. 'Indeed! The absence of a multiplicative identity prevents it from being a ring with unity.'",
                failure: "Dedekind sighs. 'Remember, a ring must satisfy all the ring axioms.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the rings with their properties.",
              question: "Connect the rings to their properties:",
              items: [
                { id: "1", text: "ℤ", category: "ring" },
                { id: "2", text: "ℚ", category: "ring" },
                { id: "3", text: "ℤₙ", category: "ring" },
              ],
              categories: ["ring"],
            },
          ],
        },
      },
      6: {
        title: "Fields and Galois Theory",
        description: "Exploring fields and their extensions, leading to Galois theory",
        story: {
          setting: "Galois's Final Night",
          scenario:
            "Évariste Galois is frantically writing down his mathematical discoveries on the eve of his duel, laying the foundation for Galois theory.",
          characters: ["Évariste Galois", "His Brother", "Mathematical Notes"],
        },
        content: {
          theory: `🌌 **Galois's Lasting Legacy**

Galois scribbles furiously...

"Fields and their extensions reveal the solvability of polynomial equations, a profound connection between algebra and number theory!"

**Field:**
A commutative ring with unity where every non-zero element has a multiplicative inverse.

**Field Extension:**
A field E containing a field F (E/F).

**Galois Group:**
The group of automorphisms of E that fix F.

**Solvability by Radicals:**
A polynomial equation is solvable by radicals if its roots can be expressed using addition, subtraction, multiplication, division, and radicals.

**Galois's Theorem:**
A polynomial equation is solvable by radicals if and only if its Galois group is solvable.

**Applications:**
• Cryptography
• Coding theory
• Algebraic number theory`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Galois asks: 'Is the field of rational numbers (ℚ) a field extension of the integers (ℤ)?'",
              question: "Is ℚ a field extension of ℤ?",
              options: [
                "Yes, ℚ contains ℤ",
                "No, ℤ is not a field",
                "Maybe, depending on the definition of 'field extension'",
                "It's a trick question",
              ],
              correct: 0,
              explanation: "Correct! ℚ contains ℤ, so it's a field extension.",
              feedback: {
                success: "Galois nods. 'Indeed! ℚ extends ℤ to include fractions.'",
                failure: "Galois sighs. 'Remember, a field extension involves one field containing another.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Explain the significance of Galois's Theorem.",
              question: "Arrange the steps to explain Galois's Theorem:",
              steps: [
                "Galois's Theorem connects the solvability of polynomial equations to the structure of their Galois groups",
                "A polynomial equation is solvable by radicals if and only if its Galois group is solvable",
                "This provides a powerful tool for determining whether a polynomial equation can be solved using radicals",
              ],
            },
          ],
        },
      },
    },
  },

  topology: {
    id: "topology",
    title: "Topology",
    description: "Understand spaces, continuity, and topological properties",
    level: "Advanced",
    lessons: {
      1: {
        title: "Topological Spaces",
        description: "Introduction to open sets and topological structure",
        story: {
          setting: "Poincaré's Geometric Laboratory",
          scenario: "Henri Poincaré is exploring the fundamental nature of space and continuity through topology.",
          characters: ["Henri Poincaré", "Felix Hausdorff", "Geometric Researchers"],
        },
        content: {
          theory: `🌐 **Poincaré's Vision of Space**

Poincaré contemplates the nature of geometric space...

"What if we could study the essential properties of space that remain unchanged under continuous deformations?"

**Topological Space:**
A topological space (X, τ) consists of:
• A set X
• A collection τ of subsets of X (called open sets) such that:
  1. ∅ and X are in τ
  2. Any union of sets in τ is in τ
  3. Any finite intersection of sets in τ is in τ

**Basic Concepts:**
• **Open sets:** Elements of τ
• **Closed sets:** Complements of open sets
• **Neighborhood:** Open set containing a point
• **Interior:** Largest open set contained in a set
• **Closure:** Smallest closed set containing a set

**Examples:**
• Discrete topology: Every subset is open
• Indiscrete topology: Only ∅ and X are open
• Euclidean topology: Based on open balls

**Continuous Functions:**
f: X → Y is continuous if the preimage of every open set in Y is open in X`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Poincaré asks: 'In the discrete topology on {1, 2, 3}, which sets are open?'",
              question: "Which statement is correct?",
              options: [
                "Only ∅ and {1, 2, 3} are open",
                "Every subset is open",
                "Only singletons are open",
                "No sets are open",
              ],
              correct: 1,
              explanation: "In the discrete topology, every subset is declared to be open by definition.",
            },
          ],
        },
      },
      2: {
        title: "Compactness",
        description: "Understanding one of topology's most important concepts",
        story: {
          setting: "Heine-Borel Conference",
          scenario:
            "Mathematicians are debating the precise definition of compactness and its equivalent formulations.",
          characters: ["Eduard Heine", "Émile Borel", "Conference Attendees"],
        },
        content: {
          theory: `🎯 **The Heine-Borel Revelation**

The conference buzzes with excitement over a fundamental discovery...

"We've found that several seemingly different properties are actually equivalent - this is compactness!"

**Compact Set (Cover Definition):**
A set K is compact if every open cover has a finite subcover.

**Open Cover:** A collection of open sets whose union contains K
**Finite Subcover:** A finite subcollection that still covers K

**Equivalent Characterizations:**
In metric spaces, the following are equivalent:
1. K is compact (every open cover has finite subcover)
2. K is sequentially compact (every sequence has convergent subsequence)
3. K is complete and totally bounded

**Heine-Borel Theorem:**
In ℝⁿ, a set is compact if and only if it is closed and bounded.

**Properties of Compact Sets:**
• Continuous images of compact sets are compact
• Compact sets in metric spaces are closed and bounded
• Finite unions and arbitrary intersections preserve compactness

**Applications:**
• Extreme Value Theorem
• Uniform continuity on compact sets
• Finite covering properties`,
          exercises: [
            {
              type: "proof-builder",
              scenario: "Prove that [0,1] is compact using the Heine-Borel theorem.",
              question: "Arrange the proof steps:",
              steps: [
                "We need to show [0,1] is closed and bounded in ℝ",
                "[0,1] is bounded since it's contained in the interval (-2, 2)",
                "[0,1] is closed because its complement (-∞,0) ∪ (1,∞) is open",
                "By the Heine-Borel theorem, [0,1] is compact",
                "Therefore every open cover of [0,1] has a finite subcover",
              ],
            },
          ],
        },
      },
      3: {
        title: "Connectedness and Path Connectedness",
        description: "Understanding different notions of connectedness in topological spaces",
        story: {
          setting: "Königsberg Bridge Problem",
          scenario:
            "You're trying to solve the famous Königsberg bridge problem, which led to the development of topology.",
          characters: ["Leonhard Euler", "Citizens of Königsberg", "Map of Königsberg"],
        },
        content: {
          theory: `🌉 **The Königsberg Bridges: A Topological Puzzle**

Euler ponders the map of Königsberg...

"Is it possible to cross all seven bridges exactly once? This seemingly simple question reveals deep topological properties!"

**Connected Space:**
A topological space that cannot be written as the union of two disjoint non-empty open sets.

**Path-Connected Space:**
A topological space where any two points can be joined by a continuous path.

**Examples:**
• The interval [0, 1] is connected and path-connected
• The topologist's sine curve is connected but not path-connected

**Applications:**
• Graph theory
• Knot theory
• Complex analysis`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "Euler asks: 'Is the city of Königsberg connected if we consider the landmasses as points and the bridges as paths?'",
              question: "Is Königsberg connected?",
              options: [
                "Yes, it's connected",
                "No, it's disconnected",
                "Maybe, depending on the definition of 'connected'",
                "It's impossible to determine",
              ],
              correct: 1,
              explanation:
                "Correct! Königsberg is disconnected because it's impossible to cross all seven bridges exactly once.",
              feedback: {
                success: "Euler nods. 'Indeed! The city is disconnected in this topological sense.'",
                failure: "Euler sighs. 'Remember, connectedness requires a certain level of connectivity.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the spaces with their connectedness properties.",
              question: "Connect the spaces to their connectedness properties:",
              items: [
                { id: "1", text: "[0, 1]", category: "connected" },
                { id: "2", text: "The topologist's sine curve", category: "connected" },
                { id: "3", text: "Two disjoint intervals", category: "disconnected" },
              ],
              categories: ["connected", "disconnected"],
            },
          ],
        },
      },
      4: {
        title: "Metric Spaces and Convergence",
        description: "Revisiting metric spaces and exploring convergence in this context",
        story: {
          setting: "Banach's Café",
          scenario:
            "Mathematicians are discussing the properties of metric spaces and convergence over coffee at Banach's Café.",
          characters: ["Stefan Banach", "Stanisław Ulam", "Hugo Steinhaus"],
        },
        content: {
          theory: `☕ **Banach's Café: Convergence Discussions**

Banach sips his coffee...

"Metric spaces provide a natural setting for studying convergence and completeness!"

**Metric Space:**
A set X with a distance function d(x, y) satisfying certain axioms.

**Convergence in Metric Spaces:**
A sequence (xₙ) converges to x if d(xₙ, x) → 0 as n → ∞.

**Cauchy Sequence:**
A sequence (xₙ) such that for every ε > 0, there exists N such that d(xₙ, xₘ) < ε for all n, m > N.

**Complete Metric Space:**
A metric space where every Cauchy sequence converges.

**Examples:**
• ℝⁿ is a complete metric space
• ℚ is not a complete metric space

**Applications:**
• Functional analysis
• Numerical analysis
• Optimization`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Banach asks: 'Does every Cauchy sequence in the rational numbers converge?'",
              question: "Is ℚ a complete metric space?",
              options: [
                "Yes, every Cauchy sequence converges",
                "No, some Cauchy sequences do not converge",
                "Maybe, depending on the sequence",
                "It's impossible to determine",
              ],
              correct: 1,
              explanation:
                "Correct! ℚ is not a complete metric space because some Cauchy sequences of rational numbers converge to irrational numbers.",
              feedback: {
                success: "Banach nods. 'Indeed! The rationals are incomplete.'",
                failure:
                  "Banach sighs. 'Remember, completeness requires all Cauchy sequences to converge within the space.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the spaces with their completeness properties.",
              question: "Connect the spaces to their completeness properties:",
              items: [
                { id: "1", text: "ℝ", category: "complete" },
                { id: "2", text: "ℚ", category: "incomplete" },
                { id: "3", text: "ℂ", category: "complete" },
              ],
              categories: ["complete", "incomplete"],
            },
          ],
        },
      },
      5: {
        title: "Fundamental Group and Homotopy",
        description: "Understanding the algebraic structure that captures the 'holes' in a topological space",
        story: {
          setting: "Poincaré's Study",
          scenario:
            "Poincaré is developing the concept of the fundamental group to classify topological spaces based on their 'holes'.",
          characters: ["Henri Poincaré", "Topological Researchers", "Loop Diagrams"],
        },
        content: {
          theory: `🌀 **Poincaré's Loop Analysis**

Poincaré examines loop diagrams...

"The fundamental group captures the essence of a topological space by studying the loops that can be continuously deformed into each other!"

**Loop:**
A continuous path that starts and ends at the same point.

**Homotopy:**
A continuous deformation of one loop into another.

**Fundamental Group (π₁(X, x₀)):**
The group of homotopy classes of loops based at x₀, with the group operation being concatenation of loops.

**Examples:**
• π₁(S¹, x₀) ≅ ℤ (the fundamental group of the circle is the integers)
• π₁(ℝⁿ, x₀) ≅ {e} (the fundamental group of Euclidean space is trivial)

**Applications:**
• Knot theory
• Algebraic topology
• Physics`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Poincaré asks: 'What is the fundamental group of the circle?'",
              question: "What is π₁(S¹)?",
              options: ["ℤ", "{e}", "ℤ₂", "ℝ"],
              correct: 0,
              explanation:
                "Correct! The fundamental group of the circle is ℤ, which represents the number of times a loop winds around the circle.",
              feedback: {
                success: "Poincaré nods. 'Indeed! The integers capture the winding number of loops around the circle.'",
                failure:
                  "Poincaré sighs. 'Remember, the fundamental group captures the essence of loops in the space.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the spaces with their fundamental groups.",
              question: "Connect the spaces to their fundamental groups:",
              items: [
                { id: "1", text: "S¹", category: "group" },
                { id: "2", text: "ℝ²", category: "group" },
                { id: "3", text: "Torus", category: "group" },
              ],
              categories: ["group"],
            },
          ],
        },
      },
      6: {
        title: "Covering Spaces",
        description: "Understanding how spaces 'cover' other spaces and their relationship to the fundamental group",
        story: {
          setting: "Riemann's Geometric Visualization",
          scenario:
            "Riemann is visualizing covering spaces as ways to 'unfold' a topological space, revealing its hidden structure.",
          characters: ["Bernhard Riemann", "Geometric Modelers", "Covering Space Diagrams"],
        },
        content: {
          theory: `🗺️ **Riemann's Unfolding Spaces**

Riemann gestures towards a geometric model...

"Covering spaces provide a way to 'unfold' a topological space, revealing its hidden structure and relationship to the fundamental group!"

**Covering Space:**
A continuous surjective map p: E → B such that for every b ∈ B, there exists a neighborhood U of b such that p⁻¹(U) is a disjoint union of open sets in E, each of which is mapped homeomorphically onto U by p.

**Examples:**
• The real line ℝ covering the circle S¹ via the exponential map
• The universal covering space of a topological space

**Applications:**
• Complex analysis
• Riemann surfaces
• Geometric group theory`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Riemann asks: 'What is a covering space of the circle?'",
              question: "Which space covers the circle?",
              options: ["The real line", "The sphere", "The torus", "The projective plane"],
              correct: 0,
              explanation: "Correct! The real line covers the circle via the exponential map.",
              feedback: {
                success: "Riemann nods. 'Indeed! The real line 'unwinds' the circle.'",
                failure: "Riemann sighs. 'Remember, a covering space 'unfolds' the base space.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the spaces with their covering spaces.",
              question: "Connect the spaces to their covering spaces:",
              items: [
                { id: "1", text: "Circle", category: "covering" },
                { id: "2", text: "Torus", category: "covering" },
                { id: "3", text: "Projective Plane", category: "covering" },
              ],
              categories: ["covering"],
            },
          ],
        },
      },
    },
  },

  probability: {
    id: "probability",
    title: "Probability Theory",
    description: "Understand randomness, distributions, and statistical inference",
    level: "Intermediate",
    lessons: {
      1: {
        title: "Sample Spaces and Events",
        description: "The foundation of probability theory",
        story: {
          setting: "Monte Carlo Casino",
          scenario: "You're working with mathematicians to understand the mathematics behind games of chance.",
          characters: ["Casino Manager", "Probability Expert", "Game Designers"],
        },
        content: {
          theory: `🎲 **The Mathematics of Chance**

The Probability Expert explains the casino's secret...

"Every game of chance follows precise mathematical laws. Understanding these gives us the house edge!"

**Sample Space (Ω):**
The set of all possible outcomes of an experiment.

**Examples:**
• Coin flip: Ω = {H, T}
• Die roll: Ω = {1, 2, 3, 4, 5, 6}
• Two coins: Ω = {HH, HT, TH, TT}

**Events:**
An event is a subset of the sample space.
• Simple event: Single outcome
• Compound event: Multiple outcomes
• Certain event: Ω (always happens)
• Impossible event: ∅ (never happens)

**Event Operations:**
• Union (A ∪ B): A or B occurs
• Intersection (A ∩ B): Both A and B occur
• Complement (Aᶜ): A does not occur
• Difference (A - B): A occurs but B doesn't

**Properties:**
• De Morgan's Laws: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ
• Distributive Laws: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)`,
          exercises: [
            {
              type: "story-choice",
              scenario: "A roulette wheel has 38 slots (0, 00, 1-36). What's the sample space for one spin?",
              question: "How many outcomes are in the sample space?",
              options: ["36", "37", "38", "39"],
              correct: 2,
              explanation:
                "The sample space contains all possible outcomes: {0, 00, 1, 2, ..., 36}, which is 38 outcomes total.",
            },
          ],
        },
      },
      2: {
        title: "Probability Axioms",
        description: "Kolmogorov's axiomatic foundation",
        story: {
          setting: "Kolmogorov's Moscow Office",
          scenario: "Andrey Kolmogorov is developing the rigorous mathematical foundation for probability theory.",
          characters: ["Andrey Kolmogorov", "Soviet Mathematicians", "Students"],
        },
        content: {
          theory: `📊 **Kolmogorov's Axiomatic Revolution**

Kolmogorov presents his groundbreaking axioms...

"We must place probability on the same rigorous foundation as geometry and analysis!"

**Kolmogorov's Axioms:**
For a probability function P on sample space Ω:

1. **Non-negativity:** P(A) ≥ 0 for all events A
2. **Normalization:** P(Ω) = 1
3. **Countable Additivity:** For disjoint events A₁, A₂, ...:
   P(A₁ ∪ A₂ ∪ ...) = P(A₁) + P(A₂) + ...

**Consequences:**
• P(∅) = 0
• P(Aᶜ) = 1 - P(A)
• If A ⊆ B, then P(A) ≤ P(B)
• P(A ∪ B) = P(A) + P(B) - P(A ∩ B)

**Classical Probability:**
When all outcomes are equally likely:
P(A) = |A| / |Ω|

**Relative Frequency:**
P(A) ≈ (number of times A occurs) / (number of trials)

**Applications:**
• Quality control
• Insurance mathematics
• Statistical inference
• Machine learning`,
          exercises: [
            {
              type: "drag-drop",
              scenario: "Calculate P(A ∪ B) using the inclusion-exclusion principle.",
              question: "Arrange the formula: P(A ∪ B) = ?",
              items: [
                { id: "1", text: "P(A)", category: "formula" },
                { id: "2", text: "+", category: "formula" },
                { id: "3", text: "P(B)", category: "formula" },
                { id: "4", text: "-", category: "formula" },
                { id: "5", text: "P(A ∩ B)", category: "formula" },
                { id: "6", text: "×", category: "unused" },
              ],
              targetOrder: ["P(A)", "+", "P(B)", "-", "P(A ∩ B)"],
              categories: ["formula", "unused"],
            },
          ],
        },
      },
      3: {
        title: "Conditional Probability and Independence",
        description: "Understanding how the probability of an event changes given information about another event",
        story: {
          setting: "Insurance Company Headquarters",
          scenario: "You're an actuary using conditional probability to assess risk and set insurance premiums.",
          characters: ["Chief Actuary", "Risk Analyst", "Insurance Agent"],
        },
        content: {
          theory: `🏢 **Insurance Risk Assessment**

The Chief Actuary explains...

"Conditional probability allows us to refine our risk assessments based on specific information about our clients."

**Conditional Probability:**
The probability of event A given that event B has occurred.
P(A | B) = P(A ∩ B) / P(B)

**Independence:**
Events A and B are independent if P(A | B) = P(A).

**Bayes' Theorem:**
P(A | B) = [P(B | A) × P(A)] / P(B)

**Examples:**
• The probability of a car accident given that the driver is texting
• The probability of a disease given a positive test result

**Applications:**
• Medical diagnosis
• Spam filtering
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "The probability of a customer filing a claim is 0.1. The probability of a customer being in a high-risk group is 0.2. The probability of a customer filing a claim given they are in a high-risk group is 0.3. What is the probability that a customer is in a high-risk group and files a claim?",
              question: "What is P(High-Risk ∩ Claim)?",
              options: ["0.02", "0.03", "0.06", "0.3"],
              correct: 2,
              explanation: "Correct! P(High-Risk ∩ Claim) = P(Claim | High-Risk) × P(High-Risk) = 0.3 × 0.2 = 0.06",
              feedback: {
                success: "The Chief Actuary nods. 'Indeed! We can now refine our risk assessment.'",
                failure:
                  "The Chief Actuary sighs. 'Remember, conditional probability requires careful application of the formula.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the concepts with their formulas.",
              question: "Connect the concepts to their formulas:",
              items: [
                { id: "1", text: "Conditional Probability", category: "formula" },
                { id: "2", text: "Independence", category: "formula" },
                { id: "3", text: "Bayes' Theorem", category: "formula" },
              ],
              categories: ["formula"],
            },
          ],
        },
      },
      4: {
        title: "Random Variables and Distributions",
        description: "Understanding how to model random phenomena with mathematical functions",
        story: {
          setting: "Meteorology Center",
          scenario: "You're a meteorologist using random variables to model weather patterns and predict rainfall.",
          characters: ["Chief Meteorologist", "Weather Analyst", "Data Scientist"],
        },
        content: {
          theory: `🌦️ **Weather Prediction: Random Variable Modeling**

The Chief Meteorologist explains...

"Random variables allow us to quantify weather phenomena and make probabilistic predictions about future conditions."

**Random Variable:**
A function that assigns a numerical value to each outcome in a sample space.

**Probability Distribution:**
A function that describes the probability of each possible value of a random variable.

**Types of Distributions:**
• Discrete: Bernoulli, Binomial, Poisson
• Continuous: Normal, Exponential, Uniform

**Examples:**
• The number of heads in 10 coin flips
• The amount of rainfall in a day

**Applications:**
• Finance
• Engineering
• Physics
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "The number of cars passing a certain point on a highway in an hour follows a Poisson distribution. What type of random variable is this?",
              question: "What type of random variable is this?",
              options: ["Continuous", "Discrete", "Normal", "Exponential"],
              correct: 1,
              explanation:
                "Correct! The number of cars is a discrete random variable because it can only take on integer values.",
              feedback: {
                success: "The Chief Meteorologist nods. 'Indeed! We can use the Poisson distribution to model this.'",
                failure: "The Chief Meteorologist sighs. 'Remember, discrete random variables take on integer values.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the distributions with their descriptions.",
              question: "Connect the distributions to their descriptions:",
              items: [
                { id: "1", text: "Normal", category: "distribution" },
                { id: "2", text: "Binomial", category: "distribution" },
                { id: "3", text: "Poisson", category: "distribution" },
                { id: "4", text: "Exponential", category: "distribution" },
              ],
              categories: ["distribution"],
            },
          ],
        },
      },
      5: {
        title: "Expectation and Variance",
        description: "Understanding the central tendency and spread of a random variable",
        story: {
          setting: "Investment Firm",
          scenario:
            "You're an investment analyst using expectation and variance to evaluate the risk and return of different investment portfolios.",
          characters: ["Portfolio Manager", "Investment Analyst", "Financial Advisor"],
        },
        content: {
          theory: `📈 **Portfolio Evaluation: Risk and Return**

The Portfolio Manager explains...

"Expectation and variance are essential tools for evaluating the potential return and risk associated with different investment strategies."

**Expectation (E[X]):**
The average value of a random variable.
• Discrete: E[X] = ∑ x P(X = x)
• Continuous: E[X] = ∫ x f(x) dx

**Variance (Var[X]):**
A measure of the spread or dispersion of a random variable.
Var[X] = E[(X - E[X])²] = E[X²] - (E[X])²

**Standard Deviation (σ):**
The square root of the variance.

**Examples:**
• The expected return of a stock
• The variance of a portfolio's returns

**Applications:**
• Finance
• Engineering
• Physics
• Machine learning`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "An investment has a 50% chance of returning 10% and a 50% chance of returning 0%. What is the expected return?",
              question: "What is the expected return?",
              options: ["0%", "5%", "10%", "50%"],
              correct: 1,
              explanation: "Correct! E[X] = (0.5 × 10%) + (0.5 × 0%) = 5%",
              feedback: {
                success: "The Portfolio Manager nods. 'Indeed! The expected return is 5%.'",
                failure: "The Portfolio Manager sighs. 'Remember, expectation is a weighted average.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the concepts with their formulas.",
              question: "Connect the concepts to their formulas:",
              items: [
                { id: "1", text: "Expectation", category: "formula" },
                { id: "2", text: "Variance", category: "formula" },
                { id: "3", text: "Standard Deviation", category: "formula" },
              ],
              categories: ["formula"],
            },
          ],
        },
      },
      6: {
        title: "Central Limit Theorem",
        description: "Understanding how the sum of independent random variables converges to a normal distribution",
        story: {
          setting: "Quality Control Department",
          scenario:
            "You're a quality control engineer using the Central Limit Theorem to assess the distribution of product defects.",
          characters: ["Quality Control Manager", "Quality Control Engineer", "Statistician"],
        },
        content: {
          theory: `⚙️ **Quality Control: Defect Analysis**

The Quality Control Manager explains...

"The Central Limit Theorem allows us to make inferences about the distribution of product defects, even if we don't know the underlying distribution."

**Central Limit Theorem (CLT):**
The sum (or average) of a large number of independent and identically distributed random variables will be approximately normally distributed, regardless of the underlying distribution.

**Conditions:**
• Independent random variables
• Finite mean and variance
• Sufficiently large sample size (n ≥ 30)

**Applications:**
• Statistical inference
• Hypothesis testing
• Confidence intervals
• Quality control`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "The average weight of a product is calculated from a sample of 100 items. What distribution does the sample mean follow?",
              question: "What distribution does the sample mean follow?",
              options: [
                "The same distribution as the individual items",
                "A normal distribution",
                "A uniform distribution",
                "An exponential distribution",
              ],
              correct: 1,
              explanation: "Correct! By the Central Limit Theorem, the sample mean follows a normal distribution.",
              feedback: {
                success: "The Quality Control Manager nods. 'Indeed! The CLT is a powerful tool.'",
                failure: "The Quality Control Manager sighs. 'Remember, the CLT applies to sums and averages.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the conditions with the Central Limit Theorem.",
              question: "Connect the conditions to the Central Limit Theorem:",
              items: [
                { id: "1", text: "Independent random variables", category: "condition" },
                { id: "2", text: "Finite mean and variance", category: "condition" },
                { id: "3", text: "Sufficiently large sample size", category: "condition" },
              ],
              categories: ["condition"],
            },
          ],
        },
      },
    },
  },

  "number-theory": {
    id: "number-theory",
    title: "Number Theory",
    description: "Discover the properties of integers and prime numbers",
    level: "Beginner",
    lessons: {
      1: {
        title: "Divisibility and Prime Numbers",
        description: "The building blocks of number theory",
        story: {
          setting: "Ancient Greek Academy",
          scenario: "You're studying with Euclid and his students, exploring the fundamental properties of numbers.",
          characters: ["Euclid", "Eratosthenes", "Academy Students"],
        },
        content: {
          theory: `🏛️ **Euclid's Number Mysteries**

Euclid gathers his students around...

"Numbers hold secrets that have fascinated mathematicians for millennia. Let us uncover their patterns!"

**Divisibility:**
We say a divides b (written a | b) if there exists an integer k such that b = ak.

**Properties:**
• If a | b and b | c, then a | c (transitivity)
• If a | b and a | c, then a | (b + c) and a | (b - c)
• If a | b, then a | bc for any integer c

**Prime Numbers:**
A prime number p > 1 has exactly two positive divisors: 1 and p.

**First few primes:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...

**Fundamental Theorem of Arithmetic:**
Every integer n > 1 can be written uniquely as a product of primes:
n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ

**The Sieve of Eratosthenes:**
An ancient algorithm to find all primes up to a given number.

**Applications:**
• Cryptography (RSA encryption)
• Computer algorithms
• Mathematical puzzles`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Eratosthenes asks: 'Is 91 a prime number?'",
              question: "Determine if 91 is prime:",
              options: ["Yes, it's prime", "No, 91 = 7 × 13", "No, 91 = 3 × 31", "Cannot determine"],
              correct: 1,
              explanation: "91 = 7 × 13, so it has divisors other than 1 and itself, making it composite.",
            },
          ],
        },
      },
      2: {
        title: "Greatest Common Divisor",
        description: "Euclidean algorithm and its applications",
        story: {
          setting: "Euclid's Workshop",
          scenario: "Learning the elegant algorithm that bears Euclid's name for finding the greatest common divisor.",
          characters: ["Euclid", "Workshop Assistants", "Visiting Scholars"],
        },
        content: {
          theory: `⚙️ **Euclid's Algorithmic Masterpiece**

Euclid demonstrates his famous algorithm...

"To find the greatest common divisor, we use the principle that gcd(a,b) = gcd(b, a mod b)!"

**Greatest Common Divisor (GCD):**
The largest positive integer that divides both a and b.

**Euclidean Algorithm:**
To find gcd(a, b):
1. If b = 0, return a
2. Otherwise, return gcd(b, a mod b)

**Example:** gcd(48, 18)
• 48 = 2 × 18 + 12
• 18 = 1 × 12 + 6  
• 12 = 2 × 6 + 0
• Therefore gcd(48, 18) = 6

**Extended Euclidean Algorithm:**
Finds integers x, y such that ax + by = gcd(a, b)

**Properties:**
• gcd(a, b) = gcd(b, a)
• gcd(a, 0) = |a|
• gcd(a, b) = gcd(a - b, b)

**Applications:**
• Simplifying fractions
• Solving linear Diophantine equations
• Modular arithmetic
• Cryptographic algorithms`,
          exercises: [
            {
              type: "proof-builder",
              scenario: "Use the Euclidean algorithm to find gcd(252, 105).",
              question: "Arrange the algorithm steps:",
              steps: [
                "252 = 2 × 105 + 42",
                "105 = 2 × 42 + 21",
                "42 = 2 × 21 + 0",
                "Since remainder is 0, gcd(252, 105) = 21",
              ],
            },
          ],
        },
      },
      3: {
        title: "Modular Arithmetic",
        description: "Understanding arithmetic operations modulo an integer",
        story: {
          setting: "Clock Tower",
          scenario: "You're learning about modular arithmetic by observing the cyclical nature of time on a clock.",
          characters: ["Clockmaker", "Apprentice", "Time Traveler"],
        },
        content: {
          theory: `🕰️ **Clock Tower: Arithmetic Cycles**

The Clockmaker explains...

"Modular arithmetic is like counting on a clock. Once you reach the maximum number, you cycle back to the beginning!"

**Modular Arithmetic:**
Arithmetic operations performed modulo an integer n.

**Congruence:**
a ≡ b (mod n) if a - b is divisible by n.

**Examples:**
• 17 ≡ 5 (mod 12) (on a clock, 17:00 is the same as 5:00)
• 7 ≡ 2 (mod 5)

**Properties:**
• If a ≡ b (mod n) and c ≡ d (mod n), then a + c ≡ b + d (mod n) and a × c ≡ b × d (mod n)

**Applications:**
• Cryptography
• Computer science
• Calendar calculations`,
          exercises: [
            {
              type: "story-choice",
              scenario: "The clock reads 9:00. What time will it be 17 hours later?",
              question: "What time will it be?",
              options: ["2:00", "3:00", "4:00", "5:00"],
              correct: 0,
              explanation: "Correct! 9 + 17 = 26 ≡ 2 (mod 12), so it will be 2:00.",
              feedback: {
                success: "The Clockmaker nods. 'Indeed! Modular arithmetic helps us track time cycles.'",
                failure: "The Clockmaker sighs. 'Remember, we cycle back to the beginning after reaching 12.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the numbers with their congruences modulo 5.",
              question: "Connect the numbers to their congruences:",
              items: [
                { id: "1", text: "7", category: "congruence" },
                { id: "2", text: "12", category: "congruence" },
                { id: "3", text: "17", category: "congruence" },
              ],
              categories: ["congruence"],
            },
          ],
        },
      },
      4: {
        title: "Congruences and Chinese Remainder Theorem",
        description: "Solving systems of congruences",
        story: {
          setting: "Ancient Chinese Temple",
          scenario: "You're learning about the Chinese Remainder Theorem from ancient Chinese mathematicians.",
          characters: ["Chinese Mathematician", "Temple Monks", "Mathematical Scrolls"],
        },
        content: {
          theory: `🏯 **Ancient Chinese Calculations**

The Chinese Mathematician explains...

"The Chinese Remainder Theorem allows us to solve systems of congruences, a powerful tool for solving ancient puzzles!"

**Congruence:**
a ≡ b (mod n) if a - b is divisible by n.

**Chinese Remainder Theorem (CRT):**
If n₁, n₂, ..., nₖ are pairwise coprime, then the system of congruences:
x ≡ a₁ (mod n₁)
x ≡ a₂ (mod n₂)
...
x ≡ aₖ (mod nₖ)
has a unique solution modulo N = n₁ × n₂ × ... × nₖ.

**Applications:**
• Cryptography
• Computer science
• Calendar calculations`,
          exercises: [
            {
              type: "story-choice",
              scenario:
                "A number leaves a remainder of 2 when divided by 3 and a remainder of 3 when divided by 5. What is the number?",
              question: "What is the number?",
              options: ["8", "13", "17", "23"],
              correct: 0,
              explanation: "Correct! x ≡ 2 (mod 3) and x ≡ 3 (mod 5). The solution is x = 8.",
              feedback: {
                success:
                  "The Chinese Mathematician nods. 'Indeed! The Chinese Remainder Theorem helps us find the solution.'",
                failure:
                  "The Chinese Mathematician sighs. 'Remember, we need to find a number that satisfies both congruences.'",
              },
            },
            {
              type: "proof-builder",
              scenario:
                "Use the Chinese Remainder Theorem to solve the system of congruences: x ≡ 1 (mod 2) and x ≡ 2 (mod 3).",
              question: "Arrange the steps to solve the system:",
              steps: [
                "x ≡ 1 (mod 2) and x ≡ 2 (mod 3)",
                "N = 2 × 3 = 6",
                "N₁ = 3, N₂ = 2",
                "Find the inverses: 3⁻¹ ≡ 1 (mod 2) and 2⁻¹ ≡ 2 (mod 3)",
                "x = (1 × 3 × 1) + (2 × 2 × 2) = 3 + 8 = 11",
                "x ≡ 11 ≡ 5 (mod 6)",
              ],
            },
          ],
        },
      },
      5: {
        title: "Quadratic Residues",
        description: "Understanding squares modulo an integer",
        story: {
          setting: "Renaissance Mathematics Academy",
          scenario: "You're studying quadratic residues with mathematicians in a Renaissance academy.",
          characters: ["Renaissance Mathematician", "Academy Scholars", "Mathematical Diagrams"],
        },
        content: {
          theory: `📜 **Renaissance Square Analysis**

The Renaissance Mathematician explains...

"Quadratic residues reveal the patterns of squares modulo an integer, a fascinating area of number theory!"

**Quadratic Residue:**
An integer a is a quadratic residue modulo n if there exists an integer x such that x² ≡ a (mod n).

**Legendre Symbol:**
(a/p) = 1 if a is a quadratic residue modulo p, -1 if a is a quadratic non-residue modulo p, and 0 if p divides a.

**Quadratic Reciprocity:**
A theorem relating the Legendre symbols (p/q) and (q/p) for distinct odd primes p and q.

**Applications:**
• Cryptography
• Computer science`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Is 3 a quadratic residue modulo 7?",
              question: "Is 3 a quadratic residue modulo 7?",
              options: ["Yes", "No", "Maybe", "Cannot determine"],
              correct: 1,
              explanation:
                "Correct! The squares modulo 7 are 0, 1, 4, 2. 3 is not among them, so it is not a quadratic residue.",
              feedback: {
                success: "The Renaissance Mathematician nods. 'Indeed! 3 is not a square modulo 7.'",
                failure: "The Renaissance Mathematician sighs. 'Remember, we need to check if 3 is a square modulo 7.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the numbers with their quadratic residues modulo 5.",
              question: "Connect the numbers to their quadratic residues:",
              items: [
                { id: "1", text: "1", category: "residue" },
                { id: "2", text: "2", category: "non_residue" },
                { id: "3", text: "3", category: "non_residue" },
                { id: "4", text: "4", category: "residue" },
              ],
              categories: ["residue", "non_residue"],
            },
          ],
        },
      },
      6: {
        title: "Diophantine Equations",
        description: "Solving polynomial equations in integers",
        story: {
          setting: "Fermat's Library",
          scenario: "You're exploring Diophantine equations in Fermat's library.",
          characters: ["Pierre de Fermat", "Library Assistant", "Mathematical Manuscripts"],
        },
        content: {
          theory: `📚 **Fermat's Equation Exploration**

Fermat contemplates a famous equation...

"Diophantine equations challenge us to find integer solutions to polynomial equations, a quest that has captivated mathematicians for centuries!"

**Diophantine Equation:**
A polynomial equation in two or more variables for which only integer solutions are sought.

**Examples:**
• ax + by = c (linear Diophantine equation)
• x² + y² = z² (Pythagorean triples)
• xⁿ + yⁿ = zⁿ (Fermat's Last Theorem)

**Applications:**
• Cryptography
• Computer science`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Does the equation x² + y² = 3 have integer solutions?",
              question: "Does x² + y² = 3 have integer solutions?",
              options: ["Yes", "No", "Maybe", "Cannot determine"],
              correct: 1,
              explanation:
                "Correct! The squares of integers are 0 and 1 modulo 4. The sum of two squares can only be 0, 1, or 2 modulo 4. Since 3 is congruent to 3 modulo 4, there are no integer solutions.",
              feedback: {
                success: "Fermat nods. 'Indeed! Modular arithmetic helps us determine the existence of solutions.'",
                failure: "Fermat sighs. 'Remember, we need to consider the equation modulo some integer.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Find all integer solutions to the equation x + y = 5.",
              question: "Arrange the steps to find the solutions:",
              steps: [
                "x + y = 5",
                "y = 5 - x",
                "For any integer x, y = 5 - x is also an integer",
                "Therefore, the solutions are (x, 5 - x) for all integers x",
              ],
            },
          ],
        },
      },
    },
  },

  "complex-analysis": {
    id: "complex-analysis",
    title: "Complex Analysis",
    description: "Study functions of complex variables and their properties",
    level: "Advanced",
    lessons: {
      1: {
        title: "Complex Numbers and the Complex Plane",
        description: "Introduction to the world of complex numbers",
        story: {
          setting: "Gauss's Study",
          scenario:
            "Carl Friedrich Gauss is revealing the geometric interpretation of complex numbers that revolutionized mathematics.",
          characters: ["Carl Friedrich Gauss", "Caspar Wessel", "Jean-Robert Argand"],
        },
        content: {
          theory: `🌟 **Gauss's Geometric Revolution**

Gauss unveils his geometric insight...

"These 'imaginary' numbers are not imaginary at all - they live in a beautiful geometric plane!"

**Complex Numbers:**
A complex number z = a + bi where:
• a is the real part: Re(z) = a
• b is the imaginary part: Im(z) = b  
• i is the imaginary unit: i² = -1

**The Complex Plane:**
• Real axis (horizontal): real numbers
• Imaginary axis (vertical): pure imaginary numbers
• Every complex number is a point (a, b)

**Polar Form:**
z = r(cos θ + i sin θ) = re^(iθ)
• r = |z| = √(a² + b²) (modulus)
• θ = arg(z) (argument/angle)

**Operations:**
• Addition: (a + bi) + (c + di) = (a + c) + (b + d)i
• Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i
• Complex conjugate: z̄ = a - bi

**Euler's Formula:**
e^(iθ) = cos θ + i sin θ

**Applications:**
• Electrical engineering (AC circuits)
• Quantum mechanics
• Signal processing
• Fluid dynamics`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Gauss asks: 'What is the modulus of z = 3 + 4i?'",
              question: "Calculate |3 + 4i|:",
              options: ["5", "7", "√7", "25"],
              correct: 0,
              explanation: "|3 + 4i| = √(3² + 4²) = √(9 + 16) = √25 = 5",
            },
          ],
        },
      },
      2: {
        title: "Complex Functions and Analyticity",
        description: "Functions that are differentiable in the complex sense",
        story: {
          setting: "Cauchy's Research Laboratory",
          scenario:
            "Augustin-Louis Cauchy is developing the theory of complex differentiability and its remarkable consequences.",
          characters: ["Augustin-Louis Cauchy", "Bernhard Riemann", "Research Colleagues"],
        },
        content: {
          theory: `🔬 **Cauchy's Analytical Breakthrough**

Cauchy makes a stunning discovery...

"Functions that are differentiable in the complex sense have miraculous properties - they're infinitely differentiable!"

**Complex Differentiability:**
f is differentiable at z₀ if the limit exists:
f'(z₀) = lim[h→0] [f(z₀ + h) - f(z₀)]/h

**Analytic Functions:**
A function is analytic (holomorphic) at z₀ if it's differentiable in a neighborhood of z₀.

**Cauchy-Riemann Equations:**
If f(z) = u(x,y) + iv(x,y) is analytic, then:
• ∂u/∂x = ∂v/∂y
• ∂u/∂y = -∂v/∂x

**Examples of Analytic Functions:**
• Polynomials: f(z) = zⁿ
• Exponential: f(z) = e^z
• Trigonometric: sin z, cos z
• Rational functions (except at poles)

**Remarkable Properties:**
• Analytic functions are infinitely differentiable
• They satisfy the maximum modulus principle
• They can be represented by power series
• Isolated zeros have finite order

**Applications:**
• Conformal mapping
• Potential theory
• Aerodynamics
• Mathematical physics`,
          exercises: [
            {
              type: "drag-drop",
              scenario: "Verify that f(z) = z² satisfies the Cauchy-Riemann equations.",
              question: "Match the partial derivatives:",
              items: [
                { id: "1", text: "∂u/∂x = 2x", category: "correct" },
                { id: "2", text: "∂v/∂y = 2x", category: "correct" },
                { id: "3", text: "∂u/∂y = -2y", category: "correct" },
                { id: "4", text: "-∂v/∂x = -(-2y) = 2y", category: "incorrect" },
              ],
              categories: ["correct", "incorrect"],
            },
          ],
        },
      },
      3: {
        title: "Cauchy's Theorem and Applications",
        description: "Understanding the fundamental theorem of complex integration",
        story: {
          setting: "Cauchy's Lecture Hall",
          scenario: "Augustin-Louis Cauchy is presenting his groundbreaking theorem on complex integration.",
          characters: ["Augustin-Louis Cauchy", "Students", "Mathematical Diagrams"],
        },
        content: {
          theory: `📐 **Cauchy's Integral Revolution**

Cauchy unveils his integral theorem...

"The integral of an analytic function around a closed curve is zero, a profound result with far-reaching consequences!"

**Cauchy's Theorem:**
If f is analytic in a simply connected domain D, then for any closed curve C in D, ∫C f(z) dz = 0.

**Cauchy's Integral Formula:**
f(z₀) = (1/2πi) ∫C [f(z)/(z - z₀)] dz

**Applications:**
• Evaluating complex integrals
• Proving other theorems in complex analysis`,
          exercises: [
            {
              type: "story-choice",
              scenario: "What is the integral of e^z around a closed curve in the complex plane?",
              question: "What is ∫C e^z dz?",
              options: ["0", "2πi", "1", "∞"],
              correct: 0,
              explanation:
                "Correct! Since e^z is analytic everywhere, the integral around a closed curve is 0 by Cauchy's Theorem.",
              feedback: {
                success: "Cauchy nods. 'Indeed! The integral vanishes due to analyticity.'",
                failure: "Cauchy sighs. 'Remember, Cauchy's Theorem applies to analytic functions.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Explain the significance of Cauchy's Theorem.",
              question: "Arrange the steps to explain Cauchy's Theorem:",
              steps: [
                "Cauchy's Theorem states that the integral of an analytic function around a closed curve is zero",
                "This theorem is fundamental to complex analysis",
                "It allows us to evaluate complex integrals and prove other important results",
              ],
            },
          ],
        },
      },
      4: {
        title: "Laurent Series and Residues",
        description: "Understanding series expansions for functions with singularities",
        story: {
          setting: "Weierstrass's Seminar",
          scenario: "Karl Weierstrass is presenting the Laurent series expansion for functions with singularities.",
          characters: ["Karl Weierstrass", "Seminar Attendees", "Series Expansions"],
        },
        content: {
          theory: `🔬 **Weierstrass's Series Expansion**

Weierstrass unveils the Laurent series...

"The Laurent series allows us to represent functions with singularities as a series expansion, a powerful tool for analyzing their behavior!"

**Laurent Series:**
f(z) = ∑[n=-∞,∞] aₙ (z - z₀)ⁿ

**Residue:**
The coefficient a₋₁ in the Laurent series expansion.

**Residue Theorem:**
∫C f(z) dz = 2πi ∑ Res(f, zₖ)

**Applications:**
• Evaluating complex integrals
• Solving differential equations`,
          exercises: [
            {
              type: "story-choice",
              scenario: "What is the residue of 1/z at z = 0?",
              question: "What is Res(1/z, 0)?",
              options: ["0", "1", "2πi", "∞"],
              correct: 1,
              explanation: "Correct! The Laurent series of 1/z is simply 1/z, so the residue is 1.",
              feedback: {
                success: "Weierstrass nods. 'Indeed! The residue is the coefficient of the 1/z term.'",
                failure: "Weierstrass sighs. 'Remember, the residue is the coefficient of the 1/(z - z₀) term.'",
              },
            },
            {
              type: "drag-drop",
              scenario: "Match the functions with their residues at z = 0.",
              question: "Connect the functions to their residues:",
              items: [
                { id: "1", text: "1/z", category: "residue" },
                { id: "2", text: "e^z/z", category: "residue" },
                { id: "3", text: "sin(z)/z", category: "residue" },
              ],
              categories: ["residue"],
            },
          ],
        },
      },
      5: {
        title: "Conformal Mappings",
        description: "Understanding transformations that preserve angles",
        story: {
          setting: "Cartographer's Studio",
          scenario: "You're a cartographer using conformal mappings to create maps that preserve angles.",
          characters: ["Cartographer", "Navigator", "Mathematical Assistant"],
        },
        content: {
          theory: `🗺️ **Cartographic Angle Preservation**

The Cartographer explains...

"Conformal mappings preserve angles, making them essential for creating accurate maps!"

**Conformal Mapping:**
A transformation that preserves angles locally.

**Examples:**
• Linear transformations
• Möbius transformations

**Applications:**
• Cartography
• Fluid dynamics
• Electrical engineering`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Which transformation preserves angles?",
              question: "Which transformation is conformal?",
              options: [
                "A projection onto a cylinder",
                "A projection onto a cone",
                "A Möbius transformation",
                "A shear transformation",
              ],
              correct: 2,
              explanation: "Correct! Möbius transformations are conformal.",
              feedback: {
                success: "The Cartographer nods. 'Indeed! Möbius transformations are invaluable for mapmaking.'",
                failure: "The Cartographer sighs. 'Remember, conformal mappings preserve angles.'",
              },
            },
            {
              type: "visual-logic",
              scenario: "Identify which of the following transformations are conformal.",
              question: "Select the conformal transformations:",
              options: ["Transformation A", "Transformation B", "Transformation C", "Transformation D"],
              correct: ["Transformation A", "Transformation C"],
            },
          ],
        },
      },
      6: {
        title: "The Riemann Mapping Theorem",
        description: "Understanding the fundamental theorem on the existence of conformal mappings",
        story: {
          setting: "Riemann's Geometric Imagination",
          scenario:
            "Bernhard Riemann is envisioning the power of conformal mappings to relate different domains in the complex plane.",
          characters: ["Bernhard Riemann", "Geometric Visionaries", "Domain Transformations"],
        },
        content: {
          theory: `🌟 **Riemann's Conformal Vision**

Riemann contemplates the beauty of conformal mappings...

"Any two simply connected domains in the complex plane (other than the whole plane) can be conformally mapped onto each other, a testament to the power of complex analysis!"

**Riemann Mapping Theorem:**
If D is a simply connected domain in the complex plane, and D is not the entire complex plane, then there exists a conformal mapping f: D → U, where U is the open unit disk.

**Applications:**
• Complex analysis
• Potential theory`,
          exercises: [
            {
              type: "story-choice",
              scenario: "Can any simply connected domain be conformally mapped onto the unit disk?",
              question: "Is the Riemann Mapping Theorem true?",
              options: ["Yes", "No", "Maybe", "Cannot determine"],
              correct: 0,
              explanation: "Correct! The Riemann Mapping Theorem guarantees the existence of such a mapping.",
              feedback: {
                success: "Riemann nods. 'Indeed! The theorem reveals a fundamental connection between domains.'",
                failure: "Riemann sighs. 'Remember, the theorem applies to simply connected domains.'",
              },
            },
            {
              type: "proof-builder",
              scenario: "Explain the significance of the Riemann Mapping Theorem.",
              question: "Arrange the steps to explain the Riemann Mapping Theorem:",
              steps: [
                "The Riemann Mapping Theorem states that any two simply connected domains in the complex plane (other than the whole plane) can be conformally mapped onto each other",
                "This theorem is a cornerstone of complex analysis",
                "It demonstrates the power of conformal mappings to relate different domains",
              ],
            },
          ],
        },
      },
    },
  },
}
