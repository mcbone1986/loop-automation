# Introduction
An overview of the task.

I was tasked with writing a data-driven test using Playwright by driving the test scenarios from a JSON object.

# Implementation Details
How you tackled the task and the main components of your implementation.

I narrowed this down into smaller individual steps. Something I learned from my bootcamp was to take all projects in very 'thin vertical slices':

1. **Installation of Playwright:** Took roughly 30 minutes for Playwright to work correctly on my machine.
2. **Dusting off the cobwebs:** It's been roughly over a year since I last touched Playwright or TypeScript. I needed to quickly get up to speed to complete this project.
3. **Utilizing all available tools:** Playwright has a built-in codegen feature that allows for not only recording processes but also finding more exact locators.
4. **Making the code manageable:** After getting all my test cases recorded, I needed to include more cohesiveness within my code to make it more maintainable. This included using a `beforeEach` for my login steps, incorporating `test.step`, and utilizing data-driven testing using a JSON object.
5. **Debugging:** The bane of most programmers but quite literally the most enjoyable part of being a QA Engineer (we live to break things). I personally found the process of switching data over to a JSON object much more tedious and time-consuming than writing the `beforeEach` (which took hardly any time at all). Maybe I felt that way about the JSON object because my for loop that referenced the tag array never worked properly.

# Challenges and Solutions
Mention any obstacles encountered and your solutions.

There were a few challenges I faced. Some I was able to overcome, some I was not.

1. **Finding proper locators for some web elements:** Even with Playwright's locator feature in codegen, it seemed that the tests needed some finer tuning. These can be remedied by using `data-id`, `testID`, or `altText` on elements, however, the Asana site seems to use dynamic CSS, so that option was unavailable. I could have used XPath as well but would have needed a refresher and ran out of time.
2. **Running tests in parallel:** It seems like the tests timed out when run in parallel. When run individually, they pass.
3. **Tags:** I never quite got the hover > assertion of tag text to work properly. I need more practice on this.

# Results
Conclude with the outcomes of the test runs, detailing any failures.

The overall result from this test suite can really come down to one word that a QA engineer doesn't like: Flaky. The tests that I have created are slow and almost immediately fail if I include asserting tags.

# Recommendations
Offer any suggestions for either the tested features or the testing process.

One thing I was taught while learning QA automation is that the more exact locator for an element, the better. Meaning, if you can include something like `data-id`, `testID` to an element, the better. However, with today's CSS frameworks, many sites have dynamic elements and rarely can have consistent information.
